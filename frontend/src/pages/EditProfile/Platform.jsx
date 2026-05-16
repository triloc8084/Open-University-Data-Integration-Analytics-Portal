import Toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function Platform() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSave = async () => {
    const updates = {
      leetcode: document.getElementById("leetcode").value,
      gfg: document.getElementById("gfg").value
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
        Platforms
      </h1>

      <p className="text-slate-400 text-sm mb-8">
        Connect your coding profiles.
      </p>

      {/* LeetCode */}
      <div className="mb-6">
        <label className="text-sm">LeetCode Username</label>
        <input
          id="leetcode"
          defaultValue={user.leetcode || ""}
          placeholder="Enter LeetCode username"
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100 placeholder-slate-400
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* GeeksforGeeks */}
      <div className="mb-8">
        <label className="text-sm">GeeksforGeeks Username</label>
        <input
          id="gfg"
          defaultValue={user.gfg || ""}
          placeholder="Enter GFG username"
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
