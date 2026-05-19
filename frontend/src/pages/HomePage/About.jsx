export default function About() {
  return (
    <div className="min-h-screen bg-[#060B16] text-slate-100 px-6 py-20">

      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide
      bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
        About Us
      </h2>

      <p className="max-w-3xl mx-auto text-center text-slate-300 text-sm mb-16 leading-relaxed">
        We are a group of passionate developers dedicated to helping students
        learn, practice, and grow through a powerful coding analytics platform.
        Our mission is to make software learning faster, smarter, and more enjoyable
        for everyone.
      </p>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Trilochan Choudhary",
            role: "Full Stack Developer",
            bio: "Optimizing performance and solving hard problems.",
          },
        ].map((user) => (
          <div
            key={user.name}
            className="
            backdrop-blur-xl bg-white/5 border border-white/10
            rounded-2xl p-6 text-center shadow-lg
            "
          >
            <img
              src={`https://api.dicebear.com/9.x/bottts/svg?seed=${user.name}`}
              alt={user.name}
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />

            <h3 className="font-semibold text-lg tracking-wide">
              {user.name}
            </h3>

            <p className="text-sm text-blue-300 mt-1">
              {user.role}
            </p>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              {user.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
