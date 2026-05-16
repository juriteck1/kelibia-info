'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Contact & Publicité</h1>
          <p>Contactez-nous pour toute question ou partenariat</p>
        </div>
      </div>

      <main style={{padding:'2.5rem 0'}}>
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'2rem'}}>
            {/* Infos */}
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <div className="sbc">
                <h3>Nous contacter</h3>
                <div className="inforow">
                  <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:contact@kelibia.info">contact@kelibia.info</a>
                </div>
                <div className="inforow">
                  <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  <span>Kélibia, Cap Bon, 8090 Tunisie</span>
                </div>
              </div>

              <div className="sbc" style={{background:'var(--sea)',border:'none'}}>
                <h3 style={{color:'#fff'}}>Espace publicitaire</h3>
                <p style={{fontSize:'.84rem',color:'rgba(255,255,255,.8)',lineHeight:1.6,marginBottom:'1rem'}}>
                  Touchez des milliers d&apos;habitants et touristes de Kélibia. Bannières, sponsoring, contenu premium.
                </p>
                {[['Bannière accueil','50 DT/mois'],['Sidebar fiche','30 DT/mois'],['Newsletter','20 DT/envoi']].map(([l,p]) => (
                  <div key={l} style={{display:'flex',justifyContent:'space-between',fontSize:'.83rem',color:'rgba(255,255,255,.9)',padding:'.4rem 0',borderBottom:'1px solid rgba(255,255,255,.1)'}}>
                    <span>{l}</span><strong>{p}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div className="fwrap">
              {sent ? (
                <div style={{textAlign:'center',padding:'2rem 0'}}>
                  <svg style={{width:56,height:56,stroke:'#16a34a',strokeWidth:1.5,fill:'none',margin:'0 auto 1rem',display:'block'}} viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h2 style={{fontFamily:"'Playfair Display',serif",marginBottom:'.5rem'}}>Message envoyé !</h2>
                  <p style={{color:'var(--muted)'}}>Nous vous répondrons dans les plus brefs délais.</p>
                  <button className="bsea" style={{marginTop:'1.5rem'}} onClick={() => setSent(false)}>Envoyer un autre message</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
                  <div className="f2c">
                    <div className="ff"><label className="fl2">Prénom <span className="req">*</span></label><input className="fi" required placeholder="Mohamed"/></div>
                    <div className="ff"><label className="fl2">Email <span className="req">*</span></label><input className="fi" type="email" required placeholder="vous@email.com"/></div>
                  </div>
                  <div className="ff"><label className="fl2">Sujet</label>
                    <select className="fi" style={{cursor:'pointer'}}>
                      <option>Question générale</option>
                      <option>Publicité & partenariat</option>
                      <option>Signaler un problème</option>
                      <option>Proposer un contenu</option>
                    </select>
                  </div>
                  <div className="ff"><label className="fl2">Message <span className="req">*</span></label><textarea className="fta" rows={5} required placeholder="Votre message…"/></div>
                  <button type="submit" className="fsub">Envoyer le message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
