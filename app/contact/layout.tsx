import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Publicité — Kélibia.info',
  description: "Contactez l'équipe Kélibia.info pour toute question, partenariat ou espace publicitaire.",
  openGraph: {
    title: 'Contact & Publicité — Kélibia.info',
    description: "Contactez l'équipe Kélibia.info pour toute question, partenariat ou espace publicitaire.",
    url: 'https://www.kelibia.info/contact',
    images: [{ url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp', width: 1200, height: 630, alt: 'Contact & Publicité — Kélibia.info' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Publicité — Kélibia.info',
    description: "Contactez l'équipe Kélibia.info pour toute question, partenariat ou espace publicitaire.",
    images: ['https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
