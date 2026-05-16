import { useState } from "react";
import Toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function Certification() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [certifications, setCertifications] = useState(
    user.certifications || []
  );

  const addCertificate = () => {
    setCertifications([
      ...certifications,
      { title: "", organization: "", year: "", link: "" }
    ]);
  };

  const removeCertificate = (index) => {
    const updated = certifications.filter((_, i) => i !== index);
    setCertifications(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...certifications];
    updated[index][field] = value;
    setCertifications(updated);
  };

  const handleSave = async () => {
    const res = await apiFetch("/update-profile", {
      method: "POST",
      body: JSON.stringify({ userId: user._id, updates: { certifications } })
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
        Certifications
      </h1>

      <p className="text-slate-400 text-sm mb-8">
        Add all your certifications.
      </p>

      {/* CERTIFICATE CARDS */}
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="
          mb-6 p-5 rounded-xl
          bg-white/10 border border-white/10
          hover:border-blue-400/40 hover:bg-blue-500/5
          transition
          "
        >

          {/* Title */}
          <div className="mb-4">
            <label className="text-sm font-medium">Certificate Title</label>
            <input
              value={cert.title}
              onChange={(e) =>
                handleChange(index, "title", e.target.value)
              }
              placeholder="React Developer Certificate"
              className="
              w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/10
              text-slate-100 placeholder-slate-400
              focus:border-blue-400/40 focus:bg-blue-500/5
              outline-none transition
              "
            />
          </div>

          {/* Organization */}
          <div className="mb-4">
            <label className="text-sm font-medium">Issued By</label>
            <input
              value={cert.organization}
              onChange={(e) =>
                handleChange(index, "organization", e.target.value)
              }
              placeholder="Coursera / Udemy / Google"
              className="
              w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/10
              text-slate-100
              focus:border-blue-400/40 focus:bg-blue-500/5
              outline-none transition
              "
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label className="text-sm font-medium">Year</label>
            <input
              value={cert.year}
              onChange={(e) =>
                handleChange(index, "year", e.target.value)
              }
              placeholder="2024"
              className="
              w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/10
              text-slate-100
              focus:border-blue-400/40 focus:bg-blue-500/5
              outline-none transition
              "
            />
          </div>

          {/* Link */}
          <div className="mb-4">
            <label className="text-sm font-medium">Certificate Link</label>
            <input
              value={cert.link}
              onChange={(e) =>
                handleChange(index, "link", e.target.value)
              }
              placeholder="https://certificate-link.com"
              className="
              w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/10
              text-slate-100
              focus:border-blue-400/40 focus:bg-blue-500/5
              outline-none transition
              "
            />
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeCertificate(index)}
            className="
            text-red-300 text-sm font-medium
            hover:text-red-400 hover:underline
            transition
            "
          >
            Remove
          </button>

        </div>
      ))}

      {/* ADD BUTTON */}
      <button
        onClick={addCertificate}
        className="
        w-full mb-6 py-3
        rounded-xl font-semibold text-center
        bg-white/10 border border-white/10
        text-slate-200 hover:bg-blue-500/10 hover:border-blue-400/30
        transition
        "
      >
        + Add Certificate
      </button>

      {/* SAVE BUTTON */}
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
        Save Certifications
      </button>

    </div>
  );
}
