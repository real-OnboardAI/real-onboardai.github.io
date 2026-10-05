import { useEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import "./ai4young.css";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

const BELIEF =
  "Every young mind has the power to shape a better future. AI is the tool. Curiosity is the fuel.";

const floaters = [
  { icon: "fa-robot", x: "8%", y: "22%", dx: -30, dy: -20, d: "0s", tone: "bg-blue-100 text-blue-600" },
  { icon: "fa-lightbulb", x: "84%", y: "18%", dx: 26, dy: -24, d: "1.2s", tone: "bg-amber-100 text-amber-600" },
  { icon: "fa-rocket", x: "78%", y: "68%", dx: 30, dy: 20, d: "2.1s", tone: "bg-sky-100 text-sky-600" },
  { icon: "fa-brain", x: "12%", y: "70%", dx: -28, dy: 24, d: "0.6s", tone: "bg-violet-100 text-violet-600" },
  { icon: "fa-code", x: "26%", y: "12%", dx: -14, dy: -34, d: "1.7s", tone: "bg-emerald-100 text-emerald-600" },
  { icon: "fa-seedling", x: "64%", y: "84%", dx: 12, dy: 34, d: "2.6s", tone: "bg-lime-100 text-lime-700" },
  { icon: "fa-satellite", x: "62%", y: "10%", dx: 16, dy: -36, d: "3.1s", tone: "bg-indigo-100 text-indigo-600" },
  { icon: "fa-puzzle-piece", x: "32%", y: "86%", dx: -12, dy: 32, d: "0.9s", tone: "bg-rose-100 text-rose-600" },
];

const offerings = [
  { icon: "fa-book-open", title: "Free learning content", text: "Structured, free material on AI and Data Science, written for school-age learners." },
  { icon: "fa-flask", title: "Hands-on projects", text: "Experiments and builds where kids make something real, not just read about it." },
  { icon: "fa-newspaper", title: "Curated news", text: "What is happening in AI and tech, picked and explained for young readers and their families." },
  { icon: "fa-comments", title: "Real-world discussions", text: "Conversations that connect AI to the rest of life: science, art, health, the planet." },
  { icon: "fa-shapes", title: "Beyond AI", text: "Growing into Computer Science, Engineering and Math as the community grows." },
];

const audiences = [
  { icon: "fa-children", title: "Students", text: "K-12 kids who are curious about how AI works and want to build with it." },
  { icon: "fa-people-roof", title: "Parents", text: "Families who want to explore AI together and talk about using it safely." },
  { icon: "fa-person-chalkboard", title: "Teachers", text: "Educators looking for ways to bring AI into their classrooms." },
  { icon: "fa-hand-holding-heart", title: "Mentors", text: "Anyone motivated to train, guide and encourage young learners." },
];

const planSteps = [
  {
    num: "01",
    icon: "fa-brain",
    title: "AI is more than a chatbot",
    text: "Start by widening the picture. ChatGPT is one kind of AI; there are many more, and most of them never chat at all.",
    tone: "from-violet-500 to-blue-600",
  },
  {
    num: "02",
    icon: "fa-satellite",
    title: "AI in the wild",
    text: "Show it working: a robot that picks ripe tomatoes, AI helping space programs, and tools that help save lives.",
    tone: "from-blue-600 to-sky-500",
  },
  {
    num: "03",
    icon: "fa-wand-magic-sparkles",
    title: "Show and tell",
    text: "Put real tools on the screen, like the experiments on Google Labs, so kids can see what they can try at home.",
    tone: "from-sky-500 to-emerald-500",
  },
  {
    num: "04",
    icon: "fa-comments",
    title: "Open discussion",
    text: "End with the kids' questions. Whatever they want to ask, the room talks it through together.",
    tone: "from-emerald-500 to-lime-500",
  },
  {
    num: "+1",
    icon: "fa-hand-sparkles",
    title: "Then we let them build",
    text: "On the day, one more piece was added: every kid trained their own AI model with Google Teachable Machine. It became the part everyone talked about.",
    tone: "from-amber-500 to-rose-500",
  },
];

const rings = [
  { n: 7, of: 12, label: "said it fully met or exceeded their expectations" },
  { n: 9, of: 12, label: "found it easy or very easy to understand" },
  { n: 12, of: 12, label: "said the material was OK or easier" },
];

const quotes = [
  { text: "The final part when we used the website to make our own AI.", who: "Participant, on what they liked most", speed: -0.12 },
  { text: "AI can be used for tasks to save people's lives.", who: "Participant, on what they learned", speed: 0.08 },
  { text: "I want to give my daughter an introduction to AI.", who: "Parent", speed: -0.05 },
  { text: "Hands on.", who: "Said again and again, on liked most, most useful and what to improve", speed: 0.14 },
  { text: "How to teach AI for kids.", who: "Adult participant, on the most useful thing", speed: -0.1 },
  { text: "Harms of using AI.", who: "Participant, on the most useful thing", speed: 0.06 },
];

const lessons = [
  { icon: "fa-hands", title: "Hands-on is the anchor", text: "Training a model was the most praised part. Next time the whole session is built around it." },
  { icon: "fa-scissors", title: "Fewer slides", text: "“Minimize slides” was the clearest ask. The intro gets shorter and more interactive." },
  { icon: "fa-hourglass-half", title: "Watch the clock", text: "4 of 12 found three hours too long. Less presenting, more doing." },
  { icon: "fa-trophy", title: "A little friendly competition", text: "Small prizes during the concept parts help younger kids stay with it." },
  { icon: "fa-person-walking", title: "Everyone at their own pace", text: "Some wanted more, some needed help. Small self-paced tasks with helpers nearby." },
];

const topics = [
  { label: "Building simple AI apps", votes: 10 },
  { label: "Coding with AI assistants", votes: 9 },
  { label: "AI for images, music and video", votes: 8 },
  { label: "Robotics and AI", votes: 7 },
  { label: "How machine learning works", votes: 5 },
  { label: "Prompting and using AI chatbots", votes: 4 },
  { label: "Working with data", votes: 4 },
  { label: "AI ethics, safety and privacy", votes: 3 },
];

const nextAgenda = [
  { title: "AI in the wild", detail: "Videos and robots up front", min: 20, tone: "bg-sky-500" },
  { title: "What AI is", detail: "Quiz-style, with small prizes", min: 20, tone: "bg-violet-500" },
  { title: "Train your own model", detail: "Self-paced, helpers circulating", min: 60, tone: "bg-amber-500" },
  { title: "Show and tell", detail: "Kids present what they built", min: 20, tone: "bg-emerald-500" },
  { title: "Safe use and discussion", detail: "Ethics tied to what they made", min: 20, tone: "bg-blue-600" },
];

const builderSeries = [
  { icon: "fa-mobile-screen-button", label: "Simple AI apps" },
  { icon: "fa-laptop-code", label: "Coding with AI assistants" },
  { icon: "fa-palette", label: "Images, music and video" },
  { icon: "fa-robot", label: "Robots with AI code" },
  { icon: "fa-bolt", label: "Kid-sized hackathons" },
];

const AI4Young = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "AI4YoungMinds · OnboardAI";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const reveals = root.querySelectorAll<HTMLElement>(".a4y-reveal, [data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    reveals.forEach((el) => io.observe(el));

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight - vh;
      root.style.setProperty("--page", docH > 0 ? (window.scrollY / docH).toFixed(4) : "0");

      root.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
        const r = scene.getBoundingClientRect();
        const travel = r.height - vh;
        const p = travel > 0 ? clamp(-r.top / travel) : clamp((vh - r.top) / (vh + r.height));
        scene.style.setProperty("--p", p.toFixed(4));
        // entry progress: starts as the scene comes into view, so rings and counters are moving by the time it pins
        const e = clamp((vh - r.top) / (vh * 1.6));
        scene.style.setProperty("--e", e.toFixed(4));

        const track = scene.querySelector<HTMLElement>(".a4y-track");
        if (track) {
          const pad = parseFloat(getComputedStyle(track.parentElement as HTMLElement).paddingLeft) || 0;
          scene.style.setProperty("--dist", `${Math.max(0, track.scrollWidth - window.innerWidth + pad * 2)}px`);
        }

        const steps = Number(scene.dataset.steps || 0);
        if (steps) {
          const active = Math.min(steps - 1, Math.floor(p * steps));
          scene.querySelectorAll<HTMLElement>("[data-step]").forEach((el) => {
            const i = Number(el.dataset.step);
            el.classList.toggle("is-active", i === active);
            el.classList.toggle("is-past", i < active);
          });
        }

        scene.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          el.textContent = String(Math.round(target * e));
        });
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((block) => {
        const r = block.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        block.style.setProperty("--offset", (r.top + r.height / 2 - vh / 2).toFixed(1));
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const apply = () => {
      root.classList.toggle("a4y-static", reduce.matches);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (reduce.matches) {
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => (el.textContent = el.dataset.count ?? ""));
        reveals.forEach((el) => el.classList.add("is-in"));
        return;
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    };

    apply();
    reduce.addEventListener("change", apply);

    return () => {
      io.disconnect();
      reduce.removeEventListener("change", apply);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const beliefWords = BELIEF.split(" ");
  const respondents = 12;

  return (
    <div ref={rootRef} className="a4y onboardai-root min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
      <div className="a4y-progress" aria-hidden="true" />

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img src="/real_onboard_ai_logo.jpeg" alt="OnboardAI Logo" className="w-10 h-10 rounded-lg object-cover shadow-md" />
              <span className="font-heading font-bold text-2xl tracking-tight text-slate-900">
                Onboard<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/speaker" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Speaking</Link>
              <Link to="/consulting" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Consulting</Link>
              <Link to="/mentoring" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Mentoring</Link>
              <a href="#join" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg">
                Join the community
              </a>
            </div>
            <a href="#join" className="md:hidden bg-blue-600 text-white text-sm px-4 py-2 rounded-full font-medium shadow-md">
              Join
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* 1. Hero: icons scatter outward as you scroll in */}
        <section data-scene className="a4y-scene a4y-hero" aria-label="AI4YoungMinds">
          <div className="a4y-pin flex items-center justify-center bg-gradient-to-b from-white via-sky-50 to-blue-50">
            <div className="absolute top-[-10%] right-[-10%] w-[520px] h-[520px] rounded-full bg-blue-100/60 blur-3xl" aria-hidden="true" />
            <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-amber-100/50 blur-3xl" aria-hidden="true" />

            {floaters.map((f) => (
              <div
                key={f.icon}
                className="a4y-float hidden sm:block"
                aria-hidden="true"
                style={{ "--x": f.x, "--y": f.y, "--dx": f.dx, "--dy": f.dy, "--d": f.d } as Vars}
              >
                <span className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${f.tone} items-center justify-center text-2xl shadow-lg`}>
                  <i className={`fa-solid ${f.icon}`} />
                </span>
              </div>
            ))}

            <div className="relative max-w-4xl mx-auto px-4 text-center">
              <div className="a4y-hero-title">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-700 font-medium text-sm mb-8 shadow-sm">
                  <i className="fa-solid fa-heart text-rose-500" />
                  A free community · Austin, TX
                </div>
                <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-extrabold text-slate-900 leading-[1.05] mb-6">
                  AI4<span className="gradient-text">YoungMinds</span>
                </h1>
                <p className="text-lg sm:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                  Empowering the next generation to learn, build, and innovate with AI, responsibly and ethically.
                </p>
                <div className="mt-14 flex flex-col items-center gap-2 text-slate-400 text-sm">
                  <span>Scroll to read the story</span>
                  <i className="fa-solid fa-chevron-down a4y-cue" />
                </div>
              </div>

              <div className="a4y-hero-next-wrap absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                <p className="a4y-hero-next font-heading text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                  It started with a simple idea about kids and curiosity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Belief: pinned, words light up one by one */}
        <section data-scene className="a4y-scene" style={{ height: "260vh" }} aria-label="What we believe">
          <div className="a4y-pin flex items-center bg-slate-900 text-white">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-sky-400 font-semibold tracking-widest uppercase text-sm mb-6">What we believe</p>
              <p className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ "--n": beliefWords.length } as Vars}>
                {beliefWords.map((w, i) => {
                  const bare = w.replace(/[^\w]/g, "");
                  const hl = bare === "tool" ? "text-sky-400" : bare === "fuel" ? "text-amber-400" : "";
                  return (
                    <span key={i} className={`a4y-word ${hl}`} style={{ "--i": i } as Vars}>
                      {w}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Who it's for */}
        <section className="py-24 sm:py-32 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl a4y-reveal">
              <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4">Who it's for</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                A whole village around every curious kid.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                AI4YoungMinds is a community for school children, their parents, their teachers, and anyone who wants to
                mentor, train or motivate young minds in Computer Science, AI and Data Science.
              </p>
            </div>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiences.map((a, i) => (
                <div
                  key={a.title}
                  className="a4y-reveal rounded-2xl border border-slate-100 bg-slate-50 p-7 shadow-sm"
                  style={{ "--delay": `${i * 0.1}s` } as Vars}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-5">
                    <i className={`fa-solid ${a.icon}`} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">{a.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. What we offer: pinned horizontal track */}
        <section data-scene className="a4y-scene" style={{ height: "320vh" }} aria-label="What the community offers">
          <div className="a4y-pin flex flex-col justify-center bg-gradient-to-br from-blue-600 to-sky-500 text-white">
            <div className="px-6 sm:px-12 mb-8">
              <p className="text-blue-100 font-semibold tracking-widest uppercase text-sm mb-3">What we offer</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight max-w-3xl">
                Everything is free. Everything is hands-on.
              </h2>
            </div>
            <div className="px-6 sm:px-12">
              <div className="a4y-track">
                {offerings.map((o, i) => (
                  <article
                    key={o.title}
                    className="w-[78vw] sm:w-[380px] shrink-0 rounded-3xl bg-white/95 text-slate-800 p-8 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                        <i className={`fa-solid ${o.icon}`} />
                      </div>
                      <span className="font-heading text-5xl font-extrabold text-slate-100">0{i + 1}</span>
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-slate-900 mb-3">{o.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{o.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Not here to sell: parallax band */}
        <section data-parallax className="relative overflow-hidden bg-slate-950 text-white py-32 sm:py-44 px-4">
          <div
            className="a4y-par absolute inset-0 flex items-center justify-center font-heading font-extrabold text-[28vw] leading-none text-white/[0.04] select-none"
            style={{ "--speed": -0.35 } as Vars}
            aria-hidden="true"
          >
            FREE
          </div>
          <div className="a4y-par absolute -top-10 left-[8%] w-40 h-40 rounded-full bg-blue-600/30 blur-2xl" style={{ "--speed": 0.25 } as Vars} aria-hidden="true" />
          <div className="a4y-par absolute bottom-0 right-[10%] w-56 h-56 rounded-full bg-amber-500/20 blur-2xl" style={{ "--speed": -0.2 } as Vars} aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto text-center a4y-par" style={{ "--speed": 0.08 } as Vars}>
            <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-6">Our promise</p>
            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold leading-tight mb-8">
              We are not here to sell you anything.
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              AI4YoungMinds is run by volunteers, for the community. No product, no upsell. Just people who care about
              kids learning to use AI well, growing by word of mouth from one family to the next.
            </p>
          </div>
        </section>

        {/* 6. The plan: pinned, stepped */}
        <section data-scene data-steps={planSteps.length} className="a4y-scene" style={{ height: `${planSteps.length * 90 + 60}vh` }} aria-label="How the first session was planned">
          <div className="a4y-pin bg-slate-50">
            <div className="h-full max-w-6xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 content-center">
              <div className="self-center pt-6 lg:pt-0">
                <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4">Summer 2026</p>
                <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-4">
                  A plan for one half‑day.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed hidden sm:block">
                  The first program was sketched out over a planning call with a community advisor: a single morning for
                  middle schoolers, moving from big ideas to real examples to tools they could touch.
                </p>
                <div className="a4y-dots flex gap-3 mt-8" aria-hidden="true">
                  {planSteps.map((s, i) => (
                    <span key={s.num} data-step={i} className="a4y-dot w-2.5 h-2.5 rounded-full bg-slate-300" />
                  ))}
                </div>
              </div>
              <div className="a4y-steps h-[340px] sm:h-[380px] self-center">
                {planSteps.map((s, i) => (
                  <article key={s.num} data-step={i} className="a4y-step rounded-3xl bg-white border border-slate-100 shadow-xl p-7 sm:p-10 flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.tone} text-white flex items-center justify-center text-2xl shadow-md`}>
                        <i className={`fa-solid ${s.icon}`} />
                      </div>
                      <span className="font-heading text-4xl font-extrabold text-slate-200">{s.num}</span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{s.title}</h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{s.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. The day */}
        <section data-parallax className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-28 sm:py-36 px-4">
          <div className="a4y-par absolute top-16 right-[6%] text-amber-200 text-[160px] hidden md:block" style={{ "--speed": -0.25 } as Vars} aria-hidden="true">
            <i className="fa-solid fa-sun" />
          </div>
          <div className="a4y-par absolute bottom-10 left-[4%] text-sky-200 text-[120px] hidden md:block" style={{ "--speed": 0.2 } as Vars} aria-hidden="true">
            <i className="fa-solid fa-robot" />
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="a4y-reveal text-center">
              <p className="text-amber-600 font-semibold tracking-widest uppercase text-sm mb-4">Chapter one</p>
              <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Saturday, October 3, 2026
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Our first session, <strong className="text-slate-900">Introduction to AI</strong>, opened its doors in Austin.
                Middle schoolers came with a parent, and the morning was free for everyone.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {[
                ["fa-ticket", "Free"],
                ["fa-clock", "Three hours"],
                ["fa-user-group", "One kid, one parent"],
                ["fa-location-dot", "Austin, TX"],
              ].map(([icon, label], i) => (
                <span key={label} className="a4y-reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-amber-100 shadow-sm text-slate-700 font-medium" style={{ "--delay": `${i * 0.08}s` } as Vars}>
                  <i className={`fa-solid ${icon} text-amber-500`} /> {label}
                </span>
              ))}
            </div>

            <div className="mt-16 grid md:grid-cols-[auto_1fr] gap-10 items-center">
              <div className="a4y-reveal text-center md:text-left">
                <div className="font-heading text-8xl sm:text-9xl font-extrabold gradient-text leading-none">22</div>
                <p className="text-slate-600 mt-2 font-medium">families signed up</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  ["fa-robot", "Robot demos", "Real robots, up close."],
                  ["fa-heart-pulse", "AI that helps people", "Real-world uses, including ones that save lives."],
                  ["fa-hand-sparkles", "Train your own model", "Kids taught a computer to recognise things with Teachable Machine."],
                  ["fa-shield-heart", "An honest look at harms", "Where AI can go wrong, and why that matters."],
                ].map(([icon, title, text], i) => (
                  <li key={title} className="a4y-reveal rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex gap-4" style={{ "--delay": `${i * 0.1}s` } as Vars}>
                    <i className={`fa-solid ${icon} text-blue-600 text-xl mt-1`} />
                    <div>
                      <h3 className="font-heading font-bold text-slate-900">{title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. The numbers: pinned, rings fill and counters climb */}
        <section data-scene className="a4y-scene" style={{ height: "220vh" }} aria-label="How it went">
          <div className="a4y-pin flex items-center bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-6 w-full">
              <p className="text-sky-400 font-semibold tracking-widest uppercase text-sm mb-4">How it went</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight mb-12 max-w-3xl">
                12 feedback forms came back. Here is what they said.
              </h2>
              <svg width="0" height="0" className="absolute" aria-hidden="true">
                <defs>
                  <linearGradient id="a4y-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="grid grid-cols-3 gap-4 sm:gap-10">
                {rings.map((r) => (
                  <figure key={r.label} className="text-center">
                    <div className="relative mx-auto w-24 h-24 sm:w-40 sm:h-40">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
                        <circle
                          cx="50" cy="50" r="46" fill="none" stroke="url(#a4y-grad)" strokeWidth="7" strokeLinecap="round"
                          className="a4y-ring-fg" style={{ "--frac": r.n / r.of } as Vars}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-heading font-extrabold text-2xl sm:text-4xl">
                        <span data-count={r.n}>{r.n}</span>
                        <span className="text-slate-500 text-base sm:text-xl">/{r.of}</span>
                      </div>
                    </div>
                    <figcaption className="mt-4 text-xs sm:text-base text-slate-300 leading-snug max-w-[14rem] mx-auto">{r.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. Voices: parallax quote wall */}
        <section data-parallax className="relative bg-white py-28 sm:py-36 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="a4y-reveal max-w-2xl mb-14">
              <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4">In their words</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                The best part was the part where they built something.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {quotes.map((q, i) => (
                <div key={q.text} className="a4y-par" style={{ "--speed": q.speed } as Vars}>
                  <blockquote
                    className={`a4y-reveal rounded-3xl p-8 shadow-lg border ${i % 3 === 1 ? "bg-blue-600 text-white border-blue-500" : "bg-slate-50 text-slate-900 border-slate-100"} ${i % 3 === 1 ? "lg:mt-16" : ""}`}
                    style={{ "--delay": `${(i % 3) * 0.1}s` } as Vars}
                  >
                    <i className={`fa-solid fa-quote-left text-2xl mb-4 ${i % 3 === 1 ? "text-blue-200" : "text-blue-300"}`} aria-hidden="true" />
                    <p className="font-heading text-xl sm:text-2xl font-bold leading-snug mb-4">{q.text}</p>
                    <footer className={`text-sm ${i % 3 === 1 ? "text-blue-100" : "text-slate-500"}`}>{q.who}</footer>
                  </blockquote>
                </div>
              ))}
            </div>
            <p className="mt-10 text-sm text-slate-400">Quotes are from anonymous feedback forms.</p>
          </div>
        </section>

        {/* 10. Lessons */}
        <section className="bg-slate-50 py-24 sm:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="a4y-reveal max-w-2xl mb-14">
              <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4">What we learned</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Kids told us exactly how to make it better.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Not everything landed. The first part felt slow to some, and a few found three hours long. We are keeping
                what worked and changing the rest.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {lessons.map((l, i) => (
                <div key={l.title} className="a4y-reveal rounded-2xl bg-white border border-slate-100 p-6 shadow-sm" style={{ "--delay": `${i * 0.08}s` } as Vars}>
                  <i className={`fa-solid ${l.icon} text-amber-500 text-2xl mb-4`} aria-hidden="true" />
                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">{l.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. What they want next: bars */}
        <section className="bg-white py-24 sm:py-32 px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <div className="a4y-reveal lg:sticky lg:top-32">
              <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4">What they asked for</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
                They want to build.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We asked which topics they would come back for. Apps, AI coding, generative art and robots topped the
                list, and a few wrote in "simple hackathons using AI tools".
              </p>
            </div>
            <div data-reveal className="space-y-5" role="list" aria-label="Votes for future topics, out of 12 respondents">
              {topics.map((t, i) => (
                <div key={t.label} role="listitem">
                  <div className="flex justify-between text-sm sm:text-base mb-2">
                    <span className="font-medium text-slate-800">{t.label}</span>
                    <span className="font-heading font-bold text-slate-900">{t.votes}</span>
                  </div>
                  <div className="a4y-bar h-3 rounded-full bg-slate-100 overflow-hidden" aria-hidden="true">
                    <i
                      className={i < 4 ? "bg-gradient-to-r from-blue-600 to-sky-500" : "bg-slate-300"}
                      style={{ "--w": t.votes / respondents, "--delay": `${i * 0.08}s` } as Vars}
                    />
                  </div>
                </div>
              ))}
              <p className="text-sm text-slate-400 pt-2">Votes from 12 respondents; each could pick several topics.</p>
            </div>
          </div>
        </section>

        {/* 12. What's next */}
        <section data-parallax className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-28 sm:py-36 px-4">
          <div className="a4y-par absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl" style={{ "--speed": 0.3 } as Vars} aria-hidden="true" />
          <div className="a4y-par absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" style={{ "--speed": -0.25 } as Vars} aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto">
            <div className="a4y-reveal max-w-2xl mb-14">
              <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4">What's next</p>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight mb-6">
                Chapter two: less talking, more making.
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Here is the shape we are trying next time. The hands-on part grows to a full hour, kids present what they
                made, and safety is talked about using the thing they just built.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 rounded-3xl overflow-hidden" aria-label="Proposed agenda for the next session">
              {nextAgenda.map((b, i) => (
                <div key={b.title} className="a4y-reveal" style={{ flexGrow: b.min, flexBasis: 0, "--delay": `${i * 0.1}s` } as Vars}>
                  <div className={`${b.tone} h-full p-5 sm:p-6 rounded-2xl sm:rounded-none`}>
                    <div className="font-heading text-3xl font-extrabold">{b.min}<span className="text-base font-semibold opacity-80"> min</span></div>
                    <div className="font-heading font-bold mt-3">{b.title}</div>
                    <div className="text-sm opacity-85 mt-1">{b.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <h3 className="a4y-reveal font-heading text-2xl sm:text-3xl font-bold mb-8">And after that, a series for builders</h3>
              <div className="flex flex-wrap gap-4">
                {builderSeries.map((b, i) => (
                  <span key={b.label} className="a4y-reveal inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur text-lg" style={{ "--delay": `${i * 0.08}s` } as Vars}>
                    <i className={`fa-solid ${b.icon} text-sky-300`} aria-hidden="true" /> {b.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. Join */}
        <section id="join" className="relative bg-gradient-to-b from-sky-50 to-white py-28 sm:py-36 px-4 scroll-mt-20">
          <div className="max-w-3xl mx-auto text-center a4y-reveal">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-8 shadow-sm">
              <i className="fa-solid fa-lightbulb" aria-hidden="true" />
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Bring your <span className="gradient-text">curiosity</span>.
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
              Whether you are a student, a parent, a teacher, or someone who wants to help, there is a place for you
              here. Tell us you are interested and we will let you know about the next session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contactus" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
                Get in touch
              </Link>
              <a href="https://luma.com/zool7sqr" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 px-8 py-4 rounded-full font-semibold transition-all shadow-sm">
                See the first event <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} OnboardAI · AI4YoungMinds is a free, volunteer-run community.
      </footer>
    </div>
  );
};

export default AI4Young;
