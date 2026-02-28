'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import '../auth/login/auth.css'
import './feedback.css'

interface Feedback {
    id: string; authorName: string; rating: number; message: string; createdAt: string
}

function Stars({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (n: number) => void }) {
    const [hover, setHover] = useState(0)
    return (
        <div className="stars">
            {[1, 2, 3, 4, 5].map(n => (
                <button
                    key={n}
                    type="button"
                    className={`star${n <= (hover || rating) ? ' filled' : ''}`}
                    onMouseEnter={() => interactive && setHover(n)}
                    onMouseLeave={() => interactive && setHover(0)}
                    onClick={() => interactive && onRate?.(n)}
                    style={{ cursor: interactive ? 'pointer' : 'default' }}
                    tabIndex={interactive ? 0 : -1}
                >★</button>
            ))}
        </div>
    )
}

export default function FeedbackPage() {
    const { data: session } = useSession()
    const [items, setItems] = useState<Feedback[]>([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(5)
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const load = () => {
        fetch('/api/feedback').then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false) })
    }
    useEffect(() => { load() }, [])

    const submit = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setSubmitting(true)
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, message }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error); return }
            setMessage(''); setRating(5); setSuccess(true); load()
            setTimeout(() => setSuccess(false), 4000)
        } catch { setError('Błąd serwera') }
        finally { setSubmitting(false) }
    }

    const avg = items.length ? (items.reduce((a, i) => a + i.rating, 0) / items.length).toFixed(1) : '–'

    return (
        <div className="page-container">
            <h1 className="page-title">Opinie</h1>

            {/* Stats bar */}
            <div className="feedback-stats section-card">
                <div className="stat-item">
                    <span className="stat-value">{avg}</span>
                    <span className="stat-label">Średnia ocena</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                    <span className="stat-value">{items.length}</span>
                    <span className="stat-label">Opinii</span>
                </div>
                <div className="stat-divider" />
                <Stars rating={Math.round(Number(avg) || 0)} />
            </div>

            <div className="feedback-layout">
                {/* Reviews list */}
                <div className="feedback-list">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}><div className="loading-spin" /></div>
                    ) : items.length === 0 ? (
                        <div className="section-card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>Brak opinii. Bądź pierwszy!</div>
                    ) : (
                        items.map(fb => (
                            <div key={fb.id} className="feedback-card section-card">
                                <div className="feedback-card-header">
                                    <div className="feedback-avatar">{fb.authorName.charAt(0).toUpperCase()}</div>
                                    <div>
                                        <div className="feedback-name">{fb.authorName}</div>
                                        <div className="feedback-date">{new Date(fb.createdAt).toLocaleDateString('pl-PL')}</div>
                                    </div>
                                    <Stars rating={fb.rating} />
                                </div>
                                <p className="feedback-message">{fb.message}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Submit form */}
                <div className="feedback-form-container">
                    <div className="section-card">
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '1.5rem' }}>DODAJ OPINIĘ</h2>
                        {session ? (
                            <form onSubmit={submit} className="auth-form">
                                <div className="form-group" style={{ alignItems: 'flex-start' }}>
                                    <label className="form-label">Twoja ocena</label>
                                    <Stars rating={rating} interactive onRate={setRating} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Opinia</label>
                                    <textarea className="textarea-input" value={message} onChange={e => setMessage(e.target.value)} placeholder="Opisz swoje doświadczenie..." required minLength={5} rows={4} />
                                </div>
                                {error && <div className="form-error">{error}</div>}
                                {success && <div className="form-success">Dziękujemy za opinię! 🍔</div>}
                                <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Wysyłanie…' : 'Wyślij opinię'}</button>
                            </form>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Zaloguj się aby dodać opinię</p>
                                <Link href="/auth/login" className="btn-primary">Zaloguj się</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`.loading-spin{width:36px;height:36px;border:3px solid rgba(220,20,60,0.3);border-top-color:var(--crimson);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    )
}
