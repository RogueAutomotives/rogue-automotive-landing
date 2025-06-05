import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-rogue-light scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-4 sm:mb-6 md:mb-8 animate-fade-in">
            About Rogue Automotive
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-rogue-charcoal leading-relaxed animate-fade-in animation-delay-300">
            At Rogue Automotive, we're passionate about cars and dedicated to providing exceptional service. 
            Whether you need a premium car wash, are looking for your next vehicle, or require a reliable rental, 
            we're here to exceed your expectations. Our commitment to quality and customer satisfaction drives 
            everything we do.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
