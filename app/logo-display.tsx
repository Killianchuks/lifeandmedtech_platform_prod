"use client"

import Image from "next/image"
import Link from "next/link"

export default function LogoDisplay() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Link href="/" className="mb-8">
        <Image src="/logo.png" alt="LifeAndMedTech Accelerate Logo" width={180} height={60} className="h-auto" />
      </Link>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">LifeAndMedTech Accelerate</h1>
        <p className="text-xl text-muted-foreground mb-8">Collaborative Innovation Hub</p>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-primary hover:underline">
            Dashboard
          </Link>
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
          <Link href="/auth/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

