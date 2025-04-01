"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Users, Video, Filter, Search } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"

// Mock team members with availability
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "available",
    color: "#4CAF50",
    calendars: ["Google", "Outlook"],
    availability: [
      { date: "2025-03-17", slots: ["09:00-10:30", "13:00-15:00", "16:00-17:00"] },
      { date: "2025-03-18", slots: ["09:00-12:00", "15:00-17:00"] },
      { date: "2025-03-19", slots: ["10:00-11:30", "14:00-16:30"] },
      { date: "2025-03-20", slots: ["09:00-10:00", "11:00-12:00", "14:00-17:00"] },
      { date: "2025-03-21", slots: ["09:00-13:00", "15:30-17:00"] },
    ],
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Regulatory Specialist",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "busy",
    color: "#FF5722",
    calendars: ["Google"],
    availability: [
      { date: "2025-03-17", slots: ["11:00-12:00", "15:00-17:00"] },
      { date: "2025-03-18", slots: ["09:00-10:00", "13:30-15:30"] },
      { date: "2025-03-19", slots: ["09:00-11:00", "16:00-17:00"] },
      { date: "2025-03-20", slots: ["10:30-12:00", "14:00-15:00"] },
      { date: "2025-03-21", slots: ["09:00-10:30", "13:00-17:00"] },
    ],
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Medical Writer",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "away",
    color: "#2196F3",
    calendars: ["Apple"],
    availability: [
      { date: "2025-03-17", slots: ["09:00-11:00", "14:00-16:00"] },
      { date: "2025-03-18", slots: ["10:00-12:00", "15:00-17:00"] },
      { date: "2025-03-19", slots: ["09:00-10:00", "13:00-15:00"] },
      { date: "2025-03-20", slots: ["11:00-12:00", "14:30-17:00"] },
      { date: "2025-03-21", slots: ["09:00-12:00", "14:00-15:30"] },
    ],
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Market Access Analyst",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "available",
    color: "#9C27B0",
    calendars: ["Google", "Apple"],
    availability: [
      { date: "2025-03-17", slots: ["10:00-12:00", "13:00-14:30", "16:00-17:00"] },
      { date: "2025-03-18", slots: ["09:00-11:30", "14:00-17:00"] },
      { date: "2025-03-19", slots: ["09:00-12:00", "15:00-16:30"] },
      { date: "2025-03-20", slots: ["09:30-12:00", "13:00-15:00"] },
      { date: "2025-03-21", slots: ["10:00-12:00", "14:00-17:00"] },
    ],
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Clinical Specialist",
    avatar: "/placeholder.svg?height=32&width=32",
    status: "busy",
    color: "#FFC107",
    calendars: ["Outlook"],
    availability: [
      { date: "2025-03-17", slots: ["09:00-10:00", "11:30-13:00", "15:00-17:00"] },
      { date: "2025-03-18", slots: ["09:00-12:00", "16:00-17:00"] },
      { date: "2025-03-19", slots: ["10:00-12:00", "13:00-15:00", "16:00-17:00"] },
      { date: "2025-03-20", slots: ["09:00-11:00", "13:30-17:00"] },
      { date: "2025-03-21", slots: ["09:00-12:00", "13:00-14:00", "15:30-17:00"] },
    ],
  },
]

