import { Routes, Route, Link, useParams } from 'react-router-dom';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import KyrioVitrine from './KyrioVitrine.jsx';

// Vitrines démos : chargement différé — le bundle initial n'embarque pas
// le code des 4 sites clients tant qu'un visiteur n'ouvre pas /demos/:slug.
const ArcencielVitrine          = lazy(() => import('./ArcencielVitrine.jsx'));
const DesignContemporainVitrine = lazy(() => import('./DesignContemporainVitrine.jsx'));
const CarentanVitrine           = lazy(() => import('./CarentanVitrine.jsx'));
const SiteVitrine               = lazy(() => import('./SiteVitrine.jsx'));

function DemoLoading() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#08090f', color: 'rgba(240,240,248,.55)',
      fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, letterSpacing: '.06em',
    }}>
      Chargement…
    </div>
  );
}

/* ─────────────────────────────────────────────
   App : charge les clients et gère le routing
   ─────────────────────────────────────────── */
export default function App() {
  const [clients, setClients] = useState({});

  useEffect(() => {
    fetch('/clients.json')
      .then(r => r.ok ? r.json() : {})
      .then(setClients)
      .catch(() => {});
  }, []);

  return (
    <Routes>
      <Route path="/" element={<KyrioVitrine />} />
      <Route path="/demos" element={<Showcase clients={clients} />} />
      <Route
        path="/demos/:slug"
        element={
          <Suspense fallback={<DemoLoading />}>
            <DemoSite clients={clients} />
          </Suspense>
        }
      />
    </Routes>
  );
}

/* ═══════════════════════════════════════════════
   KYRIO LOGO — K (background-image crop) + yrio.
   PNG 669×373 · K bbox: x[236-431] y[72-300]
   ═══════════════════════════════════════════════ */
