import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll to the top on route change (SPA navigations keep scroll otherwise). */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

export default ScrollToTop;
