import React from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";

function HomePage() {
  // Array of active campaigns where volunteers can apply
  const activeCampaigns = [
    {
      id: 1,
      title: "Summer Nature Camp",
      description:
        "Help children explore local parks and learn about ecosystems",
      location: "City Park",
      date: "June 15-30, 2023",
      spots: 12,
      img: "/images/nature-camp.jpg",
      requirements: [
        "Experience with children",
        "Nature knowledge",
        "First aid certification",
      ],
    },
    {
      id: 2,
      title: "Urban Garden Initiative",
      description:
        "Create and maintain community gardens in urban neighborhoods",
      location: "Downtown Community Center",
      date: "Ongoing",
      spots: 8,
      img: "/images/urban-garden.jpg",
      requirements: [
        "Gardening experience",
        "Commitment to weekly sessions",
        "Community outreach skills",
      ],
    },
    {
      id: 3,
      title: "Beach Cleanup Day",
      description:
        "Join our monthly effort to clean local beaches and protect marine life",
      location: "Coastal Beach",
      date: "First Saturday of each month",
      spots: 20,
      img: "/images/beach-cleanup.jpg",
      requirements: [
        "Ability to work outdoors",
        "Commitment to environmental protection",
        "Team player attitude",
      ],
    },
    {
      id: 4,
      title: "Environmental Education Workshop",
      description: "Teach children about sustainability and conservation",
      location: "Various Schools",
      date: "Weekdays during school hours",
      spots: 5,
      img: "/images/environmental-education.jpg",
      requirements: [
        "Teaching experience",
        "Environmental knowledge",
        "Background check required",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="top-0 sticky z-50 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="font-poppins-bold text-green-600 dark:text-green-400"
              >
                The Green Team
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
              >
                Home
              </Link>
              <Link
                href="/programs"
                className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
              >
                Programs
              </Link>
              <Link
                href="/volunteer"
                className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
              >
                Volunteer
              </Link>
              <Link
                href="/about"
                className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="font-poppins text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-24 px-4 md:px-8 max-h-[80vh] lg:px-16 relative overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1661851193078-9e6f0409c9f9?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/60 to-green-400/40 dark:from-green-800/70 dark:to-green-600/50 backdrop-blur-sm"></div>

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="inline-block px-5 py-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md shadow-lg rounded-full text-white font-medium text-sm mb-3 border border-white/20 dark:border-white/10 transform hover:scale-105 transition-all duration-300">
                Empowering the next generation
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins-extrabold text-white leading-tight">
                Connecting Youth with Nature
              </h1>
              <p className="text-xl text-white/90 dark:text-white/80 leading-relaxed max-w-2xl mx-auto">
                The Green Team is dedicated to supporting mental health and
                environmental conservation by connecting children and young
                people with the natural world through immersive experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 pt-6 justify-center">
                <Link
                  href="/volunteer"
                  className="px-8 py-4 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-poppins-bold text-center transform hover:-translate-y-1 border border-white/30"
                >
                  Volunteer with Us
                </Link>
                <Link
                  href="/programs"
                  className="px-8 py-4 bg-green-600/80 backdrop-blur-md border border-green-500/50 text-white rounded-xl hover:bg-green-600/90 transition-all duration-300 font-poppins-bold text-center transform hover:-translate-y-1"
                >
                  Explore Programs
                </Link>
              </div>
              <div className="text-sm text-white/70 dark:text-white/60 italic">
                by BlackRock
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 md:px-8 lg:px-16 relative">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-green-200/30 dark:bg-green-800/10 rounded-full blur-3xl"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-16">
              <span className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-green-600 dark:text-green-400 font-medium text-sm mb-4 border border-green-100 dark:border-green-800">
                Our Purpose
              </span>
              <h2 className="text-4xl md:text-5xl font-poppins-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-6">
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400 mb-4">
                  Connect with Nature
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Providing opportunities for children and young people to
                  experience and connect with the natural world.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400 mb-4">
                  Support Mental Health
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Fostering mental wellbeing through outdoor activities and
                  community engagement.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400 mb-4">
                  Environmental Conservation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Educating and inspiring the next generation of environmental
                  stewards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Active Campaigns Section */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-green-50 via-white to-green-100/50 dark:from-green-900/30 dark:via-gray-900 dark:to-green-800/20 relative">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-300/20 dark:bg-green-700/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200/30 dark:bg-green-800/10 rounded-full blur-3xl"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-16">
              <span className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-green-600 dark:text-green-400 font-medium text-sm mb-4 border border-green-100 dark:border-green-800">
                Join Us
              </span>
              <h2 className="text-4xl md:text-5xl font-poppins-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-6">
                Active Volunteer Campaigns
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {activeCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2"
                >
                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl">
                    <img
                      src={campaign.img}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400 mb-4">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {campaign.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800/50">
                      {campaign.location}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800/50">
                      {campaign.date}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800/50">
                      {campaign.spots} spots left
                    </span>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-poppins-bold text-green-600 dark:text-green-400 mb-3">
                      Requirements:
                    </h4>
                    <ul className="space-y-2">
                      {campaign.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/volunteer/apply/${campaign.id}`}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition duration-300 font-poppins-bold text-center transform group-hover:scale-105"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Impact Visualization Section */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 relative">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-green-100/40 dark:bg-green-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green-200/30 dark:bg-green-800/10 rounded-full blur-3xl"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-16">
              <span className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-green-600 dark:text-green-400 font-medium text-sm mb-4 border border-green-100 dark:border-green-800">
                Interactive Experience
              </span>
              <h2 className="text-4xl md:text-5xl font-poppins-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-6">
                View Our Impact in 3D
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-full"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl text-center mt-8">
                Explore our virtual forests and see the real impact of our
                conservation efforts through an immersive 3D experience.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="aspect-video relative rounded-xl overflow-hidden bg-green-50 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <iframe
                    src="/forest"
                    title="3D Forest Visualization"
                    className="w-full h-full object-cover"
                  ></iframe>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Link
                      href="/forest"
                      className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-500 transition duration-300 font-poppins-bold flex items-center gap-3 transform hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Explore 3D Forest
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="bg-green-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h3 className="text-xl font-poppins-bold text-green-700 dark:text-green-400 mb-3">
                    Interactive Visualization
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Navigate through our virtual forests and see the growth and
                    impact of our tree planting initiatives.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h3 className="text-xl font-poppins-bold text-green-700 dark:text-green-400 mb-3">
                    Real-time Data
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    View real-time statistics about carbon offset, biodiversity
                    increase, and forest growth in different regions.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-gray-700/50 p-6 rounded-xl">
                  <h3 className="text-xl font-poppins-bold text-green-700 dark:text-green-400 mb-3">
                    Educational Experience
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn about different tree species, wildlife habitats, and
                    the ecosystem benefits of our conservation work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 relative">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-green-100/40 dark:bg-green-900/10 rounded-full blur-3xl"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-16">
              <span className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-green-600 dark:text-green-400 font-medium text-sm mb-4 border border-green-100 dark:border-green-800">
                Making a Difference
              </span>
              <h2 className="text-4xl md:text-5xl font-poppins-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-6">
                Our Impact
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-4 gap-10 text-center">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 hover:-translate-y-2">
                <p className="text-5xl md:text-6xl font-poppins-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 mb-4">
                  5,000+
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Children Engaged
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 hover:-translate-y-2">
                <p className="text-5xl md:text-6xl font-poppins-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 mb-4">
                  200+
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Volunteers
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 hover:-translate-y-2">
                <p className="text-5xl md:text-6xl font-poppins-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 mb-4">
                  50+
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Programs
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition duration-300 hover:-translate-y-2">
                <p className="text-5xl md:text-6xl font-poppins-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 mb-4">
                  20+
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Community Partners
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 md:px-8 lg:px-16 relative">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-3xl blur-md opacity-30"></div>
            <div className="bg-gradient-to-br from-green-600 to-green-500 dark:from-green-600 dark:to-green-500 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <h2 className="text-4xl md:text-5xl font-poppins-bold mb-6 relative z-10">
                Join Our Community
              </h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto text-green-50 relative z-10">
                Help us connect more children with nature and make a positive
                impact on our environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link
                  href="/volunteer"
                  className="px-8 py-4 bg-white text-green-600 rounded-xl hover:shadow-lg hover:shadow-green-700/20 transition duration-300 font-poppins-bold transform hover:-translate-y-1"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/donate"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition duration-300 font-poppins-bold transform hover:-translate-y-1"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-3">
                The Green Team
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Connecting youth with nature since 2010
              </p>
            </div>
            <div className="flex gap-8">
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
              >
                About
              </Link>
              <Link
                href="/programs"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
              >
                Programs
              </Link>
              <Link
                href="/volunteer"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
              >
                Volunteer
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} The Green Team. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
