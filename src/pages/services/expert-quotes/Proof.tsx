import { motion } from "motion/react";
import { haroQuotes as C } from "../content/haroQuotes";
import { Eyebrow, H2, Soft, rise } from "../kit";

/**
 * Every request from the engagement as one square: skipped, answered, or
 * published. The grid makes the ratio the headline: most were skipped, and
 * that's why the published ones got through.
 */
const Proof = () => {
  const P = C.proof;
  const total = P.skipped + P.answered;
  // published first, then the rest of the answered, then skipped
  const kind = (n: number) => (n < P.published ? 2 : n < P.answered ? 1 : 0);

  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[13px] font-semibold text-navy-dark/75">
            {P.client}
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line">
            {P.facts.map((f) => (
              <div key={f.k} className="bg-white px-4 py-3.5">
                <dt className="text-[11.5px] text-navy-dark/70">{f.k}</dt>
                <dd className="mt-1 text-[24px] font-semibold tracking-[-0.03em] text-navy-dark">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 rounded-2xl bg-white px-5 py-4 text-[14.5px] leading-snug text-navy-dark/80 ring-1 ring-line">
            {P.before}
          </p>
          <figure className="mt-7 border-l-2 border-blush pl-5">
            <blockquote className="text-[17px] font-medium leading-snug text-navy-dark">
              “{P.quote.text}”
            </blockquote>
            <figcaption className="mt-2 text-[13px] text-navy-dark/70">
              {P.quote.who}
            </figcaption>
          </figure>
        </motion.div>

        <motion.div
          className="rounded-[28px] bg-white p-6 ring-1 ring-line sm:p-9"
          {...rise(0.1)}
        >
          <p className="text-[15px] font-semibold text-navy-dark">
            {total}+ requests looked at. Each square is one.
          </p>
          <div
            className="mt-6 grid grid-cols-[repeat(18,minmax(0,1fr))] gap-[5px] sm:grid-cols-[repeat(22,minmax(0,1fr))]"
            aria-hidden="true"
          >
            {Array.from({ length: total }).map((_, n) => {
              const k = kind(n);
              return (
                <motion.span
                  key={n}
                  className={`aspect-square rounded-[3px] ${
                    k === 2
                      ? "bg-navy-dark"
                      : k === 1
                        ? "bg-blush ring-1 ring-navy-dark/20"
                        : "bg-linen"
                  }`}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.25,
                    delay: k ? 0.6 + n * 0.03 : (n % 22) * 0.012,
                  }}
                />
              );
            })}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { c: "bg-navy-dark", k: "Published", v: P.published },
              {
                c: "bg-blush ring-1 ring-navy-dark/20",
                k: "Answered",
                v: P.answered,
              },
              {
                c: "bg-linen ring-1 ring-line",
                k: "Skipped",
                v: `${P.skipped}+`,
              },
            ].map((l) => (
              <li key={l.k} className="flex items-center gap-2.5">
                <span className={`h-4 w-4 flex-none rounded-[3px] ${l.c}`} />
                <span className="text-[13.5px] text-navy-dark/80">
                  <span className="font-semibold text-navy-dark">{l.v}</span>{" "}
                  {l.k.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-[15px] leading-relaxed text-navy-dark/80">
            {P.takeaway}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;
