import Toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function ProfileDetails() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      Toast.error("Please upload PDF only");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64CV = reader.result;

      const res = await apiFetch("/update-profile", {
        method: "POST",
        body: JSON.stringify({
          userId: user._id,
          updates: { cv: base64CV, cvName: file.name }
        })
      });

      const data = await res.json();
      Toast.success("CV uploaded");

      localStorage.setItem("user", JSON.stringify(data.user));
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {

    let profession = document.getElementById("profession").value;

    if (profession === "Other") {
      const custom = document.getElementById("professionCustom")?.value;
      if (custom && custom.trim() !== "") profession = custom.trim();
    }

    const updates = {
      username: document.getElementById("username").value,
      profession,
      college: document.getElementById("college").value,
      skills: document.getElementById("skills").value,
      location: document.getElementById("location").value,
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
        Profile Details
      </h1>
      <p className="text-slate-400 text-sm mb-8">
        Update your personal details here.
      </p>

      {/* Username */}
      <div className="mb-6">
        <label className="text-sm">Username</label>
        <input
          id="username"
          defaultValue={user.username || ""}
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100 placeholder-slate-400
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* Profession */}
      <div className="mb-6">
        <label className="text-sm">Profession</label>

        <select
          id="profession"
          defaultValue={user.profession || "Student"}
          className="
            w-full mt-1 px-4 py-3 rounded-xl
            bg-white/10 border border-white/10
            text-slate-100 cursor-pointer
            focus:border-blue-400/40 focus:bg-[#222]
            outline-none transition
            appearance-none
          "
        >
          <option className="bg-[#1c1c1c] text-white">Student</option>
          <option className="bg-[#1c1c1c] text-white">Frontend Developer</option>
          <option className="bg-[#1c1c1c] text-white">Backend Developer</option>
          <option className="bg-[#1c1c1c] text-white">Full Stack Developer</option>
          <option className="bg-[#1c1c1c] text-white">Software Engineer</option>
          <option className="bg-[#1c1c1c] text-white">Data Scientist</option>
          <option className="bg-[#1c1c1c] text-white">Machine Learning Engineer</option>
          <option className="bg-[#1c1c1c] text-white">UI/UX Designer</option>
          <option className="bg-[#1c1c1c] text-white">Other</option>
        </select>
      </div>


      {/* College */}
      <div className="mb-6">
        <label className="text-sm">College / University</label>
        <input
          id="college"
          defaultValue={user.college || ""}
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="text-sm">Skills</label>
        <textarea
          id="skills"
          defaultValue={user.skills || ""}
          rows="3"
          className="
          w-full mt-1 px-4 py-3 rounded-xl resize-none 
          bg-white/10 border border-white/10
          text-slate-100
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
        <p className="text-xs text-slate-400 mt-1">
          Example: React, Node.js, C++, SQL...
        </p>
      </div>

      {/* Location */}
      <div className="mb-8">
        <label className="text-sm">Location</label>
        <input
          id="location"
          defaultValue={user.location || ""}
          className="
          w-full mt-1 px-4 py-3 rounded-xl
          bg-white/10 border border-white/10
          text-slate-100
          focus:border-blue-400/40 focus:bg-blue-500/5
          outline-none transition
          "
        />
      </div>

      {/* CV Upload */}
      <div
        className="
        mb-8 p-4 rounded-xl 
        bg-white/5 border border-white/10
        "
      >
        <label className="text-sm">Upload CV (PDF)</label>

        {user.cvName && (
          <p className="text-xs text-blue-300 mt-1">
            Uploaded: {user.cvName}
          </p>
        )}

        <input
          type="file"
          accept="application/pdf"
          onChange={handleCVUpload}
          className="
          mt-3 block w-full text-xs cursor-pointer
          text-slate-300
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
