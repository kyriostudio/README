import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Maquette « Mairie de Carentan-les-Marais » — repart de zéro.
 * Données : public/clients.json → entrée "carentan" (prop client).
 */
const DEFAULTS = {
  name: 'Mairie de Carentan-les-Marais',
  tagline: 'Commune de Normandie — Manche (50)',
  phone: '02 33 42 00 55',
  address: 'Place de la République — 50500 Carentan',
  siteUrl: 'https://carentanlesmarais.fr',
  heroImage:
    'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?w=1600&q=80',
  primaryColor: '#0d3c6e',
};

const NAV = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'ma-commune', label: 'Ma commune' },
  { id: 'demarches', label: 'Démarches' },
  { id: 'contact', label: 'Contact' },
];

export default function CarentanVitrine({ client: clientIn }) {
  const client = { ...DEFAULTS, ...clientIn };
  const { name, tagline, phone, address, siteUrl, heroImage, primaryColor } = client;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = `${name} — maquette`;
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [name]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div
      className="car-root"
      style={{
        minHeight: '100vh',
        fontFamily: "'Source Sans 3', system-ui, sans-serif",
        color: '#1a1a1a',
        background: '#f7f6f3',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Libre+Baskerville:wght@400;700&display=swap');
        .car-root * { box-sizing: border-box; }
        .car-root a { color: inherit; text-decoration: none; }
        .car-serif { font-family: 'Libre Baskerville', Georgia, serif; }
        .car-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background .3s, box-shadow .3s;
          background: ${scrolled ? 'rgba(255,255,255,.96)' : 'rgba(255,255,255,.88)'};
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .car-nav-inner {
          max-width: 1120px; margin: 0 auto; padding: 12px 20px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
        }
        .car-brand { font-weight: 700; font-size: clamp(14px, 3.5vw, 17px); color: ${primaryColor}; line-height: 1.25; max-width: min(280px, 55vw); }
        .car-nav-links { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .car-nav-links button {
          background: none; border: none; font: inherit; font-size: 14px; font-weight: 600;
          color: #334155; padding: 8px 10px; border-radius: 8px; cursor: pointer;
        }
        .car-nav-links button:hover { background: rgba(0,0,0,.05); color: ${primaryColor}; }
        .car-back { font-size: 13px; font-weight: 600; color: ${primaryColor}; white-space: nowrap; }
        .car-burger {
          display: none; width: 44px; height: 44px; border: 1px solid rgba(0,0,0,.12);
          border-radius: 10px; background: #fff; cursor: pointer; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .car-burger-box { width: 18px; height: 14px; position: relative; }
        .car-burger-line { position: absolute; left: 0; width: 18px; height: 2px; background: #1e293b; border-radius: 1px; }
        .car-burger-line:nth-child(1) { top: 0; }
        .car-burger-line:nth-child(2) { top: 6px; }
        .car-burger-line:nth-child(3) { top: 12px; }
        .car-mobile-panel {
          display: none; position: fixed; top: 0; right: 0; bottom: 0; width: min(300px, 88vw);
          background: #fff; z-index: 200; padding: 72px 20px 24px; box-shadow: -8px 0 32px rgba(0,0,0,.12);
          flex-direction: column; gap: 4px;
        }
        .car-mobile-panel.open { display: flex; }
        .car-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 199; }
        .car-overlay.open { display: block; }
        @media (max-width: 768px) {
          .car-nav-inner > .car-nav-links { display: none; }
          .car-burger { display: flex; }
        }
      `}</style>

      <nav className="car-nav">
        <div className="car-nav-inner">
          <button
            type="button"
            onClick={() => scrollTo('accueil')}
            className="car-brand car-serif"
            style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {name}
          </button>

          <div className="car-nav-links">
            {NAV.map(({ id, label }) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
            <Link to="/demos" className="car-back">← Démos</Link>
          </div>

          <button type="button" className="car-burger" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
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
      <div className={`car-mobile-panel car-nav-links${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Menu">
        {NAV.map(({ id, label }) => (
          <button key={id} type="button" onClick={() => scrollTo(id)} style={{ textAlign: 'left', width: '100%', padding: '14px 12px' }}>
            {label}
          </button>
        ))}
        <Link to="/demos" className="car-back" style={{ padding: '14px 12px', display: 'block' }} onClick={() => setMenuOpen(false)}>
          ← Retour aux démos
        </Link>
      </div>

      <header
        id="accueil"
        style={{
          position: 'relative',
          minHeight: 'min(72vh, 620px)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: 'clamp(100px, 18vw, 140px) 24px 64px',
          marginTop: 0,
        }}
      >
        <img
          src={heroImage}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15,30,50,.25) 0%, rgba(15,30,50,.75) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1120, margin: '0 auto', width: '100%' }}>
          <p style={{ color: 'rgba(255,255,255,.85)', fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            Maquette locale
          </p>
          <h1 className="car-serif" style={{ color: '#fff', fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 12, maxWidth: 640 }}>
            {name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,.92)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', maxWidth: 520, lineHeight: 1.55 }}>
            {tagline}
          </p>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            style={{
              marginTop: 28,
              padding: '14px 28px',
              borderRadius: 999,
              border: 'none',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              background: '#fff',
              color: primaryColor,
            }}
          >
            Nous contacter
          </button>
        </div>
      </header>

      <main>
        <section id="ma-commune" style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px' }}>
          <h2 className="car-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: primaryColor, marginBottom: 12 }}>
            Ma commune
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 640, marginBottom: 32 }}>
            Section à construire : actualités, équipe municipale, vie locale, projets…
          </p>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {['Actualités', 'Conseil municipal', 'Publications', 'Numéros utiles'].map((t) => (
              <div
                key={t}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '24px 20px',
                  border: '1px solid rgba(0,0,0,.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,.04)',
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{t}</h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>Contenu à définir.</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="demarches"
          style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,.06)', borderBottom: '1px solid rgba(0,0,0,.06)' }}
        >
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px' }}>
            <h2 className="car-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: primaryColor, marginBottom: 12 }}>
              Démarches
            </h2>
            <p style={{ color: '#475569', lineHeight: 1.7, maxWidth: 640, marginBottom: 28 }}>
              À remplir : état civil, urbanisme, scolarité, déchets, stationnement…
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12, maxWidth: 560 }}>
              {['État civil', 'Urbanisme', 'Élections', 'Scolarité'].map((item) => (
                <li
                  key={item}
                  style={{
                    padding: '16px 20px',
                    background: '#f8fafc',
                    borderRadius: 10,
                    border: '1px solid #e2e8f0',
                    fontWeight: 600,
                    color: '#334155',
                  }}
                >
                  {item} <span style={{ fontWeight: 400, color: '#94a3b8' }}>— lien à venir</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 96px' }}>
          <h2 className="car-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: primaryColor, marginBottom: 20 }}>
            Contact
          </h2>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', alignItems: 'start' }}>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>Mairie</p>
              <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: 8 }}>{address}</p>
              <p style={{ color: '#475569' }}>
                Tél. <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: primaryColor, fontWeight: 600 }}>{phone}</a>
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>Site officiel</p>
              <a href={siteUrl} target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600, wordBreak: 'break-all' }}>
                {siteUrl.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: '#0f172a', color: 'rgba(255,255,255,.75)', padding: '28px 24px', fontSize: 14 }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
          <span className="car-serif" style={{ color: '#fff', fontWeight: 600 }}>{name}</span>
          <span>Maquette — ne pas publier telle quelle</span>
        </div>
      </footer>
    </div>
  );
}
