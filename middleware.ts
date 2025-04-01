import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

// Initialize Prisma client
const prisma = new PrismaClient()

// Function to get user from session cookie
async function getSessionUserFromRequest(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value

  if (!sessionId) {
    return null
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    })

    if (!session || session.expiresAt < new Date()) {
      return null
    }

    return session.user
  } catch (error) {
    console.error("Error getting session user:", error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  try {
    const user = await getSessionUserFromRequest(request)

    // Check if the user is authenticated
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // Check if the route is an admin route
    if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
      // Only allow admins to access admin routes
      if (user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}

