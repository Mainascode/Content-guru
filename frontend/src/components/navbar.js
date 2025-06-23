import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAuth } from "./pages/authcontext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsOpen(false);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks = (
    <>
      <Link to="/courses" onClick={closeMenu} className="hover:text-blue-400 transition">Courses</Link>
      <Link to="/books" onClick={closeMenu} className="hover:text-blue-400 transition">Books</Link>
      <Link to="/services" onClick={closeMenu} className="hover:text-blue-400 transition">Services</Link>
      <Link to="/about" onClick={closeMenu} className="hover:text-blue-400 transition">About</Link>
    </>
  );

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">
          <Link to="/" onClick={closeMenu}>Content Guru</Link>
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {navLinks}
          {!isAuthenticated ? (
            <Link to="/login" className="hover:text-blue-400 transition" onClick={closeMenu}>Login</Link>
          ) : (
            <>
              <Link to="/profile" onClick={closeMenu} className="hover:text-blue-400 transition flex items-center gap-1">
                <FaUser className="text-blue-300" />
                <span className="hidden sm:inline">{user?.displayName || user?.email}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-6 px-6 text-center flex flex-col space-y-4 transition-all duration-300 ease-in-out">
          {navLinks}
          {isAuthenticated ? (
            <>
              <span className="text-sm text-blue-300 font-medium">{user?.displayName || user?.email}</span>
              <button
                onClick={handleLogout}
                className="mt-2 w-full px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition" onClick={closeMenu}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
