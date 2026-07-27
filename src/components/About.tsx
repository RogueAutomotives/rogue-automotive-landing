import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/**
 * Proof strip — replaced the generic "About Rogue Automotive" paragraph with
 * concrete, checkable numbers. Copy leads with detailing (the headline product).
 */
const STATS = [
  { value: "500+", label: "cars detailed" },
  { value: "5.0 ★", label: "Google rating" },
  { value: "4", label: "detail packages, Bronze → Platinum" },
  { value: "7 days", label: "open every week" },
];

const About = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-14 sm:py-16 md:py-20 bg-rogue-light scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6" ref={elementRef}>
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
            Why we exist
          </p>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-4">
            Detailing is our craft
          </h2>
          <p className="text-base sm:text-lg text-rogue-slate leading-relaxed mb-10">
            From an express wash to full paint correction and PPF, every car at 17 Westminster Rd
            gets showroom treatment — while you relax in our customer lounge.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-white border border-slate-200 rounded-2xl px-4 py-6 sm:py-7 text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <p className="font-montserrat font-extrabold text-2xl sm:text-3xl text-rogue-red mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-rogue-slate">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
