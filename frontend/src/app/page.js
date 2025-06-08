"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.excerpt}</p>
          <a href={`/posts/${post._id}`} className="text-blue-500">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}
