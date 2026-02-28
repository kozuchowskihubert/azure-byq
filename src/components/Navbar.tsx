'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
    const { data: session } = useSession()
    const { count } = useCart()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link href="/" className="navbar-brand">
                    ZKURCZYBYQ
                </Link>

                <button className="navbar-toggler" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
                    <span /><span /><span />
                </button>

                <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
                    <Link href="/" className="nb-link" onClick={() => setMenuOpen(false)}>Menu</Link>
                    <Link href="/kreator" className="nb-kreator" onClick={() => setMenuOpen(false)}>🍔 Kreator</Link>
                    <Link href="/forum" className="nb-link" onClick={() => setMenuOpen(false)}>Forum</Link>
                    <Link href="/feedback" className="nb-link" onClick={() => setMenuOpen(false)}>Opinie</Link>

                    <Link href="/basket" className="nb-cart" onClick={() => setMenuOpen(false)}>
                        🛒
                        {count > 0 && <span className="nb-badge">{count}</span>}
                    </Link>

                    {session?.user ? (
                        <>
                            <Link href="/profile" className="nb-link nb-user" onClick={() => setMenuOpen(false)}>
                                👤 {session.user.name?.split(' ')[0] ?? 'Profil'}
                            </Link>
                            <button
                                className="nb-logout"
                                onClick={() => { signOut({ callbackUrl: '/' }); setMenuOpen(false) }}
                            >
                                Wyloguj
                            </button>
                        </>
                    ) : (
                        <Link href="/auth/login" className="nb-login" onClick={() => setMenuOpen(false)}>
                            Zaloguj się
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
