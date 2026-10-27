import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Annotation, QuoteTile, StatTile } from "@/components/brand";
import { PROOF_TILES } from "@/lib/clients";

/**
 * Results and testimonials in one bento.
 *
 * Twelve-column grid: a quote takes half a row, a stat takes a quarter, and
 * the halves alternate side each row. That alternation is what stops a proof
 * wall from reading as a spreadsheet: the eye never settles into a column.
 *
 * Every figure comes from a case study (lib/cases.ts), and every tile links
 * to it.
 */

/* a quote takes half a row, a stat takes a quarter. On phones two stats sit
   side by side and a quote takes the full width. */
const span = (kind: "stat" | "quote") =>
  kind === "quote" ? "col-span-2 lg:col-span-6" : "col-span-1 lg:col-span-3";

const ProofGrid = () => (
  <div className="relative bg-mist py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative mb-14">
        <Annotation className="-top-6 left-0 hidden w-[160px] xl:block">
          see the numbers
        </Annotation>

        <h2 className="mx-auto max-w-2xl text-center text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
          Results our clients
          <br />
          <span className="accent-ink">take to their boards.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
        {PROOF_TILES.map((t, i) => (
          <Link
            key={t.kind === "stat" ? `${t.client}-${t.value}` : t.name}
            to={t.slug ? `/case-studies/${t.slug}` : "/case-studies"}
            className={`block transition-transform duration-500 hover:-translate-y-1 ${span(t.kind)}`}
            aria-label={`${t.client} case study`}
          >
            {t.kind === "stat" ? (
              <StatTile
                value={t.value}
                label={t.label}
                client={t.client}
                logo={t.logo}
                logoH={t.logoH}
                tile={t.tile}
                delay={(i % 3) * 0.07}
              />
            ) : (
              <QuoteTile
                quote={t.quote}
                name={t.name}
                role={t.role}
                client={t.client}
                logo={t.logo}
                logoH={t.logoH}
                avatar={t.avatar}
                delay={(i % 3) * 0.07}
              />
            )}
          </Link>
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
