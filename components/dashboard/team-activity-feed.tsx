"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  FileText,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Clock,
  Paperclip,
  Edit,
  Users,
  ArrowRight,
  RefreshCw,
} from "lucide-react"

// Mock activity data
const activities = [
  {
    id: 1,
    type: "document",
    action: "updated",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Regulatory submission draft v2.3",
    project: "Product A Approval",
    timestamp: "2 hours ago",
    icon: <FileText className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 2,
    type: "task",
    action: "completed",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Market analysis for Product X",
    project: "Market Access Strategy",
    timestamp: "4 hours ago",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  },
  {
    id: 3,
    type: "comment",
    action: "commented on",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Clinical trial protocol",
    project: "Product B Development",
    timestamp: "Yesterday",
    icon: <MessageSquare className="h-4 w-4 text-indigo-500" />,
    comment: "I think we should consider adding an additional endpoint to measure patient satisfaction.",
  },
  {
    id: 4,
    type: "meeting",
    action: "scheduled",
    user: {
      name: "Emma Davis",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Product development review",
    project: "Product B Development",
    timestamp: "Yesterday",
    icon: <Calendar className="h-4 w-4 text-purple-500" />,
    date: "June 15, 2025 at 2:00 PM",
  },
  {
    id: 5,
    type: "document",
    action: "created",
    user: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Marketing strategy document",
    project: "Market Access",
    timestamp: "2 days ago",
    icon: <FileText className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 6,
    type: "attachment",
    action: "added",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Final product specifications.pdf",
    project: "Product A Approval",
    timestamp: "2 days ago",
    icon: <Paperclip className="h-4 w-4 text-amber-500" />,
  },
  {
    id: 7,
    type: "task",
    action: "edited",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Prepare regulatory documentation",
    project: "Regulatory Affairs",
    timestamp: "3 days ago",
    icon: <Edit className="h-4 w-4 text-orange-500" />,
  },
  {
    id: 8,
    type: "collaboration",
    action: "invited",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content: "Medical Communication team",
    project: "Cross-Project Collaboration",
    timestamp: "3 days ago",
    icon: <Users className="h-4 w-4 text-cyan-500" />,
    target: "to collaborate on Product B Development project",
  },
]

export function TeamActivityFeed() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Activity</CardTitle>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex">
              <div className="mr-4 flex items-start">
                <Avatar className="h-9 w-9 border-4 border-background">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <div className="rounded-full bg-muted p-1 mr-2">{activity.icon}</div>
                  <p className="text-sm font-medium">
                    <span className="font-semibold">{activity.user.name}</span> {activity.action} {activity.content}
                  </p>
                </div>
                {activity.comment && <div className="ml-7 rounded-md bg-muted p-2 text-xs">"{activity.comment}"</div>}
                {activity.date && (
                  <div className="ml-7 flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {activity.date}
                  </div>
                )}
                {activity.target && <div className="ml-7 text-xs text-muted-foreground">{activity.target}</div>}
                <div className="ml-7 flex items-center text-xs text-muted-foreground">
                  <span className="mr-1">
                    In <span className="font-medium">{activity.project}</span>
                  </span>
                  •<span className="ml-1">{activity.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <a href="/dashboard/activity">
              View All Activity
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

