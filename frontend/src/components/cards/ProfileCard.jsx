import { useNavigate } from "react-router-dom";

export default function ProfileCard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-4 text-slate-100 text-center shadow-xl">
        Please login
      </div>
    );
  }

  const avatarUrl = user?.profileImage
    ? user.profileImage
    : `https://ui-avatars.com/api/?name=${
        (user?.firstName || user?.fullName || "U")[0].toUpperCase()
      }&background=4F46E5&color=fff&rounded=true&size=128`;

  return (
    <div
      className="
      backdrop-blur-2xl bg-white/5 border border-white/10 
      rounded-2xl p-6 shadow-xl text-slate-100
      transition hover:border-white/20"
    >

      {/* Public Profile */}
      <p className="text-xs tracking-wide text-slate-300 mb-3">
        PUBLIC PROFILE
      </p>

      {/* Profile Photo */}
      <div className="flex justify-center">
        <img
          src={avatarUrl}
          alt="profile"
          className="
          w-28 h-28 rounded-full 
          border border-white/20 
          shadow-lg object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="text-xl font-semibold text-center mt-4 tracking-wide">
        {user.firstName || user.fullName || "User"}
      </h2>

      {/* Username */}
      <p className="text-center text-blue-400 text-sm font-medium opacity-90">
        @{user.username || "username"}
      </p>

      {/* Download CV */}
      <a
        href={user.cv || "#"}
        download={user.cvName || "cv.pdf"}
        onClick={(e) => !user.cv && e.preventDefault()}
        className="
        block w-full mt-4
        bg-blue-500/20 hover:bg-blue-500/30
        border border-blue-400/30
        text-blue-300 hover:text-blue-200
        transition py-2 rounded-lg 
        text-center text-sm font-medium shadow-sm"
      >
        Download CV
      </a>

      <hr className="my-5 border-white/10" />

      {/* Social Links */}
      <div className="flex justify-center gap-6 text-xl text-slate-300">
        <a href={`mailto:${user.email || ""}`} className="hover:text-blue-300 transition">
          <i className="fa-regular fa-envelope"></i>
        </a>
        <a href={user.linkedinProfile || "#"} target="_blank" className="hover:text-blue-500 transition">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href={user.githubProfile || "#"} target="_blank" className="hover:text-blue-400 transition">
          <i className="fa-brands fa-github"></i>
        </a>
      </div>

      <hr className="my-5 border-white/10" />

      {/* Location & College */}
      <div className="text-sm space-y-2 text-slate-300">
        <p className="flex items-center gap-2">
          <i className="fa-solid fa-location-dot text-blue-300"></i>
          {user.country || "Country"}
        </p>
        <p className="flex items-center gap-2">
          <i className="fa-solid fa-graduation-cap text-emerald-300"></i>
          {user.college || "College"}
        </p>
      </div>

      <hr className="my-5 border-white/10" />

      {/* Leaderboard */}
      <div
        onClick={() => navigate("/dashboard")}
        className="
        cursor-pointer 
        bg-white/5 hover:bg-white/10 
        border border-white/10 hover:border-white/20
        p-3 rounded-lg flex items-center justify-between 
        transition shadow-sm"
      >
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-trophy text-yellow-400 text-lg"></i>
          <span className="text-sm tracking-wide">View Leaderboard</span>
        </div>

        <i className="fa-solid fa-arrow-right text-sm text-slate-300"></i>
      </div>

    </div>
  );
}
