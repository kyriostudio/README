import React, { useState, useEffect } from 'react';

const palette = {
  vert: '#2e6b4f',
  vertDark: '#1d4a37',
  pierre: '#a08c6e',
  terre: '#6b4f3a',
  ciel: '#7a9bb5',
  rouge: '#9b2c2c',
  or: '#b8962e',
  cream: '#faf8f5',
  beige: '#f3efe8',
  sable: '#ece6da',
  footerBg: '#1a1410',
  text: '#2a2318',
  textLight: '#5c5345',
};

const images = {
  hero: '/carentan-hero-place-republique.png',
  heroFallback: 'https://carentanlesmarais.fr/wp-content/uploads/2024/07/Banni%C3%A8re-rectangle_Carentan-les-Marais.jpg',
  logo: '/logo-carentan-h.jpg',
  logoFallback: 'https://carentanlesmarais.fr/wp-content/uploads/2025/08/logo-final-horizontal-carentan-les-marais-noir-30_Plan-de-travail-1-500x231.jpg',
  saison2026: 'https://carentanlesmarais.fr/wp-content/uploads/2025/12/GABARIT_Image_SC2026.jpg',
  dday1: 'https://carentanlesmarais.fr/wp-content/uploads/2026/03/Capture-decran-2026-03-25-a-15.47.51.jpg',
  lavandiere: 'https://carentanlesmarais.fr/wp-content/uploads/2026/01/SLIDE-LAVANDIERE.jpg',
  bosseNdrive: 'https://carentanlesmarais.fr/wp-content/uploads/2026/01/BOSSE-N-DRIVE.jpg',
  lesveys: 'https://carentanlesmarais.fr/wp-content/uploads/2024/07/Slide_LESVEYS-1.png',
  arcades: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Carentan_-_Arcades_de_la_place_de_la_R%C3%A9publique_03.jpg/1200px-Carentan_-_Arcades_de_la_place_de_la_R%C3%A9publique_03.jpg',
  eglise: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Carentan_Notre-Dame.JPG/800px-Carentan_Notre-Dame.JPG',
  portCanal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Carentan_port_2007.jpg/1200px-Carentan_port_2007.jpg',
  marais: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Marais_du_cotentin_et_du_bessin.JPG/1200px-Marais_du_cotentin_et_du_bessin.JPG',
  ddayMuseum: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dead_Man%27s_Corner_Museum%2C_Saint-C%C3%B4me-du-Mont.jpg/1200px-Dead_Man%27s_Corner_Museum%2C_Saint-C%C3%B4me-du-Mont.jpg',
  planVille: 'https://carentanlesmarais.fr/wp-content/uploads/2015/11/footerPlan.png',
};﻿
const Icon = ({ name, size = 24, color = 'currentColor' }) => {
  const icons = {
    id: <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z" />,
    doc: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 13h8v2H8v-2zm0 4h5v2H8v-2z" />,
    home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    trash: <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />,
    calendar: <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11z" />,
    map: <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />,
    info: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
    phone: <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />,
    mail: <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />,
    chevron: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />,
    arrow: <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />,
    water: <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2C20 10.48 17.33 6.55 12 2zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />,
    book: <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 16c-2.76 0-5-1.12-5-2.5 0-1.67 2.24-2.5 5-2.5s5 .83 5 2.5c0 1.38-2.24 2.5-5 2.5zm5-10H7V8h10v2z" />,
    music: <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />,
    pool: <path d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36v-2c1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36v2zM22 16.3c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36v-2c1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.07-.64 2.18-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36v2zM8.67 12l.67-2h5.33l.67 2h2.66l-2-6H8l-2 6h2.67z" />,
    anchor: <path d="M17 15l1.55 1.55c-.96 1.69-2.63 2.88-4.55 3.31V11h3V9h-3V7.82c1.16-.42 2-1.52 2-2.82a3 3 0 1 0-6 0c0 1.3.84 2.4 2 2.82V9H9v2h3v8.86c-1.92-.43-3.59-1.62-4.55-3.31L9 15l-4 4h4c0 .55.12 1.08.34 1.56C10.52 22.06 12 23 12 23s1.48-.94 2.66-2.44c.22-.48.34-1.01.34-1.56h4l-4-4zM12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />,
    flag: <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />,
    shield: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />,
    users: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />,
    leaf: <path d="M17.75 2.01C12.01 1.77 5.02 4.28 2.26 10.57c-.18.42-.02.91.38 1.13.17.09.35.13.53.13.28 0 .55-.12.74-.34C5.58 9.42 8.03 7.88 10.7 7.18c-1.56 2.34-2.7 5.15-2.7 8.32 0 .83.07 1.64.19 2.43.07.46.47.8.93.8h.06c.5-.04.87-.48.83-.98-.11-1.71.15-2.85.67-3.78.53.84 1.18 1.59 1.95 2.24C14.65 18.04 14 20.49 14 22h2c0-1.64.77-3.36 1.86-4.74.45-.57.92-1.07 1.37-1.52 2.76-2.77 4.77-5.27 4.77-10.46V2.31c0-.18-.07-.35-.2-.48-.12-.13-.3-.2-.47-.2-.19 0-.38 0-.58.01z" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      {icons[name] || icons.info}
    </svg>
  );
};﻿
const navLinks = [
  { label: 'Ma Commune', id: 'commune' },
  { label: 'Vie Quotidienne', id: 'vie-pratique' },
  { label: 'D\u00e9marches', id: 'demarches' },
  { label: 'Culture & Loisirs', id: 'agenda' },
  { label: 'Tourisme', id: 'tourisme' },
];

