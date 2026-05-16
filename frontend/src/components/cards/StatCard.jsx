export default function StatCard({ title, value, subtitle = "", gradient }) {
  return (
    <div className={`p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-2xl ${gradient}`}>
      <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-3">
        {title}
      </p>
      <h2 className="text-4xl font-black text-white mb-2">
        {value}
      </h2>
      {subtitle && (
        <p className="text-xs text-white/60 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}