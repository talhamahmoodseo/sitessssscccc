import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, UserPlus } from "lucide-react";
import { haroQuotes as C } from "../content/haroQuotes";
import { CARD, Eyebrow, H2, Soft, ease, rise } from "../kit";

/**
 * The expertise profile as a real working document, with a tab per person.
 * Switching people makes the point that more experts means more requests you
 * can answer.
 */
const Profile = () => {
  const P = C.profile;
  const [i, setI] = useState(0);
  const person = P.people[i];
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">
            {P.lead}
          </p>
          <p className="mt-6 flex gap-3 rounded-2xl bg-butter/60 px-5 py-4 text-[15px] leading-snug text-navy-dark">
            <UserPlus className="mt-0.5 h-4 w-4 flex-none" />
            {P.note}
          </p>
        </motion.div>

        <motion.div className={`${CARD} overflow-hidden`} {...rise(0.1)}>
          <div className="flex items-center gap-2 border-b border-line bg-mist px-5 py-3">
            <FileText className="h-4 w-4 text-navy-dark/70" />
            <span className="text-[12.5px] font-semibold text-navy-dark">
              Expertise profile
            </span>
          </div>
          <div
            className="flex gap-1 overflow-x-auto border-b border-line px-3 pt-3"
            role="tablist"
            aria-label="Experts"
          >
            {P.people.map((p, n) => (
              <button
                key={p.k}
                role="tab"
                aria-selected={i === n}
                onClick={() => setI(n)}
                className={`relative whitespace-nowrap px-4 pb-3 pt-1.5 text-[13.5px] font-semibold transition-colors ${
                  i === n
                    ? "text-navy-dark"
                    : "text-navy-dark/70 hover:text-navy-dark"
                }`}
              >
                {p.k}
                {i === n && (
                  <motion.span
                    layoutId="eq-person"
                    className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-navy-dark"
                    transition={{ duration: 0.35, ease }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={person.k}
              className="p-6 sm:p-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blush text-[14px] font-bold text-navy-dark">
                  {person.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold text-navy-dark">
                    {person.name}
                  </span>
                  <span className="block text-[12.5px] text-navy-dark/70">
                    {person.k}, YourBrand
                  </span>
                </span>
              </div>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {person.rows.map((r) => (
                  <div
                    key={r.k}
                    className="grid gap-1 py-3.5 sm:grid-cols-[170px_1fr] sm:gap-4"
                  >
                    <dt className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/70">
                      {r.k}
                    </dt>
                    <dd
                      className={`text-[14.5px] leading-snug ${
                        r.k === "Never pitch for"
                          ? "text-gap"
                          : "text-navy-dark/85"
                      }`}
                    >
                      {r.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;
