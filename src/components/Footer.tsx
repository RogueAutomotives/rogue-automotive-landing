const Footer = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-rogue-dark text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="animate-fade-in col-span-2 sm:col-span-1">
            <img 
              src="/lovable-uploads/RogueAutoWhiteLogo.png" 
              alt="Rogue Automotive White Logo" 
              className="h-34 sm:h-12 w-auto mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110"
            />
            <p className="text-sm sm:text-base text-rogue-silver">
              Your trusted automotive partner for wash, sales, and rentals.
            </p>
          </div>
          
          <div className="animate-fade-in animation-delay-200">
            <h4 className="font-montserrat font-bold text-base sm:text-lg mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-rogue-silver">
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Wash</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Sales</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Rentals</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in animation-delay-400">
            <h4 className="font-montserrat font-bold text-base sm:text-lg mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-rogue-silver">
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              <li><a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Reviews</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in animation-delay-600">
            <h4 className="font-montserrat font-bold text-base sm:text-lg mb-3 sm:mb-4">Connect</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-rogue-silver">
              <li><a href="https://www.instagram.com/rogueautomotiveja_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-rogue-charcoal/30 text-center text-sm sm:text-base text-rogue-silver">
          <p>&copy; 2024 Rogue Automotive Ja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
