/**
 * Prices, in one place (round 9, owner-approved):
 * - standard placement: $190 a link;
 * - trial placement: $200, one link, once per company (priced above the
 *   standard rate on purpose, so it can't be reused as a discount);
 * - packages of 3, 5 and 10 links at the standard rate, with an average
 *   organic traffic floor of 5,000, 10,000 and 50,000 visits a month;
 * - a custom package for anything else, quoted on a call.
 *
 * The pricing page, contact form, link building page, homepage FAQ and
 * About page all read from here. Change a price here and nowhere else, and
 * only with the owner's approval.
 */

export const PER_LINK = 190;
export const TRIAL_PRICE = 200;

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export type Plan = {
  id: "starter" | "growth" | "authority";
  name: string;
  links: number;
  /** average estimated organic visits a month across the package's sites */
  traffic: string;
  tag: string;
  blurb: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    links: 3,
    traffic: "5,000+",
    tag: "First order",
    blurb: "Three placements to see the quality for yourself, on one or two key pages.",
  },
  {
    id: "growth",
    name: "Growth",
    links: 5,
    traffic: "10,000+",
    tag: "Most chosen",
    blurb: "Steady authority for a handful of pages, on sites with real readership.",
    featured: true,
  },
  {
    id: "authority",
    name: "Authority",
    links: 10,
    traffic: "50,000+",
    tag: "Biggest push",
    blurb: "Ten placements on high-traffic sites, for keywords where competitors are strong.",
  },
];

export const planPrice = (p: Plan) => usd(p.links * PER_LINK);

/** the order buttons link to /contact?package=<key>; the form preselects it */
export const PACKAGE_LABELS: Record<string, string> = {
  trial: `Pilot: one trial link (${usd(TRIAL_PRICE)})`,
  ...Object.fromEntries(
    PLANS.map((p) => [p.id, `${p.name} (${p.links} links, ${planPrice(p)})`]),
  ),
  custom: "Custom package",
  unsure: "Not sure yet",
};

export const orderUrl = (pkg: string) => `/contact?package=${pkg}`;
