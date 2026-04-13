import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
const OFFRES = [
  {
    nom: 'Essentiel',
    prix: 990,
    delai: '7 jours',
    desc: "Vous n'existez pas sur Google ? Kyrio règle ça — proprement, en une semaine.",
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
    cta: "C'est parti",
    popular: false,
  },
  {
    nom: 'Pro',
    prix: 1490,
    delai: '14 jours',
    desc: "L'offre Kyrio que 7 clients sur 10 choisissent. Le huitième hésite encore — on l'attend.",
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
    prix: 2490,
    delai: '21 jours',
    desc: "Le projet Kyrio complet. Pour ceux qui veulent un site qui rapporte autant qu'un bon commercial.",
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
    cta: 'On en parle',
    popular: false,
  },
];

const MAINTENANCE = [
  { nom: 'Kyrio Gardien',   prix: 49,  desc: "Kyrio surveille votre site 24h/24. Les hackers ne font pas de pauses — nous non plus.",                                                           features: ['Mises à jour CMS & plugins', 'Sauvegardes quotidiennes', 'Surveillance sécurité 24h/24', 'Certificat SSL maintenu'],                                color: '#10b981', icon: 'guardian' },
  { nom: 'Kyrio Croissance', prix: 89,  desc: "Un site qui stagne recule. Kyrio s'occupe de l'entretien et du SEO — Google remarque la différence.",                                           features: ['Tout le Gardien inclus', '2h de modifications/mois', 'Rapport SEO mensuel', 'Fiche Google Business suivi'],                                       color: '#06b6d4', icon: 'growth'   },
  { nom: 'Kyrio Partenaire', prix: 179, desc: "Votre département digital externalisé. L'équipe Kyrio à plein temps — sans les charges sociales.",                                              features: ['Tout Croissance inclus', '4h création contenu/mois', 'Gestion Google Ads', 'Réunion mensuelle bilan'],                                            color: '#f59e0b', icon: 'partner'  },
];

const STEPS = [
  { num: '01', titre: 'Échange & brief', desc: "Un appel de 30 min. Kyrio pose les vraies questions — pas celles d'un formulaire conçu pour décourager.", icon: 'brief' },
  { num: '02', titre: 'Devis Kyrio sous 24h', desc: "Votre devis détaillé dès le lendemain. Complet, sans ligne en petit. On démarre dès que vous validez.", icon: 'devis' },
  { num: '03', titre: 'Création & retours', desc: "Première version en 72h. Deux rounds de retours inclus — pas dix. C'est suffisant quand le travail est bien fait.", icon: 'creation' },
  { num: '04', titre: 'Mise en ligne Kyrio', desc: "Lancement soigné, formation rapide. Kyrio ne disparaît pas après la livraison — contrairement à certains.", icon: 'launch' },
];

const WHY = [
  { titre: 'Kyrio livre vite. Vraiment.', desc: "7 à 21 jours. Le temps que d'autres agences finalisent leur brief, votre site Kyrio est déjà en ligne.", icon: 'speed' },
  { titre: 'Un site Kyrio qui rapporte', desc: "Beau et rentable. Étonnamment rare dans le milieu — chez Kyrio, les deux vont de pair.", icon: 'target' },
  { titre: 'SEO Kyrio dès le jour 1', desc: "Google est votre meilleur commercial. Kyrio l'active dès le départ — pas vendu en option six mois plus tard.", icon: 'seo' },
  { titre: 'Chez Kyrio : un humain, pas un ticket', desc: "Vous avez le numéro direct. Pas de chatbot, pas de délai de 5 jours. Kyrio répond.", icon: 'person' },
  { titre: 'Les tarifs Kyrio, affichés', desc: "Ce que vous signez avec Kyrio, c'est ce que vous payez. Rien de plus. Jamais.", icon: 'shield' },
  { titre: 'Les résultats Kyrio, mesurés', desc: "Tableau de bord, Analytics, rapport mensuel. Kyrio vous montre ce que ça rapporte — même quand c'est à améliorer.", icon: 'chart' },
];

