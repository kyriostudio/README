import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ChevronRightIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>);
const StarIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const UsersIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>);
const ClockIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const ShieldIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const HeartIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>);
const ZapIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
const GlobeIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z"/></svg>);
const PaletteIcon = () => (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>);

const SERVICE_ICONS = [GlobeIcon, ZapIcon, PaletteIcon, HeartIcon, ShieldIcon, ClockIcon];

const SERVICE_COLORS = ['#6366f1', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#a78bfa'];

const DEFAULT_SERVICES = [
  { title: 'Création de site web', description: 'Sites vitrines, e-commerce et applications web sur mesure, adaptés à votre activité et vos objectifs.' },
  { title: 'Référencement SEO', description: 'Optimisation de votre visibilité sur les moteurs de recherche pour attirer plus de clients qualifiés.' },
  { title: 'Design graphique', description: 'Identité visuelle, logos et supports de communication qui reflètent votre image de marque.' },
  { title: 'Marketing digital', description: 'Stratégies digitales, réseaux sociaux et campagnes publicitaires ciblées pour votre croissance.' },
  { title: 'Maintenance web', description: 'Hébergement, mises à jour, sauvegardes et support technique pour un site toujours performant.' },
  { title: 'Formation', description: 'Accompagnement et formation pour vous rendre autonome dans la gestion de votre présence en ligne.' },
];

const DEFAULT_TESTIMONIALS = [
  { name: 'Marie Dupont', company: 'Boulangerie du Marché', quote: "Grâce à notre nouveau site, nos commandes en ligne ont augmenté de 40%. Un travail remarquable et professionnel.", avatar: 'MD', color: '#6366f1' },
  { name: 'Thomas Laurent', company: 'TL Consulting', quote: "Une équipe réactive et créative. Notre site reflète parfaitement notre image de marque. Je recommande vivement.", avatar: 'TL', color: '#06b6d4' },
  { name: 'Sophie Martin', company: 'Fleurs & Jardins', quote: "Le référencement a transformé notre visibilité. Nous sommes passés de 5 à 50 demandes de devis par mois !", avatar: 'SM', color: '#ec4899' },
];

function useScrollReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.dataset.visible = 'true'; observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (el) => { if (el && !refs.current.includes(el)) refs.current.push(el); };
}

export default function SiteVitrine({ client = {} }) {
  const {
    name = 'Votre Entreprise',
    tagline = 'Votre partenaire digital de confiance',
    phone = '01 23 45 67 89',
    email = 'contact@votre-entreprise.fr',
    address = '12 Rue de la Paix, 75002 Paris',
    primaryColor = '#6366f1',
    heroImage = '',
    logo = '',
    description = 'Nous accompagnons les entreprises dans leur transformation digitale avec des solutions web modernes, performantes et sur mesure.',
    services: clientServices = [],
  } = client;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const addRef = useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const services = clientServices.length > 0
    ? clientServices.map((s, i) => typeof s === 'string' ? { title: s, description: DEFAULT_SERVICES[i]?.description || '' } : s)
    : DEFAULT_SERVICES;

  const darken = (hex, amt) => {
    const n = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (n >> 16) - amt);
    const g = Math.max(0, ((n >> 8) & 0xff) - amt);
    const b = Math.max(0, (n & 0xff) - amt);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const NAV = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Services', href: '#services' },
    { label: 'À propos', href: '#apropos' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'Contact', href: '#contact' },
  ];

  const STATS = [
    { num: '10+', label: "Années d'expérience", Icon: ClockIcon, color: '#6366f1' },
    { num: '150+', label: 'Clients accompagnés', Icon: UsersIcon, color: '#06b6d4' },
    { num: '98%', label: 'Taux de satisfaction', Icon: HeartIcon, color: '#ec4899' },
    { num: '24/7', label: 'Support disponible', Icon: ShieldIcon, color: '#10b981' },
  ];

  const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
