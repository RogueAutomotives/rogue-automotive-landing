import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Testimonials = () => {
  const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();
  const { elementRef: testimonialsRef, isVisible: isTestimonialsVisible } = useScrollAnimation();

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Exceptional service! My car has never looked better. The team at Rogue Automotive really knows what they're doing."
    },
    {
      name: "Mike Rodriguez",
      rating: 5,
      text: "Bought my dream car here and the process was seamless. Great selection and honest pricing."
    },
    {
      name: "Emma Chen",
      rating: 5,
      text: "Rented a car for my vacation and it was perfect. Clean, reliable, and great customer service."
    }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-rogue-light scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16" ref={headerRef}>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-dark mb-4 sm:mb-6 transition-all duration-500 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            What Our Customers Say
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8" ref={testimonialsRef}>
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl cursor-pointer transition-all duration-500 delay-${index * 100} ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <CardContent className="p-4 sm:p-6 flex flex-col h-[200px]">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current transition-transform duration-300 hover:scale-125" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-rogue-charcoal mb-3 sm:mb-4 italic transition-colors duration-300 hover:text-rogue-dark flex-grow">"{testimonial.text}"</p>
                <p className="text-sm sm:text-base font-montserrat font-semibold text-rogue-dark transition-colors duration-300 hover:text-rogue-maroon mt-auto">
                  - {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
