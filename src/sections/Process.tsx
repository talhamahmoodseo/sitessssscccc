import { motion } from "motion/react";
import {
  Check,
  FileSearch,
  LineChart,
  Map,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow, H2, Soft, ease } from "@/pages/services/kit";

/**
 * Homepage: how a campaign runs. The whole workflow on one screen: a
 * timeline that draws itself in as it enters view, five steps with a
 * realistic timing, what the client gets at each one, and how little of
 * their time it takes. Vertical on small screens.
 */

const STEPS: {
  Icon: LucideIcon;
  when: string;
  t: string;
  d: string;
  get: string;
}[] = [
  {
    Icon: FileSearch,
    when: "Days 1–3",
    t: "Audit",
    d: "We look at your backlinks, your rankings and what AI answers say about you. The gaps become the plan.",
    get: "A visibility audit",
  },
  {
    Icon: Map,
    when: "Week 1",
    t: "Plan",
    d: "We choose the pages to push and the right mix of links, PR and mentions. You approve it before we start.",
    get: "A campaign plan",
  },
  {
    Icon: ShieldCheck,
    when: "Weeks 1–2",
    t: "Vet",
    d: "Every site is checked by hand: relevance first, then what it ranks for, its health and its editorial standards.",
    get: "A shortlist you can review",
  },
  {
    Icon: PenLine,
    when: "Weeks 2–4",
    t: "Place",
    d: "We write the content and get it published, with your link inside the article where readers see it.",
    get: "Live placements",
  },
  {
    Icon: LineChart,
    when: "Every month",
    t: "Report",
    d: "We confirm every link is indexed, track your target pages and show you what changed.",
    get: "A clear monthly report",
  },
];

const GRADIENT =
  "bg-[linear-gradient(90deg,rgb(var(--plume-warm)),rgb(var(--plume-cool)))]";

const Process = () => (
  <div className="relative overflow-hidden bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease }}
      >
        <div>
          <Eyebrow className="mb-4">How we work</Eyebrow>
          <H2>
            From first audit
            <br />
            <Soft>to live links in a month.</Soft>
          </H2>
        </div>
        <p className="text-[17px] leading-relaxed text-navy-dark/75">
          The same five steps for every campaign, whether it's links, PR or
          brand mentions. Your part is a 30-minute call and a quick look at
          each report.
        </p>
      </motion.div>

      <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-4">
        {/* the track: horizontal on large screens, vertical on small */}
        <span
          className="absolute left-[19px] top-2 bottom-2 w-px bg-navy-dark/10 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto"
          aria-hidden="true"
        />
        <motion.span
          className={`absolute left-[19px] top-2 w-px origin-top lg:hidden ${GRADIENT}`}
          style={{ bottom: "0.5rem" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease }}
          aria-hidden="true"
        />
        <motion.span
          className={`absolute left-0 right-0 top-[19px] hidden h-px origin-left lg:block ${GRADIENT}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease }}
          aria-hidden="true"
        />

        {STEPS.map(({ Icon, when, t, d, get }, i) => (
          <motion.li
            key={t}
            className="relative grid grid-cols-[40px_1fr] gap-5 pb-8 last:pb-0 lg:block lg:pb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease }}
          >
            {/* node */}
            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy-dark text-[14px] font-semibold text-white ring-[6px] ring-mist">
              {i + 1}
            </span>

            {/* card */}
            <div className="flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-line transition-shadow duration-500 hover:shadow-soft lg:mt-7">
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mist ring-1 ring-line">
                  <Icon className="h-[18px] w-[18px] text-navy-dark" />
                </span>
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy-dark/60">
                  {when}
                </span>
              </div>
              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.02em] text-navy-dark">
                {t}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/75">
                {d}
              </p>
              <p className="mt-auto flex items-start gap-2 border-t border-line pt-4 text-[13.5px] font-semibold text-navy-dark">
                <span
                  className={`mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full ${GRADIENT}`}
                  style={{ marginTop: "0.125rem" }}
                >
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                </span>
                {get}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </div>
);

export default Process;
