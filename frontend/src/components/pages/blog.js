import { useState, useEffect } from "react";
import { useAuth } from "./authcontext";

const Blog = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const API_URL = "https://content-guru-gpls.onrender.com/api/blogs";
  const isAdmin = user?.email === "mainaemmanuel855@gmail.com";

  // ✅ Fetch posts
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

  // 🔁 Auto-refresh every 10s
  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Create post
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
      setStatus("✅ Post created successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      setStatus("❌ Server error while creating post.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  // ✅ Update post
  const handleUpdate = async (id) => {
    if (!editingPost.title.trim() || !editingPost.content.trim()) {
      setStatus("⚠️ Both fields required for update.");
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(editingPost),
      });

      if (!res.ok) throw new Error(await res.text());
      setEditingPost(null);
      setStatus("✅ Post updated!");
      fetchPosts();
    } catch (err) {
      console.error("Error updating post:", err);
      setStatus("❌ Could not update post.");
    } finally {
      setTimeout(() => setStatus(""), 3000);
    }
  };



  return (
    <div className="max-w-7xl mx-auto pt-28 pb-12 px-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        📰 Our Blog
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
            const isExpanded = expandedPost === post.id;
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
                      rows="5"
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
                      {isExpanded
                        ? post.content
                        : post.content.length > 200
                        ? post.content.slice(0, 200) + "..."
                        : post.content}
                    </p>

                    {post.content.length > 200 && (
                      <button
                        onClick={() =>
                          setExpandedPost(isExpanded ? null : post.id)
                        }
                        className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                      >
                        {isExpanded ? "Show Less <<" : "Read More >>"}
                      </button>
                    )}

                    {isAdmin && (
                      <div className="flex gap-3 mt-4">
                       
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blog;
