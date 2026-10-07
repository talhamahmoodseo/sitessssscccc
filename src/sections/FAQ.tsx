import type { Variants } from "motion/react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const e = [
      {
        question: "What exactly do you place?",
        answer:
          "Three things: editorial backlinks (guest posts, niche edits, authority links on DR 40+ sites), brand mentions and PR features (expert commentary, roundup inclusions, press coverage), and Gulf or international media placements. Links move your Google rankings. Mentions build the citation footprint answer engines pull from.",
      },
      {
        question: "What is AuthorityOS™?",
        answer:
          "AuthorityOS™ is the research methodology behind the work. It maps how Google categorises your site, which publications carry weight in your category, where competitors are earning references you are not, and which of your pages will respond fastest. You do not buy AuthorityOS™ — it powers how we decide where to act.",
      },
      {
        question: "Can you influence ChatGPT and AI Overviews?",
        answer:
          "Not directly. No one controls what a model says. What we can do is build what these systems consistently cite: mentions and coverage on publications they already treat as sources. We check your citations across AI Overviews, ChatGPT and Claude every month, so the footprint is measured rather than assumed.",
      },
      {
        question: "How do you decide a site is worth placing on?",
        answer:
          "Every site passes a manual review: verified organic traffic in Ahrefs, a clean outbound profile, genuine editorial standards, and regular crawl activity. Roughly one in five sites we source does not clear it, and those never reach your plan.",
      },
      {
        question: "How long until I see movement?",
        answer:
          "Indexation takes two to six weeks per placement. Pages already sitting in positions 5–20 typically move between months two and four. Pages starting beyond position 30 usually need content work alongside links and take longer. We report against the keyword set agreed at the start, so you see the trend rather than guess at it.",
      },
      {
        question: "Do I see the publications before they go live?",
        answer:
          "Whenever you want to. Some clients review every candidate domain with its metrics before we proceed; others prefer to leave sourcing to us and read the monthly report. Either way the full list, with metrics and target pages, is in your reporting.",
      },
      {
        question: "What is in the monthly report?",
        answer:
          "Live placement URLs, anchor text, DR and traffic of each site, indexation status, ranking movement on target pages, and your AI citation tracking across the major answer engines. Written so you can forward it to your board or your client without editing it first.",
      },
      {
        question: "Do you offer white-label for agencies?",
        answer:
          "Yes. Unbranded reporting your clients can read, volume pricing, NDA on request, and a dedicated WhatsApp or Slack channel. Roughly a third of our work is delivered white-label for other agencies.",
      },
      {
        question: "Do you guarantee rankings or AI citations?",
        answer:
          "No one can — algorithms and models sit outside anyone's control. What we commit to is the placement volume and quality scoped in your programme, indexation verification on every link, and free replacement of anything that drops inside 90 days. Over the last twelve months 96% of placements were indexed by Google.",
      },
    ],
    s: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    a: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      },
    };
  return (
    <div className="bg-mist py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 border-b border-navy-dark/20 pb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
            Before you ask
          </p>
          <motion.h2
            className="text-balance text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Common questions.
            <span className="text-navy-dark/65">Direct answers.</span>
          </motion.h2>
        </motion.div>
        <motion.div
          variants={s}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible={true} className="">
            {e.map((r, c) => (
              <motion.div key={c} variants={a}>
                <AccordionItem
                  value={`item-${c}`}
                  className="border-b border-navy-dark/15 py-1.5"
                >
                  <AccordionTrigger className="text-left hover:no-underline group py-4">
                    <div className="flex items-start gap-5">
                      <span className="mt-1 text-[13px] font-bold tabular-nums tracking-[0.08em] text-navy-dark/65">
                        {String(c + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[17.5px] font-semibold leading-snug text-navy-dark transition-opacity group-hover:opacity-70">
                        {r.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-[3.1rem] pr-4">
                    <motion.p
                      className="max-w-2xl text-[15px] leading-[1.65] text-navy-dark/75 pb-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {r.answer}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
