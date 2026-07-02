import mongoose from "mongoose";

export async function connectDB() {

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: "ai_job_agent_db", // optional but safe
  });
}