import EventCard from '@/components/EventCard'
import { EVENTS } from '@/lib/data'

export default function EventsPage() {
  const upcoming = EVENTS.filter(e => new Date(e.date) >= new Date())
  const past = EVENTS.filter(e => new Date(e.date) < new Date())

  return (
    <div className="pt">
      <div className="ph">
        <div className="container">
          <h1>Événements à Kélibia</h1>
          <p>Découvrez les festivals, marchés, activités et événements culturels</p>
        </div>
      </div>

      <main style={{padding:'2.5rem 0'}}>
        <div className="container">
          {upcoming.length > 0 && (
            <>
              <div className="sh2" style={{marginBottom:'1.5rem'}}>
                <div><h2>À venir</h2><p>{upcoming.length} événement{upcoming.length > 1 ? 's' : ''} programmé{upcoming.length > 1 ? 's' : ''}</p></div>
              </div>
              <div className="evg" style={{marginBottom:'3rem'}}>
                {upcoming.map(ev => <EventCard key={ev.id} event={ev}/>)}
              </div>
            </>
          )}

          {past.length > 0 && (
            <>
              <div className="sh2" style={{marginBottom:'1.5rem'}}>
                <div><h2>Événements passés</h2></div>
              </div>
              <div className="evg" style={{opacity:.6}}>
                {past.map(ev => <EventCard key={ev.id} event={ev}/>)}
              </div>
            </>
          )}

          {EVENTS.length === 0 && (
            <div className="empty">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <h3>Aucun événement</h3>
              <p>Aucun événement programmé pour le moment.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
