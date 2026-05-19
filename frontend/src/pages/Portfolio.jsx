import { useEffect, useState } from "react";

import ProfileCard from "../components/cards/ProfileCard";
import CertificationCard from "../components/cards/CertificationCard";
import StatCard from "../components/cards/StatCard";
import SkillsCard from "../components/cards/SkillsCard";
import DsaAnalysisCard from "../components/cards/DsaAnalysisCard";
import DigitalClock from "../components/cards/DigitalClock";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [difficulty, setDifficulty] = useState({ easy: 0, medium: 0, hard: 0 });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.leetcode) {
      setLoading(false);
      return;
    }

   if (user?.skills) {
    const skillString = Array.isArray(user.skills)
      ? user.skills.join(",")            
      : user.skills;                  

    setSkills(
      skillString
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
    );
  }


    async function loadStats() {
      try {
        const { BASE_URL } = await import("../helper/api");
        const res = await fetch(`${BASE_URL}/leetcode/${user.leetcode}`);
        const data = await res.json();

        setTotalQuestions(data.totalQuestions || 0);
        setTotalActiveDays(data.totalActiveDays || 0);
        setDifficulty({
          easy: data.easy || 0,
          medium: data.medium || 0,
          hard: data.hard || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-blue-200/60 text-sm tracking-wide">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17] p-6 text-slate-100">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-12 gap-6">

          {/* LEFT - Profile Card */}
          <div className="col-span-12 lg:col-span-3">
            <ProfileCard />
          </div>

          {/* RIGHT - Stats & Cards */}
          <div className="col-span-12 lg:col-span-9 space-y-6">

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <StatCard
                title="Questions Solved"
                value={totalQuestions}
                subtitle="LeetCode"
                gradient="backdrop-blur-2xl bg-white/5 border border-blue-400/20 shadow-xl shadow-blue-500/5 rounded-xl"
              />

              <StatCard
                title="Active Days"
                value={totalActiveDays}
                subtitle="Last 1 Year"
                gradient="backdrop-blur-2xl bg-white/5 border border-emerald-400/20 shadow-xl shadow-emerald-500/5 rounded-xl"
              />

              <DigitalClock />

            </div>

            {/* DSA Analysis */}
            <DsaAnalysisCard difficulty={difficulty} />

            {/* Skills */}
            <SkillsCard skills={skills} />

            {/* Certifications */}
            <CertificationCard />

          </div>
        </div>

      </div>
    </div>
  );
}
