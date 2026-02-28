import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: { select: { id: true, name: true, email: true } },
            comments: {
                include: { author: { select: { id: true, name: true, email: true } } },
                orderBy: { createdAt: 'asc' },
            },
        },
    })
    if (!post) return NextResponse.json({ error: 'Nie znaleziono posta' }, { status: 404 })
    return NextResponse.json(post)
}

const commentSchema = z.object({
    content: z.string().min(2, 'Komentarz musi mieć minimum 2 znaki'),
})

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Zaloguj się aby komentować' }, { status: 401 })
        }

        const { id } = await params
        const body = await req.json()
        const validated = commentSchema.safeParse(body)
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 })
        }

        const comment = await prisma.comment.create({
            data: {
                content: validated.data.content,
                authorId: session.user.id,
                postId: id,
            },
            include: { author: { select: { id: true, name: true, email: true } } },
        })

        return NextResponse.json(comment, { status: 201 })
    } catch (err) {
        console.error('[COMMENT]', err)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}
