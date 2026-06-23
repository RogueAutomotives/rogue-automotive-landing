import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGallery, type GalleryItem } from "@/lib/api";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

/** Accessible before/after comparison: keyboard-operable range + drag handle. */
function BeforeAfterSlider({ item }: { item: GalleryItem }) {
  const [value, setValue] = useState(50);
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 select-none">
      {/* After (base, full) */}
      <img
        src={item.afterImageUrl}
        alt={`${item.title} — after`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
      {/* Before (clipped to the slider position) */}
      <img
        src={item.beforeImageUrl}
        alt={`${item.title} — before`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        loading="lazy"
        draggable={false}
      />

      {/* Labels */}
      <span className="absolute top-3 left-3 text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-black/55 text-white">
        Before
      </span>
      <span className="absolute top-3 right-3 text-[11px] font-montserrat font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-rogue-red text-white">
        After
      </span>

      {/* Divider + handle */}
      <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${value}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-white shadow-lg flex items-center justify-center text-rogue-charcoal text-xs">
          ◀▶
        </div>
      </div>

      {/* Range covers the image for drag + keyboard control */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Reveal before and after for ${item.title}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}

const BeforeAfterGallery = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
    staleTime: 1000 * 60 * 10,
  });

  // Degrade gracefully: don't show a broken/empty section on a marketing page.
  if (isError || (!isLoading && (!data || data.length === 0))) return null;

  const items = (data ?? []).slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-rogue-light">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12" ref={elementRef}>
          <p
            className={`text-rogue-red font-montserrat font-semibold tracking-[0.2em] text-xs uppercase mb-3 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Our work
          </p>
          <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-rogue-charcoal mb-3">
            See the difference
          </h2>
          <p className="text-base sm:text-lg text-rogue-slate">
            Drag the slider on each photo to reveal the transformation — real cars, real details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-slate-200 animate-pulse" />
              ))
            : items.map((item) => (
                <figure key={item.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <BeforeAfterSlider item={item} />
                  <figcaption className="p-4">
                    <p className="font-montserrat font-semibold text-rogue-charcoal">{item.title}</p>
                    {item.description && <p className="text-sm text-rogue-slate mt-1">{item.description}</p>}
                  </figcaption>
                </figure>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
