const Footer = () => {
  return (
    <footer className="bg-rogue-dark text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="animate-fade-in col-span-2 sm:col-span-1">
            <img 
              src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
              alt="Rogue Automotive Logo" 
              className="h-10 sm:h-12 w-auto mb-3 sm:mb-4 transition-transform duration-300 hover:scale-110"
            />
            <p className="text-sm sm:text-base text-rogue-silver">
              Your trusted automotive partner for wash, sales, and rentals.
            </p>
          </div>
          
          <div className="animate-fade-in animation-delay-200">
            <h4 className="font-montserrat font-bold text-base sm:text-lg mb-3 sm:mb-4">Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-rogue-silver">
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Wash</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Sales</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Rentals</a></li>
              {/* <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Detailing</a></li> */}
            </ul>
          </div>
          
          <div className="animate-fade-in animation-delay-400">
            <h4 className="font-montserrat font-bold text-base sm:text-lg mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-rogue-silver">
              <li><a href="#about" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              {/* <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Careers</a></li> */}
              <li><a href="#testimonials" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Reviews</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in animation-delay-600">
            <h4 className="font-montserrat font-bold text-base sm:text-lg mb-3 sm:mb-4">Connect</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-rogue-silver">
              {/* <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Facebook</a></li> */}
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Twitter</a></li>
              {/* <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">LinkedIn</a></li> */}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-rogue-charcoal mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-rogue-silver animate-fade-in animation-delay-800">
          {/* <p>&copy; 2024 Rogue Automotive Ja. All rights reserved. | Privacy Policy | Terms of Service</p> */}
          <p>&copy; 2024 Rogue Automotive Ja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
