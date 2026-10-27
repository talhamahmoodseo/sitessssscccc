import { motion } from "motion/react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { CASES } from "@/lib/cases";
import { Eyebrow, H2, ease, rise } from "./services/kit";
import { CaseCard, Checks } from "./results/CaseParts";

/**
 * /case-studies: real client work. One featured project with full data,
 * the rest as cards, then how we report results. Round 8 replaced the
 * sample cases with the owner's portfolio.
 */

const WE_SHOW = [
  "Rankings on the searches the client actually cares about",
  "Traffic from people who didn't already know the brand",
  "The placements themselves, so you can open them",
  "Screenshots from the client's own tools, with dates",
];
const WE_SKIP = [
  "Link counts as a headline",
  "Domain Rating on its own",
  "Numbers we can't show you the source for",
];

const CaseStudies = () => {
  const [first, ...rest] = CASES;
  return (
    <PageLayout>
      <Seo
        title="Case Studies: Link Building & Brand Mention Results"
        description="Real client work from Editorial HQ: how we helped SmileTutor reach number one for “tuition” in Singapore, launched Defender's new camera into buyer's guides, and more."
      />

      <section className="bg-mist pb-16 pt-32 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Case studies
          </motion.p>
          <h1 className="mt-5 max-w-4xl">
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.8rem] lg:text-[4.3rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              The work, and
            </motion.span>
            <motion.span
              className="block pb-[0.06em] text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.8rem] lg:text-[4.3rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <span className="accent-ink">what it changed.</span>
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Brands and agencies we've built links and mentions for. Where a
            client has shared their numbers, you'll see them with the source.
            Where they haven't, we show you the work itself.
          </motion.p>
        </div>
      </section>

      <section className="bg-mist pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <CaseCard c={first} large />
          {rest.map((c, i) => (
            <CaseCard key={c.slug} c={c} delay={0.05 * i} />
          ))}
        </div>
      </section>

      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-8">
          <motion.div {...rise()}>
            <Eyebrow className="mb-4">How we report</Eyebrow>
            <H2>
              Numbers you can check.
              <br />
              <span className="accent-ink">Nothing rounded up.</span>
            </H2>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-navy-dark/75">
              Every figure in these case studies comes from the client's own
              tools or a screenshot we can show you. If a client prefers to
              keep their numbers private, the case study says what we did and
              leaves the numbers out.
            </p>
          </motion.div>
          <motion.div className="grid gap-4 sm:grid-cols-2" {...rise(0.1)}>
            <div className="rounded-3xl bg-mist p-6 ring-1 ring-line">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-verified">
                What we show
              </p>
              <Checks items={WE_SHOW} />
            </div>
            <div className="rounded-3xl bg-mist p-6 ring-1 ring-line">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                What we leave out
              </p>
              <ul className="space-y-3">
                {WE_SKIP.map((x) => (
                  <li
                    key={x}
                    className="flex gap-2.5 text-[15px] leading-snug text-navy-dark/75"
                  >
                    <span className="mt-2 h-px w-3 flex-none bg-navy-dark/40" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudies;
