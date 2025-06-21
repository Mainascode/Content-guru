
const CheckoutPage = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold text-green-600">✔️ Payment Process</h1>
    <p className="text-lg mt-4">It seems like the payment was not completed, but don't worry, you can proceed to checkout below!</p>
    
    {/* Optionally, add payment retry functionality */}
    <a 
      href="/checkout" 
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
    >
      Proceed to Checkout
    </a>
  </div>
);

export default CheckoutPage;
