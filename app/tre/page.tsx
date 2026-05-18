'use client'
import { useState } from 'react'
import Link from 'next/link'

const STEPS = [
  { n: '01', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8', title: 'Consultation gratuite', desc: 'Échange avec notre expert pour définir votre projet, budget et critères.' },
  { n: '02', icon: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0', title: 'Recherche personnalisée', desc: 'Sélection des biens correspondant à vos critères parmi toutes les annonces disponibles.' },
  { n: '03', icon: 'M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z', title: 'Visite en vidéo live', desc: 'Visite virtuelle en direct avec notre agent sur place, depuis chez vous.' },
  { n: '04', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z', title: 'Accompagnement juridique', desc: 'Suivi notarial, vérification des titres de propriété, gestion administrative complète.' },
  { n: '05', icon: 'M15 7a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.743 5.743L11 17H9v2H7v2H4a1 1 0 0 1-1-1v-2.586a1 1 0 0 1 .293-.707l5.964-5.964A6 6 0 1 1 21 9z', title: 'Remise des clés', desc: "Finalisation de l'acquisition et remise des clés lors de votre prochain séjour." },
]

const AVANTAGES = [
  { icon: 'M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 0 0 4 0 2 2 0 0 1 2-2h1.064M15 20.488V18a2 2 0 0 1 2-2h3.064', title: 'Couverture internationale', desc: '+20 pays, tous fuseaux horaires pris en charge' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Sécurisé & transparent', desc: 'Vérification juridique complète avant tout engagement' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', title: 'Disponible 7j/7', desc: 'Réponse sous 24h, rendez-vous selon votre disponibilité' },
  { icon: 'M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z', title: 'Transfert facilité', desc: "Accompagnement pour le transfert de fonds depuis l'étranger" },
]

const PAYS = ['France', 'Allemagne', 'Italie', 'Belgique', 'Suisse', 'Canada', 'Autre']

export default function TrePage() {
  const [form, setForm] = useState({ prenom: '', email: '', phone: '', pays: '', budget: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.prenom || !form.email || !form.pays) return alert('Merci de remplir les champs obligatoires.')
    setSubmitted(true)
  }

  return (
    <div className="pt">
      {/* HERO */}
      <div className="tre-hero">
        <div className="container tre-hero-inner">
          <div className="tre-sup">SERVICE EXCLUSIF TRE</div>
          <h1 className="tre-h1">Investissez à Kélibia<br/><em>depuis l&apos;étranger</em></h1>
          <p className="tre-sub">Vous êtes Tunisien(ne) résident(e) à l&apos;étranger et vous souhaitez acquérir un bien immobilier à Kélibia ? Notre équipe vous accompagne de A à Z, depuis la recherche jusqu&apos;à la remise des clés.</p>
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
                <div className="tre-av-icon">
                  <svg viewBox="0 0 24 24"><path d={av.icon}/></svg>
                </div>
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
                <div className="tre-step-icon">
                  <svg viewBox="0 0 24 24"><path d={step.icon}/></svg>
                </div>
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
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',fontWeight:700,margin:'.5rem 0 1rem'}}>Démarrez votre projet immobilier</h2>
              <p style={{fontSize:'.9rem',color:'var(--muted)',lineHeight:1.7,marginBottom:'1.5rem'}}>Remplissez ce formulaire et notre expert TRE vous contacte sous 24h pour une consultation gratuite.</p>
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
            <div className="fwrap" style={{flex:'1',minWidth:0}}>
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
                    <div className="ff"><label className="fl2">Prénom <span className="req">*</span></label><input className="fi" value={form.prenom} onChange={e => setForm(f => ({...f, prenom: e.target.value}))} placeholder="Mohamed"/></div>
                    <div className="ff"><label className="fl2">Email <span className="req">*</span></label><input className="fi" type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="vous@email.com"/></div>
                  </div>
                  <div className="f2c">
                    <div className="ff">
                      <label className="fl2">Pays de résidence <span className="req">*</span></label>
                      <select className="fi" style={{cursor:'pointer'}} value={form.pays} onChange={e => setForm(f => ({...f, pays: e.target.value}))}>
                        <option value="">Choisir votre pays</option>
                        {PAYS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="ff"><label className="fl2">Téléphone (WhatsApp)</label><input className="fi" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+33 6 XX XX XX XX"/></div>
                  </div>
                  <div className="f2c">
                    <div className="ff">
                      <label className="fl2">Type de bien</label>
                      <select className="fi" style={{cursor:'pointer'}} value={form
