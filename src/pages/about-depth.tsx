import { motion } from "motion/react";

/**
 * The publisher network, as data.
 *
 * This file used to also export a refusal list ("five things we will not do")
 * and a founder letter about bad link reports. Both were removed: they
 * positioned the agency against the industry rather than describing its work,
 * which is the opposite of how an established agency introduces itself.
 */

const BANDS = [
  { band: "DR 30–39", n: 96 },
  { band: "DR 40–49", n: 241 },
  { band: "DR 50–59", n: 267 },
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
    <div className="bg-navy-dark py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            The network
          </p>
          <h2 className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.6rem]">
            814 publications,
            <br />
            <span className="text-white/70">and where they sit.</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
            Built one editor at a time since 2024, across five markets. The
            middle of the range is deliberately the deepest part: DR 70+ earns
            the headlines, but DR 45–60 with genuine readership on your subject
            is what moves a category page.
          </p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              By authority band
            </p>
            <div className="flex h-56 items-end gap-3 sm:gap-5">
              {BANDS.map((b, i) => (
                <div key={b.band} className="flex flex-1 flex-col items-center">
                  <span className="mb-2.5 text-[13px] font-bold tabular-nums text-white">
                    {b.n}
                  </span>
                  <motion.div
                    className="w-full rounded-t-md bg-white/25"
                    initial={{ height: 0 }}
                    whileInView={{ height: (b.n / peak) * 100 + "%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.08,
                      ease: "easeOut",
                    }}
                  />
                  <span className="mt-3 text-center text-[10.5px] font-semibold uppercase tracking-[0.08em] text-white/70">
                    {b.band}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              By market
            </p>
            <dl>
              {REGIONS.map((r, i) => (
                <motion.div
                  key={r.k}
                  className={`flex items-baseline justify-between gap-6 py-3.5 ${
                    i ? "border-t border-white/10" : ""
                  }`}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <dt className="text-[14px] text-white/70">{r.k}</dt>
                  <dd className="shrink-0 text-[15px] font-semibold tabular-nums text-white">
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
