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
  {
    kind: "stat" as const,
    value: "+212%",
    label: "organic clicks in 7 months",
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
      "First vendor that showed us every domain before placing anything. The approval sheet alone made the internal sign-off trivial.",
    name: "Daniel Reyes",
    role: "Head of Growth",
    client: "CapCut",
    avatar: "/images/avatar-1.jpg",
  },
  {
    kind: "quote" as const,
    quote:
      "They rejected a site we would have accepted. That is when we knew the vetting was real and not a sales line.",
    name: "Amira Khan",
    role: "Marketing Director",
    client: "Ocuco",
    avatar: "/images/avatar-2.jpg",
  },
  {
    kind: "stat" as const,
    value: "14/14",
    label: "placements indexed",
    client: "Ocuco",
    tile: "lilac" as const,
  },
  {
    kind: "stat" as const,
    value: "3/3",
    label: "AI engines citing the brand",
    client: "CapCut",
    tile: "blush" as const,
  },
  {
    kind: "stat" as const,
    value: "DR 74",
    label: "top placement secured",
    client: "Khaleej Times",
    tile: "sky" as const,
  },
  {
    kind: "quote" as const,
    quote:
      "Rankings moved, but the bigger shift was being named in AI answers when buyers ask for recommendations.",
    name: "Tom Whitfield",
    role: "SEO Lead",
    client: "Ocuco",
    avatar: "/images/avatar-3.jpg",
  },
];
