import Toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function SocialMediaDetails() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSave = async () => {
    const updates = {
      githubProfile: document.getElementById("github").value,
      linkedinProfile: document.getElementById("linkedin").value,
      twitter: document.getElementById("twitter").value,
      instagram: document.getElementById("instagram").value
    };

    const res = await apiFetch("/update-profile", {
      method: "POST",
      body: JSON.stringify({ userId: user._id, updates })
    });

    const data = await res.json();
    Toast.success(data.message);

    localStorage.setItem("user", JSON.stringify(data.user));
  };

  return (
    <div
      className="
      backdrop-blur-2xl bg-white/5 border border-white/10
      rounded-2xl p-6 shadow-xl text-slate-100
      "
    >

      <h1 className="text-2xl font-semibold tracking-wide mb-1">
        Social Media
      </h1>

      <p className="text-slate-400 text-sm mb-8">
        Add your social media profiles.
      </p>

      {/* GitHub */}
      <div className="mb-6">
        <label className="text-sm flex items-center gap-2">
          <i className="fa-brands fa-github text-xl text-slate-300"></i>
          GitHub Profile
        </label>
        <input
          id="github"
          defaultValue={user.githubProfile || ""}
          placeholder="https://github.com/username"
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100 placeholder-slate-400
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* LinkedIn */}
      <div className="mb-6">
        <label className="text-sm flex items-center gap-2">
          <i className="fa-brands fa-linkedin text-xl text-slate-300"></i>
          LinkedIn Profile
        </label>
        <input
          id="linkedin"
          defaultValue={user.linkedinProfile || ""}
          placeholder="https://linkedin.com/in/username"
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100 placeholder-slate-400
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* Twitter */}
      <div className="mb-6">
        <label className="text-sm flex items-center gap-2">
          <i className="fa-brands fa-twitter text-xl text-slate-300"></i>
          Twitter
        </label>
        <input
          id="twitter"
          defaultValue={user.twitter || ""}
          placeholder="https://twitter.com/username"
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100 placeholder-slate-400
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* Instagram */}
      <div className="mb-8">
        <label className="text-sm flex items-center gap-2">
          <i className="fa-brands fa-instagram text-xl text-slate-300"></i>
          Instagram
        </label>
        <input
          id="instagram"
          defaultValue={user.instagram || ""}
          placeholder="https://instagram.com/username"
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100 placeholder-slate-400
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-400 hover:to-blue-500
        px-6 py-3 rounded-xl font-semibold
        shadow-md hover:shadow-blue-500/20
        transition
        "
      >
        Save Changes
      </button>

    </div>
  );
}
