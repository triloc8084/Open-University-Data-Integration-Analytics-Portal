import mongoose from "mongoose";
import { connectDB } from "./db.js";
import Job from "./models/Job.js";
import Message from "./models/Message.js";

const seedData = async () => {
  // Ensure we are connected to the DB
  await connectDB();

  try {
    // Add Jobs
    const jobs = [
      {
        jobTitle: "Software Engineer",
        companyName: "Google",
        jobDescription: "We are looking for a Software Engineer to join our team.",
        skillRequire: ["React", "Node.js", "MongoDB"],
        applyLink: "https://careers.google.com",
        lastDate: "2026-06-30"
      },
      {
        jobTitle: "Frontend Developer",
        companyName: "Microsoft",
        jobDescription: "Looking for a React developer.",
        skillRequire: ["React", "TypeScript", "CSS"],
        applyLink: "https://careers.microsoft.com",
        lastDate: "2026-07-15"
      }
    ];

    await Job.insertMany(jobs);
    console.log("Jobs seeded");

    // Add Announcements
    const announcements = [
      {
        title: "Welcome to the Portal",
        message: "We are excited to have you here. Explore the features and track your skills."
      },
      {
        title: "Upcoming Placement Drive",
        message: "A placement drive is scheduled for next week. Make sure your profile is updated."
      }
    ];

    await Message.insertMany(announcements);
    console.log("Announcements seeded");

    console.log("Data seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
