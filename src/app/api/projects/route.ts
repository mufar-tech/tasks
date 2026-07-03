import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Project from "@/lib/models/Project"
import Activity from "@/lib/models/Activity"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const projects = await Project.find({
      $or: [{ owner: session.user.id }, { team: session.user.id }],
    })
      .populate("owner", "name email image")
      .populate("team", "name email image")
      .sort({ createdAt: -1 })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const body = await req.json()
    const project = await Project.create({
      ...body,
      owner: session.user.id,
    })

    await Activity.create({
      user: session.user.id,
      action: "created project",
      target: project.name,
      type: "project",
      projectId: project._id,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
