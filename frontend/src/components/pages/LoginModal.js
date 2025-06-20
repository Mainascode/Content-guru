// LoginModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ closeModal }) => {
  const navigate = useNavigate();

  return (
    <div
      className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target.classList.contains('modal-overlay')) closeModal();
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Please Log In
        </h2>
        <p className="text-center text-gray-600 mb-6">
          You need to be logged in to purchase books.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              navigate('/login');
              closeModal(); // Close modal after redirect
            }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all"
          >
            Log In
          </button>
        </div>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
