import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const NAV_ITEMS = [
  { path: "/dashboard", icon: "fa-house", label: "Dashboard" },
  { path: "/portfolio", icon: "fa-user", label: "Portfolio" },
  { path: "/news", icon: "fa-newspaper", label: "News" },
  { path: "/jobs", icon: "fa-thumbs-up", label: "Opportunity" },
  { path: "/feedback", icon: "fa-message", label: "Feedback" },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const handleNav = (path) => {
    navigate(path);
    if (onClose) onClose(); // close on mobile
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={onClose} />
      )}

      <div className={`h-screen ${isOpen ? "w-52" : "w-12"} p-2 flex flex-col transition-all duration-300 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-r border-white/10 backdrop-blur-xl shadow-xl z-50 relative`}>
        <div className="p-1 flex justify-start items-center gap-4 mb-2">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          {isOpen && <h2 className="text-lg font-semibold text-white opacity-90 whitespace-nowrap">CodeProfile</h2>}
        </div>

        <hr className="border-t border-gray-700 opacity-50 mb-4" />

        <div className="space-y-1 flex-1">
          {NAV_ITEMS.map(({ path, icon, label }) => {
            const active = location.pathname === path;
            return (
              <div key={path} onClick={() => handleNav(path)}
                className={`p-2 flex items-center gap-4 cursor-pointer transition text-sm rounded-lg ${active ? "bg-blue-500/20 text-blue-300" : "text-gray-300 hover:text-white hover:bg-white/5"}`}>
                <i className={`fa-regular ${icon} text-xl w-6 text-center`} />
                {isOpen && <span className="whitespace-nowrap">{label}</span>}
              </div>
            );
          })}
        </div>

        <div onClick={handleLogout}
          className="p-2 flex items-center gap-4 text-gray-300 hover:text-red-400 cursor-pointer transition text-sm rounded-lg hover:bg-red-500/5">
          <i className="fa-solid fa-arrow-right-from-bracket text-xl w-6 text-center" />
          {isOpen && <span className="whitespace-nowrap">Logout</span>}
        </div>
      </div>
    </>
  );
}
