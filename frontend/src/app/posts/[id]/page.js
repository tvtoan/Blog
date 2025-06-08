"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [id]);

  if (!post) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
      )}
      <p className="text-gray-500 mb-4">
        Posted by {post.owner.name} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Share on Facebook
      </button>
    </div>
  );
}
