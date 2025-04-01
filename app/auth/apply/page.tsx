"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { submitApplication } from "@/app/actions/auth"
import { Upload } from "lucide-react"

export default function ApplyPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectArea: "",
    experience: "",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append("firstName", formData.firstName)
      formDataToSubmit.append("lastName", formData.lastName)
      formDataToSubmit.append("email", formData.email)
      formDataToSubmit.append("phone", formData.phone)
      formDataToSubmit.append("projectArea", formData.projectArea)
      formDataToSubmit.append("experience", formData.experience)
      formDataToSubmit.append("resume", resumeFile)

      const result = await submitApplication(formDataToSubmit)

      if (result.error) {
        toast({
          title: "Application failed",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      setIsSubmitted(true)
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully!",
      })
    } catch (error) {
      toast({
        title: "Application failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8">
          <Image src="/logo.png" alt="LifeAndMedTech Accelerate Logo" width={150} height={50} className="h-auto" />
        </Link>
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-green-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Application Submitted!</h1>
          <p className="text-muted-foreground">
            Thank you for your interest in joining LifeAndMedTech. We'll review your application and get back to you
            soon.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8">
          <Image src="/logo.png" alt="LifeAndMedTech Accelerate Logo" width={150} height={50} className="h-auto" />
        </Link>
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Join Our Team</h1>
            <p className="text-muted-foreground">Submit your application to join LifeAndMedTech</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectArea">Preferred Project Area</Label>
              <Select
                value={formData.projectArea}
                onValueChange={(value) => setFormData({ ...formData, projectArea: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project area" />
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
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                placeholder="Briefly describe your relevant experience in life sciences or medical technology"
                className="min-h-[100px]"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
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
              {resumeFile && <p className="text-xs text-muted-foreground">Selected file: {resumeFile.name}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

