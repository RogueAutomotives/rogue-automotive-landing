import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, Key, Car, MessageCircle, Phone, ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { whatsappUrl, CONTACT } from "@/lib/links";

import { FLEET, formatJmd } from "@/lib/rentalFleet";

/** Vehicle photo with an on-brand fallback tile shown until the real image is uploaded. */
function CarPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="aspect-[3/4] w-full rounded-xl bg-gradient-to-br from-rogue-charcoal to-rogue-dark flex items-center justify-center mb-4"
        role="img"
        aria-label={alt}
      >
        <Car className="h-10 w-10 text-white/25" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[3/4] w-full object-cover rounded-xl mb-4"
    />
  );
}

const CarRentals = () => {
  const scrollToFleet = () => {
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Helmet>
        <title>Car Rentals — Rogue Automotive Jamaica | Daily Rates</title>
        <meta
          name="description"
          content="Rent a Honda Odyssey, Fit Shuttle, Accord, Nissan Teana or BMW 328i GT in Kingston, Jamaica from J$9,000 per day. Insurance included — pick your dates and book online with Rogue Automotive."
        />
        <link rel="canonical" href="https://www.rogueautomotiveja.com/car-rentals" />
      </Helmet>

      <div className="min-h-screen bg-white font-roboto">
        <SubPageNav />

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-slate text-white">
          <div className="absolute inset-0 bg-rogue-dark/20" />
          <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-28 max-w-3xl">
            <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-6">
              <Key className="h-3.5 w-3.5 mr-1.5" />
              Now renting
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold mb-5 leading-[1.05]">
              Car Rentals
            </h1>
            <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
              Daily rentals with insurance included — pick your car, choose your dates on its page,
              and lock them in instantly with a 50% deposit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={scrollToFleet}
                className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full"
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a car
              </Button>
              <a href={whatsappUrl("Hi Rogue Automotive — I'd like to ask about car rentals.")} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-7 py-6 text-base font-montserrat font-semibold rounded-full">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Ask on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Fleet */}
        <section className="py-16 sm:py-20 bg-white scroll-mt-20" id="fleet">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                The fleet
              </p>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">
                Pick your ride
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {FLEET.map((car) => (
                <div
                  key={car.slug}
                  className="relative flex flex-col rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to={`/car-rentals/${car.slug}`} aria-label={`View ${car.name} details`}>
                    <CarPhoto src={car.images[0] ?? ""} alt={`${car.name} — available for rental`} />
                  </Link>
                  <span className="self-start text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-rogue-light text-rogue-charcoal mb-3">
                    {car.type}
                  </span>
                  <h3 className="text-xl font-montserrat font-bold text-rogue-charcoal mb-1">{car.name}</h3>
                  <p className="text-2xl font-montserrat font-bold text-rogue-red mb-2">
                    {formatJmd(car.pricePerDay)}
                    <span className="text-sm font-semibold text-rogue-slate"> / day</span>
                  </p>
                  <p className="text-sm text-rogue-slate mb-4 leading-relaxed">{car.blurb}</p>
                  <ul className="space-y-1.5 mb-6">
                    {car.points.map((pt) => (
                      <li key={pt} className="flex items-center text-sm text-rogue-slate">
                        <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link to={`/car-rentals/${car.slug}`} className="block">
                      <Button className="w-full rounded-full font-montserrat font-semibold bg-rogue-red hover:bg-rogue-red-dark text-white">
                        Book now
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-rogue-slate mt-8">
              All rentals include insurance. Pick your dates on the car's page and lock them in with a
              50% deposit — or pay everything up front. Weekly and long-term rates available on request.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 text-sm text-rogue-slate">
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-rogue-red transition-colors">
                <Phone className="h-4 w-4 text-rogue-red" /> {CONTACT.phone}
              </a>
              <a
                href={whatsappUrl("Hi Rogue Automotive — I'd like to book a rental car.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-rogue-red transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-rogue-red" /> Prefer to book by chat? WhatsApp us
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CarRentals;
