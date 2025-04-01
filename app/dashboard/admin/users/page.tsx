"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Search, Edit, Trash2, UserPlus, CheckCircle, XCircle } from "lucide-react"

// This would normally be a server action, but for simplicity we're mocking the data
const mockUsers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    employeeId: "EMP001",
    role: "TEAM_LEAD",
    projectArea: "Product Development",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    employeeId: "EMP002",
    role: "TEAM_MEMBER",
    projectArea: "Regulatory Affairs",
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    employeeId: "EMP003",
    role: "TEAM_MEMBER",
    projectArea: "Medical Communication",
    createdAt: new Date("2025-02-05"),
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    employeeId: "EMP004",
    role: "TEAM_LEAD",
    projectArea: "Market Access",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james.wilson@example.com",
    employeeId: "EMP005",
    role: "ADMIN",
    projectArea: "All",
    createdAt: new Date("2025-01-10"),
  },
]

// Mock applications
const mockApplications = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    resumeUrl: "/uploads/john-doe-resume.pdf",
    projectArea: "Product Development",
    experience: "5 years experience in medical device development",
    status: "PENDING",
    createdAt: new Date("2025-03-15"),
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "123-456-7891",
    resumeUrl: "/uploads/jane-smith-resume.pdf",
    projectArea: "Regulatory Affairs",
    experience: "3 years experience in regulatory compliance",
    status: "PENDING",
    createdAt: new Date("2025-03-18"),
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "123-456-7892",
    resumeUrl: "/uploads/robert-johnson-resume.pdf",
    projectArea: "Medical Communication",
    experience: "4 years experience in medical writing",
    status: "APPROVED",
    createdAt: new Date("2025-03-10"),
  },
]

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState(mockUsers)
  const [applications, setApplications] = useState(mockApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
    role: "TEAM_MEMBER",
    projectArea: "",
  })
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [approvalData, setApprovalData] = useState({
    employeeId: "",
    role: "TEAM_MEMBER",
  })

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter applications based on search term
  const filteredApplications = applications.filter(
    (app) =>
      `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Generate a new ID
      const newId = (users.length + 1).toString()

      // Create new user object
      const userToAdd = {
        id: newId,
        name: newUser.name,
        email: newUser.email,
        employeeId: newUser.employeeId,
        role: newUser.role,
        projectArea: newUser.projectArea,
        createdAt: new Date(),
      }

      // Add to users array
      setUsers([...users, userToAdd])

      // Reset form
      setNewUser({
        name: "",
        email: "",
        employeeId: "",
        password: "",
        role: "TEAM_MEMBER",
        projectArea: "",
      })

      // Close dialog
      setIsAddUserDialogOpen(false)

      // Show success toast
      toast({
        title: "User added",
        description: `${userToAdd.name} has been added successfully.`,
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleApproveApplication = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Update application status
      const updatedApplications = applications.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: "APPROVED" } : app,
      )

      setApplications(updatedApplications)

      // Create new user from application
      const newUser = {
        id: (users.length + 1).toString(),
        name: `${selectedApplication.firstName} ${selectedApplication.lastName}`,
        email: selectedApplication.email,
        employeeId: approvalData.employeeId,
        role: approvalData.role,
        projectArea: selectedApplication.projectArea,
        createdAt: new Date(),
      }

      // Add to users array
      setUsers([...users, newUser])

      // Close dialog
      setIsApproveDialogOpen(false)

      // Reset form
      setApprovalData({
        employeeId: "",
        role: "TEAM_MEMBER",
      })

      // Show success toast
      toast({
        title: "Application approved",
        description: `${selectedApplication.firstName} ${selectedApplication.lastName} has been approved and added as a ${approvalData.role === "TEAM_LEAD" ? "Team Lead" : "Team Member"}.`,
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleRejectApplication = (applicationId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Update application status
      const updatedApplications = applications.map((app) =>
        app.id === applicationId ? { ...app, status: "REJECTED" } : app,
      )

      setApplications(updatedApplications)

      // Show success toast
      toast({
        title: "Application rejected",
        description: "The application has been rejected.",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleDeleteUser = (userId: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Remove user from array
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)

      // Show success toast
      toast({
        title: "User deleted",
        description: "The user has been deleted successfully.",
      })

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account. The user will receive an email with login instructions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={newUser.employeeId}
                      onChange={(e) => setNewUser({ ...newUser, employeeId: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="TEAM_LEAD">Team Lead</SelectItem>
                        <SelectItem value="TEAM_MEMBER">Team Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectArea">Project Area</Label>
                    <Select
                      value={newUser.projectArea}
                      onValueChange={(value) => setNewUser({ ...newUser, projectArea: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product Development">Product Development</SelectItem>
                        <SelectItem value="Regulatory Affairs">Regulatory Affairs</SelectItem>
                        <SelectItem value="Medical Communication">Medical Communication</SelectItem>
                        <SelectItem value="Market Access">Market Access</SelectItem>
                        <SelectItem value="All">All Areas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Creating...
                    </>
                  ) : (
                    "Create User"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users or applications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage user accounts and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Project Area</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.employeeId}</TableCell>
                      <TableCell>
                        {user.role === "ADMIN" ? "Admin" : user.role === "TEAM_LEAD" ? "Team Lead" : "Team Member"}
                      </TableCell>
                      <TableCell>{user.projectArea}</TableCell>
                      <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={user.role === "ADMIN"}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Review and manage applications to join the team</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Project Area</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.firstName} {application.lastName}
                      </TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>{application.projectArea}</TableCell>
                      <TableCell>{application.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        {application.status === "PENDING" ? (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        ) : application.status === "APPROVED" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Rejected
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {application.status === "PENDING" && (
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-green-600"
                              onClick={() => {
                                setSelectedApplication(application)
                                setIsApproveDialogOpen(true)
                              }}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center text-red-600"
                              onClick={() => handleRejectApplication(application.id)}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Approve Application Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Application</DialogTitle>
            <DialogDescription>Approve this application and create a user account.</DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Applicant</Label>
                <div className="rounded-md border p-2">
                  <p className="font-medium">
                    {selectedApplication.firstName} {selectedApplication.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                  <p className="text-sm text-muted-foreground">Project Area: {selectedApplication.projectArea}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Assign Employee ID</Label>
                <Input
                  id="employeeId"
                  value={approvalData.employeeId}
                  onChange={(e) => setApprovalData({ ...approvalData, employeeId: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Assign Role</Label>
                <Select
                  value={approvalData.role}
                  onValueChange={(value) => setApprovalData({ ...approvalData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEAM_LEAD">Team Lead</SelectItem>
                    <SelectItem value="TEAM_MEMBER">Team Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                A temporary password will be generated and sent to the applicant's email.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveApplication} disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Approving...
                </>
              ) : (
                "Approve & Create Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

