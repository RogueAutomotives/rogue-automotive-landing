import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/Footer";
import { ComboBar, OfferCta, OfferFinePrint, OfferHero, OfferSteps } from "@/components/offers/OfferParts";
import { bookingUrl } from "@/lib/links";
import { trackEvent } from "@/lib/metaPixel";
import { getCoatingServices } from "@/lib/api";

/**
 * Ceramic coating page (ad + flyer QR target). Since 2026-11-24 coatings book
 * online at a fixed price by vehicle size with the 30% deposit, like any detail.
 * The old "10% off after a free inspection" offer is retired.
 */

const OFFER = "ceramic-coating-offer";
// Shown if the live catalog can't be reached.
const FALLBACK = [
  { name: "Ceramic Coating (9–12 Months)", basePrice: 45000 },
  { name: "Ceramic Coating Pro (2–3 Years)", basePrice: 85000 },
];

const jmd = (n: number) => `J$${Math.round(n).toLocaleString()}`;

const bookHref = (content: string, service = "ceramic-coating-9-12") =>
  bookingUrl("/book-a-detail", { campaign: OFFER, content, service });
const onBook = () => trackEvent("Lead", { content_name: OFFER });

const CeramicCoatingOffer = () => {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: OFFER });
  }, []);

  const { data } = useQuery({ queryKey: ["coating-services"], queryFn: getCoatingServices, staleTime: 1000 * 60 * 10 });
  const coatings = data && data.length > 0 ? data : FALLBACK;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Book a ceramic coating | Rogue Automotive</title>
        <meta
          name="description"
          content="Book a ceramic coating online at Rogue Automotive, Kingston. Fixed prices by vehicle size, 30% deposit to hold your day."
        />
      </Helmet>

      <ComboBar />
      <OfferHero
        eyebrow="Ceramic coating"
        title="A real ceramic coating. Book it online."
        subtitle="Protection for 9 months to 3 years. Fixed prices by vehicle size. Pick your day and pay a 30% deposit to hold it."
        video="/offer-media/coating-hero.mp4"
        poster="/offer-media/coating-hero.jpg"
        cta={{ label: "Book my coating", href: bookHref("hero"), onClick: onBook }}
        ctaNote="30% deposit to book · balance at the shop"
      />

      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-2">Pick your protection</h2>
          <p className="text-rogue-slate mb-8 leading-relaxed">
            Every coating starts with a wash, clay bar, machine polish and panel wipe, then the coating. Prices below are
            for cars. SUVs, pickups and vans cost more, and you see your exact price when you pick your vehicle.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Up to 3 months</p>
              <h3 className="font-montserrat font-semibold text-rogue-charcoal">Ceramic Sealant</h3>
              <p className="text-rogue-red font-montserrat font-bold mt-1">{jmd(5000)}</p>
              <p className="text-sm text-rogue-slate mt-2">A spray-on top-up, added to any wash.</p>
            </div>
            {coatings.map((c, i) => (
              <a
                key={c.name}
                href={bookHref("card", i === 0 ? "ceramic-coating-9-12" : "ceramic-coating-pro")}
                onClick={onBook}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-2xl p-5 border hover:shadow-md transition ${i === 0 ? "border-rogue-red ring-1 ring-rogue-red/20" : "border-slate-200"}`}
              >
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                  {/\((.+)\)/.exec(c.name)?.[1] ?? "Long-lasting"}
                </p>
                <h3 className="font-montserrat font-semibold text-rogue-charcoal">{c.name.replace(/\s*\(.+\)\s*$/, "")}</h3>
                <p className="text-rogue-red font-montserrat font-bold mt-1">{jmd(c.basePrice)}</p>
                <p className="text-sm text-rogue-slate mt-2">Book now →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <OfferSteps
        title="How it works"
        steps={[
          { title: "Pick your coating and vehicle", body: "Your exact price shows before you pay." },
          { title: "Choose your day", body: "Pay a 30% deposit online to hold it." },
          { title: "Drop off your car", body: "We prep the paint and apply the coating." },
          { title: "Collect it protected", body: "Pay the balance at the shop." },
        ]}
      />

      <OfferCta title="Protect your paint for years, not weeks." cta={{ label: "Book my coating", href: bookHref("bottom"), onClick: onBook }} />

      <OfferFinePrint
        items={[
          "Prices assume paint in normal condition. Heavy swirls or scratches that need paint correction are quoted separately.",
          "The 30% deposit is non-refundable. The balance is paid at the shop.",
        ]}
      />

      <Footer />
    </div>
  );
};

export default CeramicCoatingOffer;
