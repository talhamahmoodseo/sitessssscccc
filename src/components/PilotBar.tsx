import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { PILOT } from "@/lib/pilot";

/**
 * The thin announcement bar at the top of every page (round 14), after
 * uSERP's: the free three-link pilot, linking to /pilot. Navigation.tsx
 * places it above the menu, folds it away on scroll and leaves it off the
 * pilot page itself. Closing it hides it for the rest of the visit.
 */
export const BAR_H = "h-10";

const PilotBar = ({ onClose }: { onClose: () => void }) => (
  <div className={`relative flex ${BAR_H} items-center justify-center bg-navy-dark px-10 text-white`}>
    <Link
      to="/pilot?ref=bar"
      className="group flex min-w-0 items-center gap-2.5 text-[12.5px] sm:text-[13.5px]"
    >
      <span className="flex-none rounded-full bg-mark px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-navy-dark">
        New
      </span>
      <span className="truncate">
        <span className="font-semibold">Get {PILOT.links} editorial backlinks free.</span>
        <span className="hidden text-white/75 sm:inline"> No catch, no contract.</span>
      </span>
      <span className="hidden flex-none items-center gap-1 rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-navy-dark transition-colors group-hover:bg-mark sm:inline-flex">
        See if your business qualifies
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
      <ArrowRight className="h-3.5 w-3.5 flex-none sm:hidden" aria-hidden="true" />
    </Link>
    <button
      type="button"
      onClick={onClose}
      className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
      aria-label="Close the announcement"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
);

export default PilotBar;
