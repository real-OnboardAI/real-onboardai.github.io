
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NonProfitSection = () => {
  const initiatives = [
    {
      title: "AI Education Access",
      description: "Providing resources and training to underrepresented communities to bridge the AI knowledge gap.",
    },
    {
      title: "Ethical AI Development",
      description: "Promoting responsible AI practices through research, guidelines, and community standards.",
    },
    {
      title: "AI for Social Good",
      description: "Supporting projects that apply AI technologies to tackle pressing social and environmental challenges.",
    }
  ];

  return (
    <section id="nonprofit" className="section-padding bg-gradient-to-b from-background to-background/60">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur-xl opacity-30 animate-glow"></div>
              <div className="relative bg-muted/50 p-6 md:p-10 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary/20 rounded-full mr-4 overflow-hidden">
                    <img 
                      src="https://real-onboardai.imgix.net/real_onboard_ai_logo.jpeg?w=150&h=150&fit=crop&crop=face"
                      alt="AI Innovation"
                      className="h-6 w-6 object-cover rounded-full"
                    />
                  </div>
                  <h2 className="text-3xl font-bold gradient-text">Onboard AI</h2>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Non-Profit Initiative</h3>
                <p className="text-gray-300 mb-6">
                  Founder and Leading the Onboard AI non-profit initiative to democratize access to artificial intelligence
                  and ensure its benefits reach all segments of society. Our mission is to create a more inclusive
                  AI ecosystem through education, advocacy, and community engagement.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-1 w-8 bg-primary mr-3"></div>
                    <p className="text-gray-300">Founded in 2024</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-1 w-8 bg-secondary mr-3"></div>
                    <p className="text-gray-300">Presense beyond US</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-1 w-8 bg-accent mr-3"></div>
                    <p className="text-gray-300">100+ Beneficiaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Key Initiatives</h3>
            <div className="space-y-6">
              {initiatives.map((initiative, index) => (
                <Card 
                  key={index} 
                  className="bg-muted/50 border-primary/10 hover:glow-border transition-all duration-300 animate-fade-in"
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{initiative.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{initiative.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NonProfitSection;
