'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AuthButton } from '@/components/AuthButton'

export default function Navbar() {
  const pathname = usePathname()
  const [mob, setMob] = useState(false)
  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/plans', label: 'Bons Plans' },
    { href: '/events', label: 'Événements' },
    { href: '/annuaire', label: 'Annuaire' },
    { href: '/immo', label: 'Immobilier', highlight: true },
    { href: '/ajouter', label: 'Ajouter' },
  ]
  return (
    <header className="navbar">
      <div className="container nav-in">
        <Link href="/" className="nav-logo">
          <div className="nli">
            <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
          <div className="nlt">
            <span className="nln">Kélibia</span>
            <span className="nls">.info</span>
          </div>
        </Link>
        <nav className="nav-links">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`nl${pathname === l.href ? ' on' : ''}`}
              style={l.highlight ? { color: 'var(--sea)', fontWeight: 600, border: '1px solid var(--sea)', borderRadius: 'var(--r)' } : {}}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/ajouter" className="nav-cta">+ Proposer un bon plan</Link>
          <AuthButton />
        </nav>
        <button className="burger" onClick={() => setMob(!mob)} aria-label="Menu">
          <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
      <div className={`mob-menu${mob ? ' open' : ''}`}>
        <div className="mob-links">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`ml${pathname === l.href ? ' on' : ''}`} onClick={() => setMob(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/ajouter" className="mob-cta" onClick={() => setMob(false)}>+ Proposer un bon plan</Link>
          <div style={{padding:'0 1rem 1rem'}}><AuthButton /></div>
        </div>
      </div>
    </header>
  )
}
