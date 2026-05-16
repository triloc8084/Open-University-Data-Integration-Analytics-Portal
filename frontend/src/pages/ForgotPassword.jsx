import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../helper/api.js";

const STEPS = { EMAIL: 0, OTP: 1, RESET: 2, DONE: 3 };

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      toast.success("OTP sent! Check your email.");
      // In dev, show OTP in toast
      if (data.otp) toast(`Dev mode OTP: ${data.otp}`, { icon: "🔑", duration: 15000 });
      setStep(STEPS.OTP);
    } catch { setError("Server error"); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      setResetToken(data.resetToken);
      setStep(STEPS.RESET);
    } catch { setError("Server error"); } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) { setError("Passwords don't match"); return; }
    if (newPassword.length < 6) { setError("Password must be at least 6 characters"); return; }
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message); return; }
      toast.success("Password reset! Please login.");
      setStep(STEPS.DONE);
      setTimeout(() => navigate("/login"), 2000);
    } catch { setError("Server error"); } finally { setLoading(false); }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-slate-100 placeholder-slate-400 focus:border-blue-400/40 focus:outline-none transition";
  const btnCls = `w-full py-3 rounded-xl font-semibold text-white transition ${loading ? "bg-blue-500/30 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17] p-6">
      <div className="w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl text-slate-100">

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {["Email", "Verify OTP", "New Password"].map((s, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-blue-500" : "bg-white/10"}`} />
          ))}
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            {step === STEPS.EMAIL && "Forgot Password"}
            {step === STEPS.OTP && "Enter OTP"}
            {step === STEPS.RESET && "Set New Password"}
            {step === STEPS.DONE && "✅ Done!"}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {step === STEPS.EMAIL && "We'll send an OTP to your email"}
            {step === STEPS.OTP && `OTP sent to ${email}`}
            {step === STEPS.RESET && "Choose a strong new password"}
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">⚠ {error}</div>}

        {step === STEPS.EMAIL && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="your@email.com" required className={inputCls} />
            <button type="submit" disabled={loading} className={btnCls}>{loading ? "Sending..." : "Send OTP"}</button>
          </form>
        )}

        {step === STEPS.OTP && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit OTP" required maxLength={6}
              className={`${inputCls} text-center text-2xl tracking-widest font-bold`} />
            <button type="submit" disabled={loading} className={btnCls}>{loading ? "Verifying..." : "Verify OTP"}</button>
            <button type="button" onClick={() => setStep(STEPS.EMAIL)} className="w-full text-sm text-slate-400 hover:text-blue-300 transition">← Back to email</button>
          </form>
        )}

        {step === STEPS.RESET && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" placeholder="New password (min 6 chars)" required className={inputCls} />
            <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" placeholder="Confirm new password" required className={inputCls} />
            <button type="submit" disabled={loading} className={btnCls}>{loading ? "Resetting..." : "Reset Password"}</button>
          </form>
        )}

        <p className="text-center text-sm text-slate-400 mt-6">
          <Link to="/login" className="text-blue-300 hover:underline">← Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
