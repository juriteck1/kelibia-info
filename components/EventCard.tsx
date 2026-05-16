import Image from 'next/image'
import { Event } from '@/types'

export default function EventCard({ event }: { event: Event }) {
  const dateObj = new Date(event.date)
  const dateStr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="evcard">
      <div className="evimg">
        {event.img ? (
          <Image src={event.img} alt={event.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />
        ) : (
          <div className="eviph">
            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
        )}
        <span className="evcb">{event.cat}</span>
      </div>
      <div className="evbody">
        <div className="evt">{event.title}</div>
        <div className="evd">{event.desc}</div>
        <div className="evmeta">
          <div className="evmr">
            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {dateStr} à {event.time}
          </div>
          <div className="evmr">
            <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            {event.loc}
          </div>
          {event.attendees > 0 && (
            <div className="evmr">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {event.attendees.toLocaleString('fr-FR')} participants attendus
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
