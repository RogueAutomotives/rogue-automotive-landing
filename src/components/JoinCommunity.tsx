import { UserPlus, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingUrl } from "@/lib/links";

const PERKS = [
  "Loyalty rewards on every visit",
  "Saved vehicles & service history",
  "Member pricing on regular care",
  "Vouchers & lounge perks",
];

const JoinCommunity = () => (
  <section className="py-16 sm:py-24 bg-gradient-to-br from-rogue-dark via-rogue-charcoal to-rogue-red-dark text-white">
    <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
      <span className="inline-flex items-center text-[11px] font-montserrat font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-rogue-red text-white mb-6">
        <UserPlus className="h-3.5 w-3.5 mr-1.5" />
        Join the community
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold mb-5 leading-[1.1]">
        Become a Rogue member
      </h2>
      <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
        Create a free account and join a community that takes pride in their rides. Earn rewards,
        save your vehicles, claim perks in the lounge, and book in a tap — every time.
      </p>

      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 max-w-2xl mx-auto">
        {PERKS.map((p) => (
          <li key={p} className="flex items-center text-white/90 text-sm sm:text-base">
            <Check className="h-5 w-5 text-rogue-red mr-2 flex-shrink-0" />
            {p}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <a
          href={bookingUrl("/register", { campaign: "car-wash", content: "join-community" })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-8 py-6 text-base font-montserrat font-semibold rounded-full group"
          >
            Create your free account
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </a>
        <a
          href={bookingUrl("/book-a-detail", { campaign: "car-wash", content: "join-community" })}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-8 py-6 text-base font-montserrat font-semibold rounded-full"
          >
            Book a Detail
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default JoinCommunity;
