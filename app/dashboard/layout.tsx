"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Settings,
  Bell,
  BarChart4,
  Briefcase,
  FileCheck,
  Stethoscope,
  TrendingUp,
  CalendarRange,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ProfileSettingsButton } from "@/components/profile-settings-button"
import { ErrorBoundary } from "@/components/error-boundary"

// Create a context for user data
type UserContextType = {
  user: {
    name: string
    email: string
    avatar: string
    role: string
    projectArea: string
  }
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  // Mock user data - in a real app, this would come from an auth context or API
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Team Member",
    projectArea: "Product Development",
  })

  const logout = () => {
    // In a real app, this would handle logout logic
    console.log("Logging out...")

    // Note: We're not clearing the rememberedEmail from localStorage
    // This allows the email to be pre-filled when the user logs in again

    // Then redirect to home page
    router.push("/")
  }

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <UserContext.Provider value={{ user, logout }}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="border-b">
              <Link href="/" className="flex items-center px-2">
                <Image
                  src="/logo.png"
                  alt="LifeAndMedTech Accelerate Logo"
                  width={70}
                  height={24}
                  className="h-auto"
                  priority
                />
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
                        <Link href="/dashboard">
                          <Home className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard/projects"} tooltip="Projects">
                        <Link href="/dashboard/projects">
                          <Briefcase className="h-4 w-4" />
                          <span>Projects</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard/team"} tooltip="Team">
                        <Link href="/dashboard/team">
                          <Users className="h-4 w-4" />
                          <span>Team</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard/documents"} tooltip="Documents">
                        <Link href="/dashboard/documents">
                          <FileText className="h-4 w-4" />
                          <span>Documents</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard/messages"} tooltip="Messages">
                        <Link href="/dashboard/messages">
                          <MessageSquare className="h-4 w-4" />
                          <span>Messages</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard/calendar"} tooltip="Calendar">
                        <Link href="/dashboard/calendar">
                          <Calendar className="h-4 w-4" />
                          <span>Calendar</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === "/dashboard/calendar-settings"}
                        tooltip="Calendar Settings"
                      >
                        <Link href="/dashboard/calendar-settings">
                          <CalendarRange className="h-4 w-4" />
                          <span>Calendar Settings</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin"} tooltip="Admin Dashboard">
                        <Link href="/dashboard/admin">
                          <Settings className="h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Project Areas</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={user.projectArea === "Product Development"}
                        tooltip="Product Development"
                      >
                        <Link href="/dashboard/project-areas/product-development">
                          <BarChart4 className="h-4 w-4" />
                          <span>Product Development</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={user.projectArea === "Regulatory Affairs"}
                        tooltip="Regulatory Affairs"
                      >
                        <Link href="/dashboard/project-areas/regulatory-affairs">
                          <FileCheck className="h-4 w-4" />
                          <span>Regulatory Affairs</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={user.projectArea === "Medical Communication"}
                        tooltip="Medical Communication"
                      >
                        <Link href="/dashboard/project-areas/medical-communication">
                          <Stethoscope className="h-4 w-4" />
                          <span>Medical Communication</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={user.projectArea === "Market Access"}
                        tooltip="Market Access"
                      >
                        <Link href="/dashboard/project-areas/market-access">
                          <TrendingUp className="h-4 w-4" />
                          <span>Market Access</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="flex flex-col min-h-screen">
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                <SidebarTrigger />
                <div className="flex flex-1 items-center justify-between">
                  <Link href="/" className="hover:opacity-90 transition-opacity">
                    <Image
                      src="/logo.png"
                      alt="LifeAndMedTech Accelerate Logo"
                      width={70}
                      height={24}
                      className="h-auto"
                    />
                  </Link>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon">
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Notifications</span>
                    </Button>
                    <ProfileSettingsButton
                      user={{
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                        role: user.role,
                      }}
                    />
                  </div>
                </div>
              </header>
              <ErrorBoundary>
                <main className="flex-1 p-6">{children}</main>
              </ErrorBoundary>
              <footer className="border-t py-4 px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    © 2025 LifeAndMedTech Accelerate. All rights reserved.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Logged in as:</span>
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge variant="outline">{user.projectArea}</Badge>
                  </div>
                </div>
              </footer>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </UserContext.Provider>
  )
}

