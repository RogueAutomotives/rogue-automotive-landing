
import { Shield, Clock, Star, MapPin } from "lucide-react";

const WhyChooseUs = () => {
  const whyChooseUs = [
    { icon: <Shield className="h-6 w-6" />, title: "Trusted by hundreds", description: "Over 500+ satisfied customers" },
    { icon: <Clock className="h-6 w-6" />, title: "Fast & reliable service", description: "Quick turnaround times" },
    { icon: <Star className="h-6 w-6" />, title: "Competitive pricing", description: "Best value in the area" },
    { icon: <MapPin className="h-6 w-6" />, title: "Convenient location", description: "Easy access and parking" }
  ];

  return (
    <section className="py-20 bg-rogue-dark text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-6 animate-fade-in">
            Why Choose Rogue?
          </h2>
          <p className="text-xl text-rogue-silver max-w-3xl mx-auto animate-fade-in animation-delay-300">
            We're committed to delivering exceptional value and service in everything we do.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <div key={index} className={`text-center group animate-fade-in hover:scale-105 transition-all duration-500 cursor-pointer`} style={{animationDelay: `${index * 150}ms`}}>
              <div className="mx-auto mb-4 p-4 bg-rogue-maroon rounded-full w-fit group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-rogue-maroon/50">
                {item.icon}
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-2 transition-colors duration-300 group-hover:text-rogue-silver">{item.title}</h3>
              <p className="text-rogue-silver transition-all duration-300 group-hover:text-white">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
