"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart4, FileCheck, Stethoscope, TrendingUp, Users, Calendar, ArrowRight } from "lucide-react"

// Mock data for projects
const projects = [
  {
    id: 1,
    name: "Medical Device X Development",
    description: "Development of a new medical device for cardiac monitoring",
    area: "Product Development",
    progress: 65,
    members: 8,
    dueDate: "Dec 15, 2025",
    status: "In Progress",
    icon: <BarChart4 className="h-5 w-5" />,
  },
  {
    id: 2,
    name: "Regulatory Submission for Device Y",
    description: "Preparing regulatory documentation for FDA submission",
    area: "Regulatory Affairs",
    progress: 40,
    members: 5,
    dueDate: "Jan 30, 2026",
    status: "In Progress",
    icon: <FileCheck className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "Clinical Trial Communication",
    description: "Developing communication materials for upcoming clinical trial",
    area: "Medical Communication",
    progress: 80,
    members: 4,
    dueDate: "Nov 10, 2025",
    status: "In Progress",
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    id: 4,
    name: "Market Access Strategy",
    description: "Developing market access strategy for new product line",
    area: "Market Access",
    progress: 25,
    members: 6,
    dueDate: "Mar 15, 2026",
    status: "In Progress",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: 5,
    name: "Product Z Enhancement",
    description: "Enhancing features of existing medical device",
    area: "Product Development",
    progress: 90,
    members: 7,
    dueDate: "Oct 5, 2025",
    status: "Almost Complete",
    icon: <BarChart4 className="h-5 w-5" />,
  },
]

// Mock team members
const teamMembers = [
  { id: 1, name: "Alex Johnson", role: "Product Manager", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 2, name: "Sarah Williams", role: "Regulatory Specialist", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 3, name: "Michael Chen", role: "Medical Writer", avatar: "/placeholder.svg?height=32&width=32" },
  { id: 4, name: "Emma Davis", role: "Market Access Analyst", avatar: "/placeholder.svg?height=32&width=32" },
]

export default function ProjectsPage() {
  const handleCreateNewProject = () => {
    // In a real app, this would navigate to a new project creation page or open a modal
    // For now, we'll use window.location to navigate to a new project page
    window.location.href = "/dashboard/projects/new"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage and track all your team's projects</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => handleCreateNewProject()}>Create New Project</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="product">Product Development</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory Affairs</TabsTrigger>
          <TabsTrigger value="medical">Medical Communication</TabsTrigger>
          <TabsTrigger value="market">Market Access</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="rounded-full bg-primary/10 p-1">{project.icon}</div>
                      <Badge variant="outline">{project.area}</Badge>
                    </div>
                    <Badge
                      className={
                        project.progress >= 75
                          ? "bg-green-500"
                          : project.progress >= 50
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{project.members} members</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due {project.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <a href={`/dashboard/projects/${project.id}`}>
                      View Project Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["product", "regulatory", "medical", "market"].map((area) => (
          <TabsContent key={area} value={area} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects
                .filter((project) => {
                  const areaMap = {
                    product: "Product Development",
                    regulatory: "Regulatory Affairs",
                    medical: "Medical Communication",
                    market: "Market Access",
                  }
                  return project.area === areaMap[area as keyof typeof areaMap]
                })
                .map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="rounded-full bg-primary/10 p-1">{project.icon}</div>
                          <Badge variant="outline">{project.area}</Badge>
                        </div>
                        <Badge
                          className={
                            project.progress >= 75
                              ? "bg-green-500"
                              : project.progress >= 50
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="mt-2">{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{project.members} members</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Due {project.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" className="w-full" asChild>
                        <a href={`/dashboard/projects/${project.id}`}>
                          View Project Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>People working on your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a href="/dashboard/team">
              View All Team Members
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

