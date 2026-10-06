import { motion } from "motion/react";
import { asset } from "@/lib/booking";

/**
 * About-page depth sections.
 *
 * Identity: the founder-led dossier. A refusal list, the publisher network
 * broken down as a DR-band column chart (vertical — Pricing's allocation bar
 * is the only horizontal one on the site), and a signed letter to close.
 *
 * No standalone testimonial band here: the case files carry the proof, and
 * bolting a client quote onto an About page is exactly the kind of forced
 * section we stripped out everywhere else.
 */

/* ------------------------------ refusals ------------------------------ */

const REFUSALS = [
  {
    t: "We cap the client list at twelve",
    d: "Four people can run twelve engagements properly. We have turned work down at fourteen and will again — the alternative is hiring account managers to sit between you and the person doing the work.",
  },
  {
    t: "We do not resell marketplace inventory",
    d: "Every publication in the network is a relationship we built and maintain. If we cannot reach an editor directly, the site is not in the network.",
  },
  {
    t: "We will not guarantee a ranking",
    d: "Nobody can, and the ones who do are either lying or planning to point a hundred cheap links at you and leave. We give ranges we can defend and report the truth monthly.",
  },
  {
    t: "We do not take gambling, adult or payday",
    d: "Less a moral position than a practical one — our publishers will not touch those sectors, and placing them anyway would cost us the network.",
  },
  {
    t: "We will tell you when links are the wrong spend",
    d: "Roughly one enquiry in five gets an audit saying fix the pages first. We lose the sale and keep the reputation, which has turned out to be the better trade.",
  },
];

export const Refusals = () => (
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
          The constraints
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Five things we will not do,
          <br />
          <span className="text-navy-dark/65">whatever the budget</span>
        </h2>
      </motion.div>

      <dl>
        {REFUSALS.map((r, i) => (
          <motion.div
            key={r.t}
            className="grid gap-x-10 gap-y-2 border-t border-line py-7 lg:grid-cols-[0.7fr_1.3fr]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <dt className="text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {r.t}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-navy-dark/75">
              {r.d}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

/* ------------------------------- network ------------------------------- */

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
          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
            814 publications,
            <br />
            <span className="text-white/70">and where they sit</span>
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-white/70">
            Built one editor at a time since 2024. The middle of the range is
            deliberately the deepest part — DR 70+ gets the headlines, but DR
            45–60 with real traffic is what actually moves a category page.
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

/* ------------------------------- letter ------------------------------- */

const LETTER = [
  "I started this because I got tired of being the person who had to explain a link report I could not defend. I was freelancing, buying from two marketplaces, and about a third of what I placed sat on sites that had not had a real reader in years. The numbers in the sheet looked fine. The work was not.",
  "So we stopped buying and started building. That took most of 2024, and it is the only reason the approval sheet exists: once you know every publication personally, showing the client the list before you place anything stops being brave and becomes obvious.",
  "The part I did not expect is how often the honest answer is no. One enquiry in five gets an audit telling them links are not their problem yet. One domain in five gets rejected after we have already done the work of finding it. That is an expensive way to run an agency, and it is the whole product.",
  "If you are weighing us up, read a case file first. They include the months where nothing moved, because those are the months that tell you whether somebody is going to be straight with you.",
];

export const Letter = () => (
  <div className="bg-linen py-24 lg:py-32">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          From the founder
        </p>
        <h2 className="mb-9 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Why we turn down
          <br />
          <span className="text-navy-dark/65">a fifth of the work</span>
        </h2>
      </motion.div>

      {LETTER.map((para, i) => (
        <motion.p
          key={i}
          className="mb-5 text-[16.5px] leading-[1.65] text-navy-dark/80 last:mb-0"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          {para}
        </motion.p>
      ))}

      <motion.div
        className="mt-10 flex items-center gap-4 border-t border-navy-dark/15 pt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={asset("/images/talha-avatar.jpg")}
          alt="Talha Mahmood"
          className="h-14 w-14 rounded-full object-cover ring-4 ring-white"
        />
        <div>
          <span className="block font-hand text-[26px] leading-none text-navy-dark">
            Talha Mahmood
          </span>
          <span className="mt-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
            Founder & Strategy
          </span>
        </div>
      </motion.div>
    </div>
  </div>
);
