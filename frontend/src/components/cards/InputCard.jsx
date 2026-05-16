export default function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full p-3 bg-[#1a1a1a]
        border border-[#333]
        rounded-xl
        text-white
        outline-none
        focus:border-orange-500
        focus:ring-1 focus:ring-orange-500
      "
    />
  );
}
