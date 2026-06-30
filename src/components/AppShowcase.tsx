import {
  CalendarCheck,
  Gift,
  Car,
  CreditCard,
  Ticket,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { bookingUrl } from "@/lib/links";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Book in under a minute",
    description: "Pick a package, choose a time, and you're set — no calls, no waiting.",
  },
  {
    icon: Gift,
    title: "Loyalty rewards",
    description: "Earn a stamp on every visit and unlock free washes and member perks.",
  },
  {
    icon: Car,
    title: "Saved vehicles",
    description: "Store your cars once for accurate pricing and one-tap re-booking.",
  },
  {
    icon: CreditCard,
    title: "Easy online pay",
    description: "Pay securely from your phone, or settle on arrival — your choice.",
  },
  {
    icon: Ticket,
    title: "Vouchers & lounge perks",
    description: "Claim vouchers in the app and redeem perks in the Rogue lounge.",
  },
];

/** A lightweight, on-brand mock of the app dashboard — no screenshot asset needed. */
const DashboardMock = () => (
  <div className="relative mx-auto w-[260px] sm:w-[300px]">
    {/* Phone frame */}
    <div className="rounded-[2.5rem] border-[10px] border-rogue-charcoal bg-rogue-charcoal shadow-2xl">
      <div className="rounded-[1.8rem] overflow-hidden bg-rogue-light">
        {/* App header */}
        <div className="bg-rogue-dark px-5 pt-6 pb-5 text-white">
          <p className="text-xs text-white/60 font-roboto">Welcome back</p>
          <p className="text-lg font-montserrat font-bold">Marcus 👋</p>
        </div>

        <div className="p-4 space-y-3 -mt-3">
          {/* Loyalty card */}
          <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-montserrat font-semibold text-rogue-charcoal">Loyalty</span>
              <span className="text-xs text-rogue-red font-semibold">6 / 8</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-5 w-5 rounded-full flex items-center justify-center ${
                    i < 6 ? "bg-rogue-red text-white" : "bg-slate-100 text-slate-300"
                  }`}
                >
                  <Star className="h-2.5 w-2.5" fill={i < 6 ? "currentColor" : "none"} />
                </span>
              ))}
            </div>
            <p className="text-[10px] text-rogue-slate mt-2">2 more visits until a free wash</p>
          </div>

          {/* Next booking */}
          <div className="rounded-2xl bg-rogue-charcoal text-white p-4">
            <p className="text-[10px] text-white/60 mb-1">Next appointment</p>
            <p className="text-sm font-montserrat font-bold">Full Detail</p>
            <p className="text-xs text-white/80">Sat · 10:00 AM</p>
          </div>

          {/* Saved vehicle + voucher row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-3">
              <Car className="h-4 w-4 text-rogue-red mb-1.5" />
              <p className="text-[11px] font-montserrat font-semibold text-rogue-charcoal leading-tight">
                2021 Hilux
              </p>
              <p className="text-[10px] text-rogue-slate">Saved vehicle</p>
            </div>
            <div className="rounded-2xl bg-rogue-red/10 border border-rogue-red/20 p-3">
              <Ticket className="h-4 w-4 text-rogue-red mb-1.5" />
              <p className="text-[11px] font-montserrat font-semibold text-rogue-charcoal leading-tight">
                Free coffee
              </p>
              <p className="text-[10px] text-rogue-slate">Lounge voucher</p>
            </div>
          </div>

          {/* Pay button */}
          <div className="rounded-full bg-rogue-red text-white text-center text-xs font-montserrat font-semibold py-2.5">
            Pay J$14,000
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AppShowcase = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 sm:py-20 bg-rogue-light overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Copy + features */}
          <div ref={elementRef}>
            <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">
              The Rogue app
            </p>
            <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-4">
              Your car care, all in one place
            </h2>
            <p className="text-rogue-slate text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Book details, track loyalty rewards, store your vehicles, pay online and claim lounge
              perks — everything you need to keep your car looking its best, right from your phone.
            </p>

            <ul className="space-y-4 mb-8">
              {FEATURES.map((f, i) => (
                <li
                  key={f.title}
                  className={`flex items-start transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <span className="flex-shrink-0 mr-4 p-2.5 rounded-xl bg-rogue-red/10 text-rogue-red">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-montserrat font-semibold text-rogue-charcoal">{f.title}</h3>
                    <p className="text-sm text-rogue-slate leading-relaxed">{f.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "app-showcase" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-7 py-6 group">
                  Book a Detail
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
              <a
                href={bookingUrl("/register", { campaign: "car-wash", content: "app-showcase" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-rogue-charcoal/20 text-rogue-charcoal hover:bg-rogue-charcoal hover:text-white font-montserrat font-semibold rounded-full px-7 py-6"
                >
                  Create an account
                </Button>
              </a>
            </div>
          </div>

          {/* Device mock */}
          <div
            className={`flex justify-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
