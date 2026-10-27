import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import {
  GuaranteeBand,
  GuaranteeChips,
  GuaranteeTerms,
} from "@/components/Guarantees";
import { ReviewBadges } from "@/sections/Testimonials";
import { DarkGlow, Eyebrow, H2, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pricing. Round 8: one standard price and a trial, nothing to decode.
 * Standard placement $150 on orders of 3+; trial placement $170, once per
 * company (priced above standard on purpose, so it can't be reused as a
 * discount). Larger campaigns and DR 70+ are quoted. Change prices here and
 * in content/linkBuilding.ts, sections/FAQ.tsx and pages/Contact.tsx.
 */

const order = (pkg: string) => `/contact?package=${pkg}`;

const STANDARD = {
  price: "$150",
  min: "Orders of 3 placements or more",
  includes: [
    "An editorial link on a relevant DR 40+ site",
    "The article written by our team",
    "A dofollow link in the body of the article",
    "Every site checked by hand before we use it",
    "A report with the live URL, ready to share",
  ],
};

const TRIAL = {
  price: "$170",
  min: "One placement, once per company",
  includes: [
    "The same placement, content and checks",
    "No minimum order",
    "A simple way to see our work first",
  ],
};

const EVERY = [
  {
    t: "Chosen for you",
    d: "Sites picked for your niche and your target page, not pulled from a list.",
  },
  {
    t: "Written properly",
    d: "Articles written for the site's readers, to the publisher's standard.",
  },
  {
    t: "In the right place",
    d: "Your link sits in the body of the article, where readers and Google pay attention.",
  },
  {
    t: "Checked before it's used",
    d: "Relevance, rankings, health and editorial standards, reviewed by a person.",
  },
  {
    t: "Reported clearly",
    d: "The live URL, the site's DR on the day it went live, and indexing status.",
  },
  {
    t: "Yours to approve",
    d: "Want to see the sites before anything is published? Just ask when you order.",
  },
];

const STEPS = [
  {
    n: "1",
    t: "Send your order",
    d: "Your target pages and any anchor text preferences. Not sure where to start? Tell us your site and we'll suggest a plan.",
  },
  {
    n: "2",
    t: "We find, write and publish",
    d: "We choose a relevant site, write the article and get it published with your link inside.",
  },
  {
    n: "3",
    t: "You get the report",
    d: "Every live link, with its details. Unbranded, if you're an agency passing it to a client.",
  },
];

const OTHER = [
  {
    to: "/services/haro-links",
    t: "HARO & Expert Quotes",
    d: "Your experts quoted in stories that are already being written.",
    from: "$997",
    per: "/mo",
  },
  {
    to: "/services/brand-mentions",
    t: "Brand Mentions & AI visibility",
    d: "Mentions on the sources AI answers trust, tracked every month.",
    from: "$2,497",
    per: "/mo",
  },
  {
    to: "/services/digital-pr",
    t: "Digital PR",
    d: "Story-led campaigns on business and trade publications.",
    from: "$2,497",
    per: "/campaign",
  },
];

const FAQS = [
  {
    q: "Why does the trial cost more than a standard placement?",
    a: "The trial is for new clients who want to see our work before placing a larger order. It's the same placement, on a one-off order with no minimum, and it's priced slightly higher on purpose so it can't be used as a repeat discount. One trial per company. After that, every placement is $150 on orders of three or more.",
  },
  {
    q: "What do I get for $150?",
    a: "An editorial link on a relevant DR 40+ site, the article written by our team, the site checked by hand before we use it, and a report with the live URL. If a link is ever removed, we replace it free.",
  },
  {
    q: "Can I approve the sites first?",
    a: "Yes. Tell us when you order and we'll send the shortlist before anything is published. If you'd rather not, we choose the sites for you.",
  },
  {
    q: "How long does it take?",
    a: "Most links go live within two to four weeks of your order.",
  },
  {
    q: "Do you guarantee rankings?",
    a: "No, and be careful with anyone who does. Nobody controls Google. We guarantee the work itself: placements that match what you ordered, or your money back, and a free replacement if a link is ever removed.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes, as well as brands. Everything can be delivered white label, with unbranded reports and no contact with your clients. If you need 20 or more links a month, ask us about volume pricing.",
  },
  {
    q: "Are there niches you don't take?",
    a: "We don't take adult, gambling or similar niches. If you're unsure about yours, ask before you order.",
  },
];

/* ---------------------------------- page ---------------------------------- */

const Pricing = () => (
  <PageLayout>
    <Seo
      title="Link Building Pricing"
      description="Editorial link placements for $150 each on orders of three or more, or a single $170 trial placement. Every order has a 100% money-back guarantee and free link replacement."
    />

    <section className="relative overflow-hidden bg-navy-dark pb-24 pt-32 lg:pb-28 lg:pt-40">
      <DarkGlow className="-left-40 top-10 h-[520px] w-[760px] opacity-55" />
      <DarkGlow className="-right-56 bottom-0 h-[460px] w-[700px] opacity-45" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.p>
          <h1 className="mt-5">
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.8rem] lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              One clear price.
            </motion.span>
            <motion.span
              className="block pb-[0.06em] text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.2rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <span className="accent-ink-dark">No guesswork.</span>
            </motion.span>
          </h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Every placement is an editorial link on a relevant site we've
            checked by hand, written and published for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GuaranteeChips dark className="mt-8 justify-center" />
            <ReviewBadges dark className="mt-3 justify-center" />
          </motion.div>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[1.25fr_1fr]">
          {/* standard */}
          <motion.div
            className="flex flex-col rounded-[28px] bg-white p-8 text-navy-dark sm:p-10"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
              Standard placement
            </p>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-[4rem] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                {STANDARD.price}
              </span>
              <span className="text-[15px] text-navy-dark/70">per placement</span>
            </p>
            <p className="mt-3 text-[14.5px] font-semibold text-navy-dark/80">
              {STANDARD.min}
            </p>
            <ul className="mt-7 space-y-3 border-t border-line pt-7">
              {STANDARD.includes.map((x) => (
                <li
                  key={x}
                  className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/85"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-verified" />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              to={order("standard")}
              className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-navy-dark px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black"
              style={{ marginTop: "2.25rem" }}
            >
              Place an order
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* trial */}
          <motion.div
            className="flex flex-col rounded-[28px] bg-white/[0.05] p-8 text-white ring-1 ring-white/[0.14] sm:p-10"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.33, ease }}
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/70">
              Trial placement
            </p>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-[4rem] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                {TRIAL.price}
              </span>
              <span className="text-[15px] text-white/70">one link</span>
            </p>
            <p className="mt-3 text-[14.5px] font-semibold text-white/85">
              {TRIAL.min}
            </p>
            <ul className="mt-7 space-y-3 border-t border-white/10 pt-7">
              {TRIAL.includes.map((x) => (
                <li
                  key={x}
                  className="flex gap-2.5 text-[15px] leading-snug text-white/85"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-mark" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-white/[0.06] p-4 text-[13.5px] leading-relaxed text-white/75">
              The trial is priced a little above a standard placement on
              purpose. It's there so new clients can judge our work, not as a
              repeat discount.
            </p>
            <Link
              to={order("trial")}
              className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-4 text-[15px] font-semibold text-white ring-1 ring-white/20 transition-colors hover:bg-white/15"
              style={{ marginTop: "2.25rem" }}
            >
              Order a trial placement
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        <motion.p
          className="mt-8 text-center text-[14px] text-white/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Need 20+ links a month, DR 70+ publications or a campaign across
          several clients?{" "}
          <Link
            to={order("campaign")}
            className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            We'll quote it.
          </Link>
        </motion.p>
      </div>
    </section>

    {/* what every placement includes */}
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Every placement</Eyebrow>
          <H2>
            What you're paying for
            <br />
            <span className="accent-ink">is the care, not the link.</span>
          </H2>
        </motion.div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVERY.map((x, i) => (
            <motion.li
              key={x.t}
              className="rounded-3xl bg-mist p-7 ring-1 ring-line"
              {...rise(i * 0.05)}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-verified/[0.12]">
                <Check className="h-4 w-4 text-verified" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                {x.t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                {x.d}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>

    {/* how ordering works */}
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">How ordering works</Eyebrow>
          <H2>
            Three steps,
            <br />
            <span className="accent-ink">most of them ours.</span>
          </H2>
        </motion.div>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              className="rounded-3xl bg-white p-7 ring-1 ring-line"
              {...rise(i * 0.06)}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-dark text-[15px] font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.02em] text-navy-dark">
                {s.t}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
            </motion.li>
          ))}
        </ol>
        <p className="mt-6 text-[14px] text-navy-dark/70">
          Most links go live within two to four weeks.
        </p>
      </div>
    </section>

    <GuaranteeBand terms={false} />
    <GuaranteeTerms />

    {/* other services */}
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Beyond link building</Eyebrow>
          <H2>
            PR and AI visibility
            <br />
            <span className="accent-ink">run as campaigns.</span>
          </H2>
        </motion.div>
        <motion.ul
          className="overflow-hidden rounded-3xl bg-white ring-1 ring-line"
          {...rise(0.05)}
        >
          {OTHER.map((s, i) => (
            <li key={s.t} className={i ? "border-t border-line" : ""}>
              <Link
                to={s.to}
                className="group grid gap-3 px-6 py-6 transition-colors hover:bg-mist sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8 sm:px-8"
              >
                <span>
                  <span className="block text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                    {s.t}
                  </span>
                  <span className="mt-1 block text-[14.5px] text-navy-dark/75">
                    {s.d}
                  </span>
                </span>
                <span className="flex items-center gap-4 sm:justify-end">
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-[12.5px] text-navy-dark/70">from</span>
                    <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums">
                      {s.from}
                    </span>
                    <span className="text-[12.5px] text-navy-dark/70">{s.per}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-navy-dark/40 transition-colors group-hover:text-navy-dark" />
                </span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>

    <ServiceFaq
      eyebrow="FAQ"
      h2a="Questions"
      h2b="about pricing."
      side="Not sure what you need? Send us your site and we'll tell you honestly."
      faqs={FAQS}
      bg="bg-white"
    />
  </PageLayout>
);

export default Pricing;