function KyrioMark({ size = 42, dark = false, opacity = 1 }) {
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

/* ═══════════════════════════════════════════════
   ICÔNE SVG légère — réutilisée dans le Showcase
   ═══════════════════════════════════════════════ */
function SIcon({ name, size = 18, color = 'currentColor' }) {
  const s = { width: size, height: size, display: 'block', flexShrink: 0 };
  const p = { stroke: color, strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  const d = {
    arrowUpRight: <path d="M7 17L17 7M17 7H7M17 7v10" {...p}/>,
    globe:        <><circle cx="12" cy="12" r="10" {...p}/><line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={1.6}/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" {...p}/></>,
    check:        <polyline points="20 6 9 17 4 12" {...p} strokeWidth={1.8}/>,
    sun:          <><circle cx="12" cy="12" r="5" {...p}/><line x1="12" y1="1" x2="12" y2="3" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="12" y1="21" x2="12" y2="23" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="1" y1="12" x2="3" y2="12" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="21" y1="12" x2="23" y2="12" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke={color} strokeWidth={1.6} strokeLinecap="round"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke={color} strokeWidth={1.6} strokeLinecap="round"/></>,
    moon:         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" {...p}/>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{d[name]||null}</svg>;
}

/* ═══════════════════════════════════════════════
   PAGE D'ACCUEIL — SHOWCASE
   ═══════════════════════════════════════════════ */

function Showcase({ clients }) {
  const entries    = Object.values(clients).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const hasClients = entries.length > 0;
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark]         = useState(true);

  useEffect(() => {
    document.title = 'Sites Démo — Kyrio';
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Palettes dark / light */
  const K = dark ? {
    bg:      '#08090f',
    bg2:     '#0c0d14',
    surface: '#0f1018',
    border:  'rgba(255,255,255,.07)',
    accent:  '#84cc16',
    accentGrad: 'linear-gradient(135deg, #818cf8, #22d3ee)',
    txt:     '#f0f0f8',
    txt2:    'rgba(240,240,248,.55)',
    muted:   'rgba(240,240,248,.3)',
    dot:     'rgba(255,255,255,.035)',
    blob1:   'rgba(129,140,248,.08)',
    blob2:   'rgba(99,102,241,.06)',
    navBg:   'rgba(8,9,15,.92)',
    cardBg:  '#0f1018',
    cardBdr: 'rgba(255,255,255,.07)',
    cardHov: 'rgba(99,102,241,.18)',
    shadow:  'rgba(0,0,0,.35)',
    thumb:   '#13141f',
    footerBdr:'rgba(255,255,255,.06)',
  } : {
    bg:      '#f4f4f6',
    bg2:     '#eaeaef',
    surface: '#ffffff',
    border:  'rgba(0,0,0,.07)',
    accent:  '#4f46e5',
    accentGrad: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    txt:     '#0d0f18',
    txt2:    'rgba(13,15,24,.55)',
    muted:   'rgba(13,15,24,.35)',
    dot:     'rgba(0,0,0,.04)',
    blob1:   'rgba(99,102,241,.07)',
    blob2:   'rgba(99,102,241,.05)',
    navBg:   'rgba(244,244,246,.94)',
    cardBg:  '#ffffff',
    cardBdr: 'rgba(0,0,0,.08)',
    cardHov: 'rgba(79,70,229,.2)',
    shadow:  'rgba(0,0,0,.1)',
    thumb:   '#e8e8ee',
    footerBdr:'rgba(0,0,0,.07)',
  };

  const accentRgb = dark ? '132,204,22' : '79,70,229';

  return (
    <div style={{ minHeight: '100vh', background: K.bg, color: K.txt, fontFamily: "'Inter', system-ui, sans-serif", transition: 'background .35s, color .35s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes sc-orbit1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes kyrio-dot-orbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes sc-orbit2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes sc-orbit3{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes sc-orbit3d{from{transform:perspective(600px) rotateX(60deg) rotateZ(0deg)}to{transform:perspective(600px) rotateX(60deg) rotateZ(360deg)}}
        @keyframes sc-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        @keyframes sc-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes sc-spin{to{transform:rotate(360deg)}}
        @keyframes sc-slidein{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .sc-card{transition:all .35s cubic-bezier(.22,1,.36,1);cursor:pointer;}
        .sc-card:hover{transform:translateY(-7px);}
        .sc-card:hover .sc-thumb{transform:scale(1.05);}
        .sc-thumb{transition:transform .6s cubic-bezier(.22,1,.36,1);}
        .sc-arrow{transition:all .3s cubic-bezier(.22,1,.36,1);}
        .sc-card:hover .sc-arrow{transform:rotate(0deg) scale(1.1);}
        .sc-nav-link{font-size:13px;font-weight:500;text-decoration:none;letter-spacing:.03em;transition:color .2s;}
        .sc-toggle{transition:all .25s;}
        .sc-toggle:hover{transform:scale(1.08);}
        .sc-stat{animation:sc-slidein .5s ease both;}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? K.navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: `1px solid ${scrolled ? K.border : 'transparent'}`,
        height: 64, padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all .3s',
      }}>
        {/* Logo Kyrio */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <KyrioMark size={42} dark={dark} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {[['/', 'Accueil'], ['#demos', 'Réalisations']].map(([href, label]) => (
            href.startsWith('/') ? (
              <Link key={label} to={href} className="sc-nav-link" style={{ color: K.txt2 }}
                onMouseEnter={e => e.currentTarget.style.color = K.accent}
                onMouseLeave={e => e.currentTarget.style.color = K.txt2}>{label}</Link>
            ) : (
              <a key={label} href={href} className="sc-nav-link" style={{ color: K.txt2 }}
                onMouseEnter={e => e.currentTarget.style.color = K.accent}
                onMouseLeave={e => e.currentTarget.style.color = K.txt2}>{label}</a>
            )
          ))}

          {/* Toggle dark/light */}
          <button className="sc-toggle" onClick={() => setDark(d => !d)} style={{
            width: 40, height: 40, borderRadius: '50%', border: `1.5px solid ${K.border}`,
            background: K.surface, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SIcon name={dark ? 'sun' : 'moon'} size={17} color={K.txt2} />
          </button>

          <Link to="/" style={{
            fontSize: 12, fontWeight: 700, color: '#fff',
            background: K.accentGrad, borderRadius: 7, padding: '9px 18px',
            textDecoration: 'none', letterSpacing: '.04em', transition: 'filter .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
            onMouseLeave={e => e.currentTarget.style.filter = 'none'}>
            Site Kyrio →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header style={{ position: 'relative', overflow: 'hidden', padding: '100px 48px 120px', textAlign: 'center' }}>
        {/* Arcs orbitaux */}
        <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, pointerEvents: 'none', opacity: dark ? 0.12 : 0.08 }} viewBox="0 0 700 700" fill="none">
          <defs>
            <linearGradient id="sc-og1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={dark ? '#818cf8' : '#6366f1'} /><stop offset="100%" stopColor={dark ? '#22d3ee' : '#06b6d4'} /></linearGradient>
            <linearGradient id="sc-og2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={dark ? '#22d3ee' : '#06b6d4'} /><stop offset="100%" stopColor={dark ? '#818cf8' : '#6366f1'} /></linearGradient>
          </defs>
          <g style={{ animation: 'sc-orbit1 25s linear infinite', transformOrigin: '350px 350px' }}>
            <circle cx="350" cy="350" r="280" stroke="url(#sc-og1)" strokeWidth="2" strokeLinecap="round" strokeDasharray="500 260" fill="none" />
          </g>
          <g style={{ animation: 'sc-orbit2 35s linear infinite', transformOrigin: '350px 350px' }}>
            <circle cx="350" cy="350" r="220" stroke="url(#sc-og2)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="400 200" fill="none" />
          </g>
          <g style={{ animation: 'sc-orbit3 18s linear infinite', transformOrigin: '350px 350px' }}>
            <circle cx="350" cy="350" r="160" stroke="#84cc16" strokeWidth="1" strokeLinecap="round" strokeDasharray="200 300" fill="none" opacity="0.5" />
          </g>
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(99,102,241,.1)', animation: 'sc-orbit3d 30s linear infinite', pointerEvents: 'none' }} />

        {/* Grille de points */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${K.dot} 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        {/* Déco : vrai logo K en fond */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -52%)', opacity: dark ? .04 : .05, pointerEvents: 'none', userSelect: 'none' }}>
          <KyrioMark size={340} dark={dark} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 740, margin: '0 auto' }}>

          {/* Badge pulsant */}
          <FadeIn>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `rgba(${accentRgb},.07)`, border: `1px solid rgba(${accentRgb},.25)`,
              borderRadius: 40, padding: '7px 18px', marginBottom: 32,
              fontSize: 12, fontWeight: 700, color: K.accent, letterSpacing: '.08em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: K.accent, boxShadow: `0 0 10px ${K.accent}`, animation: 'sc-pulse 2s ease-in-out infinite' }} />
              {entries.length} projet{entries.length !== 1 ? 's' : ''} en ligne · Kyrio
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.035em', marginBottom: 12, color: K.txt }}>
              Des sites qui
            </h1>
            <h1 style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', fontWeight: 900, lineHeight: 1.04, letterSpacing: '-0.035em', marginBottom: 28, background: K.accentGrad, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              convertissent vraiment.
            </h1>
          </FadeIn>

          <FadeIn delay={0.14}>
            <p style={{ fontSize: 18, color: K.txt2, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 48px' }}>
              Pas des mockups Dribbble. De vraies réalisations, pour de vraies entreprises —&nbsp;
              <span style={{ color: K.txt, fontWeight: 600 }}>avec de vrais résultats.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#demos" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: K.accentGrad, color: '#fff',
                borderRadius: 8, padding: '13px 28px', fontSize: 14, fontWeight: 800,
                textDecoration: 'none', letterSpacing: '.03em', transition: 'filter .2s, transform .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; }}>
                Explorer les démos
                <SIcon name="arrowUpRight" size={16} color="#fff" />
              </a>
              <Link to="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: K.txt, borderRadius: 8,
                border: `1px solid ${K.border}`, padding: '13px 28px',
                fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '.03em', transition: 'border-color .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = K.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = K.border}>
                Retour au site
              </Link>
            </div>
          </FadeIn>

          {/* Stats mini */}
          <FadeIn delay={0.28}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 36, marginTop: 56, flexWrap: 'wrap' }}>
              {[
                { v: '7j', l: 'Délai moyen', color: '#6366f1' },
                { v: '100%', l: 'Sur-mesure', color: '#10b981' },
                { v: '<24h', l: 'Réponse devis', color: '#ec4899' },
              ].map((s, i) => (
                <div key={i} className="sc-stat" style={{ animationDelay: `${.3 + i * .08}s`, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color, letterSpacing: '-.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: K.muted, letterSpacing: '.06em', textTransform: 'uppercase', marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Ligne déco bas */}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: 1, background: `linear-gradient(90deg, transparent, rgba(${accentRgb},.2), transparent)` }} />
      </header>

      {/* ── GRILLE DÉMOS ── */}
      <main id="demos" style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 40px 120px' }}>
        {hasClients ? (
          <>
            <FadeIn style={{ marginBottom: 52 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 3, height: 28, background: K.accentGrad, borderRadius: 2 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', letterSpacing: '.1em', textTransform: 'uppercase' }}>Réalisations Kyrio</div>
                    <div style={{ fontSize: 13, color: K.muted, marginTop: 2 }}>{entries.length} projet{entries.length !== 1 ? 's' : ''} · Chaque site est unique</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: K.muted, fontStyle: 'italic' }}>Cliquez pour explorer ↓</div>
              </div>
            </FadeIn>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 22 }}>
              {entries.map((c, i) => (
                <FadeIn key={c.slug} delay={i * 0.08}>
                  <ClientCard client={c} K={K} dark={dark} accentRgb={accentRgb} />
                </FadeIn>
              ))}
            </div>
          </>
        ) : (
          <EmptyState K={K} />
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${K.footerBdr}`, padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: .55 }}>
          <KyrioMark size={22} dark={dark} opacity={0.5} />
          <span style={{ fontSize: 12, color: K.muted }}>· Sites démo · Prospection commerciale</span>
        </div>
        <Link to="/" style={{ fontSize: 12, color: K.muted, textDecoration: 'none', letterSpacing: '.04em', transition: 'color .2s' }}
          onMouseEnter={e => e.currentTarget.style.color = K.accent}
          onMouseLeave={e => e.currentTarget.style.color = K.muted}>
          ← Retour au site Kyrio
        </Link>
      </footer>
    </div>
  );
}

/* ── CARTE CLIENT ── */
function ClientCard({ client, K, dark, accentRgb }) {
  const { slug, name, tagline, sector, heroImage, logo, primaryColor = '#6366f1' } = client;
  const [hovered, setHovered] = useState(false);
  const thumb = heroImage || logo;

  return (
    <Link
      to={`/demos/${slug}`}
      className="sc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', borderRadius: 14, overflow: 'hidden', textDecoration: 'none',
        background: K.cardBg,
        border: `1px solid ${hovered ? K.cardHov : K.cardBdr}`,
        boxShadow: hovered
          ? `0 28px 64px ${K.shadow}, 0 0 0 1px rgba(${accentRgb},.1)`
          : `0 2px 16px ${K.shadow}`,
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 210, overflow: 'hidden', position: 'relative', background: K.thumb }}>
        {thumb ? (
          <img src={thumb} alt="" className="sc-thumb" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
            <SIcon name="globe" size={40} color={`rgba(${accentRgb},.2)`} />
            <span style={{ fontSize: 11, color: `rgba(${accentRgb},.3)`, letterSpacing: '.08em', textTransform: 'uppercase' }}>Aperçu bientôt</span>
          </div>
        )}
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${K.cardBg}cc 0%, transparent 50%)`, opacity: hovered ? 1 : 0, transition: 'opacity .4s' }} />
        {/* Badge secteur */}
        {sector && (
          <span style={{
            position: 'absolute', top: 14, left: 14,
            background: dark ? 'rgba(8,9,15,.72)' : 'rgba(255,255,255,.88)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'}`,
            borderRadius: 5, padding: '4px 10px',
            fontSize: 10, fontWeight: 700, color: K.txt, letterSpacing: '.07em', textTransform: 'uppercase',
          }}>
            {sector}
          </span>
        )}
        {/* Dot live */}
        <span style={{
          position: 'absolute', top: 14, right: 14,
          width: 9, height: 9, borderRadius: '50%',
          background: K.accent, boxShadow: `0 0 10px rgba(${accentRgb},.7)`,
          animation: 'sc-pulse 2.5s ease-in-out infinite',
        }} />
        {/* Label hover */}
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: `translateX(-50%) translateY(${hovered ? 0 : 8}px)`,
          opacity: hovered ? 1 : 0, transition: 'all .3s',
          background: K.accentGrad, color: '#fff',
          borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
        }}>
          Voir la démo →
        </div>
      </div>

      {/* Corps */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, color: K.txt, margin: '0 0 5px', letterSpacing: '-.02em' }}>{name}</h3>
            {tagline && <p style={{ fontSize: 13, color: K.txt2, lineHeight: 1.6, margin: 0 }}>{tagline}</p>}
          </div>
          <div className="sc-arrow" style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
            border: `1.5px solid ${hovered ? K.accent : K.cardBdr}`,
            background: hovered ? K.accentGrad : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
          }}>
            <SIcon name="arrowUpRight" size={15} color={hovered ? '#fff' : K.txt2} />
          </div>
        </div>

        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${K.cardBdr}`, display: 'flex', alignItems: 'center', gap: 6 }}>
          <SIcon name="check" size={13} color={K.accent} />
          <span style={{ fontSize: 12, color: K.accent, fontWeight: 600, letterSpacing: '.04em' }}>Démo disponible</span>
        </div>
      </div>
    </Link>
  );
}

/* ── ÉTAT VIDE ── */
function EmptyState({ K }) {
  return (
    <FadeIn>
      <div style={{ textAlign: 'center', padding: '80px 24px', maxWidth: 460, margin: '0 auto' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, border: `1px solid ${K.border}`, background: K.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'sc-float 3s ease-in-out infinite' }}>
          <SIcon name="globe" size={28} color={K.accent} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: K.txt }}>Aucune démo pour l'instant</h2>
        <p style={{ fontSize: 14, color: K.txt2, lineHeight: 1.7 }}>
          Ajoutez un client dans <code style={{ background: K.surface, padding: '2px 8px', borderRadius: 4, fontSize: 12, color: K.accent, border: `1px solid ${K.border}` }}>public/clients.json</code> et il apparaîtra ici.
        </p>
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════
   PAGE DÉMO — affiche le site d'un client
   ═══════════════════════════════════════════════ */

function DemoSite({ clients }) {
  const { slug } = useParams();
  const client = clients[slug];

  useEffect(() => {
    if (client?.name) {
      document.title = `${client.name} — Démo`;
    }
    return () => { document.title = 'Sites Démo — Showcase'; };
  }, [client]);

  if (!client) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
        background: '#fafafa', padding: 24,
      }}>
        <div style={{ fontSize: 64, marginBottom: 8 }}>🔍</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>Démo introuvable</h2>
        <p style={{ color: '#64748b', fontSize: 15 }}>
          Le site <code style={{ background: '#f1f5f9', padding: '2px 8px', borderRadius: 6 }}>{slug}</code> n'existe pas.
        </p>
        <Link to="/demos" style={{
          marginTop: 12, padding: '12px 28px', background: '#6366f1', color: '#fff',
          borderRadius: 10, fontSize: 14, fontWeight: 600,
          transition: 'transform .2s',
        }}>
          ← Retour aux démos
        </Link>
      </div>
    );
  }

  if (client.template === 'carentan') {
    return <CarentanVitrine client={client} />;
  }
  if (client.template === 'design-contemporain') {
    return <DesignContemporainVitrine client={client} />;
  }
  if (client.template === 'arcenciel') {
    return <ArcencielVitrine client={client} />;
  }
  if (client.template === 'site-vitrine') {
    return <SiteVitrine client={client} />;
  }

  return <VitrineGenerique client={client} />;
}

/* ═══════════════════════════════════════════════
   VITRINE GÉNÉRIQUE — fallback pour tout client
   ═══════════════════════════════════════════════ */

function VitrineGenerique({ client }) {
  const {
    name, tagline, description, phone, email, address,
    services = [], heroImage, logo, primaryColor = '#6366f1',
  } = client;

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e8ecf2', padding: '14px 24px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {logo && <img src={logo} alt="" style={{ height: 32, borderRadius: 6 }} />}
            <span style={{ fontWeight: 700, fontSize: 16 }}>{name}</span>
          </div>
          <Link to="/demos" style={{ fontSize: 13, fontWeight: 600, color: primaryColor }}>← Toutes les démos</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        position: 'relative',
        padding: heroImage ? 0 : '80px 24px',
        minHeight: heroImage ? 420 : 'auto',
        background: heroImage ? '#111' : `linear-gradient(135deg, ${primaryColor}11, ${primaryColor}06)`,
        display: 'flex', alignItems: 'center',
      }}>
        {heroImage && (
          <>
            <img src={heroImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,.7), transparent)' }} />
          </>
        )}
        <div style={{
          position: 'relative', zIndex: 1,
          maxWidth: 960, margin: '0 auto', padding: heroImage ? '80px 24px' : '0',
          color: heroImage ? '#fff' : '#1a1a2e',
        }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.15 }}>{name}</h1>
          {tagline && <p style={{ fontSize: 19, opacity: 0.8, maxWidth: 500 }}>{tagline}</p>}
        </div>
      </section>

      {/* Contenu */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>
        {description && (
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>À propos</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, fontSize: 16 }}>{description}</p>
          </div>
        )}

        {services.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Services</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {services.map((s, i) => (
                <span key={i} style={{
                  padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 500,
                  background: primaryColor + '0d', color: primaryColor,
                  border: `1px solid ${primaryColor}20`,
                }}>
                  {typeof s === 'string' ? s : s.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {(phone || email || address) && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Contact</h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}>
              {phone && <ContactCard icon="📞" label="Téléphone" value={phone} href={`tel:${phone.replace(/\s/g, '')}`} color={primaryColor} />}
              {email && <ContactCard icon="✉️" label="Email" value={email} href={`mailto:${email}`} color={primaryColor} />}
              {address && <ContactCard icon="📍" label="Adresse" value={address} color={primaryColor} />}
            </div>
          </div>
        )}
      </section>

      <footer style={{
        textAlign: 'center', padding: '24px', fontSize: 13, color: '#94a3b8',
        borderTop: '1px solid #e2e8f0',
      }}>
        {name} — Site de démonstration ·{' '}
        <Link to="/demos" style={{ color: primaryColor, fontWeight: 600 }}>Retour aux démos</Link>
      </footer>
    </div>
  );
}

function ContactCard({ icon, label, value, href, color }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href} style={{
      padding: 20, borderRadius: 12, background: '#f8fafc',
      border: '1px solid #e2e8f0', textDecoration: 'none', color: 'inherit',
      transition: 'border-color .2s',
    }}>
      <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{icon}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ display: 'block', fontSize: 15, fontWeight: 600, marginTop: 4, color: href ? color : '#1a1a2e' }}>{value}</span>
    </Tag>
  );
}

/* ═══════════════════════════════════════════════
   UTILITAIRE — Animation fade-in au scroll
   ═══════════════════════════════════════════════ */

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}s, transform .6s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}
