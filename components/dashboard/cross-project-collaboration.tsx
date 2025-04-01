"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BarChart4,
  FileCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Search,
  Plus,
  RefreshCw,
  MessageSquare,
  Calendar,
  FileText,
  ArrowRight,
} from "lucide-react"

// Mock project areas
const projectAreas = [
  { id: "product-dev", name: "Product Development", icon: <BarChart4 className="h-5 w-5" />, color: "bg-blue-500" },
  { id: "regulatory", name: "Regulatory Affairs", icon: <FileCheck className="h-5 w-5" />, color: "bg-green-500" },
  {
    id: "medical-comm",
    name: "Medical Communication",
    icon: <Stethoscope className="h-5 w-5" />,
    color: "bg-purple-500",
  },
  { id: "market-access", name: "Market Access", icon: <TrendingUp className="h-5 w-5" />, color: "bg-orange-500" },
]

// Mock team members from different project areas
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=32&width=32",
    projectArea: "Product Development",
    skills: ["Project Management", "Product Design", "Market Research"],
    availability: "Available",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Regulatory Specialist",
    avatar: "/placeholder.svg?height=32&width=32",
    projectArea: "Regulatory Affairs",
    skills: ["Regulatory Strategy", "Compliance", "Documentation"],
    availability: "Busy",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Medical Writer",
    avatar: "/placeholder.svg?height=32&width=32",
    projectArea: "Medical Communication",
    skills: ["Medical Writing", "Content Strategy", "Scientific Literature"],
    availability: "Available",
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Market Access Analyst",
    avatar: "/placeholder.svg?height=32&width=32",
    projectArea: "Market Access",
    skills: ["Market Analysis", "Pricing Strategy", "Business Development"],
    availability: "In a meeting",
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Clinical Specialist",
    avatar: "/placeholder.svg?height=32&width=32",
    projectArea: "Product Development",
    skills: ["Clinical Research", "Medical Devices", "Clinical Trials"],
    availability: "Available",
  },
]

// Mock cross-project initiatives
const crossProjectInitiatives = [
  {
    id: 1,
    name: "Product A Launch Strategy",
    description: "Comprehensive strategy for launching Product A in Q3",
    projectAreas: ["Product Development", "Medical Communication", "Market Access"],
    teamMembers: [1, 3, 4],
    status: "In Progress",
    progress: 45,
  },
  {
    id: 2,
    name: "Regulatory Compliance Framework",
    description: "Developing a unified compliance framework for all products",
    projectAreas: ["Regulatory Affairs", "Product Development"],
    teamMembers: [2, 1, 5],
    status: "In Progress",
    progress: 60,
  },
  {
    id: 3,
    name: "Market Expansion Research",
    description: "Research for expanding into new international markets",
    projectAreas: ["Market Access", "Medical Communication", "Regulatory Affairs"],
    teamMembers: [4, 3, 2],
    status: "Planning",
    progress: 15,
  },
]

export function CrossProjectCollaboration() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cross-Project Collaboration</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              // Navigate to the new initiative page
              window.location.href = "/dashboard/initiatives/new"
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Initiative
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="initiatives" className="space-y-4">
          <TabsList>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="experts">Team Experts</TabsTrigger>
            <TabsTrigger value="resources">Shared Resources</TabsTrigger>
          </TabsList>

          {/* Cross-Project Initiatives */}
          <TabsContent value="initiatives" className="space-y-4">
            <div className="flex justify-between">
              <div className="relative w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search initiatives..." className="pl-8" />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {crossProjectInitiatives.map((initiative) => (
                <Card key={initiative.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{initiative.name}</CardTitle>
                      <Badge
                        className={
                          initiative.status === "In Progress"
                            ? "bg-blue-500"
                            : initiative.status === "Planning"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }
                      >
                        {initiative.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{initiative.description}</p>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Project Areas</p>
                        <div className="flex flex-wrap gap-1">
                          {initiative.projectAreas.map((area) => (
                            <Badge key={area} variant="outline">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Team Members</p>
                        <div className="flex -space-x-2">
                          {initiative.teamMembers.map((memberId) => {
                            const member = teamMembers.find((m) => m.id === memberId)
                            return (
                              <Avatar key={memberId} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={member?.avatar} alt={member?.name} />
                                <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            )
                          })}
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full border-2 border-background"
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add Team Member</span>
                          </Button>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{initiative.progress}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${initiative.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            console.log("Opening chat for initiative:", initiative.id)
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Chat</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            console.log("Opening calendar for initiative:", initiative.id)
                          }}
                        >
                          <Calendar className="h-4 w-4" />
                          <span className="sr-only">Schedule</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            console.log("Opening documents for initiative:", initiative.id)
                          }}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Documents</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log("Opening initiative details:", initiative.id)
                            // In a real app, this would navigate to the initiative details page
                            window.location.href = `/dashboard/initiatives/${initiative.id}`
                          }}
                        >
                          Open
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add New Initiative Card */}
              <Card
                className="flex flex-col items-center justify-center border-dashed p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => {
                  // Navigate to the new initiative page
                  window.location.href = "/dashboard/initiatives/new"
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Plus className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium">Create New Initiative</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Start a new cross-project initiative to collaborate with different project areas
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Initiative
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Team Experts Tab */}
          <TabsContent value="experts" className="space-y-4">
            <div className="flex justify-between">
              <div className="relative w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search team members..." className="pl-8" />
              </div>
              <div className="flex space-x-2">
                {projectAreas.map((area) => (
                  <Button key={area.id} variant="outline" size="sm">
                    {area.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Project Area</p>
                        <Badge variant="outline">{member.projectArea}</Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Skills & Expertise</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Availability</p>
                        <Badge variant={member.availability === "Available" ? "success" : "outline"}>
                          {member.availability}
                        </Badge>
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Calendar className="h-4 w-4" />
                          <span className="sr-only">Schedule</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Shared Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="rounded-md bg-muted p-6 text-center">
              <h3 className="text-lg font-medium">Shared Resources</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access shared resources across different project areas
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <FileText className="h-5 w-5 text-primary" />
                  <p className="font-medium">Shared Documents</p>
                  <p className="text-xs text-muted-foreground">Access cross-project documents</p>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p className="font-medium">Combined Calendar</p>
                  <p className="text-xs text-muted-foreground">View all project deadlines</p>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="font-medium">Team Directory</p>
                  <p className="text-xs text-muted-foreground">Find experts across projects</p>
                </Button>
                <Button variant="outline" className="h-auto flex-col items-start gap-1 p-4 text-left">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <p className="font-medium">Cross-Project Chat</p>
                  <p className="text-xs text-muted-foreground">Communicate across teams</p>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

