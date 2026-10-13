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
          "Editorial backlinks from DR 40+ publications with real, verified organic traffic. Contextual anchors inside real articles — the links that still move Google rankings, placed through editors we work with directly.",
      },
      {
        icon: Megaphone,
        title: "Digital PR & Brand Mentions",
        content:
          "Features, expert quotes, HARO-style source placements, and brand mentions on publications your buyers — and AI models — already read. Mentions are the raw material AI engines cite. We build that footprint deliberately, not by accident.",
      },
      {
        icon: Target,
        title: "Guest Posts & Niche Edits",
        content:
          "Original articles on vetted, niche-relevant sites, plus contextual links inserted into aged, already-indexed content. No footers, no sidebars, no link pages. You approve every domain first.",
      },
      {
        icon: ChartColumn,
        title: "AI Search Visibility (GEO)",
        content:
          "We map where your competitors get cited across AI Overviews, ChatGPT, and target placements on the sources those engines already trust, and track your citation footprint month over month.",
      },
      {
        icon: Award,
        title: "Own Publisher Network",
        content:
          "Years of relationship building mean we place through editors and site owners we know — not marketplaces. That is why we can show you every site, with full metrics, before anything goes live.",
      },
      {
        icon: Globe,
        title: "Gulf & International Media",
        content:
          "Direct access to Khaleej Times, Arabian Business, and regional outlets most agencies cannot reach. High-authority coverage for brands targeting the Gulf and international markets.",
      },
      {
        icon: Newspaper,
        title: "Transparent Reporting",
        content:
          "Live URLs, DR, traffic, anchor text, indexation status, and AI citation tracking in every report. Clean enough to forward to your boss or your clients — no vanity metrics, no padding.",
      },
      {
        icon: Users,
        title: "You Approve Everything",
        content:
          "Every domain is disclosed with metrics before placement, and a dedicated manager is one WhatsApp or Slack message away. You stay in control of your link profile at every step.",
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
    <div className="bg-linen py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
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
            Our Link Building Services
          </motion.p>
          <motion.h2
            className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark leading-tight max-w-4xl mx-auto"
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
            className="mt-6 text-navy-dark/70 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            As an expert{" "}
            <a
              href="/case-studies"
              className="text-blue-accent hover:underline"
            >
              link building agency
            </a>
            , we deliver premium backlinks that drive results. Stand out and get
            exceptional value for your business.
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
                      className="bg-white rounded-xl border-0 shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-navy-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-accent/10 transition-colors"
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
                          className="text-navy-dark/70 pl-14 leading-relaxed"
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
                      className="bg-white rounded-xl border-0 shadow-sm overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-navy-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-accent/10 transition-colors"
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
                          className="text-navy-dark/70 pl-14 leading-relaxed"
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
