import { Box } from "lucide-react"
import LoginForm from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-mufar-bg">
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-mufar-primary via-mufar-primary/80 to-mufar-secondary items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-8">
            <Box className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Mufar Tasks</h1>
          <p className="text-xl text-white/80 font-medium mb-2">Enterprise Project Management</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Streamline your workflow, collaborate seamlessly, and deliver projects on time with Mufar&apos;s powerful project management platform.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  )
}
