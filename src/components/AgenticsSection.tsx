
import { Building, Star } from "lucide-react";

const AgenticsSection = () => {
  return (
    <section id="agentics" className="section-padding bg-gradient-to-b from-background/60 to-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold gradient-text">Founding Member</h2>
            </div>
            
            <div className="flex items-center mb-8">
              <Building className="h-6 w-6 text-secondary mr-3" />
              <h3 className="text-2xl font-semibold">Agentics.org</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              As a founding member of Agentics.org, I've helped establish a pioneering organization
              dedicated to advancing the field of artificial intelligence agents and their applications
              across industries. Our collective expertise is shaping the future of autonomous AI systems.
            </p>
            
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Mission</h4>
                <p className="text-gray-300">
                  To develop frameworks, standards, and best practices that enable the responsible
                  creation, deployment, and governance of autonomous AI agents.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Vision</h4>
                <p className="text-gray-300">
                  A world where AI agents seamlessly augment human capabilities, operate with transparency
                  and equity, and help solve our most pressing challenges.
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-lg blur-xl opacity-30 animate-glow"></div>
              <div className="relative bg-muted/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Key Contributions</h3>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-primary">01</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Research Leadership</h4>
                      <p className="text-gray-300">
                        Leading research initiatives on multi-agent systems and their applications in complex problem-solving.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <span className="font-bold text-secondary">02</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Ethical Framework Development</h4>
                      <p className="text-gray-300">
                        Co-authoring comprehensive ethical guidelines for agent development, focusing on accountability and transparency.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="font-bold text-accent">03</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Industry Partnerships</h4>
                      <p className="text-gray-300">
                        Establishing strategic partnerships with leading tech companies to accelerate adoption of agent technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgenticsSection;
