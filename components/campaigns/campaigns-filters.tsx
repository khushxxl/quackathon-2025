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
  const [date, setDate] = useState<DateRange | undefined>({
    from: filters.dateRange.from,
    to: filters.dateRange.to,
  });

  const handleSearch = () => {
    setFilters({ search: searchText });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    setFilters({ dateRange: { from: range?.from, to: range?.to } });
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
            {date?.from ? (
              date.to ? (
                <span>
                  {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                </span>
              ) : (
                format(date.from, "MMM d")
              )
            ) : (
              <span>Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
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
