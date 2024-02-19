'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPosts";
import Toggle from "./Toggle"

const fetchAuthPosts = async () => {
    const response = await axios.get("api/posts/authPosts");
    return response.data;
}

export default function MyPosts() {
    const { data, isLoading } = useQuery<AuthPosts>({
        queryFn: fetchAuthPosts,
        queryKey: ["auth-posts"]
    })
    if(isLoading) return <h1>Loading...</h1>
    console.log(data);
    return (
        <div>
            <h1>My Data</h1>
            {data?.Post.map((post) => (
                <EditPost
                key={post.id}
                id={post.id}
                avatar={data.image}
                name={data.name}
                title={post.title}
                comments={post.Comment}
                />
            ))}
            <Toggle/>
        </div>
    )
}