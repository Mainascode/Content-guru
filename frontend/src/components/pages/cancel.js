const CheckoutPage = () => (
  <div className="text-center py-20 px-4 bg-white min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-extrabold text-yellow-800 mb-4">
      Payment Incomplete
    </h1>
    <p className="text-lg text-gray-700 max-w-xl">
      It looks like your payment didn’t go through. No worries  you can safely retry your checkout below!
    </p>

    <a
      href="/checkout"
      className="mt-8 px-8 py-4 bg-yellow-700 text-white rounded-full font-semibold hover:bg-yellow-800 transition-all"
    >
      Retry Checkout
    </a>
  </div>
);

export default CheckoutPage;
