import { caseBySlug, type CaseStudy } from "./cases";

/**
 * The homepage hero's client stories (round 13). One card per client: who
 * said it, a verbatim line from their approved quote, their own homepage,
 * three facts and two pieces of proof.
 *
 * Nothing here is new data:
 * - people, roles, photos and quotes come from `cases.ts` (approved by the
 *   clients on 27 Oct 2026). `quote` must be an exact part of the approved
 *   text; a warning is logged in development if it ever drifts;
 * - facts are the case study's own headline figures, picked by index;
 * - the proof chips copy text word for word from the evidence screenshots
 *   in public/images/cases/ (SmileTutor's Google result and AI Overview,
 *   Ocuco's OpenCart placement) or from the case files (CryptoDesk's
 *   placements and press, CapCut's tool pages, Defender's buyer searches,
 *   the link mix of each campaign).
 */

export type Chip =
  | { kind: "serp"; query: string; name: string; url: string; title: string; note: string }
  | { kind: "ai"; query: string; before: string; hl: string; after: string; note: string }
  | { kind: "list"; title: string; items: { t: string; d?: string }[]; more?: string }
  | { kind: "press"; outlet: string; title: string; note: string }
  | { kind: "excerpt"; site: string; before: string; hl: string; after: string }
  | { kind: "flow"; title: string; steps: string[] }
  | { kind: "mix"; title: string; items: { k: string; n: number }[] };

export type Tint = "butter" | "lilac" | "mint" | "sky" | "blush";

export type Story = {
  slug: string;
  client: string;
  /** short industry label for the tabs */
  field: string;
  tint: Tint;
  who: string;
  role: string;
  photo?: string;
  logo?: string;
  quote: string;
  media: { src: string; domain: string; alt: string; pos: string };
  /** the result pinned on the screenshot */
  pin: string;
  pinAt?: "top" | "bottom";
  facts: { v: string; l: string }[];
  left: Chip;
  right: Chip;
  /** what the small tiles flying into the card say: link types or real sites */
  tiles: string[];
};

type Draft = Omit<Story, "client" | "who" | "role" | "photo" | "logo" | "facts"> & {
  /** which of the case's headline figures to show, in order */
  facts: number[];
};

const mix = (c: CaseStudy) => c.links?.mix ?? [];

const build = (d: Draft): Story => {
  const c = caseBySlug(d.slug);
  if (!c?.testimonial) throw new Error(`stories: no case or quote for ${d.slug}`);
  const t = c.testimonial;
  if (import.meta.env.DEV && !t.text.includes(d.quote)) {
    console.warn(`stories: the ${d.slug} quote no longer matches the approved text`);
  }
  return {
    ...d,
    client: c.client,
    who: t.who,
    role: t.role,
    photo: t.photo,
    logo: c.logo,
    facts: d.facts.map((i) => c.headline[i]).filter(Boolean),
  };
};

const smiletutor = caseBySlug("smiletutor")!;
const cryptodesk = caseBySlug("cryptodesk")!;
const ocuco = caseBySlug("ocuco")!;
const capcut = caseBySlug("capcut")!;
const defender = caseBySlug("defender")!;

