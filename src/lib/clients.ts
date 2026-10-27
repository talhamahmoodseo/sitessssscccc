/**
 * Real clients from the owner's portfolio. Logos are the clients' own,
 * shown in one neutral tone. Each one has a case study in ./cases.ts.
 */

export type Client = {
  name: string;
  logo: string;
  /** rendered height in px, so wordmarks read at the same visual size */
  h: number;
  slug: string;
};

export const CLIENTS: Client[] = [
  { name: "CapCut", logo: "/images/clients/capcut.svg", h: 20, slug: "capcut" },
  { name: "SmileTutor", logo: "/images/clients/smiletutor.svg", h: 34, slug: "smiletutor" },
  { name: "Ocuco", logo: "/images/clients/ocuco.png", h: 20, slug: "ocuco" },
  { name: "Defender", logo: "/images/clients/defender.png", h: 30, slug: "defender" },
];
