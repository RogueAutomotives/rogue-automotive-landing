import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookingUrl } from "@/lib/links";

interface SubPageNavProps {
  /**
   * What the top-right button does. "book" (the default) sends people straight
   * into the booking flow; "signup" sends them to create an account instead,
   * for pages where the membership is the thing we want to grow.
   */
  cta?: "book" | "signup";
  /** utm_campaign for the CTA, so each page's header clicks are distinguishable. */
  campaign?: string;
}

/** Solid header for business-line sub-pages (logo home + back + a CTA). */
const SubPageNav = ({ cta = "book", campaign }: SubPageNavProps) => {
  const isSignup = cta === "signup";
  const href = bookingUrl(isSignup ? "/register" : "/book-a-detail", {
    content: isSignup ? "subnav-signup" : "subnav",
    ...(campaign ? { campaign } : {}),
  });

  return (
    <header className="sticky top-0 z-50 bg-rogue-dark/95 backdrop-blur border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png"
            alt="Rogue Automotive"
            className="h-10 sm:h-12 w-auto"
            // Render the dark logo as white so it stands out on the dark header
            style={{ filter: "brightness(0) invert(1)" }}
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
          <a
            href={bookingUrl("/login", {
              content: "subnav-signin",
              ...(campaign ? { campaign } : {}),
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="font-montserrat font-semibold text-sm text-rogue-silver hover:text-white transition-colors"
          >
            Sign in
          </a>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <Button className="bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-5">
              {isSignup ? (
                <>
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  Sign up free
                </>
              ) : (
                "Book a Detail"
              )}
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default SubPageNav;
