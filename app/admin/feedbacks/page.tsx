"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Filter, Search, ArrowUpDown, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/supabase/client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState("newest");
  const [categories, setCategories] = useState<string[]>([]);

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
    setFilteredFeedbacks(feedbacks || []);
    
    // Extract unique categories for the filter
    if (feedbacks) {
      const uniqueCategories = Array.from(
        new Set(feedbacks.map((feedback) => feedback.category))
      );
      setCategories(uniqueCategories as string[]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchText, statusFilter, categoryFilter, dateFilter, sortBy, feedbacks]);

  const applyFilters = () => {
    let result = [...feedbacks];

    // Apply search filter
    if (searchText) {
      result = result.filter(
        (feedback) =>
          feedback.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          feedback.content?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((feedback) => feedback.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((feedback) => feedback.category === categoryFilter);
    }

    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      result = result.filter((feedback) => {
        const feedbackDate = new Date(feedback.created_at);
        return (
          feedbackDate.getDate() === filterDate.getDate() &&
          feedbackDate.getMonth() === filterDate.getMonth() &&
          feedbackDate.getFullYear() === filterDate.getFullYear()
        );
      });
    }

    // Apply sorting
    result = sortFeedbacks(result, sortBy);

    setFilteredFeedbacks(result);
  };

  const sortFeedbacks = (feedbacks: any[], sortType: string) => {
    switch (sortType) {
      case "newest":
        return [...feedbacks].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return [...feedbacks].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "a-z":
        return [...feedbacks].sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return [...feedbacks].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return feedbacks;
    }
  };

  const handleResolve = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("feedbacks")
      .update({ status: "resolved" })
      .eq("id", id);

    await fetchFeedbacks();

    if (error) {
      console.error("Error resolving feedback:", error);
    } else {
      alert("Feedback resolved");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setDateFilter(undefined);
    setSortBy("newest");
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
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("newest")}>
                Newest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                Oldest first
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("a-z")}>
                A-Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("z-a")}>
                Z-A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DashboardHeader>

      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                Pending
              </div>
            </SelectItem>
            <SelectItem value="resolved">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Resolved
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button variant="ghost" onClick={clearFilters} size="sm">
          <XCircle className="mr-2 h-4 w-4" />
          Clear filters
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback: any) => (
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
