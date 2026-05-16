import express from "express";
import { User } from "../models/User.js";
import Message from "../models/Message.js";
import Job from "../models/Job.js";
import { protect, adminOnly } from "../middleware/protect.js";

const router = express.Router();
router.use(protect, adminOnly);

// =================== NEWS ===================
router.post("/admin/news", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ success: false, message: "Title and description required" });
    await Message.create({ title, message: description });
    res.json({ success: true, message: "Announcement posted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/admin/news", async (req, res) => {
  try {
    const data = await Message.find({}).sort({ createdAt: -1 });
    res.json({ success: true, news: data });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.delete("/admin/news/:id", async (req, res) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "News not found" });
    res.json({ success: true, message: "News deleted" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =================== JOBS ===================
router.post("/admin/jobs", async (req, res) => {
  try {
    const { jobTitle, companyName, jobDescription, skillRequire, applyLink, lastDate } = req.body;
    if (!jobTitle || !companyName || !applyLink) return res.status(400).json({ success: false, message: "Required fields missing" });
    await Job.create({ jobTitle, companyName, jobDescription, skillRequire, applyLink, lastDate });
    res.json({ success: true, message: "Job posted successfully" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.delete("/admin/jobs/:id", async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =================== STUDENTS ===================
router.get("/admin/students", async (req, res) => {
  try {
    const { college, minQuestions, minActiveDays, search } = req.query;
    let query = { role: "Student" };
    if (college && college !== "All") query.college = college;
    if (Number(minQuestions) > 0) query.leetcodeSolved = { $gte: Number(minQuestions) };
    if (Number(minActiveDays) > 0) query.activeDays = { $gte: Number(minActiveDays) };
    if (search) query.fullName = { $regex: search, $options: "i" };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const students = await User.find(query).select("fullName college leetcodeSolved activeDays score email").sort({ score: -1 }).skip((page - 1) * limit).limit(limit);
    const total = await User.countDocuments(query);
    res.json({ success: true, students, total, totalPages: Math.ceil(total / limit), page });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.get("/admin/colleges", async (req, res) => {
  try {
    const colleges = await User.distinct("college", { role: "Student", college: { $ne: "" } });
    res.json({ success: true, colleges });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =================== LIST ALL ADMINS ===================
router.get("/admin/list-admins", async (req, res) => {
  try {
    const admins = await User.find({ role: "Admin" }).select("fullName email createdAt _id").sort({ createdAt: 1 });
    res.json({ success: true, admins });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =================== DELETE AN ADMIN ===================
router.delete("/admin/delete-admin/:id", async (req, res) => {
  try {
    const targetAdmin = await User.findById(req.params.id);
    if (!targetAdmin || targetAdmin.role !== "Admin") {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    // Prevent deleting your own account (compare by req.user.id from JWT)
    if (req.user.id === req.params.id) {
      return res.status(400).json({ success: false, message: "You cannot delete your own admin account" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Admin removed successfully" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
