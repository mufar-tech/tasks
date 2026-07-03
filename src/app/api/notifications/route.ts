import { connectDB } from "@/lib/db"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import Notification from "@/lib/models/Notification"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const notifications = await Notification.find({ userId: session.user.id })
      .sort({ createdAt: -1 })

    const unreadCount = await Notification.countDocuments({ userId: session.user.id, read: false })

    return NextResponse.json({ notifications, unreadCount })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()

    const body = await req.json()

    if (body.all) {
      await Notification.updateMany(
        { userId: session.user.id, read: false },
        { $set: { read: true } }
      )
      return NextResponse.json({ message: "All notifications marked as read" })
    }

    if (Array.isArray(body.ids) && body.ids.length > 0) {
      await Notification.updateMany(
        { _id: { $in: body.ids }, userId: session.user.id },
        { $set: { read: true } }
      )
      return NextResponse.json({ message: "Notifications marked as read" })
    }

    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 })
  }
}
