'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { addPlan } from '@/lib/db'

const CATS = [
  { id: 'plage',      label: '🏖️ Plage / Nature' },
  { id: 'restaurant', label: '🍽️ Restaurant' },
  { id: 'cafe',       label: '☕ Café / Pâtisserie' },
  { id: 'activite',   label: '🤿 Activité / Sport' },
  { id: 'culture',    label: '🏛️ Culture / Patrimoine' },
  { id: 'commerce',   label: '🛍️ Commerce / Shopping' },
  { id: 'service',    label: '🔧 Service' },
  { id: 'hebergement',label: '🏨 Hébergement' },
]

const SUGGESTED_TAGS: Record<string, string[]> = {
  plage:       ['Famille', 'Sable fin', 'Eau claire', 'Snorkeling', 'Vue mer'],
  restaurant:  ['Poissons frais', 'Terrasse', 'Vue mer', 'Local', 'Fruits de mer'],
  cafe:        ['Thé', 'Café', 'Pâtisseries', 'Shisha', 'Vue mer'],
  activite:    ['Kayak', 'Plongée', 'Voile', 'Sport nautique', 'Famille'],
  culture:     ['Histoire', 'Patrimoine', 'Byzantine', 'Panorama', 'Gratuit'],
  commerce:    ['Artisanat', 'Local', 'Produits frais', 'Souvenirs'],
  service:     ['Médical', 'Pharmacie', 'Banque', 'Rapide'],
  hebergement: ['Vue mer', 'Piscine', 'Famille', 'Calme', 'Centre-ville'],
}

type Step = 1 | 2 | 3

