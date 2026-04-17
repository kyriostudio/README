import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ════════════════════════════════════════════════════════════════
   DIFAMEX — Vitrine démo Kyrio
   Skill appliqué : high-end-visual-design (soft-skill)
   Archetypes : Editorial Luxury · Asymmetrical Bento
   ════════════════════════════════════════════════════════════════ */

/* ── Palette Editorial Luxury (Outdoor / Landscaping) ── */
const C = {
  cream:       '#FDFBF7',   // fond principal
  creamDeep:   '#F4EFE6',   // fond sections alternées
  paper:       '#FAF7F2',   // cartes
  sage:        '#6B8E5A',   // accent végétal
  sageDeep:    '#4E6B42',
  sageLight:   '#8FAD7E',
  espresso:    '#2A2418',   // texte principal
  espressoMed: '#4A3F30',
  espressoLig: '#6B5D4A',
  ink:         '#1A1612',
  terracotta:  '#C06B4A',   // accent chaud secondaire
  hairline:    'rgba(42,36,24,.08)',
  hairline2:   'rgba(42,36,24,.12)',
};

const FONT_DISPLAY = "'Fraunces', 'PP Editorial New', Georgia, serif";
const FONT_SANS    = "'Plus Jakarta Sans', 'Geist', system-ui, sans-serif";
const EASE         = 'cubic-bezier(0.32,0.72,0,1)';

/* ── IntersectionObserver reveal ── */
function useReveal(threshold = 0.12) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, y = 28 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : `translateY(${y}px)`,
      filter: vis ? 'blur(0)' : 'blur(6px)',
      transition: `opacity 900ms ${delay}s ${EASE}, transform 900ms ${delay}s ${EASE}, filter 900ms ${delay}s ${EASE}`,
    }}>
      {children}
    </div>
  );
}

