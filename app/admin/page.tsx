'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getPendingPlans, updatePlanStatus } from '@/lib/db'
import type { Plan } from '@/types'

const ADMIN_EMAIL = 'mohamedamine.khemiri@gmail.com'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [fetching, setFetching] = useState(true)
  const [processing, setProcessing] = useState<number | null>(null)

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return
    getPendingPlans().then(data => {
      setPlans(data)
      setFetching(false)
    })
  }, [user])

  async function handleAction(id: number, status: 'published' | 'rejected') {
    setProcessing(id)
    await updatePlanStatus(id, status)
    setPlans(prev => prev.filter(p => p.id !== id))
    setProcessing(null)
  }

  if (loading) return null

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="pt">
        <div className="container" style={{padding:'4rem 0',textAlign:'center',color:'var(--muted)'}}>
          Accès refusé.
        </div>
      </div>
    )
  }

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Administration</h1>
          <p>Modération des bons plans soumis par la communauté</p>
        </div>
      </div>
      <main style={{padding:'2.5rem 0'}}>
        <div className="container">
          {fetching ? (
            <p style={{color:'var(--muted)'}}>Chargement…</p>
          ) : plans.length === 0 ? (
            <div style={{textAlign:'center',padding:'3rem',background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)'}}>
              <div style={{fontSize:'2rem',marginBottom:'1rem'}}>✅</div>
              <p style={{color:'var(--muted)'}}>Aucune soumission en attente.</p>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <p style={{color:'var(--muted)',fontSize:'.9rem',marginBottom:'.5rem'}}>
                {plans.length} soumission{plans.length > 1 ? 's' : ''} en attente
              </p>
              {plans.map(plan => (
                <div key={plan.id} style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',padding:'1.5rem',boxShadow:'var(--sh)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem',flexWrap:'wrap'}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'.4rem'}}>
                        <span style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'50px',padding:'.15rem .6rem',fontSize:'.75rem',color:'var(--muted)',textTransform:'capitalize'}}>
                          {plan.cat}
                        </span>
                        <span style={{fontSize:'.75rem',color:'var(--muted)'}}>
                          {plan.created_at ? new Date(plan.created_at).toLocaleDateString('fr-FR') : ''}
                        </span>
                      </div>
                      <h3 style={{fontWeight:700,fontSize:'1.05rem',marginBottom:'.3rem',color:'var(--fg)'}}>
                        {plan.title}
                      </h3>
                      <p style={{fontSize:'.85rem',color:'var(--muted)',marginBottom:'.4rem'}}>
                        📍 {plan.addr}
                      </p>
                      {plan.phone && (
                        <p style={{fontSize:'.85rem',color:'var(--muted)',marginBottom:'.4rem'}}>
                          📞 {plan.phone}
                        </p>
                      )}
                      <p style={{fontSize:'.9rem',color:'var(--fg)',lineHeight:1.6,marginTop:'.5rem'}}>
                        {plan.desc}
                      </p>
                      {plan.tags?.length > 0 && (
                        <div style={{display:'flex',flexWrap:'wrap',gap:'.3rem',marginTop:'.75rem'}}>
                          {plan.tags.map(tag => (
                            <span key={tag} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'50px',padding:'.15rem .6rem',fontSize:'.75rem',color:'var(--muted)'}}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{display:'flex',gap:'.5rem',flexShrink:0}}>
                      <button
                        onClick={() => handleAction(plan.id, 'published')}
                        disabled={processing === plan.id}
                        style={{display:'flex',alignItems:'center',gap:'.4rem',background:'#f0fdf4',border:'1px solid #86efac',color:'#166534',borderRadius:'var(--r)',padding:'.5rem 1rem',fontSize:'.85rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:processing===plan.id?.6:1}}
                      >
                        ✅ Approuver
                      </button>
                      <button
                        onClick={() => handleAction(plan.id, 'rejected')}
                        disabled={processing === plan.id}
                        style={{display:'flex',alignItems:'center',gap:'.4rem',background:'#fef2f2',border:'1px solid #fca5a5',color:'#dc2626',borderRadius:'var(--r)',padding:'.5rem 1rem',fontSize:'.85rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:processing===plan.id?.6:1}}
                      >
                        ❌ Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
