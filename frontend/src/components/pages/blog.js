import { useState, useEffect } from "react";
import { useAuth } from "./authcontext";

const Blog = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const isAdmin = user?.email === "mainaemmanuel855@gmail.com";

  // ✅ Fetch all blog posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://content-guru-gpls.onrender.com/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto-refresh posts every 10 seconds
  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch("https://content-guru-gpls.onrender.com/api/blogs", {
        method: "POST",
        headers,
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
        }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to create post: ${errMsg}`);
      }

      await res.json();
      setNewPost({ title: "", content: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("❌ Could not create post. Check console for details.");
    }
  };

  // ✅ Update post
  const handleUpdate = async (id) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(
        `https://content-guru-gpls.onrender.com/api/blogs/${id}`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({
            title: editingPost.title,
            content: editingPost.content,
          }),
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to update post: ${errMsg}`);
      }

      await res.json();
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      console.error("Error updating post:", err);
      alert("❌ Could not update post.");
    }
  };

  // ✅ Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const res = await fetch(
        `https://content-guru-gpls.onrender.com/api/blogs/${id}`,
        {
          method: "DELETE",
          headers,
        }
      );

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(`Failed to delete post: ${errMsg}`);
      }

      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("❌ Could not delete post.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-28 pb-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Blog</h1>

      {/* Admin create form */}
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
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="w-full p-2 border rounded mb-4"
          />
          <textarea
            placeholder="Write your content..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
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

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 mb-6 animate-pulse">
          Loading posts...
        </p>
      )}

      {/* Blog posts grid */}
      {!loading && posts.length === 0 ? (
        <p className="text-center text-gray-500">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const isExpanded = expandedPost === post.id;
            return (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-5">
                  {editingPost?.id === post.id ? (
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
                      <h2 className="text-lg font-bold text-gray-800 mb-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-4">
                        Posted on{" "}
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-gray-700 mb-4 whitespace-pre-line">
                        {isExpanded
                          ? post.content
                          : post.content?.length > 150
                          ? post.content.slice(0, 150) + "..."
                          : post.content}
                      </p>
                      {post.content?.length > 150 && (
                        <button
                          onClick={() =>
                            setExpandedPost(isExpanded ? null : post.id)
                          }
                          className="text-blue-700 text-sm font-medium hover:underline hover:text-blue-900"
                        >
                          {isExpanded ? "SHOW LESS <<" : "READ MORE >>"}
                        </button>
                      )}

                      {/* Admin edit/delete controls */}
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Blog;
