import type { Metadata } from "next"
import AuthSessionProvider from "@/components/auth/session-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mufar Tasks - Enterprise Project Management",
  description: "Modern project management and team collaboration platform by Mufar Technologies",
  keywords: ["project management", "task management", "team collaboration", "Mufar Technologies"],
  icons: {
    icon: "/mufar_tasks_favicon.png",
    apple: "/mufar_tasks_favicon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-mufar-bg text-mufar-text font-sans">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  )
}
