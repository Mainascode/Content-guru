// src/components/pages/Home.js
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect, useRef } from "react";
import Footer from "./footer";

const courseDates = [
  new Date(2025, 6, 2),
  new Date(2025, 6, 10),
  new Date(2025, 6, 17),
];

const slides = [
  {
    bg: "/images/slide1.jpg",
    heading: "Welcome to Content Guru",
    sub: "Explore premium courses, bestselling books, and expert promotional services.",
  },
  {
    bg: "/images/slide2.jpg",
    heading: "Level Up Your Skills",
    sub: "Curated learning paths for creators and educators.",
  },
  {
    bg: "/images/slide3.jpg",
    heading: "Grow & Shine Online",
    sub: "Boost your brand with powerful marketing solutions.",
  },
];

const SWIPE_THRESHOLD = 80; // px

const Home = () => {
  const [date, setDate] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // Auto-rotate (fix: step +1, not +3)
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Arrow keys navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nextSlide = () => setCurrentSlide((s) => (s + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  const goTo = (i) => setCurrentSlide(i);

  // Cursor parallax for hero text
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [ -150, 150 ], [ -10, 10 ]);
  const ty = useTransform(my, [ -150, 150 ], [ -8, 8 ]);

  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(-150, Math.min(150, x)));
    my.set(Math.max(-150, Math.min(150, y)));
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const match = courseDates.some((d) => d.toDateString() === date.toDateString());
      return match ? "bg-yellow-500 text-white font-bold rounded-full" : null;
    }
  };

  return (
    <div className="overflow-x-hidden flex flex-col min-h-screen">
      {/* Intro (white per client) */}
      <section className="bg-white text-yellow-900 py-16 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center">Content Guru</h2>
          <div className="flex flex-col md:flex-row items-center text-center md:text-left">
            <div>
              <h3 className="text-3xl font-semibold text-yellow-800 mb-4">
                Hello! I'm a Professional Virtual Assistant & Social Media Manager
              </h3>
              <p className="text-lg text-yellow-700 mb-4">
                I help busy entrepreneurs and growing businesses streamline operations and build a powerful online presence.
              </p>
              <p className="text-lg text-yellow-700">
                Content Guru is your one-stop platform for professional growth. We offer expertly curated courses, top-rated books, and powerful marketing services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero: swipeable/drag + parallax + dots */}
      <section
        className="relative h-[90vh] select-none"
        ref={containerRef}
        onMouseMove={onMouseMove}
      >
        {/* Background image */}
        <motion.div
          key={currentSlide} // cross-fade on change
          initial={{ opacity: 0.4, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${slides[currentSlide].bg}')` }}
        />

        {/* Brand overlay (brown/yellow gradient) */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/70 via-yellow-800/70 to-yellow-900/70" />

        {/* Subtle animated glow blob */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-yellow-500/20 blur-3xl animate-pulse" />

        {/* Slide content wrapper with drag to swipe */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 sm:px-12 text-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -SWIPE_THRESHOLD) nextSlide();
            if (info.offset.x > SWIPE_THRESHOLD) prevSlide();
          }}
        >
          {/* Parallaxed text block */}
          <motion.div style={{ x: tx, y: ty }}>
            <motion.h1
              whileHover={{ scale: 1.02, rotate: 0.3 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="text-white text-4xl sm:text-6xl font-extrabold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            >
              {slides[currentSlide].heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-4 text-base sm:text-xl text-yellow-100"
            >
              {slides[currentSlide].sub}
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.a
            href="/courses"
            className="mt-10 inline-flex items-center justify-center bg-yellow-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all"
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlayCircle className="mr-2" />
            <span className="font-semibold">Explore Courses</span>
          </motion.a>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentSlide ? "w-6 bg-yellow-400" : "w-2.5 bg-yellow-200/80"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows (desktop) */}
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/20"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white px-3 py-2 rounded-full hover:bg-white/20"
            aria-label="Next slide"
          >
            ›
          </button>
        </motion.div>
      </section>

      {/* Calendar (white per client) */}
      <section className="bg-white text-yellow-900 py-16 px-4 sm:px-6 md:px-8 flex-grow">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Course Calendar</h2>
          <p className="mb-6 text-gray-700 text-sm sm:text-base">
            Highlighted dates represent enrollment days.
          </p>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto inline-block border border-yellow-200">
            <Calendar
              value={date}
              onClickDay={setDate}
              tileClassName={tileClassName}
              className="REACT-CALENDAR w-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
