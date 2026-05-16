import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ================= AUTH ================= */
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["Student", "Admin"],
      default: "Student"
    },

    /* ================= BASIC PROFILE ================= */
    firstName: String,
    lastName: String,
    bio: String,
    country: String,
    location: String,

    profileImage: {
      type: String,
      default: ""
    },

    /* ================= EDUCATION ================= */
    state: String,
    college: String,
    degree: String,
    branch: String,
    graduationYear: Number,
    cgpa: String,
    Profession : String,
    skills: {
      type: [String], 
      default: [] 
    },


    /* ================= USERNAMES ================= */
    leetcode: String,
    gfg: String,
    codeforces: String,
    codechef: String,

    githubUsername: String,

    /* ================= SOCIAL LINKS ================= */
    githubProfile: String,
    linkedinProfile: String,
    twitter: String,
    instagram: String,
    portfolioWebsite: String,

    /* ================= CODING STATS ================= */
    leetcodeSolved: {
      type: Number,
      default: 0
    },

    easy: {
      type: Number,
      default: 0
    },

    medium: {
      type: Number,
      default: 0
    },

    hard: {
      type: Number,
      default: 0
    },

    activeDays: {
      type: Number,
      default: 0
    },

    score: {
      type: Number,
      default: 0
    },

    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },

    scoreHistory: [{
      score: { type: Number },
      date: { type: Date, default: Date.now }
    }],

    /* ================= OTP (Forgot Password) ================= */
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    /* ================= CERTIFICATIONS ================= */
    certifications: [
      {
        title: String,
        organization: String,
        year: String,
        link: String
      }
    ],

    /* ================= CV ================= */
    cv: String,
    cvName: String,

    /* ================= SETTINGS ================= */
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public"
    },

    emailPreference: {
      type: Boolean,
      default: true
    },

    darkMode: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);
