import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  Annotation,
  QuoteTile,
  SectionTitle,
  StatTile,
} from "@/components/brand";
import { PROOF_TILES } from "@/lib/clients";

/**
 * Results and testimonials in one bento grid rather than two separate
 * sections. Numbers and voices interleave, so proof reads as a body of
 * evidence instead of a wall of stats followed by a wall of quotes.
 */
const ProofGrid = () => (
  <div className="relative bg-mist py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <Annotation className="-top-4 left-0 hidden w-[150px] xl:block">
          real brands, real numbers
        </Annotation>

        <SectionTitle align="center" eyebrow="Proof">
          Real results from real clients
        </SectionTitle>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROOF_TILES.map((t, i) =>
          t.kind === "stat" ? (
            <StatTile
              key={`${t.client}-${t.value}`}
              value={t.value}
              label={t.label}
              client={t.client}
              tile={t.tile}
              delay={(i % 3) * 0.07}
            />
          ) : (
            <div key={t.quote.slice(0, 28)} className="sm:col-span-2">
              <QuoteTile
                quote={t.quote}
                name={t.name}
                role={t.role}
                client={t.client}
                delay={(i % 3) * 0.07}
              />
            </div>
          ),
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-[14px] font-semibold text-navy-dark underline decoration-navy-dark/25 underline-offset-4 transition-colors hover:decoration-navy-dark"
        >
          Open the full case files
          <ArrowRight className="h-4 w-4" />
        </Link>
        <span className="text-[12.5px] text-navy-dark/70">
          Figures indicative pending client sign-off.
        </span>
      </div>
    </div>
  </div>
);

export default ProofGrid;
