import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../components/cards/StatCard";
import SkeletonCard, { SkeletonRow } from "../components/ui/SkeletonCard";
import apiFetch from "../helper/api.js";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [leaderboardType, setLeaderboardType] = useState("global");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserEmail = user?.email?.toLowerCase() || "";

  useEffect(() => {
    if (!currentUserEmail) { setLoading(false); return; }
    apiFetch(`/api/dashboard?email=${currentUserEmail}`)
      .then(r => r.json())
      .then(data => setDashboard(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [currentUserEmail]);

  if (loading) return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0a0f24] via-[#0f1b33] to-[#091426] space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <SkeletonCard key={i} className="h-24" />)}
      </div>
      <SkeletonCard className="h-32" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => <SkeletonRow key={i} />)}
      </div>
    </div>
  );

  if (!dashboard) return <div className="h-screen w-full" />;

  const { stats, leaderboard, currentStudent } = dashboard;

  const filteredLeaderboard = (leaderboard[leaderboardType] || []).filter(u =>
    u.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const tabLabels = { global: "Global", leetcode: "LeetCode", activedays: "Active Days", certification: "Certifications" };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0a0f24] via-[#0f1b33] to-[#091426] text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO STATS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Students" value={stats.totalStudents} gradient="backdrop-blur-2xl bg-white/5 border border-white/10 text-slate-100 shadow-xl rounded-xl" />
          <StatCard title="Colleges" value={stats.colleges} gradient="backdrop-blur-2xl bg-white/5 border border-white/10 text-slate-100 shadow-xl rounded-xl" />
          <StatCard title="Top Score" value={stats.topScore} gradient="backdrop-blur-2xl bg-white/5 border border-white/10 text-slate-100 shadow-xl rounded-xl" />
        </motion.div>

        {/* CURRENT RANK */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-xl rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-300 mb-2">Your Current Rank</p>
              <h2 className="text-5xl font-extrabold text-emerald-400">
                {currentStudent?.rank ? `#${currentStudent.rank}` : "Not Ranked"}
              </h2>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-slate-300 mb-2">Total Score</p>
              <h2 className="text-4xl font-extrabold text-blue-400">{currentStudent?.score || 0}</h2>
            </div>
          </div>
        </motion.div>

        {/* LEADERBOARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-xl rounded-2xl p-6">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold">Student Leaderboard</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(tabLabels).map(([type, label]) => (
                <button key={type} onClick={() => setLeaderboardType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${leaderboardType === type ? "bg-blue-500 text-white shadow-lg scale-105" : "bg-white/10 text-slate-200 hover:bg-white/20"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search by name..."
              className="w-full sm:w-64 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-slate-100 placeholder-slate-400 focus:border-blue-400/40 focus:outline-none transition text-sm" />
          </div>

          <div className="space-y-3">
            {filteredLeaderboard.length === 0 ? (
              <p className="text-slate-400 text-center py-6">No students found</p>
            ) : filteredLeaderboard.map((u, index) => {
              const isCurrentUser = u.email?.toLowerCase() === currentUserEmail;
              return (
                <motion.div key={u._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-4 rounded-xl transition border ${isCurrentUser ? "bg-blue-900/30 border-blue-600 text-blue-300 shadow-lg" : "bg-white/5 border-white/10 text-slate-100 hover:bg-white/10"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-lg ${index < 3 ? "bg-transparent" : "bg-white/10 text-slate-100"}`}>
                      {index < 3 ? MEDALS[index] : index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{u.fullName}</p>
                      {isCurrentUser && <p className="text-xs text-blue-300 font-medium">You</p>}
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-lg text-lg font-bold bg-white/10 text-slate-100">
                    {leaderboardType === "global" && (u.score || 0)}
                    {leaderboardType === "leetcode" && (u.leetcodeSolved || 0)}
                    {leaderboardType === "activedays" && (u.activeDays || 0)}
                    {leaderboardType === "certification" && (u.certifications?.length || 0)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
