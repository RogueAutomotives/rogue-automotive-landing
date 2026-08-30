/**
 * Fires a Meta Pixel PageView on every client-side route change.
 *
 * The pixel bootstrap only fires PageView once, on initial load — without this
 * every SPA navigation (Home → Car Wash → book) would be invisible to Meta,
 * which is most of the journey an ad click actually takes.
 *
 * Renders nothing; must sit inside the Router.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/metaPixel";

const PixelPageViews = () => {
  const { pathname, search } = useLocation();
  // The bootstrap already counted the first view — don't double-count it.
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    trackPageView();
  }, [pathname, search]);

  return null;
};

export default PixelPageViews;
