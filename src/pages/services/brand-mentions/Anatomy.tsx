import { motion } from "motion/react";
import { X } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { Eyebrow, H2, Soft, ease, rise } from "../kit";

/* each annotated part gets its own mark: a sky underline, a lilac highlight,
   a mint underline */
const MARK: Record<number, string> = {
  1: "decoration-sky",
  2: "",
  3: "decoration-mint",
};

const Num = ({ n }: { n: number }) => (
  <sup className="ml-0.5 inline-flex h-5 w-5 -translate-y-1 items-center justify-center rounded-full bg-navy-dark text-[10px] font-bold text-white">
    {n}
  </sup>
);

/**
 * What a mention that works actually reads like, annotated, followed by
 * three easy wins that don't count. One sentence carries the whole idea.
 */
const Anatomy = () => {
  const A = C.anatomy;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{A.eyebrow}</Eyebrow>
          <H2>
            {A.h2a}
            <br />
            <Soft>{A.h2b}</Soft>
          </H2>
        </motion.div>

        <motion.div
          className="mt-12 rounded-[28px] bg-mist p-7 ring-1 ring-line sm:p-12"
          {...rise(0.05)}
        >
          <p className="max-w-5xl text-[1.55rem] font-medium leading-[1.5] tracking-[-0.02em] text-navy-dark sm:text-[2.1rem] sm:leading-[1.45]">
            “
            {A.parts.map((p, n) =>
              p.tag === 2 ? (
                <span key={n}>
                  <motion.span
                    className="rounded-md px-1.5 font-semibold"
                    initial={{ backgroundColor: "rgba(209,204,248,0)" }}
                    whileInView={{ backgroundColor: "rgba(209,204,248,1)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {p.t}
                  </motion.span>
                  <Num n={2} />
                </span>
              ) : p.tag ? (
                <span key={n}>
                  <span
                    className={`underline decoration-[5px] underline-offset-[7px] ${MARK[p.tag]}`}
                  >
                    {p.t}
                  </span>
                  <Num n={p.tag} />
                </span>
              ) : (
                <span key={n}>{p.t}</span>
              ),
            )}
            ”
          </p>

          <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {A.notes.map((note, n) => (
              <motion.div
                key={note.n}
                className="flex gap-3.5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.2 + n * 0.12, ease }}
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-navy-dark text-[12px] font-bold text-white">
                  {note.n}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold text-navy-dark">
                    {note.t}
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-navy-dark/75">
                    {note.d}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-14">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75"
            {...rise()}
          >
            {A.skip.t}
          </motion.p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {A.skip.items.map((s, n) => (
              <motion.div
                key={s.k}
                className="rounded-2xl p-6 ring-1 ring-line"
                {...rise(n * 0.07)}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gap/[0.12]">
                    <X className="h-3.5 w-3.5 text-gap" />
                  </span>
                  <span className="rounded-full bg-linen px-2.5 py-1 text-[11px] font-semibold text-navy-dark/80">
                    {s.m}
                  </span>
                </div>
                <h3 className="mt-4 text-[17px] font-semibold text-navy-dark">
                  {s.k}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy-dark/75">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anatomy;
