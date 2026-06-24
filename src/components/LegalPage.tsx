import { Helmet } from "react-helmet-async";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";

/**
 * Shared layout for legal documents (Terms, Privacy). Provides consistent
 * typography for plain semantic content (h2/h3/p/ul/li/strong/a).
 */
const PROSE =
  "max-w-3xl mx-auto " +
  "[&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-montserrat [&_h2]:font-bold [&_h2]:text-rogue-charcoal [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:scroll-mt-24 " +
  "[&_h3]:font-montserrat [&_h3]:font-semibold [&_h3]:text-rogue-charcoal [&_h3]:mt-6 [&_h3]:mb-2 " +
  "[&_p]:text-rogue-slate [&_p]:leading-relaxed [&_p]:mb-3 " +
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_li]:text-rogue-slate [&_li]:leading-relaxed " +
  "[&_strong]:text-rogue-charcoal [&_strong]:font-semibold " +
  "[&_a]:text-rogue-red [&_a]:underline [&_a]:underline-offset-2";

export default function LegalPage({
  title,
  subtitle,
  effectiveDate,
  description,
  canonical,
  children,
}: {
  title: string;
  subtitle: string;
  effectiveDate: string;
  description: string;
  canonical: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Helmet>
        <title>{title} — Rogue Automotive Jamaica</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Helmet>
      <div className="min-h-screen bg-white font-roboto">
        <SubPageNav />

        {/* Header */}
        <section className="bg-rogue-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-16 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-montserrat font-bold mb-3">{title}</h1>
            <p className="text-white/75 max-w-2xl leading-relaxed">{subtitle}</p>
            <p className="text-white/50 text-sm mt-5">Effective date: {effectiveDate}</p>
          </div>
        </section>

        {/* Body */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <article className={PROSE}>{children}</article>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
