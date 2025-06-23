import { useParams, Link } from "react-router-dom";
import StarRating from "../StarRating";

const books = [
  { title: "The Art of Content Writing", price: "$19.99", img: "/images/book1.jpg", description: "Learn how to write compelling content." },
  { title: "SEO for Beginners", price: "$15.99", img: "/images/book2.jpg", description: "A beginner-friendly guide to SEO." },
  { title: "Social Media Marketing", price: "$22.99", img: "/images/book3.jpg", description: "Master social media strategies." },
];

const BookDetails = () => {
  const token = localStorage.getItem("token");
  const { title } = useParams();
  const book = books.find(b => b.title === decodeURIComponent(title));

  if (!book) return <p className="text-center text-red-600">Book not found</p>;
<StarRating
  onSubmit={(data) => {
    fetch("https://content-guru.onrender.com/api/submit-rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        service_type: "course",
        service_id: courses.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert("Thanks for your rating!"));
  }}
/>
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <img src={book.img} alt={book.title} className="w-full h-64 object-cover rounded-md" />
        <h2 className="mt-4 text-3xl font-bold">{book.title}</h2>
        <p className="text-lg text-gray-700 mt-2">{book.description}</p>
        <p className="text-xl font-semibold text-green-600 mt-2">{book.price}</p>

        <Link to="/books" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to Books
        </Link>
      </div>
    </div>
  );
};

export default BookDetails;
