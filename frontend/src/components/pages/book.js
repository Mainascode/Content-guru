
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
      price: "$0.99",
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
    <div className="bg-white min-h-screen px-4 py-24 sm:py-28">
      {/* ✅ Header block in brown */}
      <div className="bg-[#8B4513] py-6 rounded-lg mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white">
          BOOKS
        </h1>
      </div>

      {showLoginModal && (
        <LoginModal closeModal={closeModal} navigate={navigate} />
      )}

      {/* ✅ Book cards with no transparency and no yellow text */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book.title}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {book.title}
            </h2>
            <p className="text-lg font-semibold text-gray-700">{book.price}</p>

            <button
              onClick={() => handleBuy(book)}
              className="mt-4 w-full px-5 py-3 rounded-full bg-[#8B4513] hover:bg-[#6F3410] text-white font-semibold transition-all"
            >
              Buy Now
            </button>

            <Link
              to={`/books/${encodeURIComponent(book.title)}`}
              className="mt-3 block text-center text-[#8B4513] font-medium hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Books;
