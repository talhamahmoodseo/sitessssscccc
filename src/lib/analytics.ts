/**
 * Google Analytics 4, with Consent Mode v2.
 *
 * The Measurement ID comes from WordPress (Settings > General > GA4
 * Measurement ID), injected as window.__GA4_ID__ by the theme, so the owner
 * can switch analytics on or off without a new build. No ID, no tracking.
 *
 * Consent: visitors whose time zone is in the UK or EU (and the rest of
 * Europe) get the cookie banner and nothing loads until they accept. Everyone
 * else is measured with analytics storage granted. Ad storage is always
 * denied: the site runs no ads.
 *
 * Events the owner marks as key events in GA4:
 *   generate_lead  contact form sent, or a call booked in Calendly
 *   book_call      the booking window opened
 */

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    __GA4_ID__?: string;
    __PRERENDER__?: boolean;
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const CHOICE_KEY = "ehq-analytics-consent";
const SOURCE_KEY = "ehq-first-visit";

const gaId = () => {
  const id = (typeof window !== "undefined" && window.__GA4_ID__) || "";
  return /^G-[A-Z0-9]{4,20}$/.test(id) ? id : "";
};

const store = {
  get(key: string, session = false) {
    try {
      return (session ? sessionStorage : localStorage).getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string, session = false) {
    try {
      (session ? sessionStorage : localStorage).setItem(key, value);
    } catch {
      /* private mode or blocked storage: fine, nothing is remembered */
    }
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

/** UK, EU and the rest of Europe, judged by the browser's time zone. */
export const needsConsent = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return (
      tz.startsWith("Europe/") ||
      ["Atlantic/Canary", "Atlantic/Madeira", "Atlantic/Azores", "Atlantic/Reykjavik", "Atlantic/Faroe"].includes(tz)
    );
  } catch {
    return true;
  }
};

export type Choice = "granted" | "denied";
export const savedChoice = (): Choice | null => {
  const v = store.get(CHOICE_KEY);
  return v === "granted" || v === "denied" ? v : null;
};

/** Whether the banner should ask this visitor. */
export const shouldAsk = () =>
  !!gaId() && !window.__PRERENDER__ && needsConsent() && !savedChoice();

let loaded = false;

const load = () => {
  const id = gaId();
  if (!id || loaded || window.__PRERENDER__) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", id);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
};

/** Called once on start: loads GA4 when it's allowed for this visitor. */
export const initAnalytics = () => {
  if (typeof window === "undefined" || window.__PRERENDER__) return;
  rememberFirstVisit();
  if (!gaId()) return;
  const choice = savedChoice();
  if (choice === "granted" || (choice === null && !needsConsent())) load();
};

export const setChoice = (choice: Choice) => {
  store.set(CHOICE_KEY, choice);
  if (choice === "granted") load();
  else if (loaded) window.gtag?.("consent", "update", { analytics_storage: "denied" });
};

/** Forget the choice so the banner asks again (the privacy page offers this). */
export const resetChoice = () => {
  store.remove(CHOICE_KEY);
  window.dispatchEvent(new CustomEvent("analytics-ask"));
};

export const track = (event: string, params: Record<string, string> = {}) => {
  if (loaded) window.gtag?.("event", event, params);
};

/**
 * Where this visit came from (UTM tags, else the referring site), kept for the
 * session so the contact form can say how the enquirer found us.
 */
export const rememberFirstVisit = () => {
  if (typeof window === "undefined" || store.get(SOURCE_KEY, true)) return;
  const q = new URLSearchParams(window.location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .map((k) => q.get(k))
    .filter(Boolean)
    .join(" / ");
  let ref = "";
  try {
    const r = document.referrer ? new URL(document.referrer) : null;
    if (r && r.host !== window.location.host) ref = r.host;
  } catch {
    /* ignore */
  }
  store.set(SOURCE_KEY, utm || ref || "direct", true);
};

export const firstVisit = () => store.get(SOURCE_KEY, true) || "";
