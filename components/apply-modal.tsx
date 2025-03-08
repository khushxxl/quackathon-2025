"use client";
import { useState } from "react";
import { createClient } from "@/supabase/client";

interface ApplyModalProps {
  campaignId: string;
  campaignName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({
  campaignId,
  campaignName,
  isOpen,
  onClose,
}: ApplyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    resumeLink: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { data: participantsData, error: participantsError } =
        await supabase
          .from("campaigns")
          .select("participants_data")
          .eq("id", campaignId);

      const { error } = await supabase
        .from("campaigns")
        .update({
          participants_data: [
            ...(participantsData?.[0]?.participants_data || []),
            {
              name: formData.name,
              email: formData.email,
              age: formData.age,
              resume_link: formData.resumeLink,
              reason: formData.reason,
              approval_status: "pending",
              applied_at: new Date().toISOString(),
            },
          ],
          participants: participantsData?.[0]?.participants_data.length + 1,
        })
        .eq("id", campaignId);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          age: "",
          resumeLink: "",
          reason: "",
        });
      }, 2000);
    } catch (err: any) {
      setError(
        err.message || "An error occurred while submitting your application"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 relative min-h-[50vh] min-w-[50vw]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400 mb-6">
          Apply for {campaignName}
        </h2>

        {success ? (
          <div className="text-green-600 dark:text-green-400 text-center py-8">
            Application submitted successfully! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
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
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                required
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, age: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="resumeLink"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Resume Link
              </label>
              <input
                type="url"
                id="resumeLink"
                required
                placeholder="https://drive.google.com/..."
                value={formData.resumeLink}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    resumeLink: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Why do you want to join this campaign?
              </label>
              <textarea
                id="reason"
                required
                rows={4}
                value={formData.reason}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, reason: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 font-poppins-bold"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
