import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Droplets, ShieldCheck, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import { OfferCta, OfferFinePrint, OfferHero, OfferSteps } from "@/components/offers/OfferParts";
import { bookingUrl } from "@/lib/links";
import { trackEvent } from "@/lib/metaPixel";
import { getWashPrices } from "@/lib/api";

/**
 * Landing page for the Ceramic Sealant ad: half off the wash when the customer
 * adds Ceramic Sealant to it. The code is issued in the customer portal once
 * they have an account and a saved vehicle (/offer/sealant in the booking app),
 * and staff apply it on the wash log. Mirrors SealantOffer in the API.
 */

const SEALANT_PRICE = 5000;
const OFFER = "ceramic-sealant-offer";
// What the example uses if the price list can't be reached.
const FALLBACK_WASH = { name: "Wash & Vacuum", price: 1900 };

const jmd = (n: number) => `J$${Math.round(n).toLocaleString()}`;

const claimHref = (content: string) => bookingUrl("/offer/sealant", { campaign: OFFER, content });
const onClaim = () => trackEvent("Lead", { content_name: OFFER });

const CeramicSealantOffer = () => {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: OFFER });
  }, []);

  const { data: prices } = useQuery({ queryKey: ["wash-prices"], queryFn: getWashPrices, staleTime: 1000 * 60 * 10 });
  // Sedan Wash & Vacuum — the most common wash at the counter.
  const live = prices?.find((p) => p.vehicleType === 1 && p.serviceType === 2);
  const wash = live ? { name: "Wash & Vacuum", price: live.price } : FALLBACK_WASH;
  const half = Math.round(wash.price / 2);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>50% off your wash with Ceramic Sealant | Rogue Automotive</title>
        <meta
          name="description"
          content="Add Ceramic Sealant (J$5,000) to any wash at Rogue Automotive and the wash is half price. Get your code in a minute."
        />
      </Helmet>

      <OfferHero
        eyebrow="Ceramic Sealant offer"
        title="Your wash is half price when you add Ceramic Sealant"
        subtitle={`Ceramic Sealant makes water bead off and dirt slide off for up to 3 months. Add it to any wash and we take 50% off the wash.`}
        video="/offer-media/sealant-hero.mp4"
        poster="/offer-media/sealant-hero.jpg"
        cta={{ label: "Get my 50% off code", href: claimHref("hero"), onClick: onClaim }}
        ctaNote="Free account · about a minute · code good for 14 days"
      />

      {/* The money, in plain numbers */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-2">What you pay</h2>
          <p className="text-rogue-slate mb-6">A {wash.name.toLowerCase()} on a sedan, for example:</p>
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm sm:text-base">
              <thead className="bg-slate-50 text-rogue-slate">
                <tr>
                  <th className="text-left font-medium p-3 sm:p-4"></th>
                  <th className="text-right font-medium p-3 sm:p-4">Usually</th>
                  <th className="text-right font-semibold p-3 sm:p-4 text-rogue-red">With the offer</th>
                </tr>
              </thead>
              <tbody className="text-rogue-charcoal">
                <tr className="border-t border-slate-200">
                  <td className="p-3 sm:p-4">{wash.name}</td>
                  <td className="p-3 sm:p-4 text-right">{jmd(wash.price)}</td>
                  <td className="p-3 sm:p-4 text-right font-semibold">{jmd(half)}</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="p-3 sm:p-4">Ceramic Sealant</td>
                  <td className="p-3 sm:p-4 text-right">{jmd(SEALANT_PRICE)}</td>
                  <td className="p-3 sm:p-4 text-right font-semibold">{jmd(SEALANT_PRICE)}</td>
                </tr>
                <tr className="border-t-2 border-rogue-charcoal">
                  <td className="p-3 sm:p-4 font-semibold">Total</td>
                  <td className="p-3 sm:p-4 text-right text-slate-400 line-through">{jmd(wash.price + SEALANT_PRICE)}</td>
                  <td className="p-3 sm:p-4 text-right font-bold text-rogue-red">{jmd(half + SEALANT_PRICE)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-3">Works on any wash and any vehicle. Larger vehicles save more.</p>
        </div>
      </section>

      {/* Open on what they believe now: add-ons are a waste. */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-2">Think add-ons are a waste?</h2>
          <p className="text-rogue-slate mb-8">
            {jmd(SEALANT_PRICE)} over up to 3 months works out to about {jmd(SEALANT_PRICE / 90)} a day. Here's what that buys:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Droplets, title: "Rain beads off", body: "Water rolls off instead of drying into spots." },
              { icon: Sparkles, title: "Easier washes", body: "Dirt doesn't stick, so your next wash comes up cleaner." },
              { icon: ShieldCheck, title: "Gloss and protection", body: "A ceramic layer that keeps the shine and shields the paint from sun." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white border border-slate-200 p-5">
                <Icon className="h-6 w-6 text-rogue-red mb-3" />
                <h3 className="font-montserrat font-semibold text-rogue-charcoal">{title}</h3>
                <p className="text-sm text-rogue-slate mt-1 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfferSteps
        title="How to get it"
        steps={[
          { title: "Create your free account", body: "Name, email and a password. About a minute." },
          { title: "Add your car", body: "Your 50% off code shows up on your dashboard straight away." },
          {
            title: "Walk in and show your code",
            body: "No booking needed. Ask for Ceramic Sealant on your wash and show the code at the bay.",
          },
        ]}
      />

      <OfferCta title="Half off your wash. Sealant on your paint." cta={{ label: "Get my 50% off code", href: claimHref("bottom"), onClick: onClaim }} />

      <OfferFinePrint
        items={[
          "One code per account, for one wash.",
          "The code takes 50% off the wash. The Ceramic Sealant is charged in full and must be done on that same wash.",
          "Valid for 14 days from when the code is issued.",
          "For walk-in washes at 17 Westminster Rd. Show the code to staff before you pay.",
        ]}
      />

      <Footer />
    </div>
  );
};

export default CeramicSealantOffer;
