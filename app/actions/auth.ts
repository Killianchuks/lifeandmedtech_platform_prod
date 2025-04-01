"use server"

import { z } from "zod"
import {
  getUserByEmail,
  getUserByEmployeeId,
  verifyPassword,
  createSession,
  logout as logoutUser,
  createApplication,
} from "@/lib/auth"

// Employee login schema
const employeeLoginSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  password: z.string().min(1, "Password is required"),
})

// Email login schema
const emailLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

// Application schema
const applicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  resumeUrl: z.string().min(1, "Resume is required"),
  projectArea: z.string().min(1, "Project area is required"),
  experience: z.string().min(1, "Experience is required"),
})

export async function loginWithEmployeeId(formData: FormData) {
  const validatedFields = employeeLoginSchema.safeParse({
    employeeId: formData.get("employeeId"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { employeeId, password } = validatedFields.data

  try {
    // This ensures only employee IDs in the database can log in
    const user = await getUserByEmployeeId(employeeId)

    if (!user) {
      return {
        error: "Invalid credentials",
      }
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return {
        error: "Invalid credentials",
      }
    }

    await createSession(user.id)

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        projectArea: user.projectArea || undefined,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "An unexpected error occurred",
    }
  }
}

export async function loginWithEmail(formData: FormData) {
  const validatedFields = emailLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return {
        error: "Invalid credentials",
      }
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return {
        error: "Invalid credentials",
      }
    }

    await createSession(user.id)

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        projectArea: user.projectArea || undefined,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      error: "An unexpected error occurred",
    }
  }
}

export async function logout() {
  try {
    await logoutUser()
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return {
      error: "An unexpected error occurred",
    }
  }
}

export async function submitApplication(formData: FormData) {
  // Get the resume file
  const resumeFile = formData.get("resume") as File

  // In a real app, you would upload this file to a storage service
  // and get back a URL. For this example, we'll simulate that.
  const resumeUrl = `/uploads/${resumeFile.name}`

  const validatedFields = applicationSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    resumeUrl,
    projectArea: formData.get("projectArea"),
    experience: formData.get("experience"),
  })

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // Check if user with this email already exists
    const existingUser = await getUserByEmail(validatedFields.data.email)

    if (existingUser) {
      return {
        error: "A user with this email already exists",
      }
    }

    await createApplication(validatedFields.data)

    return { success: true }
  } catch (error) {
    console.error("Application submission error:", error)
    return {
      error: "An unexpected error occurred",
    }
  }
}

