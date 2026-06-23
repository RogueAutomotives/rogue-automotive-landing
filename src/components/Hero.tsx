import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { bookingUrl } from "@/lib/links";
import { ArrowRight } from "lucide-react";

const navLink =
  "transition-colors duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-rogue-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

const Hero = () => {
  const isScrolled = useScroll();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-rogue-dark">
      {/* Background image + cinematic slate overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rogue-dark/95 via-rogue-charcoal/85 to-rogue-dark/95" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-rogue-dark to-transparent" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/lovable-uploads/962d3bfb-d1d6-4416-8e25-35bf7d657300.png"
                alt="Rogue Automotive"
                className="h-11 sm:h-14 w-auto"
              />
            </a>

            <div className="flex items-center gap-6 sm:gap-8">
              <div
                className={`hidden md:flex items-center gap-8 ${
                  isScrolled ? "text-rogue-charcoal" : "text-white"
                }`}
              >
                <a href="#services" onClick={scrollTo("#services")} className={navLink}>
                  Services
                </a>
                <a href="#about" onClick={scrollTo("#about")} className={navLink}>
                  About
                </a>
                <a href="#contact" onClick={scrollTo("#contact")} className={navLink}>
                  Contact
                </a>
              </div>
              <a href={bookingUrl("/book-a-detail", { content: "nav" })} target="_blank" rel="noopener noreferrer">
                <Button className="bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold rounded-full px-5">
                  Book a Detail
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex items-center min-h-[100svh]">
        <div className="max-w-3xl py-28">
          <p className="text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase mb-5 animate-fade-in">
            Rogue Automotive · Kingston, Jamaica
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-montserrat font-bold text-white mb-5 sm:mb-6 leading-[1.05]">
            Drive Clean.
            <br />
            Drive Bold.
            <br />
            <span className="text-rogue-silver">Drive Rogue.</span>
          </h1>

          <p className="text-lg sm:text-xl text-rogue-silver/90 mb-8 max-w-xl leading-relaxed">
            One home for your car in Kingston — premium <strong className="text-white font-semibold">wash &amp; detailing</strong>,
            quality <strong className="text-white font-semibold">sales</strong>, and flexible{" "}
            <strong className="text-white font-semibold">rentals</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-rogue-red hover:bg-rogue-red-dark text-white border-0 px-7 py-6 text-base font-montserrat font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] group"
            >
              Explore our services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <a href={bookingUrl("/book-a-detail", { content: "hero" })} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border-white/30 px-7 py-6 text-base font-montserrat font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
              >
                Book a Detail
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10"
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
