import React from "react";

function ImpactSection() {
  return (
    <section
      id="impact"
      className="py-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 relative"
    >
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
              5000+
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
            <p className="text-lg text-gray-700 dark:text-gray-300">Programs</p>
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
  );
}

export default ImpactSection;
