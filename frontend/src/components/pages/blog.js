// /src/pages/Blog.js
import React from "react";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Content Marketing",
      date: "July 2, 2025",
      author: "Maureen Muringi",
      content:
        "Learn how consistent content marketing can grow your business reach and trust with your audience. Here we break down practical tips you can apply today.",
    },
    {
      id: 2,
      title: "How to Manage Your Time as a VA",
      date: "July 5, 2025",
      author: "Maureen Muringi",
      content:
        "Time management is crucial for virtual assistants. Here’s how to prioritize, schedule, and get more done with less stress.",
    },
    {
      id: 3,
      title: "Instagram Growth Hacks for Small Brands",
      date: "July 8, 2025",
      author: "Maureen Muringi",
      content:
        "Social media is ever-changing. Use these simple Instagram hacks to grow your followers and boost engagement organically.",
    },
  ];

  return (
    <div className="bg-yellow-50 min-h-screen px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center text-yellow-800 mb-12">
        📝 Community Blog Timeline
      </h1>

      <div className="max-w-3xl mx-auto">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-md mb-8 transition-all hover:shadow-xl"
          >
            <h2 className="text-2xl font-bold text-yellow-900 mb-2">{post.title}</h2>
            <p className="text-sm text-yellow-700 mb-4">
              {post.date} • {post.author}
            </p>
            <p className="text-gray-700 leading-relaxed">{post.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
