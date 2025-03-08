"use client";
import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Image as ImageIcon,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { Switch } from "@/components/ui/switch";
export default function SocialPage() {
  const [postContent, setPostContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [addToCommunity, setAddToCommunity] = useState(true);

  const checkAuth = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (data.user) {
      setUserData(data.user);
      return true;
    }
    if (!data.user) return false;
  };

  const router = useRouter();

  useEffect(() => {
    const auth = async () => {
      const auth = await checkAuth();
      if (!auth) {
        router.push("/auth/sign-in");
      }
    };
    auth();
  }, []);

  const fetchRecentPosts = async () => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("socials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      if (data) setRecentPosts(data);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePublishPost = async () => {
    if (!postContent || selectedPlatforms.length === 0) return;

    const supabase = createClient();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from("socials").insert([
        {
          content: postContent,
          platforms: selectedPlatforms,
          status: "published",
          published_at: new Date().toISOString(),
          user_id: userData?.id,
          add_to_community: addToCommunity,
        },
      ]);

      if (error) throw error;

      // Reset form and refresh posts
      setPostContent("");
      setSelectedPlatforms([]);
      setAddToCommunity(false);
      fetchRecentPosts();
    } catch (error) {
      console.error("Error publishing post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Social Media Management"
        description="Create, schedule, and analyze posts across multiple platforms"
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5K</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>0.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,893</div>
            <div className="flex items-center text-xs text-red-500 mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>3% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <Instagram className="h-5 w-5 mr-2 text-purple-600" />
              Instagram
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Based on engagement rate
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6 w-full mx-auto justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Compose and publish content to multiple social platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="post-content">Post Content</Label>
              <Textarea
                id="post-content"
                placeholder="What would you like to share today?"
                className="min-h-[120px]"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ImageIcon className="h-4 w-4" />
                Add Media
              </Button>
            </div>

            <div className="space-y-2 pt-4">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1",
                    selectedPlatforms.includes("Facebook")
                      ? "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700"
                      : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  )}
                  onClick={() => togglePlatform("Facebook")}
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1",
                    selectedPlatforms.includes("Twitter")
                      ? "bg-sky-100 dark:bg-sky-900/40 border-sky-300 dark:border-sky-700"
                      : "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800"
                  )}
                  onClick={() => togglePlatform("Twitter")}
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1",
                    selectedPlatforms.includes("Instagram")
                      ? "bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700"
                      : "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                  )}
                  onClick={() => togglePlatform("Instagram")}
                >
                  <Instagram className="h-4 w-4 text-purple-600" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-1",
                    selectedPlatforms.includes("LinkedIn")
                      ? "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700"
                      : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                  )}
                  onClick={() => togglePlatform("LinkedIn")}
                >
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Switch
                id="add-to-community"
                checked={addToCommunity}
                onCheckedChange={setAddToCommunity}
              />
              <Label htmlFor="add-to-community">Add to Community</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handlePublishPost}
              disabled={
                isSubmitting || !postContent || selectedPlatforms.length === 0
              }
            >
              {isSubmitting ? "Publishing..." : "Publish Now"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