export default function AjouterPage() {
  const { user } = useAuth()
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    cat: '',
    description: '',
    addr: '',
    phone: '',
    tags: [] as string[],
    tagInput: '',
  })

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function addTag(tag: string) {
    const t = tag.trim()
    if (t && !form.tags.includes(t) && form.tags.length < 8) {
      setForm(f => ({ ...f, tags: [...f.tags, t], tagInput: '' }))
    }
  }

  function removeTag(tag: string) {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))
  }

  function canGoNext() {
    if (step === 1) return form.title.trim().length >= 3 && form.cat !== ''
    if (step === 2) return form.description.trim().length >= 20 && form.addr.trim().length >= 3
    return true
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    try {
      await addPlan({
        title: form.title.trim(),
        cat: form.cat,
        description: form.description.trim(),
        addr: form.addr.trim(),
        phone: form.phone.trim() || undefined,
        tags: form.tags,
        user_id: user?.id,
      })
      setSubmitted(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  // Success
  if (submitted) return (
    <div className="pt">
      <div className="container" style={{ padding: '5rem 0', maxWidth: 480, textAlign: 'center' }}>
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--r-lg)', padding: '2.5rem', boxShadow: 'var(--sh)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: '#166534', marginBottom: '.75rem' }}>Bon plan envoyé !</h2>
          <p style={{ color: '#15803d', fontSize: '.9rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Merci pour votre contribution ! Votre bon plan <strong>"{form.title}"</strong> est en attente de validation. Il sera publié sous 24h.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm({ title: '', cat: '', description: '', addr: '', phone: '', tags: [], tagInput: '' }) }}
              style={{ background: 'var(--sea)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '.6rem 1.2rem', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              + Ajouter un autre
            </button>
            <a href="/plans" style={{ display: 'inline-flex', alignItems: 'center', background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '.6rem 1.2rem', fontSize: '.875rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', fontFamily: 'inherit' }}>
              Voir les bons plans
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  const suggestedTags = form.cat ? (SUGGESTED_TAGS[form.cat] ?? []) : []

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Proposer un bon plan</h1>
          <p>Partagez vos adresses et découvertes avec la communauté</p>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 0', maxWidth: 640 }}>

        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '2rem' }}>
          {([1, 2, 3] as Step[]).map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: step >= s ? 'var(--sea)' : '#e5e7eb', color: step >= s ? '#fff' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', fontWeight: 700, flexShrink: 0, transition: 'all .2s' }}>
                  {step > s ? '✓' : s}
                </div>
                <span style={{ fontSize: '.78rem', fontWeight: 600, color: step >= s ? 'var(--sea)' : '#9ca3af', whiteSpace: 'nowrap' }}>
                  {s === 1 ? 'Catégorie' : s === 2 ? 'Détails' : 'Confirmation'}
                </span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: step > s ? 'var(--sea)' : '#e5e7eb', margin: '0 .75rem', transition: 'all .2s' }} />}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '2rem', boxShadow: 'var(--sh)' }}>

          {/* ── ÉTAPE 1 ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', marginBottom: '.4rem' }}>Nom et catégorie</h2>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: '1.5rem' }}>Comment s'appelle ce bon plan et dans quelle catégorie ?</p>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Nom du bon plan *</label>
                <input className="fi" type="text" placeholder="Ex: Restaurant Le Pêcheur, Plage El Mansourah…" value={form.title} onChange={e => set('title', e.target.value)} maxLength={80} />
                <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: '.25rem', textAlign: 'right' }}>{form.title.length}/80</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.75rem' }}>Catégorie *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.6rem' }}>
                  {CATS.map(c => (
                    <button key={c.id} onClick={() => set('cat', c.id)}
                      style={{ padding: '.7rem 1rem', borderRadius: 'var(--r)', border: `2px solid ${form.cat === c.id ? 'var(--sea)' : 'var(--border)'}`, background: form.cat === c.id ? 'rgba(41,168,216,.07)' : '#fff', color: form.cat === c.id ? 'var(--sea)' : 'var(--text)', fontSize: '.85rem', fontWeight: form.cat === c.id ? 600 : 400, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all .15s' }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 2 ── */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', marginBottom: '.4rem' }}>Description et adresse</h2>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: '1.5rem' }}>Décrivez ce qui rend cet endroit spécial.</p>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Description *</label>
                <textarea className="fta" rows={4} placeholder="Décrivez l'endroit : spécialités, ambiance, ce qui le rend unique à Kélibia…" value={form.description} onChange={e => set('description', e.target.value)} maxLength={500} />
                <div style={{ fontSize: '.72rem', color: form.description.length < 20 ? '#dc2626' : 'var(--muted)', marginTop: '.25rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{form.description.length < 20 ? `Minimum 20 caractères (${20 - form.description.length} restants)` : '✓ Bonne description'}</span>
                  <span>{form.description.length}/500</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Adresse / Quartier *</label>
                <input className="fi" type="text" placeholder="Ex: Avenue Habib Bourguiba, Centre-ville Kélibia…" value={form.addr} onChange={e => set('addr', e.target.value)} />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Téléphone <span style={{ fontWeight: 400 }}>(optionnel)</span></label>
                <input className="fi" type="tel" placeholder="Ex: +216 XX XXX XXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Tags <span style={{ fontWeight: 400 }}>(optionnel, max 8)</span></label>
                {suggestedTags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.6rem' }}>
                    {suggestedTags.filter(t => !form.tags.includes(t)).map(t => (
                      <button key={t} onClick={() => addTag(t)}
                        style={{ padding: '.25rem .65rem', borderRadius: '50px', border: '1px dashed var(--border)', background: 'none', fontSize: '.75rem', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit' }}>
                        + {t}
                      </button>
                    ))}
                  </div>
                )}
                {form.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '.6rem' }}>
                    {form.tags.map(t => (
                      <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', padding: '.25rem .65rem', borderRadius: '50px', background: 'rgba(41,168,216,.1)', border: '1px solid rgba(41,168,216,.3)', fontSize: '.75rem', color: 'var(--sea)', fontWeight: 500 }}>
                        {t}
                        <button onClick={() => removeTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sea)', padding: 0, lineHeight: 1, fontSize: '.85rem' }}>×</button>
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '.5rem' }}>
                  <input className="fi" type="text" placeholder="Ajouter un tag…" value={form.tagInput} onChange={e => setForm(f => ({ ...f, tagInput: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(form.tagInput) } }} style={{ flex: 1 }} />
                  <button onClick={() => addTag(form.tagInput)} style={{ background: 'var(--sea)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '.5rem 1rem', fontSize: '.85rem', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── ÉTAPE 3 ── */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', marginBottom: '.4rem' }}>Vérification</h2>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem', marginBottom: '1.5rem' }}>Vérifiez les informations avant d'envoyer.</p>

              <div style={{ background: '#f8fafc', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '1.25rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '.75rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.05rem', marginBottom: '.2rem' }}>{form.title}</h3>
                    <span style={{ fontSize: '.75rem', background: 'rgba(41,168,216,.1)', color: 'var(--sea)', padding: '.15rem .5rem', borderRadius: '50px', fontWeight: 600 }}>
                      {CATS.find(c => c.id === form.cat)?.label}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '.6rem' }}>{form.description}</p>
                <div style={{ fontSize: '.82rem', color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
                  <span>📍 {form.addr}</span>
                  {form.phone && <span>📞 {form.phone}</span>}
                  {form.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', marginTop: '.3rem' }}>
                      {form.tags.map(t => <span key={t} style={{ background: '#e5e7eb', borderRadius: '50px', padding: '.1rem .5rem', fontSize: '.72rem' }}>{t}</span>)}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 'var(--r)', padding: '1rem', fontSize: '.82rem', color: '#92400e' }}>
                ⏳ Votre bon plan sera <strong>examiné par notre équipe</strong> avant publication (généralement sous 24h).
              </div>

              {error && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--r)', padding: '.75rem 1rem', fontSize: '.85rem', color: '#dc2626', marginTop: '1rem' }}>{error}</div>}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <button onClick={() => setStep(s => (s - 1) as Step)} disabled={step === 1}
              style={{ padding: '.6rem 1.25rem', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: '#fff', fontSize: '.875rem', color: step === 1 ? '#9ca3af' : 'var(--text)', cursor: step === 1 ? 'default' : 'pointer', fontFamily: 'inherit' }}>
              ← Retour
            </button>
            {step < 3 ? (
              <button onClick={() => setStep(s => (s + 1) as Step)} disabled={!canGoNext()}
                style={{ padding: '.6rem 1.5rem', borderRadius: 'var(--r)', border: 'none', background: canGoNext() ? 'var(--sea)' : '#d1d5db', color: '#fff', fontSize: '.875rem', fontWeight: 600, cursor: canGoNext() ? 'pointer' : 'default', fontFamily: 'inherit' }}>
                Continuer →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting}
                style={{ padding: '.6rem 1.5rem', borderRadius: 'var(--r)', border: 'none', background: 'var(--sea)', color: '#fff', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {submitting ? 'Envoi en cours…' : '✓ Proposer ce bon plan'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
