
const Footer = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-rogue-dark text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/RogueAutoWhiteLogo.png" 
              alt="Rogue Automotive White Logo" 
              className="h-16 w-auto mb-4 transition-transform duration-300 hover:scale-110"
            />
            <p className="text-rogue-silver text-sm leading-relaxed">
              Premium automotive services that keep your vehicle looking its best. Experience the Rogue Automotive difference today.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.instagram.com/rogueautomotiveja_" target="_blank" rel="noopener noreferrer" className="text-rogue-silver hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="animate-fade-in animation-delay-200">
            <h4 className="font-montserrat font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-rogue-silver">
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors text-sm">Services</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')} className="hover:text-white transition-colors text-sm">Reviews</a></li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div className="animate-fade-in animation-delay-400">
            <h4 className="font-montserrat font-bold text-lg mb-4 text-white">Opening Hours</h4>
            <ul className="space-y-2 text-rogue-silver text-sm">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
            </ul>
            <p className="text-xs text-rogue-silver mt-3 italic">Holiday hours may vary</p>
          </div>
          
          {/* Contact Us */}
          <div className="animate-fade-in animation-delay-600">
            <h4 className="font-montserrat font-bold text-lg mb-4 text-white">Contact Us</h4>
            <div className="space-y-3 text-rogue-silver text-sm">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-rogue-maroon flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>17 Westminster Rd, Kingston 10, Jamaica</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rogue-maroon flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(876) 860-5061</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-rogue-maroon flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@rogueautomotiveja.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-rogue-charcoal/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-rogue-silver text-sm mb-4 md:mb-0">
              &copy; 2025 Rogue Automotive Ja. All rights reserved.
            </p>
            <div className="flex space-x-6 text-rogue-silver text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
