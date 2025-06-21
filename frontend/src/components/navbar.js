import { useState } from "react";
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

  const navLinks = (
    <>
      <Link to="/courses" className="hover:text-blue-400 transition" onClick={closeMenu}>Courses</Link>
      <Link to="/books" className="hover:text-blue-400 transition" onClick={closeMenu}>Books</Link>
      <Link to="/services" className="hover:text-blue-400 transition" onClick={closeMenu}>Services</Link>
      <Link to="/about" className="hover:text-blue-400 transition" onClick={closeMenu}>About</Link>
    </>
  );

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400">
          <Link to="/" onClick={closeMenu}>Content Guru</Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {navLinks}

          {!isAuthenticated ? (
            <Link to="/login" className="hover:text-blue-400 transition" onClick={closeMenu}>Login</Link>
          ) : (
            <>
              <Link to="/profile" className="hover:text-blue-400 transition" onClick={closeMenu}>
                {user?.username || <FaUser />}
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4 text-center space-y-4">
          {navLinks}

{isAuthenticated ? (
  <>
    <span className="text-sm text-blue-300 font-medium">
      {user.displayName || user.email}
    </span>
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition text-white"
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
