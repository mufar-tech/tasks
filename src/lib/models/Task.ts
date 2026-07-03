import mongoose, { Schema, Document } from "mongoose"

export interface ITask extends Document {
  title: string
  description?: string
  status: "backlog" | "to-do" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "critical"
  assignee?: mongoose.Types.ObjectId
  reporter?: mongoose.Types.ObjectId
  tags: string[]
  dueDate?: Date
  attachments: number
  comments: number
  projectId: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["backlog", "to-do", "in-progress", "review", "completed"],
      default: "backlog",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    reporter: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String }],
    dueDate: { type: Date },
    attachments: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
)

export default (mongoose.models.Task as mongoose.Model<ITask>) ||
  mongoose.model<ITask>("Task", TaskSchema)