const megaMenuData = {
  commune: [
    { title: "L'\u00e9quipe municipale", icon: 'users' },
    { title: 'Conseil municipal', icon: 'shield' },
    { title: 'Publications', icon: 'doc' },
    { title: 'March\u00e9s publics', icon: 'doc' },
    { title: 'Finances', icon: 'doc' },
    { title: 'Intercommunalit\u00e9', icon: 'map' },
  ],
  'vie-pratique': [
    { title: 'Eau & Assainissement', icon: 'water' },
    { title: 'D\u00e9chets', icon: 'trash' },
    { title: 'Urbanisme', icon: 'home' },
    { title: 'Transport', icon: 'map' },
    { title: 'Sant\u00e9', icon: 'shield' },
    { title: 'Social', icon: 'users' },
  ],
  demarches: [
    { title: '\u00c9tat civil', icon: 'id' },
    { title: "Carte d'identit\u00e9 / Passeport", icon: 'id' },
    { title: '\u00c9lections', icon: 'flag' },
    { title: "Autorisations d'urbanisme", icon: 'home' },
    { title: 'Inscription scolaire', icon: 'book' },
    { title: 'Location de salle', icon: 'home' },
  ],
  agenda: [
    { title: 'M\u00e9diath\u00e8que', icon: 'book' },
    { title: 'Conservatoire', icon: 'music' },
    { title: 'Piscine', icon: 'pool' },
    { title: 'Associations', icon: 'users' },
    { title: '\u00c9v\u00e9nements', icon: 'calendar' },
    { title: 'March\u00e9s', icon: 'map' },
  ],
  tourisme: [
    { title: 'Patrimoine', icon: 'flag' },
    { title: 'Marais du Cotentin', icon: 'water' },
    { title: 'D-Day', icon: 'shield' },
    { title: 'Port de plaisance', icon: 'anchor' },
    { title: 'H\u00e9bergements', icon: 'home' },
    { title: 'Restauration', icon: 'map' },
  ],
};

const quickAccess = [
  { icon: 'id', label: '\u00c9tat civil', desc: 'Actes, certificats' },
  { icon: 'doc', label: 'Urbanisme', desc: 'Permis, d\u00e9clarations' },
  { icon: 'calendar', label: 'Agenda', desc: '\u00c9v\u00e9nements \u00e0 venir' },
  { icon: 'trash', label: 'D\u00e9chets', desc: 'Collecte, d\u00e9ch\u00e8terie' },
  { icon: 'map', label: 'Plan de ville', desc: 'Rues, quartiers' },
  { icon: 'home', label: 'Locations', desc: 'Salles municipales' },
];

const actualites = [
  { img: images.saison2026, date: '25 mars 2026', title: 'Saison culturelle 2026 : d\u00e9couvrez le programme !', excerpt: 'Concerts, spectacles, expositions\u2026 La saison culturelle 2026 promet une programmation riche et vari\u00e9e.' },
  { img: images.dday1, date: '20 mars 2026', title: 'Comm\u00e9morations du D-Day 2026', excerpt: 'Carentan-les-Marais se pr\u00e9pare pour les c\u00e9r\u00e9monies du 82e anniversaire du D\u00e9barquement.' },
  { img: images.bosseNdrive, date: '15 jan. 2026', title: 'Bosse & Drive : nouvelle offre sportive', excerpt: 'Un nouveau concept alliant sport et mobilit\u00e9 douce arrive dans notre commune.' },
];

const chiffres = [
  { value: '6 200', label: 'Habitants' },
  { value: '5', label: 'Communes d\u00e9l\u00e9gu\u00e9es' },
  { value: '7 400', label: 'ha de marais' },
  { value: '1067', label: 'Ann\u00e9e de fondation' },
];

const demarcheItems = [
  { icon: 'id', title: '\u00c9tat civil', desc: 'Naissance, mariage, d\u00e9c\u00e8s, PACS', link: '#' },
  { icon: 'id', title: "Carte d'identit\u00e9 / Passeport", desc: 'Pr\u00e9-demande ANTS, prise de RDV', link: '#' },
  { icon: 'home', title: 'Urbanisme', desc: 'Permis de construire, d\u00e9clarations pr\u00e9alables', link: '#' },
  { icon: 'book', title: 'Inscriptions scolaires', desc: '\u00c9coles maternelles et \u00e9l\u00e9mentaires', link: '#' },
];

