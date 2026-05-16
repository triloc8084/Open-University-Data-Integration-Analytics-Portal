import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isLoggedIn = !!user;

  const handleCTA = () => {

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const role = user?.role?.toString().toLowerCase();

    if (role === "admin") {
      navigate("/admin");
      return;
    }

    navigate("/portfolio");
  };

  return (
    <section className="relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
        bg-gradient-to-r from-blue-600/30 to-purple-600/20
        blur-[140px] animate-pulse" />

      <div className="relative max-w-6xl mx-auto px-6 py-24
        grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-white">

        {/* LEFT CONTENT */}
        <div className="relative z-10">

          {/* Tag */}
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs rounded-full
            bg-white/10 border border-white/20 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Smart • Secure • Modern
          </span>

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-extrabold leading-snug tracking-tight">
            Empowering India’s{" "}
            <span className="text-transparent bg-clip-text
              bg-gradient-to-r from-blue-400 to-purple-400">
              University Data
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 text-gray-400 max-w-md text-base leading-relaxed">
            Student information in India is scattered. CodeProfile connects
            learning platforms, activity data and analytics into one smart system.
          </p>

          {/* BUTTON */}
          <div className="mt-10 flex gap-4 flex-wrap">
            <button
              onClick={handleCTA}
              className="
                px-7 py-2.5 rounded-full
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-500 hover:to-indigo-500
                transition font-semibold shadow-md text-sm
              "
            >
              {!isLoggedIn
                ? "Get Started"
                : user?.role?.toString().toLowerCase() === "admin"
                ? "Go to Admin"
                : "Your Portfolio"}
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">

          <div className="absolute inset-0 bg-gradient-to-br
            from-blue-500/20 to-purple-500/20
            blur-3xl rounded-full" />

          <div className="
            absolute w-72 h-44 rounded-2xl
            bg-white/5 border border-white/10
            rotate-[-12deg] translate-y-6
            backdrop-blur-xl
          " />

          <div className="
            absolute w-72 h-44 rounded-2xl
            bg-white/10 border border-white/20
            rotate-[-6deg] translate-y-3
            backdrop-blur-xl
          " />

          <div
            className="
              relative w-72 h-44 rounded-2xl
              bg-gradient-to-br from-[#111] to-[#1a1a1a]
              border border-white/10
              backdrop-blur-xl
              shadow-[0_40px_90px_rgba(0,0,0,0.7)]
              transform rotate-x-12 rotate-y-[-20deg]
              hover:rotate-x-6 hover:rotate-y-[-10deg]
              transition-all duration-700
            "
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="
              absolute -top-3 -right-3 px-2 py-0.5 rounded-full
              bg-blue-600 text-[10px] font-semibold shadow-lg
            ">
              PRO
            </div>

            <div className="p-5">
              <p className="text-gray-400 text-xs">Global Rank</p>
              <h2 className="text-3xl font-bold mt-1">#124</h2>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-gray-400">Solved</p>
                  <p className="font-semibold">842</p>
                </div>
                <div>
                  <p className="text-gray-400">Streak</p>
                  <p className="font-semibold">23d</p>
                </div>
                <div>
                  <p className="text-gray-400">Score</p>
                  <p className="font-semibold">1890</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
