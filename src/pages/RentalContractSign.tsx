/**
 * Rental agreement signing page — /car-rentals/contract/:token.
 *
 * Staff issue the contract from the admin portal; the customer follows the
 * emailed link here, reviews the agreement, draws a signature, types their
 * legal name, and submits. Both parties then receive the signed PDF by email.
 */
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  IdCard,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Upload,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import SignatureCanvas from "@/components/SignatureCanvas";
import { whatsappUrl } from "@/lib/links";
import {
  formatJmd,
  getRentalContract,
  setLicenceInPerson,
  signRentalContract,
  uploadDriversLicence,
  type RentalContractPage,
} from "@/lib/rentalsApi";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** Renders the template micro-format: "## " lines as headings, blank-line paragraphs. */
const ContractText = ({ text }: { text: string }) => (
  <div className="space-y-3 text-sm text-rogue-slate leading-relaxed">
    {text
      .replace(/\r\n/g, "\n")
      .split("\n\n")
      .map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        return trimmed.startsWith("## ") ? (
          <h3 key={i} className="font-montserrat font-semibold text-rogue-charcoal pt-2">
            {trimmed.slice(3)}
          </h3>
        ) : (
          <p key={i} className="whitespace-pre-line">
            {trimmed}
          </p>
        );
      })}
  </div>
);

