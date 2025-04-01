"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Plus, ArrowRight, ChevronDown, Filter, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for tasks
const tasks = {
  todo: [
    {
      id: 1,
      title: "Review regulatory submission",
      description: "Check all documentation for Product A regulatory submission",
      dueDate: "Today",
      priority: "High",
      project: "Product A Approval",
      assignedTo: { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 3,
      attachments: 2,
    },
    {
      id: 2,
      title: "Prepare presentation for stakeholders",
      description: "Create slides for the quarterly stakeholder meeting",
      dueDate: "Tomorrow",
      priority: "Medium",
      project: "Market Access Strategy",
      assignedTo: { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 1,
      attachments: 1,
    },
  ],
  inProgress: [
    {
      id: 3,
      title: "Update clinical documentation",
      description: "Incorporate latest clinical data into documentation",
      dueDate: "In 2 days",
      priority: "Medium",
      project: "Product B Development",
      assignedTo: { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 5,
      attachments: 3,
    },
    {
      id: 4,
      title: "Draft marketing materials",
      description: "Create first draft of marketing materials for new product",
      dueDate: "In 3 days",
      priority: "Low",
      project: "Product Launch",
      assignedTo: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 0,
      attachments: 1,
    },
  ],
  review: [
    {
      id: 5,
      title: "Review competitor analysis",
      description: "Analyze competitor products and strategies",
      dueDate: "In 4 days",
      priority: "Medium",
      project: "Market Research",
      assignedTo: { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 2,
      attachments: 0,
    },
  ],
  completed: [
    {
      id: 6,
      title: "Submit initial documentation",
      description: "Send initial documentation to regulatory body",
      dueDate: "Completed",
      priority: "Completed",
      project: "Product A Approval",
      assignedTo: { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      comments: 7,
      attachments: 4,
    },
  ],
}

export function TaskBoard() {
  const [view, setView] = useState<"kanban" | "list">("kanban")

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>Manage your tasks and track progress</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Priority</DropdownMenuItem>
                <DropdownMenuItem>Due Date</DropdownMenuItem>
                <DropdownMenuItem>Project</DropdownMenuItem>
                <DropdownMenuItem>Assigned To</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kanban" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="kanban" onClick={() => setView("kanban")}>
                Kanban Board
              </TabsTrigger>
              <TabsTrigger value="list" onClick={() => setView("list")}>
                List View
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Kanban Board View */}
          <TabsContent value="kanban" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* To Do Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">To Do</h3>
                  <Badge variant="outline">{tasks.todo.length}</Badge>
                </div>
                <div className="space-y-2">
                  {tasks.todo.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => {
                      // In a real app, this would open a modal to add a task
                      console.log("Opening add task modal")
                      // For demo purposes, we'll just log
                      console.log("Add task clicked")
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">In Progress</h3>
                  <Badge variant="outline">{tasks.inProgress.length}</Badge>
                </div>
                <div className="space-y-2">
                  {tasks.inProgress.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Review Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Review</h3>
                  <Badge variant="outline">{tasks.review.length}</Badge>
                </div>
                <div className="space-y-2">
                  {tasks.review.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Completed</h3>
                  <Badge variant="outline">{tasks.completed.length}</Badge>
                </div>
                <div className="space-y-2">
                  {tasks.completed.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-2">
              {[...tasks.todo, ...tasks.inProgress, ...tasks.review, ...tasks.completed].map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.project} • Due {task.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
                      <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`mr-2 rounded-full px-2 py-1 text-xs ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : task.priority === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        console.log("Mark task as complete:", task.id)
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="sr-only">Mark as complete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center">
          <Button
            variant="outline"
            asChild
            onClick={() => {
              console.log("Navigating to all tasks")
              // In a real app, this would navigate to the tasks page
              window.location.href = "/dashboard/tasks"
            }}
          >
            <a href="/dashboard/tasks">
              View All Tasks
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TaskCard({ task }: { task: any }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="flex items-center justify-between space-y-0">
        <Badge
          className={
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
                ? "bg-yellow-500"
                : task.priority === "Completed"
                  ? "bg-green-500"
                  : "bg-blue-500"
          }
        >
          {task.priority}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Assign</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className="mb-1 mt-2 text-sm font-medium">{task.title}</h3>
      <p className="text-xs text-muted-foreground">{task.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{task.dueDate}</span>
        </div>
        <Avatar className="h-6 w-6">
          <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
          <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

