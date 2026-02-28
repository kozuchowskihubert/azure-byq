import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const feedbackSchema = z.object({
    rating: z.number().int().min(1).max(5),
    message: z.string().min(5, 'Opinia musi mieć minimum 5 znaków'),
})

export async function GET() {
    const feedback = await prisma.feedback.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
    })
    return NextResponse.json(feedback)
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Zaloguj się aby dodać opinię' }, { status: 401 })
        }

        const body = await req.json()
        const validated = feedbackSchema.safeParse(body)
        if (!validated.success) {
            return NextResponse.json({ error: validated.error.issues[0].message }, { status: 400 })
        }

        const fb = await prisma.feedback.create({
            data: {
                userId: session.user.id,
                authorName: session.user.name ?? session.user.email ?? 'Anonim',
                rating: validated.data.rating,
                message: validated.data.message,
            },
        })

        return NextResponse.json(fb, { status: 201 })
    } catch (err) {
        console.error('[FEEDBACK]', err)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}
