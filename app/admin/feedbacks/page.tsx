"use client";
import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const fetchFeedbacks = async () => {
    const supabase = createClient();

    const { data: feedbacks, error } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching feedbacks:", error);
    }

    setFeedbacks(feedbacks || []);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleResolve = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("feedbacks")
      .update({ status: "resolved" })
      .eq("id", id);

    await fetchFeedbacks();
    alert("Feedback resolved");

    if (error) {
      console.error("Error resolving feedback:", error);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Feedbacks"
        description="Manage and respond to user feedback"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search feedbacks..."
              className="w-[200px] pl-8 md:w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4">
        {feedbacks && feedbacks.length > 0 ? (
          feedbacks.map((feedback: any) => (
            <div
              key={feedback.id}
              className="border rounded-lg p-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="font-semibold text-white">
                      {feedback.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{feedback.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted{" "}
                      {formatDistanceToNow(new Date(feedback.created_at))} ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleResolve(feedback.id)}
                    variant="outline"
                    size="sm"
                    className={
                      feedback.status === "resolved"
                        ? "text-green-600 border-green-600 hover:bg-green-50"
                        : "text-blue-600 border-blue-600 hover:bg-blue-50"
                    }
                  >
                    {feedback.status === "resolved"
                      ? "Resolved"
                      : "Mark as Resolved"}
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-3 border border-gray-100 dark:border-gray-700">
                <p className="italic text-gray-700 dark:text-gray-300">
                  "{feedback.content}"
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full font-medium">
                  {feedback.category}
                </span>
                {feedback.subcategory && (
                  <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {feedback.subcategory}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 border rounded-lg">
            <p className="text-muted-foreground">No feedbacks found</p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
