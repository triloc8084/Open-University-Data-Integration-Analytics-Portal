import { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="
      min-h-screen w-full flex items-center justify-center
      bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17]
      p-6 relative text-slate-100
    ">

      {/* Soft glowing background orb */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none">
        <div className="
          w-[520px] h-[520px]
          bg-blue-500/15
          rounded-full blur-[120px]
        " />
      </div>

      {/* Auth Container */}
      <div className="
        w-full max-w-5xl
        grid grid-cols-1 md:grid-cols-2
        rounded-2xl overflow-hidden
        backdrop-blur-2xl bg-white/5 border border-white/10
        shadow-2xl shadow-blue-500/10
        transition
      ">

        {/* LEFT: FORM SIDE */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {showSignup ? (
              <Signup setShowSignup={setShowSignup} />
            ) : (
              <Login setShowSignup={setShowSignup} />
            )}
          </div>
        </div>

        {/* RIGHT: QUOTE / BRAND SIDE */}
        <div className="
          hidden md:flex flex-col
          items-center justify-center p-10
          bg-gradient-to-br from-blue-800/20 to-purple-800/20
          border-l border-white/10
          text-center
        ">
          <div className="space-y-6 max-w-sm">
            <h2 className="
              text-3xl font-bold tracking-wide
              bg-gradient-to-r from-blue-300 to-purple-300
              bg-clip-text text-transparent
            ">
              Learn. Practice. Grow.
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed">
              Small daily progress leads to big success.
            </p>

            <div className="pt-4 border-t border-white/20 text-sm text-slate-400">
              Built for students & developers 🚀
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
