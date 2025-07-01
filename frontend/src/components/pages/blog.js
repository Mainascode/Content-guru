// /src/pages/Blog.jsx
import { useEffect, useState } from "react";
import { useAuth } from "./authcontext";
import { motion } from "framer-motion";

export default function BlogPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://content-guru.onrender.com/api/blogs")
      .then(res => res.json())
      .then(data => {
        setPosts(data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs", err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;
    const response = await fetch("https://content-guru.onrender.com/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newPost, author: user?.email || "Anonymous" })
    });
    const saved = await response.json();
    setPosts([saved, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  return (
<div className="bg-yellow-50 min-h-screen px-4 sm:px-6 md:px-8 py-12">
  <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-800 mb-8">
    📝 Community Blog Timeline
  </h1>

      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-2xl mx-auto p-6 rounded-lg shadow mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-800">New Post</h2>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full mb-4 p-3 border border-yellow-200 rounded"
          />
          <textarea
            placeholder="Content"
            rows="4"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="w-full mb-4 p-3 border border-yellow-200 rounded"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800"
          >
            Post
          </button>
        </form>
      )}

      {loading && <p className="text-center text-gray-500">Loading posts...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-center text-yellow-800">No posts yet. Be the first to write!</p>
      )}

      <div className="relative border-l-2 border-yellow-300 pl-6">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="mb-8 relative"
          >
            <div className="absolute -left-3 w-6 h-6 bg-yellow-500 rounded-full border-4 border-white"></div>
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-bold text-yellow-800">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.content}</p>
              <p className="text-sm text-yellow-600 mt-2">
                By {post.author || "Anonymous"} •{" "}
                {new Date(post.createdAt || new Date()).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
