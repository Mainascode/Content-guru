import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const books = [
  {
    title: "The Art of Content Writing",
    price: "$19.99",
    img: "/images/book1.jpg",
    description:
      "Learn how to write compelling, high-converting content that captures attention, builds trust, and drives action. This book dives deep into storytelling, structure, tone, and audience psychology — perfect for marketers, bloggers, and entrepreneurs.",
    category: "Content Marketing",
    publication: "Content Guru Press, 2024",
    rating: 4.8,
    pages: 210,
  },
  {
    title: "SEO for Beginners",
    price: "$15.99",
    img: "/images/book2.jpg",
    description:
      "A beginner-friendly guide that explains SEO fundamentals in plain English. From keyword research to backlink strategies, this book gives you everything you need to start ranking higher on Google.",
    category: "Digital Marketing",
    publication: "GrowthMind Media, 2024",
    rating: 4.6,
    pages: 180,
  },
  {
    title: "Social Media Marketing",
    price: "$22.99",
    img: "/images/book3.jpg",
    description:
      "Master social media growth, engagement, and ad strategies across Instagram, TikTok, and LinkedIn. Learn how to build a personal brand and turn followers into loyal customers.",
    category: "Social Media Strategy",
    publication: "Content Guru Press, 2025",
    rating: 4.9,
    pages: 230,
  },
];

const BookDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.title === decodeURIComponent(title));

  if (!book)
    return (
      <p className="text-center text-red-600 py-20 text-lg font-medium">
        Book not found.
      </p>
    );

  // Navigate to checkout page with book details
  const handleBuyNow = () => {
    const queryParams = new URLSearchParams({
      title: book.title,
      price: book.price,
    }).toString();
    navigate(`/checkout?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Book Cover */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src={book.img}
            alt={book.title}
            className="rounded-2xl shadow-2xl w-80 h-[400px] object-cover border-4 border-yellow-600/20"
          />
        </motion.div>

        {/* Book Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h1 className="text-4xl font-extrabold text-[#8B4513] leading-snug">
            {book.title}
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            {book.description}
          </p>

          <div className="space-y-1 text-gray-800 text-base">
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Publication:</strong> {book.publication}
            </p>
            <p>
              <strong>Pages:</strong> {book.pages}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                fill={i < Math.round(book.rating) ? "#FBBF24" : "none"}
                stroke="#FBBF24"
              />
            ))}
            <span className="text-gray-700 ml-2">{book.rating.toFixed(1)}</span>
          </div>

          {/* Price & CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <p className="text-3xl font-bold text-green-700">{book.price}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-yellow-700 transition"
            >
              Buy Now
            </motion.button>
          </div>

          <Link
            to="/books"
            className="inline-block mt-6 text-yellow-700 hover:text-yellow-800 font-medium transition"
          >
            ← Back to Books
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BookDetails;
