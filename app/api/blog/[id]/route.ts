import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { main } from '../route'

const Prisma = new PrismaClient()

// blog的全部文章的内容
export const GET = async (req: Request, res: NextResponse) => {
    console.log('GET /api/blog?N')
    const id = parseInt(req.url.split('/blog/')[1])
    console.log(id)
    try {
        await main()
        const post = await Prisma.post.findFirst({
            where: { id },
        }) // post is the lower case variable of Post
        return NextResponse.json({ message: 'success', post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: 'error', err }, { status: 500 })
    } finally {
        await Prisma.$disconnect()
    }
}