export const STORIES: Story[] = [
  build({
    slug: "smiletutor",
    field: "Tuition",
    tint: "butter",
    quote:
      "Every site was relevant to parents and education, and we could see exactly where each link went. Today we're number one for “tuition” and “online tuition”.",
    media: {
      src: smiletutor.site!,
      domain: "smiletutor.sg",
      alt: "SmileTutor's homepage",
      pos: "50% 0%",
    },
    pin: "#1 on Google for “tuition”",
    facts: [1, 2, 3],
    left: {
      kind: "serp",
      query: "tuition",
      name: "SmileTutor",
      url: "https://smiletutor.sg",
      title: "SmileTutor: #1 Trusted Home Tuition Agency in Singapore",
      note: "Google Singapore, first organic result",
    },
    right: {
      kind: "ai",
      query: "online tuition",
      before: "You can arrange 1-on-1 virtual lessons through ",
      hl: "SmileTutor Singapore",
      after: ", which connects students with part-time, full-time, and school teachers…",
      note: "Named first in Google's AI Overview",
    },
    tiles: mix(smiletutor).map((m) => m.k.replace(/s$/, "")),
  }),
  build({
    slug: "cryptodesk",
    field: "Crypto",
    tint: "lilac",
    quote:
      "Editorial HQ found real publications, got our CEO into Cointelegraph, and in five months we were first on Google for the searches that brought customers to our office.",
    media: {
      src: "/images/cases/cryptodesk-serp-exchange.webp",
      domain: "google.com",
      alt: "Google results for “crypto exchange in dubai” with Crypto Desk first",
      pos: "50% 100%",
    },
    pin: "#1 for “crypto exchange in dubai”",
    pinAt: "top",
    facts: [1, 2, 3],
    left: {
      kind: "list",
      title: "A few of the placements",
      items: (cryptodesk.links?.samples ?? []).slice(0, 3).map((s) => ({
        t: s.site,
        d: `DR ${s.dr} · ${s.type}`,
      })),
    },
    right: {
      kind: "press",
      outlet: "Cointelegraph Magazine",
      title: cryptodesk.links?.features?.[0]?.t ?? "",
      note: "Its CEO, quoted as the expert",
    },
    tiles: ["marketwatch.com", "khaleejtimes.com", "Cointelegraph"],
  }),
  build({
    slug: "ocuco",
    field: "Eyecare software",
    tint: "mint",
    quote:
      "Editorial HQ found placements that made sense for independent practices, wrote content that respected the subject, and got Acuitas 3 mentioned in the right conversations.",
    media: {
      src: ocuco.site!,
      domain: "ocuco.com",
      alt: "Ocuco's Acuitas 3 page",
      pos: "0% 50%",
    },
    pin: "Acuitas 3, named where opticians read",
    facts: [0, 1, 2],
    left: {
      kind: "excerpt",
      site: "opencart.com · blog",
      before: "A system like ",
      hl: "Acuitas 3",
      after: ", for example, offers real-time access across clinics with centralised control.",
    },
    right: {
      kind: "flow",
      title: "Where a reader goes",
      steps: (ocuco.flow ?? []).map((f) =>
        f.t.replace(/^The (\w)/, (_, ch: string) => ch.toUpperCase()),
      ),
    },
    tiles: ["opencart.com", ...mix(ocuco).slice(0, 2).map((m) => m.k.replace(/s$/, ""))],
  }),
  build({
    slug: "capcut",
    field: "Video editing",
    tint: "sky",
    quote:
      "Editorial HQ delivered guest posts, niche edits and mentions that fit naturally, with clear reporting on every placement.",
    media: {
      src: capcut.site!,
      domain: "capcut.com",
      alt: "CapCut's homepage",
      pos: "50% 30%",
    },
    pin: "Links for six AI tool pages",
    facts: [0, 1, 2],
    left: {
      kind: "list",
      title: "Tool pages we built links to",
      items: (capcut.links?.pages ?? []).slice(0, 4).map((p) => ({ t: p.page })),
      more: `+${Math.max(0, (capcut.links?.pages?.length ?? 0) - 4)} more`,
    },
    right: { kind: "mix", title: "The mix", items: mix(capcut) },
    tiles: mix(capcut).map((m) => m.k.replace(/s$/, "")),
  }),
  build({
    slug: "defender",
    field: "Security cameras",
    tint: "blush",
    quote:
      "You helped us jumpstart our product launch and create awareness by securing listicle article reviews of our product.",
    media: {
      src: defender.site!,
      domain: "defendercameras.com",
      alt: "Defender's homepage",
      pos: "0% 50%",
    },
    pin: "On the buyer's guides for launch",
    facts: [0, 1, 2],
    left: {
      kind: "list",
      title: "Buyer searches covered",
      items: (defender.links?.pages ?? []).slice(0, 4).map((p) => ({ t: `“${p.page}”` })),
      more: `+${Math.max(0, (defender.links?.pages?.length ?? 0) - 4)} more`,
    },
    right: { kind: "mix", title: "The mix", items: mix(defender) },
    tiles: mix(defender).map((m) => m.k.replace(/s$/, "")),
  }),
];
