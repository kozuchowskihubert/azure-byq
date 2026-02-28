import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const postSchema = z.object({
    title: z.string().min(3, 'Tytuł musi mieć minimum 3 znaki').max(120),
    content: z.string().min(10, 'Treść musi mieć minimum 10 znaków'),
    category: z.string().default('general'),
})

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {
            author: { select: { id: true, name: true, email: true } },
            _count: { select: { comments: true } },
        },
        orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Zaloguj się aby pisać na forum' }, { status: 401 })
        }

        const body = await req.json()
        const validated = postSchema.safeParse(body)
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 })
        }

        const post = await prisma.post.create({
            data: {
                ...validated.data,
                authorId: session.user.id,
            },
        })

        return NextResponse.json(post, { status: 201 })
    } catch (err) {
        console.error('[FORUM POST]', err)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}
