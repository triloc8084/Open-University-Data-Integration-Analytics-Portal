/**
 * DATABASE CLEANUP SCRIPT
 * ========================
 * Deletes ALL test/sample data while keeping Admin accounts intact.
 *
 * Deletes:
 *   - All Student user accounts
 *   - All News/Announcements (Messages)
 *   - All Job postings
 *   - All Feedback submissions
 *
 * Keeps:
 *   - All Admin accounts (role = "Admin")
 *
 * Run with:
 *   node scripts/cleanDatabase.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import Message from "../models/Message.js";
import Job from "../models/Job.js";
import Feedback from "../models/Feedback.js";

import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌  No MongoDB URI found. Check MONGODB_URI in backend/.env");
  process.exit(1);
}

console.log("\n🔄  Connecting to database...");

mongoose.connect(MONGO_URI).then(async () => {
  console.log("✅  Connected.\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("   DATABASE CLEANUP — Starting...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // ─── Show what will be deleted ────────────────────────────────────
  const admins   = await User.countDocuments({ role: "Admin" });
  const students = await User.countDocuments({ role: "Student" });
  const news     = await Message.countDocuments();
  const jobs     = await Job.countDocuments();
  let   feedback = 0;
  try { feedback = await Feedback.countDocuments(); } catch { }

  console.log("📊  Current counts:");
  console.log(`    Admins (KEPT):       ${admins}`);
  console.log(`    Students (deleted):  ${students}`);
  console.log(`    News (deleted):      ${news}`);
  console.log(`    Jobs (deleted):      ${jobs}`);
  console.log(`    Feedback (deleted):  ${feedback}\n`);

  if (students + news + jobs + feedback === 0) {
    console.log("✨  Database is already clean! Nothing to delete.\n");
    await mongoose.disconnect();
    process.exit(0);
  }

  // ─── Delete all test/sample data ──────────────────────────────────
  const delStudents = await User.deleteMany({ role: "Student" });
  const delNews     = await Message.deleteMany({});
  const delJobs     = await Job.deleteMany({});
  let   delFeedback = { deletedCount: 0 };
  try { delFeedback = await Feedback.deleteMany({}); } catch { }

  // ─── Summary ──────────────────────────────────────────────────────
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("   CLEANUP COMPLETE ✅");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log(`🗑   Students removed:  ${delStudents.deletedCount}`);
  console.log(`🗑   News removed:      ${delNews.deletedCount}`);
  console.log(`🗑   Jobs removed:      ${delJobs.deletedCount}`);
  console.log(`🗑   Feedback removed:  ${delFeedback.deletedCount}`);

  // Show remaining admins
  const remainingAdmins = await User.find({ role: "Admin" }).select("fullName email");
  console.log(`\n👑  Admin accounts KEPT (${remainingAdmins.length}):`);
  remainingAdmins.forEach(a => console.log(`    • ${a.fullName} <${a.email}>`));

  console.log("\n🏁  Database is now clean and ready for real users.\n");
  await mongoose.disconnect();
  process.exit(0);

}).catch(err => {
  console.error("❌  Failed to connect:", err.message);
  process.exit(1);
});
