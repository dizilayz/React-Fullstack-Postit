'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const queryClient = useQueryClient();

    // Create a post

    const { mutate } = useMutation({
        mutationFn: async (title: String) => await axios.post("/api/posts/addPost", { title }),
        onError: (err) => {
            if (err instanceof AxiosError) {
                toast.error(err?.response?.data.message);
            }
            setIsDisabled(false)
        },
        onSuccess: (data) => {
            toast.success("Post has been made");
            queryClient.invalidateQueries({queryKey: ['posts']})
            setTitle("");
            setIsDisabled(false);
        }
    })


    //     const { mutate } = useMutation(
    //         async (title) => await axios.post("/api/posts/addPost", { title })
    // )

    const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsDisabled(true);
        mutate(title)
    }

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md " >
            <div className="flex flex-col my-4" >
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    value={title}
                    placeholder="What's on your mind ?"
                    className="py-4 text-lg rounded-md my-2 bg-gray-200"
                ></textarea>
            </div>
            <div className="flex justify-between items-center" >
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-700"}`} >{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className="bg-teal-700 text-white py-2 px-6 text-sm rounded-xl disabled:opacity-25"
                    type="submit"
                >Create a post</button>
            </div>
        </form>
    )
}