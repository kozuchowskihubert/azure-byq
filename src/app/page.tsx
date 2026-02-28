"use client";

import { useState } from 'react';
import { MENU, BUNDLES, STUDIOS, DELIVERY_LINKS } from './menu';
import { UI, Lang } from './translations';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function Home() {
  const { addItem, count } = useCart();
  const [lang, setLang] = useState<Lang>('PL');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const t = UI[lang];
  const n = (item: any) => (lang === 'EN' && item.nameEn ? item.nameEn : item.name);
  const d = (item: any) => (lang === 'EN' && item.descriptionEn ? item.descriptionEn : item.description);
  const ct = (cat: any) => (lang === 'EN' && cat.titleEn ? cat.titleEn : cat.title);

  const handleAdd = (item: any, event?: React.MouseEvent) => {
    if (event) {
      const btn = event.currentTarget as HTMLButtonElement;
      btn.classList.add('add-btn--pop');
      setTimeout(() => btn.classList.remove('add-btn--pop'), 400);
    }
    const price = typeof item.price === 'string'
      ? parseFloat(item.price.split('/')[0])
      : item.price;
    addItem({ id: item.id ?? item.name, name: n(item), price, image: item.image });
  };

  const closeNav = () => setSidebarOpen(false);

  return (
    <main className="main-layout">
      {/* Hamburger toggle */}
      <button
        className={`hamburger-btn${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(v => !v)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={sidebarOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        {count > 0 && <span className="hamburger-badge">{count}</span>}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        <button className="sidebar-close-btn" onClick={closeNav} aria-label="Close menu">×</button>
        <div className="sidebar-logo">
          <h2>ZKURCZYBYQ</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '4px', marginTop: '0.5rem' }}>{t.radioAndBurgers}</p>
          <div className="lang-switch">
            <button className={`lang-btn${lang === 'PL' ? ' active' : ''}`} onClick={() => setLang('PL')}>PL</button>
            <span className="lang-divider">/</span>
            <button className={`lang-btn${lang === 'EN' ? ' active' : ''}`} onClick={() => setLang('EN')}>EN</button>
          </div>
        </div>

        <nav style={{ marginTop: '3rem', flex: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <a href="#order-online" className="nav-priority-link" onClick={closeNav}>{t.orderOnline}</a>
            </li>
            <li style={{ marginBottom: '1.5rem' }}>
              <a href="#contact" className="nav-priority-link" onClick={closeNav}>{t.contact}</a>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <Link href="/basket" className="nav-priority-link" style={{ background: 'rgba(0,255,255,0.05)', borderColor: 'rgba(0,255,255,0.4)', color: 'var(--accent)' }} onClick={closeNav}>
                🛒 Koszyk {count > 0 && `(${count})`}
              </Link>
            </li>
            <li style={{ marginBottom: '1.5rem' }}>
              <a href="#studios" className="nav-nav-link" onClick={closeNav}>{t.panels}</a>
            </li>
            {MENU.map(cat => (
              <li key={cat.id} style={{ marginBottom: '1rem' }}>
                <a href={`#${cat.id}`} className="nav-nav-link" onClick={closeNav}>{ct(cat)}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick cart summary */}
        <Link href="/basket" className="checkout-btn" style={{ textAlign: 'center', display: 'block', textDecoration: 'none', marginTop: 'auto' }} onClick={closeNav}>
          {t.generateOrder} {count > 0 && `(${count})`}
        </Link>
      </aside>

      {sidebarOpen && <div className="sidebar-backdrop" onClick={closeNav} aria-hidden="true" />}

      {/* Content Area */}
      <div className="content-area">
        <section className="hero">
          <div className="glitch-container">
            <h1 className="glitch-text">ZKURCZYBYQ</h1>
          </div>
          <p className="hero-tagline">{t.heroTagline}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/basket" className="checkout-btn" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.9rem 2.5rem', fontSize: '1.2rem' }}>
              Zamów teraz
            </Link>
            <a href="#burgery" className="add-btn" style={{ display: 'inline-block', padding: '0.9rem 2.5rem', fontSize: '1.1rem', textDecoration: 'none' }}>
              Zobacz menu
            </a>
          </div>
        </section>

        <div className="content-wrapper">
          {/* Panels */}
          <section id="studios" style={{ marginBottom: '8rem' }}>
            <h2 className="category-title">{t.burgerPanels}</h2>
            <div className="studios-container">
              {STUDIOS.map(studio => (
                <div key={studio.id} className="studio-card">
                  <img src={studio.image} alt={studio.name} className="studio-image" />
                  <div className="studio-overlay">
                    <h3 className="studio-name" style={{ color: studio.color }}>{studio.name}</h3>
                    <p className="studio-description">{studio.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bundle Deals */}
          <div className="category-section">
            <h2 className="category-title">{t.bundleDeals}</h2>
            <div className="menu-grid">
              {BUNDLES.map(bundle => (
                <div key={bundle.name} className="menu-item" style={{ border: '1px solid var(--accent)', background: 'rgba(0, 255, 255, 0.03)' }}>
                  <div className="item-body">
                    <div className="item-header">
                      <h3 className="item-name" style={{ color: 'var(--accent)' }}>{n(bundle)}</h3>
                      <span className="item-price" style={{ color: 'var(--accent)' }}>+{bundle.price} zł</span>
                    </div>
                    <p className="item-description">{d(bundle)}</p>
                    <button className="add-btn" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={e => handleAdd(bundle, e)}>{t.addToCombo}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Categories */}
          {MENU.map(category => (
            <section key={category.id} id={category.id} className="category-section">
              <h2 className="category-title">{ct(category)}</h2>
              <div className="menu-grid">
                {category.items.map(item => {
                  const isExpanded = expandedItem === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`menu-item${item.image ? ' has-photo' : ''}${isExpanded ? ' menu-item--expanded' : ''}`}
                      onClick={() => item.image && setExpandedItem(isExpanded ? null : item.id)}
                    >
                      {item.image && (
                        <div className="menu-item-photo-wrapper">
                          <img src={item.image} alt={n(item)} className="menu-item-photo" loading="lazy" />
                          <div className="menu-item-photo-overlay">
                            <span className="menu-item-zoom-hint">🔍 {isExpanded ? 'zamknij' : 'szczegóły'}</span>
                          </div>
                        </div>
                      )}
                      <div className="item-body">
                        <div className="item-header">
                          <h3 className="item-name">{n(item)}</h3>
                          <span className="item-price">{item.price} zł</span>
                        </div>
                        {d(item) && <p className="item-description">{d(item)}</p>}
                        <button
                          className="add-btn"
                          onClick={e => { e.stopPropagation(); handleAdd(item, e); }}
                        >
                          {t.addToCart}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Delivery */}
          <section id="order-online" style={{ marginBottom: '8rem' }}>
            <h2 className="category-title">{t.orderOnline}</h2>
            <div className="delivery-grid">
              {DELIVERY_LINKS.map(platform => (
                <div key={platform.id} className="delivery-card" style={{ backgroundColor: platform.color, color: platform.textColor }}>
                  <span className="delivery-card-name">{platform.name}</span>
                  <p className="delivery-card-tagline">{lang === 'EN' ? platform.taglineEN : platform.taglinePL}</p>
                  <a href={platform.href} className="delivery-card-btn" style={{ color: platform.textColor, borderColor: platform.textColor }}>
                    {t.orderOnlineBtn}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="contact-section">
            <h2 className="category-title" style={{ borderLeft: 'none', paddingLeft: 0 }}>{t.contact}</h2>
            <div className="contact-grid">
              <div className="contact-info-block">
                <div className="contact-field">
                  <span className="contact-label">{t.address}</span>
                  <span className="contact-value">ul. Ignacego Daszyńskiego 8, Radzymin</span>
                </div>
                <div className="contact-field">
                  <span className="contact-label">{t.phone}</span>
                  <span className="contact-value">+48 602 842 612</span>
                </div>
                <div className="contact-field">
                  <span className="contact-label">{t.email}</span>
                  <span className="contact-value">kontakt@zkurczybyq.pl</span>
                </div>
              </div>
              <div>
                <span className="contact-label">{t.openingHours}</span>
                <div className="hours-grid">
                  <div className="hours-row"><span className="hours-day">{t.monThu}</span><span className="hours-time">12:00 – 22:00</span></div>
                  <div className="hours-row"><span className="hours-day">{t.friSat}</span><span className="hours-time">12:00 – 24:00</span></div>
                  <div className="hours-row"><span className="hours-day">{t.sun}</span><span className="hours-time">13:00 – 21:00</span></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer style={{ padding: '4rem 2rem', borderTop: '2px solid var(--crimson)', textAlign: 'center', color: 'var(--text-dim)', background: '#050505' }}>
          <p style={{ letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700 }}>{t.footer}</p>
        </footer>
      </div>

      <style jsx>{`
        .nav-nav-link {
          color: var(--text-dim);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          transition: all 0.3s ease;
          display: block;
        }
        .nav-nav-link:hover {
          color: var(--crimson);
          transform: translateX(10px);
          text-shadow: 0 0 10px rgba(220, 20, 60, 0.5);
        }
        .menu-item--expanded .menu-item-photo {
          height: 240px;
        }
        .menu-item-photo-wrapper {
          position: relative;
          overflow: hidden;
        }
        .menu-item-photo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          display: flex;
          align-items: flex-end;
          padding: 0.75rem;
          transition: background 0.3s;
        }
        .menu-item:hover .menu-item-photo-overlay {
          background: rgba(0,0,0,0.25);
        }
        .menu-item-zoom-hint {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.8);
          font-family: var(--font-heading);
          letter-spacing: 1px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .menu-item:hover .menu-item-zoom-hint { opacity: 1; }
        .menu-item.has-photo { cursor: pointer; }
        @keyframes addPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.08); }
          70%  { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        :global(.add-btn--pop) {
          animation: addPop 0.35s ease forwards;
          background: var(--gradient-crimson) !important;
          color: white !important;
        }
      `}</style>
    </main>
  );
}
