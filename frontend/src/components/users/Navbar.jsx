import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../../helper/Logout.js";

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const initials = user?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full px-4 h-14 flex items-center justify-between shadow-lg transition sticky top-0 z-40 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-gray-900/90 backdrop-blur-xl border-b border-white/10">
      <div className="cursor-pointer p-1 hover:scale-110 transition" onClick={onToggleSidebar}>
        <i className="fa-regular fa-rectangle-list text-lg text-white opacity-80" />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition font-semibold text-sm text-white"
          style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
          {user?.profileImage
            ? <img src={user.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
            : initials}
        </div>

        {open && (
          <div className="absolute right-0 top-14 w-52 bg-gray-900 border border-white/10 shadow-2xl rounded-xl p-2 text-slate-100 z-50">
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <p className="font-medium text-sm">{user?.fullName}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <p className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer text-sm transition" onClick={() => { navigate("/dashboard"); setOpen(false); }}>
              📊 Dashboard
            </p>
            <p className="px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer text-sm transition" onClick={() => { navigate("/edit-profile"); setOpen(false); }}>
              ✏️ Edit Profile
            </p>
            <hr className="border-white/10 my-1" />
            <p className="px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 cursor-pointer text-sm transition" onClick={() => Logout(navigate)}>
              🚪 Logout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
