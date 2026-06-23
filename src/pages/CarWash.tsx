import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Testimonials from "@/components/Testimonials";
import { bookingUrl, whatsappUrl } from "@/lib/links";

const PACKAGES = [
  {
    name: "Express Wash",
    blurb: "A fast, spotless exterior wash & vac — perfect between details.",
    points: ["Hand wash & dry", "Interior vacuum", "Tyre shine", "Same-day"],
    featured: false,
  },
  {
    name: "Full Detail",
    blurb: "Deep interior + exterior detailing that brings back the showroom feel.",
    points: ["Interior deep clean", "Clay bar & wax", "Engine bay", "Paint-safe products"],
    featured: true,
  },
  {
    name: "Premium · PPF & Correction",
    blurb: "Paint correction and paint protection film for lasting, flawless finish.",
    points: ["Multi-stage correction", "Paint protection film", "Ceramic options", "By consultation"],
    featured: false,
  },
];

const CarWash = () => (
  <>
    <Helmet>
      <title>Wash &amp; Detailing — Rogue Automotive Jamaica | Book Online</title>
      <meta
        name="description"
        content="Premium car wash, full detailing, paint correction and PPF in Kingston, Jamaica. Book your detail online in under a minute with Rogue Automotive."
      />
      <link rel="canonical" href="https://www.rogueautomotiveja.com/car-wash" />
    </Helmet>

    <div className="min-h-screen bg-white font-roboto">
      <SubPageNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-red-dark text-white">
        <div className="absolute inset-0 bg-rogue-dark/20" />
        <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-28 max-w-3xl">
          <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-6">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Available now
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold mb-5 leading-[1.05]">
            Wash &amp; Detailing
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed max-w-xl">
            From a quick express wash to full detailing, paint correction and PPF — booked online in under
            a minute and done by people who treat your car like their own.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "hero" })} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full group">
                Book a Detail
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
            <a href={whatsappUrl("Hi Rogue Automotive — I'd like to ask about detailing.")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-7 py-6 text-base font-montserrat font-semibold rounded-full">
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
              Packages
            </p>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal">
              Pick your level of clean
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                  pkg.featured
                    ? "border-rogue-red shadow-xl ring-1 ring-rogue-red/20"
                    : "border-slate-200 shadow-sm hover:shadow-lg"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-6 text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-rogue-red text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-montserrat font-bold text-rogue-charcoal mb-2">{pkg.name}</h3>
                <p className="text-sm text-rogue-slate mb-4 leading-relaxed">{pkg.blurb}</p>
                <ul className="space-y-1.5 mb-6">
                  {pkg.points.map((pt) => (
                    <li key={pt} className="flex items-center text-sm text-rogue-slate">
                      <Check className="h-4 w-4 text-rogue-red mr-2 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <a
                  href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: `pkg-${pkg.name}` })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button
                    className={`w-full rounded-full font-montserrat font-semibold ${
                      pkg.featured
                        ? "bg-rogue-red hover:bg-rogue-red-dark text-white"
                        : "bg-rogue-charcoal hover:bg-rogue-dark text-white"
                    }`}
                  >
                    Book now
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-rogue-slate mt-8">
            Exact services and live pricing are shown in the booking app.
          </p>
        </div>
      </section>

      {/* Real before/after gallery (hidden if none available) */}
      <BeforeAfterGallery />

      {/* Membership / regular care */}
      <section className="py-16 sm:py-20 bg-rogue-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
                Keep it clean
              </p>
              <h2 className="text-3xl sm:text-4xl font-montserrat font-bold mb-4">
                Make a clean car a habit
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Book in a tap whenever you need us, save your vehicles and details for next time, and ask about
                membership plans for regular care at member pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "membership" })} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-6 py-5">
                    Book your first detail
                  </Button>
                </a>
                <a href={whatsappUrl("Hi Rogue Automotive — I'd like to ask about detailing memberships.")} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 rounded-full px-6 py-5">
                    Ask about memberships
                  </Button>
                </a>
              </div>
            </div>
            <ul className="space-y-3">
              {["Book online in under a minute", "Saved vehicles & service history", "Member pricing on regular care", "Priority slots for members"].map((b) => (
                <li key={b} className="flex items-center text-white/90">
                  <Check className="h-5 w-5 text-rogue-red mr-3 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Real testimonials (hidden if none available) */}
      <Testimonials />

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-rogue-light">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-4">
            Ready for that fresh-car feeling?
          </h2>
          <p className="text-rogue-slate text-lg mb-8">
            Book your detail online now — pick a service, choose a time, done.
          </p>
          <a href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "footer-cta" })} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-8 py-6 text-base font-montserrat font-semibold rounded-full group">
              Book a Detail
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default CarWash;
