import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Logout from "../../helper/Logout";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isLoggedIn = !!user;

  const userRole = user?.role?.toString().toLowerCase();

  const goProfile = () => {
    setOpen(false);

    // no login → go login
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // admin → admin dashboard
    if (userRole === "admin") {
      navigate("/admin");
      return;
    }

    // normal user → profile
    navigate("/portfolio");
  };

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/5">
        <div className="h-14 px-5 flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 group-hover:scale-110 transition"
            />
            <span className="font-semibold text-white text-base tracking-wide">
              CodeProfile
            </span>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-300">
            {[
              { 
                label: userRole === "admin" ? "Admin Panel" : "Profile", 
                onClick: goProfile 
              },
              { label: "About", onClick: () => goTo("/about") },
              { label: "Contact", onClick: () => goTo("/contact") }
            ].map((item, i) => (
              <span
                key={i}
                onClick={item.onClick}
                className="
                  cursor-pointer hover:text-white relative
                  after:absolute after:left-0 after:right-0 after:-bottom-[2px]
                  after:h-[2px] after:bg-indigo-500 after:scale-x-0
                  hover:after:scale-x-100 after:transition-transform
                  after:origin-left
                  text-lg
                "
              >
                {item.label}
              </span>
            ))}
          </nav>

          {/* LOGIN / LOGOUT BUTTON */}
          {!isLoggedIn ? (
            <button
              onClick={() => goTo("/login")}
              className="
                hidden md:block px-4 py-1.5 rounded-lg text-[13px]
                bg-gradient-to-r from-indigo-600 to-violet-600
                hover:from-indigo-500 hover:to-violet-500
                text-white font-medium shadow-md shadow-indigo-500/20
              "
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => Logout(navigate)}
              className="
                hidden md:block px-4 py-1.5 rounded-lg text-[13px]
                bg-gradient-to-r from-indigo-600 to-violet-600
                hover:from-indigo-500 hover:to-violet-500
                text-white font-medium shadow-md shadow-indigo-500/20
              "
            >
              Logout
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden w-9 h-9 rounded-lg border border-white/20
              text-white flex items-center justify-center text-base
              hover:bg-white/10 transition
            "
          >
            {open ? "✕" : "☰"}
          </button>

        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden bg-black/80 backdrop-blur-xl transition-all duration-300
          ${open ? "max-h-56 py-3" : "max-h-0 py-0"} overflow-hidden
        `}
      >
        <div className="px-5 space-y-4 text-gray-200 text-base">

          <p onClick={goProfile} className="cursor-pointer hover:text-white">
            {userRole === "admin" ? "Admin Dashboard" : "Profile Tracker"}
          </p>

          <p onClick={() => goTo("/about")} className="cursor-pointer hover:text-white">
            About Us
          </p>

          <p onClick={() => goTo("/contact")} className="cursor-pointer hover:text-white">
            Contact
          </p>

          {!isLoggedIn && (
            <button
              onClick={() => goTo("/login")}
              className="
                w-full py-2 bg-white text-black text-sm rounded-lg font-semibold 
                hover:bg-gray-200 transition
              "
            >
              Login
            </button>
          )}

        </div>
      </div>
    </>
  );
}
