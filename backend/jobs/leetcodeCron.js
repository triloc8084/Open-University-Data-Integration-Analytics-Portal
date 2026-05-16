import cron from "node-cron";
import fetch from "node-fetch";
import { User } from "../models/User.js";

const refreshLeetcodeStats = async (username, user) => {
  try {
    const query = { query: `query { matchedUser(username: "${username}") { submitStats { acSubmissionNum { difficulty count } } submissionCalendar } }` };
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(query)
    });
    const data = await response.json();
    const stats = data.data?.matchedUser?.submitStats?.acSubmissionNum || [];
    const easy = stats.find(s => s.difficulty === "Easy")?.count || 0;
    const medium = stats.find(s => s.difficulty === "Medium")?.count || 0;
    const hard = stats.find(s => s.difficulty === "Hard")?.count || 0;
    const totalQuestions = stats.find(s => s.difficulty === "All")?.count || 0;
    const calendar = JSON.parse(data.data?.matchedUser?.submissionCalendar || "{}");
    const totalActiveDays = Object.keys(calendar).length;
    const score = easy + medium * 2 + hard * 3 + totalActiveDays;

    // Update streak
    const today = new Date().toISOString().split("T")[0];
    const timestamps = Object.keys(calendar).map(ts => new Date(ts * 1000).toISOString().split("T")[0]);
    const submittedToday = timestamps.includes(today);
    const newStreak = submittedToday ? (user.currentStreak || 0) + 1 : 0;
    const bestStreak = Math.max(newStreak, user.bestStreak || 0);

    user.leetcodeSolved = totalQuestions;
    user.easy = easy; user.medium = medium; user.hard = hard;
    user.activeDays = totalActiveDays; user.score = score;
    user.currentStreak = newStreak;
    user.bestStreak = bestStreak;
    if (!user.scoreHistory) user.scoreHistory = [];
    user.scoreHistory.push({ score, date: new Date() });
    if (user.scoreHistory.length > 90) user.scoreHistory.shift();
    await user.save();
    console.log(`[Cron] Updated: ${username} — Score: ${score}`);
  } catch (err) {
    console.log(`[Cron] Failed for ${username}: ${err.message}`);
  }
};

// Run every day at 2 AM
cron.schedule("0 2 * * *", async () => {
  console.log("[Cron] Starting daily LeetCode refresh...");
  try {
    const students = await User.find({ role: "Student", leetcode: { $nin: [null, ""] } });
    for (const student of students) {
      await refreshLeetcodeStats(student.leetcode, student);
      await new Promise(r => setTimeout(r, 1000)); // 1s delay between requests
    }
    console.log(`[Cron] Done — refreshed ${students.length} students`);
  } catch (err) {
    console.log("[Cron] Error:", err.message);
  }
});

export { refreshLeetcodeStats };
