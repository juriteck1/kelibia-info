import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bons Plans à Kélibia',
  description: "Découvrez les meilleurs bons plans de Kélibia : restaurants, plages, activités, commerces et hébergements recommandés par la communauté.",
  openGraph: {
    title: 'Bons Plans à Kélibia',
    description: "Découvrez les meilleurs bons plans de Kélibia : restaurants, plages, activités, commerces et hébergements recommandés par la communauté.",
    url: 'https://www.kelibia.info/plans',
    images: [{ url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-fort-9qNGjKHZBqromt4JugQjkM.webp', width: 1200, height: 630, alt: 'Bons Plans à Kélibia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bons Plans à Kélibia',
    description: "Découvrez les meilleurs bons plans de Kélibia : restaurants, plages, activités, commerces et hébergements recommandés par la communauté.",
    images: ['https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-fort-9qNGjKHZBqromt4JugQjkM.webp'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
