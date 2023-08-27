import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export const main = async () => {
    try {
        await prisma.$connect()
    } catch (err) {
        console.log(`DB链接失败：${err}`)
    }
}

// blog的全部文章的内容
export const GET = async (req: Request, res: NextResponse) => {
    console.log('GET /api/blog')
    try {
        await main()
        const posts = await prisma.post.findMany() // post is the lower case variable of Post
        return NextResponse.json({ message: 'success', posts }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'error', err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

// blog投稿
export const POST = async (req: Request, res: NextResponse) => {
    console.log('POST /api/blog')
    try {
        const { title, content, authorId } = await req.json()
        await main()
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        })
        return NextResponse.json({ message: 'success', post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'error', err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
