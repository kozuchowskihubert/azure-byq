'use client'

import { useCart } from '@/context/CartContext'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import '../auth/login/auth.css'
import './basket.css'

export default function BasketPage() {
    const { items, removeItem, updateQty, clearCart, total } = useCart()
    const { data: session } = useSession()
    const [name, setName] = useState(session?.user?.name ?? '')
    const [email, setEmail] = useState(session?.user?.email ?? '')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [note, setNote] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const placeOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        if (items.length === 0) return
        setLoading(true); setError('')
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clientName: name,
                    clientEmail: email,
                    clientPhone: phone,
                    clientNote: note,
                    address,
                    items: items.map(i => ({
                        productId: i.id,
                        name: i.name,
                        price: i.price,
                        quantity: i.quantity,
                    })),
                }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error ?? 'Błąd zamówienia'); return }
            clearCart()
            setSuccess(true)
        } catch {
            setError('Błąd połączenia. Spróbuj ponownie.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="page-container" style={{ textAlign: 'center' }}>
                <div className="basket-success">
                    <div className="success-icon">🍔</div>
                    <h1 className="auth-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Zamówienie złożone!</h1>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '1rem' }}>
                        Dziękujemy! Twoje zamówienie zostało przyjęte. Wkrótce się z Tobą skontaktujemy.
                    </p>
                    <Link href="/" className="btn-primary">← Wróć do menu</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Koszyk</h1>

            {items.length === 0 ? (
                <div className="basket-empty">
                    <p className="basket-empty-icon">🛒</p>
                    <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', fontSize: '1.1rem' }}>Twój koszyk jest pusty</p>
                    <Link href="/" className="btn-primary">Przeglądaj menu</Link>
                </div>
            ) : (
                <div className="basket-layout">
                    {/* Items */}
                    <div className="basket-items section-card">
                        <h2 className="basket-section-title">Twoje zamówienie</h2>
                        {items.map(item => (
                            <div key={item.id} className="basket-row">
                                {item.image && <img src={item.image} alt={item.name} className="basket-item-img" />}
                                <div className="basket-item-info">
                                    <span className="basket-item-name">{item.name}</span>
                                    <span className="basket-item-unit">{item.price.toFixed(2)} zł / szt.</span>
                                </div>
                                <div className="basket-qty">
                                    <button onClick={() => updateQty(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <span className="basket-item-total">{(item.price * item.quantity).toFixed(2)} zł</span>
                                <button className="basket-remove" onClick={() => removeItem(item.id)} title="Usuń">×</button>
                            </div>
                        ))}
                        <div className="basket-total-row">
                            <span>RAZEM</span>
                            <span className="basket-grand-total">{total.toFixed(2)} PLN</span>
                        </div>
                    </div>

                    {/* Checkout form */}
                    <form onSubmit={placeOrder} className="basket-form section-card">
                        <h2 className="basket-section-title">Dane dostawy</h2>
                        <div className="auth-form">
                            <div className="form-group">
                                <label className="form-label">Imię i nazwisko *</label>
                                <input className="form-input" value={name} onChange={e => setName(e.target.value)} required placeholder="Jan Kowalski" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jan@example.pl" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Telefon</label>
                                <input className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 600 000 000" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Adres dostawy</label>
                                <input className="form-input" value={address} onChange={e => setAddress(e.target.value)} placeholder="ul. Przykładowa 1, Radzymin" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Uwagi do zamówienia</label>
                                <textarea className="textarea-input" value={note} onChange={e => setNote(e.target.value)} placeholder="np. bez cebuli, sos osobno..." />
                            </div>
                            {error && <div className="form-error">{error}</div>}
                            <button type="submit" className="form-submit" disabled={loading || items.length === 0}>
                                {loading ? 'Składanie zamówienia…' : `Zamów — ${total.toFixed(2)} PLN`}
                            </button>
                            {!session && (
                                <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                                    <Link href="/auth/login" className="auth-link">Zaloguj się</Link>{' '}aby śledzić historię zamówień
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
