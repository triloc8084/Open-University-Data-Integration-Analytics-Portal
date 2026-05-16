import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import apiFetch, { BASE_URL } from "../../helper/api.js";

export default function CreateAdmin() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirmPassword: "", secretKey: "" });
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [showKey, setShowKey] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => { fetchAdmins(); }, []);

  const fetchAdmins = async () => {
    try {
      const res = await apiFetch("/admin/list-admins");
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch { }
  };

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleCreate = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    if (!form.secretKey) { toast.error("Secret key is required"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/setup-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          secretKey: form.secretKey
        })
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message); return; }
      toast.success(`Admin created: ${data.email} ✅`);
      setForm({ fullName: "", email: "", password: "", confirmPassword: "", secretKey: "" });
      fetchAdmins();
    } catch { toast.error("Something went wrong"); } finally { setLoading(false); }
  };

  const handleDelete = async (id, email) => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (currentUser.email === email) { toast.error("You cannot delete your own account"); return; }
    if (!confirm(`Delete admin: ${email}?`)) return;
    try {
      const res = await apiFetch(`/admin/delete-admin/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { toast.success("Admin removed"); fetchAdmins(); }
      else toast.error(data.message);
    } catch { toast.error("Delete failed"); }
  };

  const inputCls = "w-full p-3 bg-[#111827] border border-[#1F2937] rounded-xl text-slate-200 focus:border-blue-500 focus:outline-none transition";

  return (
    <div className="space-y-8 text-white">

      {/* CREATE FORM */}
      <div className="bg-[#0F1624] border border-[#1D2533] rounded-2xl p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Create New Admin</h2>
          <p className="text-sm text-slate-400 mt-1">
            Multiple admins can manage the platform simultaneously. Each needs a unique email.
          </p>
        </div>

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
            <input value={form.fullName} onChange={set("fullName")} placeholder="Admin Full Name" required className={inputCls} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
            <input value={form.email} onChange={set("email")} type="email" placeholder="admin@yourdomain.com" required className={inputCls} />
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
              <div className="relative">
                <input value={form.password} onChange={set("password")} type={showPass ? "text" : "password"}
                  placeholder="Min 6 characters" required className={inputCls} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200 text-sm">
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
              <input value={form.confirmPassword} onChange={set("confirmPassword")} type="password"
                placeholder="Re-enter password" required className={`${inputCls} ${form.confirmPassword && form.password !== form.confirmPassword ? "border-red-500/70" : ""}`} />
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">⚠ Passwords don't match</p>
              )}
            </div>
          </div>

          {/* Secret Key */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Admin Secret Key
              <span className="ml-2 text-xs text-slate-500">(found in backend .env as ADMIN_SETUP_KEY)</span>
            </label>
            <div className="relative">
              <input value={form.secretKey} onChange={set("secretKey")} type={showKey ? "text" : "password"}
                placeholder="Enter secret key" required className={inputCls} />
              <button type="button" onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-200 text-sm">
                {showKey ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className={`w-full py-3 rounded-xl font-medium text-white transition ${loading ? "bg-blue-500/30 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"}`}>
            {loading ? "Creating Admin..." : "➕ Create Admin Account"}
          </button>
        </form>
      </div>

      {/* EXISTING ADMINS LIST */}
      <div className="bg-[#0F1624] border border-[#1D2533] rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">
          All Admins <span className="text-blue-400 ml-2 text-base">({admins.length})</span>
        </h3>

        {admins.length === 0 ? (
          <p className="text-slate-500 text-center py-6">Loading admins...</p>
        ) : (
          <div className="space-y-3">
            {admins.map((admin) => {
              const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
              const isMe = currentUser.email === admin.email;
              return (
                <div key={admin._id} className="flex items-center justify-between p-4 bg-[#0A0F1C] border border-[#1E2533] rounded-xl">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
                      {admin.fullName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-slate-100">
                        {admin.fullName}
                        {isMe && <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">You</span>}
                      </p>
                      <p className="text-sm text-slate-400">{admin.email}</p>
                    </div>
                  </div>
                  {!isMe && (
                    <button onClick={() => handleDelete(admin._id, admin.email)}
                      className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition">
                      🗑 Remove
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* INFO NOTE */}
      <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
        <p className="text-sm text-yellow-300 font-medium mb-1">💡 How to find your Secret Key</p>
        <p className="text-xs text-slate-400">
          Open <code className="text-yellow-300 bg-black/30 px-1 rounded">backend/.env</code> and look for{" "}
          <code className="text-yellow-300 bg-black/30 px-1 rounded">ADMIN_SETUP_KEY=...</code>
        </p>
      </div>

    </div>
  );
}
