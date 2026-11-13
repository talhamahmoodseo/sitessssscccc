import { PER_LINK, usd } from "./pricing";

/**
 * The free link building pilot (round 14, the owner's brief of 31 Oct 2026,
 * after uSERP's /pilot): three editorial links, free, for established
 * businesses that qualify, by application, a few a month.
 *
 * The bar at the top of every page (components/PilotBar.tsx) and the page
 * at /pilot read from here. The qualifying thresholds and the monthly limit
 * are the owner's call: change them here and both update.
 */
export const PILOT = {
  links: 3,
  /** brands accepted a month */
  spots: 3,
  /** what the same three placements cost at the standard rate */
  value: usd(3 * PER_LINK),
  revenue: "$5M",
  employees: 25,
  /** roughly, from the call to all three links live */
  days: 30,
};
