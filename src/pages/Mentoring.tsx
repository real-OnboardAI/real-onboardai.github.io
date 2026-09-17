import { Link } from "react-router-dom";

// YouTube videos from @real-onboardai channel
// Thumbnails are loaded directly from YouTube's image CDN (no API key needed).
// To add more videos, append to this array: { id: "VIDEO_ID", title: "...", description: "..." }
const YOUTUBE_VIDEOS = [
  {
    id: "88arM8nizC4",
    title: "Mastering AI Fundamentals",
    description: "A foundational walkthrough of core AI concepts — built for everyone, not just engineers.",
  },
  {
    id: "QwPwO9cjesU",
    title: "AI Value Creators",
    description: "A book review exploring how AI is reshaping who creates value and how businesses compete.",
  },
  {
    id: "lt7PzvG6P_o",
    title: "Teachable Machine Learning with Google",
    description: "Hands-on demo of Google's Teachable Machine — train your first ML model without writing code.",
  },
  {
    id: "yOqf-L4LBPU",
    title: "Hire Your First AI Employee Today",
    description: "Practical guidance on identifying AI tools that act as a force multiplier for your team.",
  },
];

const Mentoring = () => {
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
              <Link to="/speaker" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Speaking
              </Link>
              <Link
                to="/contactus"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
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
            <i className="fa-solid fa-graduation-cap" />
            Learn at Your Own Pace
          </div>

          <h1 className="font-heading text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 fade-in-up">
            AI Mentoring &<br />
            <span className="gradient-text">Learning Resources</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-light fade-in-up delay-100">
            From total beginners to business professionals — practical, jargon-free videos
            to help you understand and apply AI in the real world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-200">
            <a
              href="https://www.youtube.com/@real-onboardai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-youtube" /> Visit the Channel
            </a>
            <Link
              to="/contactus"
              className="bg-sky-500 hover:bg-sky-600 text-white text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center gap-2"
            >
              <i className="fa-regular fa-calendar-check" /> Book Time
            </Link>
            <Link
              to="/"
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm hover:shadow-md inline-flex items-center justify-center"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>



      {/* Stats bar */}
      <section className="py-8 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "4+", label: "Free Videos" },
              { value: "100%", label: "Jargon-Free" },
              { value: "Free", label: "No Login Needed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-extrabold gradient-text">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Video Library
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Start Learning Today
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {YOUTUBE_VIDEOS.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 hover:border-blue-200"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-slate-200 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center shadow-xl">
                      <i className="fa-solid fa-play text-white text-xl ml-1" />
                    </div>
                  </div>
                  {/* YouTube badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <i className="fa-brands fa-youtube" /> YouTube
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {video.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Watch Now <i className="fa-solid fa-arrow-right text-xs" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://www.youtube.com/@real-onboardai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors text-sm"
            >
              <i className="fa-brands fa-youtube text-red-500 text-lg" />
              See all videos on YouTube →
            </a>
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
        <Link to="/speaker" className="hover:text-blue-600 transition-colors">Speaking</Link>
      </footer>
    </div>
  );
};

export default Mentoring;
