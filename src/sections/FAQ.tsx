import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Mail, Plus } from "lucide-react";
import { openBooking } from "@/lib/booking";

/** Agency-level questions, across every service. Answers are short and
 *  honest; the page-specific detail lives on each service page. */
const FAQS = [
  {
    q: "What does your agency actually do?",
    a: "We build authority for brands outside their own website: editorial backlinks (guest posts, niche edits, authority placements), digital PR, brand mentions and expert quotes on real publications. Links move your Google rankings. Mentions and coverage are what AI answers draw on. Most clients use two or three of these together.",
  },
  {
    q: "Which service should we start with?",
    a: "It depends on where you are. If your key pages already sit on page two, link building usually moves fastest. If nobody outside your own site talks about you yet, digital PR and brand mentions come first. If your team has real expertise, expert quotes are often the quickest win. The free audit tells you which, and we'll say so even if the answer is “not yet”.",
  },
  {
    q: "Can you get us recommended by ChatGPT or Google's AI?",
    a: "Nobody controls what an AI says, so be careful with anyone who guarantees it. What we can do is get you mentioned on the publications AI answers already lean on, then track where you show up each month in Google's AI Overviews, ChatGPT and other assistants. Some people call this GEO or AEO. The work behind it is the same: be worth mentioning, on sites people trust.",
  },
  {
    q: "Are these PBNs or link farms?",
    a: "No. Every publication is checked by hand: real organic traffic, the keywords behind it, a steady traffic graph and no link-selling footprint. If a site exists only to sell links, we don't use it, whatever its DR.",
  },
  {
    q: "How long until we see results?",
    a: "Links usually get indexed within two to six weeks. Pages already close to page one tend to move between months two and four. PR coverage and AI mentions build over a few months. We'll tell you on the first call what's realistic for your site.",
  },
  {
    q: "What's in the monthly report?",
    a: "Every placement with its URL, metrics and anchor, its indexation status, ranking movement on your target pages, and where AI answers mentioned you that month. Clean enough to forward to your boss or your client as it is.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes, a lot. Around a third of our work is white label: your branding on the reports, volume pricing, NDA on request, and we stay invisible on client calls.",
  },
  {
    q: "How much does it cost, and do you guarantee results?",
    a: "Plans start at $997 a month, and the final price depends on the services, volume and niche. We don't guarantee rankings or AI citations, because nobody honestly can. We do guarantee the work: the placements in your plan, indexation checks, and a free replacement if a link drops.",
  },
];

const Item = ({ n, q, a, open, onToggle }: { n: number; q: string; a: string; open: boolean; onToggle: () => void }) => (
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
            open ? "bg-navy-dark text-white ring-navy-dark" : "text-navy-dark ring-navy-dark/20 group-hover:ring-navy-dark/50"
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
          <p className="max-w-2xl pb-7 pl-12 pr-2 text-[15.5px] sm:pr-12 leading-[1.75] text-navy-dark/75">{a}</p>
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
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">FAQ</p>
            <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
              Questions we
              <br />
              <span className="text-navy-dark/65">get a lot</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-navy-dark/75">
              Straight answers about how we work, what we can and can't promise, and what it costs.
            </p>
            <div className="mt-8 rounded-[20px] bg-mist p-6 ring-1 ring-line">
              <p className="text-[16px] font-semibold text-navy-dark">Still have a question?</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-navy-dark/75">
                Ask us on a short call, or send it by email. We reply within a day.
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
                  href="mailto:contact@talhamahmood.com"
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
            <Item key={f.q} n={n} q={f.q} a={f.a} open={open === n} onToggle={() => setOpen(open === n ? -1 : n)} />
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
