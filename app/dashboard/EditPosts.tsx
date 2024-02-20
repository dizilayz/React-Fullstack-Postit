'use client'
import Image from "next/image"
import Toggle from "./Toggle"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

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
    const [toggle, setToggle] = useState(false);
    const queryClient = useQueryClient();
    //Delete post
    const { mutate } = useMutation({
        mutationFn: async (id: string) => await axios.delete("api/posts/deletePost", { data: id }),
        onError: (error) => console.log(error),
        onSuccess: (data) => queryClient.invalidateQueries({ queryKey: ["auth-posts"] })
    })

    const deletePost = () => {
        mutate(id);
    }

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
                        <button onClick={() => setToggle(true)} className="text-sm font-bold text-red-600" >Delete</button>
                    </div>
                )}
            </div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    )
}