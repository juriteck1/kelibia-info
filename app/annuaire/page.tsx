'use client'
import { useState } from 'react'
import Image from 'next/image'
import { PLANS, CATS } from '@/lib/data'

export default function AnnuairePage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const filtered = PLANS.filter(p => {
    const matchCat = cat === 'all' || p.cat === cat
    const matchQ = !q.trim() || p.title.toLowerCase().includes(q.toLowerCase()) || p.addr.toLowerCase().includes(q.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Annuaire de Kélibia</h1>
          <p>Commerces, restaurants, hébergements et services locaux</p>
        </div>
      </div>

      <div className="fbar">
        <div className="container fbi">
          <div className="frow">
            <div className="fwrap">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Rechercher un commerce, service…" value={q} onChange={e => setQ(e.target.value)}/>
            </div>
          </div>
          <div className="pills">
            <button className={`pill${cat === 'all' ? ' on' : ''}`} onClick={() => setCat('all')}>Tous</button>
            {CATS.map(c => (
              <button key={c.id} className={`pill${cat === c.id ? ' on' : ''}`} onClick={() => setCat(c.id)}>{c.label}</button>
            ))}
          </div>
        </div>
      </div>

      <main style={{padding:'2.5rem 0',minHeight:400}}>
        <div className="container">
          {filtered.length > 0 ? (
            <div className="ag">
              {filtered.map(item => (
                <div key={item.id} className="ac">
                  <div className="ath">
                    {item.img && <Image src={item.img} alt={item.title} width={80} height={80} style={{objectFit:'cover',width:'100%',height:'100%'}}/>}
                  </div>
                  <div className="ain">
                    <div className="atop">
                      <div className="aname">{item.title}</div>
                      <span className={`badge ${CATS.find(c=>c.id===item.cat)?.bc}`}>{CATS.find(c=>c.id===item.cat)?.label}</span>
                    </div>
                    <div className="asr">
                      {Array.from({length:5},(_,i)=>(
                        <svg key={i} className={i<Math.round(item.rating)?'sf':'se'} style={{width:12,height:12,fill:'currentColor'}} viewBox="0 0 24 24">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                      <span className="arn">{item.rating}</span>
                      <span className="arc">({item.rc} avis)</span>
                    </div>
                    <div className="aloc">
                      <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                      {item.addr}
                    </div>
                    {item.phone && (
                      <div className="aph">
                        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.128.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <a href={`tel:${item.phone}`}>{item.phone}</a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>Aucun résultat</h3>
              <p>Essayez une autre recherche.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
