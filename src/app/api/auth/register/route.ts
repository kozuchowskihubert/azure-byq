import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2, 'Imię musi mieć minimum 2 znaki'),
    email: z.string().email('Nieprawidłowy adres email'),
    password: z.string().min(6, 'Hasło musi mieć minimum 6 znaków'),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const validated = registerSchema.safeParse(body)

        if (!validated.success) {
            return NextResponse.json(
                { error: validated.error.issues[0].message },
                { status: 400 }
            )
        }

        const { name, email, password } = validated.data

        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json(
                { error: 'Ten adres email jest już zajęty' },
                { status: 409 }
            )
        }

        const hashed = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: { name, email, password: hashed, role: 'user' },
        })

        return NextResponse.json(
            { message: 'Konto utworzone pomyślnie', userId: user.id },
            { status: 201 }
        )
    } catch (err) {
        console.error('[REGISTER]', err)
        return NextResponse.json(
            { error: 'Błąd serwera. Spróbuj ponownie.' },
            { status: 500 }
        )
    }
}
