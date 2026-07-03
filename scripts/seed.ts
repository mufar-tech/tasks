import mongoose from "mongoose"

const MONGODB_URI = "mongodb+srv://mufar_centralenterprises_06:mufarcentralenterprises06@cluster0.7wig4da.mongodb.net/mufar_tasks?retryWrites=true&w=majority"

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log("Connected to MongoDB")

  const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    image: { type: String },
    role: { type: String, enum: ["owner", "admin", "manager", "member", "guest"], default: "member" },
    emailVerified: { type: Date },
  }, { timestamps: true }))

  const bcrypt = require("bcryptjs")

  const users = [
    { name: "Alex Morgan", email: "alex@mufartech.com", password: "Admin@123", role: "owner" },
    { name: "Sarah Chen", email: "sarah@mufartech.com", password: "Sarah@123", role: "admin" },
    { name: "Marcus Johnson", email: "marcus@mufartech.com", password: "Marcus@123", role: "manager" },
    { name: "Emily Rodriguez", email: "emily@mufartech.com", password: "Emily@123", role: "member" },
    { name: "David Kim", email: "david@mufartech.com", password: "David@123", role: "member" },
    { name: "Lisa Thompson", email: "lisa@mufartech.com", password: "Lisa@123", role: "member" },
    { name: "James Wilson", email: "james@mufartech.com", password: "James@123", role: "member" },
    { name: "Nina Patel", email: "nina@mufartech.com", password: "Nina@123", role: "manager" },
  ]

  for (const u of users) {
    const existing = await User.findOne({ email: u.email })
    if (existing) {
      console.log(`User ${u.email} already exists, skipping`)
      continue
    }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(u.password, salt)
    await User.create({ ...u, password: hashed, emailVerified: new Date() })
    console.log(`Created user: ${u.email}`)
  }

  console.log("\nSeed complete! You can login with:")
  console.log("  Email: alex@mufartech.com")
  console.log("  Password: Admin@123")
  console.log("\nOr any of the other users created above.")

  await mongoose.disconnect()
}

seed().catch((e) => {
  console.error("Seed failed:", e)
  process.exit(1)
})
