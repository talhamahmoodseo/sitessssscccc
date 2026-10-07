import { motion } from "motion/react";

/**
 * The publisher network, as data.
 *
 * This file used to also export a refusal list ("five things we will not do")
 * and a founder letter about bad link reports. Both were removed: they
 * positioned the agency by comparison rather than describing its own work,
 * which is the opposite of how an established agency introduces itself.
 *
 * Surface: `clay`, the page's deepest light tone, so the data section carries
 * real weight between two lighter neighbours. Three depth devices live here —
 * an overlapping white feature card pulled up over the section boundary, an
 * oversized display numeral as the card's structure, and a pastel inset panel
 * behind the distribution chart. The market table uses hairline rules rather
 * than a box.
 *
 * `pt-px` is deliberate: it stops the card's negative top margin collapsing
 * through the section and dragging the clay ground up with it.
 */

const BANDS = [
  { band: "DR 30–39", n: 96 },
  { band: "DR 40–49", n: 241, deep: true },
  { band: "DR 50–59", n: 267, deep: true },
  { band: "DR 60–69", n: 148 },
  { band: "DR 70+", n: 62 },
];

const REGIONS = [
  { k: "United States & Canada", v: "41%" },
  { k: "United Kingdom & Ireland", v: "23%" },
  { k: "Gulf & wider Middle East", v: "18%" },
  { k: "Europe, non-English", v: "11%" },
  { k: "Asia-Pacific", v: "7%" },
];

export const Network = () => {
  const peak = Math.max(...BANDS.map((b) => b.n));
  return (
    <div className="bg-clay pb-24 pt-px lg:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* feature card, pulled up so the two surfaces interlock */}
        <motion.div
          className="relative z-10 -mt-16 grid gap-8 rounded-[1.6rem] bg-white p-8 shadow-deep lg:-mt-24 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14 lg:p-12"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              The network
            </p>
            <p className="text-[4.6rem] font-semibold leading-[0.82] tracking-[-0.05em] tabular-nums text-navy-dark sm:text-[6rem]">
              814
            </p>
            <p className="mt-3 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
              Publications · five markets
            </p>
          </div>

          <div className="lg:border-l lg:border-line lg:pl-14">
            <h2 className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
              Built one editor at a time.
              <br />
              <span className="text-navy-dark/65">Mapped by what it moves.</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
              Five markets, added one relationship at a time since 2024. The
              middle of the range is deliberately the deepest part: DR 70+ earns
              the headlines, but DR 45–60 with genuine readership on your
              subject is what moves a category page.
            </p>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* pastel inset panel behind the distribution */}
          <motion.div
            className="rounded-3xl border border-line bg-sky/40 p-7 shadow-lift lg:p-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
              By authority band
            </p>
            <div className="flex h-52 items-end gap-3 sm:gap-5">
              {BANDS.map((b, i) => (
                <div key={b.band} className="flex flex-1 flex-col items-center">
                  <span className="mb-2.5 text-[13px] font-bold tabular-nums text-navy-dark">
                    {b.n}
                  </span>
                  <motion.div
                    className={`w-full rounded-t-md ${
                      b.deep ? "bg-navy-dark" : "bg-navy-dark/45"
                    }`}
                    initial={{ height: 0 }}
                    whileInView={{ height: (b.n / peak) * 100 + "%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.08,
                      ease: "easeOut",
                    }}
                  />
                  <span className="mt-3 text-center text-[10.5px] font-semibold uppercase tracking-[0.08em] text-navy-dark/70">
                    {b.band}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-navy-dark/15 pt-5 text-[13px] leading-relaxed text-navy-dark/75">
              The two solid bands carry most of what we place. They are where
              relevance and reach overlap for the pages clients actually want
              moved.
            </p>
          </motion.div>

          {/* hairline rules instead of a box */}
          <div>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
              By market
            </p>
            <dl>
              {REGIONS.map((r, i) => (
                <motion.div
                  key={r.k}
                  className={`flex items-baseline justify-between gap-6 py-3.5 ${
                    i ? "border-t border-navy-dark/15" : ""
                  }`}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <dt className="text-[14px] text-navy-dark/75">{r.k}</dt>
                  <dd className="shrink-0 text-[15px] font-semibold tabular-nums text-navy-dark">
                    {r.v}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
