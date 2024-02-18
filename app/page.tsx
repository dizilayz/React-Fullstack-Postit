"use client"
import AddPosts from "./components/AddPosts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Post from "./components/Post";
import { PostType } from "./types/Posts";


const allPosts = async () => {
  const response = await axios.get("api/posts/getPosts");
  return response.data;
}

export default function Home() {

  const { data, isLoading, error } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"]
  })
  return (
    <main>
      <AddPosts />
      {data?.map((post) => (
        <Post
          comments={post.Comment}
          key={post.id}
          name={post.user.name}
          title={post.title}
          avatar={post.user.image}
          id={post.id}
        />
      ))}
    </main>
  );
}
