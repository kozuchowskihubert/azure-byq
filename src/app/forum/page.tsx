'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import '../auth/login/auth.css'
import './forum.css'

interface Author { id: string; name?: string | null; email: string }
interface Post {
    id: string; title: string; content: string
    author: Author; category: string; likes: number; createdAt: string
    _count: { comments: number }
}

const CATEGORIES = [
    { value: 'general', label: '💬 Ogólne' },
    { value: 'menu', label: '🍔 Menu i przepisy' },
    { value: 'events', label: '🎉 Wydarzenia' },
    { value: 'feedback', label: '⭐ Opinie' },
]

export default function ForumPage() {
    const { data: session } = useSession()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [title, setTitle] = useState(''); const [content, setContent] = useState(''); const [category, setCategory] = useState('general')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState('all')

    const load = () => {
        fetch('/api/forum/posts').then(r => r.json()).then(d => { setPosts(Array.isArray(d) ? d : []); setLoading(false) })
    }
    useEffect(() => { load() }, [])

    const submit = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setSubmitting(true)
        try {
            const res = await fetch('/api/forum/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, category }),
            })
            const data = await res.json()
            if (!res.ok) { setError(data.error); return }
            setTitle(''); setContent(''); setShowForm(false); load()
        } catch { setError('Błąd serwera') }
        finally { setSubmitting(false) }
    }

    const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter)

    return (
        <div className="page-container">
            <div className="forum-header">
                <h1 className="page-title" style={{ margin: 0 }}>Forum</h1>
                {session ? (
                    <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
                        {showForm ? '✕ Anuluj' : '+ Nowy post'}
                    </button>
                ) : (
                    <Link href="/auth/login" className="btn-ghost">Zaloguj się aby pisać</Link>
                )}
            </div>

            {/* Category filter */}
            <div className="forum-filters">
                <button className={`filter-btn${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>Wszystkie</button>
                {CATEGORIES.map(c => (
                    <button key={c.value} className={`filter-btn${filter === c.value ? ' active' : ''}`} onClick={() => setFilter(c.value)}>
                        {c.label}
                    </button>
                ))}
            </div>

            {/* New post form */}
            {showForm && (
                <form onSubmit={submit} className="section-card forum-new-post">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', letterSpacing: '3px', color: 'var(--crimson)', marginBottom: '1.5rem' }}>NOWY POST</h2>
                    <div className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Tytuł</label>
                            <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Temat dyskusji..." required minLength={3} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Kategoria</label>
                            <select className="select-input form-input" value={category} onChange={e => setCategory(e.target.value)}>
                                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Treść</label>
                            <textarea className="textarea-input" value={content} onChange={e => setContent(e.target.value)} placeholder="Napisz coś..." required minLength={10} rows={5} />
                        </div>
                        {error && <div className="form-error">{error}</div>}
                        <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Publikowanie…' : 'Opublikuj post'}</button>
                    </div>
                </form>
            )}

            {/* Posts list */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}><div className="loading-spin" /></div>
            ) : filtered.length === 0 ? (
                <div className="section-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>Brak postów w tej kategorii</div>
            ) : (
                <div className="forum-posts">
                    {filtered.map(post => (
                        <Link key={post.id} href={`/forum/${post.id}`} className="forum-post-card">
                            <div className="forum-post-cat">{CATEGORIES.find(c => c.value === post.category)?.label ?? post.category}</div>
                            <h2 className="forum-post-title">{post.title}</h2>
                            <p className="forum-post-excerpt">{post.content.length > 140 ? post.content.slice(0, 140) + '…' : post.content}</p>
                            <div className="forum-post-meta">
                                <span className="forum-author">👤 {post.author.name ?? post.author.email}</span>
                                <span className="forum-date">{new Date(post.createdAt).toLocaleDateString('pl-PL')}</span>
                                <span className="forum-comments">💬 {post._count.comments}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <style>{`.loading-spin{width:36px;height:36px;border:3px solid rgba(220,20,60,0.3);border-top-color:var(--crimson);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    )
}
