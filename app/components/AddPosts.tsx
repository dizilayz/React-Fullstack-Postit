'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    // Create a post

    const mutation = useMutation({
        mutationFn: async (title) => await axios.post("/api/posts/addPost", title)

    })

    // const { mutate } = useMutation(
    //     async (title) => await axios.post("/api/posts/addPost", { title })
    // )


    return (
        <form className="bg-white my-8 p-8 rounded-md " >
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