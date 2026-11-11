/**
 * Building blocks for the ad offer pages (/offers/ceramic-sealant,
 * /offers/ceramic-coating).
 *
 * These pages exist because the ads used to land on the booking app's full
 * service list: a 4 MB app that shows a blank screen for several seconds on a
 * phone, and then a menu that didn't mention the offer. An offer page says the
 * same thing the ad said, loads fast, and has one button.
 *
 * Deliberately no site navigation — every link off the page is a way to lose
 * the visitor the ad just paid for.
 */
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/links";

export const OfferHeader = () => (
  <header className="absolute top-0 inset-x-0 z-20">
    <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      <Link to="/" aria-label="Rogue Automotive home">
        <img
          src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png"
          alt="Rogue Automotive"
          className="h-9 sm:h-11 w-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </Link>
    </div>
  </header>
);

interface OfferHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  video: string;
  poster: string;
  cta: { label: string; href: string; onClick?: () => void };
  ctaNote: string;
  secondary?: { label: string; href: string };
}

export const OfferHero = ({ eyebrow, title, subtitle, video, poster, cta, ctaNote, secondary }: OfferHeroProps) => (
  <section className="relative min-h-[88svh] flex items-end overflow-hidden bg-rogue-dark">
    <video
      className="absolute inset-0 h-full w-full object-cover opacity-70"
      src={video}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
    {/* Legibility: the bottom of the frame carries the copy. */}
    <div className="absolute inset-0 bg-gradient-to-t from-rogue-dark via-rogue-dark/70 to-rogue-dark/10" />
    <OfferHeader />
    <div className="relative z-10 container mx-auto px-4 sm:px-6 pb-10 sm:pb-16 pt-28">
      <div className="max-w-xl">
        <p className="text-red-400 font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3">{eyebrow}</p>
        <h1 className="text-[2rem] leading-[1.1] sm:text-5xl font-montserrat font-bold text-white mb-4">{title}</h1>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-7">{subtitle}</p>
        <a
          href={cta.href}
          onClick={cta.onClick}
          className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold text-base px-7 py-4 transition-colors"
        >
          {cta.label}
          <ArrowRight className="h-5 w-5" />
        </a>
        <p className="text-sm text-white/60 mt-3">{ctaNote}</p>
        {secondary && (
          <a href={secondary.href} className="inline-block text-sm text-white/70 underline underline-offset-4 mt-4 hover:text-white">
            {secondary.label}
          </a>
        )}
      </div>
    </div>
  </section>
);

export const OfferSteps = ({ title, steps }: { title: string; steps: { title: string; body: string }[] }) => (
  <section className="py-14 sm:py-20 bg-white">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-rogue-charcoal mb-8">{title}</h2>
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex-shrink-0 h-9 w-9 rounded-full bg-rogue-red text-white font-montserrat font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <h3 className="font-montserrat font-semibold text-rogue-charcoal text-lg">{step.title}</h3>
              <p className="text-rogue-slate leading-relaxed mt-0.5">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export const OfferCta = ({ title, cta }: { title: string; cta: { label: string; href: string; onClick?: () => void } }) => (
  <section className="py-14 sm:py-16 bg-rogue-dark">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl text-center">
      <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-white mb-6">{title}</h2>
      <a
        href={cta.href}
        onClick={cta.onClick}
        className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold text-base px-7 py-4 transition-colors"
      >
        {cta.label}
        <ArrowRight className="h-5 w-5" />
      </a>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm text-white/70">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {CONTACT.address}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Open 9 AM: till 7 PM Mon–Thu, 9 PM Fri–Sat, 6 PM Sun
        </span>
      </div>
    </div>
  </section>
);

export const OfferFinePrint = ({ items }: { items: string[] }) => (
  <section className="py-10 bg-slate-50">
    <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
      <h2 className="font-montserrat font-semibold text-rogue-charcoal text-sm uppercase tracking-wide mb-3">The fine print</h2>
      <ul className="list-disc pl-5 space-y-1.5 text-sm text-rogue-slate">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mt-4">
        See our <Link to="/terms" className="underline">Terms</Link> and{" "}
        <Link to="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  </section>
);
