'use client'
import { useState } from 'react'
import { CATS } from '@/lib/data'

export default function AjouterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ title: '', cat: '', addr: '', phone: '', website: '', desc: '', tags: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.cat || !form.desc) return alert('Merci de remplir les champs obligatoires.')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt" style={{padding:'4rem 0'}}>
        <div className="sucbox">
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h2>Merci pour votre contribution !</h2>
          <p>Votre bon plan a été soumis et sera examiné par notre équipe avant publication.</p>
          <div className="sucbtns">
            <button className="bsea" onClick={() => setSubmitted(false)}>Proposer un autre</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Proposer un bon plan</h1>
          <p>Partagez vos adresses préférées avec la communauté</p>
        </div>
      </div>

      <main style={{padding:'2.5rem 0'}}>
        <div className="container">
          <div className="finfo">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p>Votre soumission sera examinée par notre équipe avant d&apos;être publiée. Merci de fournir des informations précises et complètes.</p>
          </div>

          <form className="fwrap" onSubmit={handleSubmit}>
            <div className="ff">
              <label className="fl2">Type <span className="req">*</span></label>
              <div className="ftr2">
                {['Bon plan','Commerce','Service','Hébergement'].map(t => (
                  <button key={t} type="button" className={`ftbtn${form.cat === t ? ' on' : ''}`} onClick={() => setForm(f => ({...f, cat: t}))}>{t}</button>
                ))}
              </div>
            </div>

            <div className="f2c">
              <div className="ff">
                <label className="fl2">Nom du lieu <span className="req">*</span></label>
                <input className="fi" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} placeholder="ex: Restaurant Le Phare"/>
              </div>
              <div className="ff">
                <label className="fl2">Catégorie <span className="req">*</span></label>
                <select className="fi" style={{cursor:'pointer'}} value={form.cat} onChange={e => setForm(f => ({...f, cat: e.target.value}))}>
                  <option value="">Choisir une catégorie</option>
                  {CATS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div className="ff">
              <label className="fl2">Adresse <span className="req">*</span></label>
              <input className="fi" value={form.addr} onChange={e => setForm(f => ({...f, addr: e.target.value}))} placeholder="ex: Rue Habib Bourguiba, Kélibia"/>
            </div>

            <div className="f2c">
              <div className="ff">
                <label className="fl2">Téléphone</label>
                <input className="fi" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="+216 XX XXX XXX"/>
              </div>
              <div className="ff">
                <label className="fl2">Site web</label>
                <input className="fi" value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} placeholder="https://…"/>
              </div>
            </div>

            <div className="ff">
              <label className="fl2">Description <span className="req">*</span></label>
              <textarea className="fta" rows={4} value={form.desc} onChange={e => setForm(f => ({...f, desc: e.target.value}))} placeholder="Décrivez ce lieu en quelques phrases…"/>
            </div>

            <div className="ff">
              <label className="fl2">Mots-clés (séparés par des virgules)</label>
              <input className="fi" value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} placeholder="ex: Vue mer, Fruits de mer, Famille"/>
            </div>

            <button type="submit" className="fsub">Soumettre mon bon plan</button>
          </form>
        </div>
      </main>
    </div>
  )
}
