"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/ui/date-picker"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    area: "",
    dueDate: new Date(),
    priority: "medium",
    teamSize: "small",
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // In a real app, this would be an API call to create the project
      // For demo purposes, we'll simulate a successful creation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to projects page
      router.push("/dashboard/projects")
    } catch (err) {
      setError("Failed to create project. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create New Project</h2>
          <p className="text-muted-foreground">Set up a new project for your team</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Enter the basic information about your new project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe the project goals and scope"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Project Area</Label>
              <Select value={formData.area} onValueChange={(value) => handleChange("area", value)} required>
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select project area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product Development">Product Development</SelectItem>
                  <SelectItem value="Regulatory Affairs">Regulatory Affairs</SelectItem>
                  <SelectItem value="Medical Communication">Medical Communication</SelectItem>
                  <SelectItem value="Market Access">Market Access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <DatePicker date={formData.dueDate} setDate={(date) => handleChange("dueDate", date)} />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="priority-low" />
                  <Label htmlFor="priority-low" className="cursor-pointer">
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="priority-medium" />
                  <Label htmlFor="priority-medium" className="cursor-pointer">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="priority-high" />
                  <Label htmlFor="priority-high" className="cursor-pointer">
                    High
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Team Size</Label>
              <RadioGroup
                value={formData.teamSize}
                onValueChange={(value) => handleChange("teamSize", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="team-small" />
                  <Label htmlFor="team-small" className="cursor-pointer">
                    Small (1-3)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="team-medium" />
                  <Label htmlFor="team-medium" className="cursor-pointer">
                    Medium (4-7)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="team-large" />
                  <Label htmlFor="team-large" className="cursor-pointer">
                    Large (8+)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

