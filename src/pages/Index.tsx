
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ConsultingSection from "@/components/ConsultingSection";
import NonProfitSection from "@/components/NonProfitSection";
import PodcastSection from "@/components/PodcastSection";
import VolunteeringSection from "@/components/VolunteeringSection";
import AgenticsSection from "@/components/AgenticsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ConsultingSection />
      <NonProfitSection />
      <PodcastSection />
      <VolunteeringSection />
      <AgenticsSection />
      <ContactSection />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
