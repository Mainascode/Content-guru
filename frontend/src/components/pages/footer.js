// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-yellow-900 text-yellow-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-yellow-50 mb-3">Content Guru</h2>
          <p className="text-sm text-yellow-200">
            Empowering you with courses, books & digital services for growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-50 mb-2">Company</h3>
          <ul className="space-y-2 text-sm">
            
            <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
            <li><Link to="/courses" className="hover:text-yellow-400">Courses</Link></li>
            <li><Link to="/books" className="hover:text-yellow-400">Books</Link></li>
            <li><Link to="/services" className="hover:text-yellow-400">Services</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-400">Blog</Link></li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-50 mb-2">Contact</h3>
          <p className="text-sm">Email: yoursocialcontent@gmail.com</p>
          <p className="text-sm">Phone: +254 742021270

          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-50 mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/content__guru"target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaFacebook /></a>

            <a href="https://www.instagram.com/content__guru"target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FaInstagram /></a>

          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-yellow-700 pt-4 text-center text-xs text-yellow-300">
        &copy; {new Date().getFullYear()} Content Guru. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
