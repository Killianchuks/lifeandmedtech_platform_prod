import type { NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getSessionUserFromRequest(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value

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

  return session.user
}

