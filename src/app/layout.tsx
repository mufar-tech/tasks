import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mufar Tasks - Enterprise Project Management",
  description: "Modern project management and team collaboration platform by Mufar Technologies",
  keywords: ["project management", "task management", "team collaboration", "Mufar Technologies"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-mufar-bg text-mufar-text font-sans">
        {children}
      </body>
    </html>
  )
}
