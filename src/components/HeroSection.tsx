import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const redirectToProjects = () => {
    window.open("https://rj-portfolio-c30413.webflow.io/all-posts", "_blank");
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center section-padding pt-32 bg-gradient-to-b from-background to-background/60">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-3/5 mt-10 md:mt-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">AI Innovator</span> &<br />
              Technology Consultant
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Pioneering the intersection of artificial intelligence and human potential. 
              With expertise in AI consulting, non-profit initiatives, and thought leadership 
              through podcasting and community engagement.
            </p>
            
            {/* Newsletter signup section */}
            <div className="my-16 p-4 glass-card rounded-lg">
              <p className="text-gray-300 mb-4">
                Get your free Agentic Quick Start guide directly to your email over next 10 days
              </p>
              <div className="flex">
                <iframe 
                  src="https://embeds.beehiiv.com/4be4f1f9-5568-4110-8ef5-fdbad08d680c?slim=true" 
                  data-test-id="beehiiv-embed" 
                  height="52" 
                  frameBorder="0" 
                  scrolling="no" 
                  style={{margin: 0, borderRadius: "0px", backgroundColor: "transparent"}}
                  className="w-full max-w-md"
                ></iframe>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/80"
                onClick={redirectToProjects}
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary hover:bg-primary/10"
                onClick={scrollToContact}
              >
                Book Appointment
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="glow-border rounded-lg p-3 bg-background/50 backdrop-blur-sm">
                <p className="text-sm text-gray-400">Technical Consulting</p>
                <p className="text-xl font-semibold gradient-text">20+ Years</p>
              </div>
              <div className="glow-border rounded-lg p-3 bg-background/50 backdrop-blur-sm">
                <p className="text-sm text-gray-400">AI sessions</p>
                <p className="text-xl font-semibold gradient-text">10+</p>
              </div>
              <div className="glow-border rounded-lg p-3 bg-background/50 backdrop-blur-sm">
                <p className="text-sm text-gray-400">Speaking Events</p>
                <p className="text-xl font-semibold gradient-text">15+</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/5 flex justify-center md:justify-end animate-float">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
              <div className="absolute inset-[25%] rounded-full bg-secondary/20 blur-3xl animate-pulse delay-1000"></div>
              <div className="relative h-full w-full rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 p-1 glow-border">
                <div className="h-full w-full rounded-full bg-background/90 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://real-onboardai.imgix.net/personal-photo.jpeg?w=400&h=400&fit=crop&crop=face"
                    alt="AI Technology"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

