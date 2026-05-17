'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const IMMO_DATA = [
  { id: 1, type: 'vente', price: 350000, title: 'Villa avec piscine vue mer', addr: 'Route Touristique, Kélibia', surface: 280, rooms: 6, beds: 4, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', featured: true },
  { id: 2, type: 'location', price: 1200, title: 'Appartement T3 front de mer', addr: 'Résidence Mansourah, Kélibia', surface: 85, rooms: 3, beds: 2, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', featured: false },
  { id: 3, type: 'vacances', price: 150, title: 'Maison de vacances 5 pers.', addr: 'Plage Sud, Kélibia', surface: 120, rooms: 4, beds: 3, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', featured: true },
  { id: 4, type: 'vente', price: 180000, title: 'Terrain constructible 600m²', addr: 'Zone résidentielle, Kélibia', surface: 600, rooms: 0, beds: 0, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', featured: false },
]

const TYPE_LABELS: Record<string, string> = { vente: 'Vente', location: 'Location', vacances: 'Vacances' }
const TYPE_CLASSES: Record<string, string> = { vente: 'bv', location: 'bl', vacances: 'bva' }

export default function ImmoPage() {
  const [type, setType] = useState('all')
  const filtered = type === 'all' ? IMMO_DATA : IMMO_DATA.filter(i => i.type === type)

  return (
    <div className="pt">
      <div className="immo-hero">
        <div className="container immo-hero-inner">
          <h1>Immobilier à <em>Kélibia</em></h1>
          <p>Vente, location et vacances — trouvez votre bien sur le Cap Bon</p>
          <div className="isbox">
            <div className="isrow">
              <div className="isf">
                <label>Type de bien</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="all">Tous les types</option>
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                  <option value="vacances">Vacances</option>
                </select>
              </div>
              <div className="isf">
                <label>Budget max</label>
                <input type="number" placeholder="ex: 500 000"/>
              </div>
              <div className="isf">
                <label>Surface min (m²)</label>
                <input type="number" placeholder="ex: 80"/>
              </div>
              <button className="isbtn">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Chercher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{padding:'2rem 0 3rem'}}>
        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'.85rem',marginBottom:'1.5rem'}}>
          {[['124', 'Annonces actives'],['48', 'Ventes'],['52', 'Locations'],['24', 'Vacances']].map(([n,l]) => (
            <div key={l} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',padding:'.85rem 1rem',textAlign:'center',boxShadow:'var(--sh)'}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.4rem',fontWeight:700,color:'var(--sea)'}}>{n}</div>
              <div style={{fontSize:'.72rem',color:'var(--muted)',marginTop:'.15rem'}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:'.5rem',marginBottom:'1.5rem'}}>
          {[['all','Tous'],['vente','Vente'],['location','Location'],['vacances','Vacances']].map(([v,l]) => (
            <button key={v} onClick={() => setType(v)}
              style={{padding:'.45rem 1.1rem',borderRadius:'50px',fontSize:'.82rem',fontWeight:500,border:'1px solid var(--border)',background:type===v?'var(--sea)':'#fff',color:type===v?'#fff':'var(--muted)',cursor:'pointer'}}>
              {l}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="ann-grid">
          {filtered.map(item => (
            <div key={item.id} className="ann-card">
              <div className="aimg">
                <Image src={item.img} alt={item.title} fill style={{objectFit:'cover'}} sizes="50vw"/>
                <span className={`atype ${TYPE_CLASSES[item.type]}`}>{TYPE_LABELS[item.type]}</span>
              </div>
              <div className="ann-body">
                <div className="ann-price">
                  {item.price.toLocaleString('fr-FR')} {item.type === 'vacances' ? 'DT/nuit' : item.type === 'location' ? 'DT/mois' : 'DT'}
                </div>
                <div className="ann-title2">{item.title}</div>
                <div className="ann-aloc">
                  <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  {item.addr}
                </div>
                <div className="ann-specs2">
                  <div className="ann-spec2"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><b>{item.surface}</b> m²</div>
                  {item.rooms > 0 && <div className="ann-spec2"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg><b>{item.rooms}</b> pièces</div>}
                  {item.beds > 0 && <div className="ann-spec2"><svg viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3h20v3z"/></svg><b>{item.beds}</b> ch.</div>}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* BANNIÈRE TRE */}
        <div className="tre-banner">
          <div>
            <div style={{fontSize:'.7rem',letterSpacing:'.15em',color:'#29a8d8',marginBottom:'.5rem'}}>SERVICE EXCLUSIF TRE</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:700,color:'#fff',marginBottom:'.4rem'}}>
              Vous vivez à l&apos;étranger et souhaitez investir à Kélibia ?
            </div>
            <div style={{fontSize:'.87rem',color:'rgba(255,255,255,.6)',marginBottom:'.85rem',lineHeight:1.6}}>
              Recherche personnalisée · Visites en vidéo live · Accompagnement notarial · Gestion à distance
            </div>
            <div className="tre-banner-tags">
              {['🇫🇷 France','🇩🇪 Allemagne','🇮🇹 Italie','🇧🇪 Belgique','🇨🇭 Suisse','🇨🇦 Canada','🌍 +15 pays'].map(p => (
                <span key={p} className="tre-banner-tag">{p}</span>
              ))}
            </div>
          </div>
          <Link href="/tre" style={{background:'#29a8d8',color:'#fff',borderRadius:'var(--r)',padding:'.85rem 1.75rem',fontWeight:600,fontSize:'.9rem',textDecoration:'none',whiteSpace:'nowrap',flexShrink:0}}>
            Demander un accompagnement →
          </Link>
        </div>

        {/* CTA déposer annonce */}
        <div style={{textAlign:'center',marginTop:'2.5rem',padding:'2rem',background:'var(--bg2)',borderRadius:'var(--r-lg)'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',marginBottom:'.5rem'}}>Vous avez un bien à vendre ou louer ?</h3>
          <p style={{fontSize:'.9rem',color:'var(--muted)',marginBottom:'1.25rem'}}>Déposez votre annonce gratuitement sur Kélibia.info</p>
          <Link href="/contact" className="bsea">Déposer une annonce</Link>
        </div>
      </div>
    </div>
  )
}
