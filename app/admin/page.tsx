'use client'
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/lib/auth-context'
import {
  getAdminStats, getAllPlans, getAllEvents, getAdminImmoListings,
  getUsers, updatePlanStatus, deletePlan, deleteEvent, addAdminEvent, updateUserRole
} from '@/lib/db'
import type { Plan, Event, ImmoListing } from '@/types'

const ADMIN_EMAIL = 'mohamedamine.khemiri@gmail.com'
type Section = 'dash' | 'plans' | 'events' | 'immo' | 'users'
type PlanRow = Plan & { status: string }
type EventRow = Event & { status: string }
type UserRow = { id: string; full_name?: string; email?: string; role?: string; created_at?: string }
type Stats = { plans: number; pending: number; events: number; users: number; immo: number }

const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  published: { bg: '#f0fdf4', color: '#166534', label: 'Publié' },
  pending:   { bg: '#fefce8', color: '#854d0e', label: 'En attente' },
  rejected:  { bg: '#fef2f2', color: '#dc2626', label: 'Rejeté' },
}

function Badge({ status }: { status: string }) {
  const s = STATUS[status] ?? { bg: '#f3f4f6', color: '#6b7280', label: status }
  return <span style={{ background: s.bg, color: s.color, borderRadius: '50px', padding: '.15rem .6rem', fontSize: '.72rem', fontWeight: 600 }}>{s.label}</span>
}

function SbBtn({ label, icon, active, badge, onClick }: { label: string; icon: React.ReactNode; active: boolean; badge?: number; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '.55rem', padding: '.6rem 1rem', fontSize: '.82rem', color: active ? '#fff' : 'rgba(255,255,255,.55)', cursor: 'pointer', border: 'none', background: active ? 'rgba(255,255,255,.15)' : 'none', width: '100%', textAlign: 'left', borderRadius: 'var(--r)', marginBottom: '.1rem', fontFamily: 'inherit' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && badge > 0 && <span style={{ background: '#f59e0b', color: '#fff', fontSize: '.58rem', padding: '.1rem .45rem', borderRadius: '4px', fontWeight: 700 }}>{badge}</span>}
    </button>
  )
}