// Mock calendar events
const events = [
  {
    id: 1,
    title: "Product Development Meeting",
    description: "Weekly sync on Product A development progress",
    date: "2025-03-17",
    startTime: "10:00",
    endTime: "11:00",
    attendees: [1, 4, 5],
    location: "Conference Room A",
    isVirtual: true,
    meetingLink: "https://meet.example.com/product-dev",
    type: "internal",
    color: "#4CAF50",
  },
  {
    id: 2,
    title: "Regulatory Affairs Review",
    description: "Review of submission documentation",
    date: "2025-03-17",
    startTime: "14:00",
    endTime: "15:30",
    attendees: [2, 3],
    location: "Conference Room B",
    isVirtual: false,
    type: "internal",
    color: "#FF5722",
  },
  {
    id: 3,
    title: "Stakeholder Presentation",
    description: "Quarterly presentation to key stakeholders",
    date: "2025-03-18",
    startTime: "09:00",
    endTime: "11:00",
    attendees: [1, 2, 3, 4, 5],
    location: "Main Boardroom",
    isVirtual: true,
    meetingLink: "https://meet.example.com/stakeholder-q2",
    type: "external",
    color: "#2196F3",
  },
  {
    id: 4,
    title: "Medical Communication Team Sync",
    description: "Sync on marketing materials",
    date: "2025-03-19",
    startTime: "13:00",
    endTime: "14:00",
    attendees: [3, 4],
    location: "Conference Room C",
    isVirtual: true,
    meetingLink: "https://meet.example.com/medcomm-sync",
    type: "internal",
    color: "#9C27B0",
  },
  {
    id: 5,
    title: "Market Access Strategy",
    description: "Planning session for Q3 market access initiatives",
    date: "2025-03-20",
    startTime: "10:00",
    endTime: "12:00",
    attendees: [2, 4, 5],
    location: "Conference Room A",
    isVirtual: false,
    type: "internal",
    color: "#FFC107",
  },
]

