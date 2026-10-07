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

/** Programme-level facts, stated once, on hairlines rather than in boxes. */
const SCORECARD: [string, string][] = [
  ["40+", "brands served"],
  ["DR 40–75", "typical placement range"],
  ["4", "answer surfaces tracked monthly"],
];

const ProofGrid = () => (
  <div className="relative bg-white pb-20 lg:pb-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* the scorecard rides up over the dark band above, so the two surfaces
          interlock instead of simply butting together */}
      <div className="relative -mt-14 rounded-[2rem] bg-white px-6 py-10 shadow-deep sm:px-10 lg:-mt-20 lg:px-14 lg:py-12">
        <Annotation className="left-6 top-9 hidden w-[150px] xl:block">
          see the numbers
        </Annotation>

        <h2 className="text-balance mx-auto max-w-2xl text-center text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
          Real clients.
          <span className="text-navy-dark/65">Numbers they signed off on.</span>
        </h2>

        <dl className="mx-auto mt-10 grid max-w-3xl gap-y-7 border-t border-line pt-8 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {SCORECARD.map(([v, k], i) => (
            <div
              key={k}
              className={`text-center ${i > 0 ? "sm:px-4" : "sm:pr-4"}`}
            >
              <dt className="text-[2rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums sm:text-[2.3rem]">
                {v}
              </dt>
              <dd className="mx-auto mt-2 max-w-[12rem] text-[12.5px] leading-snug text-navy-dark/70">
                {k}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
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
      </div>
    </div>
  </div>
);

export default ProofGrid;
