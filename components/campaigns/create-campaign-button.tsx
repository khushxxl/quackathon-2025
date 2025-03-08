"use client";

import { useState } from "react";
import { useCampaigns, CampaignStatus } from "@/context/campaign-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";

export function CreateCampaignButton() {
  const { addCampaign } = useCampaigns();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "upcoming" as CampaignStatus,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    participants: 0,
    fundsRaised: 0,
    volunteerHours: 0,
    goals: {
      fundraisingGoal: 0,
      participantTarget: 0,
    },
    resources: [] as { name: string; url: string }[],
    team: [] as string[],
  });
  const [teamMember, setTeamMember] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddTeamMember = () => {
    if (teamMember.trim()) {
      setFormData({
        ...formData,
        team: [...formData.team, teamMember.trim()],
      });
      setTeamMember("");
    }
  };

  const handleAddResource = () => {
    if (resourceName.trim() && resourceUrl.trim()) {
      setFormData({
        ...formData,
        resources: [
          ...formData.resources,
          { name: resourceName.trim(), url: resourceUrl.trim() },
        ],
      });
      setResourceName("");
      setResourceUrl("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCampaign(formData);
    setOpen(false);
    // Reset form
    setFormData({
      name: "",
      description: "",
      status: "upcoming",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      participants: 0,
      fundsRaised: 0,
      volunteerHours: 0,
      goals: {
        fundraisingGoal: 0,
        participantTarget: 0,
      },
      resources: [],
      team: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value as CampaignStatus })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) =>
                      date && setFormData({ ...formData, startDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) =>
                      date && setFormData({ ...formData, endDate: date })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goals.fundraisingGoal">
                Fundraising Goal ($)
              </Label>
              <Input
                id="goals.fundraisingGoal"
                name="goals.fundraisingGoal"
                type="number"
                min="0"
                value={formData.goals.fundraisingGoal}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals.participantTarget">
                Participant Target
              </Label>
              <Input
                id="goals.participantTarget"
                name="goals.participantTarget"
                type="number"
                min="0"
                value={formData.goals.participantTarget}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="flex gap-2">
              <Input
                value={teamMember}
                onChange={(e) => setTeamMember(e.target.value)}
                placeholder="Enter team member name"
              />
              <Button
                type="button"
                onClick={handleAddTeamMember}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {formData.team.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.team.map((member, index) => (
                  <div
                    key={index}
                    className="bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    {member}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Resources</Label>
            <div className="flex gap-2">
              <Input
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="Resource name"
                className="flex-1"
              />
              <Input
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                placeholder="URL"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddResource}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {formData.resources.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                {formData.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-muted px-3 py-1 rounded text-sm"
                  >
                    <span>{resource.name}</span>
                    <span className="text-blue-500">{resource.url}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Create Campaign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
