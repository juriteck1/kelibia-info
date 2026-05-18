'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPlan, getReviews } from '@/lib/db'
import type { Plan, Review } from '@/types'

export default function PlanDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      getPlan(Number(id)),
      getReviews(Number(id)),
    ]).then(([p, r]) => {
      if (!p) { router.push('/plans'); return }
      setPlan(p)
      setReviews(r)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div className="pt">
      <div className="container" style={{padding:'4rem 0',textAlign:'center',color:'var(--muted)'}}>
        Chargement…
      </div>
    </div>
  )

  if (!plan) return null

  return (
    <div className="pt">
      {/* Image hero */}
      <div style={{position:'relative',height:'340px',background:'var(--bg2)'}}>
        {plan.img && (
          <Image src={plan.img} alt={plan.title} fill style={{objectFit:'cover'}} sizes="100vw"/>
        )}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,.5),transparent)'}}/>
        <div style={{position:'absolute',bottom:'1.5rem',left:0,right:0}}>
          <div className="container">
            <span style={{background:'var(--sea)',color:'#fff',fontSize:'.75rem',fontWeight:600,padding:'.25rem .75rem',borderRadius:'50px',textTransform:'capitalize'}}>
              {plan.cat}
            </span>
            <h1 style={{color:'#fff',fontFamily:"'Playfair Display',serif",fontSize:'2rem',marginTop:'.5rem'}}>
              {plan.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'2rem 0 4rem',display:'grid',gridTemplateColumns:'1fr 320px',gap:'2rem',alignItems:'start'}}>
        {/* Contenu principal */}
        <div>
          {/* Note */}
          <div style={{display:'flex',alignItems:'center',gap:'.5rem',marginBottom:'1.25rem'}}>
            <span style={{color:'#f59e0b',fontSize:'1.1rem'}}>{'★'.repeat(Math.round(plan.rating))}</span>
            <span style={{fontWeight:700,fontSize:'1.1rem'}}>{plan.rating.toFixed(1)}</span>
            <span style={{color:'var(--muted)',fontSize:'.9rem'}}>({plan.rc} avis)</span>
          </div>

          {/* Description */}
          <p style={{fontSize:'1rem',lineHeight:1.8,color:'var(--fg)',marginBottom:'1.5rem'}}>{plan.desc}</p>

          {/* Infos */}
          <div style={{display:'flex',flexDirection:'column',gap:'.6rem',marginBottom:'2rem'}}>
            {plan.addr && (
              <div style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.9rem',color:'var(--muted)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                {plan.addr}
              </div>
            )}
            {plan.phone && (
              <div style={{display:'flex',alignItems:'center',gap:'.5rem',fontSize:'.9rem',color:'var(--muted)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <a href={`tel:${plan.phone}`} style={{color:'var(--sea)'}}>{plan.phone}</a>
              </div>
            )}
            {plan.map && (
              <div>
                <a href={plan.map} target="_blank" rel="noopener noreferrer"
                  style={{display:'inline-flex',alignItems:'center',gap:'.4rem',fontSize:'.9rem',color:'var(--sea)',fontWeight:500}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  </svg>
                  Voir sur la carte
                </a>
              </div>
            )}
          </div>

          {/* Tags */}
          {plan.tags?.length > 0 && (
            <div style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'2rem'}}>
              {plan.tags.map(tag => (
                <span key={tag} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'50px',padding:'.25rem .75rem',fontSize:'.8rem',color:'var(--muted)'}}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Avis */}
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',marginBottom:'1.25rem'}}>
            Avis ({reviews.length})
          </h2>
          {reviews.length === 0 ? (
            <p style={{color:'var(--muted)',fontSize:'.9rem'}}>Aucun avis pour le moment. Soyez le premier !</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              {reviews.map(r => (
                <div key={r.id} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',padding:'1rem 1.25rem',boxShadow:'var(--sh)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.4rem'}}>
                    <span style={{fontWeight:600,fontSize:'.9rem'}}>{r.author}</span>
                    <span style={{color:'#f59e0b'}}>{'★'.repeat(r.rating)}</span>
                  </div>
                  <p style={{fontSize:'.9rem',color:'var(--fg)',lineHeight:1.6,margin:0}}>{r.comment}</p>
                  <span style={{fontSize:'.75rem',color:'var(--muted)',marginTop:'.4rem',display:'block'}}>
                    {new Date(r.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{position:'sticky',top:'5rem'}}>
          <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',padding:'1.5rem',boxShadow:'var(--sh)',marginBottom:'1rem'}}>
            <div style={{fontWeight:700,fontSize:'1rem',marginBottom:'1rem'}}>Informations</div>
            <div style={{fontSize:'.9rem',color:'var(--muted)',lineHeight:2}}>
              <div>📍 {plan.addr ?? 'Kélibia'}</div>
              {plan.phone && <div>📞 {plan.phone}</div>}
              <div>⭐ {plan.rating.toFixed(1)} / 5</div>
              <div>💬 {plan.rc} avis</div>
            </div>
          </div>
          <Link href="/plans" style={{display:'block',textAlign:'center',padding:'.75rem',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'var(--r)',fontSize:'.9rem',color:'var(--muted)',textDecoration:'none'}}>
            ← Retour aux bons plans
          </Link>
        </div>
      </div>
    </div>
  )
}
