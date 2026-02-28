'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import '../auth/login/auth.css'

interface Order {
    id: string
    createdAt: string
    status: string
    totalPLN: number
    items: { id: string; name: string; quantity: number; price: number }[]
}

const STATUS_LABELS: Record<string, string> = {
    pending: 'Oczekuje',
    confirmed: 'Potwierdzone',
    preparing: 'Przygotowywane',
    ready: 'Gotowe',
    delivered: 'Dostarczone',
    cancelled: 'Anulowane',
}
const STATUS_COLORS: Record<string, string> = {
    pending: '#888',
    confirmed: '#00bcd4',
    preparing: '#ff9800',
    ready: '#4caf50',
    delivered: '#4caf50',
    cancelled: 'var(--crimson)',
}

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/orders')
                .then(r => r.json())
                .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false) })
                .catch(() => setLoading(false))
        } else if (status === 'unauthenticated') {
            setLoading(false)
        }
    }, [status])

    if (status === 'loading' || loading) {
        return <div className="page-container" style={{ textAlign: 'center', paddingTop: '8rem' }}><div className="loading-spin" /></div>
    }

    if (!session) {
        return (
            <div className="page-container" style={{ textAlign: 'center', paddingTop: '6rem' }}>
                <h1 className="page-title" style={{ borderLeft: 'none', paddingLeft: 0, textAlign: 'center' }}>Profil</h1>
                <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Zaloguj się aby zobaczyć swoje zamówienia</p>
                <Link href="/auth/login" className="btn-primary">Zaloguj się</Link>
            </div>
        )
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Profil</h1>

            <div className="profile-header section-card" style={{ marginBottom: '2rem' }}>
                <div className="profile-avatar">{(session.user?.name ?? session.user?.email ?? 'U').charAt(0).toUpperCase()}</div>
                <div>
                    <div className="profile-name">{session.user?.name ?? 'Użytkownik'}</div>
                    <div className="profile-email">{session.user?.email}</div>
                </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '1.5rem' }}>
                HISTORIA ZAMÓWIEŃ
            </h2>

            {orders.length === 0 ? (
                <div className="section-card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem' }}>Nie złożyłeś jeszcze żadnego zamówienia</p>
                    <Link href="/" className="btn-primary">Zamów burgera</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {orders.map(order => (
                        <div key={order.id} className="section-card order-card">
                            <div className="order-header">
                                <div>
                                    <span className="order-id">#{order.id.slice(-8).toUpperCase()}</span>
                                    <span className="order-date">{new Date(order.createdAt).toLocaleString('pl-PL')}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span className="order-status" style={{ color: STATUS_COLORS[order.status] ?? '#fff' }}>
                                        {STATUS_LABELS[order.status] ?? order.status}
                                    </span>
                                    <span className="order-total">{order.totalPLN.toFixed(2)} PLN</span>
                                </div>
                            </div>
                            <div className="order-items">
                                {order.items.map(item => (
                                    <span key={item.id} className="order-item-chip">
                                        {item.quantity}× {item.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <style>{`
        .profile-header { display: flex; align-items: center; gap: 1.5rem; }
        .profile-avatar { width: 64px; height: 64px; border-radius: 50%; background: var(--gradient-crimson); display: flex; align-items: center; justify-content: center; font-family: var(--font-accent); font-size: 2rem; color: #fff; flex-shrink: 0; }
        .profile-name { font-family: var(--font-heading); font-size: 1.1rem; color: #fff; letter-spacing: 2px; }
        .profile-email { color: var(--text-dim); font-size: 0.85rem; margin-top: 0.3rem; }
        .order-card { transition: border-color 0.2s; }
        .order-card:hover { border-color: rgba(220,20,60,0.5); }
        .order-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }
        .order-id { font-family: var(--font-heading); font-size: 0.72rem; letter-spacing: 2px; color: #fff; margin-right: 1rem; }
        .order-date { color: var(--text-dim); font-size: 0.78rem; }
        .order-status { font-family: var(--font-heading); font-size: 0.65rem; letter-spacing: 2px; }
        .order-total { font-family: var(--font-accent); font-size: 1.5rem; color: var(--crimson); }
        .order-items { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .order-item-chip { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 2px; padding: 0.25rem 0.6rem; font-size: 0.78rem; color: var(--silver); }
        .loading-spin { width: 40px; height: 40px; border: 3px solid rgba(220,20,60,0.3); border-top-color: var(--crimson); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
        </div>
    )
}
