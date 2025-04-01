"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedTeamCalendar } from "@/components/dashboard/enhanced-team-calendar"
import { TaskBoard } from "@/components/dashboard/task-board"
import { CrossProjectCollaboration } from "@/components/dashboard/cross-project-collaboration"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DashboardPreview() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const handleDemoAction = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Action completed",
        description: "Your changes have been saved successfully.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">LifeAndMedTech Accelerate</h2>
          <p className="text-muted-foreground">
            Welcome to the production-ready collaborative platform for team members
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={handleDemoAction} disabled={loading}>
            {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
            {loading ? "Processing..." : "Demo Action"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="calendar">Team Calendar</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="collaboration">Cross-Project Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production-Ready Platform</CardTitle>
              <CardDescription>Key features and improvements in the latest version</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Enhanced UI/UX</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Improved user interface with responsive design, accessible components, and intuitive navigation.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Error Handling</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive error boundaries, toast notifications, and graceful fallbacks for a robust user
                      experience.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Performance Optimized</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Code splitting, lazy loading, and optimized assets for faster load times and smoother
                      interactions.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Calendar Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fully functional team calendar with day alignment, availability management, and meeting
                      scheduling.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Task Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Interactive kanban board and list views for efficient task tracking and collaboration.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Cross-Project Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Seamless collaboration across different project areas with shared resources and team visibility.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <EnhancedTeamCalendar />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskBoard />
        </TabsContent>

        <TabsContent value="collaboration">
          <CrossProjectCollaboration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

