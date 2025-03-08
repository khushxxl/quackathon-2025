"use client";

import { useState } from "react";
import { useCampaigns, CampaignStatus } from "@/context/campaign-context";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Filter,
  Search,
  Calendar as CalendarIcon,
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export function CampaignsFilters() {
  const { filters, setFilters, filteredCampaigns } = useCampaigns();
  const [searchText, setSearchText] = useState(filters.search);
  const [date, setDate] = useState<Date | undefined>(filters.dateRange.from);

  const handleSearch = () => {
    setFilters({ search: searchText });
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    setFilters({ dateRange: { from: date } });
  };

  const handleStatusChange = (value: string) => {
    setFilters({ status: value as CampaignStatus | "all" });
  };

  const handleExport = () => {
    // In a real implementation, this would generate a CSV/Excel file
    alert(`Exporting ${filteredCampaigns.length} campaigns to Excel`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search campaigns..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-[200px]"
        />
        <Button variant="outline" size="icon" onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Select
          defaultValue={filters.status}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            {date ? (
              <span>{format(date, "MMM d, yyyy")}</span>
            ) : (
              <span>Start Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" className="ml-auto" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
}
