export default function SkillsCard({ skills }) {
  return (
    <div
      className="
      backdrop-blur-2xl bg-white/5 border border-white/10
      rounded-2xl p-6 shadow-xl
      transition hover:border-white/20
      "
    >

      {/* Header */}
      <h2 className="text-lg font-semibold mb-4 tracking-wide text-slate-100">
        Skills
      </h2>

      {/* Content */}
      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <p className="text-sm text-slate-400 tracking-wide">
            No skills added yet
          </p>
        ) : (
          skills.map((skill, index) => (
            <span
              key={index}
              className="
              px-3 py-1.5 rounded-lg text-sm font-medium
              bg-white/10 text-slate-200 border border-white/10
              shadow-sm shadow-blue-500/5
              hover:bg-blue-500/20 hover:border-blue-400/30 hover:text-blue-200
              transition
              "
            >
              {skill}
            </span>
          ))
        )}
      </div>

    </div>
  );
}