/* ── Icônes ultra-light (Phosphor-ish, stroke 1.25) ── */
function Icon({ name, size = 20, color = 'currentColor' }) {
  const p = { stroke: color, strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  const paths = {
    arrow:    <path d="M5 19L19 5M19 5H8M19 5v11" {...p} />,
    arrowDown:<path d="M12 5v14M5 12l7 7 7-7" {...p} />,
    check:    <polyline points="20 6 9 17 4 12" {...p} />,
    plus:     <><line x1="12" y1="5" x2="12" y2="19" {...p} /><line x1="5" y1="12" x2="19" y2="12" {...p} /></>,
    pin:      <><path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z" {...p} /><circle cx="12" cy="9" r="2.5" {...p} /></>,
    phone:    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" {...p} />,
    mail:     <><rect x="2" y="5" width="20" height="14" rx="2" {...p} /><polyline points="3 7 12 13 21 7" {...p} /></>,
    clock:    <><circle cx="12" cy="12" r="9" {...p} /><polyline points="12 7 12 12 15.5 14" {...p} /></>,
    leaf:     <path d="M11 20A7 7 0 0 1 4 13V4h9a7 7 0 0 1 7 7v0a7 7 0 0 1-7 7h-2zM4 4l16 16" {...p} />,
    fence:    <><path d="M4 21V8l2-3 2 3v13M10 21V8l2-3 2 3v13M16 21V8l2-3 2 3v13" {...p} /><line x1="2" y1="13" x2="22" y2="13" {...p} /><line x1="2" y1="17" x2="22" y2="17" {...p} /></>,
    drop:     <path d="M12 2s6 6 6 11a6 6 0 1 1-12 0c0-5 6-11 6-11z" {...p} />,
    sprout:   <><path d="M12 20V10" {...p} /><path d="M12 10c0-3 2-5 5-5 0 3-2 5-5 5z" {...p} /><path d="M12 10c0-3-2-5-5-5 0 3 2 5 5 5z" {...p} /></>,
    brick:    <><rect x="3" y="4" width="18" height="5" {...p} /><rect x="3" y="9.5" width="18" height="5" {...p} /><rect x="3" y="15" width="18" height="5" {...p} /></>,
    tool:     <path d="M14.7 6.3a4 4 0 1 0 4.5 6.5l-1.2-1.2a1 1 0 0 1 0-1.4l2-2-3.1-3.1-2 2a1 1 0 0 1-1.4 0zM3 21l6-6M14 10l7 7" {...p} />,
    menu:     <><line x1="4" y1="6" x2="20" y2="6" {...p} /><line x1="4" y1="12" x2="20" y2="12" {...p} /><line x1="4" y1="18" x2="20" y2="18" {...p} /></>,
    close:    <><line x1="6" y1="6" x2="18" y2="18" {...p} /><line x1="18" y1="6" x2="6" y2="18" {...p} /></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 1 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" {...p} /><rect x="2" y="9" width="4" height="12" {...p} /><circle cx="4" cy="4" r="2" {...p} /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" {...p} /><polyline points="7 10 12 15 17 10" {...p} /><line x1="12" y1="15" x2="12" y2="3" {...p} /></>,
    quote:    <path d="M3 21c3-2 5-4 5-9V3H3v9h3a4 4 0 0 1-3 4zm10 0c3-2 5-4 5-9V3h-5v9h3a4 4 0 0 1-3 4z" {...p} />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>{paths[name] || null}</svg>;
}

/* ── Données produits (d'après catalogue difamex.fr) ── */
const CATEGORIES = [
  { key: 'clotures',   title: 'Clôtures & Portails',         count: '11 gammes', span: 'xl', icon: 'fence',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
    items: ['Panneaux soudés', 'Grillage rouleau', 'Clôtures bois', 'Composite & alu', 'Clôtures béton', 'Portails'] },
  { key: 'bordures',   title: 'Bordures, traverses & gabions', count: '6 familles', span: 'md', icon: 'brick',
    img: 'https://images.unsplash.com/photo-1598300188904-6287d52746ad?w=900&q=80',
    items: ['Bordures acier', 'Traverses paysagères', 'Gabions pierre', 'Finitions sur-mesure'] },
  { key: 'paillages',  title: 'Paillages & stabilisateurs',    count: '4 gammes',  span: 'md', icon: 'leaf',
    img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=900&q=80',
    items: ['Paillages organiques', 'Paillages minéraux', 'Paillages synthétiques', 'Stabilisateurs'] },
  { key: 'terrasses',  title: 'Terrasses',                    count: 'Bois · Composite · Pierre', span: 'lg', icon: 'brick',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    items: ['Lames bois exotique', 'Composite premium', 'Dalles sur plots', 'Accessoires de pose'] },
  { key: 'pavages',    title: 'Pavages & dallages',            count: '+80 réf.', span: 'sm', icon: 'brick',
    img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80',
    items: ['Pavés drainants', 'Dalles béton', 'Pierre naturelle'] },
  { key: 'plantations',title: 'Accessoires de plantations',    count: '5 familles', span: 'sm', icon: 'sprout',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80',
    items: ['Tuteurs', 'Feutres géotextiles', 'Films de paillage'] },
  { key: 'terreaux',   title: 'Terreaux, engrais & gazons',    count: 'Pro & particulier', span: 'md', icon: 'drop',
    img: 'https://images.unsplash.com/photo-1585944285765-cef2ff9dc19a?w=900&q=80',
    items: ['Terreaux universels', 'Engrais spécifiques', 'Gazons de sport', 'Prairies fleuries'] },
  { key: 'outillage',  title: 'Outillage',                     count: 'Pro exclusif', span: 'sm', icon: 'tool',
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=80',
    items: ['Outils manuels', 'Petits équipements motorisés', 'Consommables'] },
];

const MAGASINS = [
  { ville: 'Ifs',      dept: '14',
    adresse: "Z.A Objectif Sud, 4 Boulevard Paul Boucherot",
    cp: '14123 Ifs',
    tel: '02 31 99 53 29', mail: 'contact@difamex.fr',
    horaires: [
      { j: 'Lundi — Vendredi', h: '7h30 — 12h  ·  13h30 — 18h' },
      { j: 'Samedi — Dimanche', h: 'Fermé' },
    ] },
  { ville: 'Valognes', dept: '50',
    adresse: '4 Rue du Train Renard',
    cp: '50700 Valognes',
    tel: '02 33 87 50 98', mail: 'contact.cotentin@difamex.fr',
    horaires: [
      { j: 'Lundi — Vendredi', h: '7h30 — 12h  ·  13h30 — 17h30' },
      { j: 'Samedi — Dimanche', h: 'Fermé' },
    ] },
];

const PROCESS = [
  { n: '01', t: 'Vous décrivez', d: "Un projet, une surface, une contrainte budgétaire. Téléphone ou formulaire — on écoute d'abord." },
  { n: '02', t: 'Devis en 24 h',  d: "Chiffrage précis, quantités calées, alternatives proposées. Pas de surprise à la ligne 47." },
  { n: '03', t: 'Commande & stock',d:"Retrait en magasin sous 48 h ou livraison chantier selon volumes. On connaît la logistique BTP." },
  { n: '04', t: 'Service après', d: "Un retour, une pose qui coince, une reprise ? On répond. Le service ne s'arrête pas au caddie." },
];

const ARGUMENTS = [
  { t: 'Deux magasins en Basse-Normandie', d: 'Ifs (Caen, 14) et Valognes (Cotentin, 50). Deux équipes, un même réseau logistique.' },
  { t: 'Devis pro sous 24 h',               d: "Artisans paysagistes, collectivités, entreprises du BTP : votre chiffrage arrive avant votre café du lendemain." },
  { t: 'Catalogue de spécialiste',          d: "On ne vend pas tout. On vend ce qui tient — clôtures qui ne rouillent pas, terrasses qui ne grisent pas en six mois." },
  { t: 'Pro et particulier',                d: 'Mêmes références, même conseil. Un balcon de 6 m² ou un chantier de 2 hectares — on creuse autant.' },
];

/* ══════════════════════════════════════════════════
   DIFAMEX LOGO (inline)
══════════════════════════════════════════════════ */
function DifamexLogo({ size = 32, color = C.espresso }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, lineHeight: 1 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
        <rect x="2" y="2" width="36" height="36" rx="6" stroke={color} strokeWidth="1.25" fill="none" />
        <path d="M10 12 L10 28 M10 12 L20 12 Q28 12 28 20 Q28 28 20 28 L10 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="30" cy="10" r="2" fill={C.sage} />
      </svg>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: Math.round(size * 0.7), fontWeight: 600, color, letterSpacing: '-0.02em' }}>
        Difamex
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   HERO — Editorial Split
══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', padding: '140px 48px 120px', overflow: 'hidden' }}>
      {/* Grain overlay */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: .035, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Radial glow sage */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${C.sage}12 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)', gap: 64, alignItems: 'center' }} className="difa-hero-grid">
        {/* Left — Type */}
        <div>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: C.paper, border: `1px solid ${C.hairline}`,
              borderRadius: 999, padding: '7px 16px',
              fontSize: 10, fontWeight: 600, color: C.espressoMed, letterSpacing: '.22em', textTransform: 'uppercase',
              fontFamily: FONT_SANS,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.sage }} />
              Distributeur · Basse-Normandie · Depuis 2005
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 style={{
              fontFamily: FONT_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(3.2rem, 7.2vw, 6.4rem)',
              lineHeight: 0.95, letterSpacing: '-0.035em',
              color: C.espresso, margin: '28px 0 0',
            }}>
              L'extérieur,<br />
              <em style={{ fontStyle: 'italic', color: C.sageDeep, fontWeight: 400 }}>matière noble.</em>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={{
              fontFamily: FONT_SANS, fontSize: 18,
              lineHeight: 1.65, color: C.espressoLig,
              maxWidth: 520, margin: '32px 0 40px',
            }}>
              Clôtures, terrasses, pavages, paillages, terreaux — les fournitures qui font la différence entre un jardin et un aménagement. Deux magasins dans la Manche et le Calvados, un catalogue de pro, un devis sous 24 h.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <CTAButton label="Demander un devis" href="#contact" />
              <a href="#categories" style={{
                fontFamily: FONT_SANS, fontSize: 14, fontWeight: 500, color: C.espressoMed,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                paddingBottom: 4, borderBottom: `1px solid ${C.hairline2}`, transition: `all 400ms ${EASE}`,
              }}
                onMouseEnter={e => { e.currentTarget.style.color = C.espresso; e.currentTarget.style.borderBottomColor = C.sage; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.espressoMed; e.currentTarget.style.borderBottomColor = C.hairline2; }}>
                Explorer le catalogue
                <Icon name="arrowDown" size={14} />
              </a>
            </div>
          </Reveal>

          {/* Micro stats */}
          <Reveal delay={0.3}>
            <div style={{ marginTop: 72, paddingTop: 32, borderTop: `1px solid ${C.hairline}`, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[
                { v: '2', l: 'Magasins Normandie' },
                { v: '+80', l: 'Références pavage' },
                { v: '24 h', l: 'Devis chiffré' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 400, color: C.espresso, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 11, fontWeight: 500, color: C.espressoLig, letterSpacing: '.14em', textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — Z-axis image stack */}
        <Reveal delay={0.1} y={40}>
          <div style={{ position: 'relative', aspectRatio: '4 / 5', maxWidth: 520, marginLeft: 'auto' }}>
            {/* Outer shell (Double-Bezel) */}
            <div style={{
              position: 'absolute', inset: 0,
              padding: 10,
              background: C.paper, border: `1px solid ${C.hairline}`,
              borderRadius: 28, boxShadow: `0 40px 80px -30px ${C.espresso}25`,
            }}>
              {/* Inner core */}
              <div style={{
                width: '100%', height: '100%',
                borderRadius: 20, overflow: 'hidden',
                boxShadow: `inset 0 1px 1px rgba(255,255,255,.5)`,
                background: `url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80) center/cover`,
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 50%, ${C.espresso}40)` }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: C.cream, fontFamily: FONT_SANS }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', opacity: .85 }}>Showroom · Ifs</div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginTop: 6, opacity: .95 }}>Terrasses bois exotique — gamme 2026</div>
                </div>
              </div>
            </div>
            {/* Floating card (offset) */}
            <div style={{
              position: 'absolute', bottom: -36, left: -44,
              background: C.cream, border: `1px solid ${C.hairline2}`,
              borderRadius: 16, padding: '14px 18px',
              boxShadow: `0 30px 50px -20px ${C.espresso}30`,
              fontFamily: FONT_SANS, display: 'flex', alignItems: 'center', gap: 12,
              transform: 'rotate(-2deg)',
            }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.sage + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="leaf" size={18} color={C.sageDeep} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.espressoLig, letterSpacing: '.16em', textTransform: 'uppercase' }}>Label éco</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.espresso, marginTop: 2 }}>Bois FSC · PEFC</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Hairline bas + scroll hint */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: C.espressoLig, fontFamily: FONT_SANS }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(180deg, ${C.hairline2}, transparent)` }} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CTA BUTTON — button-in-button
══════════════════════════════════════════════════ */
function CTAButton({ label, href, variant = 'primary', small = false }) {
  const [hov, setHov] = useState(false);
  const isPrimary = variant === 'primary';
  const bg     = isPrimary ? C.espresso : 'transparent';
  const fg     = isPrimary ? C.cream    : C.espresso;
  const brd    = isPrimary ? C.espresso : C.hairline2;
  const pill   = isPrimary ? C.cream + '18' : C.espresso + '08';

  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: small ? 10 : 14,
        background: bg, color: fg, border: `1px solid ${brd}`,
        borderRadius: 999, padding: small ? '9px 10px 9px 20px' : '11px 11px 11px 26px',
        fontFamily: FONT_SANS, fontSize: small ? 13 : 14, fontWeight: 500, letterSpacing: '.01em',
        textDecoration: 'none', transition: `all 500ms ${EASE}`,
        transform: hov ? 'translateY(-1px)' : 'none',
      }}>
      <span>{label}</span>
      <span style={{
        width: small ? 28 : 34, height: small ? 28 : 34, borderRadius: '50%',
        background: pill, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: `all 500ms ${EASE}`,
        transform: hov ? 'translate(2px, -1px) scale(1.06)' : 'none',
      }}>
        <Icon name="arrow" size={small ? 13 : 15} color={fg} />
      </span>
    </a>
  );
}

