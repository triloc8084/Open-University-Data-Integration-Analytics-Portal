import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import apiFetch from "../../helper/api.js";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    apiFetch("/api/dashboard")
      .then(res => res.json())
      .then(data => setDashboard(data))
      .catch(err => console.log("Dashboard error:", err));

    apiFetch("/feedback")
      .then(res => res.json())
      .then(data => setFeedbacks(data.feedback || []))
      .catch(err => console.log("Feedback error:", err));
  }, []);

  if (!dashboard) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  /* ================= STATS ================= */
  const stats = [
    { title: "Total Students", value: dashboard.stats.totalStudents },
    { title: "Colleges", value: dashboard.stats.colleges },
    { title: "Top Score", value: dashboard.stats.topScore },
    { title: "Active Students", value: dashboard.leaderboard.activedays.length }
  ];

  /* ================= DIFFICULTY ================= */
  const difficultyData = [
    {
      name: "Easy",
      value: dashboard.leaderboard.leetcode.reduce((s, u) => s + (u.easy || 0), 0)
    },
    {
      name: "Medium",
      value: dashboard.leaderboard.leetcode.reduce((s, u) => s + (u.medium || 0), 0)
    },
    {
      name: "Hard",
      value: dashboard.leaderboard.leetcode.reduce((s, u) => s + (u.hard || 0), 0)
    }
  ];

  /* ================= ACTIVE DAYS ================= */
  const activeDaysData = dashboard.leaderboard.activedays.map(u => ({
    name: u.fullName.split(" ")[0],
    days: u.activeDays
  }));

  /* ================= COLLEGE RANKING ================= */
  const collegeMap = {};
  dashboard.leaderboard.global.forEach(u => {
    if (!collegeMap[u.college]) collegeMap[u.college] = 0;
    collegeMap[u.college] += u.score || 0;
  });

  const collegeRanking = Object.entries(collegeMap)
    .map(([college, score]) => ({ college, score }))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <h1 className="text-3xl font-semibold">Dashboard</h1>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#0F1624] border border-[#1D2533] rounded-xl p-6 shadow-sm"
            >
              <p className="text-sm text-gray-400">{s.title}</p>
              <h3 className="text-3xl font-bold mt-2">
                {s.value}
              </h3>
            </div>
          ))}
        </div>

        {/* ================= DIFFICULTY ================= */}
        <div className="bg-[#0F1624] border border-[#1D2533] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Question Difficulty</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={difficultyData}>
              <XAxis stroke="#94A3B8" dataKey="name" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: "#0F1624", borderRadius: 8 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= ACTIVE DAYS + TECH ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ACTIVE DAYS */}
          <div className="bg-[#0F1624] border border-[#1D2533] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Student Active Days</h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activeDaysData}>
                <XAxis stroke="#94A3B8" dataKey="name" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ background: "#0F1624", borderRadius: 8 }} />
                <Bar dataKey="days" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TECH USAGE */}
          <div className="bg-[#0F1624] border border-[#1D2533] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">
              Technology Usage
            </h3>

            {[ 
              { name: "React", percent: 75 },
              { name: "Node", percent: 68 },
              { name: "MongoDB", percent: 62 },
              { name: "Java", percent: 55 },
              { name: "Python", percent: 50 }
            ].map((t, i) => (
              <div key={i} className="mb-5">
                <div className="flex justify-between text-sm mb-1 text-gray-300">
                  <span>{t.name}</span>
                  <span>{t.percent}%</span>
                </div>
                <div className="h-2 bg-[#1A2332] rounded">
                  <div
                    className="h-full bg-indigo-500 rounded"
                    style={{ width: `${t.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ================= COLLEGE RANKING ================= */}
        <div className="bg-[#0F1624] border border-[#1D2533] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            College Rankings
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={collegeRanking}>
              <XAxis stroke="#94A3B8" dataKey="college" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: "#0F1624", borderRadius: 8 }} />
              <Bar dataKey="score" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ================= FEEDBACK ================= */}
        <div className="bg-[#0F1624] border border-[#1D2533] rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Student Feedback
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {feedbacks.map((f, i) => (
              <div
                key={i}
                className="border border-[#1D2533] rounded-lg p-4 bg-[#0B121F]"
              >
                <p className="font-semibold text-lg text-blue-400">
                  {f.name}
                </p>
                <p className="text-gray-300 mt-1 text-sm leading-relaxed">
                  {f.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
