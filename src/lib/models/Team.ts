import mongoose, { Schema, Document } from "mongoose"

export interface ITeam extends Document {
  name: string
  description?: string
  members: mongoose.Types.ObjectId[]
  createdBy?: mongoose.Types.ObjectId
  createdAt: Date
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
})

export default (mongoose.models.Team as mongoose.Model<ITeam>) ||
  mongoose.model<ITeam>("Team", TeamSchema)
