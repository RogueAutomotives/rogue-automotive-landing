import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { getTestimonials } from "@/lib/api";

const Testimonials = () => {
  const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 1000 * 60 * 10,
  });

  // Marketing page: hide the section rather than show fake or broken content.
  if (isError || (!isLoading && (!data || data.length === 0))) return null;

  const items = (data ?? []).slice(0, 6);

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16" ref={headerRef}>
          <p
            className={`text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3 transition-all duration-500 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-charcoal">
            What our customers say
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
              ))
            : items.map((t, i) => (
                <Card key={i} className="border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
                  <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                    <div className="flex mb-3" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${s < t.rating ? "text-amber-400 fill-current" : "text-slate-200 fill-current"}`}
                        />
                      ))}
                    </div>
                    <p className="text-rogue-slate italic leading-relaxed flex-grow">“{t.comment}”</p>
                    <div className="mt-4">
                      <p className="font-montserrat font-semibold text-rogue-charcoal">{t.displayName}</p>
                      {t.serviceName && <p className="text-sm text-rogue-red">{t.serviceName}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
