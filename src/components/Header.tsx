
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Consulting", href: "#consulting" },
    { name: "Non-Profit", href: "#nonprofit" },
    { name: "Podcasting", href: "#podcast" },
    { name: "Speaking", href: "#volunteering" },
    { name: "Agentics", href: "#agentics" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-background/80 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#" className="text-xl md:text-2xl font-bold gradient-text">Rajesh Govindarajan</a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-sm text-gray-300 hover:text-white hover:gradient-text transition-all"
            >
              {item.name}
            </a>
          ))}
        </nav>
        
        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg animate-fade-in">
          <nav className="flex flex-col py-4">
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="px-4 py-3 text-gray-300 hover:bg-primary/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
