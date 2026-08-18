import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Car, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import RentalBookingPanel from "@/components/RentalBookingPanel";
import { whatsappUrl } from "@/lib/links";
import { findRental, formatJmd } from "@/lib/rentalFleet";

/**
 * Rental PDP — /car-rentals/:slug. Photo gallery, spec sheet and a
 * request CTA that returns to the rentals page with the car pre-selected
 * (?car=<slug>#booking-request).
 */
const RentalDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const car = findRental(slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!car) return <Navigate to="/car-rentals" replace />;

  const hasImages = car.images.length > 0;
  const mainImage = hasImages ? car.images[Math.min(activeImage, car.images.length - 1)] : null;

  return (
    <>
      <Helmet>
        <title>{`${car.name} Rental — ${formatJmd(car.pricePerDay)}/day | Rogue Automotive Jamaica`}</title>
        <meta
          name="description"
          content={`Rent a ${car.name} in Kingston, Jamaica for ${formatJmd(car.pricePerDay)} per day, insurance included. ${car.blurb}`}
        />
        <link rel="canonical" href={`https://www.rogueautomotiveja.com/car-rentals/${car.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-white font-roboto">
        <SubPageNav />

        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link
            to="/car-rentals"
            className="inline-flex items-center text-sm font-montserrat font-semibold text-rogue-slate hover:text-rogue-red transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> All rentals
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Gallery */}
            <div>
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={`${car.name} — photo ${activeImage + 1}`}
                  fetchPriority="high"
                  className="w-full aspect-[3/4] object-cover rounded-2xl border border-slate-200 bg-rogue-light"
                />
              ) : (
                <div
                  className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-rogue-charcoal to-rogue-dark flex flex-col items-center justify-center"
                  role="img"
                  aria-label={car.name}
                >
                  <Car className="h-14 w-14 text-white/25 mb-3" />
                  <p className="text-white/40 text-sm font-montserrat">Photos coming soon</p>
                </div>
              )}

              {car.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2 mt-3">
                  {car.images.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImage ? "border-rogue-red" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`View photo ${i + 1}`}
                    >
                      <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <span className="inline-block text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-rogue-light text-rogue-charcoal mb-3">
                {car.type}
              </span>
              <h1 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-2">
                {car.name}
              </h1>
              <p className="text-3xl font-montserrat font-bold text-rogue-red mb-5">
                {formatJmd(car.pricePerDay)}
                <span className="text-base font-semibold text-rogue-slate"> / day · insurance included</span>
              </p>

              <p className="text-base text-rogue-slate leading-relaxed mb-6">{car.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {car.specs.map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-200 px-4 py-3">
                    <p className="text-xs text-rogue-slate uppercase tracking-wide">{s.label}</p>
                    <p className="font-montserrat font-semibold text-rogue-charcoal">{s.value}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-1.5 mb-8">
                {car.points.map((pt) => (
                  <li key={pt} className="flex items-center text-sm text-rogue-slate">
                    <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() =>
                    document.getElementById("book-online")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="flex-1 bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full"
                >
                  Book now
                </Button>
                <a
                  href={whatsappUrl(`Hi Rogue Automotive — I'd like to rent the ${car.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-slate-300 font-montserrat font-semibold py-6 rounded-full"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> Ask on WhatsApp
                  </Button>
                </a>
              </div>
              <p className="text-xs text-rogue-slate mt-3">
                Lock in your dates below with a 50% deposit — or pay everything up front. Weekly and
                long-term rates available on WhatsApp.
              </p>
            </div>
          </div>

          {/* Self-serve online booking: calendar + deposit checkout. Hidden
              automatically if the rentals API is unreachable. */}
          <div className="max-w-6xl mx-auto scroll-mt-24" id="book-online">
            <RentalBookingPanel slug={car.slug} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default RentalDetail;
