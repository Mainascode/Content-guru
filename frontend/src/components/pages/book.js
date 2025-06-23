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
    { title: "The Art of Content Writing", price: "$19.99", img: "/images/book1.jpg" },
    { title: "SEO for Beginners", price: "$15.99", img: "/images/book2.jpg" },
    { title: "Social Media Marketing", price: "$22.99", img: "/images/book3.jpg" },
  ];

  const handleBuy = (book) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    navigate("/checkout", {
      state: { book },
    });
  
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoggedIn && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center font-medium">
          You are logged in!
        </div>
      )}

      {showLoginModal && <LoginModal closeModal={closeModal} navigate={navigate} />}

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center text-gray-800"
      >
        Our Books
      </motion.h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-full h-52 object-cover rounded-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{book.title}</h2>
            <p className="text-lg font-semibold text-green-600">{book.price}</p>

            <button
              onClick={() => handleBuy(book)}
              className="mt-4 w-full px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Buy Now
            </button>

            <Link
              to={`/books/${encodeURIComponent(book.title)}`}
              className="mt-3 block text-center text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Books;
