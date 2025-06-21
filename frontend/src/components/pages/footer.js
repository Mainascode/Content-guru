import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing React Icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400">Content Guru</h2>
            <p className="mt-2 text-gray-400">Empowering you with knowledge.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <Link to="/" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-gray-400 hover:text-white transition">About</Link>
            <Link to="/courses" className="text-gray-400 hover:text-white transition">Courses</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400">Email: support@contentguru.com</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaTwitter className="text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} Content Guru. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

