import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// ADD YOUR SPEAKER PHOTOS HERE
// Place images in: public/speaker/
// Name them: speaking-1.jpg, speaking-2.jpg, speaking-3.jpg, etc.
// Then add the filename to the array below.
// ─────────────────────────────────────────────────────────────────────────────
const SPEAKER_PHOTOS: { file: string; caption?: string }[] = [
  { file: "speaking-1.jpg" },
  { file: "speaking-2.jpg" },
  { file: "speaking-3.jpg" },
  { file: "speaking-4.jpg" },
  { file: "speaking-5.jpg" },
  { file: "speaking-6.jpg" },
];

const Speaker = () => {
  return (
    <div className="onboardai-root min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/real_onboard_ai_logo.jpeg"
                alt="OnboardAI Logo"
                className="w-10 h-10 rounded-lg object-cover shadow-md"
              />
              <span className="font-heading font-bold text-2xl tracking-tight text-slate-900">
                Onboard<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                ← Home
              </Link>
              <Link to="/consulting" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Consulting
              </Link>
              <Link to="/mentoring" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Mentoring
              </Link>
              <Link
                to="/contactus"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book a Talk
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-100/40 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-6 shadow-sm fade-in-up">
            <i className="fa-solid fa-microphone-lines" />
            AI Speaker & Educator
          </div>

          <h1 className="font-heading text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 fade-in-up">
            Speaking on the <br />
            <span className="gradient-text">Future of AI</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-light fade-in-up delay-100">
            Keynotes, panel discussions, and workshops that make AI accessible
            for business leaders, teams, and communities — without the jargon.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-200">
            <Link
              to="/contactus"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book a Speaking Engagement
            </Link>
            <Link
              to="/"
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm hover:shadow-md"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Topics */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Speaking Topics
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "fa-solid fa-robot",
                title: "AI for Non-Technical Leaders",
                desc: "Cutting through the hype to help executives make informed decisions about AI adoption.",
              },
              {
                icon: "fa-solid fa-people-group",
                title: "Workforce Enablement",
                desc: "How organizations can upskill teams, drive adoption, and thrive alongside AI tools.",
              },
              {
                icon: "fa-solid fa-map-signs",
                title: "AI Readiness & Strategy",
                desc: "Frameworks for assessing where your organization stands and where to invest first.",
              },
            ].map((topic) => (
              <div
                key={topic.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors group"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className={topic.icon} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3 text-slate-900">{topic.title}</h3>
                <p className="text-slate-600 leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              On Stage
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Photo Gallery
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
          </div>

          {SPEAKER_PHOTOS.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SPEAKER_PHOTOS.map((photo, index) => (
                <div
                  key={photo.file}
                  className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 aspect-[4/3] bg-slate-100"
                >
                  <img
                    src={`/speaker/${photo.file}`}
                    alt={photo.caption || `Speaking engagement ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Hide images that don't exist yet
                      (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                    }}
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <i className="fa-solid fa-images text-5xl mb-4 block" />
              <p className="text-lg">Photos coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 md:p-16 text-center border border-blue-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white rounded-full opacity-50 blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-200 rounded-full opacity-50 blur-2xl" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Bring AI Education to Your Event
              </h2>
              <p className="text-lg text-slate-700 mb-8 max-w-xl mx-auto">
                Available for conferences, corporate events, panels, and community workshops.
              </p>
              <Link
                to="/contactus"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3"
              >
                Get in Touch <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} OnboardAI. All rights reserved.
        <span className="mx-3">·</span>
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span className="mx-3">·</span>
        <Link to="/consulting" className="hover:text-blue-600 transition-colors">Consulting</Link>
        <span className="mx-3">·</span>
        <Link to="/mentoring" className="hover:text-blue-600 transition-colors">Mentoring</Link>
      </footer>
    </div>
  );
};

export default Speaker;
