import Link from "next/link";
import React from "react";

function VisualiseSection() {
  return (
    <section
      id="visualization"
      className="py-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 relative"
    >
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
                Learn about different tree species, wildlife habitats, and the
                ecosystem benefits of our conservation work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualiseSection;
