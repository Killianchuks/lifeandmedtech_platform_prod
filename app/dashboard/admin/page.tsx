import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart4, FileCheck, Stethoscope, TrendingUp, CheckCircle, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for project switch requests
const projectSwitchRequests = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    currentProject: "Product Development",
    requestedProject: "Regulatory Affairs",
    reason: "I have regulatory experience that would be valuable for the upcoming FDA submission.",
    requestDate: "Oct 15, 2025",
    status: "Pending",
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    currentProject: "Medical Communication",
    requestedProject: "Market Access",
    reason: "I'd like to expand my skills in market access strategies.",
    requestDate: "Oct 12, 2025",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    currentProject: "Regulatory Affairs",
    requestedProject: "Product Development",
    reason: "I want to apply my regulatory knowledge to the product development process.",
    requestDate: "Oct 10, 2025",
    status: "Pending",
  },
]

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Product Manager",
    projectArea: "Product Development",
    joinDate: "Jan 15, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Regulatory Specialist",
    projectArea: "Regulatory Affairs",
    joinDate: "Feb 3, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "Medical Writer",
    projectArea: "Medical Communication",
    joinDate: "Mar 22, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "Market Access Analyst",
    projectArea: "Market Access",
    joinDate: "Apr 10, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "james.wilson@example.com",
    role: "Clinical Specialist",
    projectArea: "Product Development",
    joinDate: "May 5, 2025",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Mock data for project areas
const projectAreas = [
  {
    name: "Product Development",
    members: 12,
    projects: 5,
    icon: <BarChart4 className="h-5 w-5" />,
  },
  {
    name: "Regulatory Affairs",
    members: 8,
    projects: 3,
    icon: <FileCheck className="h-5 w-5" />,
  },
  {
    name: "Medical Communication",
    members: 6,
    projects: 4,
    icon: <Stethoscope className="h-5 w-5" />,
  },
  {
    name: "Market Access",
    members: 7,
    projects: 2,
    icon: <TrendingUp className="h-5 w-5" />,
  },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage team members, project assignments, and platform settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Add New Team Member</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {projectAreas.map((area) => (
          <Card key={area.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{area.name}</CardTitle>
              <div className="rounded-full bg-primary/10 p-1">{area.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{area.members}</div>
              <p className="text-xs text-muted-foreground">Team members • {area.projects} projects</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Switch Requests</CardTitle>
          <CardDescription>Approve or deny team members' requests to switch project areas</CardDescription>
        </CardHeader>
        <CardContent>
          {projectSwitchRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No pending requests</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Current Project</TableHead>
                  <TableHead>Requested Project</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectSwitchRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={request.user.avatar} alt={request.user.name} />
                          <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{request.user.name}</p>
                          <p className="text-xs text-muted-foreground">{request.user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.currentProject}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.requestedProject}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate text-xs" title={request.reason}>
                        {request.reason}
                      </p>
                    </TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Deny</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage all team members and their project assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Project Area</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.projectArea}</Badge>
                  </TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {teamMembers.length} of {teamMembers.length} team members
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

