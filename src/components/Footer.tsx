
const Footer = () => {
  return (
    <footer className="bg-rogue-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
              alt="Rogue Automotive Logo" 
              className="h-12 w-auto mb-4 transition-transform duration-300 hover:scale-110"
            />
            <p className="text-rogue-silver">
              Your trusted automotive partner for wash, sales, and rentals.
            </p>
          </div>
          
          <div className="animate-fade-in animation-delay-200">
            <h4 className="font-montserrat font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-rogue-silver">
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Wash</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Sales</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Car Rentals</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Detailing</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in animation-delay-400">
            <h4 className="font-montserrat font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-rogue-silver">
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Reviews</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in animation-delay-600">
            <h4 className="font-montserrat font-bold text-lg mb-4">Connect</h4>
            <ul className="space-y-2 text-rogue-silver">
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-rogue-charcoal mt-8 pt-8 text-center text-rogue-silver animate-fade-in animation-delay-800">
          <p>&copy; 2024 Rogue Automotive. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
