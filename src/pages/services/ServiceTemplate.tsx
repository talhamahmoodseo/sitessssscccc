import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import PageLayout from "@/components/PageLayout";
import { Seo } from "@/components/MotionKit";
import { Annotation } from "@/components/brand";
import { openBooking } from "@/lib/booking";
import { OtherServices, RatingRow, SectionHead } from "./shared";
import {
  DeliverableGrid,
  FitPanel,
  InlineCta,
  LedgerPanel,
  ObjectionFaq,
  ProblemSplit,
  ProcessTimeline,
  ProofStrip,
  Section,
  StageLadder,
  WorkedExample,
} from "./sections";

/** Every service page is this shape. One template means the four pages stay
 *  consistent by construction rather than by discipline. */

export type ServiceContent = {
  eyebrow: string;
  h1: { pre: string; em: string; post: string };
  sub: string;
  proof: {
    v?: number;
    prefix?: string;
    suffix?: string;
    custom?: string;
    label: string;
  }[];
  problem: { heading: { pre: string; em: string }; paras: string[] };
  deliverables: { t: string; d: string }[];
  ledger: {
    standards: { label: string; detail: string }[];
    rejections: { site: string; metric: string; reason: string }[];
  };
  process: { n: string; t: string; d: string; you: string }[];
  example: {
    label: string;
    headline: string;
    facts: { k: string; v: string }[];
    series: number[];
    seriesLabel: string;
    takeaway: string;
    caseHref: string;
  };
  fit: { good: string[]; bad: string[] };
  faqs: { q: string; a: string }[];
};

const STAGES = [
  {
    k: "Invisible",
    d: "Nobody links to you, so nothing corroborates what you claim about yourself.",
  },
  {
    k: "Indexed",
    d: "Placements land and Google crawls them. Authority starts accumulating against your pages.",
  },
  {
    k: "Ranking",
    d: "Pages sitting at 8–20 move onto page one, because the authority finally points at them.",
  },
  {
    k: "Cited",
    d: "The same publications feed the answer engines, so you get named when buyers ask.",
  },
];

const ServiceTemplate = ({
  c,
  slug,
  seoTitle,
  serviceType,
  annotation,
}: {
  c: ServiceContent;
  slug: string;
  seoTitle: string;
  serviceType: string;
  annotation: string;
}) => (
  <PageLayout>
    <Seo
      title={seoTitle}
      description={c.sub}
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType,
        provider: {
          "@type": "Organization",
          name: "Talha Mahmood — Link Building & Digital PR",
        },
        areaServed: ["US", "GB", "AE", "PK"],
        description: c.sub,
      }}
    />

    {/* 1 — hero */}
    <div className="relative overflow-hidden bg-mist pt-28 pb-20 lg:pt-32">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {c.eyebrow}
        </motion.p>

        <motion.h1
          className="mb-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.03] tracking-[-0.035em] text-navy-dark sm:text-5xl lg:text-[3.5rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.05 }}
        >
          {c.h1.pre} <span className="mark">{c.h1.em}</span>
          {c.h1.post}
        </motion.h1>

        <motion.p
          className="mb-9 max-w-2xl text-[17px] leading-relaxed text-navy-dark/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {c.sub}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 rounded-xl bg-navy-dark px-7 py-3.5 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
          >
            Book a 15-minute call
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-xl border border-navy-dark/20 px-7 py-3.5 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:border-navy-dark"
          >
            Get a free teardown
          </Link>
        </motion.div>

        <RatingRow />
      </div>
    </div>

    {/* 2 — proof before claims */}
    <ProofStrip items={c.proof} />

    {/* 3 — the problem, as a contrast */}
    <Section tone="white">
      <SectionHead eyebrow="The problem">
        {c.problem.heading.pre}{" "}
        <span className="mark-ink">{c.problem.heading.em}</span>.
      </SectionHead>
      <ProblemSplit
        paras={c.problem.paras}
        pull={`“${c.problem.heading.pre} ${c.problem.heading.em}.”`}
      />
    </Section>

    {/* 4 — deliverables */}
    <Section>
      <SectionHead eyebrow="What you get">
        Six things land in your account every month.
      </SectionHead>
      <DeliverableGrid items={c.deliverables} />
    </Section>

    {/* 5 — the differentiator */}
    <Section tone="white">
      <div className="relative">
        <Annotation className="-top-6 right-0 hidden w-[130px] xl:block" flip>
          nobody else shows this
        </Annotation>
        <SectionHead eyebrow="The Open Ledger">
          You see every domain <span className="mark-ink">before</span> it is
          placed — and every one we reject.
        </SectionHead>
      </div>
      <LedgerPanel
        standards={c.ledger.standards}
        rejections={c.ledger.rejections}
      />
    </Section>

    <Section>
      <InlineCta
        title="Want to see the sheet before you commit to anything?"
        body="We will run your domain through the same vetting and show you ten sites we would approach — and a few we would not. No charge, no obligation."
      />
    </Section>

    {/* 6 — process */}
    <Section tone="white">
      <SectionHead eyebrow="How it runs">
        Five steps. Your part takes about an hour a month.
      </SectionHead>
      <ProcessTimeline steps={c.process} />
    </Section>

    {/* 7 — the climb, as a visual */}
    <Section>
      <SectionHead eyebrow="The arc">Where this takes you.</SectionHead>
      <p className="-mt-6 mb-10 max-w-2xl text-[16px] leading-relaxed text-navy-dark/80">
        {annotation}
      </p>
      <StageLadder stages={STAGES} />
    </Section>

    {/* 8 — worked example */}
    <Section tone="white">
      <SectionHead eyebrow="A worked example">
        What it looks like when it works.
      </SectionHead>
      <WorkedExample {...c.example} />
    </Section>

    {/* 9 — qualify */}
    <Section>
      <SectionHead eyebrow="Fit">This is not right for everyone.</SectionHead>
      <FitPanel good={c.fit.good} bad={c.fit.bad} />
    </Section>

    {/* 10 — objections */}
    <Section tone="white">
      <SectionHead eyebrow="Questions">
        The things people actually ask.
      </SectionHead>
      <ObjectionFaq faqs={c.faqs} />
      <p className="mt-8 text-[14px] text-navy-dark/70">
        Budget questions are answered on the{" "}
        <Link
          to="/pricing"
          className="font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-4 hover:decoration-navy-dark"
        >
          pricing page
        </Link>
        .
      </p>
    </Section>

    {/* 11 — internal links */}
    <OtherServices current={slug} />

    {/* 12 — closing */}
    <Section>
      <InlineCta
        title="Start with the teardown, not the contract."
        body="Fifteen minutes, your domain on screen, and an honest read on whether this is what you need right now."
        primary="Book the call"
      />
    </Section>
  </PageLayout>
);

export default ServiceTemplate;
