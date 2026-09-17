import { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mnpnqqlr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      
      if (response.ok) {
        setIsSubmitSuccess(true);
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link to="/speaker" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Speaking
              </Link>
              <Link to="/consulting" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Consulting
              </Link>
              <Link to="/mentoring" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Mentoring
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

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="text-center mb-10">
              <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                Let's Talk AI
              </h1>
              <p className="text-lg text-slate-700 max-w-xl mx-auto">
                Fill out the form below to book a time with us. Whether it's for consulting, speaking, or training, we'd love to hear from you.
              </p>
            </div>

            {isSubmitSuccess ? (
              <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/50 shadow-sm text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
                  <i className="fa-solid fa-check" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-slate-600 mb-8">Thank you for reaching out. We will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSubmitSuccess(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/50 shadow-sm text-left">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-semibold text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                    <input type="text" id="full-name" name="full_name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">Company / Organization</label>
                  <input type="text" id="company" name="company" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                </div>

                {/* Service Type */}
                <div>
                  <label htmlFor="service-type" className="block text-sm font-semibold text-slate-700 mb-2">What type of service are you looking for? <span className="text-red-500">*</span></label>
                  <select id="service-type" name="service_type" required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none">
                    <option value="" disabled>Select an option</option>
                    <option value="Consulting">One-on-one Consulting</option>
                    <option value="Training">Group/Team Training</option>
                    <option value="Speaking">Speaking Engagement</option>
                    <option value="Unsure">Unsure / Need guidance</option>
                  </select>
                </div>

                {/* Budget / Payment Intent */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-semibold text-slate-700 mb-2">What is your budget or expectation for this session? <span className="text-red-500">*</span></label>
                  <select id="budget" name="budget_expectation" required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none">
                    <option value="" disabled>Select an option</option>
                    <option value="Free Consultation">I am looking for a free initial consultation</option>
                    <option value="Paid Session">I am ready to pay for a full, dedicated session</option>
                  </select>
                </div>

                {/* Session Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-slate-700 mb-2">What is your preferred timeframe or duration? <span className="text-red-500">*</span></label>
                  <select id="duration" name="preferred_duration" required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none">
                    <option value="" disabled>Select an option</option>
                    <option value="15-30 Min Call">Quick 15–30 minute discovery call</option>
                    <option value="1 Hour Session">1-hour intensive session</option>
                    <option value="Ongoing Program">Multi-day or ongoing training program</option>
                  </select>
                </div>

                {/* General Availability & Time Zone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">What days and times generally work best for you?</label>
                    <div className="space-y-2">
                      {[
                        { id: "avail-morning", value: "Weekday Mornings", label: "Weekday Mornings" },
                        { id: "avail-afternoon", value: "Weekday Afternoons", label: "Weekday Afternoons" },
                        { id: "avail-evening", value: "Weekday Evenings", label: "Weekday Evenings" },
                        { id: "avail-weekend", value: "Weekends", label: "Weekends" }
                      ].map((option) => (
                        <div key={option.id} className="flex items-center">
                          <input type="checkbox" id={option.id} name="availability[]" value={option.value} className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 focus:ring-2" />
                          <label htmlFor={option.id} className="ml-2 text-sm text-slate-700">{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="timezone" className="block text-sm font-semibold text-slate-700 mb-2">What is your time zone? <span className="text-red-500">*</span></label>
                    <input type="text" id="timezone" name="time_zone" placeholder="e.g. EST, GMT+1" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                  </div>
                </div>

                {/* Detailed Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Briefly describe what you need help with or training topics to cover: <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0 w-full sm:w-auto inline-flex justify-center items-center gap-2">
                    {isSubmitting ? "Sending..." : "Submit Request"} <i className={`fa-solid ${isSubmitting ? "fa-circle-notch fa-spin" : "fa-paper-plane"}`} />
                  </button>
                </div>
              </form>
            )}
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

export default ContactUs;
