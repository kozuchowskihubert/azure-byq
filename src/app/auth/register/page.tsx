'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import '../login/auth.css'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (password !== confirm) { setError('Hasła nie są identyczne'); return }
        setLoading(true)
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error ?? 'Błąd rejestracji'); return }

            await signIn('credentials', { email, password, redirect: false })
            router.push('/')
            router.refresh()
        } catch {
            setError('Błąd połączenia. Spróbuj ponownie.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-glow" />
            <div className="auth-card">
                <div className="auth-logo">ZKURCZYBYQ</div>
                <h1 className="auth-title">Zarejestruj się</h1>
                <p className="auth-subtitle">Dołącz do naszej burgerowej rodziny</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Imię i nazwisko</label>
                        <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Jan Kowalski" required minLength={2} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} placeholder="twoj@email.pl" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Hasło</label>
                        <input type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="minimum 6 znaków" required minLength={6} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Potwierdź hasło</label>
                        <input type="password" className="form-input" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" required />
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="form-submit" disabled={loading}>
                        {loading ? 'Tworzenie konta…' : 'Utwórz konto'}
                    </button>
                </form>

                <p className="auth-switch">
                    Masz już konto?{' '}
                    <Link href="/auth/login" className="auth-link">Zaloguj się</Link>
                </p>
            </div>
        </div>
    )
}
