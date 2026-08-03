import { Check, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingUrl } from "@/lib/links";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/**
 * Home-page spotlight for the new Ambient Light Installation service.
 * Dark band with a soft multi-colour glow evoking the product itself —
 * the only place on the site allowed to step outside the red/slate palette,
 * and only as ambient light, never for text or controls.
 */
const POINTS = [
  "Multi-zone LED coverage — dash, doors, footwells & console",
  "Colour control from your phone or remote",
  "Hidden, OEM-look wiring — no dangling strips",
  "Installed in about 1.5 hours",
];

const AmbientLightSpotlight = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-16 sm:py-20 bg-rogue-dark overflow-hidden">
      {/* Ambient glow — blurred colour pools behind the content */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-[10%] w-72 h-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-[45%] w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute top-[-4rem] right-[8%] w-72 h-72 rounded-full bg-rogue-red/25 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6" ref={elementRef}>
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-5">
            <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
            New service
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-white mb-4">
            Ambient Light Installation
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Give your cabin a night-time glow-up. Multi-zone LED ambient lighting across the dash,
            doors, footwells and console — colour-controlled from your phone, wired cleanly for an
            OEM-look finish.
          </p>

          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-left max-w-xl mx-auto mb-8">
            {POINTS.map((pt) => (
              <li key={pt} className="flex items-start text-sm text-slate-300">
                <Check className="h-4 w-4 text-rogue-red mr-2 mt-0.5 flex-shrink-0" />
                {pt}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
            <a
              href={bookingUrl("/book-a-detail", {
                campaign: "home",
                content: "ambient-light-spotlight",
                service: "ambient-light-installation",
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full group"
              >
                Request a quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
          <p className="text-sm text-slate-400">
            From <span className="font-montserrat font-semibold text-white">J$30,000</span> — quoted
            to your exact vehicle after a free assessment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AmbientLightSpotlight;
