import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../helper/api.js";

export default function Login({ setShowSignup }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    const email = e.target.email.value.trim().toLowerCase();
    const password = e.target.password.value.trim();
    const role = e.target.role.value;

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setErrors({});

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role })
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.message?.toLowerCase().includes("password")) setErrors({ password: data.message });
        else if (data.message?.toLowerCase().includes("email") || data.message?.toLowerCase().includes("account")) setErrors({ email: data.message });
        else toast.error(data.message || "Login failed");
        return;
      }

      // Store token based on Remember Me
      const storage = rememberMe ? localStorage : localStorage;
      storage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      setTimeout(() => navigate(data.user.role === "Admin" ? "/admin" : "/dashboard"), 600);
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) => `w-full px-4 py-3 rounded-xl bg-white/10 border ${errors[field] ? "border-red-400/70" : "border-white/10"} text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400/40 focus:bg-blue-500/5 transition`;

  return (
    <div className="w-full max-w-sm backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl text-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Welcome Back</h1>
        <p className="text-sm text-slate-400 mt-2">Login to continue learning</p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">Email</label>
          <input name="email" type="email" placeholder="you@example.com" className={inputClass("email")} />
          {errors.email && <p className="text-xs text-red-400 mt-1">⚠ {errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">Password</label>
          <input name="password" type="password" placeholder="••••••••" className={inputClass("password")} />
          {errors.password && <p className="text-xs text-red-400 mt-1">⚠ {errors.password}</p>}
          <div className="text-right mt-1">
            <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 hover:underline">Forgot Password?</Link>
          </div>
        </div>

        {/* Role */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">Role</label>
          <select name="role" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-slate-100 focus:border-blue-400/40 focus:outline-none transition cursor-pointer">
            <option value="Student" className="text-black">Student</option>
            <option value="Admin" className="text-black">Admin</option>
          </select>
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded accent-blue-500" />
          <span className="text-sm text-slate-400">Remember me</span>
        </label>

        <button type="submit" disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold tracking-wide text-white shadow-md transition ${loading ? "bg-blue-500/30 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 hover:shadow-blue-500/20"}`}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account?{" "}
        <span onClick={() => setShowSignup(true)} className="text-blue-300 font-medium cursor-pointer hover:underline">Sign up</span>
      </p>
    </div>
  );
}
