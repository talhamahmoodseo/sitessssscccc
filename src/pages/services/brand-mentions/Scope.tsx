import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { brandMentions as C } from "../content/brandMentions";
import { Eyebrow, H2, Soft, rise } from "../kit";

/** Off-site only, said plainly (owner's decision, round 20): what we do and
 *  what we don't, so nobody buys this expecting on-site work. */
const Scope = () => {
  const S = C.scope;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">{S.eyebrow}</Eyebrow>
          <H2>
            {S.h2a}
            <br />
            <Soft>{S.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">
            {S.lead}
          </p>
        </motion.div>

        <motion.div
          className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-line md:grid-cols-[1.25fr_1fr]"
          {...rise(0.06)}
        >
          <div className="p-7 sm:p-9">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-verified/[0.12]">
                <Check className="h-4 w-4 text-verified" />
              </span>
              What we do
            </p>
            <ul className="mt-6 space-y-4">
              {S.do.map((d) => (
                <li
                  key={d}
                  className="border-b border-line pb-4 text-[15px] leading-relaxed text-navy-dark/80 last:border-0 last:pb-0"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-line bg-linen/60 p-7 sm:p-9 md:border-l md:border-t-0">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold text-navy-dark">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-dark/[0.08]">
                <Minus className="h-4 w-4 text-navy-dark" />
              </span>
              What we don’t
            </p>
            <ul className="mt-6 space-y-4">
              {S.dont.map((d) => (
                <li
                  key={d}
                  className="border-b border-line pb-4 text-[15px] leading-relaxed text-navy-dark/80 last:border-0 last:pb-0"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13.5px] leading-relaxed text-navy-dark/70">
              {S.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Scope;
