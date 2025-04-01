"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, Upload, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

const projectAreas = [
  { id: "product-development", name: "Product Development" },
  { id: "regulatory-affairs", name: "Regulatory Affairs" },
  { id: "medical-communication", name: "Medical Communication" },
  { id: "market-access", name: "Market Access" },
]

type JoinTeamModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function JoinTeamModal({ open, onOpenChange }: JoinTeamModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("employee")

  // Employee form state
  const [employeeId, setEmployeeId] = useState("")
  const [employeePassword, setEmployeePassword] = useState("")
  const [employeeError, setEmployeeError] = useState("")
  const [employeeLoading, setEmployeeLoading] = useState(false)

  // Applicant form state
  const [applicantData, setApplicantData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectArea: "",
    experience: "",
    resumeFile: null as File | null,
  })
  const [applicantError, setApplicantError] = useState("")
  const [applicantSuccess, setApplicantSuccess] = useState(false)
  const [applicantLoading, setApplicantLoading] = useState(false)

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmployeeError("")
    setEmployeeLoading(true)

    try {
      // In a real app, this would validate the employee ID with an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (employeeId === "EMP12345") {
        // Mock validation
        // Redirect to dashboard after successful login
        router.push("/dashboard")
      } else {
        setEmployeeError("Invalid employee ID or password. Please try again.")
      }
    } catch (error) {
      setEmployeeError("An error occurred. Please try again.")
    } finally {
      setEmployeeLoading(false)
    }
  }

  const handleApplicantSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApplicantError("")
    setApplicantLoading(true)

    try {
      // In a real app, this would submit the application to an API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setApplicantSuccess(true)

      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setApplicantData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          projectArea: "",
          experience: "",
          resumeFile: null,
        })
        setApplicantSuccess(false)
        onOpenChange(false)
      }, 3000)
    } catch (error) {
      setApplicantError("An error occurred while submitting your application. Please try again.")
    } finally {
      setApplicantLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicantData({
        ...applicantData,
        resumeFile: e.target.files[0],
      })
    }
  }

  const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApplicantData({
      ...applicantData,
      [name]: value,
    })
  }

  const handleProjectAreaChange = (value: string) => {
    setApplicantData({
      ...applicantData,
      projectArea: value,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join LifeAndMedTech Accelerate</DialogTitle>
          <DialogDescription>
            Join our collaborative platform for team members in life sciences and medical technology.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="employee">Employee</TabsTrigger>
            <TabsTrigger value="applicant">Apply to Join</TabsTrigger>
          </TabsList>

          {/* Employee Login Tab */}
          <TabsContent value="employee" className="space-y-4 mt-4">
            <form onSubmit={handleEmployeeSubmit} className="space-y-4">
              {employeeError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{employeeError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Enter your employee ID"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeePassword">Password</Label>
                <Input
                  id="employeePassword"
                  type="password"
                  value={employeePassword}
                  onChange={(e) => setEmployeePassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={employeeLoading}>
                {employeeLoading ? "Verifying..." : "Access Platform"}
              </Button>
            </form>
          </TabsContent>

          {/* Applicant Tab */}
          <TabsContent value="applicant" className="space-y-4 mt-4">
            {applicantSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-medium">Application Submitted!</h3>
                <p className="text-muted-foreground">
                  Thank you for your interest. Our team will review your application and contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplicantSubmit} className="space-y-4">
                {applicantError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{applicantError}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={applicantData.firstName}
                      onChange={handleApplicantChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={applicantData.lastName}
                      onChange={handleApplicantChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={applicantData.email}
                    onChange={handleApplicantChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={applicantData.phone}
                    onChange={handleApplicantChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Preferred Project Area</Label>
                  <RadioGroup
                    value={applicantData.projectArea}
                    onValueChange={handleProjectAreaChange}
                    className="grid grid-cols-1 gap-2"
                  >
                    {projectAreas.map((area) => (
                      <div key={area.id} className="flex items-center space-x-2 rounded-md border p-2">
                        <RadioGroupItem value={area.id} id={area.id} />
                        <Label htmlFor={area.id} className="flex-1 cursor-pointer">
                          {area.name}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={applicantData.experience}
                    onChange={handleApplicantChange}
                    placeholder="Briefly describe your relevant experience in life sciences or medical technology"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="resume"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-1 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (MAX. 5MB)</p>
                      </div>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                  {applicantData.resumeFile && (
                    <p className="text-xs text-muted-foreground">Selected file: {applicantData.resumeFile.name}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={applicantLoading}>
                  {applicantLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

