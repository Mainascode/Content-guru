import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./authcontext";
import LoginModal from "./cancel";

const Books = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const closeModal = () => setShowLoginModal(false);

  const books = [
    {
      title: "The Art of Content Writing",
      price: "$19.99",
      img: "/images/book1.jpg",
    },
    {
      title: "SEO for Beginners",
      price: "$15.99",
      img: "/images/book2.jpg",
    },
    {
      title: "Social Media Marketing",
      price: "$22.99",
      img: "/images/book3.jpg",
    },
  ];

  const handleBuy = (book) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    navigate("/checkout", { state: { book } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ✅ Full background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/books-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* ✅ Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-24 sm:py-28">
        {isLoggedIn && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 text-center font-medium">
            ✅ You’re logged in! Enjoy shopping.
          </div>
        )}

        {showLoginModal && (
          <LoginModal closeModal={closeModal} navigate={navigate} />
        )}

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-12"
        >
          📚 Our Books
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {books.map((book) => (
            <motion.div
  key={book.title}
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"

            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-52 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold text-yellow-900 mb-2">
                {book.title}
              </h2>
              <p className="text-lg font-semibold text-yellow-700">
                {book.price}
              </p>

              <button
                onClick={() => handleBuy(book)}
                className="mt-4 w-full px-5 py-3 rounded-full bg-yellow-700 hover:bg-yellow-800 text-white font-semibold transition-all"
              >
                Buy Now
              </button>

              <Link
                to={`/books/${encodeURIComponent(book.title)}`}
                className="mt-3 block text-center text-yellow-800 font-medium hover:underline"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
