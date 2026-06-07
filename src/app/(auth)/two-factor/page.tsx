"use client"

import { useState, useRef } from "react"
import { Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TwoFactorPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex min-h-screen bg-mufar-bg items-center justify-center p-8">
      <Card className="w-full max-w-md border-mufar-border bg-mufar-card shadow-lg">
        <CardHeader className="text-center pt-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mufar-accent mb-4 mx-auto">
            <Shield className="h-8 w-8 text-mufar-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-mufar-text">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-sm text-mufar-text-secondary mt-2">
            Enter the 6-digit code from your authenticator app.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8 px-8">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-lg font-semibold rounded-lg"
                />
              ))}
            </div>

            <Button className="w-full h-11 bg-mufar-primary text-white text-base font-medium rounded-lg">
              Verify
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-center text-sm">
              <button className="text-mufar-text-secondary hover:text-mufar-primary font-medium">
                Use recovery code
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
