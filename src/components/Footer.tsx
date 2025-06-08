
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-bold gradient-text">AI.Portfolio</a>
            <p className="text-sm text-gray-400 mt-1">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          
          <div className="flex space-x-8 text-sm text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#consulting" className="hover:text-white transition-colors">Consulting</a>
            <a href="#nonprofit" className="hover:text-white transition-colors">Non-Profit</a>
            <a href="#podcast" className="hover:text-white transition-colors">Podcast</a>
            <a href="#contact" className="hover:text-white transition-colors">Appointments</a>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 p-3 rounded-full bg-muted/50 hover:bg-primary/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
