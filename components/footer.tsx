import React, { useState } from "react";
import { sendEmail } from "../lib/utils";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await sendEmail(
        email,
        "Visit Our Website",
        "The Green Team Newsletter",
        "Thank you for subscribing!",
        [
          "You've successfully subscribed to our newsletter. We'll keep you updated with our latest events, programs, and nature conservation tips.",
        ],
        "https://boilerplate-nextjs-delta.vercel.app/",
        "Newsletter Subscription Confirmation"
      );
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-poppins-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-3">
              The Green Life
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Connecting youth with nature since 2010
            </p>
          </div>

          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Subscribe to our Newsletter
            </h3>
            {isSuccess ? (
              <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
                Thank you for subscribing!
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
            {error && (
              <p className="mt-2 text-red-600 dark:text-red-400 text-sm">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
