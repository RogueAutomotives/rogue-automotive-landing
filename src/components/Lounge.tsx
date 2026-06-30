import { useState } from "react";
import { Armchair, Coffee, Wifi, Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { bookingUrl } from "@/lib/links";

const AMENITIES = [
  { icon: Armchair, title: "Comfortable seating", description: "Kick back in a relaxed, air-conditioned space while we work." },
  { icon: Coffee, title: "Complimentary drinks", description: "Coffee, cold drinks and refreshments on the house." },
  { icon: Utensils, title: "Food options", description: "Grab a bite from our menu while you wait." },
  { icon: Wifi, title: "Free high-speed Wi-Fi", description: "Stay productive or stream while your car gets the Rogue treatment." },
];

// Drop real lounge photos into public/lovable-uploads/ with these names and they
// appear automatically. Until then, each tile shows an on-brand placeholder.
const LOUNGE_PHOTOS = [
  { src: "/lovable-uploads/lounge-1.jpg", alt: "The Rogue lounge seating area" },
  { src: "/lovable-uploads/lounge-2.jpg", alt: "Refreshments at the Rogue lounge" },
  { src: "/lovable-uploads/lounge-3.jpg", alt: "Relaxing at the Rogue lounge" },
  { src: "/lovable-uploads/lounge-4.jpg", alt: "The Rogue lounge interior" },
];

function LoungePhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-rogue-charcoal to-rogue-dark flex items-center justify-center"
        role="img"
        aria-label={alt}
      >
        <Armchair className="h-10 w-10 text-white/25" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/3] w-full h-full object-cover rounded-2xl"
    />
  );
}

const Lounge = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
            The lounge
          </p>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-3">
            Relax while we work
          </h2>
          <p className="text-rogue-slate text-base sm:text-lg leading-relaxed">
            No more waiting around in the heat. Unwind in the Rogue lounge — comfortable seating,
            food and drink, and free Wi-Fi — while your car gets detailed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Amenities */}
          <div ref={elementRef} className="grid sm:grid-cols-2 gap-5">
            {AMENITIES.map((a, i) => (
              <div
                key={a.title}
                className={`rounded-2xl border border-slate-200 p-5 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <span className="inline-flex p-3 rounded-xl bg-rogue-red/10 text-rogue-red mb-3">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3 className="font-montserrat font-bold text-rogue-charcoal mb-1">{a.title}</h3>
                <p className="text-sm text-rogue-slate leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>

          {/* Photo collage */}
          <div className="grid grid-cols-2 gap-4">
            {LOUNGE_PHOTOS.map((p) => (
              <LoungePhoto key={p.src} src={p.src} alt={p.alt} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "lounge" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-rogue-charcoal hover:bg-rogue-dark text-white font-montserrat font-semibold rounded-full px-7 py-6 group">
              Book a visit to the lounge
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Lounge;
