/**
 * Stripe Elements card form for rental payments. Wraps <PaymentElement> with
 * the confirm-on-submit flow: client-side confirmPayment (no redirect for
 * cards) → server-side /rentalpayments/confirm → onResult.
 */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  confirmRentalPayment,
  formatJmd,
  STRIPE_PUBLISHABLE_KEY,
  type ConfirmRentalPaymentResult,
} from "@/lib/rentalsApi";

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

interface Props {
  clientSecret: string;
  amount: number;
  onResult: (result: ConfirmRentalPaymentResult) => void;
}

function InnerForm({ amount, onResult }: Omit<Props, "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError("");

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed — please try again.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
      try {
        const result = await confirmRentalPayment(paymentIntent.id);
        onResult(result);
      } catch (err) {
        // Money may already be captured; the server confirm is idempotent —
        // let the customer retry rather than re-charging.
        setError(
          err instanceof Error
            ? `${err.message} If you were charged, your booking is safe — try refreshing this page.`
            : "We couldn't verify the payment — refresh this page to check your booking status."
        );
        setSubmitting(false);
      }
      return;
    }

    setError("Payment was not completed — please try again.");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && (
        <p className="text-sm text-rogue-red mt-3" role="alert">
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full mt-5 bg-rogue-red hover:bg-rogue-red-dark text-white font-montserrat font-semibold py-6 rounded-full disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing…
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" /> Pay {formatJmd(amount)}
          </>
        )}
      </Button>
      <p className="text-xs text-rogue-slate text-center mt-3">
        Payments are processed securely by Stripe. We never see your card details.
      </p>
    </form>
  );
}

export default function RentalStripeForm({ clientSecret, amount, onResult }: Props) {
  if (!stripePromise) {
    return (
      <p className="text-sm text-rogue-red">
        Online payment is temporarily unavailable — please contact us on WhatsApp instead.
      </p>
    );
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          variables: {
            colorPrimary: "#dc2626",
            fontFamily: "Roboto, system-ui, sans-serif",
            borderRadius: "8px",
          },
        },
      }}
    >
      <InnerForm amount={amount} onResult={onResult} />
    </Elements>
  );
}
