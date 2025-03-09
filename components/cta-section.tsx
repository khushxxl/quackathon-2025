import Link from "next/link";
import React from "react";

function CTASection() {
  return (
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
            Help us connect more children with nature and make a positive impact
            on our environment.
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
  );
}

export default CTASection;
