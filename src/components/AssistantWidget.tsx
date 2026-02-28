'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './Assistant.css'

type Message = {
    id: string
    role: 'bot' | 'user'
    text: string
    options?: { label: string, action: string, data?: any }[]
}

export default function AssistantWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [hasUnread, setHasUnread] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (isOpen) setHasUnread(false)
        if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isOpen])

    // Initial greeting after a brief delay
    useEffect(() => {
        setTimeout(() => {
            pushBotMessage(
                "Siemano! Wyglądasz na głodnego. Szukasz byka, chrupkiej kury czy chcesz złożyć coś po swojemu?",
                [
                    { label: "🐮 Daj mi klasyczną wołowine", action: "category", data: "burgery" },
                    { label: "🐔 Coś z kurczakiem", action: "category", data: "kura-burgery" },
                    { label: "🍔 Chcę sam stworzyć burgera!", action: "navigate", data: "/kreator" },
                    { label: "🍟 Pokaż dodatki", action: "category", data: "dodatki" }
                ]
            )
            setHasUnread(true)
        }, 3000)
    }, [])

    const pushBotMessage = (text: string, options?: Message['options']) => {
        setMessages(prev => [...prev, { id: Math.random().toString(), role: 'bot', text, options }])
    }

    const pushUserMessage = (text: string) => {
        setMessages(prev => [...prev, { id: Math.random().toString(), role: 'user', text }])
    }

    const handleOption = (opt: NonNullable<Message['options']>[0]) => {
        pushUserMessage(opt.label)

        // Clear previous options from showing
        setMessages(prev => prev.map(m => m.options ? { ...m, options: undefined } : m))

        setTimeout(() => {
            if (opt.action === 'navigate') {
                pushBotMessage("Lecimy z tym! Przenoszę Cię...")
                setTimeout(() => {
                    router.push(opt.data)
                    setIsOpen(false)
                }, 800)
            } else if (opt.action === 'category') {
                if (opt.data === 'burgery') {
                    pushBotMessage("Najlepszy wybór! Polecam 'Kawał byka' albo 'Smoky Inferno' jeśli lubisz pikantne. Przewiń menu w dół!", [
                        { label: "Ok, dzięki!", action: "close" },
                        { label: "A co jak wolę kurczaka?", action: "category", data: "kura-burgery" }
                    ])
                } else if (opt.data === 'kura-burgery') {
                    pushBotMessage("Nasze stripsy są kozackie, ale burgery to poezja! Bierz 'Nashville Hot'.", [
                        { label: "Super, sprawdzę", action: "close" },
                        { label: "A może sam zrobię?", action: "navigate", data: "/kreator" }
                    ])
                } else if (opt.data === 'dodatki') {
                    pushBotMessage("Bez frytek się nie liczy. Polecam frytki z batata i sos truflowy!", [
                        { label: "Idę do koszyka", action: "navigate", data: "/basket" },
                        { label: "Dobra rada", action: "close" }
                    ])
                }
            } else if (opt.action === 'close') {
                setIsOpen(false)
                pushBotMessage("Jestem tu jakbyś czegoś potrzebował!", [
                    { label: "Złóżmy swojego burgera", action: "navigate", data: "/kreator" }
                ])
            }
        }, 600)
    }

    return (
        <div className="assistant-container">
            {/* The Chat Window */}
            {isOpen && (
                <div className="assistant-window">
                    <div className="assistant-header">
                        <div className="as-header-info">
                            <span className="as-avatar">🤖</span>
                            <div>
                                <h4>Zkurczy-Bot</h4>
                                <span className="as-status">Doradca smaku</span>
                            </div>
                        </div>
                        <button className="as-close" onClick={() => setIsOpen(false)}>×</button>
                    </div>

                    <div className="assistant-body">
                        {messages.map((m) => (
                            <div key={m.id} className={`as-msg as-msg-${m.role}`}>
                                <div className="as-bubble">{m.text}</div>
                                {m.options && (
                                    <div className="as-options">
                                        {m.options.map((opt, i) => (
                                            <button key={i} className="as-opt-btn" onClick={() => handleOption(opt)}>
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </div>
            )}

            {/* The Toggle Button */}
            <button
                className={`assistant-toggle ${hasUnread && !isOpen ? 'has-unread' : ''}`}
                onClick={() => {
                    setIsOpen(!isOpen)
                    if (!isOpen) setHasUnread(false)
                }}
            >
                {isOpen ? '💬' : '🤖'}
            </button>
        </div>
    )
}