/* ══════════════════════════════════════════════════
   TRUST BAR
══════════════════════════════════════════════════ */
function TrustBar() {
  return (
    <section style={{ background: C.paper, borderTop: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, padding: '32px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', justifyContent: 'space-between' }}>
        {[
          { i: 'pin',   t: 'Ifs (14) · Valognes (50)' },
          { i: 'clock', t: 'Ouvert du lundi au vendredi' },
          { i: 'check', t: 'Devis sous 24 h' },
          { i: 'leaf',  t: 'Pro & particulier · Artisans paysagistes' },
        ].map(x => (
          <div key={x.t} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500, color: C.espressoMed }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid ${C.hairline2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.cream }}>
              <Icon name={x.i} size={15} color={C.sageDeep} />
            </div>
            {x.t}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   INTRO — Editorial
══════════════════════════════════════════════════ */
function Intro() {
  return (
    <section style={{ padding: '160px 48px', background: C.cream }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr)', gap: 96, alignItems: 'start' }} className="difa-intro-grid">
        <div>
          <Reveal>
            <div style={{ fontFamily: FONT_SANS, fontSize: 10, fontWeight: 600, color: C.sageDeep, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 20 }}>
              — Maison
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              lineHeight: 1.02, letterSpacing: '-0.03em',
              color: C.espresso, margin: 0,
            }}>
              Matières choisies,<br />
              <em style={{ fontStyle: 'italic', color: C.sageDeep, fontWeight: 400 }}>mains formées.</em>
            </h2>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.12}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 18, lineHeight: 1.72, color: C.espressoMed, marginBottom: 28 }}>
              Difamex n'est pas une grande surface. C'est un distributeur qui choisit ses fournisseurs un par un, refuse les séries trop courtes et les finitions qui vieillissent mal, et accompagne chaque projet — du balcon de 8 m² au lotissement de 3 hectares.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 16, lineHeight: 1.72, color: C.espressoLig, marginBottom: 40 }}>
              Depuis 2005, nous servons les artisans paysagistes, les entreprises du BTP, les collectivités et les particuliers exigeants en Basse-Normandie. Deux magasins — Ifs à 10 min de Caen, Valognes au cœur du Cotentin — et un même niveau d'exigence.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, background: C.hairline, border: `1px solid ${C.hairline}`, borderRadius: 14 }}>
              {ARGUMENTS.map((a, i) => (
                <div key={a.t} style={{
                  background: C.paper, padding: '24px 24px',
                  borderRadius: i === 0 ? '14px 0 0 0' : i === 1 ? '0 14px 0 0' : i === 2 ? '0 0 0 14px' : '0 0 14px 0',
                }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500, color: C.espresso, letterSpacing: '-0.01em', marginBottom: 8 }}>{a.t}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 13, lineHeight: 1.6, color: C.espressoLig }}>{a.d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   CATEGORIES — Asymmetrical Bento
══════════════════════════════════════════════════ */
function Categories() {
  return (
    <section id="categories" style={{ padding: '160px 48px', background: C.creamDeep, position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 72, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 10, fontWeight: 600, color: C.sageDeep, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 20 }}>
                — Catalogue
              </div>
              <h2 style={{
                fontFamily: FONT_DISPLAY, fontWeight: 400,
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                lineHeight: 1.02, letterSpacing: '-0.03em',
                color: C.espresso, margin: 0, maxWidth: 680,
              }}>
                Huit familles,<br />
                <em style={{ fontStyle: 'italic', color: C.sageDeep }}>un même niveau d'exigence.</em>
              </h2>
            </div>
            <p style={{ fontFamily: FONT_SANS, fontSize: 15, lineHeight: 1.7, color: C.espressoLig, maxWidth: 320, margin: 0 }}>
              Chaque gamme est sélectionnée pour sa durabilité, sa finition, et sa disponibilité en stock local.
            </p>
          </div>
        </Reveal>

        {/* Grille bento asymétrique */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 18 }} className="difa-bento">
          {CATEGORIES.map((cat, i) => {
            const span = { xl: 'span 8', lg: 'span 6', md: 'span 4', sm: 'span 4' }[cat.span];
            const height = { xl: 520, lg: 440, md: 360, sm: 320 }[cat.span];
            return (
              <Reveal key={cat.key} delay={Math.min(i * 0.04, 0.24)}>
                <CategoryCard cat={cat} span={span} height={height} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, span, height }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="difa-cat-card"
      style={{
        gridColumn: span, minHeight: height,
        position: 'relative', overflow: 'hidden',
        padding: 8, background: C.paper,
        border: `1px solid ${C.hairline}`, borderRadius: 28,
        boxShadow: hov ? `0 40px 80px -40px ${C.espresso}35` : `0 10px 30px -20px ${C.espresso}18`,
        transition: `all 700ms ${EASE}`,
        transform: hov ? 'translateY(-4px)' : 'none',
        cursor: 'pointer',
      }}>
      {/* Inner core (Double-Bezel) */}
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        borderRadius: 22, overflow: 'hidden',
        boxShadow: `inset 0 1px 1px rgba(255,255,255,.5)`,
        background: `url(${cat.img}) center/cover`,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${C.espresso}10 0%, ${C.espresso}85 100%)`, transition: `background 700ms ${EASE}` }} />

        {/* Top-left eyebrow */}
        <div style={{ position: 'absolute', top: 20, left: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.cream + 'E0', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={cat.icon} size={15} color={C.espresso} />
          </div>
          <span style={{ background: C.cream + 'E0', backdropFilter: 'blur(10px)', fontFamily: FONT_SANS, fontSize: 10, fontWeight: 600, color: C.espresso, letterSpacing: '.18em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 999 }}>
            {cat.count}
          </span>
        </div>

        {/* Plus CTA top-right */}
        <div style={{
          position: 'absolute', top: 20, right: 22,
          width: 38, height: 38, borderRadius: '50%',
          background: hov ? C.cream : C.cream + '40',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: `all 500ms ${EASE}`,
          transform: hov ? 'rotate(90deg)' : 'none',
        }}>
          <Icon name="plus" size={14} color={C.espresso} />
        </div>

        {/* Bottom title + items */}
        <div style={{ position: 'absolute', bottom: 24, left: 26, right: 26 }}>
          <h3 style={{
            fontFamily: FONT_DISPLAY, fontWeight: 500,
            fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            color: C.cream, margin: 0, marginBottom: 14,
          }}>
            {cat.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: '90%',
            maxHeight: hov ? 160 : 0, opacity: hov ? 1 : 0,
            overflow: 'hidden',
            transition: `all 600ms ${EASE}`,
          }}>
            {cat.items.map(it => (
              <span key={it} style={{
                fontFamily: FONT_SANS, fontSize: 11, fontWeight: 500,
                color: C.cream, background: 'rgba(255,255,255,.12)',
                backdropFilter: 'blur(6px)',
                border: `1px solid rgba(255,255,255,.18)`,
                borderRadius: 999, padding: '4px 10px',
              }}>{it}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════
   PROCESSUS
══════════════════════════════════════════════════ */
function Processus() {
  return (
    <section style={{ padding: '160px 48px', background: C.cream }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 10, fontWeight: 600, color: C.sageDeep, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 20 }}>
              — Méthode
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              lineHeight: 1.02, letterSpacing: '-0.03em',
              color: C.espresso, margin: 0,
            }}>
              Du <em style={{ fontStyle: 'italic', color: C.sageDeep }}>brief</em> à la <em style={{ fontStyle: 'italic', color: C.terracotta }}>livraison.</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1px solid ${C.hairline}`, borderRadius: 20, overflow: 'hidden', background: C.paper }} className="difa-process-grid">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08}>
              <div style={{
                padding: '44px 36px',
                borderRight: i < PROCESS.length - 1 ? `1px solid ${C.hairline}` : 'none',
                height: '100%', position: 'relative',
              }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 500, color: C.sageDeep, letterSpacing: '.08em', marginBottom: 32 }}>
                  {p.n}
                </div>
                <h3 style={{
                  fontFamily: FONT_DISPLAY, fontWeight: 500,
                  fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.02em',
                  color: C.espresso, margin: '0 0 14px',
                }}>
                  {p.t}
                </h3>
                <p style={{ fontFamily: FONT_SANS, fontSize: 14, lineHeight: 1.7, color: C.espressoLig, margin: 0 }}>
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   MAGASINS — Deux adresses
══════════════════════════════════════════════════ */
function Magasins() {
  return (
    <section id="magasins" style={{ padding: '160px 48px', background: C.espresso, color: C.cream, position: 'relative', overflow: 'hidden' }}>
      {/* Grain */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: .04, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 10, fontWeight: 600, color: C.sageLight, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: 20 }}>
              — Deux magasins
            </div>
            <h2 style={{
              fontFamily: FONT_DISPLAY, fontWeight: 400,
              fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
              lineHeight: 1.02, letterSpacing: '-0.03em', margin: 0,
            }}>
              Calvados et<br />
              <em style={{ fontStyle: 'italic', color: C.sageLight }}>Manche.</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }} className="difa-mag-grid">
          {MAGASINS.map((m, i) => (
            <Reveal key={m.ville} delay={i * 0.1}>
              <MagasinCard m={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MagasinCard({ m }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 8,
        background: 'rgba(255,255,255,.04)',
        border: `1px solid rgba(255,255,255,.08)`,
        borderRadius: 28, transition: `all 600ms ${EASE}`,
        transform: hov ? 'translateY(-3px)' : 'none',
      }}>
      <div style={{
        padding: '40px 36px 32px',
        background: 'rgba(255,255,255,.03)',
        borderRadius: 22,
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,.05)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${C.sage}25 0%, transparent 65%)` }} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28, position: 'relative' }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 500, color: C.sageLight, letterSpacing: '.04em' }}>
            {m.dept}
          </span>
          <h3 style={{
            fontFamily: FONT_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(2.2rem, 3.6vw, 3rem)',
            letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
          }}>
            {m.ville}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32, fontFamily: FONT_SANS }}>
          <Row icon="pin"   title="Adresse"    lines={[m.adresse, m.cp]} />
          <Row icon="phone" title="Téléphone"  lines={[m.tel]} link={`tel:${m.tel.replace(/\s/g, '')}`} />
          <Row icon="mail"  title="E-mail"     lines={[m.mail]} link={`mailto:${m.mail}`} />
          <Row icon="clock" title="Horaires"   lines={m.horaires.map(h => `${h.j} — ${h.h}`)} />
        </div>

        <CTAButton label={`Itinéraire vers ${m.ville}`} href={`https://maps.google.com?q=${encodeURIComponent(m.adresse + ' ' + m.cp)}`} variant="ghost-on-dark" small />
      </div>
    </div>
  );
}

function Row({ icon, title, lines, link }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: `1px solid rgba(255,255,255,.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={15} color={C.sageLight} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.sageLight, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT_SANS }}>
          {title}
        </div>
        {lines.map((l, i) => (
          link && i === 0 ? (
            <a key={i} href={link} style={{ display: 'block', fontSize: 14, color: C.cream, textDecoration: 'none', lineHeight: 1.5, transition: `color 300ms ${EASE}` }}
              onMouseEnter={e => e.currentTarget.style.color = C.sageLight}
              onMouseLeave={e => e.currentTarget.style.color = C.cream}>{l}</a>
          ) : (
            <div key={i} style={{ fontSize: 14, color: 'rgba(253,251,247,.75)', lineHeight: 1.55 }}>{l}</div>
          )
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CTA DEVIS — Editorial finale
══════════════════════════════════════════════════ */
function CTAFinal() {
  return (
    <section id="contact" style={{ padding: '160px 48px', background: C.creamDeep, position: 'relative' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <Reveal>
          <Icon name="quote" size={40} color={C.sageDeep} />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 style={{
            fontFamily: FONT_DISPLAY, fontWeight: 400,
            fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
            lineHeight: 1.03, letterSpacing: '-0.035em',
            color: C.espresso, margin: '24px 0 28px',
          }}>
            Un projet ?<br />
            <em style={{ fontStyle: 'italic', color: C.sageDeep, fontWeight: 400 }}>Un devis en 24 h.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 17, lineHeight: 1.72, color: C.espressoLig, maxWidth: 560, margin: '0 auto 44px' }}>
            Décrivez votre chantier en quelques lignes — surface, matière envisagée, contrainte budgétaire. Notre équipe chiffre votre projet et revient vers vous sous 24 h ouvrées.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton label="Demander un devis" href="mailto:contact@difamex.fr" />
            <CTAButton label="Télécharger le catalogue" href="#" variant="ghost" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════
   NAV flottant (Fluid Island)
══════════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const links = [
    ['#categories', 'Catalogue'],
    ['#magasins',   'Magasins'],
    ['#contact',    'Devis'],
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: scrolled ? 16 : 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, transition: `all 600ms ${EASE}`,
        background: scrolled ? C.cream + 'E6' : C.cream + 'B3',
        backdropFilter: 'blur(18px)',
        border: `1px solid ${C.hairline2}`,
        borderRadius: 999,
        padding: '8px 12px 8px 24px',
        boxShadow: scrolled ? `0 20px 40px -20px ${C.espresso}30` : 'none',
        display: 'flex', alignItems: 'center', gap: 6,
      }} className="difa-nav">
        <Link to="/demos" style={{ textDecoration: 'none', marginRight: 20 }}>
          <DifamexLogo size={26} />
        </Link>
        <div style={{ display: 'flex', gap: 4 }} className="difa-nav-links">
          {links.map(([href, label]) => (
            <a key={href} href={href} style={{
              fontFamily: FONT_SANS, fontSize: 13, fontWeight: 500,
              color: C.espressoMed, textDecoration: 'none',
              padding: '8px 14px', borderRadius: 999, transition: `all 400ms ${EASE}`,
            }}
              onMouseEnter={e => { e.currentTarget.style.color = C.espresso; e.currentTarget.style.background = C.hairline; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.espressoMed; e.currentTarget.style.background = 'transparent'; }}>
              {label}
            </a>
          ))}
        </div>
        <CTAButton label="Devis 24 h" href="#contact" small />

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(o => !o)}
          className="difa-hamb"
          aria-label="Menu"
          style={{
            display: 'none', width: 36, height: 36, borderRadius: '50%',
            border: `1px solid ${C.hairline2}`, background: 'transparent',
            cursor: 'pointer', alignItems: 'center', justifyContent: 'center', marginLeft: 6,
          }}>
          <Icon name={open ? 'close' : 'menu'} size={16} color={C.espresso} />
        </button>
      </nav>

      {/* Overlay mobile */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: C.cream + 'E6', backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
          animation: 'difa-overlay 400ms ease',
        }} onClick={() => setOpen(false)}>
          {links.map(([href, label], i) => (
            <a key={href} href={href} style={{
              fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 500, letterSpacing: '-0.02em',
              color: C.espresso, textDecoration: 'none',
              animation: `difa-item 500ms ${EASE} ${i * 0.05}s both`,
            }}>
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background: C.ink, color: C.cream + 'B3', padding: '80px 48px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))', gap: 48, paddingBottom: 56, borderBottom: `1px solid rgba(255,255,255,.08)` }} className="difa-foot-grid">
          <div>
            <DifamexLogo size={32} color={C.cream} />
            <p style={{ fontFamily: FONT_SANS, fontSize: 14, lineHeight: 1.7, color: 'rgba(253,251,247,.6)', marginTop: 20, maxWidth: 340 }}>
              Distributeur de fournitures d'aménagement extérieur en Basse-Normandie. Pro et particulier, devis sous 24 h.
            </p>
          </div>
          {[
            { t: 'Catalogue', items: ['Clôtures & portails', 'Terrasses', 'Pavages', 'Paillages', 'Terreaux', 'Outillage'] },
            { t: 'Magasins',  items: ['Ifs — Calvados (14)', 'Valognes — Manche (50)'] },
            { t: 'Contact',   items: ['02 31 99 53 29 (Ifs)', '02 33 87 50 98 (Valognes)', 'contact@difamex.fr'] },
          ].map(col => (
            <div key={col.t}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 10, fontWeight: 600, color: C.sageLight, letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 18 }}>{col.t}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.items.map(it => <li key={it} style={{ fontFamily: FONT_SANS, fontSize: 13, color: 'rgba(253,251,247,.65)' }}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, flexWrap: 'wrap', gap: 16, fontFamily: FONT_SANS, fontSize: 12, color: 'rgba(253,251,247,.4)' }}>
          <div>© {new Date().getFullYear()} Difamex — Tous droits réservés</div>
          <Link to="/demos" style={{ color: 'rgba(253,251,247,.5)', textDecoration: 'none', letterSpacing: '.04em' }}>
            ← Retour aux démos Kyrio
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
══════════════════════════════════════════════════ */
export default function DifamexVitrine() {
  useEffect(() => {
    document.title = 'Difamex — Fournitures d\'aménagement extérieur (démo Kyrio)';
  }, []);

  return (
    <div style={{ background: C.cream, minHeight: '100vh', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        @keyframes difa-overlay { from { opacity: 0 } to { opacity: 1 } }
        @keyframes difa-item { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }

        @media (max-width: 1024px) {
          .difa-hero-grid, .difa-intro-grid, .difa-mag-grid, .difa-foot-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .difa-bento { grid-template-columns: repeat(6, 1fr) !important; }
          .difa-bento > * { grid-column: span 3 !important; min-height: 320px !important; }
          .difa-process-grid { grid-template-columns: 1fr 1fr !important; }
          .difa-process-grid > div > div { border-right: none !important; }
        }
        @media (max-width: 640px) {
          .difa-bento { grid-template-columns: 1fr !important; }
          .difa-bento > * { grid-column: span 1 !important; min-height: 280px !important; }
          .difa-process-grid { grid-template-columns: 1fr !important; }
          .difa-nav-links { display: none !important; }
          .difa-hamb { display: flex !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Intro />
        <Categories />
        <Processus />
        <Magasins />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}
