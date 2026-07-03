import mongoose, { Schema, Document } from "mongoose"

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId
  action: string
  target: string
  type: "task" | "project" | "comment" | "team" | "mention"
  projectId?: mongoose.Types.ObjectId
  taskId?: mongoose.Types.ObjectId
  createdAt: Date
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  type: {
    type: String,
    enum: ["task", "project", "comment", "team", "mention"],
    required: true,
  },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" },
  taskId: { type: Schema.Types.ObjectId, ref: "Task" },
  createdAt: { type: Date, default: Date.now },
})

export default (mongoose.models.Activity as mongoose.Model<IActivity>) ||
  mongoose.model<IActivity>("Activity", ActivitySchema)
