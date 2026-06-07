"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
        <CardContent className="px-0 pt-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mufar-success/10 mb-6">
            <CheckCircle2 className="h-8 w-8 text-mufar-success" />
          </div>
          <h2 className="text-2xl font-bold text-mufar-text mb-2">Check your email</h2>
          <p className="text-mufar-text-secondary text-sm mb-6">
            We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </p>
          <Button
            variant="outline"
            className="rounded-lg"
            onClick={() => setSubmitted(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to reset
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-3xl font-bold text-mufar-text">Forgot password?</CardTitle>
        <CardDescription className="text-base text-mufar-text-secondary mt-2">
          No worries. Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-mufar-text">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mufar-text-secondary" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="pl-10 h-11 rounded-lg"
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-11 bg-mufar-primary text-white text-base font-medium rounded-lg">
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/login" className="inline-flex items-center text-mufar-text-secondary hover:text-mufar-primary font-medium">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
