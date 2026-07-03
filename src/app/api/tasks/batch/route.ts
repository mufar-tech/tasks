import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Task from "@/lib/models/Task"

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const { updates } = await req.json()

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json({ error: "Invalid updates payload" }, { status: 400 })
    }

    const operations = updates.map((u: { id: string; status: string }) => ({
      updateOne: {
        filter: { _id: u.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update: { $set: { status: u.status } } as any,
      },
    }))

    const result = await Task.bulkWrite(operations as any)

    return NextResponse.json({
      message: "Tasks updated successfully",
      count: result.modifiedCount,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to batch update tasks" }, { status: 500 })
  }
}
