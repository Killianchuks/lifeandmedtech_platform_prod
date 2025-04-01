// Add this file to handle the new initiative creation
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"

export default function NewInitiativePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectAreas: [] as string[],
    teamMembers: [] as number[],
  })

  const projectAreas = [
    { id: "product-development", name: "Product Development" },
    { id: "regulatory-affairs", name: "Regulatory Affairs" },
    { id: "medical-communication", name: "Medical Communication" },
    { id: "market-access", name: "Market Access" },
  ]

  const teamMembers = [
    { id: 1, name: "Alex Johnson", role: "Product Manager" },
    { id: 2, name: "Sarah Williams", role: "Regulatory Specialist" },
    { id: 3, name: "Michael Chen", role: "Medical Writer" },
    { id: 4, name: "Emma Davis", role: "Market Access Analyst" },
    { id: 5, name: "James Wilson", role: "Clinical Specialist" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create the initiative
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect back to the cross-project collaboration page
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating initiative:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleProjectArea = (areaId: string) => {
    setFormData((prev) => ({
      ...prev,
      projectAreas: prev.projectAreas.includes(areaId)
        ? prev.projectAreas.filter((id) => id !== areaId)
        : [...prev.projectAreas, areaId],
    }))
  }

  const toggleTeamMember = (memberId: number) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.includes(memberId)
        ? prev.teamMembers.filter((id) => id !== memberId)
        : [...prev.teamMembers, memberId],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create New Initiative</h2>
          <p className="text-muted-foreground">Start a new cross-project collaboration initiative</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Initiative Details</CardTitle>
            <CardDescription>Enter the basic information about your new cross-project initiative</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Initiative Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter initiative name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the initiative goals and scope"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Project Areas</Label>
              <div className="grid grid-cols-2 gap-2">
                {projectAreas.map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`area-${area.id}`}
                      checked={formData.projectAreas.includes(area.id)}
                      onCheckedChange={() => toggleProjectArea(area.id)}
                    />
                    <Label htmlFor={`area-${area.id}`} className="text-sm font-normal cursor-pointer">
                      {area.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Team Members</Label>
              <div className="grid grid-cols-2 gap-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={formData.teamMembers.includes(member.id)}
                      onCheckedChange={() => toggleTeamMember(member.id)}
                    />
                    <Label htmlFor={`member-${member.id}`} className="text-sm font-normal cursor-pointer">
                      {member.name} ({member.role})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Initiative"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