const tourismeRows = [
  { img: images.marais, title: 'Les Marais du Cotentin', text: "Explorez les vastes marais du Cotentin et du Bessin, un espace naturel pr\u00e9serv\u00e9 class\u00e9 Parc Naturel R\u00e9gional. Promenades en barque, observation ornithologique et paysages \u00e0 couper le souffle.", reverse: false },
  { img: images.ddayMuseum, title: 'M\u00e9moire du D-Day', text: "Haut lieu de la Bataille de Normandie, Carentan a \u00e9t\u00e9 lib\u00e9r\u00e9e le 12 juin 1944. D\u00e9couvrez le Dead Man's Corner Museum et les sites de m\u00e9moire de la 101e Airborne.", reverse: true },
  { img: images.portCanal, title: 'Port de Carentan', text: "Le port de plaisance accueille les navigateurs au c\u0153ur de la ville. Profitez des balades le long des quais et d\u00e9couvrez la Voie Verte jusqu'\u00e0 la mer.", reverse: false },
];

const monuments = [
  { img: images.arcades, title: 'Les Arcades', desc: 'Place de la R\u00e9publique, architecture m\u00e9di\u00e9vale' },
  { img: images.eglise, title: '\u00c9glise Notre-Dame', desc: "Chef-d'\u0153uvre gothique normand, XIIe-XVe si\u00e8cle" },
  { img: images.portCanal, title: 'Port de plaisance', desc: '\u00c9scale nautique au fil du canal' },
  { img: images.ddayMuseum, title: "Dead Man's Corner", desc: 'Mus\u00e9e D-Day, m\u00e9moire de la 101st Airborne' },
];

const agendaItems = [
  { date: { day: '12', month: 'AVR' }, title: 'March\u00e9 hebdomadaire', lieu: 'Place de la R\u00e9publique', heure: '8h - 13h' },
  { date: { day: '18', month: 'AVR' }, title: 'Concert de printemps', lieu: 'Salle des f\u00eates', heure: '20h30' },
  { date: { day: '25', month: 'AVR' }, title: 'Randonn\u00e9e d\u00e9couverte des marais', lieu: 'D\u00e9part mairie', heure: '9h00' },
  { date: { day: '03', month: 'MAI' }, title: 'Brocante annuelle', lieu: 'Centre-ville', heure: '7h - 18h' },
  { date: { day: '08', month: 'MAI' }, title: 'C\u00e9r\u00e9monie du 8 mai', lieu: 'Monument aux morts', heure: '11h00' },
];

