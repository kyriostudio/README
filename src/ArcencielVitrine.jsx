import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════════
   Arc en Ciel Propreté — démo Kyrio (v2 · refonte complète)
   DA fidèle au logo : fuchsia / rose / vague signature
   Thème : propreté, fraîcheur, lumière, bulles, éclat
   ══════════════════════════════════════════════════════════════ */

/* ── Tokens générés via UI Design System skill
   (design_token_generator.py · brand #C5007F · playful) ── */
const C = {
  /* Palette primaire — échelle 50-900 générée */
  primary50:   '#f2a0d5',
  primary100:  '#f296d1',
  primary200:  '#f283cb',
  primary300:  '#f271c4',
  primary400:  '#f25ebd',
  primary500:  '#c53d94',
  primary600:  '#9d2472',
  primary700:  '#761252',
  primary800:  '#4e0634',
  primary900:  '#270019',

  /* Alias sémantiques (mapping vers la palette générée) */
  fuchsia:      '#C5007F',  // brand
  fuchsiaDeep:  '#761252',  // primary-700
  fuchsiaLight: '#f25ebd',  // primary-400
  fuchsiaGlow:  '#f283cb',  // primary-200 — lumineux
  rose:         '#f2a0d5',  // primary-50
  roseSoft:     '#FCE4EE',
  roseWhisper:  '#FFF5F9',
  cream:        '#FFFBF8',
  sky:          '#E8F4FF',

  /* Neutres (tokens neutral) */
  dark:         '#111827',   // neutral-900
  darkSoft:     '#374151',   // neutral-700
  grey:         '#6B7280',   // neutral-500
  greyLight:    '#9CA3AF',   // neutral-400
  border:       '#E5E7EB',   // neutral-200
  bg:           '#FFFFFF',   // surface-background
};

/* ── Playful font-stack du design system ── */
const FONT = "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_DISPLAY = "'Playfair Display', 'Fraunces', Georgia, serif";

/* ── Spacing (8pt grid) ── */
const S = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 72, xxxl: 128,
};

/* ── Radius tokens ── */
const R = {
  sm: 8, md: 16, lg: 20, xl: 24, xxl: 32, full: 9999,
};

/* ── Shadows (du design system) ── */
const SH = {
  sm:  '0 1px 2px 0 rgba(0,0,0,.05)',
  md:  '0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06)',
  lg:  '0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)',
  xl:  '0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04)',
  xxl: '0 25px 50px -12px rgba(0,0,0,.25)',
};
const GRADIENT = `linear-gradient(135deg, ${C.fuchsia} 0%, ${C.fuchsiaLight} 50%, ${C.fuchsiaGlow} 100%)`;
const GRADIENT_SOFT = `linear-gradient(135deg, ${C.roseSoft} 0%, ${C.roseWhisper} 100%)`;

/* ─────── Hook reveal au scroll ─────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, y = 28, style = {} }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : `translateY(${y}px)`,
      transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}s, transform .8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ─────── Compteur animé ─────── */
function Counter({ value, suffix = '', duration = 1400 }) {
  const [ref, visible] = useReveal(0.3);
  const [n, setN] = useState(0);
  const numeric = parseFloat(String(value).replace(/[^\d.]/g, '')) || 0;
  const fallback = typeof value === 'string' && !/^\d+\.?\d*$/.test(value);

  useEffect(() => {
    if (!visible || fallback) return;
    let raf; const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(numeric * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, numeric, duration, fallback]);

  return (
    <span ref={ref}>
      {fallback ? value : Math.round(n) + suffix}
    </span>
  );
}

/* ─────── Icônes inline ─────── */
function Ico({ name, size = 20, color = 'currentColor', stroke = 1.8 }) {
  const p = { stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  const d = {
    phone:    <path {...p} d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>,
    mail:     <><path {...p} d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline {...p} points="22,6 12,13 2,6"/></>,
    pin:      <><path {...p} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle {...p} cx="12" cy="10" r="3"/></>,
    clock:    <><circle {...p} cx="12" cy="12" r="10"/><polyline {...p} points="12,6 12,12 16,14"/></>,
    check:    <polyline {...p} points="20,6 9,17 4,12"/>,
    arrow:    <><line {...p} x1="5" y1="12" x2="19" y2="12"/><polyline {...p} points="12,5 19,12 12,19"/></>,
    arrowUp:  <path {...p} d="M7 17L17 7M17 7H7M17 7v10"/>,
    star:     <polygon {...p} points="12,2 15.1,8.6 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.6"/>,
    leaf:     <><path {...p} d="M11 20A7 7 0 0 1 4 13V4h9a7 7 0 0 1 7 7v9h-9z"/><line {...p} x1="4" y1="4" x2="20" y2="20"/></>,
    shield:   <><path {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline {...p} points="9,12 11,14 15,10"/></>,
    zap:      <polygon {...p} points="13,2 3,14 12,14 11,22 21,10 12,10"/>,
    plus:     <><line {...p} x1="12" y1="5" x2="12" y2="19"/><line {...p} x1="5" y1="12" x2="19" y2="12"/></>,
    minus:    <line {...p} x1="5" y1="12" x2="19" y2="12"/>,
    quote:    <path {...p} d="M3 21c3 0 7-1 7-8V5c0-1-1-2-2-2H3v12c0 1 1 2 2 2h4M15 21c3 0 7-1 7-8V5c0-1-1-2-2-2h-5v12c0 1 1 2 2 2h4"/>,
    heart:    <path {...p} d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>,
    sparkle:  <path {...p} d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>,
    droplet:  <path {...p} d="M12 2s6 8 6 12a6 6 0 0 1-12 0c0-4 6-12 6-12z"/>,
    menu:     <><line {...p} x1="3" y1="6" x2="21" y2="6"/><line {...p} x1="3" y1="12" x2="21" y2="12"/><line {...p} x1="3" y1="18" x2="21" y2="18"/></>,
    close:    <><line {...p} x1="18" y1="6" x2="6" y2="18"/><line {...p} x1="6" y1="6" x2="18" y2="18"/></>,
    play:     <polygon {...p} points="5,3 19,12 5,21" fill={color}/>,
    file:     <><path {...p} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline {...p} points="14,2 14,8 20,8"/></>,
    building: <><rect {...p} x="4" y="2" width="16" height="20" rx="1"/><line {...p} x1="9" y1="6" x2="9" y2="6.01"/><line {...p} x1="15" y1="6" x2="15" y2="6.01"/><line {...p} x1="9" y1="10" x2="9" y2="10.01"/><line {...p} x1="15" y1="10" x2="15" y2="10.01"/><line {...p} x1="9" y1="14" x2="9" y2="14.01"/><line {...p} x1="15" y1="14" x2="15" y2="14.01"/><line {...p} x1="10" y1="22" x2="10" y2="18"/><line {...p} x1="14" y1="22" x2="14" y2="18"/></>,
    home:     <><path {...p} d="M3 12l9-9 9 9"/><path {...p} d="M5 10v10h14V10"/></>,
    users:    <><path {...p} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle {...p} cx="9" cy="7" r="4"/><path {...p} d="M23 21v-2a4 4 0 0 0-3-3.87"/><path {...p} d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    briefcase:<><rect {...p} x="2" y="7" width="20" height="14" rx="2"/><path {...p} d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>{d[name] || null}</svg>;
}

/* ─────── Vague SVG signature (motif du logo) ─────── */
function SignatureWave({ color = C.fuchsia, opacity = 0.08, height = 120, flip = false }) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="none" style={{
      width: '100%', height, display: 'block',
      transform: flip ? 'scaleY(-1)' : 'none',
    }}>
      <defs>
        <linearGradient id={`wg-${color.slice(1)}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0"/>
          <stop offset="50%" stopColor={color} stopOpacity={opacity * 3}/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,60 C150,100 250,20 400,60 C500,90 550,40 600,60 L600,120 L0,120 Z" fill={`url(#wg-${color.slice(1)})`}/>
      <path d="M0,70 C120,30 300,110 450,60 C520,36 570,80 600,70" stroke={color} strokeOpacity={opacity * 5} strokeWidth="2" fill="none"/>
    </svg>
  );
}

/* ─────── Bulles animées (thème propreté) ─────── */
function BubblesField({ count = 14 }) {
  const bubbles = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 10 + Math.random() * 50,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      dur: 10 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.35,
    }))
  ), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {bubbles.map(b => (
        <span key={b.id} style={{
          position: 'absolute',
          bottom: -60,
          left: `${b.left}%`,
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.9), ${C.fuchsiaLight}40 60%, ${C.fuchsia}20)`,
          boxShadow: `inset 0 0 8px rgba(255,255,255,.5), 0 0 12px ${C.fuchsiaLight}30`,
          opacity: b.opacity,
          animation: `aec-bubble ${b.dur}s ${b.delay}s linear infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ─────── Sparkles (étincelles) ─────── */
function Sparkles({ count = 6 }) {
  const stars = useMemo(() => (
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 10,
      delay: Math.random() * 2,
    }))
  ), [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map(s => (
        <svg key={s.id} width={s.size} height={s.size} viewBox="0 0 24 24" style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          animation: `aec-twinkle 2.4s ${s.delay}s ease-in-out infinite`,
          filter: `drop-shadow(0 0 4px ${C.fuchsiaGlow})`,
        }}>
          <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" fill={C.fuchsiaGlow} />
        </svg>
      ))}
    </div>
  );
}

