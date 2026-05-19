export default function Contact() {
  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 px-6 py-20">

      {/* Page Title */}
      <h2
        className="
        text-4xl font-bold text-center mb-12 tracking-wide
        bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent
        "
      >
        Contact Us
      </h2>

      {/* Container */}
      <div
        className="
        max-w-md mx-auto
        backdrop-blur-2xl bg-white/5 border border-white/10
        p-8 rounded-2xl shadow-xl
        space-y-5
        "
      >

        {/* Description */}
        <p className="text-center text-slate-300 text-sm leading-relaxed">
          We’re always happy to help!  
          Reach out to us anytime — we’ll try to respond as soon as possible.
        </p>

        <hr className="border-white/10" />

        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <i className="fa-regular fa-envelope text-blue-300"></i>
            <span>trilochank856@gmail.com</span>
          </p>

          <p className="flex items-center gap-2">
            <i className="fa-solid fa-phone text-blue-300"></i>
            <span>+91-9608942189</span>
          </p>

          <p className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot text-blue-300"></i>
            <span>India</span>
          </p>
        </div>

        <hr className="border-white/10" />

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-xl">
          <a
            href="#"
            className="text-slate-300 hover:text-blue-300 transition"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>

          <a
            href="#"
            className="text-slate-300 hover:text-blue-300 transition"
          >
            <i className="fa-brands fa-github"></i>
          </a>

          <a
            href="#"
            className="text-slate-300 hover:text-blue-300 transition"
          >
            <i className="fa-regular fa-globe"></i>
          </a>
        </div>

        <hr className="border-white/10" />

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400">
          🎓 College Project – 2025  
          <br />
          Designed & Developed for students 👨‍💻
        </p>

      </div>
    </div>
  );
}
