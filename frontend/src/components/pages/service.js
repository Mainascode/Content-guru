import React from "react";

const Services = () => {
  return (
    <section className="bg-yellow-50 min-h-screen flex flex-col justify-center py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex-1 w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-yellow-900 mb-12">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Virtual Assistance */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-yellow-400">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              Virtual Assistance Services
            </h2>
            <p className="text-yellow-700 leading-relaxed">
              Maximize your productivity with dedicated virtual assistance. From scheduling and inbox management to data entry, we handle tasks that free up your valuable time.
            </p>
          </div>

          {/* Social Media Management */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-yellow-400">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              Social Media Management
            </h2>
            <p className="text-yellow-700 leading-relaxed">
              Grow your online influence with our social media management. We craft content, manage accounts, and boost engagement on Instagram, Facebook, LinkedIn, and more.
            </p>
          </div>

          {/* Content Visibility Boosting */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-yellow-400">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              Content Visibility Boosting
            </h2>
            <p className="text-yellow-700 leading-relaxed">
              Stand out online! Our strategies amplify your content’s reach on Instagram, getting you seen by the right audience to grow your brand and impact.
            </p>
          </div>

          {/* Paid Promo Slots */}
          <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-yellow-400 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              Paid Promotional Slots
            </h2>
            <p className="text-yellow-700 mb-4 leading-relaxed">
              Expand your reach with premium promotional slots on our popular Instagram accounts:
            </p>

            <ul className="list-disc ml-6 space-y-3 text-yellow-800">
              <li>
                <a
                  href="https://www.instagram.com/mysoul_vibe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 underline hover:text-yellow-900 font-medium"
                >
                  @mysoul_vibe
                </a>{" "}
                – Inspiring and uplifting vibes for a soulful audience.
              </li>
              <li>
                <a
                  href="https://www.instagram.com/recipes_asmr_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 underline hover:text-yellow-900 font-medium"
                >
                  @recipes_asmr_
                </a>{" "}
                – Delicious, sensory recipes that captivate food lovers.
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_codes101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-700 underline hover:text-yellow-900 font-medium"
                >
                  @_codes101
                </a>{" "}
                – For relationship advice, healing, and love insights.
              </li>
            </ul>

            <p className="text-yellow-700 mt-6 leading-relaxed">
              Get featured and reach an engaged, active community that’s ready to connect with your brand!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
