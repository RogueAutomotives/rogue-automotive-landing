/**
 * Stripe card form for a Rogue Parts invoice — same flow as RentalStripeForm:
 * confirmPayment in the browser (no redirect for cards), then the server confirm.
 */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/rentalsApi";
import { confirmPartsCardPayment, fmtJmd } from "@/lib/partsApi";

const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

interface Props {
  clientSecret: string;
  amount: number;
  onPaid: () => void;
}

function InnerForm({ amount, onPaid }: Omit<Props, "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
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
        await confirmPartsCardPayment(paymentIntent.id);
        onPaid();
      } catch (err) {
        setError(
          `${err instanceof Error ? err.message : "We couldn't verify the payment."} If you were charged, it's safe — refresh this page in a minute.`
        );
        setSubmitting(false);
      }
      return;
    }
    setError("Payment was not completed — please try again.");
    setSubmitting(false);
  };

  return (
    <form onSubmit={submit}>
      <PaymentElement />
      {error && (
        <p className="text-sm text-red-700 mt-3" role="alert">
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
            <Lock className="mr-2 h-4 w-4" /> Pay {fmtJmd(amount)}
          </>
        )}
      </Button>
      <p className="text-xs text-rogue-slate text-center mt-3">Payments are processed securely by Stripe. We never see your card details.</p>
    </form>
  );
}

export default function PartsStripeForm({ clientSecret, amount, onPaid }: Props) {
  if (!stripePromise) {
    return <p className="text-sm text-red-700">Card payment is unavailable right now — please pay by bank transfer.</p>;
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { variables: { colorPrimary: "#dc2626", fontFamily: "Roboto, system-ui, sans-serif", borderRadius: "8px" } },
      }}
    >
      <InnerForm amount={amount} onPaid={onPaid} />
    </Elements>
  );
}
