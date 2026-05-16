import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/home/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const isLoggedIn = !!user;

  const userRole = user?.role?.toString().toLowerCase();

  const handleCTA = () => {

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (userRole === "admin") {
      navigate("/admin");
      return;
    }

    navigate("/portfolio");
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />
      <Hero />

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#111] rounded-xl p-5">
          <p className="text-gray-400 text-xs">Total Students</p>
          <h3 className="text-xl font-bold mt-1">12,450+</h3>
        </div>

        <div className="bg-[#111] rounded-xl p-5">
          <p className="text-gray-400 text-xs">Questions Solved</p>
          <h3 className="text-xl font-bold mt-1">3.1M+</h3>
        </div>

        <div className="bg-[#111] rounded-xl p-5">
          <p className="text-gray-400 text-xs">Active Colleges</p>
          <h3 className="text-xl font-bold mt-1">280+</h3>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Why Choose CodeProfile?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111] p-5 rounded-xl text-sm">
            <h3 className="font-semibold mb-1">📊 Performance Analytics</h3>
            <p className="text-gray-400 text-xs">
              Track learning and growth.
            </p>
          </div>

          <div className="bg-[#111] p-5 rounded-xl text-sm">
            <h3 className="font-semibold mb-1">🏆 Leaderboards</h3>
            <p className="text-gray-400 text-xs">
              Compete globally and locally.
            </p>
          </div>

          <div className="bg-[#111] p-5 rounded-xl text-sm">
            <h3 className="font-semibold mb-1">⚡ Smart Insights</h3>
            <p className="text-gray-400 text-xs">
              Improve with real data.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 text-center">
        <h2 className="text-2xl font-bold">
          Ready to Level Up Your Coding?
        </h2>

        <p className="mt-2 text-blue-100 text-sm">
          Join thousands of students tracking their learning.
        </p>

        <button
          onClick={handleCTA}
          className="mt-5 px-7 py-2 bg-black rounded-xl text-sm hover:bg-gray-900 transition"
        >
          {!isLoggedIn
            ? "Create Account"
            : userRole === "admin"
            ? "Go to Admin"
            : "Explore"}
        </button>
      </section>

      <Footer />
    </div>
  );
}
