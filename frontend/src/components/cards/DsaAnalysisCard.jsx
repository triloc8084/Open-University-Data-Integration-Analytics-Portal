export default function DsaAnalysisCard({ difficulty }) {
  return (
    <div
      className="
      backdrop-blur-2xl bg-white/5 border border-white/10
      rounded-2xl p-6 shadow-xl text-slate-100
      transition hover:border-white/20
      "
    >

      {/* Title */}
      <h2 className="text-lg font-semibold tracking-wide mb-5">
        DSA Topic Analysis
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">

        {/* Easy */}
        <div
          className="
          backdrop-blur-xl bg-white/10 border border-white/10 
          rounded-xl p-4 shadow 
          hover:border-green-400/40 hover:bg-green-500/10
          transition
          "
        >
          <p className="text-xs text-slate-300 mb-1 tracking-wide">
            Easy
          </p>
          <h3 className="text-2xl font-bold text-green-400">
            {difficulty.easy}
          </h3>
        </div>

        {/* Medium */}
        <div
          className="
          backdrop-blur-xl bg-white/10 border border-white/10 
          rounded-xl p-4 shadow 
          hover:border-yellow-400/40 hover:bg-yellow-500/10
          transition
          "
        >
          <p className="text-xs text-slate-300 mb-1 tracking-wide">
            Medium
          </p>
          <h3 className="text-2xl font-bold text-yellow-400">
            {difficulty.medium}
          </h3>
        </div>

        {/* Hard */}
        <div
          className="
          backdrop-blur-xl bg-white/10 border border-white/10 
          rounded-xl p-4 shadow 
          hover:border-red-400/40 hover:bg-red-500/10
          transition
          "
        >
          <p className="text-xs text-slate-300 mb-1 tracking-wide">
            Hard
          </p>
          <h3 className="text-2xl font-bold text-red-400">
            {difficulty.hard}
          </h3>
        </div>

      </div>

    </div>
  );
}
