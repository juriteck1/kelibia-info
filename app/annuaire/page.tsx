'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { ANNUAIRE, ANNUAIRE_CATS } from '@/lib/data'

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} style={{ width: 12, height: 12, fill: i < Math.round(rating) ? '#f59e0b' : '#e5e7eb' }} viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span style={{ fontSize: '.75rem', color: 'var(--muted)', marginLeft: 4 }}>{rating.toFixed(1)} ({rating > 0 ? Math.floor(rating * 10) : 0} avis)</span>
    </div>
  )
}

const CAT_ICONS: Record<string, React.ReactNode> = {
  commerce:       <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  restaurant:     <svg viewBox="0 0 24 24"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
  sante:          <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  service:        <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  artisan:        <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  administration: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
}

const CAT_COLORS: Record<string, { bg: string; color: string }> = {
  commerce:       { bg: 'rgba(202,138,4,.1)',   color: '#ca8a04' },
  restaurant:     { bg: 'rgba(234,88,12,.1)',   color: '#ea580c' },
  sante:          { bg: 'rgba(22,163,74,.1)',   color: '#16a34a' },
  service:        { bg: 'rgba(29,78,216,.1)',   color: '#1d4ed8' },
  artisan:        { bg: 'rgba(124,58,237,.1)',  color: '#7c3aed' },
  administration: { bg: 'rgba(100,116,139,.1)', color: '#475569' },
}

export default function AnnuairePage() {
  const [cat, setCat] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return ANNUAIRE.filter(item => {
      const matchCat = cat === 'all' || item.cat === cat
      const q = search.toLowerCase()
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.addr.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [cat, search])

  return (
    <div className="pt">
      {/* HERO */}
      <div className="ph">
        <div className="container">
          <h1>Annuaire de Kélibia</h1>
          <p>Commerces, services, professionnels et administrations — tout Kélibia en un clic</p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 0 3rem' }}>
        {/* Barre de recherche */}
        <div className="an-search">
          <div className="an-sinput">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Rechercher un commerce, un professionnel…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filtres catégories */}
        <div className="an-filters">
          {ANNUAIRE_CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`an-ftab${cat === c.id ? ' on' : ''}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <p className="an-count">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>

        {/* Grille */}
        {filtered.length > 0 ? (
          <div className="an-grid">
            {filtered.map(item => {
              const clr = CAT_COLORS[item.cat] || { bg: 'rgba(0,0,0,.06)', color: '#374151' }
              const catLabel = ANNUAIRE_CATS.find(c => c.id === item.cat)?.label || item.cat
              return (
                <div key={item.id} className="an-card">
                  <div className="an-img">
                    <Image src={item.img} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 33vw"/>
                    <span className="an-badge" style={{ background: clr.bg, color: clr.color }}>
                      <span className="an-badge-icon" style={{ color: clr.color }}>{CAT_ICONS[item.cat]}</span>
                      {catLabel}
                    </span>
                  </div>
                  <div className="an-body">
                    <div className="an-name">{item.name}</div>
                    <Stars rating={item.rating} />
                    <p className="an-desc">{item.desc}</p>
                    <div className="an-info">
                      <div className="an-row">
                        <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        <span>{item.addr}</span>
                      </div>
                      {item.phone && (
                        <div className="an-row">
                          <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <a href={`tel:${item.phone}`}>{item.phone}</a>
                        </div>
                      )}
                      {item.email && (
                        <div className="an-row">
                          <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                          <a href={`mailto:${item.email}`}>{item.email}</a>
                        </div>
                      )}
                    </div>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="an-cta">
                        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Appeler
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="empty">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <h3>Aucun résultat</h3>
            <p>Essayez une autre recherche ou catégorie.</p>
          </div>
        )}
      </div>
    </div>
  )
}
