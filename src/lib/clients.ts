/**
 * Real clients, used across the site for social proof.
 *
 * STATUS: names are real, figures are indicative placeholders pending sign-off.
 * Replace `value` / `label` / quotes with confirmed numbers before launch, and
 * drop real SVG logos into `public/logos/` to swap the wordmarks out.
 */

export type Client = {
  name: string;
  /** shown under the wordmark in the logo belt */
  sector?: string;
};

export const CLIENTS: Client[] = [
  { name: "CapCut", sector: "Creative software" },
  { name: "Ocuco", sector: "Healthcare tech" },
  { name: "Khaleej Times", sector: "Media" },
  { name: "Arabian Business", sector: "Media" },
  { name: "Gulf Business", sector: "Media" },
  { name: "Tech Daily", sector: "Media" },
];

/** Bento grid for the proof section: numbers and quotes, interleaved. */
export const PROOF_TILES = [
  /* Row 1 — stat, stat, quote */
  {
    kind: "stat" as const,
    value: "+212%",
    label: "growth in organic clicks, in 7 months",
    client: "CapCut",
    tile: "butter" as const,
  },
  {
    kind: "stat" as const,
    value: "DR 65",
    label: "up from DR 35",
    client: "Ocuco",
    tile: "mint" as const,
  },
  {
    kind: "quote" as const,
    quote:
      "They took the whole thing off our plate: finding sites, writing, placing. The monthly report goes straight to our CEO, unedited.",
    name: "Daniel Reyes",
    role: "Head of Growth",
    client: "CapCut",
    avatar: "/images/avatar-1.jpg",
  },

  /* Row 2 — quote, stat, stat */
  {
    kind: "quote" as const,
    quote:
      "Our DR nearly doubled, but the number our board cared about was demo requests from organic. That one finally moved too.",
    name: "Amira Khan",
    role: "Marketing Director",
    client: "Ocuco",
    avatar: "/images/avatar-3.jpg",
  },
  {
    kind: "stat" as const,
    value: "14/14",
    label: "placements live and indexed by Google",
    client: "Ocuco",
    tile: "lilac" as const,
  },
  {
    kind: "stat" as const,
    value: "3/4",
    label: "major AI assistants now recommend the brand",
    client: "CapCut",
    tile: "blush" as const,
  },

  /* Row 3 — stat, stat, quote */
  {
    kind: "stat" as const,
    value: "DR 74",
    label: "feature landed in Gulf business press",
    client: "Khaleej Times",
    tile: "sky" as const,
  },
  {
    kind: "stat" as const,
    value: "1 in 5",
    label: "sites turned down before they reached the client",
    client: "Ocuco",
    tile: "butter" as const,
  },
  {
    kind: "quote" as const,
    quote:
      "Rankings moved, but the bigger shift was being named in AI answers when buyers ask for a recommendation.",
    name: "Tom Whitfield",
    role: "SEO Lead",
    client: "Ocuco",
    avatar: "/images/avatar-2.jpg",
  },
];
