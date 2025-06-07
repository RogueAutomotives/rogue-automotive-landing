import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Sparkles, Key, Check } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Sparkles className="h-8 w-8 text-rogue-maroon" />,
      title: "Car Wash",
      description: "Premium hand wash and detailing services that make your vehicle shine like new.",
      features: ["Hand wash & wax", "Interior detailing", "Engine cleaning", "Paint protection"],
      cta: "View our Rates",
      url: "https://rogueautomotive.com/car-wash"
    },
    {
      icon: <Car className="h-8 w-8 text-rogue-maroon" />,
      title: "Car Sales",
      description: "Carefully selected vehicles, inspected and ready for the road.",
      features: ["Quality guaranteed", "Fair pricing", "Trade-ins welcome"],
      cta: "Browse Cars for Sale",
      url: "https://rogueautomotive.com/cars-for-sale"
    },
    {
      icon: <Key className="h-8 w-8 text-rogue-maroon" />,
      title: "Car Rentals",
      description: "Flexible and affordable car rental options for any occasion.",
      features: ["Daily & weekly rates", "Insurance included", "24/7 support", "Multiple locations"],
      cta: "Rent a Vehicle",
      url: "https://rogueautomotive.com/rentals"
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-4 sm:mb-6 animate-fade-in">
            Our Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-rogue-charcoal max-w-3xl mx-auto animate-fade-in animation-delay-300">
            From keeping your car pristine to finding your perfect vehicle, we've got you covered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`group hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:scale-105 hover:-translate-y-2 animate-fade-in cursor-pointer flex flex-col h-full`} style={{animationDelay: `${index * 200}ms`}}>
              <CardHeader className="text-center pb-2 sm:pb-4">
                <div className="mx-auto mb-3 sm:mb-4 p-3 sm:p-4 bg-rogue-light rounded-full w-fit group-hover:bg-rogue-maroon/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>
                <CardTitle className="text-xl sm:text-2xl font-montserrat font-bold text-rogue-dark transition-colors duration-300 group-hover:text-rogue-maroon">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-rogue-charcoal">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <ul className="space-y-2 mb-4 sm:mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm sm:text-base text-rogue-charcoal transition-all duration-300 group-hover:translate-x-2">
                      <Check className="h-4 w-4 text-rogue-maroon mr-2 transition-transform duration-300 group-hover:scale-125" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button 
                    className="w-full bg-rogue-maroon hover:bg-rogue-maroon/90 text-white font-montserrat font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rogue-maroon/30 py-5 sm:py-6"
                    onClick={() => window.open(service.url, '_blank')}
                  >
                    {service.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
