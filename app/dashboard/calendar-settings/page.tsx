"use client"

import { AvatarFallback } from "@/components/ui/avatar"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Plus, Check, RefreshCw, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Mock data for connected calendars
const connectedCalendars = [
  {
    id: "google-1",
    name: "Work Calendar",
    type: "google",
    email: "jane.doe@example.com",
    color: "#4285F4",
    isVisible: true,
    lastSynced: "10 minutes ago",
  },
  {
    id: "outlook-1",
    name: "Personal Calendar",
    type: "outlook",
    email: "jane.personal@outlook.com",
    color: "#0078D4",
    isVisible: true,
    lastSynced: "1 hour ago",
  },
  {
    id: "apple-1",
    name: "iPhone Calendar",
    type: "apple",
    email: "jane.doe@icloud.com",
    color: "#FF2D55",
    isVisible: false,
    lastSynced: "3 hours ago",
  },
]

// Mock data for working hours
const defaultWorkingHours = {
  monday: { enabled: true, start: "09:00", end: "17:00" },
  tuesday: { enabled: true, start: "09:00", end: "17:00" },
  wednesday: { enabled: true, start: "09:00", end: "17:00" },
  thursday: { enabled: true, start: "09:00", end: "17:00" },
  friday: { enabled: true, start: "09:00", end: "17:00" },
  saturday: { enabled: false, start: "09:00", end: "17:00" },
  sunday: { enabled: false, start: "09:00", end: "17:00" },
}

