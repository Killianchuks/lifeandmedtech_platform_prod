import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart4,
  FileCheck,
  Stethoscope,
  TrendingUp,
  Users,
  Microscope,
  FlaskRoundIcon as Flask,
  Zap,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LifeAndMedTech Accelerate Logo"
              width={70}
              height={24}
              className="h-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="#team"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Team
            </Link>
            <Link
              href="https://www.lifeandmedtech.com"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Main Website
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Join the Team</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Redesigned without the center image */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              LifeAndMedTech <span className="text-primary">Accelerate</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              A collaborative platform for team members to work together on innovative projects in life sciences and
              medical technology.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/register">
                  Join the Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>

            {/* Added benefits section with more artistic icons */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-all">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Microscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Streamlined Collaboration</h3>
                <p className="text-sm text-muted-foreground text-center">Connect across departments seamlessly</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-all">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Flask className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Centralized Resources</h3>
                <p className="text-sm text-muted-foreground text-center">All your tools and documents in one place</p>
              </div>
              <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-all">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Real-time Updates</h3>
                <p className="text-sm text-muted-foreground text-center">Stay informed with instant notifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Platform Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Collaborate Seamlessly Across Projects
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides powerful tools to help teams work together efficiently across different project
                areas.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart4 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Product Development</h3>
              <p className="text-center text-sm text-muted-foreground">
                Streamline your product development workflow with integrated tools and tracking.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-3">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Regulatory Affairs</h3>
              <p className="text-center text-sm text-muted-foreground">
                Manage compliance documentation and regulatory submissions efficiently.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-3">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Medical Communication</h3>
              <p className="text-center text-sm text-muted-foreground">
                Create and review medical content with collaborative editing tools.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Market Access</h3>
              <p className="text-center text-sm text-muted-foreground">
                Develop market strategies and analyze competitive landscapes together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Collaboration Section */}
      <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Team Collaboration
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Work Together Across Disciplines</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform breaks down silos between different project areas, enabling seamless collaboration
                  between team members with diverse expertise.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Join Our Team
                    <Users className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <div className="rounded-lg bg-background p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Cross-Project Teams</h3>
                        <p className="text-sm text-muted-foreground">Collaborate across disciplines</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-background p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Document Sharing</h3>
                        <p className="text-sm text-muted-foreground">Centralized document management</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-lg bg-background p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <BarChart4 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Project Tracking</h3>
                        <p className="text-sm text-muted-foreground">Real-time progress monitoring</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-background p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Analytics Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Data-driven insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Accelerate Your Projects?</h2>
              <p className="max-w-[600px] text-primary-foreground/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our collaborative platform and work with a team of experts in life sciences and medical technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/register">
                  Join the Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 LifeAndMedTech Accelerate. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="https://www.lifeandmedtech.com"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Main Website
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

