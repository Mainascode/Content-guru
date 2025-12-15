import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Share2, CheckCircle2 } from "lucide-react";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    const fetchBlog = async () => {
      const API_URL = `https://content-guru-gpls.onrender.com/blogs/${id}`;
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: "Check out this amazing blog post on Content Guru!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("🔗 Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-700">
        Loading post...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <p>Blog not found.</p>
        <button
          onClick={() => navigate("/blogs")}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-10 px-4 relative">
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-yellow-600 hover:text-yellow-700 mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </button>

        <h1 className="text-3xl font-bold text-yellow-800 mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(blog.created_at).toLocaleDateString()}
          </div>
        </div>

        <motion.div
          className="prose max-w-none prose-yellow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.content}
          </p>
        </motion.div>

        {/* Universal Share button */}
        <div className="mt-10 border-t border-yellow-100 pt-6 flex justify-between items-center">
          <h3 className="text-yellow-700 font-semibold">
            Share this post:
          </h3>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full shadow hover:bg-yellow-600 transition-transform transform hover:scale-105"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
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
}
