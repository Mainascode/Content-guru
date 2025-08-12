import React from 'react';

const Services = () => {
  return (
    <div className="bg-yellow-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-yellow-900 mb-12">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Virtual Assistance Services",
              desc: "Maximize your productivity with dedicated virtual assistance. From scheduling and inbox management to data entry, we handle tasks that free up your valuable time."
            },
            {
              title: "Social Media Management",
              desc: "Grow your online influence with our social media management. We craft content, manage accounts, and boost engagement on Instagram, Facebook, LinkedIn, and more."
            },
            {
              title: "Content Visibility Boosting",
              desc: "Stand out online! Our strategies amplify your content’s reach on Instagram, getting you seen by the right audience to grow your brand and impact."
            }
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 border-t-4 border-yellow-400"
            >
              <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
                {service.title}
              </h2>
              <p className="text-yellow-700">{service.desc}</p>
            </div>
          ))}

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-all transform hover:scale-105 border-t-4 border-yellow-400 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
              Paid Promotional Slots
            </h2>
            <p className="text-yellow-700 mb-4">
              Expand your reach with premium promotional slots on our popular Instagram accounts:
            </p>
            <ul className="space-y-3">
              {[
                {
                  name: "@mysoul_vibe",
                  link: "https://www.instagram.com/mysoul_vibe",
                  desc: "Inspiring and uplifting vibes for a soulful audience."
                },
                {
                  name: "@recipes_asmr_",
                  link: "https://www.instagram.com/recipes_asmr_",
                  desc: "Delicious, sensory recipes that captivate food lovers."
                },
                {
                  name: "@_codes101",
                  link: "https://www.instagram.com/_codes101",
                  desc: "For tech enthusiasts, coding learners, and digital creators."
                }
              ].map((account, index) => (
                <li key={index} className="text-yellow-800">
                  <a
                    href={account.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-700 underline hover:text-yellow-900"
                  >
                    {account.name}
                  </a>
                  : {account.desc}
                </li>
              ))}
            </ul>
            <p className="text-yellow-700 mt-4">
              Get featured and reach an engaged, active community that’s ready to connect with your brand!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
