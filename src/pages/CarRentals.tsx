import { Helmet } from "react-helmet-async";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import { BUSINESS_LINES } from "@/lib/businessLines";

const line = BUSINESS_LINES.find((l) => l.key === "rentals")!;

const CarRentals = () => (
  <>
    <Helmet>
      <title>Car Rentals — Rogue Automotive Jamaica (Coming Soon)</title>
      <meta
        name="description"
        content="Flexible daily and weekly car rentals with insurance included from Rogue Automotive in Kingston, Jamaica. Rentals launching soon — enquire today."
      />
      <link rel="canonical" href="https://www.rogueautomotiveja.com/car-rentals" />
    </Helmet>
    <div className="min-h-screen bg-white font-roboto">
      <SubPageNav />
      <ComingSoon line={line} />
      <Footer />
    </div>
  </>
);

export default CarRentals;
