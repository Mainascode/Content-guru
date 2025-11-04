import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const Blog = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const navigate = useNavigate();
  const API_URL = "https://content-guru-gpls.onrender.com/api/blogs";
  const isAdmin = user?.email === "muringiwork1@gmail.com";

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

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      showToast("Title and content are required.");
      return;
    }

    setLoading(true);

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
      fetchPosts();
      showToast("Blog post published!");
    } catch (err) {
      console.error("Error creating post:", err);
      showToast("Server error while publishing.");
    } finally {
      setLoading(false);
    }
  };

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
      showToast("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      showToast("Could not delete post.");
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-28 pb-12 px-6 relative">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">
        BLOGS
      </h1>

      {/* Admin post form */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-gradient-to-b from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-lg p-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-yellow-800 flex items-center gap-2">
            Write a New Blog Post
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full p-4 border border-yellow-300 rounded-lg mb-6 focus:ring-2 focus:ring-yellow-500 outline-none text-lg"
            />

            <textarea
              placeholder="Start writing your inspiring blog content here..."
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              rows="12"
              className="w-full p-4 border border-yellow-300 rounded-lg mb-6 focus:ring-2 focus:ring-yellow-500 outline-none text-base leading-relaxed"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </motion.div>
      )}

      {/* Blog posts grid */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-100"
            >
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
            </div>
          ))}
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
              Are you sure you want to delete this post? This action cannot be
              undone.
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

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