export function EnhancedTeamCalendar() {
  const [date, setDate] = useState<Date>(new Date(2025, 2, 21)) // March 21, 2025
  const [view, setView] = useState<"day" | "week" | "month" | "team">("team")
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([1, 2, 3, 4, 5])
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    date: new Date(2025, 2, 21),
    startTime: "09:00",
    endTime: "10:00",
    attendees: [] as number[],
    isVirtual: true,
    location: "",
  })

  // Add a state for selected team member to view availability
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  // Get current week days
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Start from Monday
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Helper function to check if a team member is available at a specific time
  const isAvailable = (memberId: number, date: string, time: string) => {
    const member = teamMembers.find((m) => m.id === memberId)
    if (!member) return false

    const dayAvailability = member.availability.find((a) => a.date === date)
    if (!dayAvailability) return false

    // Check if the time falls within any of the available slots
    return dayAvailability.slots.some((slot) => {
      const [slotStart, slotEnd] = slot.split("-")
      return time >= slotStart && time < slotEnd
    })
  }

  // Helper function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    return events.filter((event) => event.date === formattedDate)
  }

  // Helper function to get events for a specific team member on a specific day
  const getMemberEventsForDay = (memberId: number, day: Date) => {
    const formattedDate = format(day, "yyyy-MM-dd")
    return events.filter((event) => event.date === formattedDate && event.attendees.includes(memberId))
  }

  // Helper function to format time range
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`
  }

  // Handle new meeting submission
  const handleCreateMeeting = () => {
    // In a real app, this would send the meeting data to an API
    console.log("Creating new meeting:", newMeeting)
    setNewMeetingOpen(false)
    // Reset form
    setNewMeeting({
      title: "",
      description: "",
      date: new Date(2025, 2, 21),
      startTime: "09:00",
      endTime: "10:00",
      attendees: [],
      isVirtual: true,
      location: "",
    })
  }

  // Toggle team member selection
  const toggleTeamMember = (id: number) => {
    setSelectedTeamMembers((prev) => (prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]))
  }

  // Add a function to handle team member selection for availability view
  const handleViewTeamMemberAvailability = (memberId: number) => {
    setSelectedMember(memberId)
    setNewMeetingOpen(false) // Close any open meeting dialog
  }

  // Set the current date to March 21, 2025 to match the screenshot
  useEffect(() => {
    setDate(new Date(2025, 2, 21))
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Team Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search events..." className="pl-8 w-[200px]" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Dialog open={newMeetingOpen} onOpenChange={setNewMeetingOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
                <DialogDescription>Create a new meeting and invite team members</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meeting Title</Label>
                  <Input
                    id="title"
                    value={newMeeting.title}
                    onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                    placeholder="Enter meeting title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newMeeting.description}
                    onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                    placeholder="Enter meeting description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(newMeeting.date, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newMeeting.date}
                          onSelect={(date) => date && setNewMeeting({ ...newMeeting, date })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="time"
                        value={newMeeting.startTime}
                        onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
                      />
                      <Input
                        type="time"
                        value={newMeeting.endTime}
                        onChange={(e) => setNewMeeting({ ...newMeeting, endTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Attendees</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`attendee-${member.id}`}
                          checked={newMeeting.attendees.includes(member.id)}
                          onChange={() => {
                            setNewMeeting({
                              ...newMeeting,
                              attendees: newMeeting.attendees.includes(member.id)
                                ? newMeeting.attendees.filter((id) => id !== member.id)
                                : [...newMeeting.attendees, member.id],
                            })
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`attendee-${member.id}`} className="text-sm font-normal">
                          {member.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Meeting Type</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="virtual-meeting"
                        checked={newMeeting.isVirtual}
                        onChange={(e) => setNewMeeting({ ...newMeeting, isVirtual: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="virtual-meeting" className="text-sm font-normal">
                        Virtual Meeting
                      </Label>
                    </div>
                  </div>
                  {newMeeting.isVirtual ? (
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Video conference link will be generated automatically</span>
                    </div>
                  ) : (
                    <Input
                      placeholder="Enter meeting location"
                      value={newMeeting.location}
                      onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                    />
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewMeetingOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateMeeting}>Schedule Meeting</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={view} className="space-y-4" onValueChange={(value) => setView(value as any)}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="team">Team View</TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setDate(new Date(2025, 2, 21))}>
                <span className="sr-only">Today</span>
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, -7))}>
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, 7))}>
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Team View */}
          <TabsContent value="team">
            <div className="mb-4">
              <h3 className="text-lg font-medium">
                {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {teamMembers.map((member) => (
                  <Button
                    key={member.id}
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => handleViewTeamMemberAvailability(member.id)}
                  >
                    {member.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-md border">
              {/* Header row with days */}
              <div className="grid grid-cols-[100px_repeat(5,1fr)] border-b">
                <div className="border-r p-2 font-medium text-center">Team Member</div>
                {weekDays.slice(0, 5).map((day, i) => (
                  <div key={i} className="border-r p-2 text-center last:border-r-0">
                    <div className="font-medium">{format(day, "EEE")}</div>
                    <div className="text-sm text-muted-foreground">{format(day, "MMM d")}</div>
                  </div>
                ))}
              </div>

              {/* Team member rows */}
              {teamMembers
                .filter((member) => selectedTeamMembers.includes(member.id))
                .map((member) => (
                  <div key={member.id} className="grid grid-cols-[100px_repeat(5,1fr)] border-b last:border-b-0">
                    <div
                      className="border-r p-2 flex flex-col justify-center items-center cursor-pointer hover:bg-muted/50"
                      onClick={() => handleViewTeamMemberAvailability(member.id)}
                    >
                      <Avatar className="h-8 w-8 mb-1">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-xs font-medium text-center">{member.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                        <div
                          className={`h-2 w-2 rounded-full mr-1 ${
                            member.status === "available"
                              ? "bg-green-500"
                              : member.status === "busy"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="capitalize">{member.status}</span>
                      </div>
                    </div>

                    {/* Days cells */}
                    {weekDays.slice(0, 5).map((day, i) => {
                      const formattedDate = format(day, "yyyy-MM-dd")
                      const memberEvents = getMemberEventsForDay(member.id, day)

                      return (
                        <div key={i} className="border-r p-2 last:border-r-0 min-h-[120px] relative">
                          {memberEvents.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                              {member.availability.find((a) => a.date === formattedDate)
                                ? "Available"
                                : "No availability"}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {memberEvents.map((event) => (
                                <div
                                  key={event.id}
                                  className="text-xs p-1 rounded-sm overflow-hidden text-white"
                                  style={{ backgroundColor: event.color }}
                                >
                                  <div className="font-medium truncate">{event.title}</div>
                                  <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {formatTimeRange(event.startTime, event.endTime)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Available</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Busy</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Away</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/dashboard/calendar-settings">Manage Calendar Settings</a>
              </Button>
            </div>
          </TabsContent>

          {selectedMember && (
            <Dialog open={selectedMember !== null} onOpenChange={() => setSelectedMember(null)}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{teamMembers.find((m) => m.id === selectedMember)?.name}'s Availability</DialogTitle>
                  <DialogDescription>View detailed availability and schedule meetings</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="rounded-md border">
                    <div className="p-4 border-b">
                      <h3 className="font-medium">Weekly Availability</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div className="p-4">
                      {weekDays.map((day, i) => {
                        const formattedDate = format(day, "yyyy-MM-dd")
                        const member = teamMembers.find((m) => m.id === selectedMember)
                        const dayAvailability = member?.availability.find((a) => a.date === formattedDate)

                        return (
                          <div key={i} className="mb-3 last:mb-0">
                            <div className="font-medium mb-1">{format(day, "EEEE, MMMM d")}</div>
                            {dayAvailability ? (
                              <div className="space-y-1">
                                {dayAvailability.slots.map((slot, j) => (
                                  <div key={j} className="flex justify-between items-center">
                                    <div className="text-sm">{slot}</div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        console.log("Booking slot:", slot)
                                        // Open the new meeting dialog with pre-populated time
                                        setNewMeeting({
                                          ...newMeeting,
                                          date: day,
                                          startTime: slot.split("-")[0],
                                          endTime: slot.split("-")[1],
                                          attendees: selectedMember ? [selectedMember] : [],
                                        })
                                        setNewMeetingOpen(true)
                                      }}
                                    >
                                      Book
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">No availability</div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          teamMembers.find((m) => m.id === selectedMember)?.status === "available"
                            ? "bg-green-500"
                            : teamMembers.find((m) => m.id === selectedMember)?.status === "busy"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      ></div>
                      <span className="text-sm capitalize">
                        {teamMembers.find((m) => m.id === selectedMember)?.status}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        setNewMeetingOpen(true)
                        // Pre-populate the attendees with the selected member
                        if (selectedMember) {
                          setNewMeeting({
                            ...newMeeting,
                            attendees: [selectedMember],
                          })
                        }
                      }}
                    >
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Day View */}
          <TabsContent value="day">
            <div className="mb-4">
              <h3 className="text-lg font-medium">{format(date, "EEEE, MMMM d, yyyy")}</h3>
            </div>

            <div className="rounded-md border">
              {/* Time slots */}
              {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => {
                const formattedDate = format(date, "yyyy-MM-dd")
                const hourEvents = events.filter(
                  (event) => event.date === formattedDate && Number.parseInt(event.startTime.split(":")[0]) === hour,
                )

                return (
                  <div key={hour} className="grid grid-cols-[80px_1fr] border-b last:border-b-0">
                    <div className="border-r p-2 text-sm text-muted-foreground text-center">{hour}:00</div>
                    <div className="p-1 min-h-[80px] relative">
                      {hourEvents.map((event) => {
                        const startMinutes = Number.parseInt(event.startTime.split(":")[1])
                        const startHour = Number.parseInt(event.startTime.split(":")[0])
                        const endMinutes = Number.parseInt(event.endTime.split(":")[1])
                        const endHour = Number.parseInt(event.endTime.split(":")[0])

                        const durationMinutes = (endHour - startHour) * 60 + (endMinutes - startMinutes)
                        const topPosition = (startMinutes / 60) * 100
                        const height = (durationMinutes / 60) * 100

                        return (
                          <div
                            key={event.id}
                            className="absolute inset-x-1 text-xs p-2 rounded-sm overflow-hidden text-white"
                            style={{
                              backgroundColor: event.color,
                              top: `${topPosition}%`,
                              height: `${height}%`,
                              minHeight: "20px",
                            }}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimeRange(event.startTime, event.endTime)}
                            </div>
                            <div className="mt-1 flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{event.attendees.length} attendees</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {/* Week View */}
          <TabsContent value="week">
            <div className="mb-4">
              <h3 className="text-lg font-medium">
                {format(weekStart, "MMMM d")} - {format(weekEnd, "MMMM d, yyyy")}
              </h3>
            </div>

            <div className="rounded-md border">
              {/* Header row with days */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b">
                <div className="border-r p-2"></div>
                {weekDays.map((day, i) => (
                  <div key={i} className="border-r p-2 text-center last:border-r-0">
                    <div className="font-medium">{format(day, "EEE")}</div>
                    <div className="text-sm text-muted-foreground">{format(day, "MMM d")}</div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {Array.from({ length: 9 }, (_, i) => i + 9).map((hour) => (
                <div key={hour} className="grid grid-cols-[80px_repeat(7,1fr)] border-b last:border-b-0">
                  <div className="border-r p-2 text-sm text-muted-foreground text-center">{hour}:00</div>
                  {weekDays.map((day, i) => {
                    const formattedDate = format(day, "yyyy-MM-dd")
                    const hourEvents = events.filter(
                      (event) =>
                        event.date === formattedDate && Number.parseInt(event.startTime.split(":")[0]) === hour,
                    )

                    return (
                      <div key={i} className="border-r p-1 last:border-r-0 min-h-[60px] relative">
                        {hourEvents.map((event) => {
                          const startMinutes = Number.parseInt(event.startTime.split(":")[1])
                          const startHour = Number.parseInt(event.startTime.split(":")[0])
                          const endMinutes = Number.parseInt(event.endTime.split(":")[1])
                          const endHour = Number.parseInt(event.endTime.split(":")[0])

                          const durationMinutes = (endHour - startHour) * 60 + (endMinutes - startMinutes)
                          const topPosition = (startMinutes / 60) * 100
                          const height = (durationMinutes / 60) * 100

                          return (
                            <div
                              key={event.id}
                              className="absolute inset-x-1 text-xs p-1 rounded-sm overflow-hidden text-white"
                              style={{
                                backgroundColor: event.color,
                                top: `${topPosition}%`,
                                height: `${height}%`,
                                minHeight: "20px",
                              }}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimeRange(event.startTime, event.endTime)}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Month View */}
          <TabsContent value="month">
            <div className="mb-4">
              <h3 className="text-lg font-medium">{format(date, "MMMM yyyy")}</h3>
            </div>

            <div className="bg-background rounded-md border">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-center py-3 text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = new Date(2025, 2, i - 22) // Start from Feb 23 (March 2025 calendar)
                  const isCurrentMonth = isSameMonth(day, new Date(2025, 2, 1))
                  const isToday = isSameDay(day, new Date(2025, 2, 21)) // March 21, 2025
                  const isSelected = isSameDay(day, new Date(2025, 2, 22)) // March 22, 2025 (selected)
                  const dayEvents = getEventsForDay(day)

                  return (
                    <div
                      key={i}
                      className={`min-h-[60px] py-2 border-b border-r ${i % 7 === 6 ? "border-r-0" : ""} ${
                        isCurrentMonth
                          ? isSelected
                            ? "relative"
                            : isToday
                              ? "font-bold"
                              : ""
                          : "text-muted-foreground opacity-50"
                      }`}
                    >
                      <div className="flex justify-center items-center">
                        <div
                          className={`flex items-center justify-center w-8 h-8 ${
                            isSelected ? "bg-red-500 text-white rounded-full" : ""
                          }`}
                        >
                          {format(day, "d")}
                        </div>
                      </div>
                      <div className="flex justify-center mt-1 space-x-0.5">
                        {dayEvents.length > 0 && <div className="h-1.5 w-8 rounded-full bg-blue-400"></div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {events.length === 0 && <div className="text-center py-12 text-muted-foreground">No Events</div>}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

