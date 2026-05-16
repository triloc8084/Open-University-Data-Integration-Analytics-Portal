import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiFetch from "../helper/api.js";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch(`/profile/${username}`)
      .then(r => r.json())
      .then(data => {
        if (data.user) setProfile(data.user);
        else setError(data.message || "Profile not found");
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#091021] to-[#070B17]">
      <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#091021] to-[#070B17] text-slate-100">
      <div className="text-6xl mb-4">🔒</div>
      <h1 className="text-2xl font-bold mb-2">{error}</h1>
      <Link to="/login" className="text-blue-400 hover:underline">← Go to Login</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17] p-6 text-slate-100">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Header */}
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
            {profile.profileImage
              ? <img src={profile.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
              : profile.fullName?.charAt(0)?.toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold">{profile.fullName}</h1>
          <p className="text-slate-400 text-sm mt-1">{profile.college}</p>
          <p className="text-slate-300 text-sm mt-2">{profile.bio}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "LeetCode Solved", value: profile.leetcodeSolved || 0 },
            { label: "Active Days", value: profile.activeDays || 0 },
            { label: "Score", value: profile.score || 0 }
          ].map((s, i) => (
            <div key={i} className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        {profile.skills?.length > 0 && (
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {profile.certifications?.length > 0 && (
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Certifications</h2>
            <div className="space-y-3">
              {profile.certifications.map((cert, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-xs text-slate-400">{cert.organization} · {cert.year}</p>
                  </div>
                  {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">View →</a>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
