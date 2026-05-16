import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const NAV_ITEMS = [
  { path: "/admin", icon: "fa-house", label: "Dashboard" },
  { path: "/admin/students", icon: "fa-users", label: "Manage Students" },
  { path: "/admin/news", icon: "fa-newspaper", label: "Post News" },
  { path: "/admin/jobs", icon: "fa-briefcase", label: "Post Jobs" },
  { path: "/admin/create-admin", icon: "fa-user-shield", label: "Manage Admins" },
];

export default function AdminSidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`h-screen bg-[#0B0E14] flex flex-col overflow-hidden transition-all duration-300 border-r border-[#1b1f27] ${isOpen ? "w-64" : "w-16"}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1b1f27]">
        <img src={logo} alt="logo" className="w-9 h-9 rounded-lg shrink-0" />
        {isOpen && <h2 className="text-base font-semibold text-gray-100 tracking-wide whitespace-nowrap">Admin Panel</h2>}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-auto px-2 py-4 space-y-1">
        {NAV_ITEMS.map(({ path, icon, label }) => {
          const active = location.pathname === path;
          return (
            <div key={path} onClick={() => navigate(path)}
              className={`flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-md transition ${active ? "bg-blue-500/20 text-[#00E0FF] border border-blue-500/20" : "text-gray-300 hover:text-[#00E0FF] hover:bg-[#141920]"}`}>
              <i className={`fa-solid ${icon} text-base w-5 text-center`} />
              {isOpen && <span className="text-sm font-medium tracking-wide whitespace-nowrap">{label}</span>}
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div onClick={handleLogout}
        className="px-4 py-4 flex items-center gap-3 cursor-pointer text-gray-400 hover:text-red-400 hover:bg-[#141920] border-t border-[#1b1f27] transition">
        <i className="fa-solid fa-arrow-right-from-bracket text-lg w-5 text-center" />
        {isOpen && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
      </div>
    </div>
  );
}
