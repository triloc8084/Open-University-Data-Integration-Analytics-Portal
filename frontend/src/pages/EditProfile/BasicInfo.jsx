import { useState, useRef } from "react";
import toast from "react-hot-toast";
import apiFetch from "../../helper/api.js";

export default function BasicInfo() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [preview, setPreview] = useState(user.profileImage || null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 2 * 1024 * 1024) { toast.error("Image must be under 2MB"); return; }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setPreview(base64Image);
      setUploading(true);
      try {
        const res = await apiFetch("/update-profile", {
          method: "POST",
          body: JSON.stringify({ userId: user._id, updates: { profileImage: base64Image } })
        });
        const data = await res.json();
        if (!res.ok) { toast.error(data.message || "Upload failed"); return; }
        toast.success("Profile photo updated! ✨");
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch { toast.error("Upload failed"); } finally { setUploading(false); }
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e) => processImageFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    processImageFile(e.dataTransfer.files?.[0]);
  };

  const handleRemoveImage = async () => {
    if (!confirm("Remove profile photo?")) return;
    setUploading(true);
    try {
      const res = await apiFetch("/update-profile", {
        method: "POST",
        body: JSON.stringify({ userId: user._id, updates: { profileImage: "" } })
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || "Failed"); return; }
      toast.success("Profile photo removed");
      setPreview(null);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch { toast.error("Remove failed"); } finally { setUploading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
        country: document.getElementById("country").value
      };
      const res = await apiFetch("/update-profile", {
        method: "POST",
        body: JSON.stringify({ userId: user._id, updates })
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || "Save failed"); return; }
      toast.success("Profile saved! ✅");
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch { toast.error("Save failed"); } finally { setSaving(false); }
  };

  const initials = user.fullName?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";
  const inputCls = "w-full mt-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-slate-100 placeholder-slate-400 focus:border-blue-400/40 focus:bg-blue-500/5 outline-none transition";

  return (
    <div className="text-slate-100 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-wide mb-1">Basic Info</h1>
        <p className="text-slate-400 text-sm">Manage your personal details and profile photo.</p>
      </div>

      {/* ============== PHOTO UPLOAD ============== */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-base font-semibold mb-4 text-slate-200">Profile Photo</h2>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar Preview */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
              {preview ? (
                <img src={preview} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
                  {initials}
                </div>
              )}
            </div>
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Upload Area */}
          <div className="flex-1 w-full">
            <div
              onClick={() => !uploading && fileRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition select-none ${dragOver ? "border-blue-400 bg-blue-500/10" : "border-white/20 hover:border-blue-400/60 hover:bg-blue-500/5"}`}>
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm font-medium text-slate-300">Click or drag & drop to upload</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP · Max 2MB</p>
              {uploading && <p className="text-xs text-blue-400 mt-2 animate-pulse">Uploading...</p>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

            {preview && (
              <button onClick={handleRemoveImage} disabled={uploading}
                className="mt-3 w-full py-2 rounded-xl text-sm text-red-400 border border-red-400/20 hover:bg-red-500/10 transition disabled:opacity-40">
                🗑 Remove Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ============== FORM FIELDS ============== */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-base font-semibold text-slate-200">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm text-slate-400">First Name</label>
            <input id="fname" defaultValue={user.firstName || ""} placeholder="First name" className={inputCls} />
          </div>
          <div>
            <label className="text-sm text-slate-400">Last Name</label>
            <input id="lname" defaultValue={user.lastName || ""} placeholder="Last name" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="text-sm text-slate-400">Email</label>
          <input id="email" defaultValue={user.email || ""} type="email" className={inputCls} />
        </div>

        <div>
          <label className="text-sm text-slate-400">Bio <span className="text-slate-500">(max 200 chars)</span></label>
          <textarea id="bio" defaultValue={user.bio || ""} rows="3"
            className={`${inputCls} resize-none`} maxLength={200} placeholder="Tell others about yourself..." />
        </div>

        <div>
          <label className="text-sm text-slate-400">Country</label>
          <select id="country" defaultValue={user.country || "India"} className={inputCls}>
            <option className="text-black">India</option>
            <option className="text-black">USA</option>
            <option className="text-black">UK</option>
            <option className="text-black">Canada</option>
            <option className="text-black">Australia</option>
            <option className="text-black">Germany</option>
          </select>
        </div>

        <button onClick={handleSave} disabled={saving}
          className={`px-6 py-3 rounded-xl font-semibold shadow-md transition ${saving ? "bg-blue-500/30 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 hover:shadow-blue-500/20"}`}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
