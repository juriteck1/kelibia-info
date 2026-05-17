'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CATS } from '@/lib/data'
import { getPlan, getReviews, addReview } from '@/lib/db'
import type { Plan, Review } from '@/types'

function Stars({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="spr">
      {Array.from({ length: 5 }, (_, i) => (
        <button key={i} className="spb"
          onMouseEnter={() => interactive && setHover(i + 1)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate?.(i + 1)}
          style={{background:'none',border:'none',padding:0,cursor:interactive?'pointer':'default'}}
        >
          <svg className={(interactive ? hover || rating : rating) > i ? 'sf' : 'se'} style={{width:24,height:24,fill:'currentColor'}} viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ))}
    </div>
  )
}

export default function PlanDetail({ params }: { params: { id: string } }) {
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [newRating, setNewRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [localReviews, setLocalReviews] = useState<Review[]>([])
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const id = Number(params.id)
    Promise.all([getPlan(id), getReviews(id)]).then(([p, r]) => {
      setPlan(p)
      setLocalReviews(r)
      setLoading(false)
    })
  }, [params.id])

  if (loading) return <div className="pt" style={{padding:'4rem',textAlign:'center',color:'var(--muted)'}}>Chargement…</div>
  if (!plan) notFound()

  const cat = CATS.find(c => c.id === plan!.cat)

  async function submitReview() {
    if (!newRating || !name.trim() || !comment.trim()) return alert('Merci de remplir tous les champs.')
    const planId = plan!.id
    const newReview = { plan_id: planId, author: name, rating: newRating, comment }
    await addReview(newReview)
    setLocalReviews(prev => [{
      id: Date.now(), plan_id: planId, author: name,
      rating: newRating, comment, created_at: new Date().toISOString()
    }, ...prev])
    setName(''); setComment(''); setNewRating(0)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const avgRating = localReviews.length
    ? localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length
    : plan!.rating

  return (
    <div className="pt">
      <div className="fhi">
        {plan!.img && <Image src={plan!.img} alt={plan!.title} fill style={{objectFit:'cover'}} priority/>}
        <div className="fhov"/>
        <div className="fhb">
          <div className="container">
            <Link href="/plans" className="backbtn">
              <svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Retour aux bons plans
            </Link>
            {cat && <div style={{marginBottom:'.5rem'}}><span className={`badge ${cat.bc}`}>{cat.label}</span></div>}
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',fontWeight:700,color:'#fff',lineHeight:1.2}}>{plan!.title}</h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="fl">
          <div className="fm">
            {/* À propos */}
            <div className="fcard">
              <h2>À propos</h2>
              <p className="fdesc">{plan!.desc}</p>
              <div className="ftr">
                {plan!.tags.map(tag => <span key={tag} className="ftag">{tag}</span>)}
              </div>
            </div>

            {/* Avis */}
            <div className="fcard">
              <div className="rvh">
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <h2 style={{margin:0}}>Avis ({localReviews.length})</h2>
              </div>
              {localReviews.map(rv => (
                <div key={rv.id} className="rvi">
                  <div className="rvtop">
                    <div>
                      <div className="rva">{rv.author}</div>
                      <div className="rvd">{new Date(rv.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div style={{display:'flex',gap:2}}>
                      {Array.from({length:5},(_,i) => (
                        <svg key={i} className={i < rv.rating ? 'sf' : 'se'} style={{width:12,height:12,fill:'currentColor'}} viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="rvt">{rv.comment}</p>
                </div>
              ))}

              <h3 className="art">Laisser un avis</h3>
              {submitted && <p style={{color:'#16a34a',fontSize:'.875rem',marginBottom:'.75rem'}}>✓ Avis publié, merci !</p>}
              <Stars rating={newRating} interactive onRate={setNewRating} />
              <input className="finput" value={name} onChange={e => setName(e.target.value)} placeholder="Votre prénom"/>
              <textarea className="ftarea" rows={3} value={comment} onChange={e => setComment(e.target.value)} placeholder="Votre commentaire…"/>
              <button className="brev" onClick={submitReview}>Publier mon avis</button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="fsb">
            <div className="sbc">
              <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'.75rem'}}>
                <span className="rbig">{avgRating.toFixed(1)}</span>
                <div>
                  <div style={{display:'flex',gap:2}}>
                    {Array.from({length:5},(_,i) => (
                      <svg key={i} className={i < Math.round(avgRating) ? 'sf' : 'se'} style={{width:16,height:16,fill:'currentColor'}} viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{fontSize:'.75rem',color:'var(--muted)',marginTop:'.2rem'}}>{localReviews.length} avis</p>
                </div>
              </div>
              <div className="rbar"><div className="rbarf" style={{width:`${(avgRating/5)*100}%`}}/></div>
            </div>

            <div className="sbc">
              <h3>Informations</h3>
              <div className="inforow">
                <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                <span>{plan!.addr}</span>
              </div>
              {plan!.phone && (
                <div className="inforow">
                  <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href={`tel:${plan!.phone}`}>{plan!.phone}</a>
                </div>
              )}
              {plan!.map && (
                <div className="inforow">
                  <svg viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                  <a href={plan!.map} target="_blank" rel="noopener noreferrer">Voir sur la carte</a>
                </div>
              )}
            </div>

            <div className="pubsb">
              <span className="pub-l">Publicité</span>
              <p>Votre annonce ici</p>
              <Link href="/contact" style={{fontSize:'.78rem',color:'var(--sea)'}}>Nous contacter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
