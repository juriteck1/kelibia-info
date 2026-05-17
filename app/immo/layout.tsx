import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immobilier à Kélibia — Vente, Location & Vacances',
  description: "Trouvez votre bien immobilier à Kélibia : villas, appartements, terrains. Vente, location et vacances sur le Cap Bon, Tunisie.",
  openGraph: {
    title: 'Immobilier à Kélibia — Vente, Location & Vacances',
    description: "Trouvez votre bien immobilier à Kélibia : villas, appartements, terrains. Vente, location et vacances sur le Cap Bon, Tunisie.",
    url: 'https://www.kelibia.info/immo',
    images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', width: 1200, height: 630, alt: 'Immobilier à Kélibia — Vente, Location & Vacances' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immobilier à Kélibia — Vente, Location & Vacances',
    description: "Trouvez votre bien immobilier à Kélibia : villas, appartements, terrains. Vente, location et vacances sur le Cap Bon, Tunisie.",
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
