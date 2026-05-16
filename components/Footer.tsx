import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="fpub">
        <div className="container">
          <div className="fpubbox">
            <p>Espace publicitaire</p>
            <p>Votre publicité ici — <Link href="/contact" style={{color:'var(--turq)'}}>Contactez-nous</Link></p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="fgrid">
          <div>
            <div className="fbl">
              <div className="fbli"><svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg></div>
              <span className="fbln">Kélibia.info</span>
            </div>
            <p className="fbd">La plateforme communautaire de Kélibia. Découvrez les meilleurs bons plans, restaurants, plages et services.</p>
            <div className="fsoc">
              <a href="https://facebook.com/kelibia.info" className="fsocb" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/kelibia.info" className="fsocb" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          <div className="fcol">
            <h4>Catégories</h4>
            <ul>
              {[['plage','Plages'],['restaurant','Restaurants'],['activite','Activités'],['commerce','Commerces'],['service','Services'],['hebergement','Hébergements']].map(([id,label]) => (
                <li key={id}><Link href={`/plans?cat=${id}`}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <h4>Liens utiles</h4>
            <ul>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/plans">Tous les bons plans</Link></li>
              <li><Link href="/annuaire">Annuaire des services</Link></li>
              <li><Link href="/events">Événements</Link></li>
              <li><Link href="/ajouter">Proposer un bon plan</Link></li>
              <li><Link href="/contact">Contact & Publicité</Link></li>
            </ul>
          </div>
          <div className="fcol">
            <h4>Contact</h4>
            <div className="fci">
              <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Kélibia, Cap Bon<br/>8090 Tunisie</span>
            </div>
            <div className="fci">
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:contact@kelibia.info">contact@kelibia.info</a>
            </div>
          </div>
        </div>
      </div>
      <div className="container fbot">
        <p>© 2025 Kélibia.info — Tous droits réservés</p>
        <div className="fleg">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
        </div>
      </div>
    </footer>
  )
}
