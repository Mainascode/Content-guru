import React from 'react';

const Services = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Virtual Assistance Service */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Virtual Assistance Services</h2>
            <p className="text-gray-700">
              Maximize your productivity and stay organized with our dedicated virtual assistant services. We’ll take care of tasks like scheduling, email management, data entry, and more to keep your day running smoothly.
            </p>
          </div>

          {/* Social Media Management */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Social Media Management</h2>
            <p className="text-gray-700">
              Boost your online presence with expert social media management. We’ll create engaging content, manage your accounts, and strategize to increase your followers and engagement on platforms like Instagram, Facebook, and Twitter.
            </p>
          </div>

          {/* Content Visibility Boosting */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Content Visibility Boosting</h2>
            <p className="text-gray-700">
              Want to get your content noticed? We can help boost your visibility on Instagram through targeted strategies, making your posts reach a wider audience and attract more attention to your brand or personal page.
            </p>
          </div>

          {/* Paid Promotional Slots */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Paid Promotional Slots</h2>
            <p className="text-gray-700 mb-4">
              Increase your reach with paid promotional slots on our curated Instagram accounts:
            </p>
            <ul className="list-none space-y-2 pl-0">
              <li className="text-lg text-gray-700">
                <strong className="text-red-500">@mysoul_vibe</strong>: A space dedicated to inspiring and uplifting content.
              </li>
              <li className="text-lg text-gray-700">
                <strong className="text-red-500">@recipes_asmr_</strong>: Perfect for sharing delicious recipes with a sensory twist.
              </li>
              <li className="text-lg text-gray-700">
                <strong className="text-red-500">@_codes101</strong>: A go-to for tech tips, coding tutorials, and geek culture.
              </li>
            </ul>
            <p className="text-gray-700">Get featured and tap into our active, engaged audience!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

