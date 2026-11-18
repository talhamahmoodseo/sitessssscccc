/**
 * Public review profiles (Clutch, Trustpilot).
 *
 * HIDDEN FOR LAUNCH (round 10): Editorial HQ has no Clutch or Trustpilot
 * profile yet, so the ratings below are the design-preview placeholders and
 * `preview` is false, which hides every badge (a badge needs a url or
 * `preview: true` to render). When a real profile has reviews, paste its URL,
 * rating and count exactly as the profile shows them, and the badge appears
 * on the homepage review wall and the pricing hero.
 */

export type ReviewProfile = {
  platform: "Clutch" | "Trustpilot";
  url: string;
  rating: string;
  count: string;
  /** true while the numbers are placeholders */
  preview: boolean;
};

export const REVIEW_PROFILES: ReviewProfile[] = [
  { platform: "Clutch", url: "", rating: "4.9", count: "18", preview: false },
  { platform: "Trustpilot", url: "", rating: "4.8", count: "42", preview: false },
];

export const liveProfiles = () =>
  REVIEW_PROFILES.filter((p) => p.rating && p.count && (p.url || p.preview));
