import React, { ChangeEvent } from "react";

function FeedbackSection({
  activeCampaigns,
  feedbackSuccess,
  feedbackError,
  feedbackSubmitting,
  feedbackForm,
  handleFeedbackChange,
  handleFeedbackSubmit,
  handleCheckboxChange,
}: {
  activeCampaigns: any[];
  feedbackSuccess: boolean;
  feedbackError: string;
  feedbackSubmitting: boolean;
  feedbackForm: {
    name: string;
    email: string;
    program: string;
    feedback: string;
    contact: boolean;
  };
  handleFeedbackChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFeedbackSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-800 relative">
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-green-100/40 dark:bg-green-900/10 rounded-full blur-3xl"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="px-4 py-1 bg-white dark:bg-gray-700 shadow-sm rounded-full text-green-600 dark:text-green-400 font-medium text-sm mb-4 border border-green-100 dark:border-green-800">
            Your Voice Matters
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-6">
            Share Your Feedback
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-full"></div>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mt-6">
            We value your thoughts and suggestions. Help us improve our programs
            and make a greater impact in our community.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-10">
          {feedbackSuccess ? (
            <div className="text-center py-8">
              <div className="text-green-600 dark:text-green-400 text-xl font-poppins-bold mb-2">
                Thank you for your feedback!
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Your input helps us improve our programs.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={feedbackForm.name}
                    onChange={handleFeedbackChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={feedbackForm.email}
                    onChange={handleFeedbackChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Program You're Providing Feedback On
                </label>
                <select
                  id="program"
                  name="program"
                  required
                  value={feedbackForm.program}
                  onChange={(e) =>
                    handleFeedbackChange(
                      e as unknown as ChangeEvent<HTMLInputElement>
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a campaign</option>
                  {activeCampaigns.map((campaign: any) => (
                    <option key={campaign.name} value={campaign.name}>
                      {campaign.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  required
                  rows={5}
                  value={feedbackForm.feedback}
                  onChange={(e) =>
                    handleFeedbackChange(
                      e as unknown as ChangeEvent<HTMLInputElement>
                    )
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Share your experience and suggestions..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="contact"
                  name="contact"
                  checked={feedbackForm.contact}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e as unknown as ChangeEvent<HTMLInputElement>
                    )
                  }
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="contact"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  I'm open to being contacted about my feedback
                </label>
              </div>

              {feedbackError && (
                <div className="text-red-500 text-sm">{feedbackError}</div>
              )}

              <button
                type="submit"
                disabled={feedbackSubmitting}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg transition duration-300 font-poppins-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {feedbackSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeedbackSection;