const PACK_LANCEMENT = {
  prix: 490,
  features: [
    'Logo professionnel (3 propositions)',
    'Fiche Google Business complète & optimisée',
    'Kit réseaux sociaux (bannières, visuels profil)',
    "Photos produits/services retouchées (jusqu'à 10)",
  ],
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

  useEffect(() => {
    document.title = 'Kyrio — Création de sites web professionnels';
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

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

        @media (max-width: 768px) {
          .hero-title { font-size: clamp(36px, 10vw, 72px) !important; }
          .offers-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .maintenance-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,10,10,.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,.06)' : 'none',
        padding: '0 40px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all .3s ease',
      }}>
        <KyrioMark size={42} dark />
        <div className="hide-mobile" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[['offres', 'Offres'], ['maintenance', 'Maintenance'], ['processus', 'Processus'], ['avant-apres', 'Avant/Après'], ['demos', 'Réalisations']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.65)', fontSize: 14, fontWeight: 500, padding: '8px 14px', cursor: 'pointer', fontFamily: 'inherit', borderRadius: 8, transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="theme-toggle" onClick={() => setDark(d => !d)} title={dark ? 'Mode clair' : 'Mode sombre'}>
            <KIcon name={dark ? 'sun' : 'moon'} size={16} color={dark ? '#6366f1' : 'rgba(255,255,255,.8)'} />
          </button>
          <button onClick={() => scrollTo('contact')} className="kyrio-btn-dark" style={{ padding: '10px 22px', fontSize: 13 }}>
            Demander un devis
          </button>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0a0a0a 0%, #111 50%, #0d0d1a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* 3D Orbital rings */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(99,102,241,.2)', animation: 'orbit3d-1 20s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '10%', borderRadius: '50%', border: '1px solid rgba(6,182,212,.15)', animation: 'orbit3d-2 28s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '25%', borderRadius: '50%', border: '1px solid rgba(236,72,153,.12)', animation: 'orbit3d-3 15s linear infinite' }} />
          {/* Orbiting dots */}
          <div style={{ position: 'absolute', top: 0, left: '50%', width: 8, height: 8, borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 12px rgba(99,102,241,.6)', animation: 'orbit3d-1 20s linear infinite', transformOrigin: '0 300px' }} />
          <div style={{ position: 'absolute', top: '10%', left: '50%', width: 6, height: 6, borderRadius: '50%', background: '#06b6d4', boxShadow: '0 0 10px rgba(6,182,212,.5)', animation: 'orbit3d-2 28s linear infinite', transformOrigin: '0 270px' }} />
          <div style={{ position: 'absolute', top: '25%', left: '50%', width: 5, height: 5, borderRadius: '50%', background: '#ec4899', boxShadow: '0 0 8px rgba(236,72,153,.4)', animation: 'orbit3d-3 15s linear infinite', transformOrigin: '0 225px' }} />
        </div>
        {/* Grille de points décorative */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none', opacity: .5 }} />
        {/* Cercle décoratif rotatif */}
        <div className="spin-slow" style={{ position: 'absolute', top: '10%', right: '12%', width: 80, height: 80, borderRadius: '50%', border: '1px dashed rgba(99,102,241,.2)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.06), transparent)' }} />

        <div className="fade-up badge-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.3)', borderRadius: 50, padding: '7px 18px', fontSize: 12, fontWeight: 700, color: '#6366f1', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1', display: 'inline-block', boxShadow: '0 0 6px #6366f1' }} />
          Kyrio — Votre site pro, livré en 7 jours
        </div>

        <h1 className="fade-up-2 hero-title" style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 900, marginBottom: 28 }}>
          Votre site web.<br />
          <span className="squiggle" style={{ color: '#6366f1' }}>Livré en 7 jours.</span><br />
          Sans vous prendre la tête.
        </h1>

        <p className="fade-up-3" style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,.5)', maxWidth: 580, lineHeight: 1.7, marginBottom: 48 }}>
          Kyrio crée des sites qui travaillent pour vous — pas des vitrines qui prennent la poussière. SEO intégré, résultats mesurables, et on répond encore au téléphone après la livraison.
        </p>

        <div className="fade-up-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => scrollTo('offres')} className="kyrio-btn-dark" style={{ fontSize: 16, padding: '16px 36px' }}>
            Voir les offres
          </button>
          <Link to="/demos">
            <button className="kyrio-btn-ghost" style={{ fontSize: 16, padding: '16px 32px' }}>
              Voir les réalisations →
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 0, marginTop: 80, borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { val: '7j', label: 'Délai moyen (oui, vraiment)', icon: 'clock', color: '#6366f1' },
            { val: '100%', label: 'Clients qui reviennent nous voir', icon: 'check', color: '#10b981' },
            { val: '3 ans', label: "Dans les tranchées du digital", icon: 'lock', color: '#f59e0b' },
            { val: 'SEO', label: "Offert. Toujours. Sans négocier.", icon: 'search', color: '#ec4899' },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: '0 40px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
                <KIcon name={s.icon} size={16} color={s.color} />
                <span style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{s.val}</span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', fontWeight: 500, letterSpacing: '.02em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ OFFRES ══ */}
      <section id="offres" style={{ padding: '160px 24px', background: 'var(--sb)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Les offres Kyrio</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Pas de surprise.<br />Juste le bon forfait.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
                Chez Kyrio, les tarifs sont affichés. Vous choisissez votre niveau d&apos;ambition — on s&apos;occupe du reste.
              </p>
            </div>
          </Reveal>

          <div className="offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'start' }}>
            {OFFRES.map((o, i) => (
              <Reveal key={o.nom} delay={i * 0.1}>
                <div className="card-hover" style={{ position: 'relative', background: o.popular ? '#0a0a0a' : 'var(--scard)', border: o.popular ? 'none' : '1px solid var(--scbdr)', borderRadius: 28, padding: o.popular ? '52px 32px 36px' : '36px 32px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {o.popular && (
                    <div style={{ position: 'absolute', top: 16, left: 0, right: 0, textAlign: 'center', zIndex: 2, pointerEvents: 'none' }}>
                      <span style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', borderRadius: 50, padding: '6px 18px', fontSize: 12, fontWeight: 800, letterSpacing: '.04em', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <KIcon name="star" size={12} color="#fff" strokeWidth={2} /> Le plus choisi
                      </span>
                    </div>
                  )}
                  {/* Bande colorée en haut */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${o.color}, ${o.color}88)`, borderRadius: '28px 28px 0 0' }} />
                  <div style={{ marginBottom: 28 }}>
                    <span style={{ display: 'inline-block', background: o.color + (o.popular ? '22' : '18'), color: o.color, borderRadius: 8, padding: '4px 12px', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>{o.nom}</span>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 900, color: o.popular ? '#fff' : 'var(--sf)', letterSpacing: '-0.03em' }}>{eur(o.prix)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: o.popular ? 'rgba(255,255,255,.4)' : '#999', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <KIcon name="clock" size={13} color={o.popular ? 'rgba(255,255,255,.4)' : '#aaa'} />
                      Livré en {o.delai}
                    </div>
                    <p style={{ fontSize: 14, color: o.popular ? 'rgba(255,255,255,.65)' : '#666', lineHeight: 1.65 }}>{o.desc}</p>
                  </div>
                  <ul style={{ listStyle: 'none', flex: 1, marginBottom: 32 }}>
                    {o.features.map(f => (
                        <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, color: o.popular ? 'rgba(255,255,255,.75)' : 'var(--sf2)', padding: '8px 0', borderBottom: `1px solid ${o.popular ? 'rgba(255,255,255,.06)' : 'var(--sbdr)'}` }}>
                        <span style={{ flexShrink: 0, marginTop: 2 }}><KIcon name="tick" size={14} color={o.color} strokeWidth={2.5} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo('contact')} style={{ background: o.popular ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'transparent', color: o.popular ? '#fff' : '#111', border: o.popular ? 'none' : '1.5px solid #ddd', borderRadius: 50, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s', width: '100%' }}
                    onMouseEnter={e => { if (!o.popular) { e.target.style.borderColor = '#111'; e.target.style.background = '#f5f5f5'; } }}
                    onMouseLeave={e => { if (!o.popular) { e.target.style.borderColor = '#ddd'; e.target.style.background = 'transparent'; } }}>
                    {o.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pack Lancement */}
          <Reveal delay={0.2}>
            <div style={{ marginTop: 40, background: 'linear-gradient(135deg, #0a0a0a, #141428)', borderRadius: 24, padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Le Pack Kyrio</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Pack Lancement — {eur(PACK_LANCEMENT.prix)}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', marginBottom: 0 }}>Tout ce qu&apos;il faut pour que Kyrio vous lance fort — dès le premier jour.</p>
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { f: 'Logo professionnel (3 propositions)', icon: 'star', color: '#6366f1' },
                  { f: 'Fiche Google Business complète & optimisée', icon: 'search', color: '#10b981' },
                  { f: 'Kit réseaux sociaux (bannières, visuels profil)', icon: 'globe', color: '#ec4899' },
                  { f: "Photos produits/services retouchées (jusqu'à 10)", icon: 'camera', color: '#f59e0b' },
                ].map(({ f, icon, color }) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,.65)' }}>
                    <KIcon name={icon} size={14} color={color} />
                    {f}
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} className="kyrio-btn-dark" style={{ flexShrink: 0 }}>
                Ajouter au projet
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MAINTENANCE ══ */}
      <section id="maintenance" style={{ padding: '160px 24px', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <div className="float" style={{ position: 'absolute', top: '10%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(99,102,241,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="float-b" style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(245,158,11,.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>Après le lancement</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Les formules Kyrio.<br />
                <span className="squiggle-cyan" style={{ color: '#6366f1' }}>Votre site ne se gère pas tout seul.</span>
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,.4)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                Un site laissé sans entretien ralentit, vieillit et disparaît de Google. Kyrio s&apos;en charge — vous, vous gérez votre métier.
              </p>
            </div>
          </Reveal>

          <div className="maintenance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {MAINTENANCE.map((m, i) => (
              <Reveal key={m.nom} delay={i * 0.1}>
                <div className="card-hover" style={{ background: '#111', border: '1px solid rgba(255,255,255,.06)', borderRadius: 20, padding: '32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: m.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <KIcon name={m.icon} size={18} color={m.color} />
                      </div>
                      <span style={{ color: m.color, fontSize: 13, fontWeight: 700 }}>{m.nom}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{eur(m.prix)}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', display: 'block' }}>/mois</span>
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
                    Choisir {m.nom}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESSUS ══ */}
      <section id="processus" style={{ padding: '160px 24px', background: 'var(--sb)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Notre méthode</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                La méthode Kyrio<br />en 4 étapes.
              </h2>
              <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 460, margin: '18px auto 0', lineHeight: 1.7 }}>La cinquième aurait été superflue.</p>
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

      {/* ══ AVANT / APRÈS ══ */}
      <section id="avant-apres" style={{ padding: '160px 24px', background: 'var(--sb2)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Transformation</div>
              <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Glissez. Vous allez voir.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--sf2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                Le restaurant de droite a investi dans son site. Celui de gauche... pas encore. La différence se voit. Et Google aussi la voit.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <AvantApres />
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 48, marginTop: 48, flexWrap: 'wrap' }}>
              {[
                { v: '+340%', l: 'de visibilité Google en moyenne', color: '#6366f1' },
                { v: '×2.8', l: 'de demandes de devis', color: '#06b6d4' },
                { v: '7j', l: 'pour être en ligne', color: '#10b981' },
              ].map(({ v, l, color }) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: color, letterSpacing: '-0.03em', marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: 13, color: 'var(--sf2)', fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ POURQUOI ══ */}
      <section style={{ padding: '160px 24px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: 72 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', marginBottom: 14 }}>Pourquoi Kyrio</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: 600 }}>
                Pourquoi Kyrio<br />et pas l&apos;autre agence ?
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,.35)', maxWidth: 440, marginTop: 16, lineHeight: 1.7 }}>Bonne question. Voici les vraies réponses de Kyrio — sans slides ni langue de bois.</p>
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
      <section id="demos" style={{ padding: '160px 24px', background: 'var(--sb2)', transition: 'background .35s' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--sf3)', marginBottom: 14 }}>Portfolio</div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: 'var(--sf)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Des sites vrais,<br />pour des clients réels.
            </h2>
            <p style={{ fontSize: 17, color: 'var(--sf2)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
              Pas des mockups Dribbble jamais livrés. De vraies réalisations, pour de vraies entreprises, avec de vrais résultats.
            </p>
            <Link to="/demos">
              <button className="kyrio-btn-dark" style={{ fontSize: 16, padding: '16px 36px' }}>
                Voir toutes les réalisations →
              </button>
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 64 }}>
              {[
                {
                  nom: 'Arc en Ciel Propreté',
                  secteur: 'Nettoyage professionnel',
                  couleur: '#C5007F',
                  slug: 'arc-en-ciel-proprete',
                  img: '/images/arcenciel/hero.png',
                },
                {
                  nom: 'Design Contemporain',
                  secteur: 'Mobilier haut de gamme',
                  couleur: '#b8915a',
                  slug: 'design-contemporain',
                  img: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=600&q=75',
                },
                {
                  nom: 'À venir',
                  secteur: 'Votre secteur',
                  couleur: '#6366f1',
                  slug: null,
                  img: null,
                },
              ].map((r, i) => (
                <div key={i} className="card-hover" style={{ borderRadius: 20, overflow: 'hidden', background: 'var(--scard)', border: '1px solid var(--scbdr)', opacity: r.slug ? 1 : 0.35 }}>
                  {/* Thumbnail */}
                  <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg, ${r.couleur}22, ${r.couleur}44)` }}>
                    {r.img ? (
                      <img
                        src={r.img}
                        alt={r.nom}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 56, height: 56, background: r.couleur, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#fff', fontWeight: 800 }}>
                          {r.nom[0]}
                        </div>
                      </div>
                    )}
                    {/* Badge secteur */}
                    {r.slug && (
                      <div style={{
                        position: 'absolute', top: 10, left: 10,
                        background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)',
                        borderRadius: 5, padding: '3px 9px',
                        fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,.8)', letterSpacing: '.05em', textTransform: 'uppercase',
                      }}>
                        {r.secteur}
                      </div>
                    )}
                    {/* Dot live */}
                    {r.slug && (
                      <span style={{
                        position: 'absolute', top: 12, right: 12,
                        width: 8, height: 8, borderRadius: '50%',
                        background: '#6366f1', boxShadow: '0 0 8px rgba(99,102,241,.7)',
                      }} />
                    )}
                  </div>
                  <div style={{ padding: '18px 22px' }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--sf)', marginBottom: 4 }}>{r.nom}</div>
                    {!r.slug && <div style={{ fontSize: 12, color: 'var(--sf3)' }}>{r.secteur}</div>}
                    {r.slug && (
                      <Link to={`/demos/${r.slug}`} style={{ textDecoration: 'none' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: r.couleur, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          Voir le site
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={r.couleur} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA CONTACT ══ */}
      <section id="contact" style={{ padding: '160px 24px', background: '#0a0a0a', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
              30 min d&apos;échange avec Kyrio, devis sous 24h, site en ligne en 7 jours.<br />
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,.25)' }}>On n&apos;est pas des commerciaux — juste une agence qui fait bien son travail.</span>
            </p>

            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,.06)', padding: '48px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <KyrioMark size={24} dark opacity={0.6} />
        <div style={{ display: 'flex', gap: 28 }}>
          {[['offres', 'Offres'], ['maintenance', 'Maintenance'], ['processus', 'Processus']].map(([id, label]) => (
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
        Votre message est bien arrivé. Kyrio vous répond sous <strong style={{ color: '#6366f1' }}>24h</strong> — souvent bien avant.
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
      <p style={{ color: '#f87171', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Une erreur est survenue</p>
      <p style={{ color: 'rgba(255,255,255,.4)', fontSize: 14, marginBottom: 24 }}>Vérifiez vos clés EmailJS ou contactez directement : <a href="mailto:contact@kyrio.fr" style={{ color: '#6366f1' }}>contact@kyrio.fr</a></p>
      <button onClick={() => setStatus('idle')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.4)', borderRadius: 50, padding: '10px 28px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>Réessayer</button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 24, padding: '40px 36px', textAlign: 'left' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={lbl}>Nom *</label>
          <input required value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} placeholder="Jean Dupont" style={inp} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jean@exemple.fr" style={inp} onFocus={focus} onBlur={blur} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={lbl}>Téléphone</label>
          <input value={form.telephone} onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))} placeholder="06 12 34 56 78" style={inp} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={lbl}>Offre souhaitée</label>
          <select value={form.offre} onChange={e => setForm(f => ({ ...f, offre: e.target.value }))} style={{ ...inp, color: form.offre ? '#fff' : 'rgba(255,255,255,.35)', cursor: 'pointer', background: '#1a1a1a' }}>
            <option value="">— Choisir —</option>
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
        <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Mon activité, ce que je vends, mon site actuel (si j'en ai un), mes objectifs…" rows={4} style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
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
            Envoyer ma demande — Réponse sous 24h
          </>
        )}
      </button>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.18)', marginTop: 14 }}>
        Aucun démarchage · Réponse humaine garantie sous 24h
      </p>
    </form>
  );
}
