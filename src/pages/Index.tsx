import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Select elements to animate that don't already have the class
    document
      .querySelectorAll(
        ".onboardai-root section h2, .onboardai-root section p, .onboardai-root .glass-card, .onboardai-root .grid > div"
      )
      .forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (!htmlEl.classList.contains("fade-in-up")) {
          htmlEl.style.opacity = "0";
          htmlEl.style.transform = "translateY(20px)";
          observer.observe(htmlEl);
        }
      });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="onboardai-root min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                <i className="fa-solid fa-network-wired"></i>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-slate-900">
                Onboard<span className="text-blue-600">AI</span>
              </span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#mission" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Our Mission
              </a>
              <a href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Services
              </a>
              <a href="#fde-approach" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                The FDE Approach
              </a>
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-100/40 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Next-Gen AI Consulting for SMBs
              </div>
              <h1 className="font-heading text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Bridging the Gap to <br />
                <span className="gradient-text">Seamless AI Integration</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-light">
                We don't just recommend software. We act as{" "}
                <strong className="font-semibold text-slate-800">Forward Deployed Engineers</strong> sitting in the
                trenches to map your true AI readiness and deploy tangible solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#services"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Our Services
                </a>
                <a
                  href="#contact"
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-center px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <i className="fa-regular fa-calendar"></i> Book a Discovery Call
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block fade-in-up delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white p-2">
                {/* Abstract Dashboard/Code placeholder graphic */}
                <img
                  src="https://placehold.co/800x600/f8fafc/2563eb?text=FDE+Architecture+Mapping\n\n[+AI+Readiness+Score:+92%25+]"
                  alt="AI Integration Dashboard Concept"
                  className="w-full h-auto rounded-xl"
                />

                {/* Floating badge */}
                <div
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce"
                  style={{ animationDuration: "3s" }}
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Status</p>
                    <p className="text-sm font-bold text-slate-800">System Optimized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="mission" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">The FDE Advantage</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600">
              We are industry agnostic and process obsessed. Here is how our Forward Deployed Engineering model
              transforms traditional consulting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* FDE Feature 1 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-users-viewfinder"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-slate-900">Embedded Partnership</h3>
              <p className="text-slate-600 leading-relaxed">
                We embed an engineer directly alongside your teams. Active mapping of daily operations, legacy
                systems, and data pipelines to determine true readiness.
              </p>
            </div>

            {/* FDE Feature 2 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-microscope"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-slate-900">Opportunity Identification</h3>
              <p className="text-slate-600 leading-relaxed">
                Pinpointing specific bottlenecks and categorizing them by effort and impact—from quick off-the-shelf
                automation to complex multi-agent system requirements.
              </p>
            </div>

            {/* FDE Feature 3 */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-scale-balanced"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-slate-900">Agnostic Strategy</h3>
              <p className="text-slate-600 leading-relaxed">
                Presenting a vendor-agnostic strategy detailing the optimal mix of buying software, building custom
                architecture, or relying on managed operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Schedule of Services
            </span>
            <h2 className="font-heading text-4xl font-extrabold text-slate-900 mb-4">
              Phase I: Discovery, Strategy &amp; Implementation
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl">
              Moving beyond standard consulting. We identify the bottlenecks, dictate the strategy, and execute the
              technical deployment through three distinct paths.
            </p>
          </div>

          {/* The 3 Execution Paths */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* BUY */}
            <div className="glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl mb-2 text-slate-900">
                Execution Path A:<br />
                <span className="text-blue-600">Buy</span>
              </h3>
              <p className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Tool Provisioning</p>
              <p className="text-slate-600 leading-relaxed">
                Procurement and configuration of SaaS AI tools. We handle the setup of APIs, data pipelines, and
                privacy controls so the software integrates seamlessly into your existing stack.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> SaaS Procurement
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> API &amp; Webhook Configuration
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Privacy &amp; Access Controls
                </li>
              </ul>
            </div>

            {/* BUILD */}
            <div className="glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group border-blue-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md transform -rotate-3">
                <i className="fa-solid fa-code"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl mb-2 text-slate-900">
                Execution Path B:<br />
                <span className="text-blue-600">Build</span>
              </h3>
              <p className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Custom Architecture</p>
              <p className="text-slate-600 leading-relaxed">
                Developing tailored AI solutions (e.g., specialized RAG pipelines, custom internal chatbots), or acting
                as the technical architect to vet and manage third-party development vendors.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Custom RAG Pipelines
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Internal Tool Development
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Third-Party Vendor Management
                </li>
              </ul>
            </div>

            {/* OPERATE */}
            <div className="glass-card rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">
                <i className="fa-solid fa-microchip"></i>
              </div>
              <h3 className="font-heading font-bold text-2xl mb-2 text-slate-900">
                Execution Path C:<br />
                <span className="text-purple-600">Operate</span>
              </h3>
              <p className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Managed AI Delivery</p>
              <p className="text-slate-600 leading-relaxed">
                For specific pain points requiring a completely hands-off approach. We build and operate complex
                workflows internally, delivering final, polished outputs directly to you.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Hands-Off Execution
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Direct Output Delivery
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-1"></i> Managed Infrastructure
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="fde-approach" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform translate-x-4 translate-y-4 opacity-10"></div>
              <img
                src="https://placehold.co/800x800/f8fafc/64748b?text=Team+Co-Working+Sprint"
                alt="Team Collaboration"
                className="rounded-3xl shadow-xl relative z-10 w-full object-cover border border-slate-200"
              />

              {/* Floating stat */}
              <div className="absolute top-10 -right-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <div>
                    <p className="text-3xl font-heading font-bold text-slate-900">100%</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Adoption Focus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Phase II</span>
              <h2 className="font-heading text-4xl font-extrabold text-slate-900 mb-6">
                Enablement, Training &amp; Co-Working
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Technology without adoption is useless. We bridge the gap between deployment and human utilization,
                ensuring your team is fully capable of using the deployed solutions safely and effectively.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <i className="fa-solid fa-chalkboard-user"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-lg">Stakeholder Sessions</h4>
                    <p className="text-slate-600 mt-1">
                      High-level executive briefings on the capabilities, limitations, security, and strategic value of
                      the newly deployed technology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-lg">Role-Based Tracks</h4>
                    <p className="text-slate-600 mt-1">
                      Specialized curriculum tailored specifically to departments so employees only learn what is
                      strictly relevant to their daily tasks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-lg">Co-Working Sprints</h4>
                    <p className="text-slate-600 mt-1">
                      Active, side-by-side sessions where the FDE sits with employees as they use the new AI tools on
                      live, day-to-day company tasks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-lg">SOP Development</h4>
                    <p className="text-slate-600 mt-1">
                      Co-authoring the internal manuals and guidelines for how the business will maintain and use these
                      AI systems moving forward.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background pattern for dark section */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sky-500 font-bold tracking-wider uppercase text-sm mb-2 block">Phase III</span>
            <h2 className="font-heading text-4xl font-extrabold mb-4">Ongoing Optimization &amp; Support</h2>
            <p className="text-lg text-slate-300">
              AI models and tools update rapidly. This phase ensures your business remains at the cutting edge and that
              deployed tools continue to deliver a high ROI over time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-colors">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-sky-500 text-2xl mx-auto mb-6">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Quarterly Health Checks</h3>
              <p className="text-slate-400">
                Reviewing utilization metrics to ensure the team is actively using the tools and efficiency gains are
                realized.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-colors">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-sky-500 text-2xl mx-auto mb-6">
                <i className="fa-solid fa-layer-group"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Stack Updates</h3>
              <p className="text-slate-400">
                Advising the business when a better "Buy" option hits the market, or when a custom "Build" needs a model
                upgrade.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-800 transition-colors">
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-sky-500 text-2xl mx-auto mb-6">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">Continuous FDE Support</h3>
              <p className="text-slate-400">
                Providing ongoing troubleshooting and rapid deployment of minor workflow automations as new challenges
                arise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 md:p-16 text-center border border-blue-100 shadow-lg relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-200 rounded-full opacity-50 blur-2xl"></div>

            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Ready to Architect Your AI Future?
              </h2>
              <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto">
                Stop guessing which tools to buy. Let our Forward Deployed Engineers map your infrastructure and deploy
                tailored AI workflows.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto">
                Schedule Your Discovery Audit <i className="fa-solid fa-arrow-right"></i>
              </button>
              <p className="mt-4 text-sm text-slate-500 font-medium">No obligation. Just a conversation about your processes.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  <i className="fa-solid fa-network-wired"></i>
                </div>
                <span className="font-heading font-bold text-xl text-slate-900">
                  Onboard<span className="text-blue-600">AI</span>
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm mb-6">
                Bridging the gap between small-to-medium-sized businesses and seamless AI integration through Forward
                Deployed Engineering.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <i className="fa-brands fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <i className="fa-brands fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <i className="fa-brands fa-github text-xl"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-slate-900 mb-4">Services</h4>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Phase I: Discovery
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Execution Path: Buy
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Execution Path: Build
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Execution Path: Operate
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Phase II: Enablement
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-slate-500">
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm mb-4 md:mb-0">&copy; 2024 OnboardAI Consulting. All rights reserved.</p>
            <div className="text-slate-400 text-sm flex gap-6">
              <span>Industry Agnostic.</span>
              <span>Process Obsessed.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
