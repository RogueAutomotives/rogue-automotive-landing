/** Talks to the backend contact endpoint (shared SMTP -> business inbox). */
import { API_BASE } from "./api";

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  /** Originating context, e.g. "contact" or "waitlist:sales". */
  source?: string;
  /** Honeypot — leave empty; bots that fill it are dropped server-side. */
  website?: string;
}

/** Submits a contact/waitlist enquiry. Throws with a user-friendly message on failure. */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection and try again.");
  }

  if (res.ok) return;

  if (res.status === 429) {
    throw new Error("You've sent a few messages already — please wait a minute and try again.");
  }

  // Surface the API's validation message when present.
  let message = "Something went wrong sending your message. Please try again or reach us on WhatsApp.";
  try {
    const data = await res.json();
    if (data?.message) message = data.message;
    else if (Array.isArray(data?.errors) && data.errors.length) message = data.errors[0];
  } catch {
    /* keep default */
  }
  throw new Error(message);
}
