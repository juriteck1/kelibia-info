'use client'
import { useState } from 'react'
import Link from 'next/link'

const STEPS = [
  { n: '01', title: 'Consultation gratuite', desc: 'Échange avec notre expert pour définir votre projet, budget et critères.' },
  { n: '02', title: 'Recherche personnalisée', desc: 'Sélection des biens correspondant à vos critères parmi toutes les annonces disponibles.' },
  { n: '03', title: 'Visite en vidéo live', desc: 'Visite virtuelle en direct avec notre agent sur place, depuis chez vous.' },
  { n: '04', title: 'Accompagnement juridique', desc: 'Suivi notarial, vérification des titres de propriété, gestion administrative complète.' },
  { n: '05', title: 'Remise des clés', desc: "Finalisation de l'acquisition et remise des clés lors de votre prochain séjour." },
]

const AVANTAGES = [
  { title: 'Couverture internationale', desc: '+20 pays, tous fuseaux horaires pris en charge' },
  { title: 'Sécurisé & transparent', desc: 'Vérification juridique complète avant tout engagement' },
  { title: 'Disponible 7j/7', desc: 'Réponse sous 24h, rendez-vous selon votre disponibilité' },
  { title: 'Transfert facilité', desc: "Accompagnement pour le transfert de fonds depuis l'étranger" },
]

const PAYS = ['France', 'Allemagne', 'Italie', 'Belgique', 'Suisse', 'Canada', 'Autre']

export default function TrePage() {
  const [form, setForm] = useState({ prenom: '', email: '', phone: '', pays: '', budget: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.prenom || !form.email || !form.pays) {
      alert('Merci de remplir les champs obligatoires.')
      return
    }
    setSubmitted(true)
  }

  return (
    <div className="pt">

      {/* HERO */}
      <div className="tre-hero">
        <div className="container tre-hero-inner">
          <div className="tre-sup">SERVICE EXCLUSIF TRE</div>
          <h1 className="tre-h1">Investissez à Kélibia<br/><em>depuis l&apos;étranger</em></h1>
          <p className="tre-sub">
            Vous êtes Tunisien(ne) résident(e) à l&apos;étranger et vous souhaitez acquérir un bien immobilier à Kélibia ?
            Notre équipe vous accompagne de A à Z, depuis la recherche jusqu&apos;à la remise des clés.
          </p>
          <div className="tre-hbtns">
            <a href="#formulaire" className="bt">Démarrer ma recherche</a>
            <Link href="/immo" className="bow">Voir les biens disponibles</Link>
          </div>
          <div className="tre-pays">
            {['🇫🇷 France','🇩🇪 Allemagne','🇮🇹 Italie','🇧🇪 Belgique','🇨🇭 Suisse','🇨🇦 Canada','🌍 +15 pays'].map(p => (
              <span key={p} className="tre-pays-tag">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* AVANTAGES */}
      <section style={{padding:'3rem 0',background:'var(--bg2)'}}>
        <div className="container">
          <div className="tre-av-grid">
            {AVANTAGES.map((av, i) => (
              <div key={i} className="tre-av">
                <div className="tre-av-title">{av.title}</div>
                <div className="tre-av-desc">{av.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉTAPES */}
      <section style={{padding:'3.5rem 0'}}>
        <div className="container">
          <div className="sh2" style={{marginBottom:'2.5rem'}}>
            <div>
              <h2>Comment ça marche ?</h2>
              <p>5 étapes pour acquérir votre bien en toute sérénité</p>
            </div>
          </div>
          <div className="tre-steps">
            {STEPS.map((step, i) => (
              <div key={i} className="tre-step">
                <div className="tre-step-n">{step.n}</div>
                <div className="tre-step-title">{step.title}</div>
                <div className="tre-step-desc">{step.desc}</div>
                {i < STEPS.length - 1 && <div className="tre-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section id="formulaire" style={{padding:'3.5rem 0',background:'var(--bg2)'}}>
        <div className="container">
          <div className="tre-form-wrap">

            <div className="tre-form-left">
              <div className="tre-sup" style={{color:'var(--turq)'}}>CONSULTATION GRATUITE</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',fontWeight:700,margin:'.5rem 0 1rem'}}>
                Démarrez votre projet immobilier
              </h2>
              <p style={{fontSize:'.9rem',color:'var(--muted)',lineHeight:1.7,marginBottom:'1.5rem'}}>
                Remplissez ce formulaire et notre expert TRE vous contacte sous 24h pour une consultation gratuite.
              </p>
              <div className="tre-contact-info">
                <div className="inforow">
                  <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:tre@kelibia.info">tre@kelibia.info</a>
                </div>
                <div className="inforow">
                  <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+216 72 296 XXX</span>
                </div>
              </div>
            </div>

            <div style={{flex:'1',minWidth:0}}>
              {submitted ? (
                <div className="sucbox">
                  <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h2>Demande envoyée !</h2>
                  <p>Notre expert TRE vous contactera dans les 24h pour votre consultation gratuite.</p>
                  <button className="bsea" onClick={() => setSubmitted(false)}>Envoyer une autre demande</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',padding:'1.75rem',boxShadow:'var(--sh)'}}>
                  <div className="f2c">
                    <div className="ff">
                      <label className="fl2">Prénom <span className="req">*</span></label>
                      <input className="fi" value={form.prenom} onChange={e => setForm(f => ({...f, prenom: e.target.value}))} placeholder="Mohamed"/>
                    </div>
                    <div className="ff">
                      <label className="fl2">Email <span className="req">*</span></label>
                      <input className="fi" type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="vous@email.com"/>
                    </div>
                  </div>
                  <div className="f2c">
                    <div className="ff">
                      <label className="fl2">Pays de résidence <span className="req">*</span></label>
                      <select className="fi" value={form.pays} onChange={e => setForm(f => ({...f, pays: e.target.value}))}>
                        <option value="">Choisir votre pays</option>
                        {PAYS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="ff">
                      <label className="fl2">Téléphone (WhatsApp)</label>
                      <input className="fi" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+33 6 XX XX XX XX"/>
                    </div>
                  </div>
                  <div className="f2c">
                    <div className="ff">
                      <label className="fl2">Type de bien</label>
                      <select className="fi" value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))}>
                        <option value="">Tous types</option>
                        <option>Villa / Maison</option>
                        <option>Appartement</option>
                        <option>Terrain</option>
                        <option>Local commercial</option>
                      </select>
                    </div>
                    <div className="ff">
                      <label className="fl2">Budget indicatif</label>
                      <select className="fi" value={form.budget} onChange={e => setForm(f => ({...f, budget: e.target.value}))}>
                        <option value="">Choisir une fourchette</option>
                        <option>Moins de 100 000 DT</option>
                        <option>100 000 – 200 000 DT</option>
                        <option>200 000 – 350 000 DT</option>
                        <option>350 000 – 500 000 DT</option>
                        <option>Plus de 500 000 DT</option>
                      </select>
                    </div>
                  </div>
                  <div className="ff">
                    <label className="fl2">Message (optionnel)</label>
                    <textarea className="fta" rows={3} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Décrivez votre projet, vos critères, votre situation…"/>
                  </div>
                  <button type="submit" className="fsub">Envoyer ma demande — consultation gratuite</button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
