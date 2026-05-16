import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function PostNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try {
      const res = await apiFetch("/admin/news");
      const data = await res.json();
      setNewsList(data.news || []);
    } catch { toast.error("Failed to load news"); }
  };

  const handlePost = async () => {
    if (!title || !description) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    try {
      const res = await apiFetch("/admin/news", { method: "POST", body: JSON.stringify({ title, description }) });
      const data = await res.json();
      toast.success(data.message);
      setTitle(""); setDescription("");
      fetchNews();
    } catch { toast.error("Something went wrong"); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      const res = await apiFetch(`/admin/news/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { toast.success("Deleted"); setNewsList(prev => prev.filter(n => n._id !== id)); }
    } catch { toast.error("Delete failed"); }
  };

  const inputCls = "w-full p-3 bg-[#111827] border border-[#1F2937] rounded-xl text-slate-200 focus:border-blue-500 focus:outline-none";

  return (
    <div className="space-y-8 text-white">

      {/* POST FORM */}
      <div className="bg-[#0F1624] border border-[#1D2533] rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-1">Publish Announcement</h2>
        <p className="text-sm text-slate-400 mb-6">Share updates with all students</p>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Headline</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter announcement title" className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Details</label>
            <textarea rows="4" value={description} onChange={e => setDescription(e.target.value)} placeholder="Write announcement here..." className={`${inputCls} resize-none`} />
          </div>
          <button onClick={handlePost} disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white transition ${loading ? "bg-blue-500/30 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"}`}>
            {loading ? "Posting..." : "Post Announcement"}
          </button>
        </div>
      </div>

      {/* NEWS LIST */}
      <div className="bg-[#0F1624] border border-[#1D2533] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">All Announcements ({newsList.length})</h3>
        {newsList.length === 0 ? (
          <p className="text-slate-500 text-center py-6">No announcements yet</p>
        ) : (
          <div className="space-y-3">
            {newsList.map(item => (
              <div key={item._id} className="flex items-start justify-between gap-4 p-4 bg-[#0A0F1C] border border-[#1E2533] rounded-xl">
                <div className="flex-1">
                  <p className="font-semibold text-blue-300">{item.title}</p>
                  <p className="text-slate-400 text-sm mt-1 line-clamp-2">{item.message}</p>
                </div>
                <button onClick={() => handleDelete(item._id)}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition">
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
