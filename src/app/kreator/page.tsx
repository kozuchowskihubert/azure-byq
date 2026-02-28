'use client'

import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import {
    INGREDIENTS, INGREDIENT_CATEGORIES, ASSISTANT_TIPS,
    type Ingredient, type IngredientCategory,
} from './ingredients'
import './kreator.css'

const MAX_LAYERS = 12

export default function KreatorPage() {
    const { addItem } = useCart()
    const [activeCategory, setActiveCategory] = useState<IngredientCategory>('bun')
    const [selected, setSelected] = useState<Ingredient[]>([])
    const [name, setName] = useState('')
    const [tip, setTip] = useState(ASSISTANT_TIPS[0])
    const [tipIdx, setTipIdx] = useState(0)
    const [added, setAdded] = useState(false)
    const stackRef = useRef<HTMLDivElement>(null)

    // Rotate tips every 6s
    useEffect(() => {
        const iv = setInterval(() => {
            setTipIdx(i => {
                const next = (i + 1) % ASSISTANT_TIPS.length
                setTip(ASSISTANT_TIPS[next])
                return next
            })
        }, 6000)
        return () => clearInterval(iv)
    }, [])

    const filteredIngredients = INGREDIENTS.filter(i => i.category === activeCategory)

    const hasBun = selected.some(i => i.category === 'bun')
    const hasPatty = selected.some(i => i.category === 'patty')
    const total = selected.reduce((acc, i) => acc + i.price, 0)
    const kcal = selected.reduce((acc, i) => acc + i.kcal, 0)

    const addIngredient = (ing: Ingredient) => {
        if (selected.length >= MAX_LAYERS) return
        // bun: only one allowed
        if (ing.category === 'bun' && selected.some(i => i.category === 'bun')) {
            setSelected(prev => prev.map(i => i.category === 'bun' ? ing : i))
            return
        }
        setSelected(prev => [...prev, ing])
        // Scroll stack to bottom
        setTimeout(() => {
            if (stackRef.current) stackRef.current.scrollTop = stackRef.current.scrollHeight
        }, 50)
    }

    const removeIngredient = (idx: number) => {
        setSelected(prev => prev.filter((_, i) => i !== idx))
    }

    const reset = () => { setSelected([]); setName(''); setAdded(false) }

    const addToCart = () => {
        if (!hasBun || !hasPatty) return
        const burgerName = name.trim() || 'Mój Burger'
        const basePrice = 8 // bread + assembly
        addItem({
            id: `custom-${Date.now()}`,
            name: burgerName,
            price: basePrice + total,
            image: '/burger_godfather.png',
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 3000)
    }

    // Generate a smart name suggestion
    const suggestName = () => {
        const patty = selected.find(i => i.category === 'patty')
        const cheese = selected.find(i => i.category === 'cheese')
        const sauce = selected.find(i => i.category === 'sauce')
        const parts = [
            patty ? (patty.name.split(' ')[0]) : '',
            cheese ? (cheese.name.split(' ')[0]) : '',
            sauce ? (sauce.name.split(' ')[0]) : '',
        ].filter(Boolean)
        setName(parts.join(' ') || 'Mój Burger')
    }

    // Stack visual — render layers from bottom to top
    const stackLayers = [...selected].reverse()

    return (
        <div className="kreator-page">
            {/* Header */}
            <div className="kreator-header">
                <div>
                    <h1 className="kreator-title">Kreator Burgera</h1>
                    <p className="kreator-subtitle">Stwórz swojego wymarzonego burgera z naszych składników</p>
                </div>
            </div>

            <div className="kreator-layout">
                {/* === LEFT: Visual burger stack === */}
                <div className="kreator-stack-panel">
                    <div className="stack-label">PODGLĄD</div>

                    <div className="burger-stack-wrapper">
                        {selected.length === 0 ? (
                            <div className="stack-empty">
                                <span className="stack-empty-icon">🍔</span>
                                <p>Zacznij dodawać składniki →</p>
                            </div>
                        ) : (
                            <div className="burger-stack" ref={stackRef}>
                                {/* Top bun visual */}
                                <div className="stack-top-bun">
                                    <div className="bun-top-shape" style={{ background: selected.find(i => i.category === 'bun')?.color ?? '#D4A76A' }} />
                                </div>
                                {/* Layers */}
                                {stackLayers.filter(i => i.category !== 'bun').map((ing, idx) => (
                                    <div
                                        key={idx}
                                        className="stack-layer"
                                        style={{ '--layer-color': ing.color } as React.CSSProperties}
                                        title={ing.name}
                                    />
                                ))}
                                {/* Bottom bun */}
                                <div className="bun-bottom-shape" style={{ background: selected.find(i => i.category === 'bun')?.color ?? '#D4A76A' }} />
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="stack-stats">
                        <div className="stat-pill">
                            <span className="stat-pill-label">PLN</span>
                            <span className="stat-pill-value">{(8 + total).toFixed(0)}</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-pill-label">KCAL</span>
                            <span className="stat-pill-value">{kcal}</span>
                        </div>
                        <div className="stat-pill">
                            <span className="stat-pill-label">WARSTWY</span>
                            <span className="stat-pill-value">{selected.length}/{MAX_LAYERS}</span>
                        </div>
                    </div>

                    {/* Ingredient list */}
                    <div className="stack-ingredient-list">
                        {selected.length === 0 ? (
                            <p className="no-ing">Brak składników</p>
                        ) : (
                            selected.map((ing, idx) => (
                                <div key={idx} className="stack-ing-row">
                                    <span className="ing-dot" style={{ background: ing.color }} />
                                    <span className="ing-label">{ing.emoji} {ing.name}</span>
                                    {ing.price > 0 && <span className="ing-price">+{ing.price} zł</span>}
                                    <button className="ing-remove" onClick={() => removeIngredient(idx)} title="Usuń">×</button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Name + actions */}
                    <div className="stack-actions">
                        <div className="name-row">
                            <input
                                className="kreator-name-input"
                                placeholder="Nazwij swojego burgera…"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                maxLength={40}
                            />
                            <button className="btn-suggest" onClick={suggestName} title="Sugeruj nazwę">✨</button>
                        </div>
                        <div className="action-buttons">
                            <button className="act-reset" onClick={reset}>Zacznij od nowa</button>
                            <button
                                className={`act-cart${added ? ' act-cart--done' : ''}`}
                                onClick={addToCart}
                                disabled={!hasBun || !hasPatty}
                                title={!hasBun ? 'Wybierz bułkę' : !hasPatty ? 'Wybierz mięso' : ''}
                            >
                                {added ? '✓ Dodano!' : !hasBun ? 'Wybierz bułkę' : !hasPatty ? 'Wybierz mięso' : `Dodaj do koszyka · ${(8 + total).toFixed(0)} PLN`}
                            </button>
                        </div>
                    </div>
                </div>

                {/* === RIGHT: Ingredient palette + assistant === */}
                <div className="kreator-palette-panel">
                    {/* Assistant */}
                    <div className="assistant-card">
                        <div className="assistant-avatar">🤖</div>
                        <div className="assistant-bubble">
                            <div className="assistant-name">Asystent Burgera</div>
                            <p className="assistant-tip" key={tipIdx}>{tip}</p>
                        </div>
                    </div>

                    {/* Category tabs */}
                    <div className="category-tabs">
                        {INGREDIENT_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`cat-tab${activeCategory === cat.id ? ' active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="cat-icon">{cat.icon}</span>
                                <span className="cat-label">{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Ingredients grid */}
                    <div className="ingredients-grid">
                        {filteredIngredients.map(ing => {
                            const isSelected = selected.some(s => s.id === ing.id)
                            return (
                                <button
                                    key={ing.id}
                                    className={`ing-card${isSelected ? ' ing-card--selected' : ''}`}
                                    onClick={() => addIngredient(ing)}
                                    title={ing.description ?? ing.nameEn}
                                >
                                    <div className="ing-card-color" style={{ background: ing.color }} />
                                    <div className="ing-card-emoji">{ing.emoji}</div>
                                    <div className="ing-card-name">{ing.name}</div>
                                    {ing.price > 0
                                        ? <div className="ing-card-price">+{ing.price} zł</div>
                                        : <div className="ing-card-price free">gratis</div>
                                    }
                                    <div className="ing-card-kcal">{ing.kcal} kcal</div>
                                    {ing.description && <div className="ing-card-desc">{ing.description}</div>}
                                    {isSelected && <div className="ing-selected-badge">✓</div>}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
