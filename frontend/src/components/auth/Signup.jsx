import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../helper/api.js";

export default function Signup({ setShowSignup }) {
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  // ==============================
  // ALL INDIA STATES + UTs
  // ==============================
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman & Nicobar Islands",
    "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh", "Lakshadweep",
    "Puducherry", "Dadra & Nagar Haveli", "Daman & Diu"
  ];

  // ==============================
  // POPULAR COLLEGES PER STATE
  // ==============================
  const collegeData = {

  // =================== ANDHRA PRADESH ===================
  "Andhra Pradesh": [
    "IIT Tirupati (Govt)", "Andhra University (Govt)", "NIT Andhra Pradesh (Govt)",
    "SVU College of Engineering (Govt)", "Aditya Engineering College (Private)",
    "KL University (Private)", "VIT AP University (Private)",
    "Gayatri Vidya Parishad College (Private)", "Sri Vasavi Engineering College (Private)",
    "Sree Vidyanikethan Engineering College (Private)"
  ],

  // =================== ARUNACHAL PRADESH ===================
  "Arunachal Pradesh": [
    "NERIST (Govt)", "Rajiv Gandhi University (Govt)", "Himalayan University (Private)",
    "Indira Gandhi Technical University (Govt)", "Vivekananda Global University (Private)",
    "Arunachal University of Studies (Private)", "North East Frontier Technical University (Private)",
    "Apex Professional University (Private)", "National Institute of Technology Study Center (Govt)",
    "Dera Natung Government College (Govt)"
  ],

  // =================== ASSAM ===================
  "Assam": [
    "IIT Guwahati (Govt)", "Assam Engineering College (Govt)", "Tezpur University (Govt)",
    "NIT Silchar (Govt)", "Jorhat Engineering College (Govt)",
    "Royal Global University (Private)", "Assam Down Town University (Private)",
    "Kaziranga University (Private)", "Girijananda Institute of Management (Private)",
    "Cotton University (Govt)"
  ],

  // =================== BIHAR ===================
  "Bihar": [
    "IIT Patna (Govt)", "NIT Patna (Govt)", "Nalanda University (Govt)",
    "Patna University (Govt)", "BIT Patna (Private)",
    "Muzaffarpur Institute of Technology (Govt)", "Amity Patna (Private)",
    "CIMAGE College (Private)", "St. Xavier’s College Patna (Private)",
    "Aryabhatta Knowledge University (Govt)"
  ],

  // =================== CHHATTISGARH ===================
  "Chhattisgarh": [
    "IIT Bhilai (Govt)", "NIT Raipur (Govt)", "BIT Raipur (Private)",
    "IIIT Naya Raipur (Govt)", "Amity Raipur (Private)",
    "ITM University (Private)", "AAFT University (Private)",
    "MATS University (Private)", "Kalinga University (Private)",
    "Pt Ravishankar Shukla University (Govt)"
  ],

  // =================== DELHI ===================
  "Delhi": [
    "IIT Delhi (Govt)", "NSUT (Govt)", "DTU (Govt)", "Delhi University (Govt)",
    "IGNOU (Govt)", "Jamia Millia Islamia (Govt)",
    "Amity Delhi (Private)", "Shiv Nadar University (Private)",
    "JIMS Rohini (Private)", "IILM University (Private)",
    "Ambedkar University Delhi (Govt)", "Maharaja Agrasen Institute (Private)"
  ],

  // =================== GUJARAT ===================
  "Gujarat": [
    "IIT Gandhinagar (Govt)", "Nirma University (Private)", "MSU Baroda (Govt)",
    "GTU Ahmedabad (Govt)", "DAIICT (Private)",
    "CEPT University (Private)", "PDPU (Private)",
    "LDCE Ahmedabad (Govt)", "Parul University (Private)",
    "Ahmedabad University (Private)"
  ],

  // =================== KARNATAKA ===================
  "Karnataka": [
    "IISc Bangalore (Govt)", "NIT Surathkal (Govt)", "RVCE (Private)",
    "BMS College (Private)", "PES University (Private)",
    "MSRIT (Private)", "Christ University (Private)",
    "Jain University (Private)", "Manipal University (Private)",
    "Dayananda Sagar College (Private)", "Reva University (Private)",
    "CMRIT Bangalore (Private)"
  ],

  // =================== MAHARASHTRA ===================
  "Maharashtra": [
    "IIT Bombay (Govt)", "COEP Pune (Govt)", "VIT Pune (Private)",
    "Symbiosis University (Private)", "Savitribai Phule Pune University (Govt)",
    "MIT Pune (Private)", "Amity Mumbai (Private)",
    "DY Patil University (Private)", "NMIMS Mumbai (Private)",
    "St. Xavier’s College Mumbai (Private)", "Bharati Vidyapeeth University (Private)",
    "Walchand College (Govt)"
  ],

  // =================== PUNJAB (LPU added) ===================
  "Punjab": [
    "IIT Ropar (Govt)", "Punjab University (Govt)", "Thapar Institute (Private)",
    "Lovely Professional University (Private)", "Guru Nanak Dev University (Govt)",
    "Chitkara University (Private)", "GNA University (Private)",
    "DAV College Jalandhar (Private)", "Amity Mohali (Private)",
    "CT University (Private)", "Rayat Bahra University (Private)",
    "Punjab Agricultural University (Govt)"
  ],

  // =================== TAMIL NADU ===================
  "Tamil Nadu": [
    "IIT Madras (Govt)", "Anna University (Govt)", "VIT Chennai (Private)",
    "SRM Institute (Private)", "PSG College (Private)",
    "Sathyabama University (Private)", "Bharath University (Private)",
    "Amrita Vishwa Vidyapeetham (Private)", "Loyola College (Private)",
    "Madras Christian College (Private)", "Dr MGR University (Private)"
  ],

  // =================== UTTAR PRADESH ===================
  "Uttar Pradesh": [
    "IIT Kanpur (Govt)", "MMM Gorakhpur (Govt)", "AKTU (Govt)",
    "Galgotias University (Private)", "Sharda University (Private)",
    "Gautam Buddha University (Govt)", "Amity Lucknow (Private)",
    "Integral University (Private)", "IIM Lucknow (Govt)",
    "Allenhouse Institute (Private)", "GLA University (Private)"
  ],

  // =================== WEST BENGAL ===================
  "West Bengal": [
    "IIT Kharagpur (Govt)", "Jadavpur University (Govt)",
    "Heritage Institute (Private)", "IEM Kolkata (Private)",
    "Techno India University (Private)", "St. Xavier’s College (Private)",
    "GNIT (Private)", "Presidency University (Govt)",
    "CU Kolkata (Govt)", "Adamas University (Private)",
    "Brainware University (Private)"
  ]
};


  const colleges =
    selectedState && collegeData[selectedState]
      ? collegeData[selectedState]
      : [];

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    const fullName = e.target.fullName.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const state = e.target.state.value.trim();
    const college = e.target.college.value.trim();
    const role = "Student";

    if (!fullName || !email || !password || !state || !college) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role, state, college }),
      });

      const data = await res.json();
      toast.success(data.message || "Signup completed");

      if (res.ok) {
        e.target.reset();
        setShowSignup(false);
      }

    } catch (error) {
      toast.error("Server error. Please try again later.");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      w-full max-w-sm
      backdrop-blur-2xl bg-white/5 border border-white/10
      rounded-2xl p-8 shadow-xl text-slate-100
      "
    >
      <div className="text-center mb-8">
        <h1
          className="
          text-3xl font-bold tracking-wide
          bg-gradient-to-r from-blue-300 to-purple-300
          bg-clip-text text-transparent
          "
        >
          Create Account
        </h1>

        <p className="text-sm text-slate-300 mt-2">
          Start your learning journey
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSignup}>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 border border-slate-600
              text-slate-100 placeholder-slate-400
              focus:border-blue-400/60 focus:bg-slate-700
              outline-none
              transition
            "
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 border border-slate-600
              text-slate-100 placeholder-slate-400
              focus:border-blue-400/60 focus:bg-slate-700
              outline-none
              transition
            "
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 border border-slate-600
              text-slate-100 placeholder-slate-400
              focus:border-blue-400/60 focus:bg-slate-700
              outline-none
              transition
            "
          />
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">
            State
          </label>
          <select
            name="state"
            required
            onChange={(e) => {
              setSelectedState(e.target.value);
              e.target.form.college.value = "";
            }}
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 border border-slate-600
              text-slate-200
              focus:border-blue-400/60 focus:bg-slate-700
              outline-none
            "
          >
            <option className="text-black" value="">Select State</option>
            {states.map((st) => (
              <option className="text-black" key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* College */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-300">
            College
          </label>
          <select
            name="college"
            required
            disabled={!selectedState || colleges.length === 0}
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 border border-slate-600
              text-slate-200
              focus:border-blue-400/60 focus:bg-slate-700
              outline-none
            "
          >
            <option className="text-black" value="">Select College</option>

            {colleges.length > 0 ? (
              colleges.map((clg) => (
                <option className="text-black" key={clg} value={clg}>
                  {clg}
                </option>
              ))
            ) : (
              <option className="text-black" disabled>No colleges available</option>
            )}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-xl font-semibold tracking-wide text-white
            transition shadow-md
            ${
              loading
                ? "bg-blue-500/30 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 hover:shadow-blue-500/20"
            }
          `}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => setShowSignup(false)}
          className="text-blue-300 font-medium cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );
}
