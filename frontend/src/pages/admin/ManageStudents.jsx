import { useEffect, useState } from "react";
import apiFetch from "../../helper/api.js";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [questionFilter, setQuestionFilter] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 20;

  useEffect(() => { fetchStudents(); }, [collegeFilter, questionFilter, activeFilter, search, page]);
  useEffect(() => { fetchColleges(); }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      let url = `/admin/students?page=${page}&limit=${LIMIT}`;
      if (collegeFilter !== "All") url += `&college=${collegeFilter}`;
      if (questionFilter > 0) url += `&minQuestions=${questionFilter}`;
      if (activeFilter > 0) url += `&minActiveDays=${activeFilter}`;
      if (search.trim()) url += `&search=${encodeURIComponent(search)}`;
      const res = await apiFetch(url);
      const data = await res.json();
      setStudents(data.students || []);
      setTotalPages(data.totalPages || 1);
      setTotal(data.total || 0);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const fetchColleges = async () => {
    try {
      const res = await apiFetch("/admin/colleges");
      const data = await res.json();
      setColleges(data.colleges || []);
    } catch { }
  };

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };

  const selectCls = "bg-[#111827] text-slate-300 border border-[#1F2937] rounded-lg p-3 focus:border-blue-500 focus:outline-none";

  return (
    <div className="space-y-6 bg-[#0A0F1C] rounded-2xl p-6 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Students</h2>
        <span className="text-sm text-slate-400">Total — <span className="text-blue-400 font-medium">{total}</span></span>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input value={search} onChange={handleSearch} placeholder="🔍 Search by name..."
          className="bg-[#111827] text-slate-300 border border-[#1F2937] rounded-lg p-3 focus:border-blue-500 focus:outline-none col-span-1 lg:col-span-1" />
        <select className={selectCls} onChange={e => { setCollegeFilter(e.target.value); setPage(1); }}>
          <option value="All">All Colleges</option>
          {colleges.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>
        <select className={selectCls} onChange={e => { setQuestionFilter(Number(e.target.value)); setPage(1); }}>
          <option value="0">All Question Counts</option>
          <option value="100">≥ 100 Questions</option>
          <option value="300">≥ 300 Questions</option>
          <option value="500">≥ 500 Questions</option>
        </select>
        <select className={selectCls} onChange={e => { setActiveFilter(Number(e.target.value)); setPage(1); }}>
          <option value="0">All Active Days</option>
          <option value="50">≥ 50 Days</option>
          <option value="100">≥ 100 Days</option>
          <option value="200">≥ 200 Days</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#111827] border border-[#1E2533] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="space-y-3 p-4">
            {[1,2,3,4,5].map(i => <div key={i} className="animate-pulse h-12 bg-white/5 rounded-lg" />)}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#0A0F1C] border-b border-[#1E2533]">
              <tr className="text-blue-300 text-left">
                <th className="p-4">#</th>
                <th className="p-4">Student</th>
                <th className="p-4">College</th>
                <th className="p-4">LeetCode</th>
                <th className="p-4">Active Days</th>
                <th className="p-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="6" className="p-8 text-center text-slate-500">No students found</td></tr>
              ) : students.map((s, i) => (
                <tr key={i} className="border-t border-[#1E2533] hover:bg-[#1A2235] text-slate-200 transition">
                  <td className="p-4 text-slate-500">{(page - 1) * LIMIT + i + 1}</td>
                  <td className="p-4 font-medium">{s.fullName}</td>
                  <td className="p-4 text-slate-400 text-xs">{s.college}</td>
                  <td className="p-4 text-indigo-400 font-semibold">{s.leetcodeSolved}</td>
                  <td className="p-4 text-emerald-400 font-semibold">{s.activeDays}</td>
                  <td className="p-4 text-yellow-400 font-semibold">{s.score || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 transition text-sm">← Prev</button>
          <span className="text-slate-400 text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 transition text-sm">Next →</button>
        </div>
      )}
    </div>
  );
}
