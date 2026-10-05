import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Annotation, QuoteTile, StatTile } from "@/components/brand";
import { PROOF_TILES } from "@/lib/clients";

/**
 * Results and testimonials in one bento.
 *
 * Twelve-column grid: a quote takes half a row, a stat takes a quarter, and
 * the halves alternate side each row. That alternation is what stops a proof
 * wall from reading as a spreadsheet — the eye never settles into a column.
 *
 * Numbers and voices interleave deliberately, so the section reads as a body
 * of evidence rather than a stat block followed by a quote block.
 */

/* a quote takes half a row, a stat takes a quarter */
const span = (kind: "stat" | "quote") =>
  kind === "quote" ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3";

const ProofGrid = () => (
  <div className="relative bg-mist py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative mb-14">
        <Annotation className="-top-6 left-0 hidden w-[160px] xl:block">
          see the numbers
        </Annotation>

        <h2 className="mx-auto max-w-2xl text-center text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
          Real results from real clients
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {PROOF_TILES.map((t, i) => (
          <div
            key={
              t.kind === "stat"
                ? `${t.client}-${t.value}`
                : t.quote.slice(0, 24)
            }
            className={span(t.kind)}
          >
            {t.kind === "stat" ? (
              <StatTile
                value={t.value}
                label={t.label}
                client={t.client}
                tile={t.tile}
                delay={(i % 3) * 0.07}
              />
            ) : (
              <QuoteTile
                quote={t.quote}
                name={t.name}
                role={t.role}
                client={t.client}
                avatar={t.avatar}
                delay={(i % 3) * 0.07}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 rounded-xl bg-navy-dark px-6 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
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
