import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-12 pt-24">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-yellow-900 mb-10"
      >
        About Me
      </motion.h1>

      {/* Profile Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-16 max-w-5xl mx-auto">
        <div className="mb-8 md:mb-0 md:mr-10 flex-shrink-0">
          
        </div>

        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-800 mb-4">
            Hello! I'm <span className="text-yellow-600 font-bold">Maureen</span>, a Professional Virtual Assistant & Social Media Manager
          </h2>
          <p className="text-base sm:text-lg text-yellow-700 leading-relaxed">
            I help busy entrepreneurs and growing businesses streamline operations and build a powerful online presence. 
            With a unique blend of administrative expertise and creative digital marketing, 
            I empower clients to scale and shine online.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-yellow-700 mb-6 text-center">My Background & Experience</h3>
        <p className="text-yellow-700 text-base sm:text-lg mb-6 leading-relaxed">
          With over <strong>6 years</strong> of experience, I’ve collaborated with startups, coaches, and ecommerce brands 
          to manage tasks, grow engagement, and implement streamlined workflows. 
          I thrive in dynamic environments and love helping others succeed.
        </p>
        <div className="text-left">
          <h4 className="font-semibold text-yellow-800 mb-3">Areas I specialize in:</h4>
          <ul className="list-disc list-inside space-y-3 text-yellow-700">
            <li><strong>Social Media Management:</strong> Planning, scheduling, and engaging across Instagram, Facebook, LinkedIn, and more.</li>
            <li><strong>Content Strategy:</strong> Crafting valuable, brand-aligned content with visually engaging design.</li>
            <li><strong>Email Marketing:</strong> Creating nurturing sequences and impactful newsletters with measurable results.</li>
            <li><strong>Admin Support:</strong> Organizing inboxes, scheduling calls, and keeping operations running smoothly.</li>
          </ul>
        </div>
      </section>

      {/* Growth */}
      <section className="bg-white rounded-xl shadow-md p-6 sm:p-8 mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-yellow-700 mb-6 text-center">How I Help Businesses Grow Online</h3>
        <p className="text-yellow-700 text-base sm:text-lg mb-6 text-center leading-relaxed">
          A strong digital presence is essential in today’s marketplace. I help brands stand out with strategies tailored to their voice, goals, and audience.
        </p>
        <div className="text-left">
          <h4 className="font-semibold text-yellow-800 mb-3">What I bring to the table:</h4>
          <ul className="list-disc list-inside space-y-3 text-yellow-700">
            <li><strong>Brand Visibility:</strong> Through intentional content and campaigns that build awareness.</li>
            <li><strong>Audience Engagement:</strong> Real conversations and community management that humanizes your brand.</li>
            <li><strong>Data-Driven Growth:</strong> Analyzing metrics to optimize performance and continuously improve.</li>
            <li><strong>Conversions & Sales:</strong> Turning engagement into leads and leads into paying clients.</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-base sm:text-lg text-yellow-800 mb-6">
          Every business deserves the opportunity to thrive online. Let’s collaborate to create a digital presence that reflects your passion and brings in real results.
        </p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full font-semibold hover:bg-yellow-700 transition"
        >
          Let's Connect
        </Link>
      </section>
    </div>
  );
};

export default About;

