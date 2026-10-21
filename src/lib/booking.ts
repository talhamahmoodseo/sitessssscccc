/** Prefix an asset path with the deploy-time asset base, when one is injected. */
export const asset = (p: string) =>
  `${(typeof window !== "undefined" && (window as any).__TM_ASSET_BASE__) || ""}${p}`;

export const CALENDLY_URL = "https://calendly.com/your-handle/15min";

export const CALENDLY_EMBED =
  `${CALENDLY_URL}?hide_gdpr_banner=1&hide_landing_page_details=1` +
  `&primary_color=3b82f6&text_color=0f1117&background_color=ffffff`;

/** Any CTA anywhere can open the booking modal without prop drilling. */
export const openBooking = () => {
  window.dispatchEvent(new CustomEvent("open-booking"));
};
