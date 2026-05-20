'use client'
import { useRef, useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
export function AuthButton() {
  const { user, profile, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])
  if (!user) return null

  return (
      <div ref={ref} style={{position:'relative',marginLeft:'.5rem'}}>
        <button
          onClick={() => setOpen(!open)}
          style={{display:'flex',alignItems:'center',gap:'.5rem',background:'none',border:'none',cursor:'pointer',padding:0,fontFamily:'inherit'}}
        >
          <div style={{width:34,height:34,borderRadius:'50%',overflow:'hidden',background:'var(--sea)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:'2px solid var(--border)'}}>
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="avatar" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            ) : (
              <span style={{color:'#fff',fontSize:'.85rem',fontWeight:600}}>
                {profile?.full_name?.[0] ?? user.email?.[0] ?? '?'}
              </span>
            )}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {open && (
          <div style={{position:'absolute',right:0,top:'calc(100% + .6rem)',background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--r-lg)',boxShadow:'0 8px 24px rgba(0,0,0,.12)',minWidth:220,zIndex:999}}>
            <div style={{padding:'1rem 1.1rem',borderBottom:'1px solid var(--border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'.75rem'}}>
                <div style={{width:40,height:40,borderRadius:'50%',overflow:'hidden',background:'var(--sea)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="avatar" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  ) : (
                    <span style={{color:'#fff',fontWeight:600}}>
                      {profile?.full_name?.[0] ?? user.email?.[0] ?? '?'}
                    </span>
                  )}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:'.9rem',color:'var(--fg)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                    {profile?.full_name ?? 'Mon compte'}
                  </div>
                  <div style={{fontSize:'.75rem',color:'var(--muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
            <div style={{padding:'.5rem'}}>
              <button
                onClick={() => { signOut(); setOpen(false) }}
                style={{width:'100%',display:'flex',alignItems:'center',gap:'.6rem',padding:'.6rem .75rem',background:'none',border:'none',borderRadius:'var(--r)',cursor:'pointer',fontSize:'.875rem',color:'#dc2626',fontFamily:'inherit',textAlign:'left'}}
                onMouseEnter={e => (e.currentTarget.style.background='#fef2f2')}
                onMouseLeave={e => (e.currentTarget.style.background='none')}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
  )
}
