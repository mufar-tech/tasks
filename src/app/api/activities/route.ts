import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Activity from "@/lib/models/Activity"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit") || "20")
    const projectId = searchParams.get("projectId")

    const filter: Record<string, unknown> = {}
    if (projectId) filter.projectId = projectId

    const activities = await Activity.find(filter)
      .populate("user", "name email image")
      .sort({ createdAt: -1 })
      .limit(Math.min(limit, 100))

    return NextResponse.json(activities)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const body = await req.json()
    const activity = await Activity.create({
      user: session.user.id,
      ...body,
    })

    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 })
  }
}
