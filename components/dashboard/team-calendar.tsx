"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Users, Video, LinkIcon } from "lucide-react"
import { format } from "date-fns"

// Mock calendar events
const events = [
  {
    id: 1,
    title: "Product Development Meeting",
    description: "Weekly sync on Product A development progress",
    date: new Date(2025, 5, 15, 10, 0),
    endTime: new Date(2025, 5, 15, 11, 0),
    attendees: [
      { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    location: "Conference Room A",
    isVirtual: true,
    meetingLink: "https://meet.example.com/product-dev",
    type: "internal",
  },
  {
    id: 2,
    title: "Regulatory Affairs Review",
    description: "Review of submission documentation",
    date: new Date(2025, 5, 15, 14, 0),
    endTime: new Date(2025, 5, 15, 15, 30),
    attendees: [
      { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    location: "Conference Room B",
    isVirtual: false,
    type: "internal",
  },
  {
    id: 3,
    title: "Stakeholder Presentation",
    description: "Quarterly presentation to key stakeholders",
    date: new Date(2025, 5, 16, 9, 0),
    endTime: new Date(2025, 5, 16, 11, 0),
    attendees: [
      { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    location: "Main Boardroom",
    isVirtual: true,
    meetingLink: "https://meet.example.com/stakeholder-q2",
    type: "external",
  },
  {
    id: 4,
    title: "Medical Communication Team Sync",
    description: "Sync on marketing materials",
    date: new Date(2025, 5, 17, 13, 0),
    endTime: new Date(2025, 5, 17, 14, 0),
    attendees: [
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    location: "Conference Room C",
    isVirtual: true,
    meetingLink: "https://meet.example.com/medcomm-sync",
    type: "internal",
  },
  {
    id: 5,
    title: "Market Access Strategy",
    description: "Planning session for Q3 market access initiatives",
    date: new Date(2025, 5, 18, 10, 0),
    endTime: new Date(2025, 5, 18, 12, 0),
    attendees: [
      { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    location: "Conference Room A",
    isVirtual: false,
    type: "internal",
  },
]

export function TeamCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")

  // Get today's events (or selected day's events)
  const selectedDateEvents = date
    ? events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      )
    : []

  const todayEvents = events.filter((event) => {
    const today = new Date()
    return (
      event.date.getDate() === today.getDate() &&
      event.date.getMonth() === today.getMonth() &&
      event.date.getFullYear() === today.getFullYear()
    )
  })

  const formatDateRange = (date: Date, endTime: Date) => {
    return `${format(date, "h:mm a")} - ${format(endTime, "h:mm a")}`
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Team Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Search events..." className="max-w-[180px]" />
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="day" onClick={() => setView("day")}>
                Day
              </TabsTrigger>
              <TabsTrigger value="week" onClick={() => setView("week")}>
                Week
              </TabsTrigger>
              <TabsTrigger value="month" onClick={() => setView("month")}>
                Month
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                <span className="sr-only">Today</span>
                <CalendarIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <h3 className="font-medium">{date ? format(date, "MMMM d, yyyy") : "Calendar"}</h3>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full border-0"
                  classNames={{
                    day_today: "bg-accent text-accent-foreground font-bold",
                    head_row: "grid grid-cols-7 w-full",
                    head_cell: "text-muted-foreground text-center text-sm font-medium h-10 w-full",
                    row: "grid grid-cols-7 w-full mt-0",
                    cell: "relative h-9 w-full p-0 text-center",
                    day: "h-9 w-9 p-0 mx-auto font-normal",
                    day_selected: "bg-primary text-primary-foreground rounded-full",
                    day_outside: "text-muted-foreground opacity-50",
                  }}
                  components={{
                    DayContent: (props) => {
                      const day = props.date
                      const hasEvents = events.some(
                        (event) =>
                          event.date.getDate() === day.getDate() &&
                          event.date.getMonth() === day.getMonth() &&
                          event.date.getFullYear() === day.getFullYear(),
                      )
                      return (
                        <div className="flex flex-col items-center">
                          <div className="flex h-9 w-9 items-center justify-center">{props.children}</div>
                          {hasEvents && <div className="h-1 w-4 rounded-full bg-blue-400 mt-0.5"></div>}
                        </div>
                      )
                    },
                  }}
                />
              </div>

              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <h3 className="font-medium">Availability</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {["Alex Johnson", "Sarah Williams", "Michael Chen", "Emma Davis", "James Wilson"].map((name) => (
                      <Button key={name} variant="outline" size="sm" className="h-8">
                        {name}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Click on a team member to view their availability or schedule a meeting with them.
                  </div>
                  <div className="mt-4 w-full rounded-md border p-3 text-sm">
                    <p className="text-center">Team availability chart will display here</p>
                    <p className="text-center text-xs text-muted-foreground mt-1">
                      Connect your Calendly account to enable scheduling
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <h3 className="font-medium">Today's Events</h3>
                </div>
                <div className="p-2">
                  {todayEvents.length === 0 ? (
                    <p className="px-2 py-4 text-center text-sm text-muted-foreground">No events scheduled for today</p>
                  ) : (
                    <div className="space-y-2">
                      {todayEvents.map((event) => (
                        <div key={event.id} className="rounded-md border p-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <Badge variant={event.type === "external" ? "destructive" : "outline"}>{event.type}</Badge>
                          </div>
                          <div className="mt-1 flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {formatDateRange(event.date, event.endTime)}
                          </div>
                          <div className="mt-1 flex items-center text-xs">
                            {event.isVirtual ? (
                              <div className="flex items-center">
                                <Video className="mr-1 h-3 w-3 text-blue-500" />
                                <a href={event.meetingLink} className="text-blue-500 hover:underline">
                                  Join Meeting
                                </a>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">{event.location}</span>
                            )}
                          </div>
                          <div className="mt-2 flex -space-x-2">
                            {event.attendees.map((attendee, index) => (
                              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {event.attendees.length > 3 && (
                              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                                +{event.attendees.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <h3 className="font-medium">Quick Schedule</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Schedule Team Meeting
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Share Availability Link
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Create Video Meeting
                    </Button>
                  </div>
                  <div className="mt-3 text-center text-xs text-muted-foreground">
                    Connect with{" "}
                    <a href="#" className="text-primary hover:underline">
                      Calendly
                    </a>{" "}
                    or{" "}
                    <a href="#" className="text-primary hover:underline">
                      Google Calendar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

