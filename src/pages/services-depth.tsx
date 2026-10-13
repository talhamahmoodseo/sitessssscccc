import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";

/**
 * Services hub depth sections.
 *
 * The hub's job is routing, not selling — the four service pages do that. So
 * it gets a decision matrix (situation down the side, service across the top)
 * and the standards that hold on all four, which keeps each service page from
 * repeating the same four promises.
 *
 * The matrix is this page's signature visual; no other page uses a grid read
 * in two directions.
 */

/* ----------------------------- shared standard ----------------------------- */

const STANDARD = [
  {
    t: "Every site checked by hand",
    d: "Whatever we are placing — a guest post, a mention, an expert quote — the publication gets the same check first: real traffic, the keywords behind it, the trend and its outbound links.",
  },
  {
    t: "Indexation is the definition of done",
    d: "A placement that Google never indexes does not count and is not billed as a win. We chase the publisher, and replace it free if it stalls past 60 days.",
  },
  {
    t: "We say no a lot",
    d: "Roughly one in five sites we find fails the check. On one engagement that was 31 domains reviewed to place on 14.",
  },
  {
    t: "One sheet, no dashboard login",
    d: "Live document with every domain, anchor, target URL and indexation status. Yours to keep, and forwardable to a client without editing.",
  },
];

export const SharedStandard = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          True of all four
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Four different services.
          <br />
          <span className="text-navy-dark/65">The same four rules.</span>
        </h2>
      </motion.div>

      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {STANDARD.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
          >
            <div className="mb-2.5 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-dark text-[11px] font-bold tabular-nums text-white">
                {i + 1}
              </span>
              <h3 className="text-[16.5px] font-semibold leading-snug text-navy-dark">
                {s.t}
              </h3>
            </div>
            <p className="text-[14px] leading-relaxed text-navy-dark/75">
              {s.d}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

/* ------------------------------- the matrix ------------------------------- */

const COLS = ["Link Building", "Digital PR", "Brand Mentions", "Expert Quotes"];

/** 2 = where to start, 1 = useful alongside, 0 = not the tool for this. */
const ROWS: { s: string; note: string; v: number[] }[] = [
  {
    s: "Pages ranking 5–20 that will not move",
    note: "Authority is the missing input. Everything else is secondary until that is fixed.",
    v: [2, 1, 0, 1],
  },
  {
    s: "Competitors get named in AI answers, you do not",
    note: "Engines cite a narrow set of sources. You need to be described on the ones they already read.",
    v: [1, 1, 2, 1],
  },
  {
    s: "A new brand nobody has written about yet",
    note: "There is no footprint to build on, so the first job is being covered at all.",
    v: [1, 2, 1, 2],
  },
  {
    s: "Credibility needed before a raise or a sale",
    note: "Named coverage and attributed quotes are what a buyer or an investor can actually check.",
    v: [0, 2, 1, 2],
  },
  {
    s: "Entering a market where you are unknown",
    note: "Local publications, local relationships, longer lead times, far less competition.",
    v: [2, 2, 1, 0],
  },
  {
    s: "An agency that needs fulfilment under its own brand",
    note: "White-label across all four, with reports you can forward without editing.",
    v: [2, 1, 1, 1],
  },
];

const Cell = ({ v }: { v: number }) => {
  if (v === 2)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-navy-dark">
        <Check className="h-3 w-3" aria-hidden="true" />
        Start
      </span>
    );
  if (v === 1)
    return (
      <span className="text-[11.5px] font-semibold text-white/70">
        Alongside
      </span>
    );
  return (
    <Minus className="mx-auto h-3.5 w-3.5 text-white/40" aria-hidden="true" />
  );
};

export const Matrix = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Which one do you need
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          Find your situation,
          <br />
          <span className="text-white/70">read across</span>
        </h2>
        <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
          Most engagements run two of the four. If your row has no{" "}
          <span className="font-semibold text-white">Start</span>, say so on the
          call — it usually means the answer is content work first.
        </p>
      </motion.div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr>
              <th className="w-[38%] border-b border-white/15 pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Your situation
              </th>
              {COLS.map((c) => (
                <th
                  key={c}
                  className="border-b border-white/15 px-3 pb-4 text-center text-[12.5px] font-semibold text-white"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => (
              <motion.tr
                key={r.s}
                className="border-b border-white/10 last:border-0"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <th scope="row" className="py-6 pr-6 align-top font-normal">
                  <span className="block text-[15.5px] font-semibold leading-snug text-white">
                    {r.s}
                  </span>
                  <span className="mt-1.5 block text-[12.5px] leading-relaxed text-white/70">
                    {r.note}
                  </span>
                </th>
                {r.v.map((v, j) => (
                  <td key={COLS[j]} className="px-3 py-6 text-center align-top">
                    <Cell v={v} />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
