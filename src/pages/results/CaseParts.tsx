import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { asset } from "@/lib/booking";
import type { CaseStudy } from "@/lib/cases";
import { Eyebrow, H2, rise } from "../services/kit";

/**
 * Case study pieces shared outside the report page: the browser frame, the
 * client logo chip and the case cards used on the index, the homepage and
 * the service pages. The report sections live in ./CaseSections.
 */

/** A browser frame around a screenshot of the client's own site. */
export const BrowserFrame = ({
  src,
  domain,
  className = "",
}: {
  src: string;
  domain: string;
  className?: string;
}) => (
  <div
    className={`overflow-hidden rounded-2xl bg-white shadow-deep ring-1 ring-line ${className}`}
  >
    <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy-dark/15" />
      </span>
      {domain && (
        <span className="ml-2 truncate rounded-md bg-mist px-2.5 py-1 text-[11.5px] text-navy-dark/70">
          {domain}
        </span>
      )}
    </div>
    <img
      src={asset(src)}
      alt={`${domain} homepage`}
      className="block w-full"
      loading="eager"
    />
  </div>
);

/** client logo on a chip (white unless the logo needs a dark ground) */
export const LogoChip = ({
  c,
  size = "md",
}: {
  c: CaseStudy;
  size?: "sm" | "md";
}) =>
  c.logo ? (
    <span
      className={`inline-flex flex-none items-center justify-center rounded-xl ${c.chip ?? "bg-white ring-1 ring-line"} ${size === "sm" ? "h-9 px-3" : "h-11 px-3.5"}`}
    >
      <img
        src={asset(c.logo)}
        alt={`${c.client} logo`}
        loading="lazy"
        className={`w-auto ${size === "sm" ? "h-5" : "h-6"}`}
      />
    </span>
  ) : null;

/* ------------------------------ shared cards ----------------------------- */

/** A case study card, used on the index, homepage and service pages. */
export const CaseCard = ({
  c,
  large = false,
  delay = 0,
}: {
  c: CaseStudy;
  large?: boolean;
  delay?: number;
}) => (
  <motion.div {...rise(delay)} className={large ? "lg:col-span-2" : ""}>
    <Link
      to={`/case-studies/${c.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-[28px] ${c.tint} transition-transform duration-500 hover:-translate-y-1`}
    >
      <div
        className={`flex flex-1 flex-col p-6 sm:p-8 ${large ? "lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10" : ""}`}
      >
        <div className="flex flex-1 flex-col">
          <p className="flex flex-wrap items-center gap-2">
            <LogoChip c={c} size="sm" />
            <span className="rounded-full bg-white/80 px-3 py-1 text-[12px] font-semibold text-navy-dark">
              {c.client}
            </span>
            <span className="rounded-full bg-white/45 px-3 py-1 text-[12px] font-semibold text-navy-dark/85">
              {c.sector}
            </span>
          </p>
          <h3
            className={`mt-6 font-semibold leading-[1.08] tracking-[-0.035em] text-navy-dark ${
              large ? "text-[2rem] sm:text-[2.5rem]" : "text-[1.45rem] sm:text-[1.65rem]"
            }`}
          >
            {c.card}
          </h3>
          {large && (
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-navy-dark/80">
              {c.summary}
            </p>
          )}
          <p className="mt-5 flex flex-wrap gap-1.5">
            {c.services.map((s) => (
              <span
                key={s}
                className="rounded-md bg-navy-dark/[0.07] px-2 py-1 text-[11.5px] font-semibold text-navy-dark/85"
              >
                {s}
              </span>
            ))}
          </p>
          <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[14px] font-semibold text-navy-dark">
            Read the case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
        {large && c.headline.length > 0 && (
          <div className="mt-8 grid gap-2.5 lg:mt-0 lg:content-end">
            {c.headline.map((h) => (
              <div key={h.l} className="rounded-2xl bg-white/75 p-4 backdrop-blur">
                <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark">
                  {h.v}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-navy-dark/75">
                  {h.l}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  </motion.div>
);

/** A row of real client work, for service pages and the homepage. */
export const ClientWork = ({
  cases,
  eyebrow = "Client work",
  title,
  soft,
}: {
  cases: CaseStudy[];
  eyebrow?: string;
  title: string;
  soft?: string;
}) => {
  const [first, ...rest] = cases;
  if (!first) return null;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          {...rise()}
        >
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
            <H2>
              {title}
              {soft && (
                <>
                  <br />
                  <span className="accent-ink">{soft}</span>
                </>
              )}
            </H2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex flex-none items-center gap-2 text-[14.5px] font-semibold text-navy-dark"
          >
            All case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-2">
          <CaseCard c={first} large />
          {rest.slice(0, 2).map((c, i) => (
            <CaseCard key={c.slug} c={c} delay={0.06 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
};

/** small check list used on the index */
export const Checks = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((x) => (
      <li key={x} className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/85">
        <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
        {x}
      </li>
    ))}
  </ul>
);
