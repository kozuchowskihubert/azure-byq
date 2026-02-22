"use client";

import { useState } from 'react';
import { MENU, BUNDLES, STUDIOS, DELIVERY_LINKS } from './menu';
import { UI, Lang } from './translations';

export default function Home() {
  const [cart, setCart] = useState<{ item: any; quantity: number }[]>([]);
  const [lang, setLang] = useState<Lang>('PL');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const t = UI[lang];

  const n = (item: any) => (lang === 'EN' && item.nameEn ? item.nameEn : item.name);
  const d = (item: any) => (lang === 'EN' && item.descriptionEn ? item.descriptionEn : item.description);
  const ct = (cat: any) => (lang === 'EN' && cat.titleEn ? cat.titleEn : cat.title);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id || i.item.name === item.name);
      if (existing) {
        return prev.map(i =>
          (i.item.id === item.id || i.item.name === item.name)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string, itemName: string) => {
    setCart(prev => prev.filter(i => !(i.item.id === itemId || i.item.name === itemName)));
  };

  const totalPrice = cart.reduce((acc, curr) => {
    const price = typeof curr.item.price === 'string'
      ? parseFloat(curr.item.price.split('/')[0])
      : curr.item.price;
    return acc + (price * curr.quantity);
  }, 0);

  const closeNav = () => setSidebarOpen(false);

  return (
    <main className="main-layout">

      {/* Hamburger toggle — fixed top-right, mobile only */}
      <button
        className={`hamburger-btn${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(v => !v)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={sidebarOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        {cartCount > 0 && <span className="hamburger-badge">{cartCount}</span>}
      </button>

      {/* Sidebar / Cart */}
      <aside className={`sidebar${sidebarOpen ? ' sidebar-open' : ''}`}>
        {/* Mobile close button */}
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
            <li style={{ marginBottom: '1.5rem' }}>
              <a href="#studios" className="nav-nav-link" onClick={closeNav}>{t.panels}</a>
            </li>
            {MENU.map(cat => (
              <li key={cat.id} style={{ marginBottom: '1rem' }}>
                <a href={`#${cat.id}`} className="nav-nav-link" onClick={closeNav}>
                  {ct(cat)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cart-summary">
          <h3 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--silver)' }}>{t.currentOrder}</h3>
          <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem' }}>
            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontStyle: 'italic' }}>{t.basketEmpty}</p>
            ) : (
              cart.map((i, idx) => (
                <div key={idx} className="cart-item">
                  <span style={{ fontWeight: 600 }}>{i.quantity}× {n(i.item)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--crimson)', fontFamily: 'var(--font-accent)' }}>{i.item.price} zł</span>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(i.item.id, i.item.name)}
                      title="Remove"
                    >×</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', borderTop: '1px solid var(--gray)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{t.total}</span>
            <span style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{totalPrice.toFixed(2)} PLN</span>
          </div>
          <button className="checkout-btn">{t.generateOrder}</button>
        </div>
      </aside>

      {/* Backdrop — covers page content when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeNav}
          aria-hidden="true"
        />
      )}

      {/* Content Area */}
      <div className="content-area">
        <section className="hero">
          <div className="glitch-container">
            <h1 className="glitch-text">ZKURCZYBYQ</h1>
          </div>
          <p className="hero-tagline">
            {t.heroTagline}
          </p>
        </section>

        <div className="content-wrapper">

          {/* Studios / Panels Section */}
          <section id="studios" style={{ marginBottom: '8rem' }}>
            <h2 className="category-title">{t.burgerPanels}</h2>
            <div className="studios-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
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
                  <div className="item-header">
                    <h3 className="item-name" style={{ color: 'var(--accent)' }}>{n(bundle)}</h3>
                    <span className="item-price" style={{ color: 'var(--accent)' }}>+{bundle.price} zł</span>
                  </div>
                  <p className="item-description">{d(bundle)}</p>
                  <button className="add-btn" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={() => addToCart(bundle)}>{t.addToCombo}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Categories */}
          {MENU.map(category => (
            <section key={category.id} id={category.id} className="category-section">
              <h2 className="category-title">{ct(category)}</h2>
              <div className="menu-grid">
                {category.items.map(item => (
                  <div key={item.id} className={`menu-item${item.image ? ' has-photo' : ''}`}>
                    {item.image && (
                      <img src={item.image} alt={n(item)} className="menu-item-photo" />
                    )}
                    <div className="item-body">
                      <div className="item-header">
                        <h3 className="item-name">{n(item)}</h3>
                        <span className="item-price">{item.price} zł</span>
                      </div>
                      {d(item) && <p className="item-description">{d(item)}</p>}
                      <button className="add-btn" onClick={() => addToCart(item)}>{t.addToCart}</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Delivery Platforms Section */}
          <section id="order-online" style={{ marginBottom: '8rem' }}>
            <h2 className="category-title">{t.orderOnline}</h2>
            <div className="delivery-grid">
              {DELIVERY_LINKS.map(platform => (
                <div
                  key={platform.id}
                  className="delivery-card"
                  style={{ backgroundColor: platform.color, color: platform.textColor }}
                >
                  <span className="delivery-card-name">{platform.name}</span>
                  <p className="delivery-card-tagline">
                    {lang === 'EN' ? platform.taglineEN : platform.taglinePL}
                  </p>
                  <a
                    href={platform.href}
                    className="delivery-card-btn"
                    style={{ color: platform.textColor, borderColor: platform.textColor }}
                  >
                    {t.orderOnlineBtn}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-section">
            <h2 className="category-title" style={{ borderLeft: 'none', paddingLeft: 0 }}>{t.contact}</h2>
            <div className="contact-grid">
              <div className="contact-info-block">
                <div className="contact-field">
                  <span className="contact-label">{t.address}</span>
                  <span className="contact-value">ul. Długa 12, Kraków</span>
                </div>
                <div className="contact-field">
                  <span className="contact-label">{t.phone}</span>
                  <span className="contact-value">+48 123 456 789</span>
                </div>
                <div className="contact-field">
                  <span className="contact-label">{t.email}</span>
                  <span className="contact-value">kontakt@zkurczybyq.pl</span>
                </div>
              </div>
              <div>
                <span className="contact-label">{t.openingHours}</span>
                <div className="hours-grid">
                  <div className="hours-row">
                    <span className="hours-day">{t.monThu}</span>
                    <span className="hours-time">12:00 – 22:00</span>
                  </div>
                  <div className="hours-row">
                    <span className="hours-day">{t.friSat}</span>
                    <span className="hours-time">12:00 – 24:00</span>
                  </div>
                  <div className="hours-row">
                    <span className="hours-day">{t.sun}</span>
                    <span className="hours-time">13:00 – 21:00</span>
                  </div>
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
        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 0.5rem;
        }
        .cart-remove-btn {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
          padding: 0 0.2rem;
          transition: color 0.2s;
        }
        .cart-remove-btn:hover {
          color: var(--crimson);
        }
      `}</style>
    </main>
  );
}
