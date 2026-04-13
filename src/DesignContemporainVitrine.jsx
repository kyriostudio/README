import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Palette ── */
const C = {
  bg:      '#f7f5f0',
  bgAlt:   '#eeece7',
  white:   '#ffffff',
  dark:    '#1c1a17',
  dark2:   '#2e2b25',
  muted:   '#7a7063',
  light:   '#a89880',
  gold:    '#b8915a',
  goldDim: '#b8915a18',
  border:  '#e0d9ce',
  border2: '#ccc4b6',
};

/* ── Icônes SVG premium ── */
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.5 }) {
  const s = { width: size, height: size, display: 'block', flexShrink: 0 };
  const paths = {
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    arrowUpRight: <path d="M7 17L17 7M17 7H7M17 7v10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    mapPin: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    clock: <><circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M12 6v6l4 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /></>,
    truck: <><rect x="1" y="3" width="15" height="13" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M16 8h4l3 3v5h-7V8z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="5.5" cy="18.5" r="2.5" stroke={color} strokeWidth={strokeWidth} fill="none" /><circle cx="18.5" cy="18.5" r="2.5" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    gift: <><polyline points="20 12 20 22 4 22 4 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /><rect x="2" y="7" width="20" height="5" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    store: <><path d="M3 9l1-6h16l1 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /><rect x="5" y="15" width="4" height="7" stroke={color} strokeWidth={strokeWidth} fill="none" /><rect x="13" y="13" width="6" height="9" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M3 9v13h18V9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth={strokeWidth} fill={color} />,
    starEmpty: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke={color} strokeWidth={strokeWidth} fill="none" />,
    celebration: <><path d="M5.8 11.3L2 22l10.7-3.79" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /><path d="M22 2L11 13M13 11l-4 9 9-4-5-5z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
    location: <><circle cx="12" cy="10" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M12 2a8 8 0 018 8c0 5.4-8 14-8 14S4 15.4 4 10a8 8 0 018-8z" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    sofa: <><path d="M3 11V8a2 2 0 012-2h14a2 2 0 012 2v3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /><path d="M1 11h22v7a2 2 0 01-2 2H3a2 2 0 01-2-2v-7z" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M5 20v2M19 20v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    chair: <><path d="M6 20V8a4 4 0 014-4h4a4 4 0 014 4v12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /><path d="M4 12h16v4H4z" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M6 20h12M8 20v2M16 20v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    table: <><path d="M3 6h18v2H3z" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M7 8v12M17 8v12M5 20h4M15 20h4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    lamp: <><path d="M12 2L8 10h8L12 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M12 10v10M8 20h8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
    bed: <><path d="M3 9V5a1 1 0 011-1h16a1 1 0 011 1v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" /><path d="M1 12h22v7H1z" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M1 19v2M23 19v2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /><rect x="5" y="9" width="5" height="3" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" /><rect x="14" y="9" width="5" height="3" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" /></>,
    rug: <><rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={strokeWidth} fill="none" /><path d="M3 8h18M3 12h18M3 16h18M8 3v18M16 3v18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" /></>,
  };
  if (!paths[name]) return null;
  return <svg viewBox="0 0 24 24" style={s}>{paths[name]}</svg>;
}

