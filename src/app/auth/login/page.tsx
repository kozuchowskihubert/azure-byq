'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './auth.css'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            if (result?.error) {
                setError('Nieprawidłowy email lub hasło')
            } else {
                router.push('/')
                router.refresh()
            }
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
                <h1 className="auth-title">Zaloguj się</h1>
                <p className="auth-subtitle">Wróć do swojego ulubionego miejsca</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="twoj@email.pl"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Hasło</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <div className="form-error">{error}</div>}

                    <button type="submit" className="form-submit" disabled={loading}>
                        {loading ? 'Logowanie…' : 'Zaloguj się'}
                    </button>
                </form>

                <p className="auth-switch">
                    Nie masz konta?{' '}
                    <Link href="/auth/register" className="auth-link">Zarejestruj się</Link>
                </p>
            </div>
        </div>
    )
}