/* ─────── Illustrations SVG pour les 4 cibles ─────── */
function CibleIllu({ type, size = 110 }) {
  const cFill   = C.fuchsiaLight;
  const cFill2  = C.fuchsia;
  const cLight  = C.roseSoft;
  const cStroke = C.fuchsiaDeep;
  const common  = { width: size, height: size, viewBox: '0 0 120 120', fill: 'none' };
  if (type === 'collectivites') {
    return (
      <svg {...common}>
        <rect x="18" y="44" width="84" height="56" rx="4" fill={cLight}/>
        <polygon points="60,16 20,44 100,44" fill={cFill2}/>
        <rect x="56" y="70" width="8" height="30" fill={cStroke}/>
        <rect x="30" y="56" width="14" height="14" rx="1" fill={cFill} opacity=".85"/>
        <rect x="76" y="56" width="14" height="14" rx="1" fill={cFill} opacity=".85"/>
        <rect x="30" y="78" width="14" height="14" rx="1" fill={cFill} opacity=".55"/>
        <rect x="76" y="78" width="14" height="14" rx="1" fill={cFill} opacity=".55"/>
        <circle cx="60" cy="30" r="3" fill={cStroke}/>
        <line x1="60" y1="16" x2="60" y2="10" stroke={cStroke} strokeWidth="2"/>
      </svg>
    );
  }
  if (type === 'coproprietes') {
    return (
      <svg {...common}>
        <rect x="22" y="28" width="30" height="74" rx="3" fill={cFill2}/>
        <rect x="58" y="46" width="40" height="56" rx="3" fill={cFill}/>
        {[0,1,2,3,4].map(r => (
          <g key={r}>
            <rect x="28" y={36 + r*12} width="8" height="8" fill={cLight}/>
            <rect x="40" y={36 + r*12} width="8" height="8" fill={cLight}/>
          </g>
        ))}
        {[0,1,2,3].map(r => (
          <g key={r}>
            <rect x="64" y={54 + r*12} width="8" height="8" fill={cLight}/>
            <rect x="78" y={54 + r*12} width="8" height="8" fill={cLight}/>
            <rect x="90" y={54 + r*12} width="4" height="8" fill={cLight}/>
          </g>
        ))}
        <rect x="70" y="92" width="14" height="10" fill={cStroke} opacity=".6"/>
      </svg>
    );
  }
  if (type === 'professionnels') {
    return (
      <svg {...common}>
        <rect x="18" y="46" width="84" height="54" rx="4" fill={cLight}/>
        <path d="M18 46 L60 20 L102 46 Z" fill={cFill2}/>
        <rect x="28" y="60" width="24" height="30" rx="2" fill={cFill} opacity=".85"/>
        <rect x="68" y="60" width="24" height="30" rx="2" fill={cFill} opacity=".85"/>
        <circle cx="40" cy="75" r="2" fill={C.cream}/>
        <circle cx="80" cy="75" r="2" fill={C.cream}/>
        <rect x="52" y="70" width="16" height="30" fill={cStroke}/>
        <circle cx="60" cy="85" r="1.5" fill={cFill}/>
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M22 64 L60 30 L98 64 L98 100 L22 100 Z" fill={cFill}/>
      <polygon points="60,24 18,60 22,64 60,32 98,64 102,60" fill={cStroke}/>
      <rect x="52" y="72" width="16" height="28" fill={cLight}/>
      <rect x="34" y="70" width="12" height="14" rx="1" fill={cLight}/>
      <rect x="74" y="70" width="12" height="14" rx="1" fill={cLight}/>
      <circle cx="65" cy="86" r="1.5" fill={cStroke}/>
      <rect x="76" y="30" width="4" height="14" fill={cFill2}/>
      <polygon points="80,30 90,34 80,38" fill={cFill2}/>
    </svg>
  );
}

/* ─────── Illustration Hero : personnage + bulles ─────── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 520" style={{ width: '100%', height: 'auto', display: 'block' }}>
      <defs>
        <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.fuchsiaLight}/>
          <stop offset="100%" stopColor={C.fuchsia}/>
        </linearGradient>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.roseWhisper}/>
          <stop offset="100%" stopColor={C.roseSoft}/>
        </linearGradient>
        <radialGradient id="hero-shine" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Cercle de fond */}
      <circle cx="240" cy="260" r="220" fill="url(#hero-sky)"/>
      <circle cx="240" cy="260" r="220" fill="url(#hero-shine)"/>

      {/* Fenêtre / vitre stylisée */}
      <g style={{ animation: 'aec-float1 6s ease-in-out infinite' }}>
        <rect x="120" y="150" width="240" height="180" rx="8" fill="#fff" stroke={C.fuchsia} strokeWidth="3"/>
        <line x1="240" y1="150" x2="240" y2="330" stroke={C.fuchsia} strokeWidth="2"/>
        <line x1="120" y1="240" x2="360" y2="240" stroke={C.fuchsia} strokeWidth="2"/>
        {/* Reflet */}
        <path d="M140 170 L160 170 L220 230 L200 230 Z" fill={C.fuchsiaLight} opacity="0.15"/>
        <path d="M260 260 L280 260 L340 320 L320 320 Z" fill={C.fuchsiaLight} opacity="0.15"/>
      </g>

      {/* Raclette / squeegee */}
      <g style={{ transformOrigin: '320px 200px', animation: 'aec-squeegee 4s ease-in-out infinite' }}>
        <rect x="290" y="195" width="90" height="10" rx="2" fill={C.fuchsiaDeep}/>
        <rect x="290" y="205" width="90" height="4" rx="1" fill={C.dark}/>
        <rect x="330" y="205" width="6" height="60" fill={C.fuchsiaDeep}/>
        <circle cx="333" cy="270" r="8" fill={C.fuchsia}/>
      </g>

      {/* Bulles flottantes */}
      {[
        { cx: 90, cy: 120, r: 22, d: 0 },
        { cx: 400, cy: 100, r: 16, d: 0.5 },
        { cx: 80, cy: 380, r: 28, d: 1 },
        { cx: 410, cy: 380, r: 20, d: 1.5 },
        { cx: 50, cy: 260, r: 14, d: 0.8 },
        { cx: 430, cy: 260, r: 12, d: 2 },
      ].map((b, i) => (
        <g key={i} style={{ animation: `aec-float${(i%3)+1} ${5 + i}s ${b.d}s ease-in-out infinite` }}>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#hero-grad)" opacity="0.25"/>
          <circle cx={b.cx} cy={b.cy} r={b.r} fill="none" stroke={C.fuchsia} strokeWidth="1.5" opacity="0.5"/>
          <circle cx={b.cx - b.r*0.3} cy={b.cy - b.r*0.3} r={b.r*0.25} fill="#fff" opacity="0.7"/>
        </g>
      ))}

      {/* Étincelles */}
      {[
        { x: 170, y: 120 }, { x: 310, y: 115 }, { x: 380, y: 200 },
        { x: 140, y: 340 }, { x: 355, y: 360 },
      ].map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`} style={{ animation: `aec-twinkle 2.2s ${i * 0.3}s ease-in-out infinite` }}>
          <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill={C.fuchsiaGlow}/>
        </g>
      ))}

      {/* Vague base */}
      <path d="M20 460 C120 440 200 480 260 460 C340 430 400 480 460 460 L460 520 L20 520 Z" fill={C.fuchsia} opacity="0.15"/>
      <path d="M20 475 C120 455 200 495 260 475 C340 445 400 495 460 475" stroke={C.fuchsia} strokeWidth="2" fill="none" opacity="0.4"/>
    </svg>
  );
}

/* ─────── Carte zone d'intervention ─────── */
function ZoneMap({ villes = [] }) {
  const points = [
    { name: 'Caen',              x: 260, y: 200, main: true },
    { name: 'Mondeville',        x: 310, y: 210 },
    { name: 'Hérouville-St-Clair', x: 250, y: 160 },
    { name: 'Colombelles',       x: 320, y: 175 },
    { name: 'Ifs',               x: 245, y: 260 },
    { name: 'Fleury-sur-Orne',   x: 210, y: 255 },
    { name: 'Carpiquet',         x: 170, y: 200 },
    { name: 'Bretteville-sur-Odon', x: 195, y: 230 },
  ];
  return (
    <svg viewBox="0 0 520 380" style={{ width: '100%', height: 'auto', maxWidth: 560 }}>
      <defs>
        <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.fuchsiaLight} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={C.fuchsiaLight} stopOpacity="0"/>
        </radialGradient>
        <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0 L0 0 L0 30" fill="none" stroke={C.border} strokeWidth="1"/>
        </pattern>
      </defs>

      <rect width="520" height="380" fill={C.roseWhisper}/>
      <rect width="520" height="380" fill="url(#map-grid)"/>

      {/* Zone d'influence */}
      <circle cx="260" cy="210" r="140" fill="url(#map-glow)"/>
      <circle cx="260" cy="210" r="140" fill="none" stroke={C.fuchsia} strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4">
        <animate attributeName="r" values="140;148;140" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="260" cy="210" r="90" fill="none" stroke={C.fuchsia} strokeWidth="1" strokeDasharray="3 4" opacity="0.3"/>

      {/* Orne (rivière stylisée) */}
      <path d="M100 340 C180 300 220 280 260 260 C300 240 350 180 420 140"
        stroke={C.fuchsiaLight} strokeWidth="4" fill="none" opacity="0.4" strokeLinecap="round"/>

      {/* Côte */}
      <path d="M0 60 Q100 40 200 55 T420 50 L520 30 L520 0 L0 0 Z" fill={C.sky} opacity="0.7"/>
      <text x="90" y="35" fill={C.grey} fontSize="11" fontFamily={FONT} fontWeight="600" letterSpacing="2">MANCHE</text>

      {/* Villes */}
      {points.map((p, i) => (
        <g key={p.name}>
          {p.main ? (
            <>
              <circle cx={p.x} cy={p.y} r="18" fill={C.fuchsia} opacity="0.2">
                <animate attributeName="r" values="18;26;18" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx={p.x} cy={p.y} r="10" fill={C.fuchsia} stroke="#fff" strokeWidth="3"/>
              <text x={p.x} y={p.y - 18} textAnchor="middle" fill={C.fuchsiaDeep}
                fontSize="15" fontFamily={FONT} fontWeight="800">{p.name}</text>
            </>
          ) : (
            <>
              <circle cx={p.x} cy={p.y} r="5" fill={C.fuchsiaLight} stroke="#fff" strokeWidth="2"/>
              <text x={p.x + 9} y={p.y + 4} fill={C.darkSoft}
                fontSize="11" fontFamily={FONT} fontWeight="600">{p.name}</text>
            </>
          )}
        </g>
      ))}

      {/* Compass */}
      <g transform="translate(470 330)" opacity="0.4">
        <circle r="22" fill="none" stroke={C.grey} strokeWidth="1"/>
        <path d="M0 -18 L4 0 L0 18 L-4 0 Z" fill={C.fuchsia}/>
        <text y="-26" textAnchor="middle" fontSize="10" fill={C.grey} fontWeight="700">N</text>
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ══════════════════════════════════════════════════════════════ */
export default function ArcencielVitrine({ client }) {
  const {
    name = 'Arc en Ciel Propreté',
    phone = '02 31 84 54 82',
    email = 'arc.en.ciel.proprete@orange.fr',
    address = '24 rue de Lorraine — 14120 Mondeville',
    horaires = 'Du lundi au vendredi, de 8h à 12h et de 14h à 17h',
    siteUrl,
    logo = '/images/arcenciel/logo.png',
    servicesCategories = [],
    chiffres = [],
    articlePdf,
  } = client;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    document.title = `${name} — Nettoyage à Caen · Devis 24 h`;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.title = 'Sites Démo — Showcase';
    };
  }, [name]);

  /* Liens de nav */
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#pourqui',  label: 'Pour qui' },
    { href: '#process',  label: 'Méthode' },
    { href: '#zone',     label: 'Zone' },
    { href: '#contact',  label: 'Contact' },
  ];

  /* Services — depuis clients.json, enrichis */
  const services = servicesCategories.length ? servicesCategories : [
    { title: 'Nettoyage professionnel', icon: 'building', items: ['Bureaux & open spaces', 'Commerces & boutiques', 'Cabinets médicaux', 'Parties communes'] },
    { title: 'Nettoyage spécialisé', icon: 'shield', items: ['Nettoyage industriel', 'Après chantier', 'Après sinistre', 'Désinfection'] },
    { title: 'Remise en état', icon: 'home', items: ['Logements', 'Locaux professionnels', 'Biens locatifs', 'Nettoyage profond'] },
    { title: 'Services complémentaires', icon: 'sparkle', items: ['Vitrerie', 'Sols (moquette, parquet)', 'Débarras & espaces verts', 'Syndrome de Diogène'] },
  ];
  const serviceIcons = ['building', 'shield', 'home', 'sparkle'];

  const cibles = [
    { type: 'collectivites',   title: 'Collectivités',  desc: 'Mairies, écoles, crèches — un cadre propre pour les usagers et vos agents.' },
    { type: 'coproprietes',    title: 'Copropriétés',   desc: 'Parties communes impeccables, escaliers, halls, ascenseurs, abords.' },
    { type: 'professionnels',  title: 'Professionnels', desc: 'Bureaux, commerces, locaux industriels et médicaux — discrétion et efficacité.' },
    { type: 'particuliers',    title: 'Particuliers',   desc: 'Maisons, appartements, villas — ponctuel ou régulier, toujours sur-mesure.' },
  ];

  const processus = [
    { step: '01', title: 'Prise de contact', text: 'Vous nous appelez ou remplissez le formulaire — réponse garantie sous 24 h.', icon: 'phone' },
    { step: '02', title: 'Visite sur site', text: 'Nous nous déplaçons gratuitement pour évaluer la prestation adaptée.', icon: 'pin' },
    { step: '03', title: 'Devis détaillé', text: 'Vous recevez un devis clair, sans surprise, validé ensemble.', icon: 'file' },
    { step: '04', title: 'Intervention', text: 'Notre équipe intervient selon le planning convenu, avec suivi qualité.', icon: 'sparkle' },
  ];

  const avantages = [
    { icon: 'heart',  title: 'Humain d\'abord',    text: '15+ ans d\'expérience au service d\'un secteur où la confiance se gagne au quotidien.' },
    { icon: 'leaf',   title: 'Éco-labellisé',      text: 'Produits écolabellisés et méthodes respectueuses de votre santé comme de l\'environnement.' },
    { icon: 'zap',    title: 'Sur-mesure & réactif', text: 'Chaque site est unique : nous adaptons nos interventions à vos horaires et besoins.' },
    { icon: 'shield', title: 'Traçabilité complète', text: 'Cahier de suivi, contrôles qualité et référent dédié pour chaque client.' },
  ];

  const temoignages = [
    { name: 'Caroline D.', role: 'Gestionnaire de copropriété', text: 'Intervention impeccable depuis 4 ans sur plusieurs résidences. L\'équipe est stable, ponctuelle, et le contact avec la responsable toujours aussi agréable.', rating: 5 },
    { name: 'Dr Lambert',  role: 'Cabinet médical — Caen',      text: 'Nous avions besoin d\'une entreprise rigoureuse sur les protocoles de désinfection. Arc en Ciel a immédiatement compris nos exigences.', rating: 5 },
    { name: 'M. Riou',     role: 'Directeur école primaire',    text: 'Très bon suivi, personnel souriant et discret. Les enfants retrouvent des locaux propres chaque matin, c\'est essentiel.', rating: 5 },
  ];

  const faq = [
    { q: 'Sous quel délai pouvez-vous intervenir ?', a: 'Pour une prestation ponctuelle, nous pouvons généralement intervenir sous 48 à 72 h. Pour les interventions d\'urgence (sinistre, dégât des eaux), un passage peut être organisé le jour même selon les disponibilités.' },
    { q: 'Vos produits sont-ils écologiques ?',      a: 'Oui. Nous utilisons en priorité des produits éco-labellisés (Ecolabel européen) ainsi que des méthodes mécaniques (microfibres, vapeur) qui réduisent l\'usage de détergents chimiques.' },
    { q: 'Intervenez-vous pour les particuliers ?', a: 'Absolument. Nous intervenons chez les particuliers pour des prestations ponctuelles (remise en état, après déménagement) comme pour un entretien régulier de votre logement.' },
    { q: 'Comment est calculé le devis ?',           a: 'Le devis dépend de la surface, de la fréquence, des accès et de la nature des prestations. Nous nous déplaçons gratuitement pour évaluer précisément vos besoins et vous proposer un tarif juste.' },
    { q: 'Êtes-vous assurés ?',                       a: 'Oui, Arc en Ciel Propreté dispose d\'une assurance responsabilité civile professionnelle couvrant l\'intégralité de ses interventions. Les justificatifs vous sont remis sur simple demande.' },
    { q: 'Proposez-vous des contrats d\'entretien ?', a: 'Oui, nous proposons des contrats d\'entretien mensuels, hebdomadaires ou quotidiens, avec des conditions préférentielles et un référent unique pour votre site.' },
  ];

  const defaultChiffres = chiffres.length ? chiffres : [
    { value: '15+',  label: 'années d\'expérience' },
    { value: '20+',  label: 'agents qualifiés' },
    { value: '24h',  label: 'délai de devis' },
    { value: '100%', label: 'satisfaction client' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <div style={{
      fontFamily: FONT,
      background: C.bg,
      color: C.dark,
      overflowX: 'hidden',
      minHeight: '100vh',
    }}>
      {/* ══════════ STYLES GLOBAUX ══════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,600;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; background: none; }

        @keyframes aec-bubble {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-110vh) translateX(60px) scale(1.2); opacity: 0; }
        }
        @keyframes aec-twinkle {
          0%, 100% { transform: scale(0.5) rotate(0deg); opacity: 0.3; }
          50%      { transform: scale(1.1) rotate(180deg); opacity: 1; }
        }
        @keyframes aec-float1 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes aec-float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50%      { transform: translateY(-16px) translateX(8px); }
        }
        @keyframes aec-float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50%      { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes aec-squeegee {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50%      { transform: translateX(-30px) rotate(-8deg); }
        }
        @keyframes aec-shine {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes aec-gradient {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes aec-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.08); opacity: .7; }
        }
        @keyframes aec-spin-slow {
          from { transform: rotate(0); }
          to   { transform: rotate(360deg); }
        }
        @keyframes aec-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes aec-slide-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }

        .aec-shine {
          position: relative; overflow: hidden;
        }
        .aec-shine::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.4) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: aec-shine 3s ease-in-out infinite;
          pointer-events: none;
        }

        .aec-btn-primary {
          background: ${GRADIENT};
          background-size: 200% 100%;
          color: #fff;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: .02em;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: transform .25s, box-shadow .25s, background-position .4s;
          box-shadow: 0 10px 30px -10px ${C.fuchsia}70, 0 4px 10px -4px ${C.fuchsia}40;
        }
        .aec-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 40px -10px ${C.fuchsia}80, 0 8px 16px -4px ${C.fuchsia}50;
          background-position: 100% 0;
        }
        .aec-btn-secondary {
          background: #fff;
          color: ${C.fuchsia};
          padding: 16px 28px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 2px solid ${C.fuchsia};
          transition: all .25s;
        }
        .aec-btn-secondary:hover {
          background: ${C.fuchsia}; color: #fff;
          transform: translateY(-2px);
        }
        .aec-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid ${C.border};
          transition: all .4s cubic-bezier(.22,1,.36,1);
          position: relative;
          overflow: hidden;
        }
        .aec-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, ${C.fuchsia}0d, transparent 50%);
          opacity: 0;
          transition: opacity .4s;
          pointer-events: none;
        }
        .aec-card:hover {
          transform: translateY(-8px);
          border-color: ${C.fuchsia}40;
          box-shadow: 0 30px 60px -20px ${C.fuchsia}30, 0 10px 20px -6px ${C.fuchsia}15;
        }
        .aec-card:hover::before { opacity: 1; }
        .aec-nav-link {
          font-size: 14px;
          font-weight: 600;
          color: ${C.darkSoft};
          position: relative;
          padding: 6px 0;
          transition: color .2s;
        }
        .aec-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: ${GRADIENT};
          transition: width .3s;
        }
        .aec-nav-link:hover { color: ${C.fuchsia}; }
        .aec-nav-link:hover::after { width: 100%; }

        .aec-input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1.5px solid ${C.border};
          font-size: 15px;
          font-family: inherit;
          color: ${C.dark};
          background: #fff;
          transition: all .2s;
          outline: none;
        }
        .aec-input:focus {
          border-color: ${C.fuchsia};
          box-shadow: 0 0 0 4px ${C.fuchsia}20;
        }

        .aec-marquee { animation: aec-marquee 32s linear infinite; }

        @media (max-width: 900px) {
          .aec-nav-desktop { display: none !important; }
          .aec-hero-grid { grid-template-columns: 1fr !important; }
          .aec-hero-illu { max-width: 320px; margin: 20px auto 0; }
        }
        @media (min-width: 901px) {
          .aec-mobile-burger { display: none !important; }
          .aec-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ══════════ NAVIGATION ══════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 74,
        background: scrolled ? 'rgba(255,255,255,.94)' : 'rgba(255,255,255,.82)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
        boxShadow: scrolled ? `0 10px 30px -10px ${C.fuchsia}15` : 'none',
        transition: 'all .3s',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logo} alt={name} style={{ height: 48, width: 'auto', display: 'block' }} />
          </a>

          <div className="aec-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="aec-nav-link">{l.label}</a>
            ))}
            <a href="#contact" className="aec-btn-primary" style={{ padding: '12px 22px', fontSize: 13 }}>
              Devis 24 h
              <Ico name="arrowUp" size={14} color="#fff" stroke={2.4}/>
            </a>
          </div>

          <button className="aec-mobile-burger" onClick={() => setMenuOpen(v => !v)}
            style={{ padding: 8, color: C.fuchsia }}>
            <Ico name={menuOpen ? 'close' : 'menu'} size={26} color={C.fuchsia}/>
          </button>
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="aec-mobile-menu" style={{
            position: 'absolute', top: 74, left: 0, right: 0,
            background: '#fff',
            borderBottom: `1px solid ${C.border}`,
            padding: '20px 32px',
            display: 'flex', flexDirection: 'column', gap: 6,
            animation: 'aec-slide-in .25s ease',
          }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ padding: '12px 0', fontWeight: 600, color: C.darkSoft, borderBottom: `1px solid ${C.border}` }}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ padding: '14px 0', color: C.fuchsia, fontWeight: 700 }}>
              <Ico name="phone" size={16} color={C.fuchsia} stroke={2.2}/> {phone}
            </a>
          </div>
        )}
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section
        onMouseMove={e => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })}
        style={{
          position: 'relative',
          paddingTop: 134,
          paddingBottom: 100,
          background: `
            radial-gradient(ellipse at ${mouse.x}% ${mouse.y}%, ${C.roseSoft} 0%, transparent 50%),
            linear-gradient(180deg, ${C.cream} 0%, ${C.roseWhisper} 100%)
          `,
          overflow: 'hidden',
        }}
      >
        {/* Orbes décoratifs */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.fuchsiaLight}22, transparent 70%)`,
          animation: 'aec-float1 10s ease-in-out infinite',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-150px',
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.fuchsia}15, transparent 70%)`,
          animation: 'aec-float2 14s ease-in-out infinite',
          pointerEvents: 'none',
        }}/>

        <BubblesField count={12}/>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="aec-hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}>
            <div>
              <Reveal>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px',
                  background: '#fff',
                  border: `1.5px solid ${C.fuchsia}30`,
                  color: C.fuchsia,
                  borderRadius: 99,
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: '.04em', textTransform: 'uppercase',
                  marginBottom: 26,
                  boxShadow: `0 6px 16px -6px ${C.fuchsia}30`,
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: C.fuchsia,
                    boxShadow: `0 0 10px ${C.fuchsia}`,
                    animation: 'aec-pulse 2s ease-in-out infinite',
                  }}/>
                  Entreprise certifiée · Caen & Mondeville
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
                  fontWeight: 900,
                  lineHeight: 1.04,
                  letterSpacing: '-0.03em',
                  color: C.dark,
                  marginBottom: 24,
                }}>
                  L'éclat d'une propreté<br/>
                  <span style={{
                    background: GRADIENT,
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animation: 'aec-gradient 6s ease-in-out infinite',
                    fontStyle: 'italic',
                  }}>haute en couleurs.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.14}>
                <p style={{
                  fontSize: 19,
                  lineHeight: 1.65,
                  color: C.darkSoft,
                  maxWidth: 560,
                  marginBottom: 36,
                }}>
                  Depuis 2008, <strong style={{ color: C.fuchsia }}>Arc en Ciel Propreté</strong> prend soin
                  de vos bureaux, copropriétés, écoles et logements à Caen et sa périphérie.
                  Un savoir-faire humain, des produits éco-labellisés, un devis clair sous 24 h.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 44 }}>
                  <a href="#contact" className="aec-btn-primary">
                    Demander mon devis gratuit
                    <Ico name="arrow" size={16} color="#fff" stroke={2.4}/>
                  </a>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="aec-btn-secondary">
                    <Ico name="phone" size={16} color={C.fuchsia} stroke={2.2}/>
                    {phone}
                  </a>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex' }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{
                        width: 38, height: 38, borderRadius: '50%',
                        background: i%2 ? GRADIENT : `linear-gradient(135deg, ${C.rose}, ${C.fuchsiaLight})`,
                        border: '3px solid #fff',
                        marginLeft: i ? -10 : 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: 12,
                        boxShadow: `0 4px 10px -2px ${C.fuchsia}40`,
                      }}>
                        {['AC', 'MP', 'JL', 'SR'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                      {[0,1,2,3,4].map(i => (
                        <Ico key={i} name="star" size={16} color="#F9B800" stroke={0}/>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: C.grey, fontWeight: 500 }}>
                      <strong style={{ color: C.dark }}>4.9/5</strong> · 150+ clients satisfaits
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="aec-hero-illu" style={{ position: 'relative' }}>
                <HeroIllustration/>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Vague de transition */}
        <div style={{ position: 'absolute', bottom: -2, left: 0, right: 0, lineHeight: 0 }}>
          <SignatureWave color={C.fuchsia} opacity={0.12} height={80}/>
        </div>
      </section>

      {/* ══════════ TRUST BAR ══════════ */}
      <section style={{
        background: '#fff',
        padding: '56px 0 40px',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32,
          }}>
            {defaultChiffres.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  {i > 0 && (
                    <div style={{
                      display: 'none',
                      position: 'absolute',
                      left: -16, top: '50%',
                      transform: 'translateY(-50%)',
                      height: 40, width: 1,
                      background: C.border,
                    }}/>
                  )}
                  <div style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 52, fontWeight: 900,
                    background: GRADIENT,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    lineHeight: 1,
                    letterSpacing: '-.02em',
                  }}>
                    {/^\d+\+?$/.test(c.value) || /^\d+%$/.test(c.value) || /^\d+h$/.test(c.value)
                      ? c.value : <Counter value={c.value}/>}
                  </div>
                  <div style={{
                    marginTop: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.grey,
                    letterSpacing: '.04em',
                    textTransform: 'uppercase',
                  }}>
                    {c.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ INTRO / POURQUOI NOUS ══════════ */}
      <section style={{ padding: '100px 0', background: C.cream, position: 'relative' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="aec-hero-grid">
            <Reveal>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${C.fuchsia}10`,
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                Qui sommes-nous
              </span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: C.dark,
                marginBottom: 24,
                letterSpacing: '-.02em',
              }}>
                Une entreprise à<br/>
                <em style={{
                  fontStyle: 'italic', fontWeight: 600,
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>taille humaine</em>, depuis 2008.
              </h2>
              <div style={{ fontSize: 16, lineHeight: 1.8, color: C.darkSoft, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>
                  Implantée à <strong>Mondeville</strong>, Arc en Ciel Propreté est un acteur
                  reconnu du secteur de la propreté sur l'agglomération caennaise. En plus de 15 ans,
                  nous avons bâti une réputation fondée sur trois valeurs simples :
                  <strong style={{ color: C.fuchsia }}> la rigueur, l'écoute et la constance.</strong>
                </p>
                <p>
                  Notre équipe de <strong>20 agents formés</strong> intervient chez les professionnels
                  de tous secteurs — y compris le médical — ainsi qu'auprès des collectivités
                  (mairies, écoles, crèches) et des particuliers. Chaque prestation est
                  pensée sur-mesure, avec un référent dédié pour garantir un service irréprochable.
                </p>
                <p>
                  La qualité de notre travail s'appuie sur une organisation rigoureuse,
                  des collaborateurs compétents et impliqués, régulièrement formés aux
                  dernières techniques de nettoyage — et sur une exigence permanente envers
                  les produits que nous utilisons (éco-labellisés en priorité).
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ position: 'relative' }}>
                {/* Cadre photo stylisé */}
                <div style={{
                  position: 'relative',
                  borderRadius: 24,
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  background: GRADIENT,
                  boxShadow: `0 30px 60px -20px ${C.fuchsia}50`,
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                    alt="Agent d'entretien professionnel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'luminosity', opacity: 0.9 }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(180deg, transparent 50%, ${C.fuchsia}99 100%)`,
                  }}/>

                  {/* Badge flottant */}
                  <div style={{
                    position: 'absolute', top: 24, left: 24,
                    background: '#fff',
                    borderRadius: 14, padding: '12px 16px',
                    display: 'flex', alignItems: 'center', gap: 10,
                    boxShadow: `0 10px 24px -6px ${C.dark}30`,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: GRADIENT,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Ico name="leaf" size={20} color="#fff" stroke={2.4}/>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: C.grey, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>Certifié</div>
                      <div style={{ fontSize: 14, color: C.dark, fontWeight: 800 }}>Éco-labellisé</div>
                    </div>
                  </div>

                  {/* Stat overlay */}
                  <div style={{
                    position: 'absolute', bottom: 24, left: 24, right: 24,
                    color: '#fff',
                  }}>
                    <div style={{ fontSize: 12, opacity: 0.8, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 4 }}>Article de presse</div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
                      « Une propreté responsable et engagée »
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.9, marginTop: 6 }}>— Magazine Capital</div>
                  </div>
                </div>

                {/* Cercle déco */}
                <div style={{
                  position: 'absolute',
                  top: -30, right: -30,
                  width: 140, height: 140, borderRadius: '50%',
                  background: `radial-gradient(circle, ${C.fuchsiaGlow}40, transparent 70%)`,
                  animation: 'aec-float1 7s ease-in-out infinite',
                  pointerEvents: 'none',
                }}/>

                {articlePdf && (
                  <a href={articlePdf} target="_blank" rel="noopener noreferrer" style={{
                    position: 'absolute', bottom: -18, right: 20,
                    background: '#fff',
                    borderRadius: 12,
                    padding: '12px 18px',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    fontWeight: 700, fontSize: 13,
                    color: C.fuchsia,
                    boxShadow: `0 20px 40px -10px ${C.fuchsia}40`,
                    border: `1.5px solid ${C.fuchsia}`,
                    transition: 'transform .2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <Ico name="file" size={16} color={C.fuchsia} stroke={2}/>
                    Lire l'article
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" style={{ padding: '100px 0', background: '#fff', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${C.fuchsia}10`,
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Nos prestations</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: C.dark,
                marginBottom: 14,
              }}>Des services complets,<br/>
                <em style={{
                  fontStyle: 'italic', fontWeight: 600,
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>pour chaque espace.</em>
              </h2>
              <p style={{ fontSize: 17, color: C.grey, maxWidth: 600, margin: '0 auto' }}>
                Du quotidien aux interventions exceptionnelles, nos équipes maîtrisent l'ensemble des techniques.
              </p>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <article className="aec-card" style={{ padding: 32, height: '100%' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: GRADIENT,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                    boxShadow: `0 12px 24px -8px ${C.fuchsia}60`,
                    position: 'relative',
                  }}>
                    <Ico name={serviceIcons[i] || 'sparkle'} size={28} color="#fff" stroke={2}/>
                    <span style={{
                      position: 'absolute', top: -4, right: -4,
                      width: 20, height: 20, borderRadius: '50%',
                      background: '#fff', border: `2px solid ${C.fuchsia}`,
                      color: C.fuchsia, fontSize: 11, fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {i + 1}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 22, fontWeight: 700,
                    color: C.dark,
                    marginBottom: 16,
                    letterSpacing: '-.01em',
                  }}>{s.title}</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {s.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: C.darkSoft, fontSize: 14, lineHeight: 1.5 }}>
                        <Ico name="check" size={16} color={C.fuchsia} stroke={2.6}/>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ POUR QUI ══════════ */}
      <section id="pourqui" style={{
        padding: '100px 0',
        background: `linear-gradient(180deg, ${C.roseWhisper} 0%, ${C.cream} 100%)`,
        position: 'relative',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: '#fff',
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 16,
                border: `1px solid ${C.fuchsia}20`,
              }}>À qui s'adresse notre expertise</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: C.dark,
                marginBottom: 14,
              }}>Un interlocuteur,<br/>
                <em style={{
                  fontStyle: 'italic', fontWeight: 600,
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>quatre univers.</em>
              </h2>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {cibles.map((c, i) => (
              <Reveal key={c.type} delay={i * 0.1}>
                <article className="aec-card" style={{
                  padding: 28,
                  textAlign: 'center',
                  height: '100%',
                  background: '#fff',
                }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: 16,
                    borderRadius: 20,
                    background: GRADIENT_SOFT,
                    marginBottom: 20,
                    position: 'relative',
                  }}>
                    <CibleIllu type={c.type} size={100}/>
                    <Sparkles count={3}/>
                  </div>
                  <h3 style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 22, fontWeight: 700,
                    color: C.dark,
                    marginBottom: 10,
                  }}>{c.title}</h3>
                  <p style={{
                    fontSize: 14,
                    color: C.darkSoft,
                    lineHeight: 1.65,
                  }}>{c.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESSUS ══════════ */}
      <section id="process" style={{ padding: '100px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${C.fuchsia}10`,
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Notre méthode</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: C.dark,
                marginBottom: 14,
              }}>Simple. Transparent.<br/>
                <em style={{
                  fontStyle: 'italic', fontWeight: 600,
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>Efficace.</em>
              </h2>
            </div>
          </Reveal>

          <div style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 28,
          }}>
            {/* Ligne de connexion */}
            <div style={{
              position: 'absolute',
              top: 42, left: '10%', right: '10%',
              height: 2,
              background: `repeating-linear-gradient(90deg, ${C.fuchsia}50, ${C.fuchsia}50 6px, transparent 6px, transparent 12px)`,
              zIndex: 0,
            }}/>

            {processus.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.12}>
                <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 84, height: 84, borderRadius: '50%',
                    background: '#fff',
                    border: `3px solid ${C.fuchsia}`,
                    margin: '0 auto 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    boxShadow: `0 10px 24px -8px ${C.fuchsia}40`,
                  }}>
                    <Ico name={p.icon} size={32} color={C.fuchsia} stroke={2}/>
                    <span style={{
                      position: 'absolute',
                      top: -8, right: -8,
                      background: GRADIENT,
                      color: '#fff',
                      borderRadius: 8,
                      padding: '4px 8px',
                      fontSize: 11, fontWeight: 800, letterSpacing: '.05em',
                    }}>{p.step}</span>
                  </div>
                  <h3 style={{
                    fontSize: 18, fontWeight: 700,
                    color: C.dark,
                    marginBottom: 8,
                  }}>{p.title}</h3>
                  <p style={{
                    fontSize: 14,
                    color: C.grey,
                    lineHeight: 1.6,
                    maxWidth: 220,
                    margin: '0 auto',
                  }}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ AVANTAGES / ENGAGEMENTS ══════════ */}
      <section style={{
        padding: '100px 0',
        background: C.dark,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Orbes décoratifs */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.fuchsia}30, transparent 70%)`,
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: '-200px', left: '-200px',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.fuchsiaGlow}20, transparent 70%)`,
          pointerEvents: 'none',
        }}/>

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${C.fuchsia}30`,
                color: C.fuchsiaGlow,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Nos engagements</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: '#fff',
                marginBottom: 14,
              }}>Quatre raisons de<br/>
                <em style={{
                  fontStyle: 'italic', fontWeight: 600,
                  background: `linear-gradient(135deg, ${C.fuchsiaGlow}, ${C.rose})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>nous confier vos espaces.</em>
              </h2>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
            {avantages.map((a, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding: 28,
                  borderRadius: 20,
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.08)',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  transition: 'all .3s',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                    e.currentTarget.style.borderColor = `${C.fuchsia}60`;
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)';
                    e.currentTarget.style.transform = 'none';
                  }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: GRADIENT,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                  }}>
                    <Ico name={a.icon} size={24} color="#fff" stroke={2}/>
                  </div>
                  <h3 style={{
                    fontSize: 17, fontWeight: 700,
                    color: '#fff',
                    marginBottom: 10,
                  }}>{a.title}</h3>
                  <p style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,.65)',
                    lineHeight: 1.6,
                  }}>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TÉMOIGNAGES ══════════ */}
      <section style={{ padding: '100px 0', background: C.roseWhisper, position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: '#fff',
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Ils nous font confiance</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: C.dark,
                marginBottom: 14,
              }}>Parole de clients.</h2>
            </div>
          </Reveal>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {temoignages.map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <article className="aec-card" style={{ padding: 32, height: '100%', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 18, right: 18,
                    opacity: .08,
                    color: C.fuchsia,
                  }}>
                    <Ico name="quote" size={48} color={C.fuchsia} stroke={1.5}/>
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {Array.from({length: t.rating}).map((_, j) => (
                      <Ico key={j} name="star" size={16} color="#F9B800" stroke={0}/>
                    ))}
                  </div>
                  <p style={{
                    fontSize: 15,
                    lineHeight: 1.75,
                    color: C.darkSoft,
                    marginBottom: 22,
                    fontStyle: 'italic',
                  }}>« {t.text} »</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: GRADIENT,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 800, fontSize: 15,
                    }}>
                      {t.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: C.grey, marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ZONE D'INTERVENTION ══════════ */}
      <section id="zone" style={{ padding: '100px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>
          <div className="aec-hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}>
            <Reveal>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${C.fuchsia}10`,
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 20,
              }}>Zone d'intervention</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: C.dark,
                marginBottom: 20,
              }}>Caen et toute<br/>
                <em style={{
                  fontStyle: 'italic', fontWeight: 600,
                  background: GRADIENT,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}>son agglomération.</em>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: C.darkSoft, marginBottom: 26 }}>
                Depuis notre siège de Mondeville, nous intervenons rapidement sur l'ensemble
                de la couronne caennaise — rive droite, rive gauche, ouest et sud de l'agglo.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
                marginBottom: 28,
              }}>
                {['Caen', 'Mondeville', 'Hérouville-St-Clair', 'Colombelles', 'Ifs', 'Fleury-sur-Orne', 'Carpiquet', 'Bretteville-sur-Odon'].map(v => (
                  <div key={v} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 12px',
                    background: C.roseWhisper,
                    borderRadius: 8,
                    fontSize: 13, fontWeight: 600,
                    color: C.darkSoft,
                  }}>
                    <Ico name="pin" size={14} color={C.fuchsia} stroke={2.2}/>
                    {v}
                  </div>
                ))}
              </div>
              <a href="#contact" className="aec-btn-primary">
                Vérifier ma ville
                <Ico name="arrow" size={16} color="#fff" stroke={2.4}/>
              </a>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: `0 30px 60px -20px ${C.fuchsia}25`,
                border: `1px solid ${C.border}`,
              }}>
                <ZoneMap/>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section style={{ padding: '100px 0', background: C.cream }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 32px' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: `${C.fuchsia}10`,
                color: C.fuchsia,
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Questions fréquentes</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: C.dark,
              }}>Tout savoir avant de commencer.</h2>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faq.map((item, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={i} delay={i * 0.05}>
                  <div style={{
                    background: '#fff',
                    borderRadius: 14,
                    border: `1.5px solid ${open ? C.fuchsia + '40' : C.border}`,
                    overflow: 'hidden',
                    transition: 'all .3s',
                    boxShadow: open ? `0 16px 40px -10px ${C.fuchsia}20` : 'none',
                  }}>
                    <button
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      style={{
                        width: '100%',
                        padding: '22px 26px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        textAlign: 'left',
                        color: C.dark,
                      }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{item.q}</span>
                      <span style={{
                        flexShrink: 0,
                        width: 32, height: 32, borderRadius: '50%',
                        background: open ? GRADIENT : `${C.fuchsia}10`,
                        color: open ? '#fff' : C.fuchsia,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all .3s',
                      }}>
                        <Ico name={open ? 'minus' : 'plus'} size={16} color={open ? '#fff' : C.fuchsia} stroke={2.4}/>
                      </span>
                    </button>
                    <div style={{
                      maxHeight: open ? 300 : 0,
                      overflow: 'hidden',
                      transition: 'max-height .4s cubic-bezier(.22,1,.36,1)',
                    }}>
                      <div style={{
                        padding: '0 26px 22px',
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: C.darkSoft,
                      }}>
                        {item.a}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT / DEVIS ══════════ */}
      <section id="contact" style={{
        padding: '100px 0',
        background: `linear-gradient(135deg, ${C.fuchsia} 0%, ${C.fuchsiaDeep} 100%)`,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <BubblesField count={10}/>

        <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '0 32px' }}>
          <div className="aec-hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 60,
            alignItems: 'center',
          }}>
            <Reveal>
              <span style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: 'rgba(255,255,255,.15)',
                color: '#fff',
                borderRadius: 6,
                fontSize: 12, fontWeight: 700,
                letterSpacing: '.1em', textTransform: 'uppercase',
                marginBottom: 20,
                backdropFilter: 'blur(10px)',
              }}>Contact · Devis 24h</span>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                letterSpacing: '-.02em',
                color: '#fff',
                marginBottom: 24,
              }}>Parlons de<br/>votre projet.</h2>
              <p style={{ fontSize: 17, opacity: 0.9, lineHeight: 1.7, marginBottom: 36 }}>
                Un besoin ponctuel, un contrat régulier ou simplement une question ?
                Notre équipe vous répond sous 24 h ouvrées.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <a href={`tel:${phone.replace(/\s/g, '')}`} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: 16,
                  background: 'rgba(255,255,255,.1)',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,.15)',
                  transition: 'all .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.18)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(255,255,255,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ico name="phone" size={20} color="#fff" stroke={2}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 2 }}>Téléphone</div>
                    <div style={{ fontSize: 17, fontWeight: 700 }}>{phone}</div>
                  </div>
                </a>

                <a href={`mailto:${email}`} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: 16,
                  background: 'rgba(255,255,255,.1)',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,.15)',
                  transition: 'all .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.18)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(255,255,255,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Ico name="mail" size={20} color="#fff" stroke={2}/>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 14, fontWeight: 600, wordBreak: 'break-all' }}>{email}</div>
                  </div>
                </a>

                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: 16,
                  background: 'rgba(255,255,255,.1)',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,.15)',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(255,255,255,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Ico name="clock" size={20} color="#fff" stroke={2}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 2 }}>Horaires</div>
                    <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{horaires}</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: 16,
                  background: 'rgba(255,255,255,.1)',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,.15)',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(255,255,255,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Ico name="pin" size={20} color="#fff" stroke={2}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 2 }}>Adresse</div>
                    <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>{address}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={handleFormSubmit} style={{
                background: '#fff',
                borderRadius: 24,
                padding: 36,
                color: C.dark,
                boxShadow: `0 40px 80px -20px ${C.fuchsiaDeep}60`,
              }}>
                <h3 style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 24, fontWeight: 700,
                  marginBottom: 8,
                  color: C.dark,
                }}>Demander un devis gratuit</h3>
                <p style={{ fontSize: 14, color: C.grey, marginBottom: 26 }}>
                  Réponse sous 24 h · Sans engagement · Déplacement offert
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.darkSoft, marginBottom: 6, display: 'block', letterSpacing: '.02em' }}>Prénom *</label>
                    <input required type="text" className="aec-input" placeholder="Claire"/>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.darkSoft, marginBottom: 6, display: 'block', letterSpacing: '.02em' }}>Nom *</label>
                    <input required type="text" className="aec-input" placeholder="Dupont"/>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.darkSoft, marginBottom: 6, display: 'block', letterSpacing: '.02em' }}>Email *</label>
                    <input required type="email" className="aec-input" placeholder="claire@exemple.fr"/>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: C.darkSoft, marginBottom: 6, display: 'block', letterSpacing: '.02em' }}>Téléphone</label>
                    <input type="tel" className="aec-input" placeholder="06 00 00 00 00"/>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.darkSoft, marginBottom: 6, display: 'block', letterSpacing: '.02em' }}>Type de besoin *</label>
                  <select required className="aec-input" defaultValue="">
                    <option value="" disabled>Sélectionnez…</option>
                    <option>Nettoyage de bureaux</option>
                    <option>Entretien copropriété</option>
                    <option>Collectivité (mairie, école)</option>
                    <option>Nettoyage après chantier / sinistre</option>
                    <option>Remise en état logement</option>
                    <option>Vitrerie</option>
                    <option>Autre — à préciser</option>
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: C.darkSoft, marginBottom: 6, display: 'block', letterSpacing: '.02em' }}>Votre message</label>
                  <textarea rows={4} className="aec-input" placeholder="Surface approximative, fréquence souhaitée, spécificités…" style={{ resize: 'vertical' }}/>
                </div>
                <button type="submit" className="aec-btn-primary aec-shine" style={{
                  width: '100%', justifyContent: 'center',
                  padding: '18px 32px', fontSize: 16,
                }}>
                  {formSent ? '✓ Demande envoyée !' : 'Envoyer ma demande'}
                  {!formSent && <Ico name="arrow" size={18} color="#fff" stroke={2.4}/>}
                </button>
                <p style={{ fontSize: 12, color: C.grey, textAlign: 'center', marginTop: 14 }}>
                  🔒 Vos informations restent strictement confidentielles.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{
        background: C.dark,
        color: 'rgba(255,255,255,.7)',
        padding: '60px 0 30px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 40,
            marginBottom: 50,
          }} className="aec-hero-grid">
            <div>
              <div style={{
                background: '#fff', borderRadius: 10, padding: 10,
                display: 'inline-block', marginBottom: 20,
              }}>
                <img src={logo} alt={name} style={{ height: 46, display: 'block' }}/>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 380 }}>
                Entreprise de nettoyage professionnelle à Caen et Mondeville depuis 2008.
                Des prestations sur-mesure pour professionnels, collectivités, copropriétés et particuliers.
              </p>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Services</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Bureaux & commerces', 'Copropriétés', 'Collectivités', 'Après sinistre', 'Vitrerie'].map(s => (
                  <li key={s}><a href="#services" style={{ fontSize: 13, transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = C.fuchsiaGlow}
                    onMouseLeave={e => e.currentTarget.style.color = ''}>{s}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Zone</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Caen', 'Mondeville', 'Hérouville', 'Colombelles', 'Ifs'].map(v => (
                  <li key={v} style={{ fontSize: 13 }}>{v}</li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>Contact</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <li><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
                <li><a href={`mailto:${email}`} style={{ wordBreak: 'break-all' }}>{email}</a></li>
                <li style={{ lineHeight: 1.5 }}>{address}</li>
              </ul>
            </div>
          </div>

          <div style={{
            paddingTop: 30,
            borderTop: '1px solid rgba(255,255,255,.1)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            fontSize: 12,
            color: 'rgba(255,255,255,.5)',
          }}>
            <div>© {new Date().getFullYear()} {name} — SARL au capital de 200 000 €</div>
            <div style={{ display: 'flex', gap: 18 }}>
              <a href="#">Mentions légales</a>
              <a href="#">Confidentialité</a>
              <Link to="/demos" style={{ color: C.fuchsiaGlow, fontWeight: 700 }}>← Retour démos Kyrio</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* CTA flottant mobile */}
      <a href={`tel:${phone.replace(/\s/g, '')}`} style={{
        position: 'fixed',
        bottom: 20, right: 20,
        width: 60, height: 60, borderRadius: '50%',
        background: GRADIENT,
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 10px 30px -6px ${C.fuchsia}80`,
        zIndex: 90,
        animation: 'aec-pulse 2.5s ease-in-out infinite',
      }}>
        <Ico name="phone" size={24} color="#fff" stroke={2.2}/>
      </a>
    </div>
  );
}
