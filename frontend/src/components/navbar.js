import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAuth } from "./pages/authcontext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const linkClass =
    "text-[#6b3f1a] hover:text-[#4a2e12] transition font-medium";

  const navLinks = (
    <>
      <Link to="/courses" onClick={closeMenu} className={linkClass}>Courses</Link>
      <Link to="/books" onClick={closeMenu} className={linkClass}>Books</Link>
      <Link to="/services" onClick={closeMenu} className={linkClass}>Services</Link>
      <Link to="/about" onClick={closeMenu} className={linkClass}>About</Link>
      <Link to="/blog" onClick={closeMenu} className={linkClass}>Blog</Link>
    </>
  );

  return (
    <nav
      className={[
        "fixed w-full z-50 transition-colors duration-300 border-b",
        isScrolled
          ? "bg-yellow-600/95 border-yellow-700 backdrop-blur"
          : "bg-yellow-500 border-yellow-400",
      ].join(" ")}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" onClick={closeMenu} className="text-[#6b3f1a]">
            Content Guru
          </Link>
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {navLinks}
          {!isAuthenticated ? (
            <Link to="/login" onClick={closeMenu} className={linkClass}>
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className={`${linkClass} flex items-center gap-1`}
              >
                <FaUser className="text-[#6b3f1a]" />
                <span className="hidden sm:inline">
                  {user?.displayName || user?.email}
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-2xl text-[#6b3f1a]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-white py-6 px-6 text-center flex flex-col space-y-4 border-t border-yellow-200">
          {navLinks}
          {isAuthenticated ? (
            <>
              <span className="text-sm text-[#6b3f1a] font-medium">
                {user?.displayName || user?.email}
              </span>
            </>
          ) : (
            <Link to="/login" className={linkClass} onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
