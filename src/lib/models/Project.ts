import mongoose, { Schema, Document } from "mongoose"

export interface IProject extends Document {
  name: string
  description?: string
  owner: mongoose.Types.ObjectId
  team: mongoose.Types.ObjectId[]
  priority: "low" | "medium" | "high" | "critical"
  status: "active" | "on-hold" | "completed" | "archived"
  startDate?: Date
  endDate?: Date
  progress: number
  color: string
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: [{ type: Schema.Types.ObjectId, ref: "User" }],
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["active", "on-hold", "completed", "archived"],
      default: "active",
    },
    startDate: { type: Date },
    endDate: { type: Date },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    color: { type: String, default: "#2563EB" },
  },
  { timestamps: true }
)

export default (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema)
