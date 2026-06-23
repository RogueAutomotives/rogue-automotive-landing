import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { BUSINESS_LINES, STATUS_LABEL } from "@/lib/businessLines";

const Services = () => {
  const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();
  const { elementRef: gridRef, isVisible: isGridVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto" ref={headerRef}>
          <p
            className={`text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3 transition-all duration-500 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            What we do
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-rogue-charcoal mb-4 transition-all duration-500 delay-100 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Three ways Rogue keeps you moving
          </h2>
          <p
            className={`text-base sm:text-lg text-rogue-slate transition-all duration-500 delay-200 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Pick a business line to dive in. Our detailing service is live and bookable online today —
            sales and rentals are launching soon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6" ref={gridRef}>
          {BUSINESS_LINES.map((line, index) => {
            const Icon = line.icon;
            const isLive = line.status === "live";
            return (
              <Link
                key={line.key}
                to={line.route}
                className={`group relative flex flex-col rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rogue-red focus-visible:ring-offset-2 ${
                  isGridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Accent header band (interim visual until real photography) */}
                <div className={`relative h-36 bg-gradient-to-br ${line.gradient} flex items-center justify-center`}>
                  <Icon className="h-12 w-12 text-white/90" strokeWidth={1.5} />
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                      isLive ? "bg-rogue-red text-white" : "bg-white/15 text-white backdrop-blur-sm border border-white/25"
                    }`}
                  >
                    {STATUS_LABEL[line.status]}
                  </span>
                </div>

                <div className="flex flex-col flex-grow p-5 sm:p-6">
                  <h3 className="text-xl font-montserrat font-bold text-rogue-charcoal group-hover:text-rogue-red transition-colors duration-300">
                    {line.name}
                  </h3>
                  <p className="text-sm text-rogue-red font-medium mb-3">{line.tagline}</p>
                  <p className="text-sm text-rogue-slate leading-relaxed mb-4">{line.blurb}</p>

                  <ul className="space-y-1.5 mb-6">
                    {line.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-rogue-slate">
                        <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto inline-flex items-center font-montserrat font-semibold text-rogue-charcoal group-hover:text-rogue-red transition-colors">
                    {isLive ? "Explore & book" : "Learn more"}
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
