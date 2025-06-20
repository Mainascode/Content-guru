import { motion } from "framer-motion";

const Blog = () => {
  const blogPosts = [
    { title: "The Power of SEO in Content", date: "March 28, 2024", description: "Learn how SEO can amplify your content reach.", img: "/images/blog1.jpg" },
    { title: "Content Writing Hacks", date: "March 20, 2024", description: "Quick tips to write engaging and persuasive content.", img: "/images/blog2.jpg" },
    { title: "Boosting Engagement with Storytelling", date: "March 10, 2024", description: "Discover the art of storytelling in digital marketing.", img: "/images/blog3.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Blog
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <img src={post.img} alt={post.title} className="w-full h-40 object-cover rounded-md" />
            <h2 className="mt-4 text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="text-gray-600">{post.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Read More</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
