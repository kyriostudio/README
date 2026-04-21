import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ASSETS, ACCES_RAPIDES, BLOC_MAIRIE_LINKS, DEMARCHES_LINKS, HISTOIRE_PDFS, INFOS_LINKS, LINKS, PATRIMOINE_LINKS } from './carentanSiteData.js';
import { HERO_TITLE_SLIDE_URLS } from './carentanHeroSlides.js';
import { CARENTAN_EASTER_EGGS } from './carentanEasterEggs.js';

/**
 * Maquette « Mairie de Carentan-les-Marais » — structure inspirée de
 * https://carentanlesmarais.fr/ (contenu maquette, pas une copie du site officiel).
 */

const DEFAULTS = {
  name: 'Mairie de Carentan-les-Marais',
  tagline: 'Commune nouvelle du Cotentin — Manche (50)',
  phone: '02 33 42 00 55',
  address: 'Place de la République — 50500 Carentan-les-Marais',
  siteUrl: 'https://carentanlesmarais.fr',
  heroImage: ASSETS.heroPrincipal,
  primaryColor: '#005A70',
};

const NAV_PRIMARY = [
  { id: 'accueil', label: 'Accueil', icon: 'rooster' },
  { id: 'acces-rapides', label: 'Accès rapides', icon: 'signpost' },
  { id: 'mairie', label: 'La Mairie', icon: 'townhall' },
  { id: 'demarches', label: 'Démarches', icon: 'paper' },
  { id: 'infos', label: 'Infos pratiques', icon: 'market' },
];
const NAV_MORE = [
  { id: 'patrimoine', label: 'Patrimoine', icon: 'church' },
  { id: 'culture', label: 'Culture', icon: 'music' },
  { id: 'memoire', label: 'Débarquement', icon: 'parachute' },
  { id: 'urgence', label: 'Urgences', icon: 'cross' },
  { id: 'histoire', label: 'Histoire', icon: 'book' },
];
const NAV_CONTACT = { id: 'contact', label: 'Contact', icon: 'mail' };
const NAV_MOBILE = [...NAV_PRIMARY, ...NAV_MORE, NAV_CONTACT];


function Icon({ name, size = 16, color = 'currentColor', style }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    style: { display: 'block', ...style },
  };
  const stroke = { stroke: color, strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (name) {
    case 'parachute':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3c-4.6 0-8.5 3.2-9.5 7.6 3.1-2 6.3-3 9.5-3s6.4 1 9.5 3C20.5 6.2 16.6 3 12 3Z" />
          <path {...stroke} d="M3 10.6l7 8.9m11-8.9-7 8.9" />
          <path {...stroke} d="M12 7.6V21" />
        </svg>
      );
    case 'townhall':
      return (
        <svg {...common}>
          <path {...stroke} d="M4 10h16" />
          <path {...stroke} d="M6 10V20m4-10V20m4-10V20m4-10V20" />
          <path {...stroke} d="M3 10 12 4l9 6" />
          <path {...stroke} d="M4 20h16" />
        </svg>
      );
    case 'paper':
      return (
        <svg {...common}>
          <path {...stroke} d="M7 3h7l3 3v15H7V3Z" />
          <path {...stroke} d="M14 3v4h4" />
          <path {...stroke} d="M9 11h6M9 15h6M9 19h4" />
        </svg>
      );
    case 'market':
      return (
        <svg {...common}>
          <path {...stroke} d="M4 10h16l-1 11H5L4 10Z" />
          <path {...stroke} d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case 'church':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 2v4" />
          <path {...stroke} d="M10.8 4.2h2.4" />
          <path {...stroke} d="M6 11 12 7l6 4v10H6V11Z" />
          <path {...stroke} d="M10 21v-5a2 2 0 0 1 4 0v5" />
        </svg>
      );
    case 'music':
      return (
        <svg {...common}>
          <path {...stroke} d="M9 18a2 2 0 1 1-1-1.73V6l11-2v10" />
          <path {...stroke} d="M20 17a2 2 0 1 1-1-1.73V4" />
        </svg>
      );
    case 'cross':
      return (
        <svg {...common}>
          <path {...stroke} d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6V4Z" />
        </svg>
      );
    case 'book':
      return (
        <svg {...common}>
          <path {...stroke} d="M4 5.5C4 4.1 5.1 3 6.5 3H20v18H6.5A2.5 2.5 0 0 0 4 23V5.5Z" />
          <path {...stroke} d="M4 19.5C4 18.1 5.1 17 6.5 17H20" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <path {...stroke} d="M4 7h16v10H4V7Z" />
          <path {...stroke} d="m4 7 8 6 8-6" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <path {...stroke} d="M7 3v2M17 3v2M4 9h16M5 5h14a2 2 0 0 1 2 2v12H3V7a2 2 0 0 1 2-2Z" />
          <path {...stroke} d="M8 13h2M12 13h2M16 13h2M8 17h2M12 17h2" />
        </svg>
      );
    case 'mapPin':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
          <path {...stroke} d="M12 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
        </svg>
      );
    case 'idCard':
      return (
        <svg {...common}>
          <path {...stroke} d="M4 7h16v12H4V7Z" />
          <path {...stroke} d="M8 11a2 2 0 1 0 0 .01" />
          <path {...stroke} d="M6 16h4M14 11h4M14 15h3" />
        </svg>
      );
    case 'recycle':
      return (
        <svg {...common}>
          <path {...stroke} d="M9 21H5a2 2 0 0 1-2-2v-4M16 3h4a2 2 0 0 1 2 2v4M16 21h4a2 2 0 0 0 2-2v-4M8 3H4a2 2 0 0 0-2 2v4" />
          <path {...stroke} d="m9 9 3-6 3 6M9 15l3 6 3-6" />
        </svg>
      );
    case 'school':
      return (
        <svg {...common}>
          <path {...stroke} d="M4 10 12 6l8 4-8 4-8-4Z" />
          <path {...stroke} d="M6 11.5V17l6 3 6-3v-5.5" />
          <path {...stroke} d="M12 22V13" />
        </svg>
      );
    case 'droplet':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3s6 7.2 6 11a6 6 0 1 1-12 0c0-3.8 6-11 6-11Z" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 21s-7-4.9-7-10.2A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 7 4.8C19 16.1 12 21 12 21Z" />
        </svg>
      );
    case 'vote':
      return (
        <svg {...common}>
          <path {...stroke} d="M9 11h6M9 15h4M4 5h16v14H4V5Z" />
          <path {...stroke} d="M8 3h8v2H8V3Z" />
        </svg>
      );
    case 'building':
      return (
        <svg {...common}>
          <path {...stroke} d="M6 10V20M10 10V20M14 10V20M18 10V20M4 20h16" />
          <path {...stroke} d="M6 10 12 6l6 4" />
          <path {...stroke} d="M9 14h2M15 14h2" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3 5 7v6c0 5 4 8 7 8s7-3 7-8V7l-7-4Z" />
          <path {...stroke} d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'scroll':
      return (
        <svg {...common}>
          <path {...stroke} d="M8 4h10a2 2 0 0 1 2 2v12H8V4Z" />
          <path {...stroke} d="M6 6H4v12h2M6 18v2h10v-2" />
          <path {...stroke} d="M10 8h6M10 10h6M10 12h4" />
        </svg>
      );

    case 'rooster':
      return (
        <svg {...common}>
          <path {...stroke} d="M12 6c-2.2 0-4 1.8-4 4v8" />
          <path {...stroke} d="M8 10c0-2 1.6-3.6 3.6-3.6 1.1 0 2.1.4 2.8 1.2" />
          <path {...stroke} d="M8 18c0 1.7 1.3 3 3 3h3" />
          <path {...stroke} d="M15 9.2c2 .1 3.5 1.8 3.5 3.8 0 2.1-1.7 3.8-3.8 3.8H12" />
          <path {...stroke} d="M15.5 3.5c.8 1.1.8 2.4 0 3.5" />
        </svg>
      );
    case 'signpost':
    default:
      return (
        <svg {...common}>
          <path {...stroke} d="M12 3v18" />
          <path {...stroke} d="M6 6h10l2 2-2 2H6V6Z" />
          <path {...stroke} d="M6 12h8l2 2-2 2H6v-4Z" />
        </svg>
      );
  }
}

function CarHistoryEgg({ id, icon, title, text, slot: eggSlot, openId, setOpenId }) {
  const open = openId === id;
  const isHero = eggSlot === 'hero';
  const btnRef = useRef(null);
  const [popGeom, setPopGeom] = useState(null);

  useLayoutEffect(() => {
    if (!open || !btnRef.current) {
      setPopGeom(null);
      return;
    }
    const place = () => {
      const el = btnRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const popW = Math.min(300, window.innerWidth - 24);
      let left = rect.left + rect.width / 2 - popW / 2;
      left = Math.max(12, Math.min(left, window.innerWidth - popW - 12));
      const gap = 12;
      const preferBelow = rect.top < 130;
      if (preferBelow) {
        setPopGeom({ left, width: popW, placement: 'below', top: rect.bottom + gap });
      } else {
        setPopGeom({ left, width: popW, placement: 'above', anchorTop: rect.top - gap });
      }
    };
    place();
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open, id]);

  const popNode =
    open && popGeom ? (
      <div
        className={`car-egg-pop car-egg-pop--portal car-egg-pop--${popGeom.placement}`}
        style={
          popGeom.placement === 'above'
            ? {
                left: popGeom.left,
                width: popGeom.width,
                top: popGeom.anchorTop,
                transform: 'translateY(-100%)',
              }
            : {
                left: popGeom.left,
                width: popGeom.width,
                top: popGeom.top,
              }
        }
        role="dialog"
        aria-label={title}
      >
        <div className="car-egg-pop-strip" aria-hidden />
        <div className="car-egg-pop-inner">
          <span className="car-egg-badge">Découverte</span>
          <span className="car-egg-tit">{title}</span>
          <p className="car-egg-txt">{text}</p>
        </div>
      </div>
    ) : null;

  return (
    <span className={`car-egg-wrap${open ? ' car-egg-wrap--open' : ''}`}>
      <button
        ref={btnRef}
        type="button"
        className={`car-egg-btn${isHero ? ' car-egg-btn--hero' : ''}`}
        aria-label={title}
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpenId(open ? null : id);
        }}
      >
        <Icon name={icon} size={isHero ? 18 : 17} color={isHero ? '#c9fdf0' : 'var(--car-forest)'} />
      </button>
      {typeof document !== 'undefined' && popNode ? createPortal(popNode, document.body) : null}
    </span>
  );
}