const RentalContractSign = () => {
  const { token } = useParams<{ token: string }>();
  const [page, setPage] = useState<RentalContractPage | null>(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  const [signature, setSignature] = useState<string | null>(null);
  const [signedName, setSignedName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [signedOk, setSignedOk] = useState(false);
  const [licence, setLicence] = useState<LicenceStatus>("none");

  useEffect(() => {
    if (!token) return;
    getRentalContract(token)
      .then((p) => {
        setPage(p);
        setLicence(p.hasLicenceUpload ? "uploaded" : p.licenceInPerson ? "inPerson" : "none");
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Contract not found"))
      .finally(() => setLoading(false));
  }, [token]);

  const submit = async () => {
    if (!token) return;
    if (!signature) {
      setSubmitError("Please draw your signature in the box.");
      return;
    }
    if (!signedName.trim()) {
      setSubmitError("Please type your full legal name.");
      return;
    }
    if (!agreed) {
      setSubmitError("Please confirm you agree to the terms of the agreement.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      await signRentalContract(token, {
        signatureImage: signature,
        signedByName: signedName.trim(),
        agreedToTerms: agreed,
      });
      setSignedOk(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not submit your signature.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderBody = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center py-24" role="status">
          <Loader2 className="h-8 w-8 animate-spin text-rogue-red" />
          <p className="text-rogue-slate mt-4">Loading your agreement…</p>
        </div>
      );
    }

    if (loadError || !page || !page.isFound) {
      return (
        <StatusCard
          icon={<XCircle className="h-14 w-14 text-rogue-red" />}
          title="Agreement not found"
          body="This signing link doesn't match an active agreement. It may have been replaced with a newer link — check the latest email from us, or get in touch."
        />
      );
    }

    if (page.isVoided) {
      return (
        <StatusCard
          icon={<XCircle className="h-14 w-14 text-rogue-red" />}
          title="This agreement was replaced"
          body="A newer version of your rental agreement has been issued. Please use the most recent link you were sent, or message us and we'll resend it."
        />
      );
    }

    if (signedOk || page.isSigned) {
      return (
        <div className="max-w-xl mx-auto space-y-6">
          <StatusCard
            icon={<CheckCircle2 className="h-14 w-14 text-green-500" />}
            title="Agreement signed"
            body={`Your rental agreement for the ${page.carName} (${fmtDate(page.startDate)} – ${fmtDate(page.endDate)}) is signed${signedOk ? " — a copy is on its way to your inbox" : ""}. See you at pickup!`}
          />
          {token && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <LicenceSection token={token} status={licence} onStatus={setLicence} />
              </CardContent>
            </Card>
          )}
        </div>
      );
    }

    if (page.isExpired) {
      return (
        <StatusCard
          icon={<XCircle className="h-14 w-14 text-rogue-red" />}
          title="This link has expired"
          body="No worries — message us and we'll send you a fresh signing link right away."
        />
      );
    }

    return (
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Agreement text */}
        <Card className="border-0 shadow-lg lg:col-span-3">
          <CardContent className="p-6 sm:p-8">
            <p className="text-xs font-montserrat font-semibold uppercase tracking-[0.2em] text-rogue-red mb-1 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Rental agreement
            </p>
            <h1 className="text-2xl font-montserrat font-bold text-rogue-charcoal mb-4">
              {page.carName}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-rogue-slate mb-5">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-rogue-red" />
                {fmtDate(page.startDate)} → {fmtDate(page.endDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-rogue-red" />
                Rental {formatJmd(page.rentalSubtotal)} · Deposit {formatJmd(page.securityDeposit)}{" "}
                (refundable)
              </span>
            </div>
            <div className="border-t border-slate-200 pt-5 max-h-[28rem] overflow-y-auto pr-2">
              <ContractText text={page.contractText} />
            </div>
          </CardContent>
        </Card>

        {/* Signing panel */}
        <Card className="border-0 shadow-lg lg:col-span-2 self-start">
          <CardContent className="p-6">
            <h2 className="text-lg font-montserrat font-bold text-rogue-charcoal mb-1">
              Hi {page.customerName || "there"} — sign below
            </h2>
            <p className="text-sm text-rogue-slate mb-5">
              You'll receive a signed copy of the agreement by email.
            </p>

            <SignatureCanvas onChange={setSignature} />

            <label
              className="block text-sm font-montserrat font-semibold text-rogue-charcoal mt-5 mb-1.5"
              htmlFor="signedName"
            >
              Full legal name
            </label>
            <Input
              id="signedName"
              value={signedName}
              onChange={(e) => setSignedName(e.target.value)}
              placeholder="As it appears on your driver's licence"
              autoComplete="name"
            />

            <div className="mt-5 pt-5 border-t border-slate-200">
              <LicenceSection token={token!} status={licence} onStatus={setLicence} />
            </div>

            <label className="flex items-start gap-2.5 mt-4 text-sm text-rogue-slate cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#dc2626]"
              />
              <span>
                I have read and agree to the terms of this Vehicle Rental Agreement, and I confirm
                the drawn signature is mine.
              </span>
            </label>

            {submitError && (
              <p className="text-sm text-rogue-red mt-4" role="alert">
                {submitError}
              </p>
            )}

            <Button
              onClick={submit}
              disabled={submitting}
              className="w-full mt-5 rounded-full bg-rogue-red hover:bg-rogue-red/90 font-montserrat font-semibold"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Sign agreement"
              )}
            </Button>

            <a
              href={whatsappUrl(`Hi Rogue Automotive — I have a question about my ${page.carName} rental agreement.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-sm text-rogue-slate hover:text-rogue-red transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" /> Questions? Chat with us on WhatsApp
            </a>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Sign your rental agreement | Rogue Automotive Jamaica</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-rogue-light font-roboto">
        <SubPageNav />
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 max-w-6xl">
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

type LicenceStatus = "none" | "uploaded" | "inPerson";

const LICENCE_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf";
const LICENCE_MAX_BYTES = 10 * 1024 * 1024;

/**
 * Driver's licence collection: upload a copy now (stored privately, viewed
 * only by staff) or promise to present it at pickup. Available both before
 * and after signing.
 */
function LicenceSection({
  token,
  status,
  onStatus,
}: {
  token: string;
  status: LicenceStatus;
  onStatus: (s: LicenceStatus) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<"upload" | "inPerson" | null>(null);
  const [error, setError] = useState("");

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > LICENCE_MAX_BYTES) {
      setError("That file is over 10 MB — try a smaller photo.");
      return;
    }
    setBusy("upload");
    setError("");
    try {
      await uploadDriversLicence(token, file);
      onStatus("uploaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not upload your licence.");
    } finally {
      setBusy(null);
    }
  };

  const chooseInPerson = async () => {
    setBusy("inPerson");
    setError("");
    try {
      await setLicenceInPerson(token);
      onStatus("inPerson");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <p className="text-sm font-montserrat font-semibold text-rogue-charcoal mb-1 flex items-center gap-1.5">
        <IdCard className="h-4 w-4 text-rogue-red" /> Driver's licence
      </p>

      {status === "uploaded" ? (
        <div className="text-sm text-rogue-slate">
          <p className="inline-flex items-center gap-1.5 text-green-600 font-medium">
            <CheckCircle2 className="h-4 w-4" /> Licence received — thank you!
          </p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="block mt-1 text-xs text-rogue-slate underline hover:text-rogue-red"
            disabled={busy !== null}
          >
            {busy === "upload" ? "Uploading…" : "Upload a different copy"}
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-rogue-slate mb-3">
            We need to verify your licence before pickup. Upload a photo now, or bring it with
            you on the day.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileRef.current?.click()}
              disabled={busy !== null}
              className="rounded-full border-slate-300 font-montserrat font-semibold"
            >
              {busy === "upload" ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Uploading…
                </>
              ) : (
                <>
                  <Upload className="mr-1.5 h-4 w-4" /> Upload a photo
                </>
              )}
            </Button>
            <Button
              type="button"
              variant={status === "inPerson" ? "default" : "outline"}
              size="sm"
              onClick={chooseInPerson}
              disabled={busy !== null || status === "inPerson"}
              className={
                status === "inPerson"
                  ? "rounded-full bg-rogue-charcoal hover:bg-rogue-charcoal font-montserrat font-semibold"
                  : "rounded-full border-slate-300 font-montserrat font-semibold"
              }
            >
              {busy === "inPerson" ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Saving…
                </>
              ) : status === "inPerson" ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4" /> Bringing it in person
                </>
              ) : (
                "I'll bring it in person"
              )}
            </Button>
          </div>
          <p className="text-xs text-rogue-slate/80 mt-2">
            Photos or PDF, up to 10 MB. Stored securely — only our team can view it.
          </p>
        </>
      )}

      {error && (
        <p className="text-sm text-rogue-red mt-2" role="alert">
          {error}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept={LICENCE_ACCEPT}
        onChange={onFile}
        className="hidden"
      />
    </div>
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
          href={whatsappUrl("Hi Rogue Automotive — about my rental agreement.")}
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

export default RentalContractSign;
