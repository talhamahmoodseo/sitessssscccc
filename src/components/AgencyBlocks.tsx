import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const PUBLICATIONS = [
  ["Khaleej Times", 74],
  ["Arabian Business", 72],
  ["Home Services Digest", 64],
  ["Gulf Business Review", 61],
  ["Valley Business Journal", 58],
  ["Tech Daily", 66],
  ["Style Editorials", 55],
  ["The Industry Journal", 71],
  ["Retail Review", 60],
];

const AgencyBlocks = ({ label = "Placements live on publications like" }) => (
  <div className="bg-navy-dark border-y border-white/[0.06] py-7 overflow-hidden">
    <p className="text-center text-[10px] font-extrabold tracking-[0.22em] text-white/55 uppercase mb-5">
      {label}
    </p>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-navy-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-navy-dark to-transparent z-10" />
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {[...PUBLICATIONS, ...PUBLICATIONS].map(([s, a], r) => (
          <span key={r} className="flex items-center gap-3">
            <span className="font-medium text-xl text-white/55">{s}</span>
            <span className="text-[9px] font-extrabold tracking-wider text-white/55 border border-white/15 rounded-md px-1.5 py-0.5">
              {"DR "}
              {a}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
    <p className="text-center text-[9px] font-bold tracking-[0.18em] text-white/55 uppercase mt-5">
      Sample network · full site list shared after approval call
    </p>
  </div>
);

const FaqList = ({ faqs }) => {
  const [s, a] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.map((r, c) => {
        const u = s === c;
        return (
          <motion.div
            key={r.q}
            className={`bg-white rounded-2xl border transition-colors duration-300 ${u ? "border-blue-accent/30 shadow-soft" : "border-line"}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: c * 0.05 }}
          >
            <button
              onClick={() => a(u ? null : c)}
              className="w-full flex items-center justify-between gap-4 px-6 sm:px-7 py-5 text-left"
            >
              <span className="text-[15.5px] sm:text-[16.5px] font-bold text-navy-dark">
                {r.q}
              </span>
              <motion.span
                animate={{ rotate: u ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-none"
              >
                <ChevronDown
                  className={`w-5 h-5 ${u ? "text-brand-soft" : "text-navy-dark/70"}`}
                />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {u && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 sm:px-7 pb-6 text-[14.5px] text-navy-dark/70 leading-relaxed">
                    {r.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

const Testimonial = ({ text, who }) => (
  <div className="bg-navy-dark py-20">
    <motion.div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
    >
      <span className="font-medium text-brand-soft text-5xl leading-none">
        “
      </span>
      <p className="font-medium text-2xl sm:text-[1.7rem] text-white/85 leading-relaxed -mt-3 mb-6">
        {text}
      </p>
      <p className="text-[11px] font-extrabold tracking-[0.18em] text-white/55 uppercase">
        {who}
        {" \u00b7 placeholder"}
      </p>
    </motion.div>
  </div>
);

export { Testimonial, FaqList };
export default AgencyBlocks;
