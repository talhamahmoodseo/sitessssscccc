import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    topic: "Link Building",
    quote:
      "First vendor that showed us every domain before placing. The approval sheet alone sold me on working together.",
    name: "Daniel Reyes",
    year: "2026",
    grad: "from-slate-400 to-slate-600",
  },
  {
    topic: "Digital PR",
    quote:
      "They got us into Gulf business press our previous agency called impossible. The feature still sends leads.",
    name: "Amira Khan",
    year: "2026",
    grad: "from-stone-400 to-stone-600",
  },
  {
    topic: "Brand Mentions",
    quote:
      "Three months in, ChatGPT started naming us for our category. Our sales team noticed before we told them.",
    name: "Ben Carter",
    year: "2026",
    grad: "from-zinc-400 to-zinc-600",
  },
  {
    topic: "HARO Placements",
    quote:
      "Two DR 65+ quotes in the first month. Our old vendor managed three in a year, and none sounded like me.",
    name: "Sofia Marino",
    year: "2025",
    grad: "from-neutral-400 to-neutral-600",
  },
  {
    topic: "Reporting",
    quote:
      "Live URLs, index status, citations — the first SEO report my CFO read without asking me to translate it.",
    name: "Priya Shah",
    year: "2025",
    grad: "from-gray-400 to-gray-600",
  },
  {
    topic: "White Label",
    quote:
      "We resell their fulfilment for six clients now. Same vetting, our branding, zero surprises on delivery.",
    name: "Elena Vasquez",
    year: "2026",
    grad: "from-slate-500 to-zinc-700",
  },
  {
    topic: "Local SEO",
    quote:
      "I don't read dashboards. I read the phone ringing more than last month. It rings, so we renewed.",
    name: "Tom Whitfield",
    year: "2025",
    grad: "from-stone-500 to-neutral-700",
  },
];

const VB = (e) =>
  e
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2);

const Testimonials = () => {
  const [e, s] = useState(0),
    a = TESTIMONIALS.length,
    r = useCallback((c) => s((u) => (u + c + a) % a), [a]);
  return (
    useEffect(() => {
      const c = setInterval(() => r(1), 6e3);
      return () => clearInterval(c);
    }, [r]),
    (
      <div className="bg-white py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-navy-dark text-center tracking-tight mb-4"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            What our clients say
          </motion.h2>
          <p className="text-center text-[15px] text-navy-dark/70 mb-4">
            Sample reviews — replace with real client quotes before launch
          </p>
        </div>
        <div className="relative h-[440px] sm:h-[420px] flex items-center justify-center">
          {TESTIMONIALS.map((c, u) => {
            let d = u - e;
            (d > a / 2 && (d -= a), d < -a / 2 && (d += a));
            const h = Math.abs(d),
              x = h <= 2;
            return (
              <motion.div
                key={c.name}
                className="absolute w-[280px] sm:w-[330px] bg-linen rounded-[1.6rem] p-7 shadow-soft"
                animate={{
                  x: d * 300,
                  y: h * 46,
                  rotate: d * 9,
                  opacity: x ? (h === 2 ? 0.45 : 1) : 0,
                  scale: h === 0 ? 1 : 0.94,
                  zIndex: 10 - h,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 30 }}
              >
                <h3 className="text-[19px] font-semibold text-navy-dark mb-3">
                  {c.topic}
                </h3>
                <p className="text-[14px] text-navy-dark/70 leading-relaxed mb-6 min-h-[84px]">
                  {c.quote}
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex-none w-9 h-9 rounded-full bg-gradient-to-br ${c.grad} text-white text-[11px] font-bold flex items-center justify-center`}
                  >
                    {VB(c.name)}
                  </span>
                  <div>
                    <p className="text-[13.5px] font-semibold text-navy-dark leading-none">
                      {c.name}
                    </p>
                    <p className="text-[12px] text-navy-dark/70 mt-1">
                      {c.year}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={() => r(-1)}
            aria-label="Previous review"
            className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-navy-dark/75 hover:border-navy-dark hover:text-navy-dark transition-colors duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((c, u) => (
              <button
                key={u}
                onClick={() => s(u)}
                aria-label={`Go to review ${u + 1}`}
                className="group/dot flex items-center justify-center h-11 w-9"
              >
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${u === e ? "w-7 bg-brand" : "w-4 bg-navy-dark/20 group-hover/dot:bg-navy-dark/45"}`}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => r(1)}
            aria-label="Next review"
            className="w-12 h-12 rounded-full border border-blue-accent/60 flex items-center justify-center text-blue-accent hover:bg-blue-accent hover:text-white transition-colors duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  );
};

export default Testimonials;
