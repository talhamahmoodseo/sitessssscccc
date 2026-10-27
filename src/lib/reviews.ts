/**
 * Public review profiles. Fill in `url`, `rating` and `count` exactly as the
 * profile shows them; a platform with any field empty is not rendered, so
 * nothing appears until the owner sends the real links.
 */

export type ReviewProfile = {
  platform: "Clutch" | "Trustpilot";
  url: string;
  rating: string;
  count: string;
};

export const REVIEW_PROFILES: ReviewProfile[] = [
  { platform: "Clutch", url: "", rating: "", count: "" },
  { platform: "Trustpilot", url: "", rating: "", count: "" },
];

export const liveProfiles = () =>
  REVIEW_PROFILES.filter((p) => p.url && p.rating && p.count);
