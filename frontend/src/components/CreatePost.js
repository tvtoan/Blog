"use client";

import { useState, useEffect } from "react";
import { createPost, getUser } from "@/app/services/postService";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState("");
  const [sections, setSections] = useState([
    { subtitle: "", content: "", image: "" },
  ]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser();
        if (userData.role !== "admin") {
          setError("Only admins can create posts.");
          router.push("/login");
        } else {
          setUser(userData);
        }
      } catch (error) {
        setError("Please log in to create a post.");
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        excerpt,
        image,
        sections,
      };
      await createPost(postData);
      alert("Post created successfully!");
      setTitle("");
      setExcerpt("");
      setImage("");
      setSections([{ subtitle: "", content: "", image: "" }]);
      router.push("/");
    } catch (error) {
      console.error(error.message);
      alert(error.message || "Failed to create post");
    }
  };

  const addSection = () => {
    setSections([...sections, { subtitle: "", content: "", image: "" }]);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!user) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create New Post
      </h1>
      <form onSubmit={handleSubmit} className="max-w-[750px] mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {sections.map((section, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <label className="block text-sm font-medium">
              Section {index + 1} Subtitle
            </label>
            <input
              type="text"
              value={section.subtitle}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[index].subtitle = e.target.value;
                setSections(newSections);
              }}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium mt-2">
              Section {index + 1} Content
            </label>
            <textarea
              value={section.content}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[index].content = e.target.value;
                setSections(newSections);
              }}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium mt-2">
              Section {index + 1} Image URL
            </label>
            <input
              type="text"
              value={section.image}
              onChange={(e) => {
                const newSections = [...sections];
                newSections[index].image = e.target.value;
                setSections(newSections);
              }}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSection}
          className="bg-gray-200 px-4 py-2 rounded mb-4"
        >
          Add Section
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
