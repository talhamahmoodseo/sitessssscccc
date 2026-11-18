import { track } from "./analytics";

/** Prefix an asset path with the deploy-time asset base, when one is injected. */
export const asset = (p: string) =>
  `${(typeof window !== "undefined" && (window as any).__TM_ASSET_BASE__) || ""}${p}`;

export const CALENDLY_URL = "https://calendly.com/talhaseoexpert/30min";

export const CALENDLY_EMBED =
  `${CALENDLY_URL}?hide_gdpr_banner=1&hide_landing_page_details=1` +
  `&primary_color=3b82f6&text_color=0f1117&background_color=ffffff`;

/** Any CTA anywhere can open the booking modal without prop drilling. */
export const openBooking = () => {
  track("book_call", { page: window.location.pathname });
  window.dispatchEvent(new CustomEvent("open-booking"));
};

/**
 * The quick forms (homepage hero and close, brand mentions check) only ask
 * for a website, so they hand over to /contact with it filled in. The
 * visitor adds a name and email there and the enquiry is sent for real.
 */
export const contactLink = (fill: Record<string, string>) => {
  const q = new URLSearchParams();
  Object.entries(fill).forEach(([k, v]) => v.trim() && q.set(k, v.trim()));
  const qs = q.toString();
  return `/contact${qs ? `?${qs}` : ""}`;
};
