import Link from 'next/link'
import Image from 'next/image'
import { Plan } from '@/types'
import { CATS } from '@/lib/data'

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  return (
    <span className={`strs${size === 'md' ? ' md' : ''}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={i < Math.round(rating) ? 'sf' : 'se'} viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  )
}

export default function PlanCard({ plan }: { plan: Plan }) {
  const cat = CATS.find(c => c.id === plan.cat)

  return (
    <Link href={`/plans/${plan.id}`} className="pc">
      <div className="piw" style={{ height: 180 }}>
        {plan.img ? (
          <Image src={plan.img} alt={plan.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 33vw" />
        ) : (
          <div className="pip">
            <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
          </div>
        )}
        {cat && (
          <div className="ptl">
            <span className={`badge ${cat.bc}`}>{cat.label}</span>
          </div>
        )}
        {plan.featured && (
          <div className="ptr">
            <span className="bf">⭐ Coup de cœur</span>
          </div>
        )}
      </div>
      <div className="pb">
        <div className="pt2">{plan.title}</div>
        <div className="pd">{plan.desc}</div>
        <div className="pf">
          <div className="pr">
            <Stars rating={plan.rating} />
            <span className="prn">{plan.rating}</span>
            <span className="prc">({plan.rc} avis)</span>
          </div>
          <div className="ploc">
            <svg viewBox="0 0 24 24"><path d="M12 21s-8-6.5-8-12a8 8 0 0 1 16 0c0 5.5-8 12-8 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <span>{plan.addr.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
