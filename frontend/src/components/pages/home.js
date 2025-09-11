// src/components/pages/Home.js
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Footer from "./footer";

const courseDates = [
  new Date(2025, 6, 2),
  new Date(2025, 6, 10),
  new Date(2025, 6, 17),
];

const Home = () => {
  const [date, setDate] = useState(new Date());

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const match = courseDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
      return match
        ? "bg-yellow-500 text-white font-bold rounded-full"
        : null;
    }
  };

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen text-brown-800">
      {/* HERO SECTION */}
      <section className="relative bg-yellow-500 text-white py-28 px-6 sm:px-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold max-w-4xl mx-auto leading-tight">
          Turn Ideas Into Impactful Content That Sells, Engages & Ranks
        </h1>
        <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-yellow-100">
          Helping businesses, professionals, and learners create content
          strategies that drive results.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            className="bg-white text-yellow-700 px-6 py-3 rounded-full shadow font-semibold hover:bg-yellow-100"
          >
            Work With Us
          </motion.a>
          <motion.a
            href="/courses"
            whileHover={{ scale: 1.05 }}
            className="bg-brown-700 text-white px-6 py-3 rounded-full shadow font-semibold hover:bg-brown-800"
          >
            Explore Courses
          </motion.a>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            At <span className="font-semibold">Content Guru</span>, we believe
            great content is the heart of online success. Whether you’re a
            business owner looking to attract customers, a professional building
            your personal brand, or a learner ready to sharpen your digital
            skills—we’ve got you covered. We combine creativity, strategy, and
            SEO expertise to help you grow online.
          </p>
        </div>
      </section>

 {/* WHAT WE OFFER */}
<section className="bg-yellow-50 py-20 px-6 sm:px-12">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
      What We Offer
    </h2>
    <div className="grid md:grid-cols-3 gap-10">
      
      {/* Content Strategy */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center"
      >
        <h3 className="text-xl font-semibold mb-4">✍️ Content Strategy & Creation</h3>
        <p className="text-gray-700 mb-4">
          Fresh content ideas, scroll-stopping social posts, and SEO pages
          that drive traffic.
        </p>
        <a
          href="/books"
          className="inline-flex items-center gap-2 text-yellow-700 font-semibold hover:underline"
        >
          Get Content Help <FaArrowRight />
        </a>
      </motion.div>

      {/* Online Courses */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center"
      >
        <h3 className="text-xl font-semibold mb-4">🎓 Online Courses</h3>
        <p className="text-gray-700 mb-4">
          Learn how to create engaging content through practical,
          easy-to-follow lessons.
        </p>
        <a
          href="/courses"
          className="inline-flex items-center gap-2 text-yellow-700 font-semibold hover:underline"
        >
          Browse Courses <FaArrowRight />
        </a>
      </motion.div>

      {/* Employers & Collaborators */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center"
      >
        <h3 className="text-xl font-semibold mb-4">🤝 For Employers & Collaborators</h3>
        <p className="text-gray-700 mb-4">
          Open to collaborations, partnerships, and long-term growth
          projects tailored to your goals.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-yellow-700 font-semibold hover:underline"
        >
          Let’s Collaborate <FaArrowRight />
        </a>
      </motion.div>
    </div>
  </div>
</section>


      {/* WHY CHOOSE US */}
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10">Why Choose Us?</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li> SEO-Friendly – Optimized for search.</li>
            <li> Engaging & Shareable – Content that resonates.</li>
            <li> Proven Results – Boosts visibility, traffic & sales.</li>
            <li> Personalized Approach – Tailored solutions.</li>
            <li> Friendly & Professional – Growth made simple.</li>
          </ul>
        </div>
      </section>

{/* CTA SECTION */}
<section className="bg-yellow-500 text-white py-20 px-6 sm:px-12 text-center">
  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
    Your ideas deserve to be seen, heard, and acted on.
  </h2>
  <p className="text-lg mb-8">
    Whether you want to learn, grow your brand, or partner with a content
    strategist, you’re in the right place.
  </p>
  <div className="flex justify-center flex-wrap gap-4">
    <a
      href="/courses"
      className="bg-white text-yellow-700 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100"
    >
      Start Learning
    </a>
    <a
      href="/contact"
      className="bg-brown-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-brown-800"
    >
      Work With Us
    </a>
    <a
      href="/book-call"
      className="bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-800"
    >
      Book a Free Call
    </a>
  </div>
</section>

      {/* COURSE CALENDAR */}
      <section className="bg-yellow-50 text-yellow-900 py-16 px-6 sm:px-12 flex-grow">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Course Calendar</h2>
          <p className="mb-6 text-gray-700">
            Highlighted dates represent enrollment days.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
            <Calendar
              value={date}
              onClickDay={setDate}
              tileClassName={tileClassName}
              className="REACT-CALENDAR w-full"
            />
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-white py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            From the Blog
          </h2>
          <p className="text-gray-700 mb-10">
            Tips on social media growth, virtual assistance, and business
            marketing.
          </p>
          <a
            href="/blog"
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600"
          >
            Visit Blog
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
