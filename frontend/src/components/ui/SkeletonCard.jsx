export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-xl bg-white/5 border border-white/10 ${className}`}>
      <div className="p-6 space-y-3">
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-8 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-white/10" />
        <div className="h-4 bg-white/10 rounded w-32" />
      </div>
      <div className="h-8 w-16 bg-white/10 rounded-lg" />
    </div>
  );
}

export function SkeletonText({ width = "full" }) {
  return <div className={`animate-pulse h-3 bg-white/10 rounded w-${width}`} />;
}
