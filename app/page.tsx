import Link from 'next/link'
import Image from 'next/image'
import PlanCard from '@/components/PlanCard'
import { PLANS, CATS } from '@/lib/data'

const IMMO_FEATURED = [
  { id: 1, type: 'vente', price: 350000, title: 'Villa avec piscine vue mer', addr: 'Route Touristique, Kélibia', surface: 280, rooms: 6, img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
  { id: 2, type: 'location', price: 1200, title: 'Appartement T3 front de mer', addr: 'Résidence Mansourah, Kélibia', surface: 85, rooms: 3, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: 3, type: 'vacances', price: 150, title: 'Maison de vacances 5 pers.', addr: 'Plage Sud, Kélibia', surface: 120, rooms: 4, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
]

export default function HomePage() {
  const featured = PLANS.filter(p => p.featured)
  const all = PLANS.slice(0, 6)

  const catIcons: Record<string, React.ReactNode> = {
    plage: <svg viewBox="0 0 24 24"><path d="M2 6c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/><path d="M2 12c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/><path d="M2 18c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0"/></svg>,
    restaurant: <svg viewBox="0 0 24 24"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>,
    activite: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    commerce: <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    service: <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    hebergement: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    immobilier:  <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  }

  const catColors: Record<string, string> = {
    plage: 'rgba(14,165,233,.1)',
    restaurant: 'rgba(234,88,12,.1)',
    activite: 'rgba(22,163,74,.1)',
    commerce: 'rgba(202,138,4,.1)',
    service: 'rgba(124,58,237,.1)',
    hebergement: 'rgba(29,78,216,.1)',
    immobilier: '#0c2044',
  }
  const catTextColors: Record<string, string> = {
    plage: '#0ea5e9', restaurant: '#ea580c', activite: '#16a34a',
    commerce: '#ca8a04', service: '#7c3aed', hebergement: '#1d4ed8',
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hbg">
          <Image src="https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/hero-kelibia-b4XwMAwNAhc2z7ETEdiWkF.webp" alt="Kélibia vue aérienne" fill style={{objectFit:'cover'}} priority/>
          <div className="hgr"/>
        </div>
        <div className="container" style={{position:'relative',zIndex:1}}>
          <div className="hcon">
            <div className="hloc">
              <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Cap Bon, Tunisie</span>
            </div>
            <h1>Découvrez<br/><em>Kélibia</em></h1>
            <p>La plateforme communautaire de Kélibia. Bons plans, restaurants, plages, services — partagés par les habitants et les visiteurs.</p>
            <form className="hsbar" action="/plans">
              <div className="hswrap">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input name="q" type="text" placeholder="Rechercher un bon plan, un service…"/>
              </div>
              <button type="submit">Chercher</button>
            </form>
            <div className="htags">
              {['Plages', 'Restaurants', 'Fort de Kélibia', 'Activités'].map(tag => (
                <Link key={tag} href={`/plans?q=${tag}`} className="htag">{tag}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="hwave">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#faf9f7"/></svg>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-s">
        <div className="container">
          <div className="sg">
            {[
              { n: '47+', l: 'Bons plans', ic: <svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>, bg: 'rgba(30,77,140,.08)', c: '#1e4d8c' },
              { n: '312+', l: 'Avis', ic: <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, bg: 'rgba(41,168,216,.08)', c: '#29a8d8' },
              { n: '1 240+', l: 'Membres', ic: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, bg: 'rgba(234,88,12,.08)', c: '#ea580c' },
              { n: '6+', l: 'Catégories', ic: <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>, bg: 'rgba(22,163,74,.08)', c: '#16a34a' },
            ].map((s, i) => (
              <div key={i} className="sc">
                <div className="si" style={{background:s.bg,color:s.c}}>{s.ic}</div>
                <div><div className="sn">{s.n}</div><div className="sl">{s.l}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="sec bc2" style={{paddingTop:'1.5rem'}}>
        <div className="container">
          <div className="sh2"><div><h2>Explorer par catégorie</h2><p>Trouvez ce que vous cherchez à Kélibia</p></div></div>
          <div className="cg">
            {CATS.map(cat => (
              <Link key={cat.id}
                href={cat.id === 'immobilier' ? '/immo' : `/plans?cat=${cat.id}`}
                className={`cb${cat.id === 'immobilier' ? ' cb-immo' : ''}`}>
                <div className="cbi" style={{background:catColors[cat.id],color:catTextColors[cat.id]}}>
                  {catIcons[cat.id]}
                </div>
                <span className={`cbn${cat.id === 'immobilier' ? ' cbn-immo' : ''}`}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* IMMOBILIER */}
      <section className="immo-home">
        <div className="container">
          <div className="ih-head">
            <div>
              <div className="ih-sup">IMMOBILIER À KÉLIBIA</div>
              <h2 className="ih-title">Trouvez votre bien au <em>Cap Bon</em></h2>
            </div>
            <Link href="/immo" className="bsea-sm">Voir toutes les annonces →</Link>
          </div>
          <div className="ih-grid">
            {IMMO_FEATURED.map(item => (
              <Link href="/immo" key={item.id} className="ih-card">
                <div className="ih-img">
                  <Image src={item.img} alt={item.title} fill style={{objectFit:'cover'}} sizes="33vw"/>
                  <span className={`ih-type ${item.type === 'vente' ? 'ih-v' : item.type === 'location' ? 'ih-l' : 'ih-va'}`}>
                    {item.type === 'vente' ? 'Vente' : item.type === 'location' ? 'Location' : 'Vacances'}
                  </span>
                </div>
                <div className="ih-body">
                  <div className="ih-price">
                    {item.price.toLocaleString('fr-FR')} {item.type === 'vacances' ? 'DT/nuit' : item.type === 'location' ? 'DT/mois' : 'DT'}
                  </div>
                  <div className="ih-ttl">{item.title}</div>
                  <div className="ih-loc">
                    <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    {item.addr}
                  </div>
                  <div className="ih-specs">
                    <span><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>{item.surface} m²</span>
                    <span><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>{item.rooms} pièces</span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/tre" className="ih-tre">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div className="ih-tre-title">Vous êtes TRE ?</div>
              <div className="ih-tre-sub">Accompagnement complet pour acquérir votre bien depuis l&apos;étranger</div>
              <span className="ih-tre-btn">Découvrir le service →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* BANNIÈRE TRE */}
      <section style={{padding:'0 0 2rem',background:'var(--bg2)'}}>
        <div className="container">
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
        </div>
      </section>

      {/* COUPS DE COEUR */}
      <section className="sec bw">
        <div className="container">
          <div className="sh2">
            <div><h2>Coups de cœur</h2><p>Les incontournables de Kélibia</p></div>
            <Link href="/plans" className="slink">Voir tout <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></Link>
          </div>
          <div className="pg">
            {featured.map(plan => <PlanCard key={plan.id} plan={plan}/>)}
          </div>
        </div>
      </section>

      {/* PUB */}
      <section className="pub">
        <div className="container">
          <div className="pubi">
            <div>
              <p className="pub-l">Espace publicitaire</p>
              <p className="pub-t">Votre commerce ou service sur Kélibia.info — Touchez les habitants et les touristes</p>
            </div>
            <Link href="/contact" className="pub-btn">Nous contacter</Link>
          </div>
        </div>
      </section>

      {/* TOUS LES BONS PLANS */}
      <section className="sec bc2">
        <div className="container">
          <div className="sh2"><div><h2>Tous les bons plans</h2><p>Partagés par la communauté de Kélibia</p></div></div>
          <div className="pg">
            {all.map(plan => <PlanCard key={plan.id} plan={plan}/>)}
          </div>
          <div style={{textAlign:'center',marginTop:'2rem'}}>
            <Link href="/plans" className="bsea">
              Voir tous les bons plans
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="cta-s" style={{minHeight:300}}>
        <div className="ctabg">
          <Image src="https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp" alt="Plage" fill style={{objectFit:'cover',objectPosition:'center 40%'}}/>
          <div className="ctaov"/>
        </div>
        <div className="ctacon">
          <h2>Vous connaissez un bon plan ?</h2>
          <p>Partagez vos adresses préférées avec la communauté de Kélibia.</p>
          <div className="ctabtns">
            <Link href="/ajouter" className="bt">Proposer un bon plan</Link>
            <Link href="/annuaire" className="bow">Voir l&apos;annuaire</Link>
          </div>
        </div>
      </section>
    </>
  )
}
