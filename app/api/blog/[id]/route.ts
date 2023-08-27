import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { main } from '../route'

const prisma = new PrismaClient()

export const GET = async (req: Request, res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split('/blog/')[1])
        await main()

        const post = await prisma.post.findFirst({ where: { id } })

        if (!post) {
            return NextResponse.json({ message: 'Not Found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Success', post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'Error', err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

// blog put 1 single blog
export const PUT = async (req: Request, res: NextResponse) => {
    console.log('GET /api/blog?N')
    const id = parseInt(req.url.split('/blog/')[1])

    const { title, content, authorId } = await req.json()
    console.log(id)
    try {
        await main()
        // const post = await Prisma.post.findFirst({
        // where: { id },
        // }) // post is the lower case variable of Post
        const post = await prisma.post.update({
            data: { title, content, authorId },
            where: { id },
        })
        return NextResponse.json({ message: 'success', post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'error', err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

// DELETE
export const DELETE = async (req: Request, res: NextResponse) => {
    console.log('GET /api/blog?N')
    const id = parseInt(req.url.split('/blog/')[1])

    console.log(id)
    try {
        await main()
        // const post = await Prisma.post.findFirst({
        // where: { id },
        // }) // post is the lower case variable of Post
        const post = await prisma.post.delete({
            where: { id },
        })
        return NextResponse.json({ message: 'success', post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'error', err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
