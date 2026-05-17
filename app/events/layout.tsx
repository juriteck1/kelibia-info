import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Événements à Kélibia',
  description: "Festivals, marchés, activités et événements culturels à Kélibia, Cap Bon. Ne manquez aucun événement de la région.",
  openGraph: {
    title: 'Événements à Kélibia',
    description: "Festivals, marchés, activités et événements culturels à Kélibia, Cap Bon. Ne manquez aucun événement de la région.",
    url: 'https://www.kelibia.info/events',
    images: [{ url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80', width: 1200, height: 630, alt: 'Événements à Kélibia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Événements à Kélibia',
    description: "Festivals, marchés, activités et événements culturels à Kélibia, Cap Bon. Ne manquez aucun événement de la région.",
    images: ['https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=1200&q=80'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
