import express from "express";
import Feedback from "../models/Feedback.js";
import Job from "../models/Job.js";
import { protect, adminOnly } from "../middleware/protect.js";

const router = express.Router();

// =================== GET JOBS (all users) ===================
router.get("/jobs", protect, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// =================== FEEDBACK ===================
router.post("/feedback", protect, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Feedback.create({ name, email, feedback: message });
    res.json({ success: true, msg: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.get("/feedback", protect, adminOnly, async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ _id: -1 });
    res.json({ success: true, feedback });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
