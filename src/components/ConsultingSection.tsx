
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Code, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConsultingSection = () => {
  const services = [
    {
      title: "AI Strategy Development",
      description: "Custom AI roadmaps and strategies aligned with business objectives to drive innovation and efficiency.",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
    },
    {
      title: "Technical Implementation",
      description: "Expert guidance on integrating AI models, machine learning pipelines, and data infrastructure.",
      icon: <Code className="h-6 w-6 text-primary" />,
    },
    {
      title: "AI Workshops & Training",
      description: "Hands-on workshops and training programs to build internal AI capabilities and literacy.",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
    },
  ];

  const clients = [
    "Public Media Organizations",
    "Large Insurance Enterprises",
    "Algorithmic Trading Firms",
    "Educational Institutions",
    "Small businesses",
  ];

  return (
    <section id="consulting" className="section-padding bg-gradient-to-b from-background/60 to-background">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">AI Consulting</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Delivering strategic AI solutions and implementation expertise to organizations
            across industries, helping them leverage artificial intelligence for growth and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-muted/50 border-primary/10 hover:glow-border transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
              <CardHeader>
                <div className="mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 glass-card rounded-lg p-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Client Portfolio</h3>
              <ul className="space-y-2">
                {clients.map((client, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    {client}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 md:mt-0">
              <Button className="bg-primary hover:bg-primary/80">
                Consulting Services <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
