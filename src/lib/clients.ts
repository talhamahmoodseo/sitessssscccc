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
