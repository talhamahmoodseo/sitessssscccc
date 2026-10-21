import { motion } from "motion/react";
import { Check, Mail, X } from "lucide-react";
import { haroQuotes as C } from "../content/haroQuotes";
import { CARD, Eyebrow, H2, Soft, ease, rise } from "../kit";

/**
 * The craft, side by side: the reply a journalist deletes against the one
 * they print, with the reasons pinned to each. Big quote marks are this
 * page's signature.
 */
const TwoReplies = () => {
  const T = C.twoReplies;
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mx-auto max-w-3xl text-center" {...rise()}>
          <Eyebrow className="mb-4">{T.eyebrow}</Eyebrow>
          <H2>
            {T.h2a}
            <br />
            <Soft>{T.h2b}</Soft>
          </H2>
        </motion.div>

        {/* the request */}
        <motion.div
          className={`${CARD} mx-auto mt-12 flex max-w-3xl items-start gap-4 p-5 sm:p-6`}
          {...rise(0.05)}
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-linen">
            <Mail className="h-4 w-4 text-navy-dark" />
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
              The request
            </span>
            <span className="mt-1 block text-[17px] font-semibold leading-snug text-navy-dark sm:text-[18px]">
              {T.request}
            </span>
          </span>
        </motion.div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {/* the usual reply */}
          <motion.div
            className="flex flex-col rounded-3xl bg-linen/80 p-7 ring-1 ring-line sm:p-9"
            {...rise(0.1)}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
                {T.generic.label}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gap/[0.1] px-2.5 py-1 text-[11.5px] font-bold text-gap">
                <X className="h-3 w-3" />
                {T.generic.verdict}
              </span>
            </div>
            <p className="mt-6 text-[16px] leading-relaxed text-navy-dark/70">
              {T.generic.text}
            </p>
            <ul className="mt-auto space-y-2.5 border-t border-navy-dark/10 pt-6">
              {T.generic.notes.map((n, k) => (
                <motion.li
                  key={n}
                  className="flex items-center gap-2.5 text-[14.5px] text-navy-dark/85"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.3 + k * 0.12, ease }}
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-gap/[0.12]">
                    <X className="h-3 w-3 text-gap" />
                  </span>
                  {n}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ours */}
          <motion.div
            className="relative flex flex-col overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-navy-dark/[0.08] shadow-[0_40px_80px_-50px_rgba(14,14,14,0.5)] sm:p-9"
            {...rise(0.16)}
          >
            <div className="relative flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
                {T.ours.label}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-verified/[0.12] px-2.5 py-1 text-[11.5px] font-bold text-verified">
                <Check className="h-3 w-3" />
                {T.ours.verdict}
              </span>
            </div>
            <span
              className="mt-5 block h-12 font-news text-[6rem] leading-[1] text-blush"
              aria-hidden="true"
            >
              “
            </span>
            <blockquote className="relative text-[19px] font-medium leading-[1.5] tracking-[-0.01em] text-navy-dark sm:text-[21px]">
              {T.ours.text}
            </blockquote>
            <p className="relative mt-3 text-[13.5px] font-semibold text-navy-dark/75">
              — {T.ours.who}
            </p>
            <ul className="relative mt-auto space-y-2.5 border-t border-line pt-6">
              {T.ours.notes.map((n, k) => (
                <motion.li
                  key={n}
                  className="flex items-center gap-2.5 text-[14.5px] text-navy-dark/85"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.5 + k * 0.12, ease }}
                >
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-verified/[0.12]">
                    <Check className="h-3 w-3 text-verified" />
                  </span>
                  {n}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TwoReplies;
