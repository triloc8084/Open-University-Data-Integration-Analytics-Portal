import { useEffect, useState } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
      backdrop-blur-2xl bg-white/5 border border-white/10
      rounded-2xl p-5 shadow-xl
      flex items-center justify-center
      hover:border-blue-400/30 hover:bg-blue-500/10 transition
      "
    >
      <span className="text-3xl font-mono font-semibold tracking-wide text-blue-300">
        {time.toLocaleTimeString()}
      </span>
    </div>
  );
}
