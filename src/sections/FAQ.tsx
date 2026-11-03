import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Mail, Plus } from "lucide-react";
import Accent from "@/components/Accent";
import { openBooking } from "@/lib/booking";
import { PER_LINK, PLANS, TRIAL_PRICE, planPrice, usd } from "@/lib/pricing";

/** Agency-level questions, across every service (rewritten in round 15).
 *  Answers lead with the answer; page-specific detail lives on each service
 *  page. Prices come from lib/pricing. */
const FAQS = [
  {
    q: "What services does your agency offer?",
    a: "We build authority for brands on other websites, through four services: link building (guest posts, niche edits and authority placements), digital PR, brand mentions for AI search, and expert quotes on news sites. Backlinks move your Google rankings. Mentions and coverage on trusted publications are what AI answers draw on. Most clients combine two or three.",
  },
  {
    q: "Which service should we start with?",
    a: "It depends on where your site is today. If your key pages already rank on page two, link building usually moves them fastest. If few trusted sites mention your brand, start with digital PR or brand mentions. If your team has deep subject expertise, expert quotes are a quick way to earn coverage. The free audit recommends a starting point, and tells you if your site needs work before any links.",
  },
  {
    q: "Can you get our brand recommended by ChatGPT and Google's AI Overviews?",
    a: "No one can guarantee what an AI tool says, and we don't. What we can do is get your brand mentioned on the publications AI answers already cite, then track each month whether Google's AI Overviews, ChatGPT and Perplexity name you. This is often called GEO (generative engine optimisation) or AEO. The work is the same either way: earning mentions on sites AI tools trust.",
  },
  {
    q: "What kind of websites do you get links on?",
    a: "Real publications with their own editors, readers and organic traffic. Every site is reviewed by hand before we use it: its relevance to your niche, the keywords it ranks for, its traffic trend, and whether it runs like an active publication. We don't use PBNs, link farms or sites that exist to sell links, whatever their DR.",
  },
  {
    q: "How long does link building take to show results?",
    a: "New links are usually indexed within two to six weeks. Pages already close to page one tend to move between months two and four. Digital PR coverage and AI mentions build over several months. On the first call, we give you a realistic timeline for your site and keywords.",
  },
  {
    q: "What's included in the monthly report?",
    a: "Every placement with its live URL, metrics and anchor text, its indexing status, ranking changes for your target pages, and where AI answers mentioned your brand that month. Reports come as a Google Sheet or PDF, ready to share with your team or your clients.",
  },
  {
    q: "Do you offer white label link building for agencies?",
    a: "Yes. Agencies get unbranded reports ready for their own logo, volume pricing from 20 links a month, and an NDA on request. We never contact your clients, and publishers never hear your agency's name from us.",
  },
  {
    q: "How much does link building cost, and do you guarantee results?",
    a: `Placements are ${usd(PER_LINK)} each, in packages of 3, 5 or 10 links (${planPrice(PLANS[0])}, ${planPrice(PLANS[1])} or ${planPrice(PLANS[2])}). New clients can test us with a single ${usd(TRIAL_PRICE)} trial placement, once per company, and larger or mixed campaigns are quoted as custom packages. Every order includes a 100% money-back guarantee and free link replacement. We don't guarantee rankings or AI citations, because no one controls them. We guarantee the work: placements that match what you ordered.`,
  },
];

const Item = ({
  n,
  q,
  a,
  open,
  onToggle,
}: {
  n: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) => (
  <div className="border-b border-line">
    <h3>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-start gap-5 py-6 text-left"
      >
        <span className="w-7 flex-none pt-0.5 text-[12.5px] font-semibold tabular-nums text-navy-dark/70">
          {String(n + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[17px] font-semibold leading-snug text-navy-dark sm:text-[18px]">
          {q}
        </span>
        <motion.span
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ring-1 transition-colors duration-300 ${
            open
              ? "bg-navy-dark text-white ring-navy-dark"
              : "text-navy-dark ring-navy-dark/20 group-hover:ring-navy-dark/50"
          }`}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-2xl pb-7 pl-12 pr-2 text-[15.5px] sm:pr-12 leading-[1.75] text-navy-dark/75">
            {a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-8">
        <div>
          <motion.div
            className="lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              FAQ
            </p>
            <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
              Questions we
              <br />
              <Accent>get a lot</Accent>
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
              How we work, what we can promise, what we can't, and what it
              costs.
            </p>
            <div className="mt-8 rounded-[20px] bg-mist p-6 ring-1 ring-line">
              <p className="text-[16px] font-semibold text-navy-dark">
                Still have a question?
              </p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-navy-dark/75">
                Ask us on a short call, or send it by email. We reply within a
                day.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  onClick={openBooking}
                  className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-black"
                >
                  Book a call
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                  href="mailto:team@editorialhq.com"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/20 transition-shadow hover:ring-navy-dark/50"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email us
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {FAQS.map((f, n) => (
            <Item
              key={f.q}
              n={n}
              q={f.q}
              a={f.a}
              open={open === n}
              onToggle={() => setOpen(open === n ? -1 : n)}
            />
          ))}
        </motion.div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
};

export default FAQ;
