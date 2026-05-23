export default function CertificationCard() {

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const certifications = user.certifications || [];

  return (
    <div
      className="
      backdrop-blur-2xl bg-white/5 border border-white/10
      rounded-2xl p-6 shadow-xl text-slate-100
      transition hover:border-white/20
      "
    >

      <h2 className="text-lg font-semibold tracking-wide mb-4">
        Certifications
      </h2>

      {certifications.length === 0 ? (
        <p className="text-sm text-slate-400 tracking-wide">
          No certifications added
        </p>
      ) : (
        <div className="flex gap-4 flex-wrap">

          {certifications.slice(0, 3).map((cert, index) => (
            <div
              key={index}
              onClick={() => {
                const link = cert.link || cert.url;
                if (link) window.open(link.startsWith("http") ? link : `https://${link}`, "_blank");
              }}
              className="
              backdrop-blur-xl bg-white/10 border border-white/10 
              p-4 rounded-xl w-44 cursor-pointer
              hover:bg-blue-500/20 hover:border-blue-400/30 
              hover:shadow-lg hover:shadow-blue-500/10
              transition
              "
            >
              <p className="text-sm font-semibold truncate">
                {cert.title}
              </p>

              <p className="text-xs text-slate-300 truncate mt-1">
                {cert.organization}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {cert.year}
              </p>
            </div>
          ))}

        </div>
      )}

      {certifications.length > 3 && (
        <button
          className="
          text-blue-400 text-sm mt-4 
          hover:underline hover:text-blue-300
          transition
          "
        >
          Show more
        </button>
      )}

    </div>
  );
}