/* ── FadeIn ── */
function FadeIn({ children, delay = 0, style = {}, direction = 'up' }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const from = direction === 'up' ? 'translateY(32px)' : direction === 'left' ? 'translateX(-24px)' : direction === 'right' ? 'translateX(24px)' : 'scale(.97)';
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : from,
      transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Marquee ── */
function Marquee({ items }) {
  const list = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{
        display: 'flex', gap: 60,
        animation: 'marquee 28s linear infinite',
        width: 'max-content',
      }}>
        {list.map((b, i) => (
          <span key={i} style={{ fontSize: 13, fontWeight: 700, color: C.light, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Séparateur ── */
function Sep({ color = C.gold, width = 48 }) {
  return <div style={{ width, height: 2, background: color, borderRadius: 2, margin: '16px 0 24px' }} />;
}

/* ── COMPOSANT PRINCIPAL ── */
export default function DesignContemporainVitrine() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    document.title = 'Design Contemporain — Mobilier premium à Caen';
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const BRANDS = ['Leolux', 'Pode', 'Artifort', 'Steiner Paris', 'Dallagnese', 'Midj', 'Sovet Italia', 'Serge Lesage', 'SLAMP', 'Presotto', 'Milano Bedding', 'Ozzio Design', 'Bontempi Casa'];

  const CATEGORIES = [
    { label: 'Canapés', sub: 'Fixes & convertibles', icon: 'sofa',  img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', count: '45+', anchor: '#contact' },
    { label: 'Fauteuils', sub: 'Design & relax',      icon: 'chair', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', count: '60+', anchor: '#contact' },
    { label: 'Tables', sub: 'Repas & basses',          icon: 'table', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600&q=80', count: '30+', anchor: '#contact' },
    { label: 'Tapis', sub: 'Serge Lesage & plus',      icon: 'rug',   img: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80', count: '80+', anchor: '#contact' },
    { label: 'Luminaires', sub: 'SLAMP & éditions',    icon: 'lamp',  img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', count: '40+', anchor: '#contact' },
    { label: 'Chambres', sub: 'Lits, dressings & plus', icon: 'bed', img: 'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=600&q=80', count: '25+', anchor: '#contact' },
  ];

  const OFFRES = [
    {
      badge: '-40%',
      label: 'Tapis Serge Lesage',
      desc: 'Sélection de tapis premium, éditions exclusives',
      priceOld: '3 021 €',
      price: '2 416 €',
      img: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&q=80',
      color: '#d4a853',
    },
    {
      badge: '-20%',
      label: 'Jours Sensation',
      desc: 'Sur toute la collection Serge Lesage jusqu\'au 4 avril',
      priceOld: null,
      price: '-20% appliqué',
      img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80',
      color: C.gold,
    },
    {
      badge: 'EXPO',
      label: 'Leolux & Pode',
      desc: 'Pièces d\'exposition à prix exceptionnels — édition limitée',
      priceOld: '4 650 €',
      price: 'Prix expo',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
      color: '#8b7355',
    },
  ];

  const TEMOIGNAGES = [
    { nom: 'Marie-Claire V.', ville: 'Caen', text: 'Un showroom exceptionnel, des conseils d\'une grande qualité. J\'ai trouvé le canapé Leolux de mes rêves après 18 ans de recherche. L\'équipe est passionnée et vraiment à l\'écoute.', note: 5 },
    { nom: 'Frédéric D.', ville: 'Bayeux', text: 'Design Contemporain, c\'est le meilleur adresse de mobilier en Normandie. Les marques proposées sont introuvables ailleurs dans la région. Service impeccable, livraison soignée.', note: 5 },
    { nom: 'Sophie & Marc L.', ville: 'Hérouville', text: 'Nous avons refait tout notre salon avec leurs conseils. Le résultat est au-delà de nos espérances. Une vraie différence avec les grandes enseignes.', note: 5 },
  ];

  const SERVICES = [
    { icon: 'truck',  title: 'Livraison soignée', desc: 'Livraison à domicile avec installation par nos équipes spécialisées' },
    { icon: 'gift',   title: 'Listes cadeaux',    desc: 'Listes de mariage et cadeaux, digitales ou en magasin' },
    { icon: 'shield', title: 'Garantie fabricant', desc: 'Garantie complète sur tous nos produits, SAV réactif' },
    { icon: 'store',  title: 'Click & Collect',   desc: 'Réservez en ligne, retirez directement en expo à Caen' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.bg, color: C.dark, minHeight: '100vh' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:none } }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        .dc-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${C.dark}; color: ${C.bg}; border: none;
          padding: 14px 28px; border-radius: 4px; font-size: 13px;
          font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; text-decoration: none; transition: all .25s;
        }
        .dc-btn-primary:hover { background: ${C.dark2}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(28,26,23,.18); }
        .dc-btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${C.gold}; color: #fff; border: none;
          padding: 14px 28px; border-radius: 4px; font-size: 13px;
          font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; text-decoration: none; transition: all .25s;
        }
        .dc-btn-gold:hover { filter: brightness(1.08); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,145,90,.3); }
        .dc-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${C.dark};
          border: 1.5px solid ${C.dark}; padding: 12px 24px; border-radius: 4px;
          font-size: 13px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; text-decoration: none; transition: all .25s;
        }
        .dc-btn-outline:hover { background: ${C.dark}; color: ${C.bg}; transform: translateY(-2px); }
        .cat-card { transition: all .3s cubic-bezier(.22,1,.36,1); cursor: pointer; }
        .cat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(28,26,23,.14); }
        .cat-card:hover .cat-img { transform: scale(1.06); }
        .cat-img { transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .offre-card { transition: all .3s; cursor: pointer; }
        .offre-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(28,26,23,.12); }
        .nav-link { color: ${C.muted}; text-decoration: none; font-size: 13px; font-weight: 500; letter-spacing: .04em; transition: color .2s; }
        .nav-link:hover { color: ${C.dark}; }
        .star { color: ${C.gold}; font-size: 14px; }
        .service-card { transition: all .25s; }
        .service-card:hover { background: ${C.white} !important; box-shadow: 0 8px 28px rgba(28,26,23,.08); transform: translateY(-3px); }
        .brand-link { text-decoration: none; transition: color .2s; }
        .brand-link:hover { color: ${C.gold} !important; }
      `}</style>

      {/* ══ NAVIGATION ══ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(247,245,240,.97)' : C.bg,
        borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
        backdropFilter: 'blur(12px)',
        transition: 'all .3s',
        boxShadow: scrolled ? '0 2px 20px rgba(28,26,23,.08)' : 'none',
      }}>
        {/* Barre supérieure */}
        <div style={{ background: C.dark, padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 12, color: 'rgba(247,245,240,.6)', letterSpacing: '.04em', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="celebration" size={13} color={C.gold} strokeWidth={1.8} />
            Jours Sensation Serge Lesage — <strong style={{ color: C.gold }}>-20% jusqu'au 4 avril</strong>
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="tel:0231747690" style={{ fontSize: 12, color: 'rgba(247,245,240,.6)', textDecoration: 'none', letterSpacing: '.02em', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="phone" size={12} color="rgba(247,245,240,.5)" strokeWidth={1.8} />
              02 31 74 76 90
            </a>
            <span style={{ fontSize: 12, color: 'rgba(247,245,240,.2)' }}>|</span>
            <span style={{ fontSize: 12, color: 'rgba(247,245,240,.6)', letterSpacing: '.02em', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Icon name="location" size={12} color="rgba(247,245,240,.5)" strokeWidth={1.8} />
              173 rue Saint Jean, Caen
            </span>
          </div>
        </div>

        {/* Nav principale */}
        <div style={{ padding: '0 40px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1400, margin: '0 auto' }}>
          {/* Logo */}
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.dark, letterSpacing: '.02em', lineHeight: 1.1 }}>
              Design
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: C.gold, letterSpacing: '.02em', lineHeight: 1.1 }}>
              Contemporain
            </div>
          </div>

          {/* Menu central */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {['Canapés & Fauteuils', 'Tables & Rangements', 'Tapis', 'Luminaires', 'Promotions'].map(item => (
              <a key={item} href="#collections" className="nav-link">{item}</a>
            ))}
          </div>

          {/* Actions droite */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a href="#contact" className="dc-btn-gold" style={{ padding: '10px 20px', fontSize: 12 }}>
              Visiter le showroom
            </a>
            <Link to="/demos" style={{ fontSize: 12, color: C.muted, textDecoration: 'none', letterSpacing: '.03em' }}>← Démos</Link>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ position: 'relative', height: '92vh', minHeight: 600, overflow: 'hidden' }}>
        {/* Image de fond */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?w=1800&q=85)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
        }} />
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(28,26,23,.75) 0%, rgba(28,26,23,.45) 55%, transparent 100%)',
        }} />

        {/* Contenu */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 8%' }}>
          <div style={{ maxWidth: 620 }}>
            <FadeIn>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `${C.gold}25`, border: `1px solid ${C.gold}50`,
                borderRadius: 2, padding: '6px 16px', marginBottom: 28,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold, boxShadow: `0 0 8px ${C.gold}` }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: C.gold, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  18 ans d'expertise — Caen
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 700, color: '#fff', lineHeight: 1.1,
                letterSpacing: '-.02em', marginBottom: 24,
              }}>
                L'art du<br />
                <span style={{ fontStyle: 'italic', color: C.gold }}>mobilier</span><br />
                contemporain
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,.75)', lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
                Distributeur exclusif des plus grandes marques européennes de design — Leolux, Artifort, Pode, Serge Lesage et bien d'autres — depuis 2006 à Caen.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#collections" className="dc-btn-gold">
                  Découvrir les collections
                </a>
                <a href="#contact" className="dc-btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  Nous rendre visite
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Indicateurs de scroll */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}>
          <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: C.gold, animation: 'shimmer 2s ease-in-out infinite', height: '40%' }} />
          </div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Défiler</span>
        </div>
      </section>

      {/* ══ CHIFFRES CLÉS ══ */}
      <section style={{ background: C.dark, padding: '40px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { v: '18+', l: "Années d'expertise" },
            { v: '150+', l: 'Références en stock' },
            { v: '13', l: 'Marques exclusives' },
            { v: '3 500+', l: 'Clients satisfaits' },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.08} style={{ borderRight: i < 3 ? `1px solid rgba(247,245,240,.1)` : 'none', padding: '24px 36px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: C.gold, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 12, color: 'rgba(247,245,240,.5)', marginTop: 8, letterSpacing: '.06em', textTransform: 'uppercase' }}>{s.l}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ MARQUEE MARQUES ══ */}
      <div style={{ background: C.bgAlt, padding: '20px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <Marquee items={BRANDS} />
      </div>

      {/* ══ SECTION À PROPOS ══ */}
      <section style={{ padding: '100px 40px', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <FadeIn direction="left">
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Notre histoire</span>
            <Sep />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: C.dark, lineHeight: 1.2, marginBottom: 24, letterSpacing: '-.02em' }}>
              Depuis plus de 18 ans,<br />
              <span style={{ fontStyle: 'italic', color: C.gold }}>nous recherchons avec vous</span><br />
              l'intérieur qui vous ressemble
            </h2>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85, marginBottom: 20 }}>
              Design Contemporain est né d'une passion pour l'objet bien conçu, le mobilier qui dure et l'intérieur qui raconte une histoire. Situé au cœur de Caen, notre showroom de 500 m² expose en permanence plus de 150 références soigneusement sélectionnées auprès des meilleurs fabricants européens.
            </p>
            <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85, marginBottom: 36 }}>
              Notre approche est simple : prendre le temps de vous comprendre, proposer des pièces qui correspondent à votre style de vie, et vous accompagner de la sélection jusqu'à la livraison.
            </p>
            <a href="#collections" className="dc-btn-primary">Explorer le showroom</a>
          </div>
        </FadeIn>

        <FadeIn direction="right" delay={0.15}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -20, right: -20, bottom: 20, left: 20,
              background: C.bgAlt, borderRadius: 4, zIndex: 0,
            }} />
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
              alt="Showroom Design Contemporain"
              style={{ width: '100%', height: 520, objectFit: 'cover', borderRadius: 4, position: 'relative', zIndex: 1, display: 'block' }}
            />
            {/* Badge flottant */}
            <div style={{
              position: 'absolute', bottom: 40, left: -30, zIndex: 2,
              background: C.white, borderRadius: 4, padding: '16px 20px',
              boxShadow: '0 12px 40px rgba(28,26,23,.14)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.goldDim, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="shield" size={17} color={C.gold} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Distributeur exclusif</div>
                <div style={{ fontSize: 11, color: C.muted }}>Leolux · Artifort · Pode</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══ CATÉGORIES ══ */}
      <section id="collections" style={{ background: C.bgAlt, padding: '100px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Univers produits</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: C.dark, marginTop: 12, letterSpacing: '-.02em' }}>
              Toutes nos collections
            </h2>
            <p style={{ fontSize: 16, color: C.muted, marginTop: 16, maxWidth: 480, margin: '16px auto 0' }}>
              Des canapés aux luminaires, plus de 500 références disponibles en showroom et sur commande.
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {CATEGORIES.map((cat, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <a
                  href={cat.anchor}
                  className="cat-card"
                  style={{
                    display: 'block', textDecoration: 'none',
                    background: C.white, borderRadius: 6, overflow: 'hidden',
                    border: `1px solid ${C.border}`,
                  }}
                  onMouseEnter={() => setActiveCategory(i)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {/* Photo */}
                  <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="cat-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Badge compteur */}
                    <div style={{
                      position: 'absolute', top: 14, right: 14,
                      background: 'rgba(28,26,23,.75)', backdropFilter: 'blur(6px)',
                      color: '#fff', borderRadius: 3,
                      padding: '4px 10px', fontSize: 11, fontWeight: 600, letterSpacing: '.06em',
                    }}>
                      {cat.count} modèles
                    </div>
                    {/* Icône catégorie */}
                    <div style={{
                      position: 'absolute', bottom: 14, left: 14,
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(247,245,240,.92)', backdropFilter: 'blur(6px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={cat.icon} size={17} color={C.gold} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Footer carte */}
                  <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 3 }}>{cat.label}</div>
                      <div style={{ fontSize: 12, color: C.light, letterSpacing: '.02em' }}>{cat.sub}</div>
                    </div>
                    {/* Flèche SVG premium */}
                    <div style={{
                      width: 40, height: 40,
                      borderRadius: '50%',
                      border: `1.5px solid ${activeCategory === i ? C.gold : C.border2}`,
                      background: activeCategory === i ? C.gold : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .3s cubic-bezier(.22,1,.36,1)',
                      flexShrink: 0,
                    }}>
                      <Icon
                        name="arrowUpRight"
                        size={16}
                        color={activeCategory === i ? '#fff' : C.muted}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION IMAGE ÉDITORIALE ══ */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1800&q=80"
          alt="Ambiance Design Contemporain"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,26,23,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FadeIn style={{ textAlign: 'center', color: '#fff', maxWidth: 640, padding: '0 24px' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.4, letterSpacing: '-.01em' }}>
              «&nbsp;Un intérieur qui vous ressemble, des objets qui durent.&nbsp;»
            </p>
            <div style={{ width: 40, height: 1, background: C.gold, margin: '24px auto 0' }} />
          </FadeIn>
        </div>
      </section>

      {/* ══ OFFRES EN COURS ══ */}
      <section style={{ padding: '100px 40px', background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Offres limitées</span>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: C.dark, marginTop: 8, letterSpacing: '-.02em' }}>
                  Promotions en cours
                </h2>
              </div>
              <a href="#contact" className="dc-btn-outline" style={{ marginBottom: 4 }}>Toutes les offres</a>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {OFFRES.map((o, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="offre-card"
                  style={{ background: C.white, borderRadius: 6, overflow: 'hidden', border: `1px solid ${C.border}` }}
                >
                  <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                    <img src={o.img} alt={o.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .5s' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, background: o.color, color: '#fff', borderRadius: 2, padding: '5px 12px', fontSize: 12, fontWeight: 800, letterSpacing: '.06em' }}>
                      {o.badge}
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 4, letterSpacing: '.04em', textTransform: 'uppercase' }}>{o.label}</div>
                    <p style={{ fontSize: 15, color: C.dark, lineHeight: 1.5, marginBottom: 16 }}>{o.desc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
                      <div>
                        {o.priceOld && <div style={{ fontSize: 12, color: C.muted, textDecoration: 'line-through', marginBottom: 2 }}>{o.priceOld}</div>}
                        <div style={{ fontSize: 18, fontWeight: 700, color: o.color }}>{o.price}</div>
                      </div>
                      <a href="#contact" className="dc-btn-primary" style={{ padding: '10px 18px', fontSize: 12 }}>Voir en expo</a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MARQUES ══ */}
      <section style={{ background: C.dark, padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Nos partenaires</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#fff', marginTop: 12, letterSpacing: '-.01em' }}>
              Des marques d'exception
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(247,245,240,.5)', marginTop: 12 }}>
              Distributeur exclusif en Normandie des plus grandes maisons européennes
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            {[
              { name: 'Leolux', desc: 'Pays-Bas · Design hollandais', since: 'depuis 1974' },
              { name: 'Artifort', desc: 'Pays-Bas · Icônes du design', since: 'depuis 1890' },
              { name: 'Pode', desc: 'Pays-Bas · Mobilier contemporain', since: 'depuis 1952' },
              { name: 'Serge Lesage', desc: 'France · Tapis artisanaux', since: 'depuis 1952' },
              { name: 'Steiner Paris', desc: 'France · Luxe à la française', since: 'depuis 1880' },
              { name: 'Dallagnese', desc: 'Italie · Dressings & chambres', since: 'depuis 1947' },
              { name: 'SLAMP', desc: 'Italie · Luminaires design', since: 'depuis 1994' },
              { name: 'Midj', desc: 'Italie · Chaises & tabourets', since: 'depuis 1987' },
            ].map((b, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div style={{
                  padding: '28px 24px',
                  borderRight: i % 4 !== 3 ? '1px solid rgba(247,245,240,.08)' : 'none',
                  borderBottom: i < 4 ? '1px solid rgba(247,245,240,.08)' : 'none',
                  transition: 'background .2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(247,245,240,.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 6 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(247,245,240,.4)', marginBottom: 4 }}>{b.desc}</div>
                  <div style={{ fontSize: 11, color: C.gold, letterSpacing: '.04em' }}>{b.since}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ padding: '80px 40px', background: C.bgAlt }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Notre engagement</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: C.dark, marginTop: 12 }}>
              Une expérience sans compromis
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="service-card" style={{ background: C.white, borderRadius: 6, padding: '28px 24px', border: `1px solid ${C.border}`, textAlign: 'center' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: C.goldDim, border: `1.5px solid ${C.gold}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 18px',
                  }}>
                    <Icon name={s.icon} size={22} color={C.gold} strokeWidth={1.6} />
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 10 }}>{s.title}</div>
                  <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TÉMOIGNAGES ══ */}
      <section style={{ padding: '100px 40px', background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Avis clients</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: C.dark, marginTop: 12 }}>
              Ils nous font confiance
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TEMOIGNAGES.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: C.white, borderRadius: 6, padding: '32px', border: `1px solid ${C.border}`, position: 'relative' }}>
                  <div style={{ fontSize: 40, color: C.border2, fontFamily: 'Georgia, serif', position: 'absolute', top: 16, left: 24, lineHeight: 1, userSelect: 'none' }}>"</div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 20, paddingTop: 20 }}>
                    {[0,1,2,3,4].map(j => <Icon key={j} name="star" size={14} color={C.gold} strokeWidth={0} />)}
                  </div>
                  <p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: C.goldDim, border: `2px solid ${C.gold}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: C.gold,
                    }}>
                      {t.nom[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{t.nom}</div>
                      <div style={{ fontSize: 12, color: C.light }}>📍 {t.ville}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT & LOCALISATION ══ */}
      <section id="contact" style={{ background: C.dark, padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <FadeIn direction="left">
            <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.14em', textTransform: 'uppercase' }}>Nous rendre visite</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#fff', marginTop: 12, marginBottom: 28, lineHeight: 1.2 }}>
              Venez vivre<br />
              <span style={{ fontStyle: 'italic', color: C.gold }}>l'expérience</span><br />
              en showroom
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(247,245,240,.6)', lineHeight: 1.8, marginBottom: 36 }}>
              Notre showroom de 500 m² est ouvert du mardi au samedi. Vous pourrez y toucher, tester et vous approprier chaque pièce, accompagnés par nos conseillers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              {[
                { iconName: 'location', label: 'Adresse', value: '173, rue Saint Jean — 14000 Caen' },
                { iconName: 'phone',    label: 'Téléphone', value: '02 31 74 76 90', href: 'tel:0231747690' },
                { iconName: 'clock',    label: 'Horaires', value: 'Mar–Ven 10h–12h30 · 14h–19h — Sam 10h–19h' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 4, background: 'rgba(184,145,90,.12)', border: `1px solid ${C.gold}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={c.iconName} size={18} color={C.gold} strokeWidth={1.6} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(247,245,240,.4)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 3 }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} style={{ fontSize: 15, color: C.gold, textDecoration: 'none', fontWeight: 500 }}>{c.value}</a>
                      : <div style={{ fontSize: 15, color: 'rgba(247,245,240,.8)', lineHeight: 1.5 }}>{c.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <a href="tel:0231747690" className="dc-btn-gold">Appeler maintenant</a>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            {/* Carte simulée */}
            <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative', height: 420, background: '#1a1a2e', border: `1px solid rgba(247,245,240,.1)` }}>
              <iframe
                title="Design Contemporain Caen"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2614.378!2d-0.3635!3d49.1831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480a44eb1a5f2b33%3A0x0!2s173+rue+Saint+Jean%2C+14000+Caen!5e0!3m2!1sfr!2sfr!4v1"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy"
              />
              {/* Overlay avec info */}
              <div style={{
                position: 'absolute', bottom: 16, left: 16, right: 16,
                background: 'rgba(28,26,23,.92)', backdropFilter: 'blur(8px)',
                borderRadius: 6, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                border: `1px solid rgba(184,145,90,.2)`,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 4, background: C.goldDim, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="store" size={19} color={C.gold} strokeWidth={1.6} />
              </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: '#fff' }}>Design Contemporain</div>
                  <div style={{ fontSize: 12, color: 'rgba(247,245,240,.5)', marginTop: 2 }}>173 rue Saint Jean · 14000 Caen</div>
                </div>
                <a href="https://maps.google.com/?q=Design+Contemporain+Caen" target="_blank" rel="noreferrer"
                  style={{ marginLeft: 'auto', fontSize: 11, color: C.gold, textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Itinéraire →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: '#0e0d0a', padding: '48px 40px 28px', borderTop: `1px solid rgba(184,145,90,.15)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            {/* Colonne 1 */}
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>Design</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, fontStyle: 'italic', color: C.gold, lineHeight: 1.1, marginBottom: 20 }}>Contemporain</div>
              <p style={{ fontSize: 13.5, color: 'rgba(247,245,240,.45)', lineHeight: 1.8, maxWidth: 300 }}>
                Showroom de mobilier design haut de gamme à Caen — distributeur exclusif des plus grandes maisons européennes depuis 2006.
              </p>
            </div>

            {/* Colonnes liens */}
            {[
              { title: 'Collections', items: ['Canapés', 'Fauteuils', 'Tables & Buffets', 'Tapis', 'Luminaires', 'Chambres'] },
              { title: 'Marques', items: ['Leolux', 'Artifort', 'Pode', 'Serge Lesage', 'Steiner Paris', 'SLAMP'] },
              { title: 'Services', items: ['Livraison', 'Garantie', 'Click & Collect', 'Listes cadeaux', 'Expo permanente', 'Contact'] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.items.map((item, j) => (
                    <li key={j}><a href="#" className="brand-link" style={{ fontSize: 13.5, color: 'rgba(247,245,240,.45)', textDecoration: 'none' }}>{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(247,245,240,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 12, color: 'rgba(247,245,240,.3)' }}>© 2006–2025 Design Contemporain — Tous droits réservés</span>
            <span style={{ fontSize: 12, color: 'rgba(247,245,240,.25)' }}>
              Site démo réalisé par{' '}
              <Link to="/" style={{ color: C.gold, textDecoration: 'none', fontWeight: 600 }}>Kyrio</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
