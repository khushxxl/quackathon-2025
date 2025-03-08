import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Communities",
  description: "Manage your environmental communities",
};

export default function CommunitiesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Communities"
        description="Manage your environmental communities and groups"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search communities..."
              className="w-[200px] pl-8 md:w-[300px]"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Community Posts</TabsTrigger>
          <TabsTrigger value="feedback">User Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {/* Community Posts Tab */}
          <div className="grid gap-4">
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="border rounded-lg p-4 bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="font-semibold text-green-600">
                        U{post}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">User Name {post}</h3>
                      <p className="text-sm text-muted-foreground">
                        Posted {post} day{post !== 1 ? "s" : ""} ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Moderate
                  </Button>
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Community Post Title {post}
                </h4>
                <p className="mb-4">
                  This is a sample community post about environmental
                  initiatives and community engagement. The content discusses
                  sustainable practices and community involvement.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post * 12}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post * 5}</span>
                  </div>
                  <span>Community: Green Initiative {post}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          {/* User Feedback Tab */}
          <div className="grid gap-4">
            {[1, 2, 3].map((feedback) => (
              <div
                key={feedback}
                className="border rounded-lg p-4 bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="font-semibold text-blue-600">
                        F{feedback}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Feedback from User {feedback}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted {feedback * 2} day
                        {feedback * 2 !== 1 ? "s" : ""} ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded mb-2">
                  <p>
                    "
                    {feedback === 1
                      ? "I think we should organize more community clean-up events in our local parks."
                      : feedback === 2
                      ? "The recycling program needs better instructions for participants. Many people are confused about what can be recycled."
                      : "Could we start a community garden project? I have some experience and would love to help coordinate."}
                    "
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                    {feedback === 1
                      ? "Event Suggestion"
                      : feedback === 2
                      ? "Program Feedback"
                      : "Project Proposal"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Community:{" "}
                    {feedback === 1
                      ? "Park Volunteers"
                      : feedback === 2
                      ? "Recycling Initiative"
                      : "Urban Gardening"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
