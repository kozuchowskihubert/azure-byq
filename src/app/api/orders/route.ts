import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const orderSchema = z.object({
    clientName: z.string().min(2),
    clientEmail: z.string().email(),
    clientPhone: z.string().optional(),
    clientNote: z.string().optional(),
    address: z.string().optional(),
    items: z.array(z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number().int().min(1),
    })).min(1),
})

export async function GET(req: NextRequest) {
    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        const body = await req.json()
        const validated = orderSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json(
                { error: validated.error.issues[0].message },
                { status: 400 }
            )
        }

        const { items, ...fields } = validated.data
        const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

        const order = await prisma.order.create({
            data: {
                ...fields,
                userId: session?.user?.id ?? null,
                totalPLN: total,
                items: {
                    create: items.map(i => ({
                        productId: i.productId,
                        name: i.name,
                        price: i.price,
                        quantity: i.quantity,
                    })),
                },
            },
            include: { items: true },
        })

        return NextResponse.json(order, { status: 201 })
    } catch (err) {
        console.error('[ORDER]', err)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}
