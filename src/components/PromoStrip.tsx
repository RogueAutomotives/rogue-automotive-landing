import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { COATING_COMBO_PATH, isCoatingComboLive } from "@/lib/promos";

/**
 * Slim promo link at the top of the home hero for the Coating Combo. Renders
 * only through the last day of the offer (Jamaica date), so it disappears on
 * its own with no redeploy.
 */
const PromoStrip = () => {
  if (!isCoatingComboLive()) return null;
  return (
    <Link
      to={COATING_COMBO_PATH}
      className="group inline-flex items-start sm:items-center gap-2 max-w-full rounded-2xl sm:rounded-full border border-rogue-red/50 bg-rogue-red/15 hover:bg-rogue-red/25 px-4 py-2 mb-6 text-sm text-white transition-colors"
    >
      <span className="leading-snug">
        <strong className="font-montserrat font-semibold">Coating Combo</strong> — Bronze Detail + 1-year ceramic for
        J$49,999. Until Nov 30
      </span>
      <ArrowRight className="h-4 w-4 flex-shrink-0 mt-0.5 sm:mt-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
};

export default PromoStrip;
