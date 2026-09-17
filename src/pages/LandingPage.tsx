import { Link } from "react-router-dom";

const LandingPage = () => {
  const services = [
    {
      icon: "fa-solid fa-microphone-lines",
      title: "Speaking",
      description:
        "Keynotes, panels, and workshops on AI adoption, workforce enablement, and the future of work.",
      href: "/speaker",
      accentColor: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverBorder: "hover:border-blue-200",
    },
    {
      icon: "fa-solid fa-briefcase",
      title: "Consulting",
      description:
        "Forward Deployed Engineering for SMBs — mapping AI readiness and deploying tailored solutions.",
      href: "/consulting",
      accentColor: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverBorder: "hover:border-blue-200",
    },
    {
      icon: "fa-solid fa-graduation-cap",
      title: "Mentoring",
      description:
        "Hands-on learning resources, video guides, and personal mentorship to grow your AI skills.",
      href: "/mentoring",
      accentColor: "text-sky-600",
      bgColor: "bg-sky-100",
      hoverBorder: "hover:border-sky-200",
    },
  ];

  return (
    <div className="onboardai-root min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-200 selection:text-blue-900 flex flex-col">
      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
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
              <Link
                to="/speaker"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Speaking
              </Link>
              <Link
                to="/consulting"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Consulting
              </Link>
              <Link
                to="/mentoring"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Mentoring
              </Link>
              <Link
                to="/contactus"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
            {/* Mobile nav links */}
            <div className="flex md:hidden space-x-4 items-center text-sm">
              <Link to="/speaker" className="text-slate-600 hover:text-blue-600 font-medium">Speaking</Link>
              <Link to="/consulting" className="text-slate-600 hover:text-blue-600 font-medium">Consulting</Link>
              <Link to="/mentoring" className="text-slate-600 hover:text-blue-600 font-medium">Mentoring</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden pt-20">
        {/* Subtle background blobs */}
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-100/40 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-8 shadow-sm fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            AI Consulting · Speaking · Mentoring
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 fade-in-up">
            Your Clear Path to <br />
            <span className="gradient-text">AI Adoption</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed font-light fade-in-up delay-100">
            Whether you're a business leader, an audience, or an individual learner — there's a path here for you.
          </p>

          {/* Service cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto fade-in-up delay-200">
            {services.map((svc) => (
              <Link
                key={svc.title}
                to={svc.href}
                className={`group glass-card rounded-2xl p-8 text-left hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl border border-slate-100 ${svc.hoverBorder} relative overflow-hidden`}
              >
                {/* Top-right decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-125" />

                <div className={`w-14 h-14 ${svc.bgColor} ${svc.accentColor} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm transition-transform group-hover:scale-110`}>
                  <i className={svc.icon} />
                </div>

                <h3 className="font-heading font-bold text-xl mb-2 text-slate-900">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {svc.description}
                </p>
                <span className={`text-sm font-semibold ${svc.accentColor} flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Learn More <i className="fa-solid fa-arrow-right text-xs" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} OnboardAI. All rights reserved.
        <span className="mx-3">·</span>
        <span>Industry Agnostic. Process Obsessed.</span>
      </footer>
    </div>
  );
};

export default LandingPage;
