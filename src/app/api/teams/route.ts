import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Team from "@/lib/models/Team"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const teams = await Team.find().populate("members", "name email image").sort({ createdAt: -1 })

    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const body = await req.json()
    const team = await Team.create({
      name: body.name,
      description: body.description,
      members: body.members || [],
      createdBy: session.user.id,
    })

    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 })
  }
}
