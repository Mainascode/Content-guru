// /src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './components/pages/authcontext';
import PrivateRoute from './components/PrivateRoute';

import Navbar from './components/navbar';
import Home from './components/pages/home';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Courses from './components/pages/course';
import Books from './components/pages/book';
import BookDetails from './components/pages/bookdetails';
import Services from './components/pages/service';
import Contact from './components/pages/contact';
import About from './components/pages/about';
import Enrollment from './components/pages/enrollment';
import PaymentSuccessPage from './components/pages/payment';
import Checkout from './components/pages/checkoutpage';
import Profile from './components/pages/Profile';

import './index.css';

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Publicly viewable course/book lists */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:title" element={<BookDetails />} />

        {/* Auth-protected actions */}
        <Route path="/enroll/:courseId" element={
          <PrivateRoute><Enrollment /></PrivateRoute>
        } />
        <Route path="/checkout" element={
          <PrivateRoute><Checkout /></PrivateRoute>
        } />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />

        {/* Always public */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "AfqKJh9FRrd-aqMGCFRlgg1vhhXF3gg9ViCeZRMLCX9p0JEdrBfJWGWm-uBPnKjY7d0_TjfG_oHs--de" }}>
      <AuthProvider>
        <Router>
          <AppContent />
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;
