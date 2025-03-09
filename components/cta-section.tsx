import Link from "next/link";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(10);
  const [forest, setForest] = useState("edinburgh");
  const [donations, setDonations] = useState<
    Array<{ name: string; amount: number; createdAt: Date }>
  >([]);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Open the donation modal
  const openModal = () => {
    console.log("Opening donation modal");
    setIsModalOpen(true);
  };

  // Close the donation modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Show toast notification
  const showToast = (message: string) => {
    setToast({ visible: true, message });

    // Auto hide toast after 5 seconds
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 5000);
  };

  // Handle the donation submission
  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create a new donation
      const newDonation = {
        name,
        amount,
        createdAt: new Date(),
      };

      // Add it to the donations array
      setDonations([...donations, newDonation]);

      // Save to localStorage for persistence
      const existingDonations = JSON.parse(
        localStorage.getItem("treeDonations") || "[]"
      );
      localStorage.setItem(
        "treeDonations",
        JSON.stringify([...existingDonations, newDonation])
      );

      // Save to Supabase
      const { data, error } = await supabase.from("trees").insert([
        {
          name,
          amount,
          forest_location: forest,
        },
      ]);

      if (error) {
        console.error("Error saving to Supabase:", error);
        showToast("There was a problem creating your tree. Please try again.");
      } else {
        console.log(
          `New donation saved to Supabase: ${name} donated $${amount}`
        );
        showToast(
          `Thank you, ${name}! Your donation was successful and your tree has been created.`
        );
      }
    } catch (error) {
      console.error("Error processing donation:", error);
      showToast(
        "There was a problem processing your donation. Please try again."
      );
    } finally {
      setIsLoading(false);
      // Reset form and close modal
      setName("");
      setAmount(10);
      setIsModalOpen(false);
    }
  };

  // Scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <button
              onClick={() => scrollToSection("campaigns")}
              className="px-8 py-4 bg-white text-green-600 rounded-xl hover:shadow-lg hover:shadow-green-700/20 transition duration-300 font-poppins-bold transform hover:-translate-y-1"
            >
              Become a Volunteer
            </button>

            <button
              onClick={openModal}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 transition duration-300 font-poppins-bold transform hover:-translate-y-1"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-gray-800">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Plant a Tree
            </h2>
            <form onSubmit={handleDonation}>
              <div className="mb-4">
                <label className="block mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Donation Amount ($)</label>
                <input
                  type="number"
                  min="10"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2">Forest Location</label>
                <select
                  value={forest}
                  onChange={(e) => setForest(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="edinburgh">Edinburgh</option>
                  <option value="glasgow">Glasgow</option>
                  <option value="birmingham">Birmingham</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Donate"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md animate-fade-in">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p>{toast.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CTASection;
