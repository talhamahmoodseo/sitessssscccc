import type { Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

const CountUpInline = ({ to, prefix = "", suffix = "", duration = 1.6 }) => {
  const c = useRef<any>(null),
    u = useInView(c, { once: true, margin: "-40px" }),
    [d, h] = useState(0);
  return (
    useEffect(() => {
      if (!u) return;
      let x = 0;
      const m = performance.now(),
        g = (y) => {
          const w = Math.min((y - m) / (duration * 1000), 1);
          (h(Math.round(to * (1 - Math.pow(1 - w, 3)))),
            w < 1 && (x = requestAnimationFrame(g)));
        };
      return ((x = requestAnimationFrame(g)), () => cancelAnimationFrame(x));
    }, [u, to, duration]),
    (
      <span ref={c}>
        {prefix}
        {d}
        {suffix}
      </span>
    )
  );
};

const ShiftChart = () => {
  const e = [
      { x: 62, label: "Google" },
      { x: 174, label: "AI Overviews" },
      { x: 286, label: "ChatGPT" },
      { x: 398, label: "Claude" },
    ],
    s: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: (a) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            duration: 0.9,
            delay: 0.2 + a * 0.12,
            ease: [0.4, 0, 0.2, 1],
          },
          opacity: { duration: 0.2, delay: 0.2 + a * 0.12 },
        },
      }),
    };
  return (
    <svg
      viewBox="0 0 460 300"
      className="w-full h-auto"
      role="img"
      aria-label="One buyer question answered by Google, AI Overviews, ChatGPT and Claude — all fed by authority links and mentions on trusted publications"
    >
      <motion.g
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <rect
          x="140"
          y="14"
          width="180"
          height="44"
          rx="22"
          className="fill-white/[0.06] stroke-white/20"
          strokeWidth="1"
        />
        <text
          x="230"
          y="42"
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          className="fill-white"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          "best option for…?"
        </text>
      </motion.g>
      {e.map((a, r) => (
        <motion.path
          key={`q-${a.label}`}
          d={`M230 58 C230 92, ${a.x} 84, ${a.x} 122`}
          fill="none"
          stroke="#6E8CF0"
          strokeWidth="1.6"
          strokeOpacity="0.85"
          variants={s}
          custom={r}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      ))}
      {e.map((a, r) => (
        <motion.g
          key={a.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.5 + r * 0.1 }}
        >
          <rect
            x={a.x - 52}
            y="122"
            width="104"
            height="46"
            rx="14"
            className="fill-white/[0.06] stroke-white/15"
            strokeWidth="1"
          />
          <text
            x={a.x}
            y="150"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            className="fill-white"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            {a.label}
          </text>
        </motion.g>
      ))}
      {e.map((a, r) => (
        <motion.path
          key={`a-${a.label}`}
          d={`M${a.x} 168 C${a.x} 206, 230 198, 230 236`}
          fill="none"
          stroke="#D9A441"
          strokeWidth="1.6"
          strokeOpacity="0.9"
          variants={s}
          custom={r + 4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      ))}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 1.15 }}
      >
        <rect
          x="34"
          y="236"
          width="392"
          height="54"
          rx="16"
          fill="#D9A441"
          fillOpacity="0.09"
          stroke="#D9A441"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x="230"
          y="262"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#E3B45C"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          AUTHORITY LINKS & MENTIONS
        </text>
        <text
          x="230"
          y="279"
          textAnchor="middle"
          fontSize="11"
          className="fill-white"
          fillOpacity="0.55"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          on publications every surface already trusts
        </text>
      </motion.g>
    </svg>
  );
};

const TheShift = () => {
  const e = [
    {
      value: 60,
      prefix: "~",
      suffix: "%",
      label: "of searches end without a click",
    },
    {
      value: 4,
      prefix: "",
      suffix: "",
      label: "surfaces answer the same question",
    },
    {
      value: 1,
      prefix: "",
      suffix: "",
      label: "signal they all trust: citations",
    },
  ];
  return (
    <div className="bg-navy-dark py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase mb-5">
              The Shift
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] mb-7">
              One question.
              <br />
              <span className="font-medium text-white/85">
                Four answer engines.
              </span>
            </h2>
            <p className="text-lg text-white/65 leading-relaxed mb-5 max-w-lg">
              Your buyers ask Google, ChatGPT, and Claude the same question —
              and AI answers it before anyone clicks a result. If credible
              publications don't talk about you, you don't exist in the answer.
            </p>
            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
              {"Every one of those surfaces trusts the same thing \u2014 "}
              <span className="text-white font-semibold">
                what real, authoritative sites say about you
              </span>
              . That's exactly what we build.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-10">
              {e.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl lg:text-4xl font-semibold text-white tracking-[-0.02em]">
                    <CountUpInline
                      to={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </div>
                  <div className="mt-1.5 text-[11px] font-semibold tracking-wide text-white/60 uppercase leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#process"
              className="group inline-flex items-center gap-2 text-brand-soft font-semibold text-sm hover:text-white transition-colors duration-300"
            >
              See how we build it
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
          <motion.div
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-navy-light/50 to-navy-dark p-6 sm:p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <ShiftChart />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TheShift;
