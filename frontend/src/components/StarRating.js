// components/StarRating.js
import { useState } from "react";

export default function StarRating({ onSubmit }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (stars < 1) return alert("Please select a rating");
    onSubmit({ rating: stars, comment });
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            onClick={() => setStars(s)}
            className={`cursor-pointer text-2xl ${stars >= s ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        rows={3}
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Rating
      </button>
    </div>
  );
}
