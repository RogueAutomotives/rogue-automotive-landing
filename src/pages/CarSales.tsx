import { Helmet } from "react-helmet-async";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import { BUSINESS_LINES } from "@/lib/businessLines";

const line = BUSINESS_LINES.find((l) => l.key === "sales")!;

const CarSales = () => (
  <>
    <Helmet>
      <title>Car Sales — Rogue Automotive Jamaica (Coming Soon)</title>
      <meta
        name="description"
        content="Quality, inspected vehicles at fair prices from Rogue Automotive in Kingston, Jamaica. Car sales launching soon — enquire today."
      />
      <link rel="canonical" href="https://www.rogueautomotiveja.com/car-sales" />
    </Helmet>
    <div className="min-h-screen bg-white font-roboto">
      <SubPageNav />
      <ComingSoon line={line} />
      <Footer />
    </div>
  </>
);

export default CarSales;
