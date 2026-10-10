import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Award,
  ChartColumn,
  Globe,
  Link2,
  Megaphone,
  Newspaper,
  Search,
  Target,
  Users,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServicesSection = () => {
  const e = [
      {
        icon: Link2,
        title: "Authority Link Building",
        content:
          "Editorial backlinks from DR 40+ publications with verified organic traffic, placed through editors we work with directly. Contextual anchors inside the body of a story — the links that still move Google rankings.",
      },
      {
        icon: Megaphone,
        title: "Digital PR & Brand Mentions",
        content:
          "Features, expert commentary, HARO-style source placements and brand mentions on publications your buyers — and the answer engines — already read. Mentions are the raw material AI systems cite, so we build that footprint deliberately.",
      },
      {
        icon: Target,
        title: "Guest Posts & Niche Edits",
        content:
          "Original articles written to each publication's standard, plus contextual links added to aged, already-indexed pieces Google has trusted on your subject for years.",
      },
      {
        icon: ChartColumn,
        title: "AI Search Visibility (GEO)",
        content:
          "We map which sources AI Overviews, ChatGPT and Claude already cite for your category queries, target placements on those sources, and track your citation footprint month over month.",
      },
      {
        icon: Award,
        title: "Our Publisher Relationships",
        content:
          "Years of editorial relationships mean a placement goes to an editor who knows us. The piece is written to their standard and worked through their process, which is why we scope on delivered placements rather than available inventory.",
      },
      {
        icon: Globe,
        title: "Gulf & International Media",
        content:
          "Direct relationships with Khaleej Times, Arabian Business and regional outlets across the Gulf. High-authority coverage for brands entering the region.",
      },
      {
        icon: Newspaper,
        title: "Reporting You Can Forward",
        content:
          "Live URLs, DR, traffic, anchor text, indexation status and AI citation tracking in every report, written against the keyword set agreed at the start so the trend is visible rather than asserted.",
      },
      {
        icon: Users,
        title: "A Senior Strategist on the Account",
        content:
          "The person who interprets the the research is the person you talk to. One strategist sets the priority order, decides where the next placement should point, and is a WhatsApp or Slack message away.",
      },
    ],
    s = e.slice(0, 4),
    a = e.slice(4, 8),
    r: Variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    },
    c: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      },
    };
  return (
    <div className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm font-medium tracking-[0.2em] text-navy-dark/70 uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What we run · Powered by our research
          </motion.p>
          <motion.h2
            className="text-balance text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            One footprint.{" "}
            <span className="text-navy-dark/65">Every surface</span> where
            answers happen.
          </motion.h2>
          <motion.p
            className="mt-6 text-[16px] leading-relaxed text-navy-dark/75 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            the research tells us which of your pages sit closest to moving and
            which publications carry weight in your category. These eight
            workstreams are how we act on it — read the{" "}
            <a
              href="/case-studies"
              className="font-semibold text-blue-accent underline underline-offset-[3px] decoration-navy-dark/30 hover:decoration-navy-dark"
            >
              case files
            </a>{" "}
            for what that has produced.
          </motion.p>
          <motion.p
            className="mx-auto mt-8 max-w-xl border-t border-navy-dark/15 pt-7 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-navy-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
          >
            Most link building starts with available inventory. Ours starts with
            the pages you need to move.
          </motion.p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-2 gap-4"
          variants={r}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="space-y-4">
            <Accordion type="single" collapsible={true} className="space-y-4">
              {s.map((u, d) => {
                const H = u.icon;
                return (
                  <motion.div key={d} variants={c}>
                    <AccordionItem
                      value={`left-${d}`}
                      className="bg-white rounded-2xl border-0 shadow-lift overflow-hidden transition-shadow duration-500 hover:shadow-deep"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center flex-shrink-0 group-hover:bg-mark/35 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <H className="w-5 h-5 text-navy-dark group-hover:text-blue-accent transition-colors" />
                          </motion.div>
                          <span className="font-semibold text-navy-dark">
                            {u.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5">
                        <motion.p
                          className="text-[14.5px] text-navy-dark/75 pl-14 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {u.content}
                        </motion.p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </div>
          <div className="space-y-4">
            <Accordion type="single" collapsible={true} className="space-y-4">
              {a.map((u, d) => {
                const H = u.icon;
                return (
                  <motion.div key={d} variants={c}>
                    <AccordionItem
                      value={`right-${d}`}
                      className="bg-white rounded-2xl border-0 shadow-lift overflow-hidden transition-shadow duration-500 hover:shadow-deep"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-mist flex items-center justify-center flex-shrink-0 group-hover:bg-mark/35 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <H className="w-5 h-5 text-navy-dark group-hover:text-blue-accent transition-colors" />
                          </motion.div>
                          <span className="font-semibold text-navy-dark">
                            {u.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5">
                        <motion.p
                          className="text-[14.5px] text-navy-dark/75 pl-14 leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {u.content}
                        </motion.p>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                );
              })}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesSection;
