import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Service TRE — Investir à Kélibia depuis l'Étranger",
  description: "Tunisien(ne) résident(e) à l'étranger ? Accompagnement complet pour l'acquisition de votre bien à Kélibia : recherche, visite vidéo, notaire.",
  openGraph: {
    title: "Service TRE — Investir à Kélibia depuis l'Étranger",
    description: "Tunisien(ne) résident(e) à l'étranger ? Accompagnement complet pour l'acquisition de votre bien à Kélibia : recherche, visite vidéo, notaire.",
    url: 'https://www.kelibia.info/tre',
    images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80', width: 1200, height: 630, alt: "Service TRE — Investir à Kélibia depuis l'Étranger" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Service TRE — Investir à Kélibia depuis l'Étranger",
    description: "Tunisien(ne) résident(e) à l'étranger ? Accompagnement complet pour l'acquisition de votre bien à Kélibia : recherche, visite vidéo, notaire.",
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