.sv *{margin:0;padding:0;box-sizing:border-box}
.sv{font-family:'Inter',system-ui,sans-serif;color:#1e293b;line-height:1.6;overflow-x:hidden}
.sv h1,.sv h2,.sv h3,.sv h4{font-family:'Playfair Display',Georgia,serif;line-height:1.25}
.sv-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.1rem 2rem;transition:all .3s}
.sv-nav.stuck{background:rgba(255,255,255,.97);backdrop-filter:blur(10px);box-shadow:0 1px 16px rgba(0,0,0,.07);padding:.65rem 2rem}
.sv-nav-in{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between}
.sv-brand{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;text-decoration:none;transition:color .3s}
.sv-brand img{height:38px;object-fit:contain}
.sv-links{display:flex;gap:1.8rem;align-items:center;list-style:none}
.sv-links a{text-decoration:none;font-weight:500;font-size:.92rem;transition:color .2s}
.sv-btn{display:inline-flex;align-items:center;gap:.35rem;padding:.6rem 1.4rem;border-radius:8px;border:none;font-weight:600;font-size:.9rem;cursor:pointer;transition:all .25s;text-decoration:none}
.sv-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(99,102,241,.3)}
.sv-burger{display:none;background:none;border:none;cursor:pointer;padding:.4rem}
.sv-mob{display:none;position:fixed;inset:0;background:rgba(255,255,255,.98);z-index:99;flex-direction:column;align-items:center;justify-content:center;gap:2rem}
.sv-mob.open{display:flex}
.sv-mob a{font-size:1.3rem;text-decoration:none;color:#1e293b;font-weight:600}
.sv-mob-x{position:absolute;top:1.4rem;right:1.4rem;background:none;border:none;font-size:2rem;cursor:pointer;color:#1e293b}
.sv-hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;text-align:center;padding:2rem}
.sv-hero-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(99,102,241,.7),rgba(6,182,212,.4));z-index:1}
.sv-hero-ct{position:relative;z-index:2;max-width:780px}
.sv-hero h1{font-size:3.4rem;color:#fff;margin-bottom:1rem;opacity:0;animation:svUp .8s ease forwards .2s}
.sv-hero p{font-size:1.2rem;color:rgba(255,255,255,.88);margin-bottom:2.2rem;max-width:600px;margin-left:auto;margin-right:auto;opacity:0;animation:svUp .8s ease forwards .4s}
.sv-hero-bts{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;opacity:0;animation:svUp .8s ease forwards .6s}
.sv-btn-ol{padding:.75rem 2rem;border-radius:8px;font-weight:600;font-size:1rem;cursor:pointer;transition:all .3s;text-decoration:none;background:transparent;color:#fff;border:2px solid #fff}
.sv-btn-ol:hover{background:#fff;color:#1e293b}
@keyframes svUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
.sv-sec{padding:5.5rem 2rem;opacity:0;transform:translateY(36px);transition:opacity .65s ease,transform .65s ease}
.sv-sec[data-visible="true"]{opacity:1;transform:translateY(0)}
.sv-inner{max-width:1200px;margin:0 auto}
.sv-stitle{text-align:center;font-size:2.4rem;margin-bottom:.5rem}
.sv-line{width:56px;height:3px;border-radius:2px;margin:.9rem auto 1.2rem}
.sv-ssub{text-align:center;color:#64748b;font-size:1.05rem;max-width:560px;margin:0 auto 3rem}
.sv-sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.sv-scard{background:#fff;border-radius:14px;padding:1.8rem;box-shadow:0 1px 4px rgba(0,0,0,.05),0 4px 16px rgba(0,0,0,.03);transition:all .3s;border:1px solid #f1f5f9}
.sv-scard:hover{transform:translateY(-5px);box-shadow:0 10px 36px rgba(99,102,241,.12);border-color:rgba(99,102,241,.2)}
.sv-sicon{width:52px;height:52px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem}
.sv-scard h3{font-size:1.1rem;margin-bottom:.6rem;font-family:'Inter',sans-serif;font-weight:600}
.sv-scard p{color:#64748b;font-size:.93rem;line-height:1.65}
.sv-about{background:#f8fafc}
.sv-agrid{display:grid;grid-template-columns:1fr 1fr;gap:3.5rem;align-items:center}
.sv-atxt h2{font-size:2.1rem;margin-bottom:1.3rem;text-align:left}
.sv-atxt p{color:#475569;font-size:1.02rem;line-height:1.75;margin-bottom:1.2rem}
.sv-stgrid{display:grid;grid-template-columns:1fr 1fr;gap:1.3rem}
.sv-stat{background:#fff;border-radius:14px;padding:1.5rem;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.04);transition:transform .3s}
.sv-stat:hover{transform:translateY(-3px)}
.sv-stat-n{font-size:2.3rem;font-weight:700;font-family:'Playfair Display',serif}
.sv-stat-l{color:#64748b;font-size:.87rem;margin-top:.2rem}
.sv-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem}
.sv-tcard{background:#f8fafc;border-radius:14px;padding:1.8rem;border:1px solid #e2e8f0;transition:all .3s}
.sv-tcard:hover{box-shadow:0 8px 28px rgba(99,102,241,.1);border-color:rgba(99,102,241,.2)}
.sv-stars{display:flex;gap:2px;margin-bottom:.85rem}
.sv-tq{color:#475569;font-size:.93rem;line-height:1.7;font-style:italic;margin-bottom:1.3rem}
.sv-tauth{display:flex;align-items:center;gap:.7rem}
.sv-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:.82rem}
.sv-aname{font-weight:600;font-size:.93rem}
.sv-acomp{color:#94a3b8;font-size:.82rem}
.sv-ctgrid{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem}
.sv-ccards{display:flex;flex-direction:column;gap:1.1rem}
.sv-cc{display:flex;align-items:center;gap:1rem;background:#fff;padding:1.15rem 1.4rem;border-radius:11px;box-shadow:0 1px 6px rgba(0,0,0,.03);transition:all .3s;border:1px solid #f1f5f9}
.sv-cc:hover{transform:translateX(5px);box-shadow:0 4px 18px rgba(99,102,241,.1)}
.sv-cci{width:46px;height:46px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sv-cc h4{font-family:'Inter',sans-serif;font-weight:600;font-size:.93rem}
.sv-cc p{color:#64748b;font-size:.88rem}
.sv-form{background:#fff;border-radius:14px;padding:1.8rem;box-shadow:0 2px 10px rgba(0,0,0,.03);border:1px solid #f1f5f9}
.sv-form h3{font-size:1.2rem;margin-bottom:1.3rem;font-family:'Inter',sans-serif;font-weight:600}
.sv-fg{margin-bottom:.9rem}
.sv-fg label{display:block;font-size:.82rem;font-weight:500;margin-bottom:.35rem;color:#475569}
.sv-fg input,.sv-fg textarea{width:100%;padding:.65rem .9rem;border:1px solid #e2e8f0;border-radius:8px;font-size:.93rem;font-family:'Inter',sans-serif;transition:border-color .2s;outline:none;background:#f8fafc}
.sv-fg input:focus,.sv-fg textarea:focus{border-color:#6366f1;background:#fff}
.sv-fg textarea{resize:vertical;min-height:90px}
.sv-fsub{width:100%;padding:.75rem;border:none;border-radius:8px;font-weight:600;font-size:.95rem;cursor:pointer;margin-top:.4rem;transition:all .25s;color:#fff}
.sv-fsub:hover{opacity:.9;transform:translateY(-1px)}
.sv-ft{background:#0d0f18;color:#cbd5e1;padding:3.5rem 2rem 1.8rem}
.sv-ft-in{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:2.5rem}
.sv-ft h3{color:#fff;font-size:1.05rem;margin-bottom:.9rem;font-family:'Inter',sans-serif;font-weight:600}
.sv-ft p{font-size:.88rem;line-height:1.7}
.sv-ftl{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.sv-ftl a{color:#94a3b8;text-decoration:none;font-size:.88rem;transition:color .2s;display:inline-flex;align-items:center;gap:.3rem}
.sv-ftl a:hover{color:#fff}
.sv-ftb{max-width:1200px;margin:2.5rem auto 0;padding-top:1.5rem;border-top:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;font-size:.82rem;flex-wrap:wrap;gap:.5rem}
.sv-ftb a{color:#94a3b8;text-decoration:none;transition:color .2s}
.sv-ftb a:hover{color:#fff}
@media(max-width:900px){
  .sv-links{display:none}.sv-burger{display:block}
  .sv-sgrid,.sv-tgrid{grid-template-columns:1fr}
  .sv-agrid,.sv-ctgrid,.sv-ft-in{grid-template-columns:1fr}
  .sv-hero h1{font-size:2.2rem}.sv-hero p{font-size:1rem}
  .sv-sec{padding:3.5rem 1.2rem}
  .sv-ftb{flex-direction:column;text-align:center}
}
@media(max-width:600px){
  .sv-stgrid{grid-template-columns:1fr}
  .sv-hero-bts{flex-direction:column;align-items:center}
  .sv-nav{padding:.8rem 1rem}.sv-nav.stuck{padding:.5rem 1rem}
}`;

  return (
    <>
      <style>{CSS}</style>
      <div className="sv" style={{ '--pc': primaryColor }}>
        {/* Navbar */}
        <nav className={'sv-nav' + (scrolled ? ' stuck' : '')}>
          <div className="sv-nav-in">
            {logo
              ? <a href="#accueil" onClick={scrollTo('#accueil')} className="sv-brand"><img src={logo} alt={name} /></a>
              : <a href="#accueil" onClick={scrollTo('#accueil')} className="sv-brand" style={{ color: scrolled ? primaryColor : '#fff' }}>{name}</a>
            }
            <ul className="sv-links">
              {NAV.map((l) => (
                <li key={l.href}><a href={l.href} onClick={scrollTo(l.href)} style={{ color: scrolled ? '#1e293b' : '#fff' }}>{l.label}</a></li>
              ))}
              <li><a href="#contact" onClick={scrollTo('#contact')} className="sv-btn" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff' }}>Devis gratuit</a></li>
            </ul>
            <button className="sv-burger" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#1e293b' : '#fff'} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={'sv-mob' + (menuOpen ? ' open' : '')}>
          <button className="sv-mob-x" onClick={() => setMenuOpen(false)}>&times;</button>
          {NAV.map((l) => <a key={l.href} href={l.href} onClick={scrollTo(l.href)}>{l.label}</a>)}
          <a href="#contact" onClick={scrollTo('#contact')} className="sv-btn" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff' }}>Devis gratuit</a>
        </div>

        {/* Hero */}
        <section id="accueil" className="sv-hero" style={{
          backgroundImage: heroImage ? ('url(' + heroImage + ')') : ('linear-gradient(135deg, ' + primaryColor + ' 0%, ' + darken(primaryColor, 60) + ' 100%)'),
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}>
          <div className="sv-hero-ov" />
          <div className="sv-hero-ct">
            <h1>{tagline}</h1>
            <p>{description}</p>
            <div className="sv-hero-bts">
              <a href="#contact" onClick={scrollTo('#contact')} className="sv-btn" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', padding: '.8rem 2rem', fontSize: '1.02rem' }}>Demander un devis</a>
              <a href="#services" onClick={scrollTo('#services')} className="sv-btn-ol">Nos services</a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="sv-sec" ref={addRef}>
          <div className="sv-inner">
            <h2 className="sv-stitle">Nos Services</h2>
            <div className="sv-line" style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
            <p className="sv-ssub">Des solutions compl&egrave;tes pour d&eacute;velopper votre pr&eacute;sence en ligne et faire grandir votre activit&eacute;.</p>
            <div className="sv-sgrid">
              {services.slice(0, 6).map((s, i) => {
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                const sc = SERVICE_COLORS[i % SERVICE_COLORS.length];
                return (
                  <div className="sv-scard" key={i}>
                    <div className="sv-sicon" style={{ background: sc + '14', color: sc }}><Icon /></div>
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="apropos" className="sv-sec sv-about" ref={addRef}>
          <div className="sv-inner">
            <div className="sv-agrid">
              <div className="sv-atxt">
                <h2>Pourquoi nous choisir&nbsp;?</h2>
                <p>Depuis plus de 10 ans, nous accompagnons les entreprises et artisans dans leur d&eacute;veloppement digital. Notre approche allie cr&eacute;ativit&eacute;, expertise technique et &eacute;coute attentive pour cr&eacute;er des solutions qui g&eacute;n&egrave;rent de vrais r&eacute;sultats.</p>
                <p>Chaque projet est unique. Nous prenons le temps de comprendre vos besoins, votre march&eacute; et vos objectifs pour vous proposer des solutions parfaitement adapt&eacute;es.</p>
                <a href="#contact" onClick={scrollTo('#contact')} className="sv-btn" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', marginTop: '.3rem' }}>
                  Parlons de votre projet <ChevronRightIcon />
                </a>
              </div>
              <div className="sv-stgrid">
                {STATS.map((st, i) => (
                  <div className="sv-stat" key={i}>
                    <div style={{ color: st.color, marginBottom: '.4rem' }}><st.Icon /></div>
                    <div className="sv-stat-n" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{st.num}</div>
                    <div className="sv-stat-l">{st.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="temoignages" className="sv-sec" ref={addRef}>
          <div className="sv-inner">
            <h2 className="sv-stitle">Ce que disent nos clients</h2>
            <div className="sv-line" style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
            <p className="sv-ssub">La satisfaction de nos clients est notre meilleure carte de visite.</p>
            <div className="sv-tgrid">
              {DEFAULT_TESTIMONIALS.map((t, i) => (
                <div className="sv-tcard" key={i}>
                  <div className="sv-stars" style={{ color: '#84cc16' }}>{[...Array(5)].map((_, j) => <StarIcon key={j} />)}</div>
                  <p className="sv-tq">&laquo;&nbsp;{t.quote}&nbsp;&raquo;</p>
                  <div className="sv-tauth">
                    <div className="sv-av" style={{ background: t.color || primaryColor }}>{t.avatar}</div>
                    <div><div className="sv-aname">{t.name}</div><div className="sv-acomp">{t.company}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="sv-sec" style={{ background: '#f8fafc' }} ref={addRef}>
          <div className="sv-inner">
            <h2 className="sv-stitle">Contactez-nous</h2>
            <div className="sv-line" style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)' }} />
            <p className="sv-ssub">Pr&ecirc;t &agrave; lancer votre projet&nbsp;? Contactez-nous pour un devis gratuit et sans engagement.</p>
            <div className="sv-ctgrid">
              <div className="sv-ccards">
                <div className="sv-cc">
                  <div className="sv-cci" style={{ background: '#6366f114', color: '#6366f1' }}><PhoneIcon /></div>
                  <div><h4>T&eacute;l&eacute;phone</h4><p>{phone}</p></div>
                </div>
                <div className="sv-cc">
                  <div className="sv-cci" style={{ background: '#06b6d414', color: '#06b6d4' }}><MailIcon /></div>
                  <div><h4>Email</h4><p>{email}</p></div>
                </div>
                <div className="sv-cc">
                  <div className="sv-cci" style={{ background: '#10b98114', color: '#10b981' }}><MapPinIcon /></div>
                  <div><h4>Adresse</h4><p>{address}</p></div>
                </div>
              </div>
              <div className="sv-form">
                <h3>Envoyer un message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.9rem' }}>
                  <div className="sv-fg"><label>Nom</label><input type="text" placeholder="Votre nom" readOnly /></div>
                  <div className="sv-fg"><label>Email</label><input type="email" placeholder="votre@email.fr" readOnly /></div>
                </div>
                <div className="sv-fg"><label>Sujet</label><input type="text" placeholder="Objet de votre demande" readOnly /></div>
                <div className="sv-fg"><label>Message</label><textarea placeholder="D&eacute;crivez votre projet..." readOnly /></div>
                <button className="sv-fsub" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }} onClick={(e) => e.preventDefault()}>Envoyer le message</button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="sv-ft">
          <div className="sv-ft-in">
            <div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem' }}>{name}</h3>
              <p style={{ maxWidth: 340, marginBottom: '1rem' }}>{description}</p>
              <p style={{ fontSize: '.82rem', color: '#64748b' }}>{address}</p>
            </div>
            <div>
              <h3>Navigation</h3>
              <ul className="sv-ftl">
                {NAV.map((l) => <li key={l.href}><a href={l.href} onClick={scrollTo(l.href)}><ChevronRightIcon />{l.label}</a></li>)}
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul className="sv-ftl">
                <li><a href={'tel:' + phone}>{phone}</a></li>
                <li><a href={'mailto:' + email}>{email}</a></li>
              </ul>
            </div>
          </div>
          <div className="sv-ftb">
            <span>&copy; {new Date().getFullYear()} {name}. Tous droits réservés.</span>
            <span>
              Site réalisé par <strong style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Kyrio</strong>
              {' · '}
              <Link to="/demos" style={{ color: '#94a3b8', textDecoration: 'none' }}>Retour aux démos</Link>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
