import { Shield, Clock, Star, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const WhyChooseUs = () => {
  const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();
  const { elementRef: featuresRef, isVisible: isFeaturesVisible } = useScrollAnimation();

  const whyChooseUs = [
    { icon: <Shield className="h-6 w-6" />, title: "Trusted by hundreds", description: "Over 500+ satisfied customers" },
    { icon: <Clock className="h-6 w-6" />, title: "Fast & reliable service", description: "Quick turnaround times" },
    { icon: <Star className="h-6 w-6" />, title: "Competitive pricing", description: "Best value in the area" },
    { icon: <MapPin className="h-6 w-6" />, title: "Convenient location", description: "Easy access and parking" }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-rogue-dark text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16" ref={headerRef}>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold mb-4 sm:mb-6 transition-all duration-500 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Why Choose Rogue?
          </h2>
          <p className={`text-base sm:text-lg md:text-xl text-rogue-silver max-w-3xl mx-auto transition-all duration-500 delay-150 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            We're committed to delivering exceptional value and service in everything we do.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8" ref={featuresRef}>
          {whyChooseUs.map((item, index) => (
            <div 
              key={index} 
              className={`text-center group hover:scale-105 transition-all duration-500 cursor-pointer transition-all duration-500 delay-${index * 75} ${isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="mx-auto mb-3 sm:mb-4 p-3 sm:p-4 bg-rogue-maroon rounded-full w-fit group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-rogue-maroon/50">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-montserrat font-bold mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-rogue-silver">{item.title}</h3>
              <p className="text-sm sm:text-base text-rogue-silver transition-all duration-300 group-hover:text-white">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
