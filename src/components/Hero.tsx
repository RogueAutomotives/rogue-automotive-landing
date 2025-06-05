import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rogue-dark/90 via-rogue-charcoal/80 to-rogue-maroon/90"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 border border-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-rogue-silver rounded-full animate-pulse delay-500"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <img 
            src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png" 
            alt="Rogue Automotive Logo" 
            className="h-12 sm:h-16 w-auto animate-fade-in transition-transform duration-300 hover:scale-110"
          />
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-white hover:text-rogue-silver transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-silver after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Services</a>
            <a href="#about" className="text-white hover:text-rogue-silver transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-silver after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">About</a>
            <a href="#contact" className="text-white hover:text-rogue-silver transition-all duration-300 hover:scale-105 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-silver after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex items-center min-h-[80vh]">
        <div className="max-w-3xl animate-slide-in-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-montserrat font-bold text-white mb-4 sm:mb-6 leading-tight">
            Drive Clean.<br />
            Drive Bold.<br />
            <span className="text-rogue-silver">Drive Rogue.</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-rogue-silver mb-6 sm:mb-8 max-w-2xl animate-fade-in animation-delay-500">
            Car Wash | Car Sales | Car Rentals – All in One Place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in animation-delay-1000">
            <Button size="lg" className="bg-rogue-maroon hover:bg-rogue-maroon/90 text-white border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rogue-maroon/50">
              Book a Car Wash
            </Button>
            <Button size="lg" className="bg-white hover:bg-gray-100 text-rogue-dark border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Browse Cars for Sale
            </Button>
            <Button size="lg" className="bg-rogue-silver hover:bg-rogue-silver/90 text-rogue-dark border-0 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Rent a Vehicle
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center transition-opacity duration-300 hover:opacity-70 cursor-pointer">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