export default function CarentanVitrine({ client: clientIn }) {
  const client = { ...DEFAULTS, ...clientIn };
  const { name, phone, address, siteUrl, primaryColor } = client;

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const navMoreRef = useRef(null);
  const [heroTitleSlide, setHeroTitleSlide] = useState(0);
  const [openEggId, setOpenEggId] = useState(null);

  useEffect(() => {
    document.title = name + ' — maquette';
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      setScrollPct(h > 0 ? (doc.scrollTop / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [name]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.car-reveal').forEach((el) => el.classList.add('car-reveal-visible'));
      return;
    }
    const els = document.querySelectorAll('.car-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('car-reveal-visible');
        });
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.07 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onDoc = (e) => {
      if (navMoreRef.current && !navMoreRef.current.contains(e.target)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [moreOpen]);

  useEffect(() => {
    const slides = HERO_TITLE_SLIDE_URLS;
    if (!slides?.length) return;
    const id = window.setInterval(() => {
      setHeroTitleSlide((i) => (i + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!openEggId) return;
    const close = () => setOpenEggId(null);
    const onDoc = (e) => {
      if (!e.target.closest(".car-egg-wrap") && !e.target.closest(".car-egg-pop--portal")) close();
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [openEggId]);
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);


  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const eggsFor = (slot) => CARENTAN_EASTER_EGGS.filter((e) => e.slot === slot);

  const cultureLinks = [
    { key: 'ag', label: 'Agenda municipal', sub: 'Événements et rendez-vous', href: LINKS.agenda },
    { key: 'sc', label: 'Saison culturelle', sub: 'Théâtre, spectacles', href: LINKS.saisonCulturelle },
    { key: 'mu', label: 'Musées & mapping', sub: 'D-Day Experience, projections…', href: LINKS.musees },
    { key: 'ps', label: "Pass'Sport", sub: 'Aide aux associations sportives', href: LINKS.passSport },
  ];

  return (
    <div
      className="car-root"
      style={{
        minHeight: '100vh',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        color: 'var(--car-ink)',
        background: 'var(--car-paper)',
        ['--car-forest']: primaryColor,
        ['--car-mint']: '#52D1A3',
        ['--car-ink']: '#1a3a42',
        ['--car-muted']: '#4a6570',
        ['--car-paper']: '#f5faf8',
        ['--car-paper2']: '#e8f4f0',
        ['--car-accent']: '#52D1A3',
        ['--car-mist']: '#cfe8df',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
        .car-root * { box-sizing: border-box; }
        .car-root { padding-left: max(6px, env(safe-area-inset-left, 0px)); overflow-x: clip; }
        .car-root a { color: inherit; text-decoration: none; }
        .car-display { font-family: 'Merriweather', Georgia, serif; font-optical-sizing: auto; }

        .car-scroll-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          z-index: 110;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,.55), rgba(0,45,58,.08));
          border-bottom: 1px solid rgba(0,90,112,.12);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.5);
        }
        .car-scroll-fill {
          position: relative;
          height: 100%;
          width: 0%;
          max-width: 100%;
          border-radius: 0 4px 4px 0;
          background: linear-gradient(90deg, #002395 0%, #1a7a8c 28%, #52D1A3 52%, #c73a3a 82%, #E1000F 100%);
          background-size: 140% 100%;
          animation: carScrollHue 8s ease-in-out infinite;
          box-shadow:
            0 3px 14px rgba(0,90,112,.45),
            0 0 18px rgba(82,209,163,.45),
            inset 0 1px 0 rgba(255,255,255,.35);
          transition: width 0.14s cubic-bezier(.25,.8,.25,1);
        }
        @keyframes carScrollHue {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .car-scroll-fill::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: min(28px, 8vw);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.55));
          border-radius: 0 4px 4px 0;
          pointer-events: none;
        }

        .car-reveal {
          position: relative;
          overflow: visible;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1);
        }
        .car-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .car-reveal-visible .car-section-title {
          animation: carTitleReveal 0.7s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes carTitleReveal {
          from { opacity: 0.6; letter-spacing: -0.06em; }
          to { opacity: 1; letter-spacing: -0.03em; }
        }

        .car-hero-dark {
          position: relative;
          overflow: hidden;
          background: #0a1f2d;
          min-height: min(82vh, 760px);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(104px, 14vw, 140px) clamp(24px, 5vw, 48px) clamp(64px, 9vw, 96px);
        }
        .car-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .car-hero-bg-slides {
          position: absolute;
          inset: 0;
        }
        .car-hero-bg-slides img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transition: opacity 1.55s cubic-bezier(0.45, 0.05, 0.25, 1);
          will-change: opacity;
        }
        .car-hero-bg-slides img.is-active {
          opacity: 1;
        }
        .car-hero-bg-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            115deg,
            rgba(10, 31, 45, 0.82) 0%,
            rgba(10, 31, 45, 0.45) 42%,
            rgba(10, 31, 45, 0.78) 100%
          );
          pointer-events: none;
        }
        .car-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
          width: 100%;
          text-align: left;
        }
        .car-hero-eyebrow--egg {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        @keyframes carEggRing {
          0%, 100% { transform: scale(0.9); opacity: 0.35; }
          50% { transform: scale(1.14); opacity: 0.85; }
        }
        @keyframes carEggHeroGlow {
          0%, 100% {
            box-shadow:
              0 0 0 0 rgba(120, 235, 200, 0.5),
              0 5px 20px rgba(0, 0, 0, 0.38),
              inset 0 1px 0 rgba(255, 255, 255, 0.22);
          }
          55% {
            box-shadow:
              0 0 0 14px rgba(120, 235, 200, 0),
              0 8px 28px rgba(0, 0, 0, 0.32),
              inset 0 1px 0 rgba(255, 255, 255, 0.26);
          }
        }
        @keyframes carEggLightPulse {
          0%, 100% {
            box-shadow:
              0 0 0 0 rgba(82, 209, 163, 0.42),
              0 3px 14px rgba(0, 55, 70, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.95);
          }
          50% {
            box-shadow:
              0 0 0 11px rgba(82, 209, 163, 0),
              0 7px 20px rgba(0, 55, 70, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 1);
          }
        }
        .car-egg-slot {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .car-egg-wrap {
          position: relative;
          display: inline-flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
        }
        .car-egg-wrap::before {
          content: "";
          position: absolute;
          inset: -9px;
          border-radius: 50%;
          border: 2px solid rgba(82, 209, 163, 0.5);
          pointer-events: none;
          z-index: 0;
          animation: carEggRing 2.35s ease-in-out infinite;
        }
        .car-egg-wrap--open::before {
          animation-play-state: paused;
          opacity: 0.5;
          transform: scale(1);
        }
        .car-egg-btn {
          position: relative;
          z-index: 1;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(130, 235, 195, 0.65);
          background: linear-gradient(155deg, rgba(22, 58, 78, 0.92) 0%, rgba(10, 31, 45, 0.82) 100%);
          display: grid;
          place-items: center;
          cursor: pointer;
          padding: 0;
          transition: transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1), box-shadow 0.22s, border-color 0.22s, filter 0.22s;
          animation: carEggHeroGlow 2.65s ease-in-out infinite;
        }
        .car-egg-btn:hover {
          transform: scale(1.1);
          border-color: rgba(180, 255, 220, 0.95);
          filter: brightness(1.08);
        }
        .car-egg-btn--hero {
          width: 40px;
          height: 40px;
          border-width: 2px;
          border-color: rgba(170, 255, 220, 0.78);
          background: linear-gradient(158deg, rgba(28, 72, 92, 0.96) 0%, rgba(8, 26, 40, 0.9) 100%);
        }
        .car-egg-wrap--open .car-egg-btn {
          animation-play-state: paused;
        }
        .car-egg-pop--portal {
          position: fixed;
          z-index: 5200;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border-radius: 15px;
          background: linear-gradient(158deg, #fff9f0 0%, #eefaf6 38%, #fef5e8 100%);
          border: 2px solid rgba(0, 58, 70, 0.2);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.85) inset,
            0 4px 0 rgba(0, 35, 70, 0.05),
            0 22px 52px rgba(0, 35, 55, 0.22),
            0 0 42px rgba(82, 209, 163, 0.2);
          color: var(--car-ink);
          font-size: 13px;
          line-height: 1.55;
          pointer-events: auto;
        }
        .car-egg-pop--portal.car-egg-pop--above::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -9px;
          border: 9px solid transparent;
          border-top-color: #eef6f2;
          filter: drop-shadow(0 2px 1px rgba(0, 45, 58, 0.08));
        }
        .car-egg-pop--portal.car-egg-pop--below::after {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          margin-left: -9px;
          border: 9px solid transparent;
          border-bottom-color: #fff9f0;
          filter: drop-shadow(0 -1px 1px rgba(0, 45, 58, 0.08));
        }
        .car-egg-pop-strip {
          height: 6px;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(90deg, #002395 0%, #002395 34%, #ffffff 34%, #ffffff 66%, #E1000F 66%, #E1000F 100%);
          opacity: 0.95;
        }
        .car-egg-pop-inner {
          padding: 10px 15px 14px;
          background:
            radial-gradient(ellipse 100% 90% at 12% 8%, rgba(82, 209, 163, 0.14) 0%, transparent 52%),
            radial-gradient(ellipse 80% 70% at 92% 96%, rgba(0, 90, 112, 0.09) 0%, transparent 48%);
        }
        .car-egg-badge {
          display: inline-block;
          font-family: "Source Sans 3", system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #b45309;
          background: rgba(180, 83, 9, 0.09);
          border: 1px dashed rgba(180, 83, 9, 0.4);
          padding: 3px 9px 2px;
          border-radius: 5px;
          margin-bottom: 8px;
        }
        .car-egg-tit {
          display: block;
          font-family: "Merriweather", Georgia, serif;
          font-weight: 700;
          font-size: 15px;
          font-style: italic;
          color: #083944;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }
        .car-egg-txt {
          margin: 0;
          color: #2a4a54;
          font-size: 13px;
        }
        .car-egg-inline {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .car-egg-inline--text {
          display: inline-flex;
          vertical-align: middle;
          margin: 0 0 0 4px;
          flex-wrap: nowrap;
        }
        .car-egg-inline .car-egg-wrap::before {
          border-style: solid;
          border-color: rgba(0, 90, 112, 0.28);
          background: radial-gradient(circle, rgba(82, 209, 163, 0.12) 0%, transparent 68%);
          animation-duration: 2.1s;
        }
        .car-egg-inline .car-egg-btn {
          background: linear-gradient(148deg, #ffffff 0%, #e8faf4 42%, #fff8ee 100%);
          border: 2px solid rgba(0, 90, 112, 0.32);
          border-style: dashed;
          animation: carEggLightPulse 2.25s ease-in-out infinite;
        }
        .car-egg-inline .car-egg-btn:hover {
          border-style: solid;
          border-color: rgba(82, 209, 163, 0.75);
          box-shadow: 0 0 0 3px rgba(82, 209, 163, 0.18), 0 6px 20px rgba(0, 60, 70, 0.14);
        }
        @media (prefers-reduced-motion: reduce) {
          .car-egg-wrap::before,
          .car-egg-btn {
            animation: none !important;
          }
          .car-card,
          .car-form-input,
          .car-form-textarea,
          .car-form-submit {
            transition: none !important;
          }
          .car-rose {
            animation: none !important;
          }
        }


        .car-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #52d1a3;
          margin: 0 0 26px;
        }
        .car-hero-eyebrow-line {
          width: 28px;
          height: 3px;
          background: #52d1a3;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .car-hero-title {
          font-family: 'Merriweather', Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          line-height: 1.12;
          color: #fff;
          margin: 0 0 6px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.06);
        }
        .car-hero-subtitle {
          font-family: 'Merriweather', Georgia, serif;
          font-size: clamp(1.75rem, 4.2vw, 2.65rem);
          font-weight: 700;
          line-height: 1.18;
          color: #52d1a3;
          margin: 0 0 26px;
        }
        .car-hero-lede {
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: clamp(0.98rem, 1.85vw, 1.12rem);
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 34px;
          max-width: 640px;
        }
        .car-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
        }
        .car-hero-btn {
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 26px;
          border-radius: 8px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .car-hero-btn-primary {
          background: #52d1a3;
          color: #061018;
          border-color: #52d1a3;
          box-shadow: 0 10px 36px rgba(82, 209, 163, 0.4);
        }
        .car-hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 44px rgba(82, 209, 163, 0.5);
        }
        .car-hero-btn-ghost {
          background: transparent;
          color: #fff;
          border-color: rgba(82, 209, 163, 0.88);
        }
        .car-hero-btn-ghost:hover {
          background: rgba(82, 209, 163, 0.12);
          border-color: #52d1a3;
        }
        @media (max-width: 520px) {
          .car-hero-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .car-hero-btn {
            width: 100%;
            text-align: center;
          }
        }

        main > section.car-reveal::before {
          content: '';
          position: absolute;
          pointer-events: none;
          z-index: 0;
          opacity: 0.85;
          transition: opacity 1s ease;
        }
        main > section.car-reveal:nth-child(odd)::before {
          right: -12%;
          top: -25%;
          width: 58%;
          height: 85%;
          background: radial-gradient(ellipse at 70% 20%, rgba(82,209,163,.16) 0%, transparent 62%);
        }
        main > section.car-reveal:nth-child(even)::before {
          left: -8%;
          bottom: -18%;
          width: 52%;
          height: 75%;
          background: radial-gradient(ellipse at 20% 80%, rgba(0,90,112,.11) 0%, transparent 58%);
        }
        .car-reveal-visible::before {
          opacity: 1;
        }
        .car-reveal > * {
          position: relative;
          z-index: 1;
        }

        .car-reveal .car-kicker::after {
          content: '';
          display: block;
          width: 52px;
          height: 4px;
          margin-top: 10px;
          border-radius: 3px;
          background: linear-gradient(90deg, #52D1A3, #005A70);
          box-shadow: 0 2px 10px rgba(82,209,163,.35);
        }

        .car-reveal .car-section-title {
          position: relative;
          padding-left: 22px;
        }
        .car-reveal .car-section-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.08em;
          bottom: 0.08em;
          width: 5px;
          border-radius: 5px;
          background: linear-gradient(180deg, #52D1A3 0%, #005A70 100%);
          box-shadow: 0 2px 12px rgba(82,209,163,.4);
        }

        @keyframes carCardRise {
          from { opacity: 0; transform: translateY(22px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .car-reveal-visible .car-card {
          animation: carCardRise 0.68s cubic-bezier(.22,1,.36,1) backwards;
        }
        .car-reveal-visible .car-card:nth-child(1) { animation-delay: 0.04s; }
        .car-reveal-visible .car-card:nth-child(2) { animation-delay: 0.1s; }
        .car-reveal-visible .car-card:nth-child(3) { animation-delay: 0.16s; }
        .car-reveal-visible .car-card:nth-child(4) { animation-delay: 0.22s; }
        .car-reveal-visible .car-card:nth-child(5) { animation-delay: 0.28s; }
        .car-reveal-visible .car-card:nth-child(6) { animation-delay: 0.34s; }
        .car-reveal-visible .car-card:nth-child(7) { animation-delay: 0.4s; }
        .car-reveal-visible .car-card:nth-child(8) { animation-delay: 0.46s; }

        @media (prefers-reduced-motion: reduce) {
          main > section.car-reveal::before { opacity: 0.5 !important; }
          .car-reveal-visible .car-card { animation: none !important; }
        }

        @keyframes carFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: none; }
        }

        .car-hero-in > * {
          animation: carFadeUp 0.85s cubic-bezier(.22,1,.36,1) forwards;
          opacity: 0;
        }
        .car-hero-in > *:nth-child(1) { animation-delay: 0.06s; }
        .car-hero-in > *:nth-child(2) { animation-delay: 0.12s; }
        .car-hero-in > *:nth-child(3) { animation-delay: 0.18s; }
        .car-hero-in > *:nth-child(4) { animation-delay: 0.24s; }
        .car-hero-in > *:nth-child(5) { animation-delay: 0.3s; }

        .car-card-iconwrap { position: relative; display: block; }
        .car-card-iconbadge {
          position: absolute; top: 10px; left: 10px; z-index: 1;
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(255,255,255,.96);
          border: 1px solid rgba(0,90,112,.12);
          box-shadow: 0 6px 20px rgba(0,0,0,.12);
          display: flex; align-items: center; justify-content: center;
          color: var(--car-forest);
        }
        .car-demarche-icon {
          flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px;
          background: var(--car-paper2);
          border: 1px solid var(--car-mist);
          display: flex; align-items: center; justify-content: center;
          color: var(--car-forest);
        }
        @media (prefers-reduced-motion: reduce) {
          .car-hero-in > * { animation: none !important; opacity: 1 !important; }
          .car-hero-bg-slides img { transition: none !important; }
          .car-reveal { opacity: 1 !important; transform: none !important; }
          .car-scroll-track { display: none !important; }
          .car-scroll-fill { animation: none !important; }
        }

        .car-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

.car-divider-hedge {
          height: 12px;
          background:
            radial-gradient(circle at 8px 8px, rgba(13,60,110,.18) 0 2px, transparent 3px),
            radial-gradient(circle at 16px 4px, rgba(184,134,11,.16) 0 2px, transparent 3px),
            radial-gradient(circle at 24px 9px, rgba(13,60,110,.14) 0 2px, transparent 3px);
          background-size: 28px 12px;
          opacity: .9;
          margin: 0 auto;
          border-top: 1px solid rgba(13,60,110,.08);
          border-bottom: 1px solid rgba(13,60,110,.08);
        }

        .car-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background .4s, box-shadow .4s, border-color .4s;
          background: ${scrolled ? 'rgba(255,255,255,.94)' : 'rgba(255,255,255,.58)'};
          backdrop-filter: blur(22px) saturate(1.15);
          -webkit-backdrop-filter: blur(22px) saturate(1.15);
          border-bottom: 1px solid ${scrolled ? 'rgba(0,90,112,.14)' : 'rgba(255,255,255,.35)'};
          box-shadow: ${scrolled ? '0 8px 32px rgba(0,90,112,.1)' : '0 1px 0 rgba(255,255,255,.6) inset'};
        }

        .car-nav-inner {
          max-width: 1240px; margin: 0 auto; padding: 16px 28px 18px;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
        }

        .car-fr-strip {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          z-index: 60;
          pointer-events: none;
          background: linear-gradient(180deg,
            #002395 0%, #002395 33.33%,
            #ffffff 33.33%, #ffffff 66.66%,
            #E1000F 66.66%, #E1000F 100%);
          box-shadow: 2px 0 14px rgba(0,0,0,.07);
        }
        @media (max-width: 900px) {
          .car-fr-strip { width: 4px; }
        }

        .car-brand {
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(13px, 2.4vw, 16px);
          color: var(--car-forest);
          line-height: 1.2;
          max-width: min(300px, 46vw);
          letter-spacing: -0.01em;
          display: flex; align-items: center; gap: 12px;
        }
        .car-brand-img {
          height: clamp(52px, 7vw, 64px);
          width: auto;
          max-width: min(240px, 42vw);
          object-fit: contain;
          object-position: left center;
          display: block;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 8px rgba(0,90,112,.15));
        }
        @media (max-width: 520px) { .car-brand-text { display: none; } }

        .car-nav-links {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          flex: 1;
          min-width: 0;
          max-width: none;
        }

        .car-nav-pill {
          background: rgba(255,255,255,.5);
          border: 1px solid rgba(0,90,112,.1);
          font: inherit;
          font-size: 12px;
          font-weight: 600;
          color: var(--car-muted);
          padding: 8px 11px;
          border-radius: 999px;
          cursor: pointer;
          letter-spacing: 0.01em;
          white-space: nowrap;
          transition: background .2s, box-shadow .2s, color .2s, border-color .2s;
        }
        .car-nav-pill:hover {
          background: rgba(82,209,163,.16);
          border-color: rgba(82,209,163,.32);
          color: var(--car-forest);
        }
        .car-nav-pill--more { padding-right: 9px; }
        .car-nav-caret { display: inline-block; margin-left: 2px; font-size: 10px; opacity: 0.75; }

        .car-nav-dropwrap { position: relative; flex-shrink: 0; }
        .car-nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 220px;
          padding: 8px;
          border-radius: 14px;
          background: rgba(255,255,255,.98);
          border: 1px solid rgba(0,90,112,.12);
          box-shadow: 0 16px 48px rgba(0,45,58,.18);
          z-index: 120;
        }
        .car-nav-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          padding: 10px 12px;
          border: none;
          border-radius: 10px;
          background: transparent;
          font: inherit;
          font-size: 13px;
          font-weight: 500;
          color: var(--car-ink);
          cursor: pointer;
        }
        .car-nav-dd-item:hover {
          background: rgba(82,209,163,.14);
          color: var(--car-forest);
        }
        .car-nav-dd-ico {
          display: flex;
          color: var(--car-forest);
          opacity: 0.85;
        }

        .car-nav-links .car-back {
          font-size: 12px;
          font-weight: 600;
          color: var(--car-forest);
          white-space: nowrap;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px dashed rgba(0,90,112,.22);
          flex-shrink: 0;
        }
        .car-nav-links .car-back:hover {
          background: rgba(0,90,112,.06);
        }

        .car-burger {
          display: none;
          width: 46px;
          height: 46px;
          border: 1px solid rgba(0, 90, 112, 0.16);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.96);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .car-burger:hover {
          background: rgba(82, 209, 163, 0.1);
          border-color: rgba(82, 209, 163, 0.35);
        }
        .car-burger--open {
          background: rgba(82, 209, 163, 0.14);
          border-color: rgba(82, 209, 163, 0.4);
        }

        .car-burger-box {
          width: 20px;
          height: 14px;
          position: relative;
          display: block;
        }
        .car-burger-line {
          position: absolute;
          left: 0;
          width: 20px;
          height: 2px;
          background: var(--car-ink);
          border-radius: 1px;
          transition: transform 0.28s ease, opacity 0.2s ease, top 0.28s ease;
        }
        .car-burger-line:nth-child(1) { top: 0; transform-origin: center; }
        .car-burger-line:nth-child(2) { top: 6px; }
        .car-burger-line:nth-child(3) { top: 12px; transform-origin: center; }
        .car-burger--open .car-burger-line:nth-child(1) {
          top: 6px;
          transform: rotate(45deg);
        }
        .car-burger--open .car-burger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .car-burger--open .car-burger-line:nth-child(3) {
          top: 6px;
          transform: rotate(-45deg);
        }

        .car-mobile-panel {
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(320px, 92vw);
          max-width: 100%;
          background: var(--car-paper);
          z-index: 200;
          padding: 0 0 max(20px, env(safe-area-inset-bottom));
          padding-top: env(safe-area-inset-top, 0px);
          box-shadow: -16px 0 48px rgba(0, 0, 0, 0.18);
          gap: 0;
          transform: translateX(105%);
          visibility: hidden;
          pointer-events: none;
          transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.32s;
          -webkit-overflow-scrolling: touch;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .car-mobile-panel.open {
          transform: translateX(0);
          visibility: visible;
          pointer-events: auto;
        }
        .car-mobile-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: max(14px, env(safe-area-inset-top, 12px)) 16px 14px 18px;
          border-bottom: 1px solid rgba(0, 90, 112, 0.12);
          background: rgba(255, 255, 255, 0.65);
          position: sticky;
          top: 0;
          z-index: 1;
          flex-shrink: 0;
        }
        .car-mobile-panel-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--car-forest);
        }
        .car-mobile-close {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(0, 90, 112, 0.15);
          background: #fff;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 22px;
          line-height: 1;
          color: var(--car-ink);
          flex-shrink: 0;
          -webkit-tap-highlight-color: transparent;
        }
        .car-mobile-close:hover {
          background: rgba(82, 209, 163, 0.12);
          border-color: rgba(82, 209, 163, 0.35);
        }
        .car-mobile-panel-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 12px 8px 14px;
        }
        .car-mobile-link {
          text-align: left;
          width: 100%;
          padding: 14px 12px;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: none;
          border-radius: 12px;
          background: transparent;
          font: inherit;
          color: var(--car-ink);
          cursor: pointer;
          min-height: 48px;
          -webkit-tap-highlight-color: transparent;
        }
        .car-mobile-link:hover,
        .car-mobile-link:focus-visible {
          background: rgba(82, 209, 163, 0.12);
          outline: none;
        }
        .car-mobile-link-ico {
          width: 22px;
          height: 22px;
          color: var(--car-forest);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .car-overlay {
          position: fixed;
          inset: 0;
          background: rgba(28, 25, 23, 0.42);
          z-index: 199;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.28s ease, visibility 0.28s;
          pointer-events: none;
        }
        .car-overlay.open {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .car-card {
          background: #fff;
          border: 1px solid rgba(28,25,23,.07);
          border-radius: 16px;
          padding: 26px 24px;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 2px 12px rgba(28,25,23,.04);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          position: relative;
        }
        .car-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,90,112,.12);
          border-color: rgba(82,209,163,.28);
        }
        .car-card:active {
          transform: translateY(-2px);
          transition: transform 0.15s cubic-bezier(.22,1,.36,1), box-shadow 0.15s ease;
        }
        .car-card:focus-visible {
          outline: 2px solid #005A70;
          outline-offset: 2px;
        }

        .car-section-title {
          font-family: 'Merriweather', Georgia, serif;
          font-size: clamp(1.6rem, 3.5vw, 2.15rem);
          font-weight: 600;
          color: var(--car-forest);
          letter-spacing: -0.03em;
          margin-bottom: 0.35em;
        }

        .car-kicker {
          font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
          color: var(--car-accent); margin-bottom: 14px;
        }

        @media (max-width: 900px) {
          .car-nav-inner > .car-nav-links { display: none; }
          .car-burger { display: flex; }
          .car-nav-inner {
            padding: 12px max(14px, env(safe-area-inset-right, 0px)) 14px max(12px, env(safe-area-inset-left, 0px));
            gap: 12px;
            align-items: center;
          }
          .car-brand {
            min-width: 0;
            flex: 1;
            max-width: none;
          }
          .car-brand-img {
            height: clamp(38px, 10vw, 48px);
            max-width: min(200px, calc(100vw - 120px));
          }
        }

        @media (max-width: 768px) {
          .car-pat-row {
            grid-template-columns: 1fr !important;
          }
          .car-memoire-split {
            grid-template-columns: 1fr !important;
          }
          .car-marees-inner {
            flex-direction: column;
            gap: 12px !important;
          }
        }

        @media (max-width: 640px) {
          .car-hero-dark {
            padding: max(88px, calc(env(safe-area-inset-top, 0px) + 72px)) max(16px, env(safe-area-inset-right, 0px)) clamp(48px, 12vw, 72px) max(16px, env(safe-area-inset-left, 0px));
            min-height: min(88vh, 720px);
          }
          .car-card {
            padding: 20px 18px;
          }
          .car-section-title {
            font-size: clamp(1.45rem, 6vw, 1.9rem);
          }
          .car-postcard {
            transform: rotate(-0.4deg);
            padding: 24px 20px 28px;
          }
          .car-postcard-title {
            padding-right: 0;
            padding-top: 100px;
          }
          .car-postcard-wrap {
            padding-bottom: 60px;
          }
          .car-form-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .car-form-submit {
            width: 100%;
          }
        }

        @media (max-width: 380px) {
          .car-brand-img {
            max-width: min(160px, calc(100vw - 100px));
          }
          .car-rose {
            width: 80px;
            height: 80px;
          }
        }

        /* === Traitement duotone + tags sur les cartes === */
        .car-card-iconwrap { isolation: isolate; }
        .car-card-iconwrap img {
          filter: saturate(0.78) contrast(1.05);
          transition: filter .4s ease, transform .6s cubic-bezier(.22,1,.36,1);
        }
        .car-card-iconwrap::after {
          content: '';
          position: absolute;
          inset: 0 0 10px 0;
          border-radius: 10px;
          background: linear-gradient(150deg, rgba(0,90,112,.22) 0%, rgba(82,209,163,.1) 55%, transparent 100%);
          pointer-events: none;
          mix-blend-mode: multiply;
          transition: opacity .4s ease;
        }
        .car-card:hover .car-card-iconwrap img { filter: saturate(1) contrast(1); transform: scale(1.03); }
        .car-card:hover .car-card-iconwrap::after { opacity: 0.25; }

        .car-card-tag {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 10px;
          padding: 4px 10px 4px 8px;
          border-radius: 999px;
          background: rgba(82,209,163,.14);
          border: 1px solid rgba(0,90,112,.14);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .02em;
          color: var(--car-forest);
        }

        /* === Tags Patrimoine (chips avec icônes) === */
        .car-pat-tags {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 14px;
        }
        .car-pat-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px 5px 10px;
          border-radius: 999px;
          background: #fff;
          border: 1px solid rgba(0,90,112,.18);
          font-size: 12px;
          font-weight: 600;
          color: var(--car-forest);
          box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 2px 6px rgba(0,60,80,.06);
        }
        .car-pat-tag svg { flex-shrink: 0; }
        .car-pat-row img {
          filter: saturate(.85);
          transition: filter .6s ease, transform .8s cubic-bezier(.22,1,.36,1);
        }
        .car-pat-row:hover img {
          filter: saturate(1);
          transform: scale(1.02);
        }
        .car-pat-row > a {
          position: relative;
          isolation: isolate;
        }
        .car-pat-row > a::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(0,90,112,.12) 0%, transparent 40%, rgba(82,209,163,.08) 100%);
          mix-blend-mode: multiply;
          pointer-events: none;
          transition: opacity .5s ease;
        }
        .car-pat-row:hover > a::after { opacity: 0.5; }

        /* === Rose des vents (ornement discret) === */
        .car-rose {
          position: absolute;
          width: 120px; height: 120px;
          opacity: 0.08;
          pointer-events: none;
          color: var(--car-forest);
          animation: carRoseTurn 120s linear infinite;
        }
        @keyframes carRoseTurn {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .car-rose { animation: none !important; }
        }

        /* === Bandeau marée/météo Cotentin === */
        .car-marees {
          background: linear-gradient(180deg, #f0f8f5 0%, #e4f0ec 100%);
          border-top: 1px solid rgba(0,90,112,.12);
          border-bottom: 1px solid rgba(0,90,112,.12);
          position: relative;
          overflow: hidden;
        }
        .car-marees::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            repeating-linear-gradient(135deg, transparent 0 8px, rgba(0,90,112,.03) 8px 9px);
          pointer-events: none;
        }
        .car-marees-inner {
          max-width: 1120px; margin: 0 auto;
          padding: 14px clamp(20px, 4vw, 40px);
          display: flex; align-items: center; gap: clamp(14px, 3vw, 32px);
          flex-wrap: wrap;
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: 13px;
          color: var(--car-ink);
          position: relative;
          z-index: 1;
        }
        .car-marees-item {
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap;
        }
        .car-marees-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--car-muted);
        }
        .car-marees-val {
          font-family: 'Merriweather', Georgia, serif;
          font-weight: 600;
          color: var(--car-forest);
        }
        .car-marees-sep {
          width: 1px; height: 18px;
          background: rgba(0,90,112,.18);
        }
        @media (max-width: 640px) {
          .car-marees-sep { display: none; }
          .car-marees-inner { gap: 12px 20px; }
        }

        /* === Carte postale 1944 === */
        .car-postcard-wrap {
          position: relative;
          padding: 28px 20px 36px;
        }
        .car-postcard {
          position: relative;
          max-width: 640px;
          margin: 0 auto;
          background:
            radial-gradient(ellipse 120% 90% at 0% 0%, #fdf5e2 0%, transparent 55%),
            radial-gradient(ellipse 100% 80% at 100% 100%, #f5e6c6 0%, transparent 50%),
            #f9eed4;
          border: 1px solid rgba(120,80,20,.2);
          border-radius: 4px;
          padding: 28px 32px 32px;
          transform: rotate(-0.7deg);
          box-shadow:
            0 1px 0 rgba(255,255,255,.6) inset,
            0 2px 0 rgba(120,80,20,.08),
            0 22px 52px rgba(60,30,10,.15),
            0 8px 18px rgba(60,30,10,.08);
          font-family: 'Source Sans 3', system-ui, sans-serif;
        }
        .car-postcard::before {
          content: '';
          position: absolute; inset: 6px;
          border: 1px dashed rgba(120,80,20,.25);
          border-radius: 2px;
          pointer-events: none;
        }
        .car-postcard-stamp {
          position: absolute;
          top: 18px; right: 22px;
          width: 74px; height: 88px;
          background:
            linear-gradient(135deg, rgba(0,35,149,.14) 0%, rgba(225,0,15,.12) 100%),
            #fefaf0;
          border: 1px dashed rgba(120,80,20,.35);
          border-radius: 3px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px;
          transform: rotate(4deg);
          box-shadow: 0 3px 8px rgba(60,30,10,.12);
          font-family: 'Merriweather', Georgia, serif;
          font-size: 10px;
          color: #4a2d0e;
          text-align: center;
          padding: 6px;
          line-height: 1.2;
        }
        .car-postcard-stamp strong {
          font-size: 13px;
          letter-spacing: .05em;
        }
        .car-postcard-kicker {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #8a5a1f;
          margin-bottom: 10px;
        }
        .car-postcard-title {
          font-family: 'Merriweather', Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(1.35rem, 3vw, 1.75rem);
          color: #3d2410;
          line-height: 1.2;
          margin: 0 0 12px;
          padding-right: 90px;
          letter-spacing: -.01em;
        }
        .car-postcard-text {
          font-family: 'Merriweather', Georgia, serif;
          font-style: italic;
          font-size: 14.5px;
          line-height: 1.75;
          color: #4a3118;
          margin: 0 0 14px;
        }
        .car-postcard-sign {
          display: block;
          text-align: right;
          font-family: 'Merriweather', Georgia, serif;
          font-size: 12px;
          font-style: italic;
          color: #7a4f20;
          letter-spacing: .02em;
        }
        .car-postcard-tampon {
          position: absolute;
          bottom: -14px; left: 24px;
          width: 96px; height: 96px;
          border: 2px solid rgba(140,20,20,.55);
          border-radius: 50%;
          display: grid; place-items: center;
          transform: rotate(-12deg);
          background: rgba(255,240,230,.4);
          color: rgba(140,20,20,.7);
          font-family: 'Merriweather', Georgia, serif;
          font-weight: 700;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .15em;
          text-align: center;
          line-height: 1.15;
          padding: 6px;
          box-shadow: inset 0 0 0 2px rgba(140,20,20,.08);
        }
        .car-postcard-tampon span { display: block; }
        .car-postcard-tampon .big {
          font-size: 16px;
          letter-spacing: .05em;
          margin: 2px 0;
        }
        @media (max-width: 520px) {
          .car-postcard { transform: rotate(-0.4deg); padding: 24px 20px 28px; }
          .car-postcard-title { padding-right: 0; padding-top: 100px; }
          .car-postcard-stamp { top: 14px; right: 50%; transform: translateX(50%) rotate(4deg); }
          .car-postcard-tampon { left: 50%; transform: translateX(-50%) rotate(-8deg); bottom: -48px; }
          .car-postcard-wrap { padding-bottom: 60px; }
        }

        /* === Timeline Histoire === */
        .car-timeline {
          position: relative;
          margin: 24px 0 32px;
          padding-left: 0;
          list-style: none;
        }
        .car-timeline::before {
          content: '';
          position: absolute;
          left: 9px; top: 8px; bottom: 8px;
          width: 2px;
          background: linear-gradient(180deg,
            rgba(0,35,149,.35) 0%,
            rgba(82,209,163,.6) 50%,
            rgba(225,0,15,.35) 100%);
          border-radius: 2px;
        }
        .car-timeline-item {
          position: relative;
          padding: 0 0 18px 32px;
        }
        .car-timeline-item:last-child { padding-bottom: 0; }
        .car-timeline-item::before {
          content: '';
          position: absolute;
          left: 4px; top: 6px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--car-forest);
          box-shadow: 0 0 0 3px rgba(82,209,163,.18);
        }
        .car-timeline-date {
          font-family: 'Merriweather', Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: 13px;
          color: var(--car-forest);
          letter-spacing: .02em;
          margin-bottom: 2px;
        }
        .car-timeline-title {
          font-family: 'Merriweather', Georgia, serif;
          font-weight: 600;
          font-size: 15px;
          color: var(--car-ink);
          margin-bottom: 2px;
        }
        .car-timeline-text {
          font-size: 13.5px;
          color: var(--car-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* === Séparateur bocage === */
        .car-bocage-sep {
          height: 38px;
          position: relative;
          overflow: hidden;
          pointer-events: none;
        }
        .car-bocage-sep svg {
          position: absolute;
          bottom: 0; left: 0;
          width: 100%;
          height: 38px;
          opacity: 0.55;
        }

        /* === Formulaire Contact Accessible === */
        .car-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }
        .car-form-label {
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--car-ink);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .car-form-label .required {
          color: #e74c3c;
          font-size: 16px;
          line-height: 1;
        }
        .car-form-input,
        .car-form-textarea {
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: 16px;
          padding: 12px 14px;
          border: 1px solid rgba(0,90,112,.18);
          border-radius: 10px;
          background: #fff;
          color: var(--car-ink);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          -webkit-appearance: none;
          appearance: none;
        }
        .car-form-input:focus,
        .car-form-textarea:focus {
          outline: none;
          border-color: #005A70;
          box-shadow: 0 0 0 3px rgba(0,90,112,.1), inset 0 1px 0 rgba(255,255,255,.8);
          background: #fafbfc;
        }
        .car-form-input:disabled,
        .car-form-textarea:disabled {
          background: rgba(0,90,112,.04);
          color: var(--car-muted);
          cursor: not-allowed;
          opacity: 0.6;
        }
        .car-form-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.5;
        }
        .car-form-helper {
          font-size: 12px;
          color: var(--car-muted);
          line-height: 1.4;
        }
        .car-form-error {
          font-size: 13px;
          color: #e74c3c;
          font-weight: 500;
          display: none;
        }
        .car-form-group.has-error .car-form-error {
          display: block;
        }
        .car-form-group.has-error .car-form-input,
        .car-form-group.has-error .car-form-textarea {
          border-color: #e74c3c;
          box-shadow: 0 0 0 3px rgba(231,76,60,.08);
        }
        .car-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .car-form-submit {
          font-family: 'Source Sans 3', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          background: #005A70;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 12px rgba(0,90,112,.2);
        }
        .car-form-submit:hover {
          background: #004050;
          box-shadow: 0 6px 16px rgba(0,90,112,.28);
          transform: translateY(-1px);
        }
        .car-form-submit:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0,90,112,.15);
        }
        .car-form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .car-form-submit:focus-visible {
          outline: 2px solid #005A70;
          outline-offset: 2px;
        }
        @media (max-width: 640px) {
          .car-form-input,
          .car-form-textarea {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="car-fr-strip" aria-hidden="true" />
      <div className="car-scroll-track" aria-hidden>
        <div className="car-scroll-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      <nav className="car-nav">
        <div className="car-nav-inner">
          <button
            type="button"
            onClick={() => scrollTo('accueil')}
            className="car-brand"
            style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img
              className="car-brand-img"
              src={ASSETS.logoHorizontal}
              alt="Carentan-les-Marais"
              width={220}
              height={101}
              decoding="async"
            />
            <span className="car-brand-text">{name}</span>
          </button>

          <div className="car-nav-links">
            {NAV_PRIMARY.map(({ id, label }) => (
              <button key={id} type="button" className="car-nav-pill" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
            <div className="car-nav-dropwrap" ref={navMoreRef}>
              <button
                type="button"
                className="car-nav-pill car-nav-pill--more"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreOpen((v) => !v);
                }}
              >
                Découvrir <span aria-hidden className="car-nav-caret">▾</span>
              </button>
              {moreOpen ? (
                <div className="car-nav-dropdown" role="menu">
                  {NAV_MORE.map(({ id, label, icon }) => (
                    <button
                      key={id}
                      type="button"
                      role="menuitem"
                      className="car-nav-dd-item"
                      onClick={() => {
                        scrollTo(id);
                        setMoreOpen(false);
                      }}
                    >
                      <span className="car-nav-dd-ico" aria-hidden>
                        <Icon name={icon} size={18} />
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button type="button" className="car-nav-pill" onClick={() => scrollTo(NAV_CONTACT.id)}>
              {NAV_CONTACT.label}
            </button>
            <Link to="/demos" className="car-back">Démos</Link>
          </div>

          <button
            type="button"
            className={`car-burger${menuOpen ? ' car-burger--open' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="car-mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="car-burger-box" aria-hidden>
              <span className="car-burger-line" />
              <span className="car-burger-line" />
              <span className="car-burger-line" />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`car-overlay${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        id="car-mobile-nav"
        className={`car-mobile-panel${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation du site"
        aria-hidden={!menuOpen}
      >
        <div className="car-mobile-panel-head">
          <span className="car-mobile-panel-title">Menu</span>
          <button
            type="button"
            className="car-mobile-close"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="car-mobile-panel-body">
          {NAV_MOBILE.map(({ id, label, icon }) => (
            <button key={id} type="button" className="car-mobile-link" onClick={() => scrollTo(id)}>
              <span className="car-mobile-link-ico" aria-hidden>
                <Icon name={icon} size={20} />
              </span>
              <span>{label}</span>
            </button>
          ))}
          <Link
            to="/demos"
            className="car-back"
            style={{ padding: '14px 12px', display: 'block', marginTop: 8, borderRadius: 12 }}
            onClick={() => setMenuOpen(false)}
          >
            ← Retour aux démos
          </Link>
        </div>
      </div>

      <header id="accueil" className="car-hero-dark" role="banner">
        <div className="car-hero-bg" aria-hidden="true">
          <div className="car-hero-bg-slides">
            {HERO_TITLE_SLIDE_URLS.map((src, i) => (
              <img
                key={`${i}-${src}`}
                src={src}
                alt={`Diaporama Carentan — image ${i + 1}`}
                className={i === heroTitleSlide ? "is-active" : ""}
                decoding="async"
              />
            ))}
          </div>
          <div className="car-hero-bg-scrim" />
        </div>
        <div className="car-hero-in car-hero-inner">
          <p className="car-hero-eyebrow car-hero-eyebrow--egg">
            <span className="car-hero-eyebrow-line" aria-hidden="true" />
            Normandie · Manche · Cotentin
            <span className="car-egg-slot">
              {eggsFor("hero").map((egg) => (
                <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
              ))}
            </span>
          </p>
          <h1 className="car-hero-title">Carentan-les-Marais</h1>
          <p className="car-hero-subtitle">Porte du Cotentin</p>
          <p className="car-hero-lede">
            Territoire d&apos;histoire et de nature, au cœur du Parc naturel régional des Marais du Cotentin et du Bessin. Retrouvez vos
            démarches, l&apos;agenda et toute la vie de votre commune.
          </p>
          <div className="car-hero-actions">
            <button
              type="button"
              className="car-hero-btn car-hero-btn-primary"
              onClick={() => scrollTo('demarches')}
              aria-label="Accéder à la section Mes démarches"
            >
              Accéder à mes démarches
            </button>
            <button
              type="button"
              className="car-hero-btn car-hero-btn-ghost"
              onClick={() => scrollTo('patrimoine')}
              aria-label="Découvrir le patrimoine et tourisme"
            >
              Découvrir la ville
            </button>
          </div>
        </div>
      </header>

      <div className="car-marees" aria-label="Repères du jour à Carentan">
        <div className="car-marees-inner">
          <div className="car-marees-item" title="Marée haute · port de Carentan">
            <Icon name="droplet" size={16} color="#005A70" />
            <span className="car-marees-label">PM</span>
            <span className="car-marees-val">07h42 · 6,90 m</span>
          </div>
          <span className="car-marees-sep" aria-hidden />
          <div className="car-marees-item" title="Marée basse">
            <Icon name="droplet" size={16} color="#52D1A3" />
            <span className="car-marees-label">BM</span>
            <span className="car-marees-val">14h18 · 1,60 m</span>
          </div>
          <span className="car-marees-sep" aria-hidden />
          <div className="car-marees-item">
            <Icon name="signpost" size={16} color="#005A70" />
            <span className="car-marees-label">Ciel</span>
            <span className="car-marees-val">Éclaircies · 15°C</span>
          </div>
          <span className="car-marees-sep" aria-hidden />
          <div className="car-marees-item">
            <Icon name="calendar" size={16} color="#005A70" />
            <span className="car-marees-label">Marché</span>
            <span className="car-marees-val">Lundi · Place de la République</span>
          </div>
        </div>
      </div>

      <main role="main" style={{ position: 'relative' }}>
        <section id="acces-rapides" className="car-reveal" aria-labelledby="acces-title" style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px) 88px' }}>
          <p className="car-kicker">Comme sur le site officiel</p>
          <div className="car-egg-inline">
            {eggsFor("acces").map((egg) => (
              <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
            ))}
          </div>
          <h2 id="acces-title" className="car-section-title">Accès rapides</h2>
          <p style={{ color: 'var(--car-muted)', lineHeight: 1.65, maxWidth: 560, marginBottom: 28, fontSize: 15 }}>
            Raccourcis vers les services les plus demandés — démarches, vie quotidienne, infos locales.
          </p>
          <div style={{ display: 'grid', gap: 22, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {ACCES_RAPIDES.map(({ t, d, href, img, icon }) => (
              <a
                key={t}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="car-card"
                style={{ cursor: 'pointer', display: 'block', color: 'inherit' }}
              >
                <span className="car-card-iconwrap">
                  <span className="car-card-iconbadge" aria-hidden>
                    <Icon name={icon} size={22} />
                  </span>
                  <img src={img} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />
                </span>
                <div className="car-display" style={{ fontSize: 16, fontWeight: 600, color: primaryColor, marginBottom: 6 }}>
                  {t}
                </div>
                <p style={{ fontSize: 13, color: 'var(--car-muted)', lineHeight: 1.45, margin: 0 }}>{d}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="mairie" className="car-reveal" style={{ background: 'var(--car-paper2)', borderTop: '1px solid rgba(28,25,23,.06)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)' }}>
            <p className="car-kicker">Institution</p>
            <div className="car-egg-inline">
              {eggsFor("mairie").map((egg) => (
                <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
              ))}
            </div>
            <h2 className="car-section-title">La Mairie</h2>
            <p style={{ color: 'var(--car-muted)', lineHeight: 1.65, maxWidth: 560, marginBottom: 28, fontSize: 15 }}>
              Bulletin municipal, budgets, conseils, marchés publics — structure type site municipal.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {BLOC_MAIRIE_LINKS.map((item) => (
                <li key={item.label} style={{ listStyle: 'none' }}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '16px 18px',
                      background: '#fff',
                      borderRadius: 10,
                      border: '1px solid rgba(28,25,23,.08)',
                      fontWeight: 500,
                      fontSize: 14,
                      color: 'var(--car-ink)',
                    }}
                  >
                    {item.label} <span style={{ color: primaryColor }}>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="demarches" className="car-reveal" style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)' }}>
          <p className="car-kicker">Usagers</p>
          <div className="car-egg-inline">
            {eggsFor("demarches").map((egg) => (
              <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
            ))}
          </div>
          <h2 className="car-section-title">Mes démarches</h2>
          <div style={{ display: 'grid', gap: 10, maxWidth: 640 }}>
            {DEMARCHES_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '18px 20px',
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid var(--car-mist)',
                  fontWeight: 500,
                  fontSize: 15,
                  color: 'inherit',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                  <span className="car-demarche-icon" aria-hidden>
                    <Icon name={item.icon} size={22} />
                  </span>
                  <span>{item.label}</span>
                </span>
                <span style={{ color: primaryColor, fontSize: 18, opacity: 0.85, flexShrink: 0 }} aria-hidden>→</span>
              </a>
            ))}
          </div>
        </section>

        <section id="infos" className="car-reveal" style={{ background: '#fff', borderTop: '1px solid rgba(28,25,23,.06)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)' }}>
            <p className="car-kicker">Quotidien</p>
            <div className="car-egg-inline">
              {eggsFor("infos").map((egg) => (
                <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
              ))}
            </div>
            <h2 className="car-section-title">Informations pratiques</h2>
            <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {INFOS_LINKS.map(({ t, d, href, img, icon, tag }) => (
                <a key={t} href={href} target="_blank" rel="noopener noreferrer" className="car-card" style={{ display: 'block', color: 'inherit' }}>
                  <span className="car-card-iconwrap">
                    <span className="car-card-iconbadge" aria-hidden>
                      <Icon name={icon} size={22} />
                    </span>
                    <img src={img} alt="" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 10, marginBottom: 10 }} />
                  </span>
                  <div className="car-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: primaryColor }}>{t}</div>
                  <p style={{ margin: 0, fontSize: 14, color: 'var(--car-muted)', lineHeight: 1.45 }}>{d}</p>
                  {tag ? <span className="car-card-tag"><Icon name={icon} size={12} />{tag}</span> : null}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="patrimoine" className="car-reveal" style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)' }}>
          <p className="car-kicker">Territoire</p>
          <div className="car-egg-inline">
            {eggsFor("patrimoine").map((egg) => (
              <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
            ))}
          </div>
          <h2 className="car-section-title">Patrimoine & tourisme</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {PATRIMOINE_LINKS.map(({ t, d, href, img, tags }, i) => (
              <div
                key={t}
                className="car-pat-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
                  gap: 28,
                  alignItems: 'center',
                }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    order: i % 2 === 1 ? 2 : 0,
                    minHeight: 160,
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '1px solid rgba(13,60,110,.2)',
                    display: 'block',
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', minHeight: 160, objectFit: 'cover' }} />
                </a>
                <div style={{ order: i % 2 === 1 ? 1 : 0 }}>
                  <h3 className="car-display" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)', fontWeight: 600, color: primaryColor, marginBottom: 10 }}>
                    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      {t}
                    </a>
                  </h3>
                  <p style={{ color: 'var(--car-muted)', lineHeight: 1.65, margin: 0, fontSize: 15 }}>{d}</p>
                  {tags && tags.length > 0 ? (
                    <div className="car-pat-tags">
                      {tags.map((tg) => (
                        <span key={tg.label} className="car-pat-tag">
                          <Icon name={tg.icon} size={13} />
                          {tg.label}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="car-bocage-sep" aria-hidden>
          <svg viewBox="0 0 1200 38" preserveAspectRatio="none">
            <defs>
              <linearGradient id="carBocGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#52D1A3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#005A70" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path
              d="M0,38 L0,28 C30,20 60,14 90,18 C120,22 150,8 180,10 C210,12 240,4 270,12 C300,20 330,10 360,14 C390,18 420,6 450,12 C480,18 510,8 540,14 C570,20 600,4 630,10 C660,16 690,22 720,14 C750,6 780,18 810,14 C840,10 870,22 900,18 C930,14 960,6 990,12 C1020,18 1050,10 1080,16 C1110,22 1140,8 1170,14 C1185,17 1200,24 1200,28 L1200,38 Z"
              fill="url(#carBocGrad)"
            />
            <path
              d="M140,22 L148,10 L156,22 M310,24 L318,12 L326,24 M520,22 L528,8 L536,22 M730,24 L738,14 L746,24 M920,22 L928,10 L936,22 M1080,24 L1088,12 L1096,24"
              stroke="#005A70" strokeOpacity="0.25" strokeWidth="1" fill="none" strokeLinecap="round"
            />
          </svg>
        </div>

        <section id="culture" className="car-reveal" style={{ background: 'var(--car-paper2)', borderTop: '1px solid rgba(28,25,23,.06)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)' }}>
            <p className="car-kicker">À venir</p>
            <h2 className="car-section-title">Culture & loisirs</h2>
            <p style={{ color: 'var(--car-muted)', marginBottom: 24, fontSize: 15 }}>
              Liens directs vers l&apos;agenda, la saison culturelle, les musées et le dispositif Pass&apos;Sport sur carentanlesmarais.fr.
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              {cultureLinks.map((ev) => (
                <a
                  key={ev.key}
                  href={ev.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0,1fr) auto',
                    gap: 16,
                    alignItems: 'center',
                    padding: '16px 20px',
                    background: '#fff',
                    borderRadius: 12,
                    border: '1px solid rgba(28,25,23,.07)',
                    color: 'inherit',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--car-ink)', marginBottom: 4 }}>{ev.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--car-muted)' }}>{ev.sub}</div>
                  </div>
                  <span style={{ color: primaryColor, fontSize: 18 }} aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>

        <div className="car-divider-hedge" aria-hidden />

        <section id="memoire" className="car-reveal" style={{ background: '#fff', borderTop: '1px solid rgba(13,60,110,.08)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)' }}>
            <p className="car-kicker">Mémoire</p>
            <h2 className="car-section-title">Débarquement & mémoire locale</h2>
            <p style={{ color: 'var(--car-muted)', marginBottom: 22, fontSize: 15, maxWidth: 760, lineHeight: 1.7 }}>
              Ici, on parle du bocage, des marais… et des jours où l&apos;Histoire a traversé la ville. Pour une présentation en mairie,
              cette section assume une mise en scène plus "carte postale" : repères, liens utiles, et clins d&apos;œil graphiques.
            </p>
            <div className="car-egg-inline" style={{ marginBottom: 14 }}>
              {eggsFor("memoire").map((egg) => (
                <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
              ))}
              {eggsFor("memoire2").map((egg) => (
                <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
              ))}
            </div>

            <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: 20 }}>
              <a href={LINKS.musees} target="_blank" rel="noopener noreferrer" className="car-card" style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(13,60,110,.10)', display: 'grid', placeItems: 'center', color: primaryColor }} aria-hidden>
                    <Icon name="parachute" size={22} />
                  </span>
                  <div>
                    <div className="car-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--car-ink)' }}>Musées & D-Day Experience</div>
                    <div style={{ fontSize: 13, color: 'var(--car-muted)' }}>Sorties, mémoire, expositions</div>
                  </div>
                </div>
                <p style={{ margin: 0, color: 'var(--car-muted)', fontSize: 14, lineHeight: 1.6 }}>
                  Pour donner du concret : la page "Musées" du site municipal (avec le parcours D-Day Experience).
                </p>
              </a>

              <a href={LINKS.mapping} target="_blank" rel="noopener noreferrer" className="car-card" style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(184,134,11,.14)', display: 'grid', placeItems: 'center', color: '#7a5606' }} aria-hidden>
                    <Icon name="signpost" size={22} />
                  </span>
                  <div>
                    <div className="car-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--car-ink)' }}>Mapping & projections</div>
                    <div style={{ fontSize: 13, color: 'var(--car-muted)' }}>Un clin d&apos;œil moderne</div>
                  </div>
                </div>
                <p style={{ margin: 0, color: 'var(--car-muted)', fontSize: 14, lineHeight: 1.6 }}>
                  Lien direct vers la page "Mapping" du site officiel (pratique pour une slide "animation du centre-ville").
                </p>
              </a>

              <a href={LINKS.marcheHistoire} target="_blank" rel="noopener noreferrer" className="car-card" style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(13,60,110,.10)', display: 'grid', placeItems: 'center', color: primaryColor }} aria-hidden>
                    <Icon name="book" size={22} />
                  </span>
                  <div>
                    <div className="car-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--car-ink)' }}>Parcours "À pied dans l&apos;histoire"</div>
                    <div style={{ fontSize: 13, color: 'var(--car-muted)' }}>Balade patrimoniale</div>
                  </div>
                </div>
                <p style={{ margin: 0, color: 'var(--car-muted)', fontSize: 14, lineHeight: 1.6 }}>
                  Pour raconter la ville en mode promenade : une page prête à projeter (et très "terroir").
                </p>
              </a>
            </div>

            <div className="car-memoire-split" style={{ display: 'grid', gap: 28, gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
              <div className="car-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(13,60,110,.10)', display: 'grid', placeItems: 'center', color: primaryColor }} aria-hidden>
                    <Icon name="townhall" size={22} />
                  </span>
                  <div>
                    <div className="car-display" style={{ fontSize: 18, fontWeight: 700, color: 'var(--car-ink)' }}>Repères pour une slide</div>
                    <div style={{ fontSize: 13, color: 'var(--car-muted)' }}>3 points faciles à raconter</div>
                  </div>
                </div>
                <ol style={{ margin: 0, paddingLeft: 18, color: 'var(--car-muted)', lineHeight: 1.75, fontSize: 14 }}>
                  <li><strong>Le bocage</strong> : un paysage qui protège et qui ralentit — haies, chemins creux, visibilité courte.</li>
                  <li><strong>Les marais</strong> : une identité locale forte (eau, canaux, saisonnalité).</li>
                  <li><strong>Juin 1944</strong> : combats et libération dans le cadre de la Bataille de Normandie — mémoire vivante.</li>
                </ol>
              </div>

              <div className="car-postcard-wrap">
                <div className="car-postcard">
                  <div className="car-postcard-stamp" aria-hidden>
                    <strong>RF</strong>
                    <span>Carentan</span>
                    <span>50 c.</span>
                  </div>
                  <div className="car-postcard-kicker">Carte postale · Juin 1944</div>
                  <h3 className="car-postcard-title">Lettre d&apos;un habitant du bocage</h3>
                  <p className="car-postcard-text">
                    « Les haies gardent encore la mémoire des jours de juin. Ici, l&apos;Histoire ne se
                    raconte pas de loin — elle se pose au coin d&apos;un chemin creux, entre les marais et
                    la mer. »
                  </p>
                  <span className="car-postcard-sign">— Extrait d&apos;archives municipales</span>
                  <div className="car-postcard-tampon" aria-hidden>
                    <span>Libération</span>
                    <span className="big">12 · VI</span>
                    <span>1944</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </section>

        <section id="urgence" className="car-reveal" style={{ background: '#fff', borderTop: '1px solid rgba(28,25,23,.06)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 24px' }}>
            <p className="car-kicker">Sécurité</p>
            <h2 className="car-section-title">Numéros d&apos;urgence</h2>
            <p style={{ color: 'var(--car-muted)', marginBottom: 16, fontSize: 15 }}>
              Visuel repris du site officiel{' '}
              <a href={LINKS.accueil} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>
                carentanlesmarais.fr
              </a>
              .
            </p>
            <a href={LINKS.accueil} target="_blank" rel="noopener noreferrer" style={{ display: 'block', maxWidth: 720 }}>
              <img src={ASSETS.numerosUrgence} alt="Numéros d'urgence : 15, 17, 18, 112" style={{ width: '100%', height: 'auto', borderRadius: 12 }} />
            </a>
          </div>
        </section>

        <section id="histoire" className="car-reveal" style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(72px, 9vw, 112px) clamp(24px, 5vw, 48px)', background: 'var(--car-paper2)', borderTop: '1px solid rgba(28,25,23,.06)', position: 'relative' }}>
          <svg className="car-rose" style={{ top: 40, right: 40 }} viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M50 6 L54 50 L50 94 L46 50 Z" fill="currentColor" opacity="0.9" />
            <path d="M6 50 L50 46 L94 50 L50 54 Z" fill="currentColor" opacity="0.6" />
            <path d="M19 19 L50 48 L81 81 L48 50 Z" fill="currentColor" opacity="0.35" />
            <path d="M81 19 L52 48 L19 81 L50 52 Z" fill="currentColor" opacity="0.35" />
            <text x="50" y="12" fontSize="7" fontFamily="Merriweather, serif" textAnchor="middle" fill="currentColor">N</text>
            <text x="92" y="53" fontSize="7" fontFamily="Merriweather, serif" textAnchor="middle" fill="currentColor">E</text>
            <text x="50" y="98" fontSize="7" fontFamily="Merriweather, serif" textAnchor="middle" fill="currentColor">S</text>
            <text x="8" y="53" fontSize="7" fontFamily="Merriweather, serif" textAnchor="middle" fill="currentColor">O</text>
          </svg>
          <p className="car-kicker">Mémoire</p>
          <h2 className="car-section-title">Histoire de Carentan-les-Marais</h2>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', alignItems: 'start' }}>
            <div>
              <p style={{ color: 'var(--car-muted)', lineHeight: 1.75, fontSize: 15, margin: '0 0 16px' }}>
                Porte du Cotentin, Carentan est une ville ancienne, liée aux marais et aux voies d&apos;eau. Elle est mondialement
                associée au <strong>débarquement de Normandie</strong> : la libération de la ville en juin 1944 s&apos;inscrit dans
                la bataille de Normandie, avec des combats intenses dans le bocage.{" "}
                <span className="car-egg-inline car-egg-inline--text">
                  {eggsFor("histoire").map((egg) => (
                    <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
                  ))}
                </span>
              </p>
              <p style={{ color: 'var(--car-muted)', lineHeight: 1.75, fontSize: 15, margin: '0 0 16px' }}>
                La commune nouvelle regroupe douze communes ; le site municipal publie des fiches sur l&apos;histoire locale
                (canal des Espagnols, écoles, fêtes…).
              </p>
              <a
                href={LINKS.histoire}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '12px 20px', background: primaryColor, color: '#fff', borderRadius: 8, fontWeight: 600, fontSize: 14 }}
              >
                Faits marquants — site officiel →
              </a>
              <p style={{ marginTop: 12 }}>
                <a href={LINKS.marcheHistoire} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>
                  Parcours « À pied dans l&apos;histoire »
                </a>
              </p>
            </div>
            <div>
              <h3 className="car-display" style={{ fontSize: 18, marginBottom: 12, color: primaryColor, fontStyle: 'italic' }}>Repères dans le temps</h3>
              <ul className="car-timeline">
                <li className="car-timeline-item">
                  <div className="car-timeline-date">Moyen Âge</div>
                  <div className="car-timeline-title">Carrefour des marais</div>
                  <p className="car-timeline-text">Ville marchande, reliée à la mer par la Douve et la Taute.</p>
                </li>
                <li className="car-timeline-item">
                  <div className="car-timeline-date">1336 – 1453</div>
                  <div className="car-timeline-title">Guerre de Cent Ans</div>
                  <p className="car-timeline-text">Carentan, place forte disputée entre Français et Anglais.</p>
                </li>
                <li className="car-timeline-item">
                  <div className="car-timeline-date">12 juin 1944</div>
                  <div className="car-timeline-title">Libération</div>
                  <p className="car-timeline-text">Prise de la ville par la 101ᵉ Airborne après de durs combats dans le bocage.</p>
                </li>
                <li className="car-timeline-item">
                  <div className="car-timeline-date">1ᵉʳ janvier 2016</div>
                  <div className="car-timeline-title">Commune nouvelle</div>
                  <p className="car-timeline-text">Fusion de 12 communes sous le nom de Carentan-les-Marais.</p>
                </li>
              </ul>
              <h3 className="car-display" style={{ fontSize: 18, marginBottom: 12, marginTop: 22, color: primaryColor }}>Fiches PDF (site officiel)</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--car-muted)', fontSize: 14, lineHeight: 1.8 }}>
                {HISTOIRE_PDFS.map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 500 }}>
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="car-reveal" style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 96px' }}>
          <p className="car-kicker">Mairie</p>
          <div className="car-egg-inline">
            {eggsFor("contact").map((egg) => (
              <CarHistoryEgg key={egg.id} {...egg} openId={openEggId} setOpenId={setOpenEggId} />
            ))}
          </div>
          <h2 className="car-section-title">Contact & accueil</h2>
          <div style={{ display: 'grid', gap: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', alignItems: 'start' }}>
            <div>
              <h3 className="car-display" style={{ fontSize: 18, marginBottom: 14, color: primaryColor }}>Coordonnées</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--car-ink)', fontSize: 15 }}>Hôtel de ville</p>
                  <p style={{ color: 'var(--car-muted)', lineHeight: 1.7, fontSize: 14 }}>{address}</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--car-ink)', fontSize: 15 }}>Tél. principal</p>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: primaryColor, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-block', padding: '8px 0' }}>
                    {phone}
                  </a>
                </div>
                <div>
                  <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--car-ink)', fontSize: 15 }}>Site officiel</p>
                  <a href={siteUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600, wordBreak: 'break-word', fontSize: 14, textDecoration: 'none', display: 'inline-block', padding: '8px 0' }}>
                    {siteUrl.replace(/^https?:\/\//, '')} →
                  </a>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Merci pour votre message. Vous serez recontacté rapidement.');
                e.target.reset();
              }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <h3 className="car-display" style={{ fontSize: 18, marginBottom: 20, color: primaryColor }}>Nous contacter</h3>

              <div className="car-form-group">
                <label htmlFor="contact-name" className="car-form-label">
                  Votre nom <span className="required">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="car-form-input"
                  placeholder="Prénom Nom"
                  required
                  aria-required="true"
                />
              </div>

              <div className="car-form-group">
                <label htmlFor="contact-email" className="car-form-label">
                  E-mail <span className="required">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="car-form-input"
                  placeholder="votre.email@domaine.fr"
                  required
                  aria-required="true"
                />
                <div className="car-form-helper">Nous vous recontacterons à cette adresse.</div>
              </div>

              <div className="car-form-group">
                <label htmlFor="contact-subject" className="car-form-label">
                  Sujet <span className="required">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  className="car-form-input"
                  placeholder="Objet de votre demande"
                  required
                  aria-required="true"
                />
              </div>

              <div className="car-form-group">
                <label htmlFor="contact-message" className="car-form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="car-form-textarea"
                  placeholder="Décrivez votre demande ou remarque…"
                  required
                  aria-required="true"
                />
                <div className="car-form-helper">Minimum 10 caractères.</div>
              </div>

              <div className="car-form-actions">
                <button type="submit" className="car-form-submit">
                  Envoyer
                </button>
                <button
                  type="reset"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    padding: '14px 28px',
                    border: '1px solid rgba(0,90,112,.25)',
                    background: 'transparent',
                    color: primaryColor,
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0,90,112,.06)';
                    e.target.style.borderColor = 'rgba(0,90,112,.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = 'rgba(0,90,112,.25)';
                  }}
                >
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer
        role="contentinfo"
        style={{
          background: 'linear-gradient(180deg, #0a1f38 0%, #061428 100%)',
          color: 'rgba(255,255,255,.72)',
          padding: '32px 24px 40px',
          fontSize: 13,
          borderTop: '1px solid rgba(13,60,110,.35)',
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gap: 24,
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              marginBottom: 24,
              alignItems: 'start',
            }}
          >
            <div>
              <div className="car-display" style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>
                Numéros d&apos;urgence
              </div>
              <span style={{ opacity: 0.92 }}>15 · 17 · 18 · 112</span>
            </div>
            <div>
              <div className="car-display" style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>
                Cartographie
              </div>
              <a
                href={LINKS.cartographie}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,.9)', fontWeight: 600 }}
              >
                Plans et cartes — site officiel
              </a>
              <a href={LINKS.cartographie} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: 10 }}>
                <img src={ASSETS.planVille} alt="" style={{ maxWidth: 200, height: 'auto', borderRadius: 8, border: '1px solid rgba(255,255,255,.15)' }} />
              </a>
            </div>
            <div>
              <div className="car-display" style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 8 }}>
                Suivre la ville
              </div>
              <a
                href={LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,.9)', fontWeight: 600 }}
              >
                Facebook — Ville de Carentan-les-Marais
              </a>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 20,
              marginBottom: 20,
              opacity: 0.85,
            }}
          >
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,.55)' }}>Partenaires</span>
            <a href={LINKS.accueil} target="_blank" rel="noopener noreferrer">
              <img src={ASSETS.partenaireComcom} alt="" style={{ height: 36, width: 'auto' }} />
            </a>
            <a href={LINKS.otBaieCotentin} target="_blank" rel="noopener noreferrer">
              <img src={ASSETS.partenaireBaie} alt="" style={{ height: 36, width: 'auto' }} />
            </a>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 14, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center', fontSize: 12, opacity: 0.78 }}>
            <span>
              © {new Date().getFullYear()} {name} — maquette de présentation (non officielle)
            </span>
            <Link to="/demos" style={{ color: 'rgba(255,255,255,.9)', fontWeight: 600 }}>
              ← Retour aux démos Kyrio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