const viePratique = [
  { icon: 'water', title: 'Eau & Environnement', links: ["Qualit\u00e9 de l'eau", 'Assainissement', 'Espaces verts', 'Rivi\u00e8res & canaux'] },
  { icon: 'home', title: 'Logement & Habitat', links: ['Aide au logement', 'R\u00e9novation \u00e9nerg\u00e9tique', 'Lotissements', 'Logement social'] },
  { icon: 'users', title: 'Social & Solidarit\u00e9', links: ['CCAS', 'Aides sociales', 'Personnes \u00e2g\u00e9es', 'Handicap'] },
];﻿
export default function CarentanVitrine() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [heroSrc, setHeroSrc] = useState(images.hero);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cssText = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Source Sans 3', sans-serif; color: ${palette.text}; background: ${palette.cream}; }
.ct-serif { font-family: 'Playfair Display', serif; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
@keyframes heroFadeIn { from { opacity: 0; } to { opacity: 1; } }
.ct-hero-img { animation: heroFadeIn 1.4s ease-out forwards; }
.ct-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: background .35s, box-shadow .35s, padding .35s; }
.ct-nav--top { background: rgba(255,255,255,0.10); backdrop-filter: blur(2px); padding: 10px 0; }
.ct-nav--scrolled { background: rgba(255,255,255,0.98); box-shadow: 0 2px 16px rgba(46,107,79,0.10); padding: 6px 0; }
.ct-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 24px; }
.ct-logo-wrap { display: flex; align-items: center; flex-shrink: 0; }
.ct-logo-pill { background: transparent; border-radius: 8px; padding: 4px 0; transition: all .3s; }
.ct-logo-pill--scrolled { background: transparent; }
.ct-logo-pill img { height: 54px; width: auto; max-width: 220px; object-fit: contain; }
.ct-nav--top .ct-logo-pill img { background: rgba(255,255,255,0.92); border-radius: 6px; padding: 4px 8px; }
.ct-nav--scrolled .ct-logo-pill img { height: 46px; background: transparent; padding: 0; }
.ct-nav-links { display: flex; align-items: center; gap: 4px; flex: 1; justify-content: center; }
.ct-nav-link { position: relative; padding: 10px 16px; border-radius: 6px; font-weight: 600; font-size: 0.92rem; cursor: pointer; transition: background .2s, color .2s; white-space: nowrap; border: none; background: none; font-family: inherit; }
.ct-nav--top .ct-nav-link { color: #fff; }
.ct-nav--scrolled .ct-nav-link { color: ${palette.text}; }
.ct-nav-link:hover, .ct-nav-link.active { background: rgba(46,107,79,0.12); color: ${palette.vert}; }
.ct-mega { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: #fff; border-radius: 12px; box-shadow: 0 12px 40px rgba(46,107,79,0.14); padding: 24px 28px; min-width: 320px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; transform: translateX(-50%) translateY(8px); }
.ct-nav-link:hover .ct-mega, .ct-nav-link.active .ct-mega { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
.ct-mega-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; transition: background .15s; cursor: pointer; font-size: 0.9rem; font-weight: 500; color: ${palette.text}; }
.ct-mega-item:hover { background: ${palette.beige}; color: ${palette.vert}; }
.ct-mega-item svg { flex-shrink: 0; }
.ct-btn-urgences { background: ${palette.rouge}; color: #fff; border: none; border-radius: 8px; padding: 8px 18px; font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: background .2s; white-space: nowrap; font-family: inherit; display: inline-flex; align-items: center; gap: 6px; }
.ct-btn-urgences:hover { background: #7e2222; }
.ct-btn-contact { background: ${palette.vert}; color: #fff; border: none; border-radius: 8px; padding: 8px 18px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: background .2s; white-space: nowrap; font-family: inherit; }
.ct-btn-contact:hover { background: ${palette.vertDark}; }﻿.ct-hero { position: relative; height: 100vh; min-height: 600px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.ct-hero-bg { position: absolute; inset: 0; z-index: 0; }
.ct-hero-bg img { width: 100%; height: 100%; object-fit: cover; }
.ct-hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(29,74,55,0.30) 0%, rgba(44,36,24,0.15) 50%, rgba(29,74,55,0.35) 100%); }
.ct-hero-content { position: relative; z-index: 2; text-align: center; color: #fff; padding: 80px 32px 0; max-width: 800px; margin: 0 auto; }
.ct-hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border-radius: 30px; padding: 8px 20px; margin-bottom: 24px; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
.ct-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 700; line-height: 1.15; margin-bottom: 16px; text-shadow: 0 2px 12px rgba(0,0,0,0.18); }
.ct-hero p.ct-hero-sub { font-size: 1.2rem; opacity: 0.92; margin-bottom: 32px; text-shadow: 0 1px 6px rgba(0,0,0,0.15); }
.ct-hero-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.ct-hero-cta { padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: transform .2s, box-shadow .2s; border: none; font-family: inherit; }
.ct-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.18); }
.ct-hero-cta--primary { background: ${palette.vert}; color: #fff; }
.ct-hero-cta--secondary { background: rgba(255,255,255,0.2); color: #fff; backdrop-filter: blur(6px); border: 2px solid rgba(255,255,255,0.5); }
.ct-urgences { background: ${palette.rouge}; color: #fff; padding: 14px 24px; display: flex; align-items: center; justify-content: center; gap: 16px; font-size: 0.95rem; font-weight: 600; flex-wrap: wrap; }
.ct-urgences a { color: #fff; text-decoration: underline; font-weight: 700; }
.ct-section { padding: 64px 24px; max-width: 1100px; margin: 0 auto; }
.ct-section-full { padding: 56px 24px; }
.ct-section-header { text-align: center; margin-bottom: 36px; }
.ct-section-header h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #1d4a37; margin-bottom: 10px; }
.ct-section-header .ct-bar { width: 60px; height: 4px; background: ${palette.or}; border-radius: 2px; margin: 12px auto 0; }
.ct-section-header p { color: ${palette.textLight}; font-size: 1.05rem; margin-top: 12px; max-width: 600px; margin-left: auto; margin-right: auto; }
.ct-quick { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
.ct-quick-card { background: #fff; border-radius: 12px; padding: 20px 14px; text-align: center; box-shadow: 0 4px 20px rgba(46,107,79,0.07); transition: transform .25s, box-shadow .25s; cursor: pointer; }
.ct-quick-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(46,107,79,0.13); }
.ct-quick-icon { width: 52px; height: 52px; border-radius: 14px; background: ${palette.beige}; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; color: ${palette.vert}; }
.ct-quick-card h4 { font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; }
.ct-quick-card p { font-size: 0.82rem; color: ${palette.textLight}; }
.ct-actus { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.ct-actu-card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(46,107,79,0.07); transition: transform .25s, box-shadow .25s; }
.ct-actu-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(46,107,79,0.12); }
.ct-actu-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
.ct-actu-body { padding: 20px; }
.ct-actu-date { font-size: 0.8rem; color: ${palette.pierre}; font-weight: 600; margin-bottom: 8px; }
.ct-actu-body h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: ${palette.vertDark}; margin-bottom: 8px; line-height: 1.3; }
.ct-actu-body p { font-size: 0.9rem; color: ${palette.textLight}; line-height: 1.5; }
.ct-actu-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; color: ${palette.vert}; font-weight: 600; font-size: 0.88rem; transition: gap .2s; }
.ct-actu-link:hover { gap: 10px; }﻿.ct-chiffres-wrap { position: relative; padding: 80px 24px; overflow: hidden; background: #1a3e2e; margin: 40px 0; }
.ct-chiffres-bg { position: absolute; inset: 0; z-index: 0; background-size: cover; background-position: center; opacity: 0.25; }
.ct-chiffres-overlay { position: absolute; inset: 0; z-index: 1; background: rgba(26,62,46,0.85); }
.ct-chiffres { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; text-align: center; color: #fff; }
.ct-chiffre-val { font-family: 'Playfair Display', serif; font-size: 3.2rem; font-weight: 800; color: #f0c040; text-shadow: 0 2px 8px rgba(0,0,0,0.25); }
.ct-chiffre-label { font-size: 0.95rem; margin-top: 8px; opacity: 0.9; font-weight: 600; color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 0.04em; }
.ct-demarches { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.ct-demarche-card { display: flex; align-items: flex-start; gap: 18px; background: #fff; border-radius: 14px; padding: 24px; box-shadow: 0 4px 20px rgba(46,107,79,0.07); transition: transform .25s, box-shadow .25s; cursor: pointer; }
.ct-demarche-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(46,107,79,0.12); }
.ct-demarche-icon { width: 48px; height: 48px; border-radius: 12px; background: ${palette.beige}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: ${palette.vert}; }
.ct-demarche-card h4 { font-weight: 700; font-size: 1.05rem; margin-bottom: 4px; }
.ct-demarche-card p { font-size: 0.88rem; color: ${palette.textLight}; margin-bottom: 10px; line-height: 1.4; }
.ct-demarche-card a.ct-demarche-link { color: ${palette.vert}; font-weight: 600; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 4px; }
.ct-tourisme-row { display: flex; gap: 48px; align-items: center; margin-bottom: 56px; }
.ct-tourisme-row--reverse { flex-direction: row-reverse; }
.ct-tourisme-img { flex: 1; min-width: 0; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 32px rgba(46,107,79,0.12); }
.ct-tourisme-img img { width: 100%; height: 320px; object-fit: cover; }
.ct-tourisme-text { flex: 1; min-width: 0; }
.ct-tourisme-text h3 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: ${palette.vertDark}; margin-bottom: 16px; }
.ct-tourisme-text p { font-size: 1rem; line-height: 1.7; color: ${palette.textLight}; margin-bottom: 20px; }
.ct-btn-outline { display: inline-flex; align-items: center; gap: 8px; border: 2px solid ${palette.vert}; color: ${palette.vert}; border-radius: 10px; padding: 10px 24px; font-weight: 600; font-size: 0.92rem; transition: background .2s, color .2s; cursor: pointer; background: none; font-family: inherit; }
.ct-btn-outline:hover { background: ${palette.vert}; color: #fff; }
.ct-monuments { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.ct-monument-card { border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 4px 20px rgba(46,107,79,0.07); transition: transform .25s, box-shadow .25s; }
.ct-monument-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(46,107,79,0.12); }
.ct-monument-card img { width: 100%; height: 200px; object-fit: cover; }
.ct-monument-body { padding: 16px; }
.ct-monument-body h4 { font-family: 'Playfair Display', serif; font-size: 1.05rem; margin-bottom: 4px; color: ${palette.vertDark}; }
.ct-monument-body p { font-size: 0.82rem; color: ${palette.textLight}; line-height: 1.4; }
.ct-agenda-list { display: flex; flex-direction: column; gap: 12px; }
.ct-agenda-row { display: flex; align-items: center; gap: 20px; background: #fff; border-radius: 14px; padding: 16px 24px; box-shadow: 0 2px 12px rgba(46,107,79,0.06); transition: transform .2s, box-shadow .2s; cursor: pointer; }
.ct-agenda-row:hover { transform: translateX(4px); box-shadow: 0 6px 20px rgba(46,107,79,0.10); }
.ct-agenda-date { width: 60px; text-align: center; flex-shrink: 0; }
.ct-agenda-date .day { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: ${palette.vert}; line-height: 1; }
.ct-agenda-date .month { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: ${palette.pierre}; letter-spacing: 0.04em; }
.ct-agenda-info h4 { font-weight: 700; font-size: 1rem; margin-bottom: 2px; }
.ct-agenda-info p { font-size: 0.85rem; color: ${palette.textLight}; }
.ct-agenda-arrow { margin-left: auto; color: ${palette.pierre}; }﻿.ct-vie { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.ct-vie-card { background: #fff; border-radius: 8px; padding: 14px 14px; box-shadow: 0 1px 6px rgba(46,107,79,0.04); transition: transform .2s; border: 1px solid rgba(217,208,194,0.4); }
.ct-vie-card:hover { transform: translateY(-4px); }
.ct-vie-icon { width: 36px; height: 36px; border-radius: 10px; background: ${palette.beige}; display: flex; align-items: center; justify-content: center; color: ${palette.vert}; margin-bottom: 16px; }
.ct-vie-card h4 { font-family: 'Playfair Display', serif; font-size: 1rem; color: ${palette.vertDark}; margin-bottom: 10px; }
.ct-vie-links { list-style: none; display: flex; flex-direction: column; gap: 3px; }
.ct-vie-links li a { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: ${palette.textLight}; padding: 4px 0; transition: color .15s; }
.ct-vie-links li a:hover { color: ${palette.vert}; }
.ct-contact-wrap { position: relative; overflow: hidden; background: ${palette.vertDark}; }
.ct-contact-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.08; }
.ct-contact { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 80px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.ct-contact-left { color: #fff; }
.ct-contact-left h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 16px; }
.ct-contact-left p { opacity: 0.85; line-height: 1.6; margin-bottom: 24px; }
.ct-contact-info { display: flex; flex-direction: column; gap: 14px; }
.ct-contact-info div { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; }
.ct-contact-info svg { opacity: 0.7; }
.ct-contact-form { background: rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; backdrop-filter: blur(12px); }
.ct-contact-form h3 { color: #fff; font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 20px; }
.ct-form-group { margin-bottom: 16px; }
.ct-form-group label { display: block; color: rgba(255,255,255,0.7); font-size: 0.82rem; font-weight: 600; margin-bottom: 6px; }
.ct-form-group input, .ct-form-group textarea { width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 0.95rem; font-family: 'Source Sans 3', sans-serif; transition: border-color .2s; }
.ct-form-group input::placeholder, .ct-form-group textarea::placeholder { color: rgba(255,255,255,0.4); }
.ct-form-group input:focus, .ct-form-group textarea:focus { outline: none; border-color: ${palette.or}; }
.ct-form-group textarea { resize: vertical; min-height: 100px; }
.ct-form-submit { background: ${palette.or}; color: #fff; border: none; border-radius: 10px; padding: 14px 32px; font-weight: 700; font-size: 1rem; cursor: pointer; width: 100%; font-family: inherit; transition: background .2s; }
.ct-form-submit:hover { background: #a07c22; }
.ct-footer { background: ${palette.footerBg}; color: rgba(255,255,255,0.75); padding: 56px 24px 32px; }
.ct-footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; }
.ct-footer h4 { font-family: 'Playfair Display', serif; color: #fff; font-size: 1.05rem; margin-bottom: 16px; }
.ct-footer p { font-size: 0.88rem; line-height: 1.6; }
.ct-footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.ct-footer-links li a { font-size: 0.88rem; transition: color .15s; }
.ct-footer-links li a:hover { color: #fff; }
.ct-footer-bottom { max-width: 1200px; margin: 32px auto 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; opacity: 0.6; flex-wrap: wrap; gap: 8px; }
@media (max-width: 900px) {
  .ct-nav-links { display: none; }
  .ct-hero h1 { font-size: 2.2rem; }
  .ct-quick { grid-template-columns: repeat(3, 1fr); }
  .ct-actus { grid-template-columns: 1fr; }
  .ct-chiffres { grid-template-columns: repeat(2, 1fr); }
  .ct-demarches { grid-template-columns: 1fr; }
  .ct-tourisme-row, .ct-tourisme-row--reverse { flex-direction: column; }
  .ct-tourisme-img img { height: 220px; }
  .ct-monuments { grid-template-columns: repeat(2, 1fr); }
  .ct-vie { grid-template-columns: 1fr; }
  .ct-contact { grid-template-columns: 1fr; }
  .ct-footer-inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .ct-quick { grid-template-columns: repeat(2, 1fr); }
  .ct-chiffres { grid-template-columns: 1fr 1fr; }
  .ct-monuments { grid-template-columns: 1fr; }
  .ct-footer-inner { grid-template-columns: 1fr; }
}
`;

  return (
    <>
      <style>{cssText}</style>﻿
      {/* NAV */}
      <nav className={`ct-nav ${scrolled ? 'ct-nav--scrolled' : 'ct-nav--top'}`}>
        <div className="ct-nav-inner">
          <div className="ct-logo-wrap">
            <div className={`ct-logo-pill ${scrolled ? 'ct-logo-pill--scrolled' : ''}`}>
              <img
                src={images.logo}
                alt="Carentan-les-Marais"
                onError={(e) => { e.target.onerror = null; e.target.src = images.logoFallback; }}
              />
            </div>
          </div>
          <div className="ct-nav-links">
            {navLinks.map((link) => (
              <div
                key={link.id}
                className={`ct-nav-link ${activeMenu === link.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveMenu(link.id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {link.label}
                {megaMenuData[link.id] && (
                  <div className="ct-mega">
                    {megaMenuData[link.id].map((item, i) => (
                      <a key={i} className="ct-mega-item" href={`#${link.id}`}>
                        <Icon name={item.icon} size={18} color={palette.vert} />
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="ct-btn-urgences" onClick={() => document.getElementById('urgences')?.scrollIntoView({ behavior: 'smooth' })}>
            <Icon name="phone" size={14} color="#fff" /> Urgences
          </button>
          <button className="ct-btn-contact" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-hero-bg">
          <img
            className="ct-hero-img"
            src={heroSrc}
            alt="Carentan-les-Marais"
            onError={() => {
              if (heroSrc !== images.heroFallback) setHeroSrc(images.heroFallback);
            }}
          />
        </div>
        <div className="ct-hero-overlay" />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, zIndex: 3, background: "linear-gradient(to bottom, #002395 33%, #fff 33%, #fff 66%, #ED2939 66%)" }} />
        <div className="ct-hero-content">
          <div className="ct-hero-badge">
            <Icon name="leaf" size={16} color="#fff" />
            NORMANDIE · COTENTIN · MANCHE (50)
          </div>
          <h1 className="ct-serif">Bienvenue à<br/><span style={{ color: "#a7f3d0" }}>Carentan</span> <span style={{ fontWeight: 400, fontStyle: "italic" }}>les Marais</span></h1>
          <p className="ct-hero-sub">Au cœur du bocage normand, entre marais et prairies ? une terre d’eau, d’histoire et de vie depuis le XIe siècle.</p>
          <div className="ct-hero-ctas">
            <button className="ct-hero-cta ct-hero-cta--primary" onClick={() => document.getElementById('demarches')?.scrollIntoView({ behavior: 'smooth' })}>
              Vos démarches
            </button>
            <button className="ct-hero-cta ct-hero-cta--secondary" onClick={() => document.getElementById('tourisme')?.scrollIntoView({ behavior: 'smooth' })}>
              Découvrir la commune
            </button>
          </div>
        </div>
      </section>

      {/* URGENCES */}
      <div className="ct-urgences" id="urgences">
        <Icon name="phone" size={18} color="#fff" />
        <span>Urgences : <a href="tel:15">SAMU 15</a> · <a href="tel:18">Pompiers 18</a> · <a href="tel:17">Gendarmerie 17</a> · <a href="tel:112">Européen 112</a></span>
      </div>

      {/* QUICK ACCESS */}
      <section className="ct-section-full" style={{ background: palette.beige }}>
        <div className="ct-section-header">
          <h2 className="ct-serif">Accès rapide</h2>
          <div className="ct-bar" />
        </div>
        <div className="ct-quick">
          {quickAccess.map((item, i) => (
            <div key={i} className="ct-quick-card">
              <div className="ct-quick-icon"><Icon name={item.icon} size={26} /></div>
              <h4>{item.label}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="ct-section">
        <div className="ct-section-header">
          <h2 className="ct-serif">Actualités</h2>
          <div className="ct-bar" />
          <p>Les dernières nouvelles de votre commune</p>
        </div>
        <div className="ct-actus">
          {actualites.map((a, i) => (
            <div key={i} className="ct-actu-card">
              <img src={a.img} alt={a.title} />
              <div className="ct-actu-body">
                <div className="ct-actu-date">{a.date}</div>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <a href="#" className="ct-actu-link">Lire la suite <Icon name="arrow" size={14} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>﻿
      {/* CHIFFRES CLÉS */}
      <div className="ct-chiffres-wrap">
        <div className="ct-chiffres-bg" style={{ backgroundImage: `url(${images.marais})` }} />
        <div className="ct-chiffres-overlay" />
        <div className="ct-section-header" style={{ position: 'relative', zIndex: 2, marginBottom: 48 }}>
          <h2 className="ct-serif" style={{ color: '#fff' }}>Chiffres clés</h2>
          <div className="ct-bar" />
        </div>
        <div className="ct-chiffres">
          {chiffres.map((c, i) => (
            <div key={i}>
              <div className="ct-chiffre-val">{c.value}</div>
              <div className="ct-chiffre-label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DÉMARCHES */}
      <section className="ct-section" id="demarches" style={{ background: palette.beige, paddingTop: 72, paddingBottom: 72 }}>
        <div className="ct-section-header">
          <h2 className="ct-serif">Démarches en ligne</h2>
          <div className="ct-bar" />
          <p>Simplifiez vos formalités administratives</p>
        </div>
        <div className="ct-demarches">
          {demarcheItems.map((d, i) => (
            <div key={i} className="ct-demarche-card">
              <div className="ct-demarche-icon"><Icon name={d.icon} size={24} /></div>
              <div>
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
                <a href={d.link} className="ct-demarche-link">Accéder <Icon name="chevron" size={14} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOURISME & PATRIMOINE */}
      <section className="ct-section" id="tourisme">
        <div className="ct-section-header">
          <h2 className="ct-serif">Tourisme &amp; Patrimoine</h2>
          <div className="ct-bar" />
          <p>Découvrez les richesses de Carentan-les-Marais et de son territoire</p>
        </div>
        {tourismeRows.map((row, i) => (
          <div key={i} className={`ct-tourisme-row ${row.reverse ? 'ct-tourisme-row--reverse' : ''}`}>
            <div className="ct-tourisme-img"><img src={row.img} alt={row.title} /></div>
            <div className="ct-tourisme-text">
              <h3 className="ct-serif">{row.title}</h3>
              <p>{row.text}</p>
              <button className="ct-btn-outline">En savoir plus <Icon name="arrow" size={16} /></button>
            </div>
          </div>
        ))}
      </section>

      {/* MONUMENTS */}
      <section className="ct-section" style={{ background: palette.sable }}>
        <div className="ct-section-header">
          <h2 className="ct-serif">Monuments remarquables</h2>
          <div className="ct-bar" />
        </div>
        <div className="ct-monuments">
          {monuments.map((m, i) => (
            <div key={i} className="ct-monument-card">
              <img src={m.img} alt={m.title} />
              <div className="ct-monument-body">
                <h4>{m.title}</h4>
                <p>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>﻿
      {/* AGENDA */}
      <section className="ct-section" id="agenda">
        <div className="ct-section-header">
          <h2 className="ct-serif">Agenda</h2>
          <div className="ct-bar" />
          <p>Les prochains événements à Carentan-les-Marais</p>
        </div>
        <div className="ct-agenda-list">
          {agendaItems.map((ev, i) => (
            <div key={i} className="ct-agenda-row">
              <div className="ct-agenda-date">
                <div className="day">{ev.date.day}</div>
                <div className="month">{ev.date.month}</div>
              </div>
              <div className="ct-agenda-info">
                <h4>{ev.title}</h4>
                <p>{ev.lieu} · {ev.heure}</p>
              </div>
              <div className="ct-agenda-arrow"><Icon name="chevron" size={20} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* VIE PRATIQUE */}
      <section className="ct-section" id="vie-pratique" style={{ background: palette.beige }}>
        <div className="ct-section-header">
          <h2 className="ct-serif">Vie pratique</h2>
          <div className="ct-bar" />
        </div>
        <div className="ct-vie">
          {viePratique.map((vp, i) => (
            <div key={i} className="ct-vie-card">
              <div className="ct-vie-icon"><Icon name={vp.icon} size={24} /></div>
              <h4>{vp.title}</h4>
              <ul className="ct-vie-links">
                {vp.links.map((l, j) => (
                  <li key={j}><a href="#"><Icon name="chevron" size={14} color={palette.pierre} /> {l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>﻿
      {/* CONTACT */}
      <div className="ct-contact-wrap" id="contact">
        <div className="ct-contact-bg" style={{ backgroundImage: `url(${images.marais})` }} />
        <div className="ct-contact">
          <div className="ct-contact-left">
            <h2 className="ct-serif">Contactez-nous</h2>
            <p>La mairie de Carentan-les-Marais est à votre disposition pour répondre à vos questions et vous accompagner dans vos démarches.</p>
            <div className="ct-contact-info">
              <div><Icon name="map" size={18} color="#fff" /> Place de la République, 50500 Carentan-les-Marais</div>
              <div><Icon name="phone" size={18} color="#fff" /> 02 33 42 74 00</div>
              <div><Icon name="mail" size={18} color="#fff" /> mairie@carentanlesmarais.fr</div>
              <div><Icon name="calendar" size={18} color="#fff" /> Lun-Ven : 8h30 - 12h / 13h30 - 17h</div>
            </div>
          </div>
          <div className="ct-contact-form">
            <h3 className="ct-serif">Envoyer un message</h3>
            <div className="ct-form-group">
              <label>Nom complet</label>
              <input type="text" placeholder="Votre nom" />
            </div>
            <div className="ct-form-group">
              <label>Email</label>
              <input type="email" placeholder="votre@email.fr" />
            </div>
            <div className="ct-form-group">
              <label>Sujet</label>
              <input type="text" placeholder="Objet de votre demande" />
            </div>
            <div className="ct-form-group">
              <label>Message</label>
              <textarea placeholder="Votre message..." />
            </div>
            <button className="ct-form-submit">Envoyer</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="ct-footer">
        <div className="ct-footer-inner">
          <div>
            <h4>Carentan-les-Marais</h4>
            <p>Commune nouvelle du Cotentin, née de la fusion de Carentan, Saint-Côme-du-Mont, Houesville, Saint-Pellerin et Les Veys. Un territoire riche d'histoire, entre marais et bocage normand.</p>
            <div style={{ marginTop: 16 }}>
              <img src={images.planVille} alt="Plan de Carentan" style={{ borderRadius: 8, maxWidth: 200, opacity: 0.7 }} />
            </div>
          </div>
          <div>
            <h4>Mairie</h4>
            <ul className="ct-footer-links">
              <li><a href="#">Équipe municipale</a></li>
              <li><a href="#">Conseil municipal</a></li>
              <li><a href="#">Commissions</a></li>
              <li><a href="#">Recrutement</a></li>
              <li><a href="#">Publications</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul className="ct-footer-links">
              <li><a href="#">État civil</a></li>
              <li><a href="#">Urbanisme</a></li>
              <li><a href="#">Petite enfance</a></li>
              <li><a href="#">Scolaire</a></li>
              <li><a href="#">Social</a></li>
            </ul>
          </div>
          <div>
            <h4>Pratique</h4>
            <ul className="ct-footer-links">
              <li><a href="#">Horaires d'ouverture</a></li>
              <li><a href="#">Marchés publics</a></li>
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">Accessibilité</a></li>
              <li><a href="#">Plan du site</a></li>
            </ul>
          </div>
        </div>
        <div className="ct-footer-bottom">
          <span>© 2026 Mairie de Carentan-les-Marais · Tous droits réservés</span>
          <span>Conception : Service Communication</span>
        </div>
      </footer>
    </>
  );
}