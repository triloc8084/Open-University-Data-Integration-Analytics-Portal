import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiFetch from "../helper/api.js";

export default function NewsPage() {
  const [adminMessages, setAdminMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("readNews") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    apiFetch("/admin/news")
      .then(r => r.json())
      .then(data => setAdminMessages(data.news || []))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = (id) => {
    const updated = readIds.includes(id) ? readIds : [...readIds, id];
    setReadIds(updated);
    localStorage.setItem("readNews", JSON.stringify(updated));
  };

  const markAllRead = () => {
    const all = adminMessages.map(m => m._id);
    setReadIds(all);
    localStorage.setItem("readNews", JSON.stringify(all));
  };

  const unreadCount = adminMessages.filter(m => !readIds.includes(m._id)).length;

  if (loading) return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17] space-y-4">
      {[1, 2, 3].map(i => <div key={i} className="animate-pulse h-28 rounded-2xl bg-white/5 border border-white/10" />)}
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17] text-slate-100">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">📢 Latest Announcements</h1>
          <p className="text-slate-300 text-sm mt-1">
            {unreadCount > 0 ? <span className="text-blue-400 font-medium">{unreadCount} unread</span> : "All caught up ✓"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {adminMessages.length === 0 ? (
          <p className="text-slate-400">No announcements yet</p>
        ) : adminMessages.map((item, i) => {
          const isRead = readIds.includes(item._id);
          return (
            <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`backdrop-blur-2xl border rounded-2xl p-6 shadow-xl transition duration-300 ${isRead ? "bg-white/3 border-white/5 opacity-60" : "bg-white/5 border-white/10 hover:border-blue-400/30 hover:bg-blue-500/10 hover:translate-x-1"}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {!isRead && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
                    <h2 className="text-lg font-semibold tracking-wide text-blue-300">{item.title}</h2>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{item.message}</p>
                </div>
                {!isRead && (
                  <button onClick={() => markAsRead(item._id)}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-blue-500/20 text-slate-300 hover:text-blue-300 transition">
                    Mark read
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
