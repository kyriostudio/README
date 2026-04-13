import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─── Palette fidèle à la charte Arc en Ciel (fuchsia / rose) ─── */
const C = {
  fuchsia: '#C5007F',
  fuchsiaLight: '#E91E9C',
  fuchsiaPale: '#FDF0F7',
  dark: '#1A1A2E',
  darkSoft: '#2D2B3D',
  grey: '#555568',
  greyLight: '#8888A0',
  border: '#E8E4EE',
  bg: '#FFFFFF',
  bgSoft: '#FAF8FC',
  bgWarm: '#FFF9FB',
};

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

/* ─── Animations au scroll ─── */
function useVisible(ref, threshold = 0.15) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    o.observe(el);
    return () => o.disconnect();
  }, [ref, threshold]);
  return v;
}

function Reveal({ children, delay = 0, style = {}, className = '' }) {
  const ref = useRef(null);
  const v = useVisible(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'none' : 'translateY(32px)',
      transition: `opacity .65s cubic-bezier(.22,1,.36,1) ${delay}s, transform .65s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ═══════════════════════════════════════════════════════════ */
export default function ArcencielVitrine({ client }) {
  const {
    name, nameLine1, nameLine2,
    heroTitle, heroSubtitle, heroCta,
    tagline, phone, email, horaires, siteUrl,
    intro, intro2, intro3,
    servicesCategories = [], servicesCibles = [],
    equipeTitle, equipeText,
    zoneTitle, zoneText,
    avantages = [],
    articleText, articlePdf,
    chiffres = [],
    logo, heroImage, photoServices, carteImg,
    galerieAvantApres = [],
  } = client;

  const [showTop, setShowTop] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    document.title = heroTitle || `${name} — Nettoyage Caen`;
    return () => { document.title = 'Sites Démo — Showcase'; };
  }, [name, heroTitle]);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = `
      html{scroll-behavior:smooth}
      .aec-btn{transition:all .25s cubic-bezier(.22,1,.36,1)}
      .aec-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(197,0,127,.3)}
      .aec-btn-outline:hover{background:${C.fuchsia}!important;color:#fff!important;border-color:${C.fuchsia}!important}
      .aec-card{transition:all .3s cubic-bezier(.22,1,.36,1)}
      .aec-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.08)}
      .aec-link{transition:color .2s}
      .aec-link:hover{color:${C.fuchsia}!important}
      .aec-img-zoom{transition:transform .5s cubic-bezier(.22,1,.36,1)}
      .aec-img-zoom:hover{transform:scale(1.04)}
      .aec-top-btn{transition:all .25s}
      .aec-top-btn:hover{transform:translateY(-3px)}
      .aec-input:focus{outline:none;border-color:${C.fuchsia};box-shadow:0 0 0 3px rgba(197,0,127,.1)}
    `;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div style={{ fontFamily: FONT, color: C.dark, background: C.bg, overflowX: 'hidden' }}>

      {/* ═══════ NAV ═══════ */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#accueil" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            {logo && <img src={logo} alt={name} style={{ height: 40 }} />}
          </a>
          <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {[['Accueil', '#accueil'], ['Services', '#services'], ['Réalisations', '#realisations'], ['Contact', '#contact']].map(([label, href]) => (
              <a key={label} href={href} className="aec-link" style={{
                color: C.grey, textDecoration: 'none', fontSize: 14, fontWeight: 500,
              }}>{label}</a>
            ))}
            <a href="#contact" className="aec-btn" style={{
              padding: '10px 22px', background: C.fuchsia, color: '#fff',
              borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}>Devis gratuit</a>
          </nav>
        </div>
      </header>

      {/* ═══════ HERO ═══════ */}
      <section id="accueil" style={{
        position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center',
        background: C.dark, overflow: 'hidden',
      }}>
        {heroImage && <img src={heroImage} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3,
        }} />}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.dark}ee 0%, ${C.dark}88 50%, transparent 100%)` }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, padding: '80px 32px', color: '#fff' }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(197,0,127,.15)', border: '1px solid rgba(197,0,127,.3)',
              borderRadius: 40, padding: '7px 18px', marginBottom: 24,
              fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', color: '#f0b0d8',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
              Entreprise basée à Mondeville · Caen
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 800,
              lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px',
            }}>
              {heroTitle || (<>{nameLine1}<br /><span style={{ color: C.fuchsiaLight }}>{nameLine2}</span></>)}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,.75)', lineHeight: 1.7, maxWidth: 520, margin: '0 0 32px' }}>
              {heroSubtitle || tagline}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#contact" className="aec-btn" style={{
                padding: '16px 32px', background: C.fuchsia, color: '#fff',
                borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              }}>{heroCta || 'Demander un devis'}</a>
              <a href="#services" className="aec-btn aec-btn-outline" style={{
                padding: '16px 32px', background: 'transparent', color: '#fff',
                borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none',
                border: '2px solid rgba(255,255,255,.25)',
              }}>Nos services</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ BANDEAU CHIFFRES ═══════ */}
      <section style={{ background: C.fuchsia, padding: '0 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {chiffres.map((c, i) => (
            <Reveal key={i} delay={i * 0.06} style={{ textAlign: 'center', padding: '28px 40px', flex: '1 1 160px' }}>
              <span style={{ fontSize: 38, fontWeight: 800, color: '#fff', display: 'block', lineHeight: 1 }}>{c.value}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', marginTop: 4, display: 'block' }}>{c.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════ PRÉSENTATION ═══════ */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>
        <Reveal>
          <SectionLabel>Qui sommes-nous</SectionLabel>
          <h2 style={h2Style}>Un acteur incontournable de la propreté à Caen</h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 32 }}>
          <Reveal delay={0.1}>
            <p style={pStyle}>{intro}</p>
            <p style={{ ...pStyle, marginTop: 16 }}>{intro2}</p>
          </Reveal>
          <div>
            <Reveal delay={0.18}>
              <p style={pStyle}>{intro3}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div style={{
                marginTop: 24, padding: 28, background: C.fuchsiaPale, borderRadius: 16,
                borderLeft: `4px solid ${C.fuchsia}`,
              }}>
                <p style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: C.dark }}>Besoin de notre expertise ?</p>
                <a href="#contact" className="aec-btn" style={{
                  display: 'inline-block', padding: '12px 24px', background: C.fuchsia, color: '#fff',
                  borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>Contactez-nous</a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Cibles — illustrations */}
        {servicesCibles.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 56 }}>
            {servicesCibles.map((sc, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="aec-card" style={{
                  background: C.bg, borderRadius: 16, overflow: 'hidden',
                  border: `1px solid ${C.border}`, cursor: 'default', textAlign: 'center',
                }}>
                  <div style={{ height: 140, overflow: 'hidden', background: C.bgSoft }}>
                    <img src={sc.image} alt={sc.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} />
                  </div>
                  <div style={{ padding: '16px 12px 20px' }}>
                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px', color: C.dark }}>{sc.title}</h4>
                    <p style={{ fontSize: 13, color: C.greyLight, margin: 0 }}>{sc.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ═══════ SERVICES DÉTAILLÉS ═══════ */}
      <section id="services" style={{ background: C.bgSoft, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <SectionLabel>Nos prestations</SectionLabel>
            <h2 style={h2Style}>Une solution de nettoyage sur-mesure</h2>
            <p style={{ ...pStyle, maxWidth: 580, marginBottom: 48 }}>
              Que vous soyez professionnel, particulier ou collectivité, nous proposons une large gamme de services adaptés à vos besoins.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {servicesCategories.map((cat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="aec-card" style={{
                  padding: 32, background: C.bg, borderRadius: 16,
                  border: `1px solid ${C.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <span style={{
                      fontSize: 28, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 14, background: C.fuchsiaPale,
                    }}>{cat.icon}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{cat.title}</h3>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
                    {cat.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: C.grey }}>
                        <span style={{ color: C.fuchsia, fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="aec-btn" style={{
                    display: 'inline-block', marginTop: 20, padding: '10px 20px',
                    background: 'transparent', border: `2px solid ${C.fuchsia}`,
                    color: C.fuchsia, borderRadius: 8, fontSize: 13, fontWeight: 700,
                    textDecoration: 'none',
                  }}>Demandez votre devis</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ÉQUIPE ═══════ */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: photoServices ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'center' }}>
          {photoServices && (
            <Reveal>
              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.08)' }}>
                <img src={photoServices} alt="Nos services" style={{ width: '100%', display: 'block' }} />
              </div>
            </Reveal>
          )}
          <Reveal delay={0.12}>
            <SectionLabel>Notre équipe</SectionLabel>
            <h2 style={{ ...h2Style, marginBottom: 16 }}>{equipeTitle}</h2>
            <p style={pStyle}>{equipeText}</p>
            <div style={{ display: 'flex', gap: 32, marginTop: 28 }}>
              {[{ v: '15+', l: "ans d'exp." }, { v: '20+', l: 'agents' }].map((s, i) => (
                <div key={i}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: C.fuchsia, display: 'block' }}>{s.v}</span>
                  <span style={{ fontSize: 13, color: C.greyLight }}>{s.l}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="aec-btn" style={{
              display: 'inline-block', marginTop: 24, padding: '14px 28px',
              background: C.fuchsia, color: '#fff', borderRadius: 10,
              fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>Nous contacter</a>
          </Reveal>
        </div>
      </section>

      {/* ═══════ ZONE D'INTERVENTION ═══════ */}
      <section style={{ background: C.dark, color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: carteImg ? '1fr 1fr' : '1fr', gap: 48, alignItems: 'center' }}>
          <Reveal>
            <SectionLabel light>Intervention locale</SectionLabel>
            <h2 style={{ ...h2Style, color: '#fff' }}>{zoneTitle}</h2>
            <p style={{ ...pStyle, color: 'rgba(255,255,255,.7)' }}>{zoneText}</p>
            <a href="#contact" className="aec-btn" style={{
              display: 'inline-block', marginTop: 24, padding: '14px 28px',
              border: `2px solid ${C.fuchsia}`, color: C.fuchsiaLight, background: 'transparent',
              borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>Demander un devis</a>
          </Reveal>
          {carteImg && (
            <Reveal delay={0.12}>
              <img src={carteImg} alt="Zone d'intervention Caen" style={{
                width: '100%', maxWidth: 420, margin: '0 auto', display: 'block', borderRadius: 16,
              }} />
            </Reveal>
          )}
        </div>
      </section>

      {/* ═══════ AVANTAGES ═══════ */}
      <section style={{ background: C.fuchsia, padding: '64px 24px', color: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              Pourquoi choisir Arc en Ciel Propreté
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {avantages.map((a, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '20px 16px' }}>
                  <span style={{
                    fontSize: 40, display: 'block', marginBottom: 16,
                    filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.2))',
                  }}>{a.icon}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{a.title}</h3>
                  <p style={{ fontSize: 14, margin: 0, opacity: 0.85, lineHeight: 1.6 }}>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ AVANT / APRÈS ═══════ */}
      {galerieAvantApres.length > 0 && (
        <section id="realisations" style={{ padding: '80px 24px', background: C.bgSoft }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Reveal>
              <SectionLabel>Nos résultats</SectionLabel>
              <h2 style={{ ...h2Style, marginBottom: 12 }}>Réalisations Avant / Après</h2>
              <p style={{ ...pStyle, maxWidth: 520, marginBottom: 48 }}>
                Des transformations concrètes qui illustrent notre savoir-faire et notre exigence de qualité.
              </p>
            </Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {galerieAvantApres.map((item, i) => {
                const src = typeof item === 'string' ? item : item.src;
                const label = typeof item === 'string' ? null : item.label;
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <div
                      className="aec-img-zoom"
                      onClick={() => setLightbox(i)}
                      style={{
                        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                        boxShadow: '0 2px 16px rgba(0,0,0,.06)', position: 'relative',
                        background: C.bg,
                      }}
                    >
                      <img src={src} alt={label || `Avant/Après ${i + 1}`} style={{
                        width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block',
                      }} />
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,.6))',
                        padding: '32px 16px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                      }}>
                        {label && <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{label}</span>}
                        <span style={{
                          background: C.fuchsia, color: '#fff', fontSize: 11, fontWeight: 700,
                          padding: '4px 10px', borderRadius: 6, letterSpacing: '0.03em',
                        }}>AVANT / APRÈS</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ ARTICLE CAPITAL ═══════ */}
      {articleText && (
        <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
          <Reveal>
            <div style={{
              display: 'flex', gap: 24, alignItems: 'center',
              padding: 32, background: C.bgWarm, borderRadius: 16, border: `1px solid ${C.border}`,
            }}>
              <span style={{ fontSize: 48, flexShrink: 0 }}>📰</span>
              <div>
                <p style={{ margin: '0 0 12px', color: C.grey, lineHeight: 1.65, fontSize: 15 }}>{articleText}</p>
                {articlePdf && (
                  <a href={articlePdf} target="_blank" rel="noopener noreferrer" style={{
                    color: C.fuchsia, fontWeight: 700, textDecoration: 'none', fontSize: 15,
                  }}>Découvrir l'article →</a>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ═══════ CONTACT / DEVIS ═══════ */}
      <section id="contact" style={{ background: C.dark, color: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Reveal>
            <SectionLabel light>Parlons de votre projet</SectionLabel>
            <h2 style={{ ...h2Style, color: '#fff', marginBottom: 8 }}>Demandez votre devis personnalisé</h2>
            <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 16, marginBottom: 48, maxWidth: 480 }}>Réponse garantie sous 24h</p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            {/* Formulaire */}
            <Reveal delay={0.1}>
              {formSent ? (
                <div style={{ padding: 40, background: 'rgba(255,255,255,.06)', borderRadius: 16, border: '1px solid rgba(255,255,255,.1)', textAlign: 'center' }}>
                  <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>✅</span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Demande envoyée !</h3>
                  <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 15 }}>Nous vous répondons sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleForm} style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <input className="aec-input" placeholder="Votre nom" required style={inputStyle} />
                    <input className="aec-input" placeholder="Téléphone" type="tel" style={inputStyle} />
                  </div>
                  <input className="aec-input" placeholder="Votre email" type="email" required style={inputStyle} />
                  <select className="aec-input" style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Type de service souhaité</option>
                    <option>Nettoyage professionnel</option>
                    <option>Nettoyage spécialisé</option>
                    <option>Remise en état</option>
                    <option>Services complémentaires</option>
                    <option>Autre</option>
                  </select>
                  <textarea className="aec-input" placeholder="Décrivez votre besoin…" rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                  <button type="submit" className="aec-btn" style={{
                    padding: '16px 32px', background: C.fuchsia, color: '#fff',
                    border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 700,
                    cursor: 'pointer',
                  }}>Envoyer ma demande de devis</button>
                </form>
              )}
            </Reveal>

            {/* Infos contact */}
            <Reveal delay={0.2}>
              <div style={{ display: 'grid', gap: 20 }}>
                {[
                  { icon: '📞', label: 'Téléphone', value: phone, href: `tel:${phone?.replace(/[\s.]/g, '')}` },
                  { icon: '✉️', label: 'Email', value: email, href: `mailto:${email}` },
                  { icon: '🕐', label: 'Horaires', value: horaires },
                  { icon: '📍', label: 'Zone', value: 'Caen, Mondeville et périphérie' },
                ].map((block, i) => (
                  <ContactBlock key={i} {...block} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ background: '#0E0E1C', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ width: 48, height: 3, background: C.fuchsia, borderRadius: 2, margin: '0 auto 20px' }} />
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
          {siteUrl
            ? <a href={siteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'none' }}>{name}</a>
            : name}
          {' · Mentions légales · Politique de confidentialité'}
        </p>
        <Link to="/" style={{ color: C.fuchsiaLight, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>← Retour aux démos</Link>
      </footer>

      {/* ═══════ BACK TO TOP ═══════ */}
      {showTop && (
        <button className="aec-top-btn" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Haut"
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 40,
            width: 48, height: 48, borderRadius: 12, border: 'none',
            background: C.fuchsia, color: '#fff', fontSize: 20, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(197,0,127,.35)',
          }}>↑</button>
      )}

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightbox !== null && galerieAvantApres[lightbox] && (() => {
        const lbItem = galerieAvantApres[lightbox];
        const lbSrc = typeof lbItem === 'string' ? lbItem : lbItem.src;
        const lbLabel = typeof lbItem === 'string' ? '' : lbItem.label;
        return (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.94)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={() => setLightbox(null)}
          >
            <button type="button" onClick={() => setLightbox(null)} style={lbBtnStyle({ top: 20, right: 24 })}>×</button>
            <button type="button" onClick={e => { e.stopPropagation(); setLightbox(i => i <= 0 ? galerieAvantApres.length - 1 : i - 1); }} style={lbBtnStyle({ left: 24, top: '50%', transform: 'translateY(-50%)' })}>‹</button>
            <img src={lbSrc} alt={lbLabel} style={{ maxWidth: '90%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 12 }} onClick={e => e.stopPropagation()} />
            {lbLabel && <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginTop: 16, textAlign: 'center' }} onClick={e => e.stopPropagation()}>{lbLabel}</p>}
            <button type="button" onClick={e => { e.stopPropagation(); setLightbox(i => i >= galerieAvantApres.length - 1 ? 0 : i + 1); }} style={lbBtnStyle({ right: 24, top: '50%', transform: 'translateY(-50%)' })}>›</button>
          </div>
        );
      })()}
    </div>
  );
}

/* ─── Sous-composants & styles ─── */

function SectionLabel({ children, light }) {
  return (
    <p style={{
      fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
      color: light ? 'rgba(255,255,255,.5)' : C.fuchsia, marginBottom: 12,
    }}>{children}</p>
  );
}

function ContactBlock({ icon, label, value, href }) {
  return (
    <div style={{
      padding: 20, background: 'rgba(255,255,255,.04)', borderRadius: 12,
      border: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 16,
    }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.fuchsiaLight }}>{label}</span>
        {href
          ? <a href={href} style={{ display: 'block', color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 600, marginTop: 2 }}>{value}</a>
          : <span style={{ display: 'block', color: 'rgba(255,255,255,.85)', fontSize: 15, marginTop: 2 }}>{value}</span>
        }
      </div>
    </div>
  );
}

const h2Style = {
  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800,
  lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 20px',
};

const pStyle = { color: C.grey, lineHeight: 1.8, fontSize: 16, margin: 0 };

const inputStyle = {
  padding: '14px 18px', background: 'rgba(255,255,255,.06)',
  border: '1px solid rgba(255,255,255,.1)', borderRadius: 10,
  color: '#fff', fontSize: 15, fontFamily: FONT, width: '100%',
  transition: 'border-color .2s, box-shadow .2s',
};

const lbBtnStyle = (pos) => ({
  position: 'absolute', ...pos,
  width: 44, height: 44, background: C.fuchsia, color: '#fff',
  border: 'none', borderRadius: 12, fontSize: 22, cursor: 'pointer',
});
