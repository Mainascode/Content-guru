📘 Content Guru — Website Blueprint
🌐 Overview

Content Guru is a modern, responsive web platform designed to showcase courses, resources, and services related to content creation, social media marketing, and branding.
It offers a seamless user experience — from browsing courses and booking calls to secure login and payment handling — all wrapped in a clean, elegant UI built with React + Tailwind CSS.

🚀 Tech Stack
Category	Tools Used
Frontend	React.js (with React Router), Tailwind CSS, Framer Motion
Backend	Node.js / Express (hosted on Render)
Database	MongoDB (for user, course, and enrollment data)
Auth	Firebase Authentication (Email & Google Login)
Email Service	EmailJS (for contact and booking messages)
Hosting	Frontend: Vercel / Netlify
Backend: Render
Payments	Stripe API (for secure course purchases)



🧩 Core Features
🔐 Authentication

Email + Password login/signup

Google login integration

Toast notifications for login, signup, and logout

Secure redirect to /courses after login



🎓 Course Management

Dynamic course listing and enrollment

Success page with animated confirmation + confetti 🎉

Backend API call for enrolling and sending confirmation emails

Admin email notifications upon student enrollment



📅 Booking & Calendar

Book a free consultation call via EmailJS

Restricts date picker to Monday–Friday only

Auto-includes user’s name, email, and message in the email sent to admin



📬 Contact Page

Responsive, full-width Contact form

Integrated with EmailJS to send inquiries directly to admin

Email includes client’s message and sender’s email for easy reply



📚 Books Page

Dynamic book detail pages

Beautifully designed with book image, price, extended details, and purchase link

Smooth navigation and responsive layout



💳 Success Page
Celebratory UI with confetti, animations, and user email confirmation

Auto-enrolls the student via backend API

Sends both confirmation email and admin notification



🧠 Project Structure
content-guru/
│
├── src/
│   ├── components/
│   │   ├── auth/                # Login, Signup, Auth Context
│   │   ├── layout/              # Navbar, Footer, etc.
│   │   └── pages/               # Main feature pages
│   │       ├── Courses.js
│   │       ├── BookCall.js
│   │       ├── Contact.js
│   │       ├── Success.js
│   │       ├── BookDetails.js
│   │       └── Calendar.js
│   │
│   ├── App.js                   # Routing setup
│   ├── index.js                 # Entry point
│   ├── authcontext.js           # Firebase auth provider
│   ├── styles/                  # Tailwind + global styles
│   └── utils/                   # Helper functions / configs
│
├── public/
│   ├── images/                  # Assets used across site
│   └── favicon.ico
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md



⚙️ Environment Variables

Create a .env file in your project root with the following:

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_EMAILJS_SERVICE_ID=service_0memxwa
REACT_APP_EMAILJS_TEMPLATE_ID=template_i8zr4ta
REACT_APP_EMAILJS_PUBLIC_KEY=z-EXX9a-CCPKbQ8xG

REACT_APP_BACKEND_URL=https://content-guru-gpls.onrender.com


⚠️ Never commit your .env file to GitHub.



🧭 Routing Overview
Route	Description
/	Home Page
/courses	List of available courses
/book-call	Schedule a consultation call
/contact	Contact form for inquiries
/login / /signup	Auth pages
/success	Payment confirmation and enrollment
/books	Book listings
/books/:title	Individual book details
🎨 Design System

Primary Color: #8B4513 (Brown tone for warmth & trust)

Accent Colors: Yellow (#FACC15), Green (#16A34A), White backgrounds

Font: Inter / Poppins

UI Animations: Framer Motion transitions, hover scale effects

Shadows & Radius: Rounded-xl (smooth corners), soft shadows



🧑‍💻 For Developers
Installation
npm install

Run Locally
npm start

Build for Production
npm run build

Deploy

Frontend: Push to Vercel or Netlify

Backend: Deploy Express server to Render or Railway

Database: MongoDB Atlas (free tier works fine)



📤 Email Notifications
Admin Receives:

Booking form submissions (with sender name, email, and message)

Course enrollment confirmations (student info + course details)

Contact form messages

User Receives:

Booking confirmation email

Course enrollment confirmation after payment



🛡️ Security

Firebase authentication ensures secure login

API calls are verified on backend

Sensitive keys hidden in .env

Form validation for all inputs



🧾 Next Steps / Future Enhancements

Admin dashboard for course management

Payment history tracking

AI-powered content writing tools

Student progress tracking system

Blog section for SEO and content marketing



👨‍💼 For the Client
What You Get:

✅ A full-featured, production-ready web platform
✅ Admin-ready email notifications
✅ Mobile-friendly responsive UI
✅ Secure authentication and booking system
✅ Backend APIs integrated and hosted



📞 Support

If you need technical support or updates:

Email: yourcontentsocial@gmail.com

Developer: [Emmanuel Maina]

Version: v1.0.0

Last Updated: 2025