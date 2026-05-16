import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  skillRequire: {
    type: [String],
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  lastDate: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Job", jobSchema);
