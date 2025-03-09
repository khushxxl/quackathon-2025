"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import ApplyModal from "@/components/apply-modal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Campaigns from "@/components/Campaigns";
import VisualiseSection from "@/components/visualise-section";
import FeedbackSection from "@/components/feedback-section";
import ImpactSection from "@/components/impact-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import Image from "next/image";
import { sendEmail } from "@/lib/utils";

function HomePage() {
  const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    program: "",
    feedback: "",
    contact: false,
  });
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    async function fetchCampaigns() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("status", "active")
        .order("start_date", { ascending: true });

      if (error) {
        console.error("Error fetching campaigns:", error);
      } else {
        setActiveCampaigns(data || []);
      }

      setLoading(false);
    }

    fetchCampaigns();
  }, []);

  const handleApplyClick = (campaignId: string, campaignName: string) => {
    setSelectedCampaign({ id: campaignId, name: campaignName });
  };

  const handleFeedbackChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackForm((prev) => ({
      ...prev,
      contact: e.target.checked,
    }));
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitting(true);
    setFeedbackError("");

    try {
      const supabase = createClient();

      const { error } = await supabase.from("feedbacks").insert({
        title: `Feedback on ${feedbackForm.program}`,
        content: feedbackForm.feedback,
        category: feedbackForm.program,
        subcategory: feedbackForm.contact
          ? "Contact requested"
          : "No contact needed",
        status: "pending",
      });

      if (error) throw error;

      setFeedbackSuccess(true);
      await sendEmail(
        feedbackForm.email,
        "",
        "Thank you for your feedback",
        `We've received your feedback about ${feedbackForm.program}`,
        [
          "We appreciate you taking the time to share your thoughts with us.",
          "Your feedback helps us improve our programs and services.",
          feedbackForm.contact
            ? "We'll be in touch with you soon."
            : "Thank you for your contribution.",
        ],
        "",
        "Feedback Confirmation"
      );
      setFeedbackForm({
        name: "",
        email: "",
        program: "",
        feedback: "",
        contact: false,
      });

      setTimeout(() => {
        setFeedbackSuccess(false);
      }, 3000);
    } catch (err: any) {
      setFeedbackError(
        err.message || "Failed to submit feedback. Please try again."
      );
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header scrollToSection={scrollToSection} />
      <main>
        <Hero scrollToSection={scrollToSection} />

        <div className="flex justify-center items-center flex-col gap-2 mt-10">
          <p>Powered by</p>
          <Image
            src="https://www.blackrock.com/uk-retail-c-assets/cache-1542298123000/images/media-bin/web/global/wordmark/blackrock-logo-sitemap.svg"
            alt="BlackRock"
            width={300}
            height={100}
          />
        </div>
        <Mission />
        <Campaigns
          loading={loading}
          activeCampaigns={activeCampaigns}
          handleApplyClick={handleApplyClick}
        />

        <VisualiseSection />
        <ImpactSection />

        <FeedbackSection
          activeCampaigns={activeCampaigns}
          feedbackSuccess={feedbackSuccess}
          feedbackError={feedbackError}
          feedbackSubmitting={feedbackSubmitting}
          feedbackForm={feedbackForm}
          handleFeedbackChange={handleFeedbackChange}
          handleFeedbackSubmit={handleFeedbackSubmit}
          handleCheckboxChange={handleCheckboxChange}
        />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      <Chatbot />

      {selectedCampaign && (
        <ApplyModal
          campaignId={selectedCampaign.id}
          campaignName={selectedCampaign.name}
          isOpen={true}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
}

export default HomePage;
