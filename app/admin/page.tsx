'use client'
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/lib/auth-context'
import {
  getAdminStats, getAllPlans, getAllEvents,
  updatePlanStatus, deletePlan, deleteEvent
} from '@/lib/db'
import type { Plan, Event } from '@/types'

const ADMIN_EMAIL = 'mohamedamine.khemiri@gmail.com'
type PlanRow = Plan & { status: string }
type EventRow = Event & { status: string }
type Stats = { plans: number; pending: number; events: number; users: number; immo: number }

export default function AdminPage() {
  const { user, loading, signInWithPassword } = useAuth()
  const [tab, setTab] = useState<'plans' | 'events'>('plans')
  const [stats, setStats] = useState<Stats>({ plans: 0, pending: 0, events: 0, users: 0, immo: 0 })
  const [plans, setPlans] = useState<PlanRow[]>([])
  const [events, setEvents] = useState<EventRow[]>([])
  const [fetching, setFetching] = useState(true)
  const [busy, setBusy] = useState<number | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loginBusy, setLoginBusy] = useState(false)

  const loadAll = useCallback(async () => {
    setFetching(true)
    try {
      const [s, p, e] = await Promise.all([
        getAdminStats().catch(() => ({ plans: 0, pending: 0, events: 0, users: 0, immo: 0 })),
        getAllPlans().catch(() => []),
        getAllEvents().catch(() => []),
      ])
      setStats(s); setPlans(p); setEvents(e)
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && user?.email === ADMIN_EMAIL) loadAll()
    else if (!loading) setFetching(false)
  }, [user, loading, loadAll])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginErr('')
    setLoginBusy(true)
    const err = await signInWithPassword(email.trim(), password)
    setLoginBusy(false)
    if (err) setLoginErr(err)
  }

  async function approvePlan(id: number) {
    setBusy(id)
    await updatePlanStatus(id, 'published').catch(() => {})
    await loadAll()
    setBusy(null)
  }

  async function rejectPlan(id: number) {
    setBusy(id)
    await updatePlanStatus(id, 'rejected').catch(() => {})
    await loadAll()
    setBusy(null)
  }

  async function handleDeletePlan(id: number) {
    if (!confirm('Supprimer ce plan ?')) return
    setBusy(id)
    await deletePlan(id).catch(() => {})
    await loadAll()
    setBusy(null)
  }

  async function handleDeleteEvent(id: number) {
    if (!confirm('Supprimer cet événement ?')) return
    setBusy(id)
    await deleteEvent(id).catch(() => {})
    await loadAll()
    setBusy(null)
  }

  // --- LOADING ---
  if (loading || fetching) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>Chargement…</p>
    </div>
  )

  // --- LOGIN FORM ---
  if (!user || user.email !== ADMIN_EMAIL) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '2.5rem', width: '100%', maxWidth: 400, boxShadow: 'var(--sh)' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', marginBottom: '.4rem', textAlign: 'center' }}>Administration</h2>
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', textAlign: 'center', marginBottom: '2rem' }}>Kélibia.info</p>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Email</label>
            <input className="fi" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@exemple.com" autoComplete="email" />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Mot de passe</label>
            <input className="fi" type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </div>
          {loginErr && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--r)', padding: '.75rem 1rem', fontSize: '.83rem', color: '#dc2626', marginBottom: '1rem' }}>
              {loginErr}
            </div>
          )}
          <button type="submit" disabled={loginBusy} style={{ width: '100%', background: 'var(--sea)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '.75rem', fontSize: '.95rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            {loginBusy ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )

  // --- ADMIN PANEL ---
  const pending = plans.filter(p => p.status === 'pending')
  const published = plans.filter(p => p.status === 'published')

  return (
    <div className="pt" style={{ background: '#f1f5f9', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.6rem' }}>Administration — Kélibia.info</h1>
          <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>{user.email}</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Plans publiés', val: stats.plans, color: '#1e4d8c' },
            { label: 'En attente', val: stats.pending, color: '#f59e0b' },
            { label: 'Événements', val: stats.events, color: '#29a8d8' },
            { label: 'Annonces immo', val: stats.immo, color: '#16a34a' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '1.2rem', boxShadow: 'var(--sh)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', fontWeight: 700, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.5rem' }}>
          {(['plans', 'events'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '.5rem 1.2rem', borderRadius: 'var(--r)', border: 'none', fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer', background: tab === t ? 'var(--sea)' : '#fff', color: tab === t ? '#fff' : 'var(--muted)', border: tab === t ? 'none' : '1px solid var(--border)' }}>
              {t === 'plans' ? `Bons Plans (${plans.length})` : `Événements (${events.length})`}
            </button>
          ))}
          <button onClick={loadAll} style={{ marginLeft: 'auto', padding: '.5rem 1rem', borderRadius: 'var(--r)', border: '1px solid var(--border)', background: '#fff', color: 'var(--muted)', fontSize: '.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            ↻ Actualiser
          </button>
        </div>

        {/* Plans */}
        {tab === 'plans' && (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)', overflow: 'hidden' }}>
            {plans.length === 0 ? (
              <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>Aucun plan.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                    {['Nom', 'Catégorie', 'Adresse', 'Statut', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '.65rem 1rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '.7rem 1rem', fontSize: '.85rem', fontWeight: 500 }}>{p.title}</td>
                      <td style={{ padding: '.7rem 1rem', fontSize: '.8rem', color: 'var(--muted)' }}>{p.cat}</td>
                      <td style={{ padding: '.7rem 1rem', fontSize: '.8rem', color: 'var(--muted)' }}>{p.addr}</td>
                      <td style={{ padding: '.7rem 1rem' }}>
                        <span style={{
                          background: p.status === 'published' ? '#f0fdf4' : p.status === 'pending' ? '#fefce8' : '#fef2f2',
                          color: p.status === 'published' ? '#166534' : p.status === 'pending' ? '#854d0e' : '#dc2626',
                          borderRadius: '50px', padding: '.15rem .6rem', fontSize: '.72rem', fontWeight: 600
                        }}>{p.status === 'published' ? 'Publié' : p.status === 'pending' ? 'En attente' : 'Rejeté'}</span>
                      </td>
                      <td style={{ padding: '.7rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                          {p.status === 'pending' && (
                            <button onClick={() => approvePlan(p.id)} disabled={busy === p.id} style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✅ Approuver</button>
                          )}
                          {p.status === 'published' && (
                            <button onClick={() => rejectPlan(p.id)} disabled={busy === p.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>Dépublier</button>
                          )}
                          {p.status === 'rejected' && (
                            <button onClick={() => approvePlan(p.id)} disabled={busy === p.id} style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>Republier</button>
                          )}
                          <button onClick={() => handleDeletePlan(p.id)} disabled={busy === p.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Events */}
        {tab === 'events' && (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)', overflow: 'hidden' }}>
            {events.length === 0 ? (
              <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>Aucun événement.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                    {['Titre', 'Date', 'Lieu', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '.65rem 1rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '.7rem 1rem', fontSize: '.85rem', fontWeight: 500 }}>{ev.title}</td>
                      <td style={{ padding: '.7rem 1rem', fontSize: '.8rem', color: 'var(--muted)' }}>{ev.date}</td>
                      <td style={{ padding: '.7rem 1rem', fontSize: '.8rem', color: 'var(--muted)' }}>{ev.loc}</td>
                      <td style={{ padding: '.7rem 1rem' }}>
                        <button onClick={() => handleDeleteEvent(ev.id)} disabled={busy === ev.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>🗑️ Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
