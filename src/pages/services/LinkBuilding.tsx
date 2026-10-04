import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import PageLayout from "@/components/PageLayout";
import { Seo } from "@/components/MotionKit";
import { openBooking } from "@/lib/booking";
import { Glow, OtherServices, RatingRow, SectionHead } from "./shared";
import {
  DeliverableGrid,
  FitPanel,
  InlineCta,
  LedgerPanel,
  ObjectionFaq,
  PricingContext,
  ProcessTimeline,
  ProofStrip,
  Section,
  WorkedExample,
} from "./sections";
import { linkBuilding as c } from "./content/linkBuilding";

const LinkBuilding = () => (
  <PageLayout>
    <Seo
      title="Link Building Services"
      description={c.sub}
      schema={{
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Link Building",
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
      <Glow
        tint="bg-butter"
        className="-left-24 top-4 h-[380px] w-[520px] opacity-60"
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/65"
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
          className="mb-9 max-w-2xl text-[17px] leading-relaxed text-navy-dark/70"
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
            Get a free link teardown
          </Link>
        </motion.div>

        <RatingRow />
      </div>
    </div>

    {/* 2 — proof before claims */}
    <ProofStrip items={c.proof} />

    {/* 3 — the problem, named */}
    <Section tone="white">
      <SectionHead eyebrow="The problem">
        {c.problem.heading.pre}{" "}
        <span className="text-navy-dark/65">{c.problem.heading.em}</span>.
      </SectionHead>
      <div className="max-w-3xl space-y-5">
        {c.problem.paras.map((p) => (
          <p key={p} className="text-[16px] leading-relaxed text-navy-dark/75">
            {p}
          </p>
        ))}
      </div>
    </Section>

    {/* 4 — what you actually get */}
    <Section>
      <SectionHead eyebrow="What you get">
        Six things land in your account every month.
      </SectionHead>
      <DeliverableGrid items={c.deliverables} />
    </Section>

    {/* 5 — the differentiator */}
    <Section tone="white" id="ledger">
      <SectionHead eyebrow="The Open Ledger">
        You see every domain <span className="text-navy-dark/65">before</span>{" "}
        it is placed — and every one we reject.
      </SectionHead>
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

    {/* 7 — worked example */}
    <Section>
      <SectionHead eyebrow="A worked example">
        What it looks like when it works.
      </SectionHead>
      <WorkedExample {...c.example} />
    </Section>

    {/* 8 — qualify */}
    <Section tone="white">
      <SectionHead eyebrow="Fit">
        Link building is not right for everyone.
      </SectionHead>
      <FitPanel good={c.fit.good} bad={c.fit.bad} />
    </Section>

    {/* 9 — pricing context */}
    <Section>
      <SectionHead eyebrow="Pricing">What this usually costs.</SectionHead>
      <PricingContext {...c.pricing} />
    </Section>

    {/* 10 — objections */}
    <Section tone="white">
      <SectionHead eyebrow="Questions">
        The things people actually ask.
      </SectionHead>
      <ObjectionFaq faqs={c.faqs} />
    </Section>

    {/* 11 — internal links */}
    <OtherServices current="link-building" />

    {/* 12 — closing */}
    <Section>
      <InlineCta
        title="Start with the teardown, not the contract."
        body="Fifteen minutes, your domain on screen, and an honest read on whether links are what you need right now."
        primary="Book the call"
      />
    </Section>
  </PageLayout>
);

export default LinkBuilding;
