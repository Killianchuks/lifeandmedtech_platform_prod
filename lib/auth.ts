import { PrismaClient } from "@prisma/client"
import { compare, hash } from "bcryptjs"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

// Session duration in seconds (7 days)
const SESSION_DURATION = 7 * 24 * 60 * 60

export async function createUser(data: {
  name: string
  email: string
  password: string
  employeeId?: string
  role?: "ADMIN" | "TEAM_LEAD" | "TEAM_MEMBER"
  projectArea?: string
}) {
  const hashedPassword = await hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      employeeId: data.employeeId,
      role: data.role ? data.role : "TEAM_MEMBER",
      projectArea: data.projectArea,
    },
  })

  // If the user is a team lead, create a TeamLead record
  if (data.role === "TEAM_LEAD") {
    await prisma.teamLead.create({
      data: {
        userId: user.id,
        department: data.projectArea || "General",
      },
    })
  }

  // If the user is a team member, create a TeamMember record
  if (data.role === "TEAM_MEMBER") {
    await prisma.teamMember.create({
      data: {
        userId: user.id,
      },
    })
  }

  return user
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function getUserByEmployeeId(employeeId: string) {
  return prisma.user.findUnique({
    where: { employeeId },
  })
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

export async function createSession(userId: string) {
  // Clear any existing sessions for this user
  await prisma.session.deleteMany({
    where: { userId },
  })

  const sessionId = uuidv4()
  const expiresAt = new Date(Date.now() + SESSION_DURATION * 1000)

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
    },
  })

  // Return the session with ID and expiration for cookie setting
  return {
    id: sessionId,
    expiresAt,
    session,
  }
}

export async function getSessionById(sessionId: string) {
  if (!sessionId) {
    return null
  }

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session
}

export async function deleteSession(sessionId: string) {
  if (sessionId) {
    await prisma.session.delete({
      where: { id: sessionId },
    })
  }
}

export async function createApplication(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  resumeUrl: string
  projectArea: string
  experience: string
}) {
  return prisma.application.create({
    data,
  })
}

export async function approveApplication(applicationId: string, employeeId: string, role: "TEAM_LEAD" | "TEAM_MEMBER") {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  })

  if (!application) {
    throw new Error("Application not found")
  }

  // Create a password hash (temporary password)
  const tempPassword = `temp${Math.random().toString(36).slice(2, 10)}`
  const hashedPassword = await hash(tempPassword, 10)

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: `${application.firstName} ${application.lastName}`,
      email: application.email,
      password: hashedPassword,
      employeeId,
      role,
      projectArea: application.projectArea,
    },
  })

  // Create role-specific record
  if (role === "TEAM_LEAD") {
    await prisma.teamLead.create({
      data: {
        userId: user.id,
        department: application.projectArea,
      },
    })
  } else {
    await prisma.teamMember.create({
      data: {
        userId: user.id,
      },
    })
  }

  // Update the application
  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "APPROVED",
      userId: user.id,
    },
  })

  // In a real app, you would send an email with password reset instructions
  return { user, tempPassword }
}

// Helper function to hash passwords for creating users
export async function hashPassword(password: string) {
  return hash(password, 10)
}

// Function to check if a user exists by employee ID
export async function checkEmployeeIdExists(employeeId: string) {
  const user = await prisma.user.findUnique({
    where: { employeeId },
  })
  return !!user
}

// Function to get all users (for admin purposes)
export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      employeeId: true,
      role: true,
      projectArea: true,
      createdAt: true,
      isActive: true,
    },
  })
}

