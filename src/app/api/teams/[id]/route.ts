import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Team from "@/lib/models/Team"

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const body = await req.json()
    const updateData: Record<string, unknown> = {}
    if (body.name !== undefined) updateData.name = body.name
    if (body.description !== undefined) updateData.description = body.description
    if (body.members !== undefined) updateData.members = body.members
    const team = await Team.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate("members", "name email image")
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 })
    return NextResponse.json(team)
  } catch {
    return NextResponse.json({ error: "Failed to update team" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    await connectDB()
    const team = await Team.findByIdAndDelete(id)
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 })
    return NextResponse.json({ message: "Team deleted successfully" })
  } catch {
    return NextResponse.json({ error: "Failed to delete team" }, { status: 500 })
  }
}
