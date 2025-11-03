// src/pages/Blog.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";

const Blog = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const navigate = useNavigate();
  const API_URL = "https://content-guru-gpls.onrender.com/api/blogs";
  const isAdmin = user?.email === "mainaemmanuel855@gmail.com";

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setStatus("⚠️ Title and content are required.");
      return;
    }

    setLoading(true);
    setStatus("Publishing...");

    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error(await res.text());

      setNewPost({ title: "", content: "" });
      setStatus("Post created successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      setStatus("Server error while creating post.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) throw new Error(await res.text());
      setStatus("🗑️ Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      setStatus("Could not delete post.");
    } finally {
      setConfirmDelete(null);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-28 pb-12 px-6 relative">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        BLOGS
      </h1>

      {/* Admin form */}
      {isAdmin && !editingPost && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            ✍️ Write a New Post
          </h2>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <textarea
            placeholder="Write your content..."
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            rows="5"
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-yellow-500 outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
          {status && <p className="text-sm mt-3 text-gray-700">{status}</p>}
        </form>
      )}

      {/* Blog posts */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const isEditing = editingPost?.id === post.id;

            return (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-100"
              >
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded mb-3"
                    />
                    <textarea
                      value={editingPost.content}
                      onChange={(e) =>
                        setEditingPost({
                          ...editingPost,
                          content: e.target.value,
                        })
                      }
                      rows="4"
                      className="w-full p-2 border rounded mb-3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(post.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPost(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-3">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                    <p className="text-gray-700 italic leading-relaxed mb-3 whitespace-pre-line">
                      {post.content.length > 200
                        ? post.content.slice(0, 200) + "..."
                        : post.content}
                    </p>

                    {post.content.length > 200 && (
                      <button
                        onClick={() => navigate(`/blogs/${post.id}`)}
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold underline underline-offset-4"
                      >
                        Read More →
                      </button>
                    )}

                    {isAdmin && (
                      <div className="flex gap-3 mt-4">
        
                        <button
                          onClick={() => setConfirmDelete(post.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                 Delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
