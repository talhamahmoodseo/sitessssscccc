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
  { name: "CryptoDesk", logo: "/images/clients/cryptodesk-mark.png", h: 24, slug: "cryptodesk" },
  { name: "Defender", logo: "/images/clients/defender.png", h: 30, slug: "defender" },
];

const byName = (name: string) => CLIENTS.find((c) => c.name === name);

type Tile = "butter" | "mint" | "lilac" | "blush" | "sky";

export type ProofTile =
  | {
      kind: "stat";
      value: string;
      label: string;
      client: string;
      logo?: string;
      logoH?: number;
      tile: Tile;
      slug: string;
    }
  | {
      kind: "quote";
      quote: string;
      name: string;
      role: string;
      client: string;
      logo?: string;
      logoH?: number;
      avatar?: string;
      slug: string;
    };

const stat = (
  client: string,
  value: string,
  label: string,
  tile: Tile,
): ProofTile => ({
  kind: "stat",
  value,
  label,
  client,
  logo: byName(client)?.logo,
  logoH: byName(client)?.h,
  tile,
  slug: byName(client)?.slug ?? "",
});

/**
 * Homepage bento: real numbers and client quotes, interleaved. The figures
 * match the case studies in cases.ts (SmileTutor from Semrush, CryptoDesk
 * from the owner's report); change them together. Quotes are short cuts of
 * the drafts in TESTIMONIAL-DRAFTS.md.
 */
export const PROOF_TILES: ProofTile[] = [
  /* row 1: stat, stat, quote */
  stat("SmileTutor", "#1", "on Google for “tuition” in Singapore, 33,100 searches a month", "butter"),
  stat("CryptoDesk", "5 months", "from the first link to number one in Dubai", "lilac"),
  {
    kind: "quote",
    quote:
      "Most good sites won't touch crypto. They found real publications, got our CEO into Cointelegraph, and in five months we were first on Google.",
    name: "Asad Abaas",
    role: "SEO Manager, CryptoDesk",
    client: "CryptoDesk",
    logo: byName("CryptoDesk")?.logo,
    logoH: 20,
    avatar: "/images/cases/person-asad-abaas.webp",
    slug: "cryptodesk",
  },

  /* row 2: quote, stat, stat */
  {
    kind: "quote",
    quote:
      "Most agencies don't know where our buyers read. Editorial HQ found placements that made sense for independent practices and got Acuitas 3 into the right conversations.",
    name: "Kieran Fallon",
    role: "Head of Marketing, Ocuco",
    client: "Ocuco",
    logo: byName("Ocuco")?.logo,
    logoH: 18,
    avatar: "/images/cases/person-kieran-fallon.webp",
    slug: "ocuco",
  },
  stat("SmileTutor", "+169%", "organic traffic, October 2024 to October 2026", "mint"),
  stat("SmileTutor", "617", "keywords in Google's top three, up from 213", "blush"),

  /* row 3: stat, stat, quote */
  stat("Defender", "18", "buyer's-guide placements for a new camera launch", "sky"),
  stat("CryptoDesk", "100+", "links, plus two features in Cointelegraph Magazine", "butter"),
  {
    kind: "quote",
    quote:
      "I hand them my clients' link building and don't have to think about it. The reports go out under my brand, and nothing has ever come back to bite me in an audit.",
    name: "Tiffany Lei",
    role: "Agency owner",
    client: "Agency partner",
    avatar: "/images/cases/person-tiffany-lei.webp",
    slug: "agency-partner",
  },
];
