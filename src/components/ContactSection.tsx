
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import ContactDialog from "./ContactDialog";

const ContactSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section id="contact" className="section-padding bg-gradient-to-t from-background to-background/90">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Book Appointment</span>
          </h2>
          <p className="text-gray-300 mb-6">
            Schedule a consultation, speaking engagement, or discussion about collaboration opportunities.
          </p>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="bg-primary hover:bg-primary/80 mx-auto flex items-center gap-2 animate-fade-in mb-8"
          >
            <CalendarDays className="h-4 w-4" />
            Book Appointment
          </Button>
        </div>

        <div className="glass-card rounded-xl p-4 md:p-6 animate-fade-in">
          <div className="w-full h-[700px] md:h-[800px] overflow-auto rounded-lg bg-white">
            <iframe 
              src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1ySaIQMsfFDEbuVtM5KP-u8oWoB-Osoovf3R1fRWm57J9Qfe0HaBI2m_6qeiEqtSfA6FSWCd6B?gv=true" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="yes"
              className="w-full h-full min-w-[600px]"
              title="Appointment Scheduler"
            ></iframe>
          </div>

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
      
      <ContactDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};

export default ContactSection;
