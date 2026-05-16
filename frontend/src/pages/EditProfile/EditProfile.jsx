import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfo from "./BasicInfo";
import ProfileDetails from "./ProfileDetails";
import Platform from "./Platform";
import SocialMediaDetails from "./SocialMediaDetails";
import Certification from "./Certification";

export default function EditProfile() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("basic");

  return (
    <div className="min-h-screen flex text-slate-100 gap-6 px-4 py-6 bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17]">

      {/* LEFT MENU */}
      <div
        className="
        w-64
        backdrop-blur-2xl bg-white/5 border border-white/10
        rounded-2xl p-5 shadow-lg
        "
      >
        {/* Back Link */}
        <p
          className="text-blue-300 font-medium mb-6 cursor-pointer hover:underline"
          onClick={() => navigate('/portfolio')}
        >
          ← Back to Profile
        </p>

        {/* Menu Buttons */}
        <div className="space-y-2 text-sm">

          {[
            { key: "basic", label: "Basic Info" },
            { key: "details", label: "Profile Details" },
            { key: "platform", label: "Platform" },
            { key: "socialmedia", label: "Social Media" },
            { key: "certification", label: "Certifications" }
          ].map(item => (
            <p
              key={item.key}
              onClick={() => setActivePage(item.key)}
              className={`
                p-3 rounded-xl cursor-pointer tracking-wide
                transition font-medium
                ${
                  activePage === item.key
                  ? "bg-blue-500/20 border border-blue-400/30 text-blue-200"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-blue-500/10 hover:border-blue-400/30"
                }
              `}
            >
              {item.label}
            </p>
          ))}

        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div
        className="
        flex-1
        backdrop-blur-2xl bg-white/5 border border-white/10
        rounded-2xl shadow-lg p-6
        "
      >
        {activePage === "basic" && <BasicInfo />}
        {activePage === "details" && <ProfileDetails />}
        {activePage === "platform" && <Platform />}
        {activePage === "socialmedia" && <SocialMediaDetails />}
        {activePage === "certification" && <Certification />}
      </div>

    </div>
  );
}
