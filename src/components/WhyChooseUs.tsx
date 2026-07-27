import { Star, CalendarClock, Coffee, BadgePercent } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/**
 * Four substantiated differentiators tied to real features (Google reviews,
 * online booking, the lounge, the loyalty program) — replaced the generic
 * unprovable claims ("best value in the area") and spinning-icon hover gimmicks.
 */
const REASONS = [
  {
    icon: <Star className="h-5 w-5" />,
    title: "Rated 5.0 on Google",
    description: "Every review from a real customer at 17 Westminster Rd — read them before you book.",
  },
  {
    icon: <CalendarClock className="h-5 w-5" />,
    title: "Book online, skip the wait",
    description: "Pick a package, a date and a slot in under a minute — pay online or on arrival.",
  },
  {
    icon: <Coffee className="h-5 w-5" />,
    title: "A lounge worth the visit",
    description: "Wi-Fi, coffee and comfort while our technicians work — bring your laptop, leave with a showroom car.",
  },
  {
    icon: <BadgePercent className="h-5 w-5" />,
    title: "Loyalty that pays you back",
    description: "Five logged washes earn 30% off your next one, automatically — no punch card to lose.",
  },
];

const WhyChooseUs = () => {
  const { elementRef: headerRef, isVisible: isHeaderVisible } = useScrollAnimation();
  const { elementRef: featuresRef, isVisible: isFeaturesVisible } = useScrollAnimation();

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-rogue-dark text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-12 max-w-2xl" ref={headerRef}>
          <p
            className={`text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3 transition-all duration-500 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Why Rogue
          </p>
          <h2
            className={`text-3xl sm:text-4xl font-montserrat font-bold mb-3 transition-all duration-500 delay-100 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Built around your car — and your time
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-400 transition-all duration-500 delay-200 ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            No gimmicks; here's what you actually get.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl" ref={featuresRef}>
          {REASONS.map((item, index) => (
            <div
              key={item.title}
              className={`flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 transition-all duration-500 hover:border-rogue-red/40 hover:bg-white/[0.05] ${
                isFeaturesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-rogue-red/15 border border-rogue-red/40 text-red-400 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
