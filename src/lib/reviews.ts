/**
 * Public review profiles (Clutch, Trustpilot).
 *
 * DESIGN PREVIEW: the owner asked to see the badges in the design before
 * sending the real profile links. `rating` and `count` below are
 * PLACEHOLDERS and `url` is empty. Before the site goes live, replace all
 * three with exactly what each profile shows, and set `preview` to false.
 * A badge with `preview: false` and an empty url is not rendered.
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
  { platform: "Clutch", url: "", rating: "4.9", count: "18", preview: true },
  { platform: "Trustpilot", url: "", rating: "4.8", count: "42", preview: true },
];

export const liveProfiles = () =>
  REVIEW_PROFILES.filter((p) => p.rating && p.count && (p.url || p.preview));
