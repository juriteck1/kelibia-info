import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proposer un Bon Plan — Kélibia.info',
  description: "Partagez vos adresses préférées avec la communauté de Kélibia. Proposez un restaurant, une activité, un service ou un commerce.",
  openGraph: {
    title: 'Proposer un Bon Plan — Kélibia.info',
    description: "Partagez vos adresses préférées avec la communauté de Kélibia. Proposez un restaurant, une activité, un service ou un commerce.",
    url: 'https://www.kelibia.info/ajouter',
    images: [{ url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp', width: 1200, height: 630, alt: 'Proposer un Bon Plan — Kélibia.info' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proposer un Bon Plan — Kélibia.info',
    description: "Partagez vos adresses préférées avec la communauté de Kélibia. Proposez un restaurant, une activité, un service ou un commerce.",
    images: ['https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
