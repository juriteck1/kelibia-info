import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Annuaire de Kélibia — Commerces & Services',
  description: "Annuaire complet des commerces, restaurants, professionnels de santé, artisans et services de Kélibia, Tunisie.",
  openGraph: {
    title: 'Annuaire de Kélibia — Commerces & Services',
    description: "Annuaire complet des commerces, restaurants, professionnels de santé, artisans et services de Kélibia, Tunisie.",
    url: 'https://www.kelibia.info/annuaire',
    images: [{ url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-market-Z3qpB7LumgYnpkqbgjGFeS.webp', width: 1200, height: 630, alt: 'Annuaire de Kélibia — Commerces & Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annuaire de Kélibia — Commerces & Services',
    description: "Annuaire complet des commerces, restaurants, professionnels de santé, artisans et services de Kélibia, Tunisie.",
    images: ['https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-market-Z3qpB7LumgYnpkqbgjGFeS.webp'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
