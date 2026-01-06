
const ContactSection = () => {

  return (
    <section id="contact" className="section-padding bg-gradient-to-t from-background to-background/90">
      <div className="container mx-auto max-w-7xl">
        <div className="glass-card rounded-xl p-4 md:p-6 animate-fade-in">
          <div className="mt-10 pt-6 border-t border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Email</h3>
                <p className="mt-1">rj@onboardai.org</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Based In</h3>
                <p className="mt-1">Austin, TX</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Social</h3>
                <p className="mt-1">@real-onboardai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
