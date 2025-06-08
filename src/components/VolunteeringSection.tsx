
import { Handshake } from "lucide-react";

const VolunteeringSection = () => {
  const events = [
    {
      name: "GenAI Collective - Austin Chapter",
      role: "Event Volunteer",
      date: "April 2025",
      location: "Austin, TX",
      highlight: "Facilitate group discussion on local AI developments"
    },
    {
      name: "AIMUG - Langchain - Austin Chapter",
      role: "Co-Organizer",
      date: "May 2025",
      location: "Austin, TX", 
      highlight: "Managed AV setup and logistics for 50+ attendees"
    },
    {
      name: "AI Tinkerers",
      role: "Speaker",
      date: "February 2025",
      location: "Austin, TX",
      highlight: "Discussion on agentic automated coding"
    },
    {
      name: "ACM - Austin Chapter",
      role: "Featured Speaker",
      date: "June 2025",
      location: "Ausin, TX",
      highlight: "Presented prespective on difference between AI Agents and Agentic AI"
    }
  ];

  return (
    <section id="volunteering" className="section-padding bg-gradient-to-b from-background to-background/60">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Handshake className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">AI Community Engagement</h2>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Actively contributing to the AI ecosystem through speaking engagements, 
            workshops, and volunteering at industry events.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent"></div>
          
          <div className="space-y-12">
            {events.map((event, index) => (
              <div 
                key={index} 
                className="relative flex flex-col md:flex-row gap-8 animate-fade-in"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="md:w-1/2 md:text-right md:pr-12">
                  <div className={`md:hidden absolute left-8 top-3 h-4 w-4 rounded-full bg-primary z-10`}></div>
                  <div className={`hidden md:block absolute left-1/2 top-3 h-4 w-4 rounded-full bg-primary -ml-2 z-10`}></div>
                  
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p className="text-primary">{event.role}</p>
                </div>
                
                <div className="md:w-1/2 md:pl-12 ml-16 md:ml-0">
                  <div className="glass-card p-6 rounded-lg">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-400">{event.date}</span>
                      <span className="text-gray-400">{event.location}</span>
                    </div>
                    <p className="text-gray-300">{event.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteeringSection;
