"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import {
  MessageSquare,
  Pin,
  Eye,
  LockIcon,
  Filter,
  RefreshCw,
  PlusCircle,
  ChevronRight,
  ChevronLeft,
  User,
} from "lucide-react";

// Type definitions
interface ForumReply {
  id: string;
  content: string;
  user_name: string;
  user_email: string;
  user_avatar_url: string | null;
  created_at: string;
}

interface ForumThread {
  id: string;
  title: string;
  content: string;
  user_name: string;
  user_email: string;
  user_avatar_url: string | null;
  category_name: string;
  category_color: string;
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  replies: ForumReply[];
}

export default function ForumPage() {
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [filteredThreads, setFilteredThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState<
    { name: string; color: string }[]
  >([]);
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(
    null
  );
  const [newThreadOpen, setNewThreadOpen] = useState(false);
  const [newReplyContent, setNewReplyContent] = useState("");

  // Form state for new thread
  const [newThread, setNewThread] = useState({
    title: "",
    content: "",
    category: "",
    user_name: "Guest User", // Default values - in production, get from auth
    user_email: "guest@example.com",
  });

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    // Apply filters whenever threads or filter settings change
    applyFilters();
  }, [threads, categoryFilter, sortBy]);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("forum").select("*");

      if (error) throw error;

      if (data) {
        // Parse the replies JSONB field for each thread
        const formattedThreads = data.map((thread) => ({
          ...thread,
          replies: Array.isArray(thread.replies) ? thread.replies : [],
        }));

        setThreads(formattedThreads);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(formattedThreads.map((thread) => thread.category_name))
        ).map((catName) => {
          const thread = formattedThreads.find(
            (t) => t.category_name === catName
          );
          return {
            name: catName,
            color: thread?.category_color || "#1E40AF",
          };
        });

        setCategories(uniqueCategories);
      }
    } catch (err: any) {
      console.error("Error fetching forum threads:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...threads];

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (thread) => thread.category_name === categoryFilter
      );
    }

    // Apply sorting
    if (sortBy === "newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "oldest") {
      filtered.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sortBy === "mostReplies") {
      filtered.sort((a, b) => b.replies.length - a.replies.length);
    } else if (sortBy === "mostViewed") {
      filtered.sort((a, b) => b.view_count - a.view_count);
    }

    // Always show pinned threads at the top
    const pinned = filtered.filter((thread) => thread.is_pinned);
    const unpinned = filtered.filter((thread) => !thread.is_pinned);
    filtered = [...pinned, ...unpinned];

    setFilteredThreads(filtered);
  };

  const refreshData = () => {
    fetchThreads();
  };

  const viewThread = async (thread: ForumThread) => {
    setSelectedThread(thread);

    // Update view count
    try {
      await supabase
        .from("forum")
        .update({ view_count: thread.view_count + 1 })
        .eq("id", thread.id);

      // Update local state
      setThreads(
        threads.map((t) =>
          t.id === thread.id ? { ...t, view_count: t.view_count + 1 } : t
        )
      );
    } catch (err) {
      console.error("Error updating view count:", err);
    }
  };

  const createThread = async () => {
    if (!newThread.title || !newThread.content || !newThread.category) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const categoryColor =
        categories.find((c) => c.name === newThread.category)?.color ||
        "#1E40AF";

      const { data, error } = await supabase
        .from("forum")
        .insert({
          title: newThread.title,
          content: newThread.content,
          user_name: newThread.user_name,
          user_email: newThread.user_email,
          category_name: newThread.category,
          category_color: categoryColor,
          replies: [],
        })
        .select();

      if (error) throw error;

      if (data) {
        // Reset form
        setNewThread({
          title: "",
          content: "",
          category: "",
          user_name: "Guest User",
          user_email: "guest@example.com",
        });

        // Close dialog and refresh data
        setNewThreadOpen(false);
        await fetchThreads();
      }
    } catch (err: any) {
      console.error("Error creating thread:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addReply = async () => {
    if (!selectedThread || !newReplyContent.trim()) return;

    try {
      const newReply = {
        id: crypto.randomUUID(),
        content: newReplyContent,
        user_name: "Guest User", // In production, get from auth
        user_email: "guest@example.com",
        user_avatar_url: null,
        created_at: new Date().toISOString(),
      };

      // Get current replies and add new one
      const updatedReplies = [...selectedThread.replies, newReply];

      const { error } = await supabase
        .from("forum")
        .update({ replies: updatedReplies })
        .eq("id", selectedThread.id);

      if (error) throw error;

      // Update local state
      setThreads(
        threads.map((thread) =>
          thread.id === selectedThread.id
            ? { ...thread, replies: updatedReplies }
            : thread
        )
      );

      // Update selected thread
      setSelectedThread({
        ...selectedThread,
        replies: updatedReplies,
      });

      // Reset form
      setNewReplyContent("");
    } catch (err: any) {
      console.error("Error adding reply:", err);
      setError(err.message);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Render functions
  const renderUserIcon = (name: string) => {
    return (
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
        <User className="h-4 w-4" />
      </div>
    );
  };

  const renderCategoryBadge = (name: string, color: string) => {
    return (
      <Badge
        style={{ backgroundColor: color, color: "#fff" }}
        className="px-2 py-1"
      >
        {name}
      </Badge>
    );
  };

  const renderThreadList = () => {
    if (filteredThreads.length === 0) {
      return (
        <Card className="mt-4">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              No threads found with current filters
            </p>
          </CardContent>
        </Card>
      );
    }

    return filteredThreads.map((thread) => (
      <Card key={thread.id} className="mt-4 hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <div className="flex-1 mr-4">
              <div className="flex items-center space-x-2 mb-1">
                {thread.is_pinned && <Pin className="h-4 w-4 text-amber-500" />}
                <h3
                  className="text-lg font-semibold cursor-pointer hover:text-green-600"
                  onClick={() => viewThread(thread)}
                >
                  {thread.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {renderCategoryBadge(
                  thread.category_name,
                  thread.category_color
                )}
                {thread.is_locked && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <LockIcon className="h-3 w-3" />
                    Locked
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {thread.content}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center text-muted-foreground text-xs gap-1">
                <Eye className="h-3 w-3" />
                {thread.view_count} views
              </div>
              <div className="flex items-center text-muted-foreground text-xs gap-1">
                <MessageSquare className="h-3 w-3" />
                {thread.replies.length} replies
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 pt-2 border-t">
            <div className="flex items-center gap-2">
              {renderUserIcon(thread.user_name)}
              <span className="text-sm font-medium">{thread.user_name}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(thread.created_at), {
                addSuffix: true,
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  const renderThreadDetail = () => {
    if (!selectedThread) return null;

    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => setSelectedThread(null)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to threads
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              {selectedThread.is_pinned && (
                <Pin className="h-4 w-4 text-amber-500" />
              )}
              <CardTitle>{selectedThread.title}</CardTitle>
            </div>
            <CardDescription className="flex flex-wrap gap-2 mt-1">
              {renderCategoryBadge(
                selectedThread.category_name,
                selectedThread.category_color
              )}
              {selectedThread.is_locked && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <LockIcon className="h-3 w-3" />
                  Locked
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(selectedThread.created_at), {
                  addSuffix: true,
                })}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="flex flex-col items-center space-y-2">
                {renderUserIcon(selectedThread.user_name)}
                <span className="text-xs font-medium">
                  {selectedThread.user_name}
                </span>
              </div>
              <div className="flex-1">
                <div className="prose dark:prose-invert max-w-none">
                  <p>{selectedThread.content}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <div className="flex justify-between w-full text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {selectedThread.view_count} views
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {selectedThread.replies.length} replies
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {selectedThread.replies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Replies</h3>
            <div className="space-y-4">
              {selectedThread.replies.map((reply, index) => (
                <Card
                  key={reply.id || index}
                  className="border-l-4 border-l-green-600"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center space-y-2">
                        {renderUserIcon(reply.user_name)}
                        <span className="text-xs font-medium">
                          {reply.user_name}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="prose dark:prose-invert max-w-none">
                          <p>{reply.content}</p>
                        </div>
                        <div className="mt-4 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(reply.created_at), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!selectedThread.is_locked && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Post a Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your reply here..."
                className="min-h-[120px]"
                value={newReplyContent}
                onChange={(e) => setNewReplyContent(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={addReply} disabled={!newReplyContent.trim()}>
                Post Reply
              </Button>
            </CardFooter>
          </Card>
        )}

        {selectedThread.is_locked && (
          <Card className="mt-6 bg-gray-50 dark:bg-gray-800/50">
            <CardContent className="pt-6 text-center">
              <LockIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-muted-foreground">
                This thread is locked. No new replies can be posted.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Community Forum"
        description="Join discussions and share your thoughts with the community"
      />

      {loading && !selectedThread ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <RefreshCw className="h-8 w-8 text-green-600 animate-spin mb-2" />
            <p>Loading forum threads...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <p className="text-red-500 mb-4">Error loading data: {error}</p>
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl w-full">
          {selectedThread ? (
            renderThreadDetail()
          ) : (
            <>
              {/* Actions Row */}
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Filter by:</span>
                  </div>

                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="mostReplies">Most Replies</SelectItem>
                      <SelectItem value="mostViewed">Most Viewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={refreshData}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>

                  <Dialog open={newThreadOpen} onOpenChange={setNewThreadOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Thread
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Thread</DialogTitle>
                        <DialogDescription>
                          Share your thoughts with the community.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Your Name
                          </label>
                          <Input
                            placeholder="Enter your name"
                            value={newThread.user_name}
                            onChange={(e) =>
                              setNewThread({
                                ...newThread,
                                user_name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Your Email
                          </label>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            value={newThread.user_email}
                            onChange={(e) =>
                              setNewThread({
                                ...newThread,
                                user_email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Title</label>
                          <Input
                            placeholder="Thread title"
                            value={newThread.title}
                            onChange={(e) =>
                              setNewThread({
                                ...newThread,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Category
                          </label>
                          <Select
                            value={newThread.category}
                            onValueChange={(value) =>
                              setNewThread({ ...newThread, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.name}
                                  value={category.name}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content</label>
                          <Textarea
                            placeholder="Write your post here..."
                            className="min-h-[120px]"
                            value={newThread.content}
                            onChange={(e) =>
                              setNewThread({
                                ...newThread,
                                content: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setNewThreadOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={createThread}
                          disabled={
                            !newThread.title ||
                            !newThread.content ||
                            !newThread.category ||
                            !newThread.user_name ||
                            !newThread.user_email
                          }
                        >
                          Create Thread
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Categories Tabs */}
              <Tabs
                defaultValue="all"
                value={categoryFilter}
                onValueChange={setCategoryFilter}
                className="mb-6"
              >
                <TabsList className="mb-4 flex-wrap h-auto py-2">
                  <TabsTrigger value="all">All Topics</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category.name} value={category.name}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Thread List */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">
                    {categoryFilter === "all"
                      ? "All Threads"
                      : `${categoryFilter} Threads`}
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredThreads.length}{" "}
                    {filteredThreads.length === 1 ? "thread" : "threads"}
                  </div>
                </div>

                {renderThreadList()}
              </div>
            </>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
