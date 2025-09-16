import { useState, useEffect } from "react";
import { useAuth } from "./authcontext";

const API_URL = "https://content-guru-gpls.onrender.com/api/blogs";


const Blog = () => {
  const { user, token } = useAuth(); // make sure your authcontext exposes JWT token
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);

  // check if current user is admin
  const isAdmin = user?.email === "mainaemmanuel855@gmail.com";

  // Load posts from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  // Add new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // protect with JWT
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("Failed to create post");
      const created = await res.json();

      setPosts((prev) => [created, ...prev]);
      setNewPost({ title: "", content: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit post
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingPost),
      });

      if (!res.ok) throw new Error("Failed to update post");
      const updated = await res.json();

      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );
      setEditingPost(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete post");

      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>

      {/* Admin editor */}
      {isAdmin && !editingPost && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-yellow-50 p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">✍️ Write a New Post</h2>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) =>
              setNewPost({ ...newPost, title: e.target.value })
            }
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
          <p className="text-center text-gray-500">
            No posts yet. Check back soon!
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-lg border"
            >
              {editingPost?.id === post.id ? (
                <>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    className="w-full p-2 border rounded mb-4"
                  />
                  <textarea
                    value={editingPost.content}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        content: e.target.value,
                      })
                    }
                    rows="5"
                    className="w-full p-2 border rounded mb-4"
                  />
                  <button
                    onClick={() => handleUpdate(post.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Posted on{" "}
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-gray-700 whitespace-pre-line">
                    {post.content}
                  </p>

                  {isAdmin && (
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
