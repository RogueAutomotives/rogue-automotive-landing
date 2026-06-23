import { Link } from "react-router-dom";
import { Check, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BusinessLine } from "@/lib/businessLines";
import { whatsappUrl, CONTACT } from "@/lib/links";
import WaitlistForm from "@/components/WaitlistForm";

/**
 * Interim landing for a business line whose app isn't built yet. Real value
 * teaser + working contact actions (WhatsApp / call). A waitlist form wired to
 * the backend is added in a later phase.
 */
const ComingSoon = ({ line }: { line: BusinessLine }) => {
  const Icon = line.icon;
  return (
    <main>
      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${line.gradient} text-white`}>
        <div className="absolute inset-0 bg-rogue-dark/30" />
        <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-24 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Pitch */}
            <div>
              <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm mb-6">
                Coming soon
              </span>
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                  <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-montserrat font-bold">{line.name}</h1>
              </div>
              <p className="text-lg text-white/85 mb-7 leading-relaxed">{line.blurb}</p>

              <ul className="grid gap-y-2 mb-8">
                {line.features.map((f) => (
                  <li key={f} className="flex items-center text-white/90">
                    <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl(`Hi Rogue Automotive — I'm interested in ${line.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 font-montserrat font-semibold rounded-full px-5">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
                <a href={CONTACT.phoneHref}>
                  <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/25 font-montserrat font-semibold rounded-full px-5">
                    <Phone className="mr-2 h-4 w-4" />
                    Call {CONTACT.phone}
                  </Button>
                </a>
              </div>
            </div>

            {/* Waitlist lead capture */}
            <WaitlistForm line={line} />
          </div>
        </div>
      </section>

      {/* Cross-sell back to the live line */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <p className="text-rogue-slate text-lg mb-6">
            In the meantime, our <span className="text-rogue-charcoal font-semibold">Wash &amp; Detailing</span>{" "}
            service is live — book your car in online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/car-wash">
              <Button className="bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-6 py-5">
                Explore Wash &amp; Detailing
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-slate-300 text-rogue-charcoal rounded-full px-6 py-5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ComingSoon;
