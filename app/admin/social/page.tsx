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

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Image as ImageIcon,
  Calendar,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SocialPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Social Media Management"
        description="Create, schedule, and analyze posts across multiple platforms"
      />

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
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </div>

            <div className="space-y-2 pt-4">
              <Label>Platforms</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800"
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                >
                  <Instagram className="h-4 w-4 text-purple-600" />
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                >
                  <Linkedin className="h-4 w-4 text-blue-700" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="campaign">Campaign</Label>
              <Select>
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="earth-day">Earth Day 2023</SelectItem>
                  <SelectItem value="tree-planting">
                    Tree Planting Initiative
                  </SelectItem>
                  <SelectItem value="beach-cleanup">Beach Cleanup</SelectItem>
                  <SelectItem value="none">No Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save Draft</Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Publish Now
            </Button>
          </CardFooter>
        </Card>

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
              <CardTitle className="text-sm font-medium">
                Top Platform
              </CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Performance metrics for your recent social media posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Post 1 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    {/* <Avatar className="h-10 w-10 border-2 border-green-200">
                      <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                        GT
                      </AvatarFallback>
                    </Avatar> */}
                    <div>
                      <div className="font-medium">The Green Team</div>
                      <div className="text-sm text-muted-foreground">
                        Posted 2 days ago
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <Facebook className="h-3 w-3 mr-1" />
                    Facebook
                  </Badge>
                </div>
                <p className="text-sm mb-4">
                  Join us this weekend for our community tree planting event!
                  We'll be at Central Park from 9am-12pm. Bring your friends and
                  family! #GreenTeam #TreePlanting
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-muted-foreground">Reach</span>
                    <span className="font-semibold">5,234</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="font-semibold">432</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-muted-foreground">Clicks</span>
                    <span className="font-semibold">89</span>
                  </div>
                </div>
              </div>

              {/* Post 2 */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    {/* <Avatar className="h-10 w-10 border-2 border-green-200">
                      <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                        GT
                      </AvatarFallback>
                    </Avatar> */}
                    <div>
                      <div className="font-medium">The Green Team</div>
                      <div className="text-sm text-muted-foreground">
                        Posted 5 days ago
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    <Instagram className="h-3 w-3 mr-1" />
                    Instagram
                  </Badge>
                </div>
                <p className="text-sm mb-4">
                  We're thrilled to announce that we've planted over 10,000
                  trees this year! Thank you to all our volunteers and
                  supporters who made this possible. 🌳 #MilestoneAchieved
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-muted-foreground">Reach</span>
                    <span className="font-semibold">8,721</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="font-semibold">1,245</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-muted-foreground">Clicks</span>
                    <span className="font-semibold">327</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Posts
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