export default function CalendarSettingsPage() {
  const { toast } = useToast()
  const [workingHours, setWorkingHours] = useState(defaultWorkingHours)
  const [calendars, setCalendars] = useState(connectedCalendars)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [availabilitySettings, setAvailabilitySettings] = useState({
    showBusyTimes: true,
    showMeetingDetails: false,
    allowBooking: true,
    bufferTime: "15",
    minimumNotice: "60",
  })
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleCalendarVisibilityChange = (id: string, isVisible: boolean) => {
    setCalendars((prev) => prev.map((cal) => (cal.id === id ? { ...cal, isVisible } : cal)))
  }

  const handleRemoveCalendar = (id: string) => {
    setCalendars((prev) => prev.filter((cal) => cal.id !== id))
  }

  const handleSyncCalendars = () => {
    setSyncStatus("syncing")
    // Simulate syncing process
    setTimeout(() => {
      setSyncStatus("success")
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus("idle"), 3000)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Calendar Settings</h2>
          <p className="text-muted-foreground">Manage your calendar connections and availability settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSyncCalendars} disabled={syncStatus === "syncing"}>
            {syncStatus === "syncing" ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Calendars
              </>
            )}
          </Button>
        </div>
      </div>

      {syncStatus === "success" && (
        <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900/30">
          <Check className="h-4 w-4" />
          <AlertDescription>All calendars successfully synchronized.</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="connections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connections">Calendar Connections</TabsTrigger>
          <TabsTrigger value="availability">Availability Settings</TabsTrigger>
          <TabsTrigger value="working-hours">Working Hours</TabsTrigger>
          <TabsTrigger value="sharing">Sharing & Permissions</TabsTrigger>
        </TabsList>

        {/* Calendar Connections Tab */}
        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Calendars</CardTitle>
              <CardDescription>Connect your external calendars to sync events and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendars.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No calendars connected</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    Connect your external calendars to sync events and manage your availability
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {calendars.map((calendar) => (
                    <div key={calendar.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white"
                          style={{ backgroundColor: calendar.color }}
                        >
                          {calendar.type === "google" && "G"}
                          {calendar.type === "outlook" && "O"}
                          {calendar.type === "apple" && "A"}
                        </div>
                        <div>
                          <p className="font-medium">{calendar.name}</p>
                          <p className="text-sm text-muted-foreground">{calendar.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`visibility-${calendar.id}`}
                            checked={calendar.isVisible}
                            onCheckedChange={(checked) => handleCalendarVisibilityChange(calendar.id, checked)}
                          />
                          <Label htmlFor={`visibility-${calendar.id}`} className="text-sm">
                            {calendar.isVisible ? "Visible" : "Hidden"}
                          </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">Synced {calendar.lastSynced}</p>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveCalendar(calendar.id)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="space-y-4 w-full">
                <Separator />
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Add a new calendar</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.8L9.2 1L17.4 5.8L9.2 10.6L1 5.8Z" fill="#0364B8" />
                        <path d="M17.4 5.8L9.2 10.6V20.2L17.4 15.4V5.8Z" fill="#0078D4" />
                        <path d="M17.4 5.8L23 8.6V18.2L17.4 15.4V5.8Z" fill="#28A8EA" />
                        <path d="M17.4 15.4L23 18.2L17.4 21L11.8 18.2L17.4 15.4Z" fill="#14447D" />
                        <path d="M9.2 10.6L1 5.8V15.4L9.2 20.2V10.6Z" fill="#0078D4" />
                      </svg>
                      Outlook
                    </Button>
                    <Button variant="outline" size="sm">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.68 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.09 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
                          fill="black"
                        />
                      </svg>
                      Apple Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Other
                    </Button>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar Integration Settings</CardTitle>
              <CardDescription>Configure how your calendars sync and display</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-sync frequency</Label>
                  <p className="text-sm text-muted-foreground">How often to automatically sync your calendars</p>
                </div>
                <Select defaultValue="15">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Default calendar for new events</Label>
                  <p className="text-sm text-muted-foreground">Calendar used when creating new events</p>
                </div>
                <Select defaultValue="google-1">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    {calendars.map((cal) => (
                      <SelectItem key={cal.id} value={cal.id}>
                        {cal.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-way sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Changes made in either calendar will be reflected in both
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sync past events</Label>
                    <p className="text-sm text-muted-foreground">Include past events when syncing calendars</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sync notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when calendars are synced</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Settings Tab */}
        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Availability Preferences</CardTitle>
              <CardDescription>Configure how your availability is displayed to team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show busy times</Label>
                    <p className="text-sm text-muted-foreground">
                      Display busy times from your calendar to team members
                    </p>
                  </div>
                  <Switch
                    checked={availabilitySettings.showBusyTimes}
                    onCheckedChange={(checked) =>
                      setAvailabilitySettings((prev) => ({ ...prev, showBusyTimes: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show meeting details</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow team members to see meeting titles and descriptions
                    </p>
                  </div>
                  <Switch
                    checked={availabilitySettings.showMeetingDetails}
                    onCheckedChange={(checked) =>
                      setAvailabilitySettings((prev) => ({ ...prev, showMeetingDetails: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow direct booking</Label>
                    <p className="text-sm text-muted-foreground">
                      Team members can book time directly in your available slots
                    </p>
                  </div>
                  <Switch
                    checked={availabilitySettings.allowBooking}
                    onCheckedChange={(checked) =>
                      setAvailabilitySettings((prev) => ({ ...prev, allowBooking: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Buffer time between meetings</Label>
                    <p className="text-sm text-muted-foreground">Add padding between consecutive meetings</p>
                  </div>
                  <Select
                    value={availabilitySettings.bufferTime}
                    onValueChange={(value) => setAvailabilitySettings((prev) => ({ ...prev, bufferTime: value }))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select buffer time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Minimum scheduling notice</Label>
                    <p className="text-sm text-muted-foreground">Minimum advance notice required for new meetings</p>
                  </div>
                  <Select
                    value={availabilitySettings.minimumNotice}
                    onValueChange={(value) => setAvailabilitySettings((prev) => ({ ...prev, minimumNotice: value }))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select minimum notice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No minimum</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="1440">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  // In a real app, this would save the preferences to an API
                  console.log("Saving preferences:", availabilitySettings)
                  // Show a success message
                  toast({
                    title: "Preferences saved",
                    description: "Your availability preferences have been updated.",
                  })
                }}
              >
                Save preferences
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability Link</CardTitle>
              <CardDescription>Share your availability with people outside your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input value="https://lifeandmedtech.accelerate/availability/jane-doe" readOnly className="flex-1" />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText("https://lifeandmedtech.accelerate/availability/jane-doe")
                    // Show a success message
                    toast({
                      title: "Link copied",
                      description: "Availability link copied to clipboard.",
                    })
                  }}
                >
                  Copy Link
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="enable-public-link" />
                <Label htmlFor="enable-public-link">Enable public availability link</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Anyone with this link can view your availability and request meetings based on your settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Working Hours Tab */}
        <TabsContent value="working-hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>
                Set your regular working hours to help others schedule meetings with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4">
                    <div className="w-24">
                      <Label className="capitalize">{day}</Label>
                    </div>
                    <Switch
                      checked={hours.enabled}
                      onCheckedChange={(checked) => handleWorkingHoursChange(day, "enabled", checked)}
                    />
                    <div className="flex items-center space-x-2 flex-1">
                      <Input
                        type="time"
                        value={hours.start}
                        onChange={(e) => handleWorkingHoursChange(day, "start", e.target.value)}
                        disabled={!hours.enabled}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.end}
                        onChange={(e) => handleWorkingHoursChange(day, "end", e.target.value)}
                        disabled={!hours.enabled}
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setWorkingHours(defaultWorkingHours)}>
                Reset to Default
              </Button>
              <Button
                onClick={() => {
                  // In a real app, this would save the working hours to an API
                  console.log("Saving working hours:", workingHours)
                  // Show a success message
                  toast({
                    title: "Working hours saved",
                    description: "Your working hours have been updated.",
                  })
                }}
              >
                Save Working Hours
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Off & Unavailability</CardTitle>
              <CardDescription>Mark dates when you're unavailable for meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="md:w-1/2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-background">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="border-none" />
                    </PopoverContent>
                  </Popover>
                  <div className="mt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Start Time</Label>
                        <Input type="time" defaultValue="09:00" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Time</Label>
                        <Input type="time" defaultValue="17:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Reason (Optional)</Label>
                      <Input placeholder="e.g., Vacation, Conference, etc." id="timeOffReason" />
                    </div>
                    <Button
                      className="w-full mt-2"
                      onClick={() => {
                        // In a real app, this would add time off to an API
                        console.log("Adding time off:", {
                          date,
                          reason: document.getElementById("timeOffReason")?.value,
                        })
                        // Show a success message
                        toast({
                          title: "Time off added",
                          description: "Your time off has been scheduled.",
                        })
                      }}
                    >
                      Add Time Off
                    </Button>
                  </div>
                </div>
                <div className="border-t pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0 md:w-1/2">
                  <h4 className="text-sm font-medium mb-2">Upcoming Time Off</h4>
                  <div className="space-y-2">
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Vacation</p>
                          <p className="text-sm text-muted-foreground">Dec 24 - Dec 31, 2025</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Medical Conference</p>
                          <p className="text-sm text-muted-foreground">Nov 15, 2025 (All day)</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sharing & Permissions Tab */}
        <TabsContent value="sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Visibility</CardTitle>
              <CardDescription>Control who can see your calendar and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>All team members</Label>
                    <p className="text-sm text-muted-foreground">
                      Everyone in your organization can see your availability
                    </p>
                  </div>
                  <Select defaultValue="busy">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full details</SelectItem>
                      <SelectItem value="busy">Busy/Available only</SelectItem>
                      <SelectItem value="none">No visibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Project team members</Label>
                    <p className="text-sm text-muted-foreground">
                      People in your project area can see your availability
                    </p>
                  </div>
                  <Select defaultValue="full">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full details</SelectItem>
                      <SelectItem value="busy">Busy/Available only</SelectItem>
                      <SelectItem value="none">No visibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>External collaborators</Label>
                    <p className="text-sm text-muted-foreground">
                      People outside your organization with access to the platform
                    </p>
                  </div>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full details</SelectItem>
                      <SelectItem value="busy">Busy/Available only</SelectItem>
                      <SelectItem value="none">No visibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Individual Permissions</CardTitle>
              <CardDescription>Set specific visibility permissions for individual team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium">Team members with custom permissions</h4>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Person
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Alex Johnson</p>
                        <p className="text-xs text-muted-foreground">Product Manager</p>
                      </div>
                    </div>
                    <Select defaultValue="full">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full details</SelectItem>
                        <SelectItem value="busy">Busy/Available</SelectItem>
                        <SelectItem value="none">No visibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Williams" />
                        <AvatarFallback>SW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Sarah Williams</p>
                        <p className="text-xs text-muted-foreground">Regulatory Specialist</p>
                      </div>
                    </div>
                    <Select defaultValue="busy">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full details</SelectItem>
                        <SelectItem value="busy">Busy/Available</SelectItem>
                        <SelectItem value="none">No visibility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calendar Booking Settings</CardTitle>
              <CardDescription>Configure how others can book time on your calendar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require approval for meeting requests</Label>
                    <p className="text-sm text-muted-foreground">
                      You'll need to approve meeting requests before they're added to your calendar
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow scheduling outside working hours</Label>
                    <p className="text-sm text-muted-foreground">
                      Team members can book meetings outside your set working hours
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatically decline conflicting invites</Label>
                    <p className="text-sm text-muted-foreground">
                      Meeting requests that conflict with existing events will be declined
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  // In a real app, this would save the booking settings to an API
                  console.log("Saving booking settings")
                  // Show a success message
                  toast({
                    title: "Booking settings saved",
                    description: "Your calendar booking settings have been updated.",
                  })
                }}
              >
                Save Booking Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

