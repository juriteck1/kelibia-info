-- ══════════════════════════════════════════════
-- KELIBIA.INFO — Migration Supabase
-- Coller dans : Supabase > SQL Editor > New query
-- ══════════════════════════════════════════════

-- 1. TABLE BONS PLANS
CREATE TABLE IF NOT EXISTS plans (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  cat TEXT NOT NULL,
  desc TEXT,
  addr TEXT,
  phone TEXT,
  rating NUMERIC(2,1) DEFAULT 0,
  rc INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  img TEXT,
  map TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','published','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE AVIS
CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plan_id BIGINT REFERENCES plans(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE ÉVÉNEMENTS
CREATE TABLE IF NOT EXISTS events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  desc TEXT,
  date DATE NOT NULL,
  time TEXT,
  loc TEXT,
  cat TEXT,
  img TEXT,
  attendees INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('pending','published','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE IMMOBILIER
CREATE TABLE IF NOT EXISTS immo (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('vente','location','vacances')),
  price NUMERIC NOT NULL,
  surface NUMERIC,
  rooms INTEGER,
  beds INTEGER,
  addr TEXT,
  desc TEXT,
  img TEXT,
  agent_name TEXT,
  agent_phone TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','published','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE PROFILS UTILISATEURS
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member','pro','admin')),
  contributions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ──────────────────────────

ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE immo ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Lecture publique (plans et événements publiés)
CREATE POLICY "Plans publics" ON plans FOR SELECT USING (status = 'published');
CREATE POLICY "Events publics" ON events FOR SELECT USING (status = 'published');
CREATE POLICY "Immo publics" ON immo FOR SELECT USING (status = 'published');
CREATE POLICY "Avis publics" ON reviews FOR SELECT USING (true);
CREATE POLICY "Profils publics" ON profiles FOR SELECT USING (true);

-- Soumission de bons plans (utilisateurs connectés)
CREATE POLICY "Soumettre un plan" ON plans FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Avis : utilisateurs connectés seulement
CREATE POLICY "Publier un avis" ON reviews FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Immobilier : utilisateurs connectés
CREATE POLICY "Déposer une annonce" ON immo FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Profil : chacun gère le sien
CREATE POLICY "Modifier son profil" ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ── DONNÉES INITIALES ───────────────────────────

INSERT INTO plans (title, cat, desc, addr, rating, rc, tags, featured, img, map, status) VALUES
('Fort de Kélibia', 'activite', 'Forteresse byzantine du VIe siècle dominant la mer Méditerranée. Vue panoramique exceptionnelle.', 'Colline de Kélibia, 8090 Kélibia', 4.7, 142, ARRAY['Histoire','Vue panoramique','Patrimoine'], true, 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-fort-9qNGjKHZBqromt4JugQjkM.webp', 'https://maps.google.com/?q=Fort+de+Kelibia+Tunisie', 'published'),
('Plage de Kélibia', 'plage', 'Longue plage de sable fin avec des eaux turquoise cristallines. Idéale pour la baignade.', 'Plage principale, Kélibia', 4.8, 215, ARRAY['Baignade','Sable fin','Eau claire'], true, 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-beach-RhcPsV2379sgRnBZtSLJZ3.webp', 'https://maps.google.com/?q=Plage+Kelibia+Tunisie', 'published'),
('Restaurant El Mansourah', 'restaurant', 'Poissons et fruits de mer ultra-frais. Terrasse avec vue sur la mer.', 'Port de pêche, Kélibia', 4.5, 89, ARRAY['Poissons','Fruits de mer','Vue mer'], true, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', null, 'published'),
('Marché de Kélibia', 'commerce', 'Marché hebdomadaire animé avec produits frais locaux, épices et artisanat.', 'Centre-ville, Kélibia', 4.3, 67, ARRAY['Marché','Produits locaux','Artisanat'], false, 'https://d2xsxph8kpxj0f.cloudfront.net/310519663540319411/XQhkcmuSh54XAQGXS9GFbu/kelibia-market-Z3qpB7LumgYnpkqbgjGFeS.webp', null, 'published');

INSERT INTO events (title, desc, date, time, loc, cat, img, attendees, featured, status) VALUES
('Festival de la Mer de Kélibia', 'Célébration annuelle de la culture maritime avec musique, danse et gastronomie.', '2025-06-15', '18:00', 'Plage principale de Kélibia', 'Festival', 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80', 2500, true, 'published'),
('Marché nocturne de l''artisanat', 'Marché artisanal nocturne avec produits locaux et musique traditionnelle.', '2025-05-24', '19:00', 'Centre-ville, Kélibia', 'Marché', 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&q=80', 800, false, 'published');

-- ── FUNCTION : AUTO-CRÉER PROFIL à l'inscription ──
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
