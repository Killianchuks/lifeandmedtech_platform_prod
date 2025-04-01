"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import { loginWithEmployeeId, loginWithEmail } from "@/app/actions/auth"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("employee")

  // Employee login form state
  const [employeeForm, setEmployeeForm] = useState({
    employeeId: "",
    password: "",
    rememberMe: true,
  })

  // Email login form state
  const [emailForm, setEmailForm] = useState({
    email: "",
    password: "",
    rememberMe: true,
  })

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("employeeId", employeeForm.employeeId)
      formData.append("password", employeeForm.password)

      const result = await loginWithEmployeeId(formData)

      if (result.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login successful",
        description: "Redirecting to your dashboard...",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("email", emailForm.email)
      formData.append("password", emailForm.password)

      const result = await loginWithEmail(formData)

      if (result.error) {
        toast({
          title: "Login failed",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Login successful",
        description: "Redirecting to your dashboard...",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8">
          <Image src="/logo.png" alt="LifeAndMedTech Accelerate Logo" width={150} height={50} className="h-auto" />
        </Link>
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to LifeAndMedTech</h1>
            <p className="text-muted-foreground">Sign in to your account or apply to join our team</p>
          </div>

          <Tabs defaultValue="employee" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="apply">Apply to Join</TabsTrigger>
            </TabsList>

            {/* Employee Login Tab */}
            <TabsContent value="employee" className="space-y-4">
              <form onSubmit={handleEmployeeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    placeholder="Enter your employee ID"
                    required
                    value={employeeForm.employeeId}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, employeeId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="employee-password">Password</Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="employee-password"
                    type="password"
                    required
                    value={employeeForm.password}
                    onChange={(e) => setEmployeeForm({ ...employeeForm, password: e.target.value })}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="employee-remember"
                    checked={employeeForm.rememberMe}
                    onCheckedChange={(checked) => setEmployeeForm({ ...employeeForm, rememberMe: checked as boolean })}
                  />
                  <Label htmlFor="employee-remember" className="text-sm font-normal">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Apply to Join Tab */}
            <TabsContent value="apply" className="space-y-4">
              <div className="text-center space-y-2">
                <h2 className="text-lg font-medium">Join Our Team</h2>
                <p className="text-sm text-muted-foreground">
                  Interested in joining LifeAndMedTech? Submit your application to get started.
                </p>
                <Button className="w-full mt-2" onClick={() => router.push("/auth/apply")}>
                  Apply Now
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-lg font-medium">Already Applied?</h2>
                <p className="text-sm text-muted-foreground">
                  If you've already submitted an application, you can check your status.
                </p>
                <Button variant="outline" className="w-full mt-2" onClick={() => setActiveTab("email")}>
                  Check Application Status
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

