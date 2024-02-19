'use client'
import Image from "next/image"
import Toggle from "./Toggle"

type EditProps = {
    id: string
    name: string
    title: string
    avatar: string
    comments?: {
        id: string,
        postId: string,
        userId: string
    }[]
}

export default function EditPost({ id, avatar, name, title, comments }: EditProps) {
    return (
        <>
            <div className="bg-white my-8 p-8 rounded-xl" >
                <div className="flex items-center gap-2">
                    <Image
                        className="rounded-xl"
                        width={32}
                        height={32}
                        src={avatar}
                        alt="avatar"
                    />
                    <h3 className="text-sm font-bold break-all" >{name}</h3>
                </div>
                <div className="my-8" >
                    <p>{title}</p>
                </div>
                {comments && (
                    <div className="flex items-center gap-2" >
                        <p className="text-sm font-bold text-gray-600" >{comments.length} Comments</p>
                        <button className="text-sm font-bold text-red-600" >Delete</button>
                    </div>
                )}
            </div>
            {/* <Toggle/> */}
        </>
    )
}