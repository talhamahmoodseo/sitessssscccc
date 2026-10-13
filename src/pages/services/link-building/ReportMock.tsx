import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, Share2 } from "lucide-react";
import { linkBuilding as LB } from "../content/linkBuilding";
import { CARD, Eyebrow, GlowPanel, H2, Soft, ease, rise } from "./kit";

const RP = LB.report;

const Status = ({ done }: { done: boolean }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={done ? "i" : "l"}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        done ? "bg-verified/[0.12] text-verified" : "bg-mark/40 text-navy-dark"
      }`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.25 }}
    >
      {done ? (
        <Check className="h-3 w-3" />
      ) : (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mark-deep" />
      )}
      {done ? "Indexed" : "Live"}
    </motion.span>
  </AnimatePresence>
);

/** The monthly sheet. Pending rows tick over to "Indexed" while you watch,
 *  which is what the weekly indexation check looks like from the client side. */
const Sheet = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30% 0px" });
  const [done, setDone] = useState(RP.rows.map((r) => r.done));

  useEffect(() => {
    if (!inView) return;
    const timers = RP.rows
      .map((r, n) => [r, n] as const)
      .filter(([r]) => !r.done)
      .slice(0, 2)
      .map(([, n], k) =>
        setTimeout(
          () => setDone((d) => d.map((v, j) => (j === n ? true : v))),
          1200 + k * 1100,
        ),
      );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const indexed = done.filter(Boolean).length;
  const avgDr = Math.round(
    RP.rows.reduce((s, r) => s + r.dr, 0) / RP.rows.length,
  );

  return (
    <div ref={ref} className="relative">
      <div className={`${CARD} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="text-[13px] font-semibold text-navy-dark">
            Link report · {RP.month}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-dark px-3 py-1.5 text-[11px] font-semibold text-white">
            <Share2 className="h-3 w-3" />
            Share
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-mist/70 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/70">
                <th className="px-5 py-2.5 font-semibold">Site</th>
                <th className="px-3 py-2.5 font-semibold">DR</th>
                <th className="hidden px-3 py-2.5 font-semibold sm:table-cell">
                  Anchor
                </th>
                <th className="hidden px-3 py-2.5 font-semibold md:table-cell">
                  Target
                </th>
                <th className="px-5 py-2.5 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {RP.rows.map((r, n) => (
                <tr key={r.site} className="border-b border-line last:border-0">
                  <td className="px-5 py-3 font-mono text-[12px] text-navy-dark">
                    {r.site}
                  </td>
                  <td className="px-3 py-3 text-[12.5px] font-semibold tabular-nums text-navy-dark">
                    {r.dr}
                  </td>
                  <td className="hidden max-w-[150px] truncate px-3 py-3 text-[12.5px] text-navy-dark/80 sm:table-cell">
                    {r.anchor}
                  </td>
                  <td className="hidden px-3 py-3 font-mono text-[11.5px] text-navy-dark/70 md:table-cell">
                    {r.to}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Status done={done[n]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <motion.div
        className={`${CARD} relative mt-4 w-max max-w-full px-5 py-4 sm:-ml-6`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
          {RP.month} at a glance
        </p>
        <div className="mt-2.5 flex gap-6">
          {[
            [RP.rows.length, "links live"],
            [indexed, "indexed"],
            [avgDr, "avg DR"],
          ].map(([v, k]) => (
            <div key={k as string}>
              <span className="block text-[1.5rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
                {v}
              </span>
              <span className="mt-1 block text-[11.5px] text-navy-dark/70">
                {k}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ReportMock = () => (
  <section className="bg-white py-24 lg:py-36">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
      <motion.div {...rise()}>
        <Eyebrow className="mb-4">{RP.eyebrow}</Eyebrow>
        <H2>
          {RP.h2a}
          <br />
          <Soft>{RP.h2b}</Soft>
        </H2>
        <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">
          {RP.lead}
        </p>
        <ul className="mt-8 space-y-3.5">
          {RP.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-verified/[0.12]">
                <Check className="h-3 w-3 text-verified" />
              </span>
              <span className="text-[15px] text-navy-dark/80">{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div {...rise(0.1)}>
        <GlowPanel tone="warm" className="p-4 sm:p-12">
          <Sheet />
        </GlowPanel>
      </motion.div>
    </div>
  </section>
);

export default ReportMock;
