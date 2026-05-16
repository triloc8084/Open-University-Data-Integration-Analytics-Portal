import { useState } from "react";
import Input from "../components/cards/InputCard";
import apiFetch from "../helper/api.js";
import toast from "react-hot-toast";

export default function Feedback() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await apiFetch("/feedback", {
        method: "POST",
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      toast.success(data.msg || "Feedback submitted! Thank you.");
    } catch (err) {
      toast.error("Failed to submit feedback");
      console.log(err);
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen px-4 flex items-center justify-center
      bg-gradient-to-br from-[#091021] via-[#0D162D] to-[#070B17] text-slate-100">

      <div
        className="
        w-full max-w-lg
        backdrop-blur-2xl bg-white/5 border border-white/10
        rounded-2xl p-8 shadow-xl
        hover:border-blue-400/30 transition
        "
      >

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="
            text-3xl font-bold tracking-wide 
            bg-gradient-to-r from-blue-300 to-purple-300
            bg-clip-text text-transparent
            "
          >
            Feedback
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            We’d love to hear your thoughts
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">

          <Input
            placeholder="Your Name"
            value={name}
            onChange={setName}
          />

          <Input
            placeholder="Email Address"
            value={email}
            onChange={setEmail}
            type="email"
          />

          <textarea
            rows="4"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
              w-full p-4 rounded-xl resize-none
              bg-white/10 border border-white/10
              text-slate-100 outline-none
              focus:border-blue-400/30 focus:bg-blue-500/5
              transition
              "
          />

        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="
          w-full mt-8
          bg-gradient-to-r from-blue-500 to-blue-600
          hover:from-blue-400 hover:to-blue-500
          text-white font-semibold tracking-wide
          py-3 rounded-xl
          shadow-md hover:shadow-blue-500/20
          transition-all duration-300
          "
        >
          Submit Feedback
        </button>

      </div>
    </div>
  );
}
