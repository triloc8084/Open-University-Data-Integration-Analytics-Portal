import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function PostJob() {
  const [form, setForm] = useState({ jobTitle: "", companyName: "", jobDescription: "", skillRequire: "", applyLink: "", lastDate: "" });
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await apiFetch("/jobs");
      const data = await res.json();
      setJobsList(data.jobs || []);
    } catch (err) {
      console.error(err);
    }
  };

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handlePost = async () => {
    if (!form.jobTitle || !form.companyName || !form.applyLink) { toast.error("Please fill required fields"); return; }
    setLoading(true);
    try {
      const res = await apiFetch("/admin/jobs", {
        method: "POST",
        body: JSON.stringify({ ...form, skillRequire: form.skillRequire.split(",").map(s => s.trim()).filter(Boolean) })
      });
      const data = await res.json();
      toast.success(data.message);
      setForm({ jobTitle: "", companyName: "", jobDescription: "", skillRequire: "", applyLink: "", lastDate: "" });
      fetchJobs();
    } catch { toast.error("Something went wrong"); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job posting?")) return;
    try {
      const res = await apiFetch(`/admin/jobs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { toast.success("Job deleted"); setJobsList(prev => prev.filter(j => j._id !== id)); }
    } catch { toast.error("Delete failed"); }
  };

  const inputCls = "w-full p-3 bg-[#111827] border border-[#1F2937] rounded-xl text-slate-200 focus:border-blue-500 focus:outline-none";
  const fields = [
    { label: "Job Title *", key: "jobTitle", placeholder: "Frontend Developer" },
    { label: "Company Name *", key: "companyName", placeholder: "Google / Amazon" },
    { label: "Required Skills", key: "skillRequire", placeholder: "React, Node, JavaScript (comma-separated)" },
    { label: "Apply Link *", key: "applyLink", placeholder: "https://apply.link.com" },
  ];

  return (
    <div className="space-y-8 text-white">
      {/* FORM */}
      <div className="bg-[#0F1624] border border-[#1D2533] rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-1">Create Career Opportunity</h2>
        <p className="text-sm text-slate-400 mb-6">Publish job or internship openings for students</p>
        <div className="space-y-5">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-slate-400 mb-2">{f.label}</label>
              <input value={form[f.key]} onChange={set(f.key)} placeholder={f.placeholder} className={inputCls} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Job Description</label>
            <textarea rows="3" value={form.jobDescription} onChange={set("jobDescription")} placeholder="Describe the role..." className={`${inputCls} resize-none`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Last Date</label>
            <input type="date" value={form.lastDate} onChange={set("lastDate")} className={inputCls} />
          </div>
          <button onClick={handlePost} disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white transition ${loading ? "bg-blue-500/30 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"}`}>
            {loading ? "Posting..." : "Publish Job"}
          </button>
        </div>
      </div>

      {/* JOBS LIST */}
      <div className="bg-[#0F1624] border border-[#1D2533] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">All Job Postings ({jobsList.length})</h3>
        {jobsList.length === 0 ? <p className="text-slate-500 text-center py-6">No jobs posted yet</p> : (
          <div className="space-y-3">
            {jobsList.map(job => (
              <div key={job._id} className="flex items-start justify-between gap-4 p-4 bg-[#0A0F1C] border border-[#1E2533] rounded-xl">
                <div className="flex-1">
                  <p className="font-semibold text-blue-300">{job.jobTitle}</p>
                  <p className="text-slate-400 text-sm">{job.companyName} · Due: {job.lastDate || "N/A"}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(job.skillRequire || []).map((s, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{s}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => handleDelete(job._id)}
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
