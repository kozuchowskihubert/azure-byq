'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import '../../auth/login/auth.css'
import '../forum.css'

interface Author { id: string; name?: string | null; email: string }
interface Comment { id: string; content: string; author: Author; createdAt: string }
interface Post {
    id: string; title: string; content: string; category: string
    author: Author; likes: number; createdAt: string; comments: Comment[]
}

export default function PostPage() {
    const { id } = useParams() as { id: string }
    const { data: session } = useSession()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const load = () => {
        fetch(`/api/forum/posts/${id}`)
            .then(r => r.json())
            .then(d => { setPost(d); setLoading(false) })
    }
    useEffect(() => { if (id) load() }, [id])

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setSubmitting(true)
        try {
            const res = await fetch(`/api/forum/posts/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: comment }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error); return }
            setComment(''); load()
        } catch { setError('Błąd serwera') }
        finally { setSubmitting(false) }
    }

    if (loading) return <div className="page-container" style={{ textAlign: 'center', paddingTop: '6rem' }}><div className="loading-spin" /></div>
    if (!post || (post as any).error) return <div className="page-container"><p style={{ color: 'var(--text-dim)' }}>Post nie istnieje.</p><Link href="/forum" className="auth-link">← Forum</Link></div>

    return (
        <div className="page-container">
            <Link href="/forum" className="back-link">← Wróć do forum</Link>

            <div className="section-card" style={{ marginTop: '1.5rem' }}>
                <div className="forum-post-cat" style={{ marginBottom: '0.75rem' }}>
                    {post.category.toUpperCase()} · {new Date(post.createdAt).toLocaleDateString('pl-PL')}
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                    {post.title}
                </h1>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                    👤 {post.author.name ?? post.author.email}
                </div>
                <div className="post-detail-content">{post.content}</div>
            </div>

            <div className="comments-section">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '1.5rem' }}>
                    KOMENTARZE ({post.comments.length})
                </h2>

                {post.comments.length === 0 && (
                    <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Bądź pierwszy — dodaj komentarz!</p>
                )}

                {post.comments.map(c => (
                    <div key={c.id} className="comment-card">
                        <div className="comment-author">{c.author.name ?? c.author.email}</div>
                        <div className="comment-text">{c.content}</div>
                        <div className="comment-date">{new Date(c.createdAt).toLocaleString('pl-PL')}</div>
                    </div>
                ))}

                {session ? (
                    <form onSubmit={submitComment} className="section-card" style={{ marginTop: '2rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.72rem', letterSpacing: '2px', color: 'var(--crimson)', marginBottom: '1rem' }}>DODAJ KOMENTARZ</h3>
                        <textarea
                            className="textarea-input"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Twój komentarz..."
                            rows={3}
                            required
                        />
                        {error && <div className="form-error" style={{ marginTop: '0.75rem' }}>{error}</div>}
                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={submitting}>
                            {submitting ? 'Wysyłanie…' : 'Wyślij komentarz'}
                        </button>
                    </form>
                ) : (
                    <div className="section-card" style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>Zaloguj się aby skomentować</p>
                        <Link href="/auth/login" className="btn-primary">Zaloguj się</Link>
                    </div>
                )}
            </div>

            <style>{`
        .loading-spin{width:36px;height:36px;border:3px solid rgba(220,20,60,0.3);border-top-color:var(--crimson);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto}
        @keyframes spin{to{transform:rotate(360deg)}}
        .back-link{color:var(--text-dim);text-decoration:none;font-family:var(--font-heading);font-size:0.65rem;letter-spacing:2px;transition:color 0.2s}
        .back-link:hover{color:var(--crimson)}
      `}</style>
        </div>
    )
}
