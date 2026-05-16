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

export const ANNUAIRE_CATS = [
  { id: 'all', label: 'Tous' },
  { id: 'commerce', label: 'Commerces' },
  { id: 'restaurant', label: 'Restaurants & Cafés' },
  { id: 'sante', label: 'Santé' },
  { id: 'service', label: 'Services' },
  { id: 'artisan', label: 'Artisans' },
  { id: 'administration', label: 'Administration' },
]

export const ANNUAIRE: AnnuaireItem[] = [
  { id: 1, name: 'Pharmacie Centrale Kélibia', cat: 'sante', desc: 'Pharmacie ouverte 7j/7. Médicaments, parapharmacie, matériel médical.', addr: 'Avenue Habib Bourguiba, Kélibia', phone: '+216 72 296 100', rating: 4.6, rc: 38, img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&q=80' },
  { id: 2, name: 'Dr. Ben Ali — Médecin généraliste', cat: 'sante', desc: 'Consultation sur rendez-vous. Urgences acceptées en dehors des heures de permanence.', addr: 'Rue de la République, Kélibia', phone: '+216 72 296 215', rating: 4.8, rc: 52, img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80' },
  { id: 3, name: 'Café Sidi Mansour', cat: 'restaurant', desc: 'Café traditionnel tunisien avec terrasse, thé à la menthe et chicha.', addr: 'Corniche de Kélibia', phone: '+216 55 123 456', rating: 4.4, rc: 61, img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80' },
  { id: 4, name: 'Boulangerie El Amal', cat: 'commerce', desc: 'Pain frais, pâtisseries tunisiennes et viennoiseries. Ouvert dès 5h du matin.', addr: 'Marché central, Kélibia', phone: '+216 52 987 654', rating: 4.7, rc: 29, img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80' },
  { id: 5, name: 'Garage Auto Mechta', cat: 'artisan', desc: 'Réparation toutes marques, vidange, climatisation. 20 ans d\'expérience.', addr: 'Zone industrielle, Kélibia', phone: '+216 98 765 432', rating: 4.3, rc: 44, img: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80' },
  { id: 6, name: 'Municipalité de Kélibia', cat: 'administration', desc: 'Services administratifs, état civil, permis de construire et urbanisme.', addr: 'Place de la Municipalité, Kélibia', phone: '+216 72 296 001', email: 'mairie@kelibia.tn', rating: 3.9, rc: 18, img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 7, name: 'Supermarché Maghreb', cat: 'commerce', desc: 'Grande surface avec rayons alimentaires, électroménager et textile.', addr: 'Route de Hammamet, Kélibia', phone: '+216 72 296 330', rating: 4.2, rc: 73, img: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=80' },
  { id: 8, name: 'Plombier Habib Trabelsi', cat: 'artisan', desc: 'Plomberie, installation sanitaire, dépannage urgent 24h/24.', addr: 'Kélibia', phone: '+216 95 111 222', rating: 4.5, rc: 31, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
  { id: 9, name: 'Agence de voyages Cap Bon', cat: 'service', desc: 'Billets d\'avion, séjours organisés, visa et assurance voyage.', addr: 'Avenue de la Liberté, Kélibia', phone: '+216 72 296 450', email: 'capbon.voyages@gmail.com', rating: 4.1, rc: 22, img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80' },
  { id: 10, name: 'Restaurant La Médina', cat: 'restaurant', desc: 'Cuisine tunisienne authentique. Spécialités de poissons et couscous maison.', addr: 'Médina de Kélibia', phone: '+216 72 296 512', rating: 4.6, rc: 89, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
  { id: 11, name: 'Électricien Slim Ben Youssef', cat: 'artisan', desc: 'Installation électrique, dépannage, tableau électrique. Certifié STEG.', addr: 'Kélibia', phone: '+216 96 333 444', rating: 4.4, rc: 27, img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80' },
  { id: 12, name: 'Délégation de Kélibia', cat: 'administration', desc: 'Services de la délégation : aide sociale, certificats, attestations.', addr: 'Centre-ville, Kélibia', phone: '+216 72 296 010', rating: 3.7, rc: 14, img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80' },
]
