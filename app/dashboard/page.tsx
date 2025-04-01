import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, FileText, Users, ArrowRight, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TeamActivityFeed } from "@/components/dashboard/team-activity-feed"
import { TaskBoard } from "@/components/dashboard/task-board"
import { TeamCalendar } from "@/components/dashboard/team-calendar"
import { TeamChat } from "@/components/dashboard/team-chat"
import { SharedDocuments } from "@/components/dashboard/shared-documents"
import { CrossProjectCollaboration } from "@/components/dashboard/cross-project-collaboration"

export default function DashboardPage() {
  // Mock data - in a real app, this would come from an API
  const stats = [
    {
      title: "Active Projects",
      value: "3",
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      description: "2 due this week",
    },
    {
      title: "Team Members",
      value: "12",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: "3 in your project area",
    },
    {
      title: "Completed Tasks",
      value: "24",
      icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" />,
      description: "This month",
    },
    {
      title: "Upcoming Meetings",
      value: "5",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      description: "Next 7 days",
    },
  ]

  // Mock data for upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: "Review regulatory submission",
      dueDate: "Today",
      priority: "High",
      project: "Product A Approval",
    },
    {
      id: 2,
      title: "Prepare presentation for stakeholders",
      dueDate: "Tomorrow",
      priority: "Medium",
      project: "Market Access Strategy",
    },
    {
      id: 3,
      title: "Update clinical documentation",
      dueDate: "In 2 days",
      priority: "Medium",
      project: "Product B Development",
    },
    {
      id: 4,
      title: "Coordinate with external partners",
      dueDate: "Next week",
      priority: "Low",
      project: "Collaboration Initiative",
    },
  ]

  // Mock online team members
  const onlineTeamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Regulatory Specialist",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "busy",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Medical Writer",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "offline",
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Market Access Analyst",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your projects and tasks.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Team Member Availability Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <Users className="mr-2 h-4 w-4" /> Team Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[300px] overflow-auto py-2">
              {onlineTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between px-4 py-2 hover:bg-muted/50">
                  <div className="flex items-center">
                    <div className="relative mr-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute -right-0.5 -top-0.5 block h-2.5 w-2.5 rounded-full ring-2 ring-background ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "busy"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0" asChild>
                    <a href="#" title="Schedule meeting">
                      <Calendar className="h-4 w-4" />
                      <span className="sr-only">Schedule</span>
                    </a>
                  </Button>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/dashboard/team">
                  View All Team Members
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Card */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used tools and recent items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left" asChild>
                <a href="/dashboard/tasks">
                  <div className="flex w-full items-center justify-between">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <Badge variant="secondary" className="ml-auto">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm font-medium leading-none">My Tasks</p>
                  <p className="text-xs text-muted-foreground">View and manage your assigned tasks</p>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left" asChild>
                <a href="/dashboard/messages">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium leading-none">Messages</p>
                  <p className="text-xs text-muted-foreground">Chat with your team members</p>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left" asChild>
                <a href="/dashboard/calendar">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium leading-none">Calendar</p>
                  <p className="text-xs text-muted-foreground">View and schedule meetings</p>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left" asChild>
                <a href="/dashboard/documents">
                  <FileText className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium leading-none">Documents</p>
                  <p className="text-xs text-muted-foreground">Access shared files and documents</p>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="activity">Team Activity</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="chat">Team Chat</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="cross-project">Cross-Project</TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <TaskBoard />
        </TabsContent>

        {/* Team Activity Tab */}
        <TabsContent value="activity">
          <TeamActivityFeed />
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <TeamCalendar />
        </TabsContent>

        {/* Team Chat Tab */}
        <TabsContent value="chat">
          <TeamChat />
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <SharedDocuments />
        </TabsContent>

        {/* Cross-Project Tab */}
        <TabsContent value="cross-project">
          <CrossProjectCollaboration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

