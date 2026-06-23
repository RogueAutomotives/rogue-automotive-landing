import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingUrl } from "@/lib/links";

/** Solid header for business-line sub-pages (logo home + back + Book a Detail). */
const SubPageNav = () => (
  <header className="sticky top-0 z-50 bg-rogue-dark/95 backdrop-blur border-b border-white/10">
    <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png"
          alt="Rogue Automotive"
          className="h-10 sm:h-12 w-auto"
        />
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          to="/"
          className="hidden sm:inline-flex items-center text-sm text-rogue-silver hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          All services
        </Link>
        <a href={bookingUrl("/book-a-detail", { content: "subnav" })} target="_blank" rel="noopener noreferrer">
          <Button className="bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-5">
            Book a Detail
          </Button>
        </a>
      </div>
    </div>
  </header>
);

export default SubPageNav;
