import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-900 text-yellow-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-300">Content Guru</h2>
          <p className="mt-2 text-yellow-200 text-sm">
            Empowering creators with skills, strategy, and support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col space-y-2 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@contentguru.com</p>
          <p className="text-sm">Phone: +1 (555) 123-4567</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <FaFacebook className="text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <FaTwitter className="text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
              <FaInstagram className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-yellow-400 text-xs mt-8 border-t border-yellow-800 pt-4">
        © {new Date().getFullYear()} Content Guru. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

