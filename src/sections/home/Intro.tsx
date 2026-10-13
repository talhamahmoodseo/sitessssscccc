import { motion } from "motion/react";
import { home } from "./content";
import { ease, rise } from "./kit";

/** Who already trusts us: client wordmarks in a hairline grid, each with the
 *  work we did for them, then the studio's numbers. */
export const Logos = () => {
  const L = home.logos;
  return (
    <section className="bg-mist pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-center text-[15px] font-medium text-navy-dark/75"
          {...rise()}
        >
          {L.label}
        </motion.p>
        <motion.ul
          className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl ring-1 ring-line sm:grid-cols-3 lg:grid-cols-6"
          {...rise(0.05)}
        >
          {L.items.map((c) => (
            <li
              key={c.name}
              className="-mb-px -mr-px flex flex-col items-center justify-center gap-1.5 border-b border-r border-line bg-white/50 px-4 py-8"
            >
              <span className="text-[19px] font-semibold tracking-[-0.035em] text-navy-dark">
                {c.name}
              </span>
              <span className="text-[12px] text-navy-dark/70">{c.did}</span>
            </li>
          ))}
        </motion.ul>

        <dl className="mt-16 grid grid-cols-2 gap-y-10 lg:mt-20 lg:grid-cols-4">
          {L.facts.map((f, n) => (
            <motion.div
              key={f.k}
              className={`flex flex-col-reverse px-2 text-center ${n % 2 ? "border-l border-line" : ""} ${
                n === 2 ? "lg:border-l" : ""
              }`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: n * 0.08, ease }}
            >
              <dt className="mx-auto mt-3 max-w-[12rem] text-[13px] leading-snug text-navy-dark/70">
                {f.k}
              </dt>
              <dd className="text-[2.6rem] font-medium leading-none tracking-[-0.05em] text-navy-dark tabular-nums sm:text-[3.2rem]">
                {f.v}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};
