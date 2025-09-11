// src/components/pages/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-yellow-500 text-brown-900 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Content Guru</h2>
          <p className="text-sm">
            Helping businesses, professionals & learners grow with content, 
            courses, and digital services that deliver results.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brown-600">About</Link></li>
            <li><Link to="/courses" className="hover:text-brown-600">Courses</Link></li>
            <li><Link to="/books" className="hover:text-brown-600">Books</Link></li>
            <li><Link to="/services" className="hover:text-brown-600">Services</Link></li>
            <li><Link to="/blog" className="hover:text-brown-600">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-brown-600">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: yoursocialcontent@gmail.com</p>
          <p className="text-sm">Phone: +254 700 000 000</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-brown-900">
            <a
              href="https://www.facebook.com/content__guru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brown-600"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/content__guru"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brown-600"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brown-600"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brown-600"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-yellow-400 pt-4 text-center text-xs text-white">
        &copy; {new Date().getFullYear()} Content Guru. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
