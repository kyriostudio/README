import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ── Intersection observer hook ── */
function useVisible(threshold = 0.15) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, y = 24 }) {
  const [ref, vis] = useVisible();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : `translateY(${y}px)`, transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease` }}>
      {children}
    </div>
  );
}

/* ── Boxes — isometric grid background (aceternity-style) ── */
const BOX_COLORS = [
  'rgb(125 211 252)', 'rgb(249 168 212)', 'rgb(134 239 172)',
  'rgb(253 224 71)',  'rgb(252 165 165)', 'rgb(216 180 254)',
  'rgb(147 197 253)', 'rgb(165 180 252)', 'rgb(196 181 253)',
];
const randBoxColor = () => BOX_COLORS[Math.floor(Math.random() * BOX_COLORS.length)];

function BoxesCore({ style: extraStyle = {} }) {
  const rows = useMemo(() => new Array(80).fill(1), []);
  const cols = useMemo(() => new Array(40).fill(1), []);
  return (
    <div
      style={{
        position: 'absolute', left: '25%', top: '-25%', width: '100%', height: '100%', zIndex: 0,
        padding: 16, display: 'flex',
        transform: 'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)',
        ...extraStyle,
      }}
    >
      {rows.map((_, i) => (
        <motion.div key={`row-${i}`} style={{ width: 64, height: 32, borderLeft: '1px solid #334155', position: 'relative' }}>
          {cols.map((_, j) => (
            <motion.div
              key={`col-${j}`}
              whileHover={{ backgroundColor: randBoxColor(), transition: { duration: 0 } }}
              animate={{ transition: { duration: 2 } }}
              style={{ width: 64, height: 32, borderRight: '1px solid #334155', borderTop: '1px solid #334155', position: 'relative' }}
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#334155"
                  style={{ position: 'absolute', height: 24, width: 40, top: -14, left: -22, pointerEvents: 'none' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
const Boxes = memo(BoxesCore);

/* ── Helpers ── */
const eur = n => Number(n).toLocaleString('fr-FR') + ' €';

/* ══════════════════════════════════════════════════
   KYRIO LOGO — K (background-image crop) + yrio.
   PNG 669×373 · K bbox: x[236-431] y[72-300]
══════════════════════════════════════════════════ */
function KyrioMark({ size = 42, dark = true, opacity = 1 }) {
  const textColor = dark ? '#ffffff' : '#0d0f18';
  const gradId = 'kyrio-og-' + Math.random().toString(36).slice(2, 8);
  const s = size;
  const dotColor = dark ? '#bef264' : '#84cc16';
  const g1 = dark ? '#818cf8' : '#6366f1';
  const g2 = dark ? '#22d3ee' : '#06b6d4';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(s * 0.15), opacity, transition: 'opacity .3s', lineHeight: 1 }}>
      <svg width={s} height={s} viewBox="0 0 100 100" fill="none" style={{ flexShrink: 0, display: 'block' }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={g1} />
            <stop offset="100%" stopColor={g2} />
          </linearGradient>
        </defs>
        <g transform="rotate(-30 50 50)">
          <circle cx="50" cy="50" r="35" fill="none" stroke={`url(#${gradId})`} strokeWidth="10" strokeLinecap="round" strokeDasharray="210 30" />
        </g>
        <g style={{ animation: 'kyrio-dot-orbit 4s linear infinite', transformOrigin: '50px 50px' }}>
          <circle cx="82" cy="28" r="10" fill={dotColor} />
          <circle cx="82" cy="28" r="14" fill={dotColor} opacity="0.2">
            <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      <span style={{
        fontSize: Math.round(s * 0.7),
        fontWeight: 900,
        color: textColor,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        fontFamily: "Inter, 'Helvetica Neue', Arial, sans-serif",
        transition: 'color .3s',
        userSelect: 'none',
      }}>
        <span style={{ background: dark ? 'linear-gradient(90deg, #818cf8, #22d3ee)' : 'linear-gradient(90deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>K</span>yrio<span style={{ color: dotColor }}>.</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   KYRIO ICON SYSTEM — trait fin, style épuré
   strokeWidth 1.5 · rounded caps · 24×24
══════════════════════════════════════════════════ */
function KIcon({ name, size = 24, color = 'currentColor', strokeWidth = 1.5 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    /* Processus */
    brief:   <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="13" y2="14"/></>,
    devis:   <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></>,
    creation:<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
    launch:  <><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/><path d="M12 3v1M12 20v1M3 12h1M20 12h1"/></>,
    /* Pourquoi Kyrio */
    speed:   <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
    target:  <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    seo:     <><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></>,
    person:  <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    shield:  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
    chart:   <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    /* Stats bar */
    clock:   <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    check:   <><polyline points="20 6 9 17 4 12"/></>,
    lock:    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    search:  <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    /* Maintenance */
    guardian:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    growth:  <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    partner: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    /* Features check */
    tick:    <><polyline points="20 6 9 17 4 12"/></>,
    /* Pack lancement */
    pen:     <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
    globe:   <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    star:    <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    camera:  <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    /* Thème */
    moon:    <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>,
    sun:     <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
    /* Slider avant/après */
    arrowsH: <><polyline points="15 18 21 12 15 6"/><polyline points="9 6 3 12 9 18"/></>,
    arrowsV: <><polyline points="6 9 12 3 18 9"/><polyline points="6 15 12 21 18 15"/></>,
  };
  return <svg {...p}>{paths[name]||null}</svg>;
}

/* Conteneur d'icône standardisé */
function IconBox({ name, size = 20, bg = 'rgba(99,102,241,.1)', color = '#6366f1', boxSize = 48, radius = 14 }) {
  return (
    <div style={{ width: boxSize, height: boxSize, borderRadius: radius, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <KIcon name={name} size={size} color={color} />
    </div>
  );
}

/* ── Data ── */
/* Positionnement marché 2026 (France, TPE/PME) :
   - Freelance WordPress : 1 500 – 3 000 €
   - Agence locale       : 2 500 – 6 000 €
   - Agence digitale     : 5 000 – 15 000 €
   Kyrio : 30 à 45 % sous la moyenne agence, délais 3× plus courts,
   SEO local Basse-Normandie inclus par défaut. */

const OFFRES = [
  {
    nom: 'Essentiel',
    prix: 990,
    delai: '7 jours',
    desc: "Le prix d'un site « starter » d'agence — en moins cher, plus rapide, et sans devis mystère. Parfait pour sortir de la page 7 de Google en une semaine.",
    color: '#6366f1',
    features: [
      '5 pages (Accueil, Services, À propos, Galerie, Contact)',
      'Design responsive mobile & desktop',
      'Formulaire de contact intégré',
      'Intégration Google Maps',
      'SEO de base — balises & métadonnées',
      'Mise en ligne incluse',
      'Google Search Console configurée',
    ],
    cta: "Allez, on y va",
    popular: false,
  },
  {
    nom: 'Pro',
    prix: 1490,
    delai: '14 jours',
    desc: "Là où la concurrence facture 3 500 € pour 10 pages, Kyrio en demande 1 490 €. Même qualité, même SEO — juste sans la marge « agence parisienne ». Choisi par 7 clients sur 10.",
    color: '#06b6d4',
    features: [
      '10 pages sur-mesure',
      'Design premium personnalisé',
      'Galerie photos & avant/après',
      'SEO avancé + Google Business optimisé',
      'Google Analytics 4 configuré',
      'Blog avec 3 articles de lancement',
      'Hébergement 1 an offert',
      'Suivi 30 jours post-lancement',
    ],
    cta: 'Oui, je veux ça',
    popular: true,
  },
  {
    nom: 'Signature',
    prix: null,
    delai: '~21 jours',
    desc: "Le site XXL sur-mesure — pages illimitées, boutique, animations premium, stratégie SEO. Chaque projet est unique, le tarif aussi. On en discute autour d'un café.",
    color: '#f59e0b',
    features: [
      'Pages illimitées',
      'Animations & effets premium',
      'Réservation en ligne ou boutique',
      'SEO premium + stratégie contenu',
      'Rapport mensuel de performance',
      'Formation client (2h) incluse',
      'Hébergement 1 an offert',
      'Priorité absolue & accès direct',
    ],
    cta: "On en parle →",
    popular: false,
  },
];

const MAINTENANCE = [
  { nom: 'Kyrio Gardien',    prix: 39,  desc: "On veille comme un chat sur un clavier — sauf qu'on met à jour vos plugins, pas les vidéos de moustaches.",              features: ['Mises à jour CMS & plugins', 'Sauvegardes quotidiennes', 'Surveillance sécurité 24h/24', 'Certificat SSL maintenu'],              color: '#10b981', icon: 'guardian' },
  { nom: 'Kyrio Croissance', prix: 69,  desc: "Un site qui ne bouge pas, c'est du patrimoine. Sauf que Google ne collectionne pas les antiquités.",                     features: ['Tout le Gardien inclus', '2 h de modifications/mois', 'Rapport SEO mensuel', 'Fiche Google Business suivi'],                     color: '#06b6d4', icon: 'growth'   },
  { nom: 'Kyrio Partenaire', prix: null, desc: "Stratégie, contenu, ads — votre équipe marketing sans les frais de plantes au bureau. Tarif sur mesure selon le projet.", features: ['Tout Croissance inclus', '4 h création contenu/mois', 'Gestion Google Ads', 'Réunion mensuelle bilan'],                     color: '#f59e0b', icon: 'partner'  },
];

const STEPS = [
  { num: '01', titre: 'Brief & caféine', desc: "30 minutes. Les vraies questions — pas celles d'un PDF de 48 pages pensé pour vous faire fuir.", icon: 'brief' },
  { num: '02', titre: 'Devis sous 24 h', desc: "Prix, délais, périmètre : en grand sur la page 1. Pas de « sur devis » mystique planqué en page 12.", icon: 'devis' },
  { num: '03', titre: 'Création & retours', desc: "Première version en 72 h. Deux tours de retours — parce qu'on préfère bien faire que faire douze fois.", icon: 'creation' },
  { num: '04', titre: 'Mise en ligne', desc: "Go-live, tests, mini-formation. Après ? On ne disparaît pas — contrairement à votre ex-agence.", icon: 'launch' },
];

const WHY = [
  { titre: 'Vite. Vraiment vite.', desc: "Sept à vingt-et-un jours. Pendant qu'ailleurs on peaufine encore le brief, votre site est déjà en ligne — on n'a pas la machine à voyager dans le temps, juste un bon process.", icon: 'speed' },
  { titre: 'Beau comme tout. Utile comme jamais.', desc: "Design qui plaît aux humains, structure qui plaît à Google. Les deux dès le départ — pas de « on verra le SEO plus tard ».", icon: 'target' },
  { titre: 'SEO dès le jour 1', desc: "Référencement inclus, pas vendu en option six mois plus tard comme un dessert qu'on vous cache sous le napperon.", icon: 'seo' },
  { titre: 'Un humain au bout du fil.', desc: "Pas de ticket #38492. Pas de bot qui vous demande si vous êtes un robot. Une vraie personne — promis.", icon: 'person' },
  { titre: 'Tarifs affichés. Fin de la blague.', desc: "Ce que vous signez, c'est ce que vous payez. Pas de ligne « ajustement créatif » en taille 6.", icon: 'shield' },
  { titre: 'Des chiffres. Même quand ça pique.', desc: "Stats, rapports, courbes — on vous montre ce qui marche. Et ce qui devrait prendre sa retraite.", icon: 'chart' },
];

/* Matrice comparative — one-shot uniquement (12 lignes, 3 groupes).
   Flex est présenté séparément via une carte dédiée. */
const FEATURES_MATRIX = [
  { group: 'Site & design', items: [
    { label: 'Nombre de pages',                  essentiel: '5',   pro: '10',   signature: 'Illimité' },
    { label: 'Design premium sur-mesure',         essentiel: false, pro: true,   signature: true       },
    { label: 'Animations & effets premium',       essentiel: false, pro: false,  signature: true       },
    { label: 'Réservation en ligne / boutique',   essentiel: false, pro: false,  signature: true       },
  ]},
  { group: 'SEO & visibilité', items: [
    { label: 'SEO local inclus dès J+1',          essentiel: true,  pro: true,   signature: true       },
    { label: 'Google Business optimisé',          essentiel: false, pro: true,   signature: true       },
    { label: 'Google Analytics 4',               essentiel: false, pro: true,   signature: true       },
    { label: 'Stratégie contenu SEO',             essentiel: false, pro: false,  signature: true       },
  ]},
  { group: 'Livraison & suivi', items: [
    { label: 'Hébergement 1 an offert',           essentiel: false, pro: true,   signature: true       },
    { label: 'Blog (3 articles offerts)',          essentiel: false, pro: true,   signature: true       },
    { label: 'Suivi 30 j post-lancement',         essentiel: false, pro: true,   signature: true       },
    { label: 'Formation client (2 h)',             essentiel: false, pro: false,  signature: true       },
  ]},
];

/* Kyrio Flex — deux formules liées aux one-shots correspondants.
   Flex Essentiel (79 €/mois) < Essentiel one-shot (990 €) sur 12 mois : argument offensif.
   Flex Pro (119 €/mois) < Pro one-shot (1 490 €) sur 12 mois. */
const OFFRES_FLEX = [
  {
    nom: 'Flex Essentiel',
    basedOn: 'Essentiel',
    prixMensuel: 79,
    totalAn: 948,
    oneShotRef: 990,
    economie: '−42 €',
    color: '#6366f1',
    pitch: "Moins cher que d'acheter l'Essentiel — et la maintenance 1 an est déjà dedans.",
    features: ['Site Essentiel (5 pages) livré en 7 j', 'Hébergement + domaine inclus', 'Maintenance Gardien incluse', '1 h de retouches/mois', 'Propriétaire après 12 mois'],
  },
  {
    nom: 'Flex Pro',
    basedOn: 'Pro',
    prixMensuel: 119,
    totalAn: 1428,
    oneShotRef: 1490,
    economie: '−62 €',
    color: '#ec4899',
    pitch: "Votre site Pro à 1 490 € ? Ou 119 €/mois — moins cher en total, 0 € ce mois-ci.",
    features: ['Site Pro (10 pages) livré en 14 j', 'Hébergement + domaine inclus', 'Maintenance Croissance incluse', '2 h de retouches/mois', 'Propriétaire après 12 mois'],
  },
];

/* Comparatif marché — chiffres sourcés moyennes FR 2026 */
const VS_MARCHE = [
  { label: 'Site 10 pages + SEO',       freelance: '2 200 €',   agence: '3 800 €',   kyrio: '1 490 €', economie: '−61 %' },
  { label: 'Délai moyen de livraison',  freelance: '4 semaines',agence: '8 semaines',kyrio: '7 jours', economie: '8× plus vite' },
  { label: 'SEO local inclus',          freelance: 'Option',    agence: 'Option',    kyrio: 'Inclus',  economie: '+400 € économisés' },
  { label: 'Maintenance mensuelle',     freelance: 'Rarement',  agence: '120 €/mois',kyrio: '39 €/mois', economie: '−68 %' },
  { label: 'Abonnement 0 € d\'entrée',  freelance: 'Non',       agence: 'Non',       kyrio: 'Oui (Flex)', economie: 'Exclu. Kyrio' },
];

/* Zone d'intervention — Basse-Normandie (Calvados 14, Manche 50, Orne 61) */
const ZONE_BN = {
  departements: [
    { code: '14', nom: 'Calvados', villes: ['Caen', 'Bayeux', 'Lisieux', 'Vire', 'Deauville', 'Honfleur', 'Falaise'] },
    { code: '50', nom: 'Manche',   villes: ['Cherbourg', 'Saint-Lô', 'Granville', 'Coutances', 'Avranches', 'Carentan'] },
    { code: '61', nom: 'Orne',     villes: ['Alençon', 'Flers', 'Argentan', 'L\'Aigle', 'Mortagne-au-Perche'] },
  ],
  deplacement: 'Déplacement offert dans tout le Calvados, la Manche et l\'Orne. Rendez-vous visio partout ailleurs.',
};


﻿/* ══════════════════════════════════════════════════
   AVANT / APRÈS — Comparateur drag (horizontal)
══════════════════════════════════════════════════ */
function AvantApres() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  const update = (clientX) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="avant-apres-comparator"
      style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', userSelect: 'none', width: '100%', height: 520, boxShadow: '0 32px 80px rgba(0,0,0,.22)', border: '1px solid rgba(0,0,0,.1)', cursor: 'col-resize' }}
      onMouseMove={e => dragging && update(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={e => { e.preventDefault(); update(e.touches[0].clientX); }}
      onTouchEnd={() => setDragging(false)}
    >
      {/* ══ AVANT — à gauche, clipé depuis la droite ══ */}
      <div style={{ position: 'absolute', inset: 0, background: '#f5ede0', overflow: 'hidden', fontFamily: 'Arial, Helvetica, sans-serif', clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* Chrome */}
        <div style={{ background: '#d0cdc8', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #bbb', flexShrink: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff6057', display: 'inline-block' }}/><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}/><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', display: 'inline-block' }}/>
          <div style={{ flex: 1, background: '#e8e4df', borderRadius: 2, padding: '1px 8px', fontSize: 7, color: '#888', marginLeft: 5, border: '1px solid #bbb' }}>www.restaurant-le-provencal.fr</div>
        </div>
        {/* Header bordeaux */}
        <div style={{ background: 'linear-gradient(90deg,#7a0000,#9a1a1a)', padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #c8a020' }}>
          <div>
            <div style={{ color: '#FFD700', fontWeight: 900, fontSize: 13, fontFamily: 'Georgia,serif', letterSpacing: 1, textShadow: '1px 1px 2px #000' }}>🍽️ LE PROVENÇAL</div>
            <div style={{ color: '#ffddaa', fontSize: 6.5, fontStyle: 'italic' }}>Restaurant Traditionnel Provençal · Nice · Depuis 1987</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#FFD700', fontSize: 7, fontWeight: 700, background: 'rgba(0,0,0,.3)', padding: '1px 6px' }}>📞 04.93.12.34.56</div>
            <div style={{ color: '#ffddaa', fontSize: 5.5, marginTop: 1 }}>Ouvert 7j/7</div>
          </div>
        </div>
        {/* Nav dorée */}
        <div style={{ background: '#c8a020', padding: '0 8px', display: 'flex', gap: 0, borderBottom: '2px solid #7a0000' }}>
          {['Accueil','Notre Carte','Les Menus','Galerie Photos','Réservation','Avis Clients','Nous Trouver',"Livre d'Or"].map((l,i) => (
            <span key={l} style={{ color: i===0?'#fff':'#3a1500', fontSize: 7, fontWeight: i===0?700:400, background: i===0?'#7a0000':'transparent', padding: '3px 6px', borderRight: '1px solid #a88010', whiteSpace: 'nowrap', display: 'block' }}>{l}</span>
          ))}
        </div>
        {/* Welcome banner */}
        <div style={{ background: 'linear-gradient(180deg,#e8d090,#f5ede0)', padding: '8px 10px', textAlign: 'center', borderBottom: '3px double #c8a020' }}>
          <div style={{ background: '#fff8e0', border: '2px outset #c8a020', padding: '6px 14px', display: 'inline-block', marginBottom: 5 }}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#5a1a00', fontFamily: 'Georgia,serif', letterSpacing: 1 }}>BIENVENUE AU RESTAURANT LE PROVENÇAL</div>
            <div style={{ fontSize: 7, color: '#8a5a20', fontStyle: 'italic', marginTop: 2 }}>Cuisine provençale traditionnelle · Produits du terroir</div>
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
            <span style={{ background: '#7a0000', color: '#FFD700', fontSize: 7.5, padding: '4px 14px', border: '2px outset #aa2020', fontWeight: 700 }}>► RÉSERVER UNE TABLE ◄</span>
            <span style={{ background: '#c8a020', color: '#3a1500', fontSize: 7.5, padding: '4px 14px', border: '2px outset #e8c040', fontWeight: 700 }}>VOIR LA CARTE</span>
          </div>
        </div>
        {/* Carte en 3 colonnes Courier */}
        <div style={{ padding: '5px 10px', borderBottom: '1px solid #d0a060' }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: '#7a0000', fontFamily: 'Georgia,serif', textAlign: 'center', borderBottom: '2px solid #c8a020', marginBottom: 4 }}>— NOTRE CARTE —</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {[
              { t:'ENTRÉES', items:['Soupe de poisson .. 11€','Salade Niçoise ..... 12€','Carpaccio thon .... 13€','Tapenade maison .... 7€'] },
              { t:'PLATS',   items:['Bouillabaisse ...... 24€','Daube Provençale ... 19€','Poulet romarin ..... 17€','Ratatouille ........ 14€'] },
              { t:'DESSERTS',items:['Tarte Tatin ......... 8€','Crème brûlée ........ 7€','Profiteroles ........ 8€','Fromages ........... 10€'] },
            ].map(({ t, items }) => (
              <div key={t}>
                <div style={{ fontSize: 7, fontWeight: 700, color: '#7a0000', borderBottom: '1px solid #c8a020', marginBottom: 2, textAlign: 'center' }}>— {t} —</div>
                {items.map(l => <div key={l} style={{ fontSize: 6, fontFamily: 'Courier,monospace', color: '#333', lineHeight: 1.7 }}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
        {/* Formules */}
        <div style={{ padding: '4px 10px', borderBottom: '1px solid #d0a060', background: '#fff8e0' }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: '#7a0000', fontFamily: 'Georgia,serif', marginBottom: 3, textAlign: 'center', borderBottom: '2px double #c8a020' }}>NOS FORMULES</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
            {[['FORMULE MIDI','15 €','Entrée + Plat (Lun–Ven)'],['FORMULE SOIR','25 €','Entrée + Plat + Dessert'],['MENU PRESTIGE','38 €','Tout inclus + ½ vin']].map(([n,p,d])=>(
              <div key={n} style={{ border: '2px solid #c8a020', padding: '3px 5px', textAlign: 'center', background: '#fffbe8' }}>
                <div style={{ fontSize: 6.5, fontWeight: 700, color: '#5a1a00' }}>{n}</div>
                <div style={{ fontSize: 11, fontWeight: 900, color: '#7a0000', fontFamily: 'Georgia,serif' }}>{p}</div>
                <div style={{ fontSize: 5.5, color: '#8a6020', fontStyle: 'italic' }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div style={{ background: '#3a1500', color: '#c8a060', fontSize: 5.5, padding: '5px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <div><div style={{ color: '#FFD700', fontWeight: 700, marginBottom: 2, fontSize: 6 }}>LE PROVENÇAL</div><div style={{ lineHeight: 1.6 }}>12 Rue de la Liberté<br/>06000 Nice<br/>04.93.12.34.56</div></div>
          <div><div style={{ color: '#FFD700', fontWeight: 700, marginBottom: 2, fontSize: 6 }}>LIENS UTILES</div><div style={{ lineHeight: 1.6 }}>Notre Carte · Les Menus<br/>Réservation · Galerie<br/>Nous Trouver · Contact</div></div>
          <div><div style={{ color: '#FFD700', fontWeight: 700, marginBottom: 2, fontSize: 6 }}>INFOS PRATIQUES</div><div style={{ lineHeight: 1.6 }}>Parking à 50m<br/>Terrasse en été<br/>Groupes sur réservation</div></div>
        </div>
      </div>

      {/* ══ APRÈS — à droite, clipé depuis la gauche ══ */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${pos}%)`, background: '#faf8f5', overflow: 'hidden', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Chrome */}
        <div style={{ background: '#e5e3df', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 5, borderBottom: '1px solid #ccc' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff6057', display: 'inline-block' }}/><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}/><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', display: 'inline-block' }}/>
          <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: '1px 10px', fontSize: 7, color: '#888', marginLeft: 5, border: '1px solid #d0ccc8' }}>le-provencal-nice.fr</div>
        </div>
        {/* Nav clean */}
        <div style={{ background: 'rgba(250,248,245,.98)', borderBottom: '1px solid #ece8e2', padding: '0 14px', height: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #b8956a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#b8956a', fontWeight: 700 }}>P</div>
            <div style={{ fontSize: 8, fontWeight: 800, color: '#1a1208', letterSpacing: '.06em' }}>LE PROVENÇAL</div>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {['Carte','Le Chef','Galerie','Contact'].map(l => (
              <span key={l} style={{ color: '#7a6a58', fontSize: 6.5, fontWeight: 500 }}>{l}</span>
            ))}
          </div>
          <div style={{ background: '#1a1208', color: '#faf8f5', fontSize: 6.5, padding: '3px 10px', borderRadius: 50, fontWeight: 700 }}>Réserver</div>
        </div>

        {/* Hero image — Unsplash fine dining */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="Fine dining" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(26,18,8,.85) 0%, rgba(26,18,8,.3) 50%, transparent 100%)' }} />
          <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16 }}>
            <div style={{ fontSize: 5, color: '#e8c97a', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 6 }}>Nice · Cuisine Provençale</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 10 }}>La Provence,<br/>sublimée.</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ background: '#e8c97a', color: '#1a1208', fontSize: 7, padding: '5px 14px', borderRadius: 50, fontWeight: 800 }}>Réserver une table</div>
              <div style={{ border: '1px solid rgba(255,255,255,.45)', color: '#fff', fontSize: 7, padding: '5px 14px', borderRadius: 50, fontWeight: 500 }}>Voir la carte</div>
            </div>
          </div>
        </div>

        {/* 3 dish cards */}
        <div style={{ padding: '10px 12px', background: '#faf8f5' }}>
          <div style={{ fontSize: 5, color: '#b8956a', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 3 }}>Notre sélection</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#1a1208', marginBottom: 8 }}>Les incontournables</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
            {[
              { plat: 'Bouillabaisse', desc: 'Poissons de roche, rouille safranée', prix: '28€', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=75' },
              { plat: 'Tarte Tatin', desc: 'Pommes caramélisées, vanille Bourbon', prix: '10€', img: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400&q=75' },
              { plat: 'Burrata', desc: 'Tomates anciennes, basilic, huile AOP', prix: '14€', img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&q=75' },
            ].map(({ plat, desc, prix, img }) => (
              <div key={plat} style={{ background: '#fff', border: '1px solid #ece8e2', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.04)' }}>
                <div style={{ height: 60, overflow: 'hidden' }}>
                  <img src={img} alt={plat} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '6px 8px' }}>
                  <div style={{ fontSize: 7.5, fontWeight: 800, color: '#1a1208', marginBottom: 2 }}>{plat}</div>
                  <div style={{ fontSize: 5.5, color: '#8a7a68', lineHeight: 1.4, marginBottom: 3 }}>{desc}</div>
                  <div style={{ fontSize: 10, fontWeight: 900, color: '#b8956a' }}>{prix}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean footer */}
        <div style={{ background: '#1a1208', padding: '10px 16px', marginTop: 'auto' }}>
          <div style={{ fontSize: 7, fontWeight: 800, color: '#e8c97a', letterSpacing: '.06em', marginBottom: 3 }}>LE PROVENÇAL</div>
          <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7 }}>12 Rue de la Liberté, 06000 Nice · 04.93.12.34.56 · contact@le-provencal.fr</div>
        </div>
      </div>

      {/* Label AVANT — haut gauche */}
      <div style={{ position: 'absolute', top: 10, left: 12, background: 'rgba(245,237,224,.95)', color: '#5a1a00', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 50, pointerEvents: 'none', border: '1px solid rgba(200,160,32,.4)', backdropFilter: 'blur(6px)', letterSpacing: '.04em', zIndex: 8 }}>Avant</div>

      {/* Label APRÈS — haut droite */}
      <div style={{ position: 'absolute', top: 10, right: 12, background: '#1a1208', color: '#e8c97a', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 50, pointerEvents: 'none', letterSpacing: '.04em', zIndex: 8 }}>Après · Kyrio</div>

      {/* Ligne séparatrice verticale */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, transform: 'translateX(-50%)', width: 2.5, background: 'linear-gradient(180deg, #6366f1, #06b6d4)', pointerEvents: 'none', zIndex: 5, boxShadow: '0 0 14px rgba(99,102,241,.7)' }} />

      {/* Poignée centrale */}
      <div
        style={{ position: 'absolute', top: '50%', left: `${pos}%`, transform: 'translate(-50%,-50%)', width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'col-resize', boxShadow: '0 4px 28px rgba(99,102,241,.6)', zIndex: 10, border: '3px solid #fff' }}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
      >
        <KIcon name="arrowsH" size={18} color="#0a0a0a" strokeWidth={2.5} />
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════
   KYRIO VITRINE
══════════════════════════════════════════════════ */
export default function KyrioVitrine() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    document.title = 'Kyrio — Des sites qui claquent (et convertissent)';
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [demoClients, setDemoClients] = useState(null);

  useEffect(() => {
    fetch('/clients.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then(setDemoClients)
      .catch(() => setDemoClients({}));
  }, []);

  const portfolioList = useMemo(() => {
    if (!demoClients) return null;
    return Object.values(demoClients)
      .filter((c) => c.slug)
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }, [demoClients]);

  const PORTFOLIO_FALLBACK = [
    { nom: 'Arc en Ciel Propreté', secteur: 'Nettoyage professionnel', couleur: '#C5007F', slug: 'arc-en-ciel-proprete', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=75' },
    { nom: 'Mairie de Carentan-les-Marais', secteur: 'Collectivité territoriale', couleur: '#005A70', slug: 'carentan', img: '/carentan/hero-place-republique.webp' },
    { nom: 'Difamex', secteur: 'Aménagement extérieur', couleur: '#6B8E5A', slug: 'difamex', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=75' },
  ];

  const portfolioRows = portfolioList && portfolioList.length > 0 ? portfolioList : PORTFOLIO_FALLBACK;

  const NAV_LINKS = [['offres', 'Offres'], ['maintenance', 'Maintenance'], ['zone', 'Zone'], ['processus', 'Processus'], ['demos', 'Réalisations']];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const onChange = () => { if (mq.matches) setMenuOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const sync = () => setIsMobileNav(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div className={dark ? 'kr-root kr-dark' : 'kr-root'} style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: '#111', background: dark ? '#0d0d0d' : '#fff', overflowX: 'hidden', transition: 'background .35s, color .35s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        img { display: block; max-width: 100%; }
        ::selection { background: #6366f1; color: #fff; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

        /* ── Buttons ── */
        .kyrio-btn-dark { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #6366f1, #06b6d4); color: #fff; border: none; border-radius: 50px; padding: 14px 28px; font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer; transition: all .25s; letter-spacing: -.01em; }
        .kyrio-btn-dark:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 40px rgba(99,102,241,.45); }
        .kyrio-btn-ghost { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.3); border-radius: 50px; padding: 13px 28px; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: all .25s; }
        .kyrio-btn-ghost:hover { border-color: rgba(255,255,255,.7); background: rgba(255,255,255,.08); transform: translateY(-2px); }
        .kyrio-btn-outline { display: inline-flex; align-items: center; background: transparent; color: #111; border: 1.5px solid #ddd; border-radius: 50px; padding: 13px 28px; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: all .25s; }
        .kyrio-btn-outline:hover { border-color: #111; background: #f5f5f5; transform: translateY(-2px); }

        /* ── Cards ── */
        .card-hover { transition: all .28s cubic-bezier(.34,1.56,.64,1); }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 24px 64px rgba(0,0,0,.12); }

        /* ── Animations ── */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
        @keyframes float { 0%,100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-18px) rotate(2deg); } 66% { transform: translateY(-8px) rotate(-1deg); } }
        @keyframes floatB { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-24px) rotate(-3deg); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit3d-1 { 0% { transform: perspective(800px) rotateX(60deg) rotateZ(0deg); } 100% { transform: perspective(800px) rotateX(60deg) rotateZ(360deg); } }
        @keyframes orbit3d-2 { 0% { transform: perspective(800px) rotateX(55deg) rotateZ(0deg); } 100% { transform: perspective(800px) rotateX(55deg) rotateZ(-360deg); } }
        @keyframes orbit3d-3 { 0% { transform: perspective(800px) rotateX(70deg) rotateZ(0deg); } 100% { transform: perspective(800px) rotateX(70deg) rotateZ(360deg); } }
        @keyframes kyrio-dot-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-badge { 0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,.4); } 50% { box-shadow: 0 0 0 8px rgba(99,102,241,.0); } }
        .fade-up { animation: fadeUp .8s ease forwards; }
        .fade-up-2 { animation: fadeUp .8s .15s ease forwards; opacity: 0; }
        .fade-up-3 { animation: fadeUp .8s .3s ease forwards; opacity: 0; }
        .float { animation: float 7s ease-in-out infinite; }
        .float-b { animation: floatB 9s ease-in-out infinite; }
        .float-c { animation: float 11s 2s ease-in-out infinite; }
        .blob-shape { animation: orbit 20s linear infinite; }
        .badge-pulse { animation: pulse-badge 2.5s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 20s linear infinite; }

        /* ── Squiggle underline ── */
        .squiggle {
          text-decoration: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='6' viewBox='0 0 20 6'%3E%3Cpath d='M0 3 Q5 0 10 3 Q15 6 20 3' fill='none' stroke='%236366f1' stroke-width='2'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-position: 0 100%;
          background-size: 20px 7px;
          padding-bottom: 8px;
        }
        .squiggle-purple {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='6' viewBox='0 0 20 6'%3E%3Cpath d='M0 3 Q5 0 10 3 Q15 6 20 3' fill='none' stroke='%236366f1' stroke-width='2'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-position: 0 100%;
          background-size: 20px 7px;
          padding-bottom: 8px;
          text-decoration: none;
        }
        .squiggle-cyan {
          text-decoration: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='6' viewBox='0 0 20 6'%3E%3Cpath d='M0 3 Q5 0 10 3 Q15 6 20 3' fill='none' stroke='%2306b6d4' stroke-width='2'/%3E%3C/svg%3E");
          background-repeat: repeat-x;
          background-position: 0 100%;
          background-size: 20px 7px;
          padding-bottom: 8px;
        }

        /* ── Thème variables ── */
        .kr-root { --sb:#ffffff; --sb2:#f7f7f7; --sf:#0a0a0a; --sf2:#555; --sf3:#888; --sbdr:#e8e8e8; --scard:#f9f9f9; --scbdr:#e8e8e8; transition: all .35s; }
        .kr-root.kr-dark { --sb:#111111; --sb2:#0d0d0d; --sf:#ffffff; --sf2:rgba(255,255,255,.55); --sf3:rgba(255,255,255,.28); --sbdr:rgba(255,255,255,.07); --scard:#191919; --scbdr:rgba(255,255,255,.07); }
        .theme-toggle { display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); cursor:pointer; transition:all .2s; color:#fff; }
        .theme-toggle:hover { background:rgba(255,255,255,.15); border-color:rgba(255,255,255,.25); transform:rotate(15deg); }

        .nav-logo-wrap { display: flex; align-items: center; flex-shrink: 0; }
        .nav-hamburger { display: none; align-items: center; justify-content: center; width: 38px; height: 38px; padding: 0; border-radius: 10px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); cursor: pointer; color: #fff; flex-shrink: 0; transition: background .2s, border-color .2s; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .nav-hamburger:hover { background: rgba(255,255,255,.14); border-color: rgba(255,255,255,.22); }
        .nav-hamburger-icon { position: relative; width: 18px; height: 14px; display: block; flex-shrink: 0; }
        .nav-hamburger-line { position: absolute; left: 0; width: 18px; height: 2px; background: #fff; border-radius: 1px; transition: transform .22s ease, opacity .18s; }
        .nav-hamburger-line:nth-child(1) { top: 0; }
        .nav-hamburger-line:nth-child(2) { top: 6px; }
        .nav-hamburger-line:nth-child(3) { top: 12px; }
        .nav-hamburger.is-open .nav-hamburger-line:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-hamburger.is-open .nav-hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.is-open .nav-hamburger-line:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .mobile-nav-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.55); backdrop-filter: blur(6px); z-index: 198; animation: mobileNavFade .2s ease; }
        .mobile-nav-panel { position: fixed; top: 0; right: 0; bottom: 0; width: min(100vw - 48px, 320px); max-width: 100%; background: linear-gradient(180deg, #12121a 0%, #0a0a0f 100%); border-left: 1px solid rgba(255,255,255,.08); z-index: 199; padding: max(56px, env(safe-area-inset-top)) 18px 24px max(18px, env(safe-area-inset-right)); box-shadow: -16px 0 48px rgba(0,0,0,.45); animation: mobileNavSlide .28s cubic-bezier(.22,1,.36,1); overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .mobile-nav-label { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 16px; }
        .mobile-nav-link { display: block; width: 100%; text-align: left; background: transparent; border: none; color: rgba(255,255,255,.88); font-size: 17px; font-weight: 600; padding: 14px 4px; cursor: pointer; font-family: inherit; border-radius: 10px; transition: background .15s, color .15s; }
        .mobile-nav-link:hover, .mobile-nav-link:focus-visible { background: rgba(99,102,241,.12); color: #fff; outline: none; }
        .mobile-nav-link + .mobile-nav-link { border-top: 1px solid rgba(255,255,255,.06); }
        .mobile-nav-cta { display: block; width: 100%; margin-top: 18px; padding: 14px 18px; text-align: center; font-size: 15px; font-weight: 700; font-family: inherit; cursor: pointer; border: none; border-radius: 50px; color: #fff; background: linear-gradient(135deg, #6366f1, #06b6d4); box-shadow: 0 8px 28px rgba(99,102,241,.35); transition: transform .15s, box-shadow .15s; }
        .mobile-nav-cta:active { transform: scale(0.98); }

        @keyframes mobileNavSlide { from { transform: translateX(100%); opacity: .6; } to { transform: none; opacity: 1; } }
        @keyframes mobileNavFade { from { opacity: 0; } to { opacity: 1; } }
        @media (min-width: 769px) {
          .mobile-nav-root { display: none !important; }
        }


        @media (max-width: 768px) {
          .hero-title { font-size: clamp(32px, 9vw, 56px) !important; line-height: 1.08 !important; letter-spacing: -0.025em !important; }
          .hero-section { min-height: auto !important; padding: 76px max(16px, env(safe-area-inset-left)) 56px max(16px, env(safe-area-inset-right)) !important; }
          .hero-orbit { width: min(100vw, 420px) !important; height: min(100vw, 420px) !important; opacity: 0.75; }
          .hero-badge { font-size: 10px !important; letter-spacing: 0.05em !important; padding: 8px 14px !important; margin-bottom: 22px !important; max-width: 100%; line-height: 1.45 !important; }
          .hero-sub { font-size: 16px !important; line-height: 1.65 !important; margin-bottom: 28px !important; padding: 0 2px; }
          .hero-cta { flex-direction: column !important; width: 100%; max-width: 360px; margin-left: auto; margin-right: auto; gap: 10px !important; }
          .hero-cta button { width: 100%; justify-content: center; }
          .hero-stats { flex-direction: column !important; align-items: stretch !important; gap: 20px !important; margin-top: 44px !important; padding-top: 28px !important; }
          .hero-stats > div { padding: 0 8px !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,.07); padding-bottom: 20px !important; }
          .hero-stats > div:last-child { border-bottom: none !important; padding-bottom: 0 !important; }
          .hero-stats > div > div:last-child { font-size: 13px !important; line-height: 1.5 !important; max-width: 280px; margin-left: auto !important; margin-right: auto !important; }
          .section-pad { padding: 64px max(16px, env(safe-area-inset-left)) 64px max(16px, env(safe-area-inset-right)) !important; }
          .section-head { margin-bottom: 40px !important; }
          .section-head h2 { margin-bottom: 14px !important; }
          .section-head p { font-size: 16px !important; }
          .offers-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .offer-card { border-radius: 22px !important; padding: 28px 20px 24px !important; }
          .offer-card.popular { padding-top: 44px !important; }
          .two-modes-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .flex-two-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .maintenance-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .maint-card { padding: 24px 18px !important; border-radius: 18px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .steps-grid > div { border-right: none !important; border-bottom: 1px solid var(--sbdr) !important; padding: 28px 16px 32px !important; }
          .steps-grid > div:last-child { border-bottom: none !important; }
          .why-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .why-grid > div { border-right: none !important; padding: 28px 18px !important; border-bottom: 1px solid rgba(255,255,255,.06) !important; }
          .portfolio-grid { grid-template-columns: 1fr !important; gap: 14px !important; margin-top: 40px !important; }
          .avant-apres-comparator { height: min(52vh, 400px) !important; min-height: 260px; border-radius: 16px !important; }
          .contact-section { padding: 64px max(16px, env(safe-area-inset-left)) 64px max(16px, env(safe-area-inset-right)) !important; }
          .contact-form-inner { padding: 28px 18px !important; border-radius: 20px !important; }
          .contact-form-grid { grid-template-columns: 1fr !important; gap: 12px !important; margin-bottom: 12px !important; }
          .footer-kyrio { padding: 36px max(18px, env(safe-area-inset-left)) 40px max(18px, env(safe-area-inset-right)) !important; flex-direction: column !important; text-align: center; gap: 24px !important; align-items: center !important; }
          .footer-kyrio > div { flex-wrap: wrap; justify-content: center; gap: 16px 20px !important; }
          .nav-bar { padding: 0 max(10px, env(safe-area-inset-left)) 0 max(10px, env(safe-area-inset-right)) !important; height: 48px !important; }
          .nav-logo-wrap { transform: scale(0.82); transform-origin: left center; }
          .nav-actions { gap: 6px !important; }
          .nav-actions .theme-toggle { width: 34px !important; height: 34px !important; min-width: 34px !important; }
          .nav-bar .nav-actions > button.kyrio-btn-dark.nav-desktop-cta { display: none !important; visibility: hidden !important; width: 0 !important; height: 0 !important; padding: 0 !important; margin: 0 !important; overflow: hidden !important; position: absolute !important; clip: rect(0,0,0,0) !important; border: 0 !important; }
          .nav-hamburger { display: flex !important; width: 36px !important; height: 36px !important; border-radius: 9px !important; }
          .nav-hamburger .nav-hamburger-icon { width: 16px !important; height: 12px !important; }
          .nav-hamburger .nav-hamburger-line { width: 16px !important; }
          .nav-hamburger-line:nth-child(2) { top: 5px !important; }
          .nav-hamburger-line:nth-child(3) { top: 10px !important; }
          .nav-hamburger.is-open .nav-hamburger-line:nth-child(1) { transform: translateY(5px) rotate(45deg) !important; }
          .nav-hamburger.is-open .nav-hamburger-line:nth-child(3) { transform: translateY(-5px) rotate(-45deg) !important; }
          .hide-mobile { display: none !important; }
        }
        @media (max-width: 380px) {
          .hero-title { font-size: clamp(28px, 8.5vw, 44px) !important; }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav className="nav-bar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(10,10,10,.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,.06)' : 'none',
        padding: '0 40px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all .3s ease',
      }}>
        <div className="nav-logo-wrap">
          <KyrioMark size={42} dark />
        </div>
        <div className="hide-mobile" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {NAV_LINKS.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.65)', fontSize: 14, fontWeight: 500, padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: 8, transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}>
              {label}
            </button>
          ))}
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            type="button"
            className={'nav-hamburger' + (menuOpen ? ' is-open' : '')}
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-controls="kyrio-mobile-nav"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span className="nav-hamburger-icon" aria-hidden>
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
            </span>
          </button>
          <button className="theme-toggle" onClick={() => setDark(d => !d)} title={dark ? 'Mode clair' : 'Mode sombre'}>
            <KIcon name={dark ? 'sun' : 'moon'} size={16} color={dark ? '#6366f1' : 'rgba(255,255,255,.8)'} />
          </button>
          {!isMobileNav && (
          <button onClick={() => scrollTo('contact')} className="kyrio-btn-dark nav-cta nav-desktop-cta" style={{ padding: '10px 22px', fontSize: 13 }}>
            Demander un devis
          </button>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-nav-root" style={{ position: 'fixed', inset: 0, zIndex: 198, pointerEvents: 'auto' }}>
          <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div
            id="kyrio-mobile-nav"
            className="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            onClick={e => e.stopPropagation()}
          >
            <div className="mobile-nav-label">Navigation</div>
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} type="button" className="mobile-nav-link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
            <button type="button" className="mobile-nav-cta" onClick={() => scrollTo('contact')}>
              Demander un devis
            </button>
          </div>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section className="hero-section" style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>

        {/* Isometric boxes background */}
        <Boxes />

        {/* Slate-900 overlay masked by radial gradient (center transparent, edges opaque) → vignette */}
        <div
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            background: '#0f172a', zIndex: 20, pointerEvents: 'none',
            maskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 20%, black 80%)',
          }}
        />

        {/* Separator bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent)', zIndex: 25 }} />

        {/* ── Content — fade-up via framer-motion ── */}
        {/* pointerEvents:none sur le wrapper → laisse passer le hover vers les Boxes ; réactivé sur les CTAs/liens */}
        <div style={{ position: 'relative', zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.25)', borderRadius: 50, padding: '7px 18px', fontSize: 12, fontWeight: 700, color: '#6366f1', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 32 }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 6px #6366f1' }} />
            Kyrio — Agence web basée en Basse-Normandie · Caen · Site pro en 7 jours
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-title"
            style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 900, marginBottom: 28 }}
          >
            Votre site web.<br />
            <span
              className="squiggle"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Livré en 7 jours.
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.58em', fontWeight: 500, letterSpacing: '-0.01em' }}>
              Sans vous prendre la tête — trop.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-sub"
            style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,.45)', maxWidth: 580, lineHeight: 1.75, marginBottom: 48 }}
          >
            Des sites qui bossent pour vous — pas des vitrines qui accumulent la poussière numérique. On accompagne les artisans, commerçants et TPE du{' '}
            <strong style={{ color: 'rgba(255,255,255,.72)', fontWeight: 600 }}>Calvados, de la Manche et de l'Orne</strong>.{' '}
            SEO inclus, tarifs affichés, et on décroche encore le téléphone après la livraison.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-cta"
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', pointerEvents: 'auto' }}
          >
            <button onClick={() => scrollTo('offres')} className="kyrio-btn-dark" style={{ fontSize: 16, padding: '16px 36px' }}>
              Voir les offres
            </button>
            <Link to="/demos">
              <button className="kyrio-btn-ghost" style={{ fontSize: 16, padding: '16px 32px' }}>
                Voir les réalisations →
              </button>
            </Link>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <Link to="/demos/carentan" style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.38)', letterSpacing: '.02em', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.15)', paddingBottom: 2, transition: 'color .2s, border-color .2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderBottomColor = '#22d3ee'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,.38)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.15)'; }}>
                  Démo site mairie — Carentan-les-Marais →
                </span>
              </Link>
              <Link to="/demos/difamex" style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,.38)', letterSpacing: '.02em', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.15)', paddingBottom: 2, transition: 'color .2s, border-color .2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#84cc16'; e.currentTarget.style.borderBottomColor = '#84cc16'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,.38)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,.15)'; }}>
                  Démo distributeur — Difamex (Ifs & Valognes) →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hero-stats"
            style={{ display: 'flex', gap: 0, marginTop: 80, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 48, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[
              { val: '7j', label: 'Délai moyen (oui, on tient nos promesses)', icon: 'clock', color: '#6366f1' },
              { val: '100%', label: 'Clients qui reviennent (on ne les a pas ligotés)', icon: 'check', color: '#10b981' },
              { val: '3 ans', label: 'Dans les tranchées du web (café : illimité)', icon: 'lock', color: '#f59e0b' },
              { val: 'SEO', label: 'Toujours inclus. Même le lundi.', icon: 'search', color: '#ec4899' },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: '0 40px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
                  <KIcon name={s.icon} size={16} color={s.color} />
                  <span style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{s.val}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', fontWeight: 500, letterSpacing: '.02em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ OFFRES — One-shot & Flex réunis ══ */}
      <section id="offres" className="section-pad" style={{ padding: '160px 24px', background: 'var(--sb)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Les offres Kyrio</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Votre site pro.<br />À votre rythme.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                Deux façons d'accéder à un site pro. Un seul niveau de qualité — tarifs affichés, délais tenus, SEO toujours inclus.
              </p>
            </div>
          </Reveal>

          {/* ── Deux modes : One-shot vs Flex ── */}
          <Reveal delay={0.05}>
            <div className="two-modes-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
              {/* One-shot */}
              <div style={{ background: 'var(--scard)', border: '1px solid var(--scbdr)', borderRadius: 20, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(99,102,241,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <KIcon name="check" size={18} color="#6366f1" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '.08em' }}>Achat unique — propriétaire dès J+1</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--sf)', marginTop: 2 }}>990 € · 1 490 € · Sur devis</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--sf2)', lineHeight: 1.65, margin: 0 }}>
                  Vous payez une fois, le site vous appartient dès la livraison. Immobilisable comptablement, sans engagement mensuel. Idéal si vous avez la trésorerie disponible.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {OFFRES.map(o => (
                    <span key={o.nom} style={{ fontSize: 12, fontWeight: 700, color: o.color, background: o.color + '14', borderRadius: 50, padding: '4px 12px' }}>
                      {o.nom} — {o.prix !== null ? eur(o.prix) : 'Sur devis'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Kyrio Flex */}
              <div style={{ background: 'linear-gradient(135deg, #150d1f 0%, #0f0f1a 100%)', border: '1px solid rgba(236,72,153,.35)', borderRadius: 20, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 160, height: 160, background: 'radial-gradient(circle at top right, rgba(236,72,153,.14), transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(236,72,153,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <KIcon name="growth" size={18} color="#ec4899" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '.08em' }}>Kyrio Flex — mensuel · 0 € d'entrée</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginTop: 2 }}>79 € ou 119 €/mois × 12</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.65, margin: 0 }}>
                  Le <strong style={{ color: '#fff' }}>même site</strong>, financé sur 12 mois — et même moins cher qu'en one-shot. 0 € à la signature, maintenance incluse, propriétaire au terme. Charge mensuelle 100 % déductible.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {OFFRES_FLEX.map(f => (
                    <span key={f.nom} style={{ fontSize: 12, fontWeight: 700, color: f.color, background: f.color + '18', borderRadius: 50, padding: '4px 12px' }}>
                      {f.nom} — {f.prixMensuel} €/mois
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Tableau one-shot simplifié ── */}
          <Reveal delay={0.08}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sf3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 16 }}>
              Comparez les formules achat unique
            </div>
            <div className="offers-table-wrap" style={{ background: 'var(--scard)', border: '1px solid var(--scbdr)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.07)' }}>
              {/* HEADER colonnes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr' }}>
                <div style={{ padding: '22px 24px', background: 'var(--sb2)', borderBottom: '1px solid var(--sbdr)', borderRight: '1px solid var(--sbdr)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sf)', lineHeight: 1.4 }}>Tout inclus dans le prix affiché.</div>
                  <div style={{ fontSize: 12, color: 'var(--sf3)', marginTop: 4 }}>Aucune option cachée.</div>
                </div>
                {OFFRES.map((o) => (
                  <div key={o.nom} style={{ padding: '22px 16px 18px', textAlign: 'center', background: o.popular ? 'linear-gradient(180deg, #0d0d1e, #141430)' : 'var(--scard)', borderBottom: '1px solid var(--sbdr)', borderRight: '1px solid var(--sbdr)', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.color }} />
                    {o.popular && (
                      <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', borderRadius: 50, padding: '4px 12px', fontSize: 9, fontWeight: 800, letterSpacing: '.06em', whiteSpace: 'nowrap', textTransform: 'uppercase', boxShadow: '0 4px 14px rgba(99,102,241,.4)' }}>
                        ★ Le plus choisi
                      </div>
                    )}
                    <div style={{ fontSize: 10, fontWeight: 800, color: o.color, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 6, marginTop: o.popular ? 6 : 0 }}>{o.nom}</div>
                    <div style={{ fontSize: o.prix === null ? 18 : 26, fontWeight: 900, color: o.popular ? '#fff' : (o.prix === null ? o.color : 'var(--sf)'), letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {o.prix !== null ? eur(o.prix) : 'Sur devis'}
                    </div>
                    <div style={{ fontSize: 11, color: o.popular ? 'rgba(255,255,255,.45)' : 'var(--sf3)', marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <KIcon name="clock" size={10} color={o.popular ? 'rgba(255,255,255,.45)' : 'var(--sf3)'} />
                      {o.delai}
                    </div>
                  </div>
                ))}
              </div>

              {/* MATRICE */}
              {FEATURES_MATRIX.map((grp) => (
                <div key={grp.group}>
                  <div style={{ padding: '11px 24px', fontSize: 10, fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '.1em', background: 'var(--sb2)', borderTop: '1px solid var(--sbdr)', borderBottom: '1px solid var(--sbdr)' }}>{grp.group}</div>
                  {grp.items.map((row, idx) => (
                    <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', borderBottom: idx < grp.items.length - 1 ? '1px solid var(--sbdr)' : 'none', fontSize: 13, transition: 'background .12s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <div style={{ padding: '13px 24px', color: 'var(--sf)', fontWeight: 500, borderRight: '1px solid var(--sbdr)' }}>{row.label}</div>
                      {['essentiel', 'pro', 'signature'].map((key, i) => {
                        const val = row[key];
                        const offre = OFFRES[i];
                        return (
                          <div key={key} style={{ padding: '13px 12px', textAlign: 'center', borderRight: '1px solid var(--sbdr)', background: offre.popular ? 'rgba(99,102,241,.04)' : 'transparent' }}>
                            {val === true  ? <KIcon name="tick" size={16} color={offre.color} strokeWidth={3} />
                            : val === false ? <span style={{ color: 'var(--sf3)', opacity: .4, fontSize: 15, fontWeight: 300 }}>—</span>
                            : <span style={{ fontSize: 12, fontWeight: 700, color: offre.color, background: offre.color + '14', borderRadius: 50, padding: '2px 10px', display: 'inline-block' }}>{val}</span>}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}

              {/* FOOTER CTAs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', background: 'var(--sb2)', borderTop: '1px solid var(--sbdr)' }}>
                <div style={{ padding: '18px 24px', fontSize: 13, color: 'var(--sf2)', fontStyle: 'italic', borderRight: '1px solid var(--sbdr)', display: 'flex', alignItems: 'center' }}>
                  Devis gratuit en &lt; 24 h.
                </div>
                {OFFRES.map((o) => (
                  <div key={o.nom} style={{ padding: '16px 12px', borderRight: '1px solid var(--sbdr)' }}>
                    <button onClick={() => scrollTo('contact')} style={{ width: '100%', background: o.popular ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'transparent', color: o.popular ? '#fff' : 'var(--sf)', border: o.popular ? 'none' : `1.5px solid ${o.color}50`, borderRadius: 50, padding: '11px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s' }}
                      onMouseEnter={e => { if (!o.popular) { e.currentTarget.style.borderColor = o.color; e.currentTarget.style.background = o.color + '10'; }}}
                      onMouseLeave={e => { if (!o.popular) { e.currentTarget.style.borderColor = o.color + '50'; e.currentTarget.style.background = 'transparent'; }}}>
                      {o.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Kyrio Flex — 2 formules liées aux one-shots ── */}
          <Reveal delay={0.14}>
            <div style={{ marginTop: 20, background: 'linear-gradient(135deg, #0f0f1a 0%, #0a0a10 100%)', border: '1px solid rgba(236,72,153,.25)', borderRadius: 20, padding: '28px 32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 200, background: 'radial-gradient(circle at top right, rgba(236,72,153,.1), transparent 65%)', pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>Kyrio Flex · Mensuel · 0 € à l'entrée</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,.75)' }}>Le même site — financé sur 12 mois et même moins cher qu'en one-shot.</div>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', fontStyle: 'italic' }}>Charge mensuelle · 100 % déductible · Propriétaire après 1 an</div>
              </div>

              {/* Les 2 formules Flex */}
              <div className="flex-two-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {OFFRES_FLEX.map(f => (
                  <div key={f.nom} style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${f.color}30`, borderRadius: 14, padding: '20px 22px' }}>
                    {/* Prix + comparatif */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, color: f.color, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 2 }}>{f.nom}</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                          <span style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{f.prixMensuel} €</span>
                          <span style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', fontWeight: 500 }}>/mois × 12</span>
                        </div>
                      </div>
                      {/* Badge économie vs one-shot */}
                      <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginBottom: 2 }}>vs one-shot {eur(f.oneShotRef)}</div>
                        <div style={{ fontSize: 13, fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,.12)', borderRadius: 50, padding: '3px 10px', display: 'inline-block' }}>{f.economie} / an</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', lineHeight: 1.5, marginBottom: 14, fontStyle: 'italic' }}>{f.pitch}</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {f.features.map(ft => (
                        <li key={ft} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,.65)' }}>
                          <KIcon name="tick" size={12} color={f.color} strokeWidth={2.5} />{ft}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => scrollTo('contact')} style={{ width: '100%', background: f.color, color: '#fff', border: 'none', borderRadius: 50, padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', boxShadow: `0 6px 18px ${f.color}40` }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.filter = 'none'; }}>
                      Démarrer en {f.nom} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══ VS MARCHÉ — Comparatif ══ */}
      <section id="vs-marche" className="section-pad" style={{ padding: '140px 24px', background: 'var(--sb)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Le comparatif honnête</div>
              <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Kyrio vs le marché.<br />
                <span style={{ color: '#6366f1' }}>Même qualité, moitié prix.</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--sf2)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                Chiffres réels basés sur les devis moyens reçus par nos clients en 2025–2026. On ne triche pas, on compare.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ background: 'var(--scard)', border: '1px solid var(--scbdr)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,.06)' }}>
              {/* Header */}
              <div className="vs-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', background: 'var(--sb2)', borderBottom: '1px solid var(--sbdr)', fontSize: 12, fontWeight: 800, color: 'var(--sf3)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                <div style={{ padding: '18px 20px' }}>Prestation</div>
                <div style={{ padding: '18px 14px', textAlign: 'center' }}>Freelance</div>
                <div style={{ padding: '18px 14px', textAlign: 'center' }}>Agence</div>
                <div style={{ padding: '18px 14px', textAlign: 'center', background: 'rgba(99,102,241,.08)', color: '#6366f1' }}>Kyrio</div>
                <div style={{ padding: '18px 14px', textAlign: 'center' }}>Économie</div>
              </div>
              {VS_MARCHE.map((r, i) => (
                <div key={r.label} className="vs-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', borderBottom: i < VS_MARCHE.length - 1 ? '1px solid var(--sbdr)' : 'none', fontSize: 14, alignItems: 'center' }}>
                  <div style={{ padding: '18px 20px', fontWeight: 600, color: 'var(--sf)' }}>{r.label}</div>
                  <div style={{ padding: '18px 14px', textAlign: 'center', color: 'var(--sf2)' }}>{r.freelance}</div>
                  <div style={{ padding: '18px 14px', textAlign: 'center', color: 'var(--sf2)' }}>{r.agence}</div>
                  <div style={{ padding: '18px 14px', textAlign: 'center', background: 'rgba(99,102,241,.05)', fontWeight: 800, color: '#6366f1' }}>{r.kyrio}</div>
                  <div style={{ padding: '18px 14px', textAlign: 'center', fontWeight: 700, color: '#10b981', fontSize: 13 }}>{r.economie}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--sf3)', fontStyle: 'italic' }}>
              Sources : moyennes 2026 sur projets TPE/PME — Codeur.com, Malt, benchmarks agences Normandie.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MAINTENANCE ══ */}
      <section id="maintenance" className="section-pad" style={{ padding: '160px 24px', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div className="float" style={{ position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="float-b" style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(245,158,11,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>Après le lancement</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Les formules Kyrio.<br />
                <span className="squiggle-cyan" style={{ color: '#6366f1' }}>Votre site ne se gère pas tout seul.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,.4)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                Un site laissé sans entretien ralentit, vieillit et disparaît de Google. Kyrio s&apos;en charge — vous, vous gérez votre métier (et vos clients).
              </p>
            </div>
          </Reveal>

          <div className="maintenance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {MAINTENANCE.map((m, i) => (
              <Reveal key={m.nom} delay={i * 0.1}>
                <div className="card-hover maint-card" style={{ background: '#111', border: '1px solid rgba(255,255,255,.06)', borderRadius: 20, padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: m.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <KIcon name={m.icon} size={18} color={m.color} />
                      </div>
                      <span style={{ color: m.color, fontSize: 13, fontWeight: 700 }}>{m.nom}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {m.prix !== null ? (
                        <>
                          <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{eur(m.prix)}</span>
                          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', display: 'block' }}>/mois</span>
                        </>
                      ) : (
                        <span style={{ fontSize: 18, fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>Sur devis</span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.45)', lineHeight: 1.65, marginBottom: 24 }}>{m.desc}</p>
                  <ul style={{ listStyle: 'none', flex: 1, marginBottom: 28 }}>
                    {m.features.map(f => (
                      <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,.6)', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, marginTop: 1 }}><KIcon name="tick" size={13} color={m.color} strokeWidth={2.5} /></span>{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} style={{ background: 'transparent', color: m.color, border: `1.5px solid ${m.color}30`, borderRadius: 50, padding: '12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', width: '100%' }}
                    onMouseEnter={e => { e.target.style.background = m.color + '12'; e.target.style.borderColor = m.color + '60'; }}
                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = m.color + '30'; }}>
                    {m.prix !== null ? `Choisir ${m.nom}` : 'En parler →'}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ZONE D'INTERVENTION — Basse-Normandie ══ */}
      <section id="zone" className="section-pad" style={{ padding: '140px 24px', background: 'var(--sb2)', transition: 'background .35s', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Notre territoire</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Kyrio accompagne les<br /><span style={{ color: '#10b981' }}>entreprises de Basse-Normandie.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
                Basée en Basse-Normandie, Kyrio intervient en priorité dans le <strong>Calvados (14)</strong>, la <strong>Manche (50)</strong> et l'<strong>Orne (61)</strong>. On connaît le terrain, les habitudes, le tissu économique local — et on se déplace en vrai.
              </p>
            </div>
          </Reveal>
          <div className="zone-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
            {ZONE_BN.departements.map((d, i) => {
              const colors = ['#10b981', '#06b6d4', '#f59e0b'];
              const c = colors[i];
              return (
                <Reveal key={d.code} delay={i * 0.1}>
                  <div className="card-hover" style={{ background: 'var(--scard)', border: '1px solid var(--scbdr)', borderRadius: 20, padding: '32px 28px', height: '100%', transition: 'all .3s' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
                      <span style={{ fontSize: 42, fontWeight: 900, color: c, letterSpacing: '-0.03em', fontFamily: 'monospace' }}>{d.code}</span>
                      <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--sf)' }}>{d.nom}</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sf3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>Villes couvertes</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {d.villes.map(v => (
                        <span key={v} style={{ fontSize: 13, fontWeight: 600, color: 'var(--sf2)', background: c + '12', border: `1px solid ${c}28`, borderRadius: 50, padding: '5px 12px' }}>{v}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.3}>
            <div style={{ textAlign: 'center', background: 'var(--scard)', border: '1px dashed var(--scbdr)', borderRadius: 16, padding: '20px 28px', fontSize: 14, color: 'var(--sf2)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--sf)' }}>Déplacement offert</strong> dans tout le Calvados, la Manche et l'Orne — on vient vous rencontrer chez vous. Pour les autres régions : rendez-vous visio, même tarif, même qualité.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ PROCESSUS ══ */}
      <section id="processus" className="section-pad" style={{ padding: '160px 24px', background: 'var(--sb)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="section-head" style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Notre méthode</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                La méthode Kyrio<br />en 4 étapes.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 460, margin: '18px auto 0', lineHeight: 1.7 }}>La cinquième aurait été superflue — on n&apos;est pas une série Netflix.</p>
            </div>
          </Reveal>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {STEPS.map((s, i) => {
              const stepColorsDark  = ['#6366f1', '#ec4899', '#06b6d4', '#10b981'];
              const stepColorsLight = ['#6366f1', '#ec4899', '#06b6d4', '#10b981'];
              const c = dark ? stepColorsDark[i] : stepColorsLight[i];
              return (
              <Reveal key={s.num} delay={i * 0.1}>
                <div style={{ padding: '40px 28px', borderRight: i < 3 ? '1px solid var(--sbdr)' : 'none', position: 'relative', overflow: 'hidden' }}>
                  {/* Numéro géant en fond */}
                  <div style={{ position: 'absolute', top: -8, right: 10, fontSize: 96, fontWeight: 900, color: c, opacity: .22, lineHeight: 1, fontFamily: 'monospace', pointerEvents: 'none', userSelect: 'none' }}>{s.num}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: c, letterSpacing: '.1em', marginBottom: 20, fontFamily: 'monospace' }}>{s.num}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: c + '18', border: `1px solid ${c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = c + '30'; e.currentTarget.style.transform = 'rotate(-6deg) scale(1.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = c + '18'; e.currentTarget.style.transform = 'none'; }}>
                    <KIcon name={s.icon} size={22} color={c} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--sf)', marginBottom: 10, letterSpacing: '-0.01em' }}>{s.titre}</h3>
                  <p style={{ fontSize: 13.5, color: 'var(--sf2)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Reveal>
            );})}
          </div>
        </div>
      </section>

      {/* ══ POURQUOI ══ */}
      <section className="section-pad" style={{ padding: '160px 24px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="section-head" style={{ marginBottom: 72 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>Pourquoi Kyrio</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 600 }}>
                Pourquoi Kyrio<br />et pas l&apos;autre agence ?
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,.35)', maxWidth: 440, marginTop: 16, lineHeight: 1.7 }}>Bonne question. Voici les vraies réponses — sans slides, sans langue de bois, sans violon.</p>
            </div>
          </Reveal>
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {WHY.map((w, i) => {
              const whyColors = ['#6366f1','#ec4899','#06b6d4','#10b981','#f59e0b','#a78bfa'];
              const wc = whyColors[i];
              return (
              <Reveal key={w.titre} delay={(i % 3) * 0.1}>
                <div style={{ padding: '36px 32px', borderBottom: i < 3 ? '1px solid rgba(255,255,255,.05)' : 'none', borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,.05)' : 'none' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: wc + '15', border: `1px solid ${wc}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'transform .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'rotate(-8deg) scale(1.12)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <KIcon name={w.icon} size={20} color={wc} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.01em' }}>{w.titre}</h3>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.4)', lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              </Reveal>
            );})}
          </div>
        </div>
      </section>

      {/* ══ RÉALISATIONS ══ */}
      <section id="demos" className="section-pad" style={{ padding: '160px 24px', background: 'var(--sb2)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Portfolio</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Des sites vrais,<br />pour des clients réels.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
              Pas des mockups Dribbble jamais livrés. De vraies réalisations — avec de vrais bugs écrasés avant la mise en ligne (on déconne, il n&apos;y en a presque pas).
            </p>
            <Link to="/demos">
              <button className="kyrio-btn-dark" style={{ fontSize: 16, padding: '16px 36px' }}>
                Voir toutes les réalisations →
              </button>
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 64 }}>
              {portfolioRows.map((raw, i) => {
                const nom = raw.name ?? raw.nom;
                const secteur = raw.sector ?? raw.secteur;
                const couleur = raw.primaryColor ?? raw.couleur ?? '#6366f1';
                const slug = raw.slug;
                const img = raw.heroImage ?? raw.img ?? null;
                const key = slug ?? `pf-${i}`;
                return (
                <div key={key} className="card-hover" style={{ borderRadius: 20, overflow: 'hidden', background: 'var(--scard)', border: '1px solid var(--scbdr)', opacity: slug ? 1 : 0.35 }}>
                  {/* Thumbnail */}
                  <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg, ${couleur}22, ${couleur}44)` }}>
                    {img ? (
                      <img
                        src={img}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 56, height: 56, background: couleur, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', fontWeight: 800 }}>
                          {nom[0]}
                        </div>
                      </div>
                    )}
                    {/* Badge secteur */}
                    {slug && (
                      <div style={{
                        position: 'absolute', top: 10, left: 10,
                        background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)',
                        borderRadius: 5, padding: '3px 9px',
                        fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.8)', letterSpacing: '.05em', textTransform: 'uppercase',
                      }}>
                        {secteur}
                      </div>
                    )}
                    {/* Dot live */}
                    {slug && (
                      <span style={{
                        position: 'absolute', top: 12, right: 12,
                        width: 8, height: 8, borderRadius: '50%',
                        background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,.7)',
                      }} />
                    )}
                  </div>
                  <div style={{ padding: '18px 22px' }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--sf)', marginBottom: 4 }}>{nom}</div>
                    {!slug && <div style={{ fontSize: 12, color: 'var(--sf3)' }}>{secteur}</div>}
                    {slug && (
                      <Link to={`/demos/${slug}`} style={{ textDecoration: 'none' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: couleur, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          Voir le site
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              );})}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA CONTACT ══ */}
      <section id="contact" className="section-pad contact-section" style={{ padding: '160px 24px', background: '#0a0a0a', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(99,102,241,.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="float" style={{ position: 'absolute', top: '15%', left: '5%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="float-b" style={{ position: 'absolute', bottom: '20%', right: '5%', width: 180, height: 180, background: 'radial-gradient(circle, rgba(236,72,153,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 20 }}>On se lance avec Kyrio ?</div>
            <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 24 }}>
              Votre prochain client<br />vous cherche en ce moment.<br />
              <span className="squiggle" style={{ color: '#6366f1', display: 'inline-block' }}>Kyrio vous rend</span><br />
              <span className="squiggle" style={{ color: '#6366f1', display: 'inline-block' }}>trouvable.</span>
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,.45)', marginBottom: 52, lineHeight: 1.65 }}>
              30 min d&apos;échange, devis sous 24 h, site en ligne en 7 jours.<br />
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,.25)' }}>On n&apos;est pas des commerciaux en costume trois-pièces — juste une équipe qui aime le travail bien fait (et les croissants).</span>
            </p>

            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer-kyrio" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,.06)', padding: '48px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <KyrioMark size={24} dark opacity={0.6} />
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', marginTop: 8, letterSpacing: '.04em' }}>
            Agence web · Basse-Normandie<br />
            Calvados (14) · Manche (50) · Orne (61)
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[['offres', 'Offres'], ['flex', 'Flex'], ['zone', 'Zone'], ['maintenance', 'Maintenance']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.3)'}>
              {label}
            </button>
          ))}
          <Link to="/demos">
            <button style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.3)'}>
              Réalisations
            </button>
          </Link>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.2)' }}>© {new Date().getFullYear()} Kyrio — Fait avec soin, un peu d&apos;audace, et trop de café</div>
      </footer>
    </div>
  );
}

/* ── Formulaire de contact ── */
function ContactForm() {
  const [form, setForm]       = useState({ nom: '', email: '', telephone: '', message: '', offre: '' });
  const [status, setStatus]   = useState('idle'); // idle | sending | success | error

  /* ── Remplace ces 3 valeurs par tes clés EmailJS ── */
  const EJS_SERVICE_ID  = 'service_gikie3t';
  const EJS_TEMPLATE_ID = 'template_42ijvzd';
  const EJS_PUBLIC_KEY  = 'i97kj4yhNAhjzuALR';

  const inp = { width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'border-color .2s' };
  const lbl = { display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 };
  const focus = e => e.target.style.borderColor = 'rgba(99,102,241,.5)';
  const blur  = e => e.target.style.borderColor = 'rgba(255,255,255,.1)';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EJS_SERVICE_ID,
        EJS_TEMPLATE_ID,
        {
          from_name:  form.nom,
          from_email: form.email,
          telephone:  form.telephone || 'Non renseigné',
          offre:      form.offre     || 'Non précisée',
          message:    form.message,
          date:       new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }),
          reply_to:   form.email,
        },
        EJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div style={{ background: 'rgba(99,102,241,.05)', border: '1px solid rgba(99,102,241,.2)', borderRadius: 20, padding: '56px 40px', textAlign: 'center' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(99,102,241,.1)', border: '1.5px solid rgba(99,102,241,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <KIcon name="check" size={30} color="#6366f1" strokeWidth={2.5} />
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-.01em' }}>Demande envoyée ✦</h3>
      <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 15, lineHeight: 1.7, maxWidth: 360, margin: '0 auto 28px' }}>
        Votre message est bien arrivé. Kyrio vous répond sous <strong style={{ color: '#6366f1' }}>24 h</strong> — souvent avant, parce qu'on est comme ça.
      </p>
      <button onClick={() => { setStatus('idle'); setForm({ nom:'', email:'', telephone:'', message:'', offre:'' }); }}
        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.4)', borderRadius: 50, padding: '10px 28px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, transition: 'all .2s' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'; e.currentTarget.style.color = 'rgba(255,255,255,.7)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; e.currentTarget.style.color = 'rgba(255,255,255,.4)'; }}>
        Nouvelle demande
      </button>
    </div>
  );

  if (status === 'error') return (
    <div style={{ background: 'rgba(239,68,68,.05)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 20, padding: '48px 40px', textAlign: 'center' }}>
      <p style={{ color: '#f87171', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Oups — le message n'est pas parti</p>
      <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, marginBottom: 24 }}>Souvent c'est un souci de config EmailJS. Sinon, écrivez-nous directement : <a href="mailto:contact@kyrio.fr" style={{ color: '#6366f1' }}>contact@kyrio.fr</a> — on lit tout, promis.</p>
      <button onClick={() => setStatus('idle')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.4)', borderRadius: 50, padding: '10px 28px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>Réessayer</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="contact-form-inner" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 24, padding: '40px 36px', textAlign: 'left' }}>
      <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={lbl}>Nom *</label>
          <input required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} placeholder="Jean Dupont" style={inp} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jean@exemple.fr" style={inp} onFocus={focus} onBlur={blur} />
        </div>
      </div>
      <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={lbl}>Téléphone</label>
          <input value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} placeholder="06 12 34 56 78" style={inp} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Offre souhaitée</label>
          <select value={form.offre} onChange={e => setForm(f => ({ ...f, offre: e.target.value }))} style={{ ...inp, color: form.offre ? '#fff' : 'rgba(255,255,255,.35)', cursor: 'pointer', background: '#1a1a1a' }}>
            <option value="">— Choisir —</option>
            <option value="Kyrio Flex (89 €/mois, 0 € d'entrée)">Kyrio Flex — 89 €/mois (0 € d'entrée) ⭐</option>
            <option value="Essentiel (990 €)">Essentiel — 990 €</option>
            <option value="Pro (1 490 €)">Pro — 1 490 €</option>
            <option value="Signature (2 490 €)">Signature — 2 490 €</option>
            <option value="Pack Lancement (490 €)">Pack Lancement — 490 €</option>
            <option value="Maintenance mensuelle">Maintenance mensuelle</option>
            <option value="Autre / Je ne sais pas encore">Autre / Je ne sais pas encore</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={lbl}>Parlez-nous de votre projet *</label>
        <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Votre super activité, ce que vous vendez, votre site actuel (même s'il fait un peu peur), vos objectifs…" rows={4} style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
      </div>
      <button type="submit" disabled={status === 'sending'} className="kyrio-btn-dark"
        style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 10, opacity: status === 'sending' ? .7 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}>
        {status === 'sending' ? (
          <>
            <span style={{ width: 18, height: 18, border: '2px solid rgba(0,0,0,.3)', borderTopColor: '#0a0a0a', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
            Envoi en cours…
          </>
        ) : (
          <>
            <KIcon name="brief" size={18} color="#fff" />
            Envoyer ma demande — réponse sous 24 h
          </>
        )}
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.18)', marginTop: 14 }}>
        Pas de harcèlement téléphonique · Réponse humaine garantie sous 24 h
      </p>
    </form>
  );
}
