import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header
      className="
      w-full h-14 lg:h-14
      bg-[#0B0E14]
      border-b border-[#1b1f27]
      flex items-center justify-between
      px-6 lg:px-10
      shadow-md
      text-white
      "
    >

      {/* Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className="
        text-gray-300 text-xl lg:text-2xl
        hover:text-[#00E0FF]
        transition
        "
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* Right Section */}
      <div className="relative flex items-center gap-4 lg:gap-6">

        {/* Admin Tag */}
        <span className="hidden md:inline text-sm lg:text-base font-medium text-gray-400">
          Admin Panel
        </span>

        {/* Avatar */}
        <div
          onClick={() => setOpen(!open)}
          className="
          w-9 h-9 lg:w-11 lg:h-11
          rounded-full cursor-pointer
          flex items-center justify-center
          bg-[#00E0FF]/20
          border border-[#00E0FF]/40
          hover:bg-[#00E0FF]/30
          transition
          "
        >
          <i className="fa-solid fa-user-shield text-[#00E0FF] text-sm lg:text-base"></i>
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className="
            absolute right-0 top-12 lg:top-16
            w-44 bg-[#0B0E14]
            border border-[#1b1f27]
            rounded-lg shadow-lg
            overflow-hidden
            "
          >
            <p
              className="
              px-4 py-3 text-sm text-gray-300
              hover:bg-[#141920] transition
              cursor-pointer
              "
              onClick={() => {
                setOpen(false);
                navigate("/admin");
              }}
            >
              Admin Dashboard
            </p>

            <p
              className="
              px-4 py-3 text-sm text-red-400
              hover:bg-[#141920] transition
              cursor-pointer
              "
              onClick={handleLogout}
            >
              Logout
            </p>

          </div>
        )}

      </div>
    </header>
  );
}
