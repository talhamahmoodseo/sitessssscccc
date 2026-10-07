import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { openBooking } from "@/lib/booking";

const CTABand = () => (
  <div className="relative bg-navy-dark py-24 lg:py-32 overflow-hidden">
    <div
      className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[720px] h-[420px] blur-[90px] opacity-40"
      style={{
        background:
          "radial-gradient(60% 60% at 60% 50%, rgba(248,146,84,0.55), rgba(167,139,250,0.35) 45%, transparent 72%)",
      }}
    />
    <div
      className="pointer-events-none absolute right-[-8rem] bottom-[-6rem] w-[520px] h-[420px] blur-[90px] opacity-30"
      style={{
        background:
          "radial-gradient(circle, rgba(247,233,107,0.5), transparent 68%)",
      }}
    />
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.p
        className="text-[11px] font-semibold tracking-[0.2em] text-white/50 uppercase mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Free visibility audit
      </motion.p>
      <motion.h2
        className="text-balance text-[2.8rem] sm:text-6xl lg:text-[4.6rem] font-semibold text-white leading-[0.98] tracking-[-0.04em] mb-7"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Get ranked.
        <br />
        {"Get "}
        <span className="italic font-medium">cited</span>.
      </motion.h2>
      <motion.p
        className="text-[17px] sm:text-[19px] text-white/65 leading-relaxed max-w-xl mx-auto mb-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Send us your site. Inside 48 hours you get the gap analysis, the
        placements we'd start with, and a straight answer on what it costs.
      </motion.p>
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.18 }}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/[0.07] border border-white/15 rounded-2xl p-2 sm:pl-5 backdrop-blur">
          <input
            id="cta-site"
            placeholder="yourbrand.com"
            className="flex-1 min-w-0 bg-transparent px-3 sm:px-0 py-3 text-[14.5px] text-white placeholder:text-white/70 focus:outline-none"
          />
          <a
            href="/contact"
            className="flex-none inline-flex items-center justify-center gap-2 bg-white text-navy-dark hover:bg-white/90 rounded-xl px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300"
          >
            Get my audit
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
          {[
            "48-hour turnaround",
            "No retainer, no lock-in",
            "Founder reviews every audit",
          ].map((e) => (
            <span
              key={e}
              className="inline-flex items-center gap-1.5 text-[12.5px] text-white/55"
            >
              <Check className="w-3.5 h-3.5 text-white/70" />
              {e}
            </span>
          ))}
        </div>
        <button
          onClick={openBooking}
          className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/70 hover:text-white transition-colors duration-300"
        >
          Prefer to talk? Book a 15-minute call
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  </div>
);

export default CTABand;