export default function AdminPage() {
  const { user, loading, signInWithPassword } = useAuth()
  const [section, setSection] = useState<Section>('dash')
  const [stats, setStats] = useState<Stats>({ plans: 0, pending: 0, events: 0, users: 0, immo: 0 })
  const [plans, setPlans] = useState<PlanRow[]>([])
  const [events, setEvents] = useState<EventRow[]>([])
  const [immo, setImmo] = useState<ImmoListing[]>([])
  const [users, setUsers] = useState<UserRow[]>([])
  const [fetching, setFetching] = useState(true)
  const [processing, setProcessing] = useState<number | null>(null)
  const [showAddEv, setShowAddEv] = useState(false)
  const [addingEv, setAddingEv] = useState(false)
  const [evForm, setEvForm] = useState({ title: '', description: '', event_date: '', event_time: '18:00', loc: '', cat: 'culture', attendees: '50' })
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
    const timeout = new Promise<T>(resolve => setTimeout(() => resolve(fallback), 6000))
    return Promise.race([p.catch(() => fallback), timeout])
  }

  const loadAll = useCallback(async () => {
    setFetching(true)
    try {
      const defaultStats = { plans: 0, pending: 0, events: 0, users: 0, immo: 0 }
      const [s, p, e, i, u] = await Promise.all([
        safe(getAdminStats(), defaultStats),
        safe(getAllPlans(), []),
        safe(getAllEvents(), []),
        safe(getAdminImmoListings(), []),
        safe(getUsers(), []),
      ])
      setStats(s); setPlans(p); setEvents(e); setImmo(i); setUsers(u)
    } catch (err) {
      console.error('Admin load error:', err)
    } finally {
      setFetching(false)
    }
  }, [])

  useEffect(() => {
    if (!loading && user?.email === ADMIN_EMAIL) loadAll()
    else if (!loading) setFetching(false)
  }, [user, loading, loadAll])

  async function handlePlan(id: number, action: 'published' | 'rejected' | 'delete') {
    setProcessing(id)
    try {
      if (action === 'delete') await deletePlan(id)
      else await updatePlanStatus(id, action)
      await loadAll()
    } finally { setProcessing(null) }
  }

  async function handleDeleteEvent(id: number) {
    if (!confirm('Supprimer cet événement ?')) return
    setProcessing(id)
    try { await deleteEvent(id); await loadAll() }
    finally { setProcessing(null) }
  }

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault()
    if (!evForm.title || !evForm.event_date || !evForm.loc) return
    setAddingEv(true)
    try {
      await addAdminEvent({ title: evForm.title, description: evForm.description, event_date: evForm.event_date, event_time: evForm.event_time, loc: evForm.loc, cat: evForm.cat, attendees: parseInt(evForm.attendees) || 0 })
      setEvForm({ title: '', description: '', event_date: '', event_time: '18:00', loc: '', cat: 'culture', attendees: '50' })
      setShowAddEv(false)
      await loadAll()
    } finally { setAddingEv(false) }
  }

  if (loading || fetching) return (
    <div className="pt">
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--muted)' }}>
        Chargement…
      </div>
    </div>
  )

  if (!user || user.email !== ADMIN_EMAIL) {
    async function handleLogin(e: React.FormEvent) {
      e.preventDefault()
      setLoginError('')
      setLoginLoading(true)
      const err = await signInWithPassword(loginEmail.trim(), loginPassword)
      setLoginLoading(false)
      if (err) setLoginError(err)
    }
    return (
      <div className="pt">
        <div className="container" style={{ padding: '5rem 0', maxWidth: 420 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '2.5rem', boxShadow: 'var(--sh)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: 52, height: 52, background: 'var(--sea)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', marginBottom: '.4rem' }}>Administration</h2>
              <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>Connectez-vous pour accéder au panneau admin</p>
            </div>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Email</label>
                <input className="fi" type="email" autoComplete="email" required
                  value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="admin@exemple.com" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.4rem' }}>Mot de passe</label>
                <input className="fi" type="password" autoComplete="current-password" required
                  value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••" />
              </div>
              {loginError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--r)', padding: '.75rem 1rem', fontSize: '.83rem', color: '#dc2626', marginBottom: '1rem' }}>
                  {loginError}
                </div>
              )}
              <button type="submit" disabled={loginLoading} style={{ width: '100%', background: 'var(--sea)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '.7rem 1rem', fontSize: '.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {loginLoading ? 'Connexion…' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pending = plans.filter(p => p.status === 'pending')
  const th = (label: string) => <th style={{ padding: '.6rem 1rem', textAlign: 'left', fontSize: '.75rem', fontWeight: 600, color: 'var(--muted)', borderBottom: '1px solid var(--border)', background: '#f9fafb', whiteSpace: 'nowrap' }}>{label}</th>
  const td = (content: React.ReactNode) => <td style={{ padding: '.7rem 1rem' }}>{content}</td>

  return (
    <div className="pt" style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 64px)' }}>

        {/* SIDEBAR */}
        <aside style={{ background: 'var(--sea)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.25rem 1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{ fontSize: '.63rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,.35)', marginBottom: '.2rem' }}>Administration</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '.95rem', fontWeight: 600, color: '#fff' }}>Kélibia.info</div>
          </div>
          <nav style={{ padding: '.75rem .5rem', flex: 1 }}>
            <SbBtn label="Tableau de bord" active={section === 'dash'} onClick={() => setSection('dash')}
              icon={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>} />
            <SbBtn label="Bons Plans" active={section === 'plans'} badge={stats.pending} onClick={() => setSection('plans')}
              icon={<><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></>} />
            <SbBtn label="Événements" active={section === 'events'} onClick={() => setSection('events')}
              icon={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} />
            <SbBtn label="Immobilier" active={section === 'immo'} onClick={() => setSection('immo')}
              icon={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} />
            <SbBtn label="Utilisateurs" active={section === 'users'} badge={stats.users} onClick={() => setSection('users')}
              icon={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>} />
          </nav>
        </aside>

        {/* MAIN */}
        <main style={{ padding: '2rem', overflow: 'auto' }}>

          {/* ── DASHBOARD ── */}
          {section === 'dash' && <>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Tableau de bord</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Plans publiés', value: stats.plans, color: '#1e4d8c' },
                { label: 'En attente', value: stats.pending, color: '#f59e0b' },
                { label: 'Événements', value: stats.events, color: '#29a8d8' },
                { label: 'Annonces immo', value: stats.immo, color: '#16a34a' },
                { label: 'Utilisateurs', value: stats.users, color: '#7c3aed' },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '1.1rem', boxShadow: 'var(--sh)' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: '.3rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)' }}>
              <div style={{ padding: '.9rem 1.1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '.95rem', fontWeight: 600 }}>
                  Soumissions en attente {pending.length > 0 && <span style={{ background: '#f59e0b', color: '#fff', borderRadius: '50px', padding: '.1rem .5rem', fontSize: '.7rem', fontWeight: 700, marginLeft: '.4rem' }}>{pending.length}</span>}
                </h3>
                {pending.length > 0 && <button onClick={() => setSection('plans')} style={{ fontSize: '.8rem', color: 'var(--sea)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Tout voir →</button>}
              </div>
              {pending.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '.9rem' }}>✅ Aucune soumission en attente</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>{[th('Nom'), th('Catégorie'), th('Adresse'), th('Date'), th('Actions')]}</tr></thead>
                  <tbody>
                    {pending.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                        {td(<span style={{ fontSize: '.85rem', fontWeight: 500 }}>{p.title}</span>)}
                        {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{p.cat}</span>)}
                        {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{p.addr}</span>)}
                        {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{p.created_at ? new Date(p.created_at).toLocaleDateString('fr-FR') : '-'}</span>)}
                        {td(<div style={{ display: 'flex', gap: '.4rem' }}>
                          <button onClick={() => handlePlan(p.id, 'published')} disabled={processing === p.id} style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✅ Approuver</button>
                          <button onClick={() => handlePlan(p.id, 'rejected')} disabled={processing === p.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>❌ Rejeter</button>
                        </div>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>}

          {/* ── BONS PLANS ── */}
          {section === 'plans' && <>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Gestion des bons plans ({plans.length})</h2>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{[th('Nom'), th('Catégorie'), th('Note'), th('Statut'), th('Actions')]}</tr></thead>
                <tbody>
                  {plans.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      {td(<><div style={{ fontSize: '.85rem', fontWeight: 500 }}>{p.title}</div><div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{p.addr}</div></>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{p.cat}</span>)}
                      {td(<span style={{ fontSize: '.85rem' }}>⭐ {p.rating.toFixed(1)}</span>)}
                      {td(<Badge status={p.status} />)}
                      {td(<div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                        {p.status === 'pending' && <>
                          <button onClick={() => handlePlan(p.id, 'published')} disabled={processing === p.id} style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 'var(--r)', padding: '.3rem .6rem', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✅</button>
                          <button onClick={() => handlePlan(p.id, 'rejected')} disabled={processing === p.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .6rem', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>❌</button>
                        </>}
                        {p.status === 'published' && <button onClick={() => handlePlan(p.id, 'rejected')} disabled={processing === p.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .6rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>Dépublier</button>}
                        {p.status === 'rejected' && <button onClick={() => handlePlan(p.id, 'published')} disabled={processing === p.id} style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534', borderRadius: 'var(--r)', padding: '.3rem .6rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>Republier</button>}
                        <button onClick={() => { if (confirm('Supprimer définitivement ?')) handlePlan(p.id, 'delete') }} disabled={processing === p.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .6rem', fontSize: '.75rem', cursor: 'pointer', fontFamily: 'inherit' }}>🗑️</button>
                      </div>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {/* ── ÉVÉNEMENTS ── */}
          {section === 'events' && <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem' }}>Événements ({events.length})</h2>
              <button onClick={() => setShowAddEv(!showAddEv)} style={{ background: 'var(--sea)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '.55rem 1.2rem', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {showAddEv ? '✕ Annuler' : '+ Ajouter'}
              </button>
            </div>
            {showAddEv && (
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '1.5rem', boxShadow: 'var(--sh)', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', marginBottom: '1.25rem' }}>Nouvel événement</h3>
                <form onSubmit={handleAddEvent}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    {([['Titre *', 'text', 'title', "Nom de l'événement"], ['Lieu *', 'text', 'loc', "Lieu"], ['Date *', 'date', 'event_date', ''], ['Heure', 'time', 'event_time', ''], ['Participants', 'number', 'attendees', '50']] as const).map(([label, type, key, placeholder]) => (
                      <div key={key}>
                        <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.35rem' }}>{label}</label>
                        <input className="fi" type={type} value={(evForm as Record<string, string>)[key]} onChange={e => setEvForm(f => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.35rem' }}>Catégorie</label>
                      <select className="fi" value={evForm.cat} onChange={e => setEvForm(f => ({ ...f, cat: e.target.value }))}>
                        {['culture', 'sport', 'festival', 'marche', 'gastronomie'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '.35rem' }}>Description</label>
                    <textarea className="fta" rows={2} value={evForm.description} onChange={e => setEvForm(f => ({ ...f, description: e.target.value }))} placeholder="Description…" />
                  </div>
                  <button type="submit" disabled={addingEv} style={{ background: 'var(--sea)', color: '#fff', border: 'none', borderRadius: 'var(--r)', padding: '.55rem 1.4rem', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {addingEv ? 'Ajout…' : "Ajouter l'événement"}
                  </button>
                </form>
              </div>
            )}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{[th('Titre'), th('Date'), th('Lieu'), th('Catégorie'), th('Participants'), th('Actions')]}</tr></thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      {td(<span style={{ fontSize: '.85rem', fontWeight: 500 }}>{ev.title}</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{ev.date}</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{ev.loc}</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{ev.cat}</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{ev.attendees}</span>)}
                      {td(<button onClick={() => handleDeleteEvent(ev.id)} disabled={processing === ev.id} style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🗑️ Supprimer</button>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {/* ── IMMOBILIER ── */}
          {section === 'immo' && <>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Annonces immobilières ({immo.length})</h2>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{[th('Titre'), th('Type'), th('Prix'), th('Surface'), th('Agent')]}</tr></thead>
                <tbody>
                  {immo.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      {td(<><div style={{ fontSize: '.85rem', fontWeight: 500 }}>{item.title}</div><div style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{item.addr}</div></>)}
                      {td(<span style={{ background: item.type === 'vente' ? '#f0fdf4' : item.type === 'location' ? '#eff6ff' : '#fff7ed', color: item.type === 'vente' ? '#166534' : item.type === 'location' ? '#1e40af' : '#9a3412', borderRadius: '50px', padding: '.15rem .6rem', fontSize: '.72rem', fontWeight: 600 }}>{item.type}</span>)}
                      {td(<span style={{ fontSize: '.85rem', fontWeight: 500 }}>{item.price.toLocaleString('fr-FR')} DT</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{item.surface} m²</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{item.agent_name ?? '—'}</span>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {/* ── UTILISATEURS ── */}
          {section === 'users' && <>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>Utilisateurs ({users.length})</h2>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--sh)', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>{[th('Utilisateur'), th('Email'), th('Rôle'), th('Inscrit le'), th('Actions')]}</tr></thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '.9rem' }}>Aucun utilisateur pour le moment.</td></tr>
                  ) : users.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      {td(<div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: u.role === 'admin' ? '#7c3aed' : 'var(--sea)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 600, flexShrink: 0 }}>
                          {u.full_name?.[0] ?? '?'}
                        </div>
                        <span style={{ fontSize: '.85rem', fontWeight: 500 }}>{u.full_name ?? 'Anonyme'}</span>
                      </div>)}
                      {td(<span style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{u.email ?? '—'}</span>)}
                      {td(<span style={{
                        background: u.role === 'admin' ? '#f3e8ff' : '#f1f5f9',
                        color: u.role === 'admin' ? '#7c3aed' : '#64748b',
                        borderRadius: '50px', padding: '.15rem .6rem', fontSize: '.72rem', fontWeight: 600
                      }}>{u.role === 'admin' ? '👑 Admin' : 'Membre'}</span>)}
                      {td(<span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : '-'}</span>)}
                      {td(<div style={{ display: 'flex', gap: '.4rem' }}>
                        {u.email !== ADMIN_EMAIL && (
                          u.role === 'admin' ? (
                            <button
                              onClick={async () => {
                                if (!confirm(`Rétrograder ${u.full_name ?? u.email} en membre ?`)) return
                                setProcessing(u.id as never)
                                try { await updateUserRole(u.id, 'member'); await loadAll() }
                                finally { setProcessing(null) }
                              }}
                              disabled={processing === (u.id as never)}
                              style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                              Rétrograder
                            </button>
                          ) : (
                            <button
                              onClick={async () => {
                                if (!confirm(`Promouvoir ${u.full_name ?? u.email} en administrateur ?`)) return
                                setProcessing(u.id as never)
                                try { await updateUserRole(u.id, 'admin'); await loadAll() }
                                finally { setProcessing(null) }
                              }}
                              disabled={processing === (u.id as never)}
                              style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', color: '#7c3aed', borderRadius: 'var(--r)', padding: '.3rem .7rem', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                              👑 Promouvoir admin
                            </button>
                          )
                        )}
                        {u.email === ADMIN_EMAIL && (
                          <span style={{ fontSize: '.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>Compte principal</span>
                        )}
                      </div>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

        </main>
      </div>
    </div>
  )
}
