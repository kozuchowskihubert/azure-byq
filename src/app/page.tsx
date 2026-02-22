"use client";

import { useState } from 'react';
import { MENU, BUNDLES, STUDIOS } from './menu';

export default function Home() {
  const [cart, setCart] = useState<{ item: any; quantity: number }[]>([]);

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

  const totalPrice = cart.reduce((acc, curr) => {
    const price = typeof curr.item.price === 'string'
      ? parseFloat(curr.item.price.split('/')[0])
      : curr.item.price;
    return acc + (price * curr.quantity);
  }, 0);

  return (
    <main className="main-layout">
      {/* Sidebar / Cart */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>ZKURCZYBYQ</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', letterSpacing: '4px', marginTop: '0.5rem' }}>RADIO & BURGERS</p>
        </div>

        <nav style={{ marginTop: '3rem', flex: 1 }}>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '1.5rem' }}>
              <a href="#studios" className="nav-nav-link">PANELS</a>
            </li>
            {MENU.map(cat => (
              <li key={cat.title} style={{ marginBottom: '1rem' }}>
                <a href={`#${cat.title.replace(/\s+/g, '-').toLowerCase()}`} className="nav-nav-link">
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cart-summary">
          <h3 style={{ fontSize: '0.9rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--silver)' }}>CURRENT ORDER</h3>
          <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem' }}>
            {cart.length === 0 ? (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontStyle: 'italic' }}>Your basket is empty...</p>
            ) : (
              cart.map((i, idx) => (
                <div key={idx} className="cart-item">
                  <span style={{ fontWeight: 600 }}>{i.quantity}x {i.item.name}</span>
                  <span style={{ color: 'var(--crimson)', fontFamily: 'var(--font-accent)' }}>{i.item.price} zł</span>
                </div>
              ))
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', borderTop: '1px solid var(--gray)', paddingTop: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>TOTAL:</span>
            <span style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{totalPrice.toFixed(2)} PLN</span>
          </div>
          <button className="checkout-btn">GENERATE ORDER</button>
        </div>
      </aside>

      {/* Content Area */}
      <div style={{ overflowY: 'auto', height: '100vh', scrollBehavior: 'smooth' }}>
        <section className="hero">
          <div className="glitch-container">
            <h1 className="glitch-text">ZKURCZYBYQ</h1>
          </div>
          <p style={{
            fontSize: '1.4rem',
            color: 'var(--silver)',
            maxWidth: '700px',
            marginTop: '1.5rem',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '2px',
            fontWeight: 300
          }}>
            PREMIUM BURGERS. TRANSMIT THE FLAVOR.
          </p>
        </section>

        <div style={{ padding: '6rem 4rem' }}>

          {/* Studios / Panels Section */}
          <section id="studios" style={{ marginBottom: '8rem' }}>
            <h2 className="category-title">BURGER DISPLAY PANELS</h2>
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

          <div className="category-section">
            <h2 className="category-title">BUNDLE DEALS</h2>
            <div className="menu-grid">
              {BUNDLES.map(bundle => (
                <div key={bundle.name} className="menu-item" style={{ border: '1px solid var(--accent)', background: 'rgba(0, 255, 255, 0.03)' }}>
                  <div className="item-header">
                    <h3 className="item-name" style={{ color: 'var(--accent)' }}>{bundle.name}</h3>
                    <span className="item-price" style={{ color: 'var(--accent)' }}>+{bundle.price} zł</span>
                  </div>
                  <p className="item-description">{bundle.description}</p>
                  <button className="add-btn" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }} onClick={() => addToCart(bundle)}>ADD TO COMBO</button>
                </div>
              ))}
            </div>
          </div>

          {MENU.map(category => (
            <section key={category.title} id={category.title.replace(/\s+/g, '-').toLowerCase()} className="category-section">
              <h2 className="category-title">{category.title}</h2>
              <div className="menu-grid">
                {category.items.map(item => (
                  <div key={item.id} className="menu-item">
                    <div className="item-header">
                      <h3 className="item-name">{item.name}</h3>
                      <span className="item-price">{item.price} zł</span>
                    </div>
                    {item.description && <p className="item-description">{item.description}</p>}
                    <button className="add-btn" onClick={() => addToCart(item)}>ADD TO CART</button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer style={{ padding: '6rem 2rem', borderTop: '2px solid var(--crimson)', textAlign: 'center', color: 'var(--text-dim)', background: '#050505' }}>
          <p style={{ letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 700 }}>© 2026 ZKURCZYBYQ.FM | POWERED BY HAOS.FM STYLE</p>
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
          margin-bottom: 0.8rem;
          font-size: 0.85rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 0.5rem;
        }
      `}</style>
    </main>
  );
}
