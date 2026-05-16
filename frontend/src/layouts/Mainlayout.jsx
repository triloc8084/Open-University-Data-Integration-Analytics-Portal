import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/users/Sidebar";
import Navbar from "../components/users/Navbar";

export default function MainLayout() {
  const [sidebar, setSideBar] = useState(false);
  const location = useLocation();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <Sidebar isOpen={sidebar} onClose={() => setSideBar(false)} />
      </div>

      {/* Main Content */}
      <div className={`${sidebar ? "ml-52" : "ml-12"} w-full transition-all duration-300 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 min-h-screen`}>
        <Navbar onToggleSidebar={() => setSideBar(!sidebar)} />
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
