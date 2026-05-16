import { useEffect, useState } from "react";
import apiFetch from "../helper/api.js";

export default function OpportunityPage() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiFetch("/jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#060B16] text-slate-100">

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
          💼 Career Opportunities
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          Jobs & internships curated for students
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && (
        <p className="text-center text-slate-400 tracking-wide">
          No opportunities available right now
        </p>
      )}

      {/* Job Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="
            backdrop-blur-xl bg-white/5 border border-white/10
            rounded-2xl p-6 shadow-lg
            hover:shadow-blue-500/10 hover:bg-blue-500/10
            transition-all duration-500
            flex flex-col justify-between
            group
            "
          >

            {/* Job Title */}
            <h2 className="
              text-lg font-semibold tracking-wide mb-1
              group-hover:text-blue-300 transition
            ">
              {job.jobTitle}
            </h2>

            {/* Company */}
            <p className="text-sm text-slate-400 mb-4">
              {job.companyName}
            </p>

            {/* Description */}
            <p className="text-sm text-slate-200 leading-relaxed mb-6">
              {job.jobDescription}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {job.skillRequire.map((skill, i) => (
                <span
                  key={i}
                  className="
                  text-xs font-medium tracking-wide
                  bg-white/10 border border-white/10
                  px-3 py-1 rounded-full text-slate-200
                  group-hover:bg-blue-500/20 group-hover:text-blue-200
                  transition
                  "
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-2">

              {/* Last Date */}
              <div className="text-xs text-slate-400">
                <span className="opacity-70">⏰ Last Date:</span>
                <span className="text-slate-100 ml-1 font-medium">
                  {job.lastDate}
                </span>
              </div>

              {/* Apply Button */}
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                bg-gradient-to-r from-blue-500 to-blue-600
                hover:from-blue-400 hover:to-blue-500
                text-white px-4 py-2 rounded-lg
                text-sm font-semibold tracking-wide
                transition shadow-md hover:shadow-blue-500/20
                "
              >
                Apply Now
              </a>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
