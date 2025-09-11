import { useState, useEffect } from "react";
import { useAuth } from "./authcontext";


const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // check if current user is admin
  const isAdmin = user?.email === "mainaemmanuel855@gmail.com";

  // Load posts from localStorage when page loads
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    setPosts(storedPosts);
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);
const handleSubmit = (e) => {
  e.preventDefault();
  if (!newPost.title || !newPost.content) return;

  const newEntry = {
    id: Date.now(),
    title: newPost.title,
    content: newPost.content,
    date: new Date().toISOString(), // 👈 Save timestamp
  };

  const updatedPosts = [newEntry, ...posts];
  setPosts(updatedPosts);
  localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));

  setNewPost({ title: "", content: "" });
};
  return (
<div className="max-w-4xl mx-auto pt-28 pb-12 px-6">
  <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>

      {/* Admin editor */}
      {isAdmin && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-yellow-50 p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">✍️ Write a New Post</h2>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <textarea
            placeholder="Write your content..."
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            rows="5"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded"
          >
            Publish
          </button>
        </form>
      )}

      {/* Blog posts */}
      <div className="space-y-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Check back soon!</p>
        ) : (
          posts.map((post) => (
<article
  key={post.id}
  className="bg-white p-6 rounded-lg shadow-lg border"
>
  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
  <p className="text-sm text-gray-500 mb-4">
    Posted on {new Date(post.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </p>
  <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
</article>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
