
import { Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const PodcastSection = () => {
  const episodes = [
    {
      title: "The AI Timeline: Mapping the Market's Future",
      date: "April 30, 2025",
      duration: "50 min",
      highlight: "What you should and not do about your investments",
    },
    {
      title: "Sam Altman testifies at Senate hearing",
      date: "May 5, 2025",
      duration: "16 min",
      highlight: "Senate and Tech CEOs discuss AI regulation",
    },
    {
      title: "Careers in the Age of AI",
      date: "May 14, 2025",
      duration: "31 min",
      highlight: "Our kids future",
    }
  ];

  return (
    <section id="podcast" className="section-padding bg-gradient-to-b from-background/60 to-background">
      <div className="container mx-auto">
        <div className="mb-12">
          <div className="flex items-center justify-center mb-4">
            <Mic className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">Focas AI Podcasting</h2>
          </div>
          <p className="text-center text-gray-300 max-w-2xl mx-auto">
            Exploring the cutting edge of artificial intelligence through in-depth conversations.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 md:p-10 mb-10 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/5 mb-6 md:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg blur-lg"></div>
                <div className="relative aspect-square rounded-lg overflow-hidden glow-border flex items-center justify-center bg-background">
                  <img 
                    src="https://real-onboardai.imgix.net/focusai.webp?w=400&h=400&fit=crop"
                    alt="Podcast Technology"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center animate-pulse">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 md:pl-8">
              <h3 className="text-xl font-bold mb-2">About the Podcast</h3>
              <p className="text-gray-300 mb-6">
                Focas AI is a weekly podcast dedicated to making complex AI concepts accessible and
                exploring their real-world applications. Each episode features expert guests from
                across the AI landscape, offering insights into current trends, breakthroughs, and
                the future of artificial intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-muted/50 px-4 py-2 rounded-full">
                  <span className="text-sm text-gray-300">50+ Episodes</span>
                </div>
                <div className="bg-muted/50 px-4 py-2 rounded-full">
                  <span className="text-sm text-gray-300">100K+ Monthly Listeners</span>
                </div>
                <div className="bg-muted/50 px-4 py-2 rounded-full">
                  <span className="text-sm text-gray-300">Available on all platforms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {episodes.map((episode, index) => (
            <div 
              key={index} 
              className="bg-muted/50 rounded-lg p-6 border border-primary/10 hover:glow-border transition-all duration-300 animate-fade-in"
              style={{animationDelay: `${index * 200}ms`}}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-400">{episode.date}</span>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{episode.duration}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{episode.title}</h3>
              <p className="text-gray-400 mb-4">Highlight: {episode.highlight}</p>
              <Button variant="outline" size="sm" className="w-full">
                <Play className="h-4 w-4 mr-2" /> Listen Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
