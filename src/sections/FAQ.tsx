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
          "Three things: editorial backlinks (guest posts, niche edits, authority links on DR 40+ sites), brand mentions and PR features (quotes, roundup inclusions, press coverage), and Gulf or international media placements. Links move your Google rankings. Mentions build the citation footprint AI engines pull answers from.",
      },
      {
        question: "Can you really influence ChatGPT and AI Overviews?",
        answer:
          "Honest answer: nobody controls what an AI says, and anyone promising guaranteed AI citations is selling snake oil. What we can do is build the thing AI engines consistently cite — mentions and coverage on authoritative publications they already trust. We track your citations across AI Overviews, ChatGPT, and Claude monthly so you can see the footprint grow.",
      },
      {
        question: "Are these PBNs or link farms?",
        answer:
          "No. Every site must pass manual checks: real organic traffic in Ahrefs, a clean outbound profile, genuine editorial standards, and regular crawl activity. If a site exists only to sell links, it never enters the network.",
      },
      {
        question: "How long until I see results?",
        answer:
          "Google rankings typically compound over 3–6 months as links get discovered and credited. AI citations can move sooner when mentions land on sources the engines already pull from. Either way, you see every placement the week it goes live — no waiting in the dark.",
      },
      {
        question: "Do I approve sites before you place anything?",
        answer:
          "Yes — and it is the default, not a premium add-on. You receive every prospect with DR, traffic, and relevance data, and approve or reject each domain. Nothing is placed without your sign-off.",
      },
      {
        question: "What is in the monthly report?",
        answer:
          "Live placement URLs, anchor text, DR and traffic of each site, indexation status, ranking movement on target pages, and your AI citation tracking across the major answer engines. Clean enough to forward straight to your boss or your client.",
      },
      {
        question: "Do you offer white-label for agencies?",
        answer:
          "Yes. Unbranded reports your clients can read, volume pricing, NDA on request, and a dedicated WhatsApp or Slack channel. A large share of our work runs white-label for agencies.",
      },
      {
        question: "Do you guarantee rankings or AI citations?",
        answer:
          "No — and you should run from anyone who does. Algorithms and AI models are outside everyone's control. What we do guarantee: the quality and volume of placements in your package, indexation verification, and free replacement of any link that drops within 90 days.",
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
    <div className="bg-white py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-navy-dark"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>
        <motion.div
          variants={s}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Accordion type="single" collapsible={true} className="space-y-4">
            {e.map((r, c) => (
              <motion.div key={c} variants={a}>
                <AccordionItem
                  value={`item-${c}`}
                  className="border-b border-gray-200 py-2"
                >
                  <AccordionTrigger className="text-left hover:no-underline group py-4">
                    <div className="flex items-start gap-4">
                      <span className="text-sm font-medium text-navy-dark/70 mt-1">
                        {String(c + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-semibold text-navy-dark group-hover:text-blue-accent transition-colors">
                        {r.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-12 pr-4">
                    <motion.p
                      className="text-navy-dark/70 leading-relaxed pb-4"
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
