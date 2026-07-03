import mongoose, { Schema, Document } from "mongoose"

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  read: boolean
  type: "assigned" | "due-date" | "comment" | "mention" | "update"
  projectId?: mongoose.Types.ObjectId
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  read: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ["assigned", "due-date", "comment", "mention", "update"],
    required: true,
  },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  createdAt: { type: Date, default: Date.now },
})

export default (mongoose.models.Notification as mongoose.Model<INotification>) ||
  mongoose.model<INotification>("Notification", NotificationSchema)
