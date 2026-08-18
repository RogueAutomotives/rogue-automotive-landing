/**
 * Personalized rental payment page — /car-rentals/pay/:token.
 *
 * Staff generate these links from the admin portal (e.g. for Instagram-chat
 * customers); online checkout also lands here. The customer picks 50% deposit
 * or full payment (incl. refundable security deposit), pays via Stripe
 * Elements, and their dates lock automatically.
 */
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  CheckCircle2,
  Loader2,
  MessageCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import RentalStripeForm from "@/components/RentalStripeForm";
import { whatsappUrl } from "@/lib/links";
import { findRental } from "@/lib/rentalFleet";
import {
  createRentalPayment,
  formatJmd,
  getRentalPayPage,
  type ConfirmRentalPaymentResult,
  type RentalPayPage,
} from "@/lib/rentalsApi";

type PayOption = "Deposit50" | "FullWithSecurity";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const RentalPay = () => {
  const { token } = useParams<{ token: string }>();
  const [page, setPage] = useState<RentalPayPage | null>(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  const [option, setOption] = useState<PayOption | null>(null);
  const [intent, setIntent] = useState<{ clientSecret: string; amount: number } | null>(null);
  const [creatingIntent, setCreatingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");
  const [outcome, setOutcome] = useState<ConfirmRentalPaymentResult | null>(null);

  useEffect(() => {
    if (!token) return;
    getRentalPayPage(token)
      .then(setPage)
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Booking not found"))
      .finally(() => setLoading(false));
  }, [token]);

  const carContent = useMemo(() => (page ? findRental(page.carSlug) : undefined), [page]);
  const heroImage = carContent?.images[0];

  const canPayDeposit = page?.paymentState === "Unpaid";
  const alreadyDone = page?.paymentState === "FullyPaidWithSecurity";

  const startPayment = async (choice: PayOption) => {
    if (!token) return;
    setOption(choice);
    setCreatingIntent(true);
    setIntentError("");
    setIntent(null);
    try {
      const result = await createRentalPayment(token, choice);
      setIntent({ clientSecret: result.clientSecret, amount: result.amount });
    } catch (err) {
      setIntentError(err instanceof Error ? err.message : "Could not start the payment.");
      setOption(null);
    } finally {
      setCreatingIntent(false);
    }
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center py-24" role="status">
          <Loader2 className="h-8 w-8 animate-spin text-rogue-red" />
          <p className="text-rogue-slate mt-4">Loading your booking…</p>
        </div>
      );
    }

    if (loadError || !page) {
      return (
        <StatusCard
          icon={<XCircle className="h-14 w-14 text-rogue-red" />}
          title="Booking not found"
          body="This payment link doesn't match an active booking. It may have been replaced with a newer link — check the latest message from us, or get in touch."
        />
      );
    }

    if (page.isExpired) {
      return (
        <StatusCard
          icon={<XCircle className="h-14 w-14 text-rogue-red" />}
          title="This link has expired"
          body="No worries — message us and we'll send you a fresh payment link right away."
        />
      );
    }

    if (outcome?.datesUnavailable) {
      return (
        <StatusCard
          icon={<XCircle className="h-14 w-14 text-rogue-red" />}
          title="Those dates were just taken"
          body={`Another customer completed payment for the ${page.carName} over the same dates moments before you. ${outcome.refunded ? "Your payment has been fully refunded — card refunds typically take 5–10 business days." : "Your payment is being refunded."} Message us and we'll find you new dates or another car.`}
        />
      );
    }

    if (outcome?.isSuccess || alreadyDone) {
      const fullyPaid = alreadyDone || outcome?.paymentState !== "DepositPaid";
      return (
        <StatusCard
          icon={<CheckCircle2 className="h-14 w-14 text-green-500" />}
          title={fullyPaid ? "You're all set!" : "Deposit received — dates locked!"}
          body={
            fullyPaid
              ? `Your ${page.carName} is reserved for ${fmtDate(page.startDate)} – ${fmtDate(page.endDate)} and there's nothing more to pay before pickup. Your refundable security deposit is returned after the vehicle comes back in good condition. A receipt is on its way to your inbox.`
              : `Your ${page.carName} is reserved for ${fmtDate(page.startDate)} – ${fmtDate(page.endDate)}. The remaining balance plus the refundable security deposit (${formatJmd(page.pricing.securityDeposit)}) is due at pickup. A confirmation is on its way to your inbox.`
          }
        />
      );
    }

    return (
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking summary */}
        <Card className="border-0 shadow-lg overflow-hidden">
          {heroImage && (
            <img
              src={heroImage}
              alt={page.carName}
              className="w-full aspect-[3/2] object-cover"
            />
          )}
          <CardContent className="p-6">
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red mb-1">
              Your rental
            </p>
            <h1 className="text-2xl font-montserrat font-bold text-rogue-charcoal mb-4">
              {page.carName}
            </h1>
            <div className="space-y-2 text-sm text-rogue-slate">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-rogue-red" />
                {fmtDate(page.startDate)} → {fmtDate(page.endDate)} ({page.pricing.days} day
                {page.pricing.days === 1 ? "" : "s"})
              </p>
              <p className="flex items-center gap-2">
                <Car className="h-4 w-4 text-rogue-red" />
                {formatJmd(page.pricing.pricePerDay)} / day
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-rogue-red" />
                Refundable security deposit: {formatJmd(page.pricing.securityDeposit)}
              </p>
            </div>

            <div className="border-t border-slate-200 mt-4 pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-rogue-slate">
                <span>Rental total</span>
                <span className="font-semibold text-rogue-charcoal">
                  {formatJmd(page.pricing.rentalSubtotal)}
                </span>
              </div>
              <div className="flex justify-between text-rogue-slate">
                <span>Security deposit (refundable)</span>
                <span className="font-semibold text-rogue-charcoal">
                  {formatJmd(page.pricing.securityDeposit)}
                </span>
              </div>
              {page.amountPaidOnline > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Already paid</span>
                  <span className="font-semibold">−{formatJmd(page.amountPaidOnline)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment options */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-montserrat font-bold text-rogue-charcoal mb-1">
              Hi {page.customerFirstName} — lock in your booking
            </h2>
            <p className="text-sm text-rogue-slate mb-5">
              Your dates are held once payment is received.
            </p>

            <div className="space-y-3 mb-5">
              {canPayDeposit && (
                <OptionButton
                  active={option === "Deposit50"}
                  title={`Pay 50% deposit — ${formatJmd(page.pricing.depositDue)}`}
                  subtitle={`Locks your dates now. Remainder + ${formatJmd(page.pricing.securityDeposit)} security deposit due at pickup.`}
                  onClick={() => startPayment("Deposit50")}
                  disabled={creatingIntent}
                />
              )}
              <OptionButton
                active={option === "FullWithSecurity"}
                title={`Pay everything — ${formatJmd(page.balanceWithSecurity)}`}
                subtitle={
                  page.paymentState === "DepositPaid"
                    ? "Clears your remaining balance including the refundable security deposit."
                    : "Rental total + refundable security deposit. Nothing more to pay at pickup."
                }
                onClick={() => startPayment("FullWithSecurity")}
                disabled={creatingIntent}
              />
            </div>

            {creatingIntent && (
              <div className="flex items-center gap-2 text-sm text-rogue-slate py-4" role="status">
                <Loader2 className="h-4 w-4 animate-spin text-rogue-red" /> Preparing secure payment…
              </div>
            )}
            {intentError && (
              <p className="text-sm text-rogue-red mb-4" role="alert">
                {intentError}
              </p>
            )}

            {intent && !creatingIntent && (
              <RentalStripeForm
                key={intent.clientSecret}
                clientSecret={intent.clientSecret}
                amount={intent.amount}
                onResult={setOutcome}
              />
            )}

            <div className="border-t border-slate-100 mt-6 pt-4">
              <a
                href={whatsappUrl(`Hi Rogue Automotive — I have a question about my ${page.carName} rental booking.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-rogue-slate hover:text-rogue-red transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-1.5" /> Questions? Chat with us on WhatsApp
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Complete your rental booking | Rogue Automotive Jamaica</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-rogue-light font-roboto">
        <SubPageNav />
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-5xl">
          <Link
            to="/car-rentals"
            className="inline-flex items-center text-sm font-montserrat font-semibold text-rogue-slate hover:text-rogue-red transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" /> All rentals
          </Link>
          {renderBody()}
        </div>
        <Footer />
      </div>
    </>
  );
};

function OptionButton({
  active,
  title,
  subtitle,
  onClick,
  disabled,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all disabled:opacity-60 ${
        active
          ? "border-rogue-red bg-red-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <p className="font-montserrat font-semibold text-rogue-charcoal">{title}</p>
      <p className="text-sm text-rogue-slate mt-0.5">{subtitle}</p>
    </button>
  );
}

function StatusCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="border-0 shadow-lg max-w-xl mx-auto">
      <CardContent className="p-8 flex flex-col items-center text-center">
        {icon}
        <h1 className="text-2xl font-montserrat font-bold text-rogue-charcoal mt-4 mb-2">{title}</h1>
        <p className="text-rogue-slate leading-relaxed">{body}</p>
        <a
          href={whatsappUrl("Hi Rogue Automotive — about my rental booking.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6"
        >
          <Button
            variant="outline"
            className="rounded-full border-slate-300 font-montserrat font-semibold"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Message us on WhatsApp
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}

export default RentalPay;
