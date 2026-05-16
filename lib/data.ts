import { Plan, Review, Event } from '@/types'

export const CATS = [
  { id: 'plage', label: 'Plages', bc: 'bp' },
  { id: 'restaurant', label: 'Restaurants', bc: 'br' },
  { id: 'activite', label: 'Activités', bc: 'ba' },
  { id: 'commerce', label: 'Commerces', bc: 'bc' },
  { id: 'service', label: 'Services', bc: 'bs' },
  { id: 'hebergement', label: 'Hébergements', bc: 'bh' },
]

export const PLANS: Plan[] = [
  { id: 1, title: 'Fort de Kélibia', cat: 'activite', desc: "Forteresse byzantine du VIe siècle dominant la mer Méditerranée. Vue panoramique exceptionnelle sur la côte, le cap Bon et par temps clair jusqu'à la Sicile.", addr: 'Colline de Kélibia, 8090 Kélibia', rating: 4.7, rc: 142, tags: ['Histoire', 'Vue panoramique', 'Patrimoine'], featured: true, img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-fort-9qNGjKHZBqromt4JugQjkM.webp', map: 'https://maps.google.com/?q=Fort+de+Kelibia+Tunisie' },
  { id: 2, title: 'Plage de Kélibia', cat: 'plage', desc: "Longue plage de sable fin avec des eaux turquoise cristallines. Idéale pour la baignade, le snorkeling et la détente.", addr: 'Plage principale, Kélibia', rating: 4.8, rc: 215, tags: ['Baignade', 'Sable fin', 'Eau claire'], featured: true, img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp', map: 'https://maps.google.com/?q=Plage+Kelibia+Tunisie' },
  { id: 3, title: 'Restaurant El Mansourah', cat: 'restaurant', desc: "Poissons et fruits de mer ultra-frais pêchés le matin même. Terrasse avec vue sur la mer.", addr: 'Port de pêche, Kélibia', phone: '+216 72 000 000', rating: 4.5, rc: 89, tags: ['Poissons', 'Fruits de mer', 'Vue mer'], featured: true, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', map: 'https://maps.google.com/?q=Port+Kelibia+Tunisie' },
  { id: 4, title: 'Marché de Kélibia', cat: 'commerce', desc: "Marché hebdomadaire animé avec produits frais locaux, épices, artisanat et vêtements.", addr: 'Centre-ville, Kélibia', rating: 4.3, rc: 67, tags: ['Marché', 'Produits locaux', 'Artisanat'], featured: false, img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-market-Z3qpB7LumgYnpkqbgjGFeS.webp' },
  { id: 5, title: 'Location de kayaks', cat: 'activite', desc: "Explorez la côte de Kélibia en kayak. Location à l'heure ou à la journée.", addr: 'Plage principale, Kélibia', phone: '+216 72 111 222', rating: 4.6, rc: 54, tags: ['Kayak', 'Mer', 'Sport nautique'], featured: false, img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' },
  { id: 6, title: 'Hôtel Mamounia Beach', cat: 'hebergement', desc: "Hôtel 3 étoiles en bord de mer avec piscine, restaurant et accès direct à la plage.", addr: 'Route de la plage, Kélibia', phone: '+216 72 222 333', rating: 4.2, rc: 103, tags: ['Hôtel', 'Piscine', 'Vue mer'], featured: false, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
  { id: 7, title: 'Café Sidi Bou', cat: 'restaurant', desc: "Café traditionnel tunisien avec thé à la menthe, café turc et pâtisseries orientales.", addr: 'Rue Habib Bourguiba, Kélibia', rating: 4.4, rc: 78, tags: ['Café', 'Thé', 'Pâtisseries'], featured: false, img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80' },
  { id: 8, title: 'Pharmacie Centrale', cat: 'service', desc: "Pharmacie ouverte 7j/7 avec service de garde la nuit.", addr: 'Avenue Principale, Kélibia', phone: '+216 72 333 444', rating: 4.1, rc: 32, tags: ['Santé', 'Garde', 'Parapharmacie'], featured: false, img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80' },
  { id: 9, title: 'Plage Mansourah', cat: 'plage', desc: "Plage sauvage et préservée à 3 km au nord de Kélibia. Eaux peu profondes idéales pour les familles.", addr: 'Route de Mansourah, Kélibia', rating: 4.6, rc: 91, tags: ['Plage sauvage', 'Famille', 'Nature'], featured: false, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
]

export const REVIEWS: Review[] = [
  { id: 1, plan_id: 1, author: 'Sophie M.', rating: 5, comment: "Vue imprenable sur la mer ! Le fort est bien conservé.", created_at: '2024-08-15' },
  { id: 2, plan_id: 1, author: 'Ahmed B.', rating: 4, comment: "Magnifique site historique. Prévoir de bonnes chaussures.", created_at: '2024-07-22' },
  { id: 3, plan_id: 2, author: 'Marie L.', rating: 5, comment: "Eau cristalline, sable blanc. La plus belle plage du cap Bon !", created_at: '2024-09-03' },
  { id: 4, plan_id: 3, author: 'Karim T.', rating: 5, comment: "Le meilleur poisson de Kélibia ! Prix raisonnables.", created_at: '2024-08-28' },
]

export const EVENTS: Event[] = [
  { id: 1, title: 'Festival de la Mer de Kélibia', desc: "Célébration annuelle de la culture maritime avec musique, danse et gastronomie.", date: '2026-07-15', time: '18:00', loc: 'Plage principale de Kélibia', cat: 'Festival', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80', attendees: 2500, featured: true },
  { id: 2, title: "Marché nocturne de l'artisanat", desc: "Marché artisanal nocturne avec produits locaux et musique traditionnelle.", date: '2026-06-20', time: '19:00', loc: 'Centre-ville, Kélibia', cat: 'Marché', img: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80', attendees: 800, featured: false },
  { id: 3, title: 'Tournoi de pêche sportive', desc: "Compétition de pêche en mer ouverte aux amateurs et professionnels.", date: '2026-06-05', time: '06:00', loc: 'Port de pêche, Kélibia', cat: 'Sport', img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', attendees: 120, featured: false },
  { id: 4, title: 'Visite guidée du Fort', desc: "Visite historique guidée du fort byzantin.", date: '2026-06-12', time: '10:00', loc: 'Fort de Kélibia', cat: 'Visite guidée', img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-fort-9qNGjKHZBqromt4JugQjkM.webp', attendees: 45, featured: false },
  { id: 5, title: 'Cours de cuisine méditerranéenne', desc: "Atelier culinaire pour apprendre les plats tunisiens traditionnels.", date: '2026-06-28', time: '15:00', loc: 'Centre culturel, Kélibia', cat: 'Atelier', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', attendees: 30, featured: false },
  { id: 6, title: 'Nuit du cinéma en plein air', desc: "Projection de films tunisiens sous les étoiles.", date: '2026-07-01', time: '20:00', loc: 'Plage de Mansourah', cat: 'Culture', img: 'https://images.unsplash.com/photo-1489599849228-ed4dc59b2e9b?w=800&q=80', attendees: 500, featured: false },
]
