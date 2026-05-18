'use client'
import { useState, useMemo, useEffect } from 'react'
import PlanCard from '@/components/PlanCard'
import { CATS } from '@/lib/data'
import { getPlans } from '@/lib/db'
import type { Plan } from '@/types'

export default function PlansPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('rating')
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlans().then(data => {
      setPlans(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let list = [...plans]
    if (cat !== 'all') list = list.filter(p => p.cat === cat)
    if (q.trim()) list = list.filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.desc.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
    )
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else list.sort((a, b) => b.id - a.id)
    return list
  }, [q, cat, sort, plans])

  if (loading) return (
    <div className="pt">
      <div className="ph"><div className="container"><h1>Bons Plans à Kélibia</h1></div></div>
      <div className="container" style={{padding:'3rem 0',textAlign:'center',color:'var(--muted)'}}>Chargement…</div>
    </div>
  )

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Bons Plans à Kélibia</h1>
          <p>{filtered.length} bons plans partagés par la communauté</p>
        </div>
      </div>
      <div className="fbar">
        <div className="container fbi">
          <div className="frow">
            <div className="fwrap">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Rechercher…"
                value={q}
                onChange={e => setQ(e.target.value)}
              />
            </div>
            <select className="ssel" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rating">Mieux notés</option>
              <option value="recent">Plus récents</option>
            </select>
          </div>
          <div className="pills">
            <button className={`pill${cat === 'all' ? ' on' : ''}`} onClick={() => setCat('all')}>Tous</button>
            {CATS.map(c => (
              <button key={c.id} className={`pill${cat === c.id ? ' on' : ''}`} onClick={() => setCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <main style={{padding:'2.5rem 0',minHeight:400}}>
        <div className="container">
          <p style={{fontSize:'.85rem',color:'var(--muted)',marginBottom:'1.5rem'}}>
            {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            {cat !== 'all' ? ` dans ${CATS.find(c => c.id === cat)?.label}` : ''}
            {q ? ` pour "${q}"` : ''}
          </p>
          {filtered.length > 0 ? (
            <div className="pg">
              {filtered.map(plan => <PlanCard key={plan.id} plan={plan}/>)}
            </div>
          ) : (
            <div className="empty">
              <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <h3>Aucun résultat</h3>
              <p>Essayez une autre recherche ou une autre catégorie.</p>
              <button className="bsea" style={{marginTop:'1rem'}} onClick={() => { setQ(''); setCat('all') }}>Réinitialiser</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
