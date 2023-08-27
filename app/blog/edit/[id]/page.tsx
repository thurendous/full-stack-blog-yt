'use client'
import { data } from 'autoprefixer'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const editBlog = async ({
    title,
    content,
    authorId = 1,
    id,
}: {
    title: string
    content: string
    id: number
    authorId?: number
}) => {
    const res = fetch(`http://localhost:3000/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, authorId, id }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return (await res).json()
}

const getBlogById = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`)
    const data = await res.json()
    return data.post
}

const deleteBlog = async (id: number) => {
    const res = fetch(`http://localhost:3000/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return (await res).json()
}

const EditPost = ({ params }: { params: { id: number } }) => {
    const router = useRouter()
    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (titleRef.current && descriptionRef.current) {
            toast.loading('Editting the Article 🚀', { id: '1' })

            await editBlog({
                title: titleRef.current?.value,
                content: descriptionRef.current?.value,
                id: params.id,
            })

            toast.success('Blog Posted Successfully', { id: '1' })

            router.push('/')
            router.refresh()
        }
    }

    const handleDelete = async () => {
        toast.loading('Deleting Blog', { id: '2' })
        await deleteBlog(params.id)
    }

    useEffect(() => {
        getBlogById(params.id)
            .then((data) => {
                if (titleRef.current) {
                    titleRef.current.value = data.title
                }
                if (descriptionRef.current) {
                    descriptionRef.current.value = data.content
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error('Something went wrong', { id: '1' })
            })
    }, [])
    return (
        <>
            <Toaster />
            <div className="w-full m-auto flex my-4">
                <div className="flex flex-col justify-center items-center m-auto">
                    <p className="text-2xl text-slate-500 font-bold p-3">
                        ブログの編集 🚀
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={titleRef}
                            placeholder="タイトルを入力"
                            type="text"
                            className="bg-slate-200 rounded-md px-4 w-full py-2 my-2"
                        />
                        <textarea
                            ref={descriptionRef}
                            placeholder="記事詳細を入力"
                            className="bg-slate-200 rounded-md px-4 py-2 w-full my-2"
                        ></textarea>
                        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                            更新
                        </button>
                        <button
                            className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
                            onClick={handleDelete}
                        >
                            削除
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditPost
