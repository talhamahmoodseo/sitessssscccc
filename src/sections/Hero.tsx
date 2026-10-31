import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GuaranteeChips } from "@/components/Guarantees";
import { contactLink } from "@/lib/booking";
import { TRIAL_PRICE, usd } from "@/lib/pricing";
import ResultStage from "./ResultStage";

const Hero = () => {
  const navigate = useNavigate();
  const [e, s] = useState(""),
    a = () =>
      navigate(
        contactLink({
          [e.includes("@") ? "email" : "website"]: e,
          message: "Please send me a free visibility audit.",
        }),
      );
  return (
    <div className="relative bg-mist overflow-hidden pt-24 pb-20 lg:pt-28 lg:pb-24">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.a
          href="/services/brand-mentions"
          className="inline-flex items-center gap-2.5 bg-white border border-line rounded-full pl-1.5 pr-4 py-1.5 mb-7 hover:border-navy-dark/30 transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="bg-navy-dark text-white text-[10px] font-bold tracking-wide rounded-full px-2.5 py-1">
            NEW
          </span>
          <span className="text-[13px] font-medium text-navy-dark">
            Brand mentions for AI search
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-navy-dark/70" />
        </motion.a>
        <motion.h1
          className="text-[2.75rem] sm:text-6xl lg:text-[4.1rem] font-semibold text-navy-dark leading-[1.02] tracking-[-0.035em] mb-6"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          Rank on Google.
          <br />
          {"Get "}
          <span className="accent-ink italic font-medium pr-[0.14em]">
            cited
          </span>{" "}
          by AI.
        </motion.h1>
        <motion.p
          className="text-[17px] sm:text-[19px] text-navy-dark/70 leading-relaxed max-w-xl mx-auto mb-9"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          We get your brand onto real publications, so you're the name people
          find first on Google and the one AI answers recommend. Here's what
          that did for a few of our clients.
        </motion.p>
        <motion.div
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="flex items-center gap-2 bg-white border border-line rounded-2xl p-2 pl-5 shadow-soft">
            <input
              value={e}
              onChange={(r) => s(r.target.value)}
              onKeyDown={(r) => r.key === "Enter" && a()}
              placeholder="Enter your website or email"
              className="flex-1 min-w-0 bg-transparent text-[14.5px] text-navy-dark placeholder:text-navy-dark/65 focus:outline-none"
            />
            <button
              onClick={a}
              className="flex-none bg-navy-dark hover:bg-black text-white rounded-xl px-5 py-3 text-[13.5px] font-semibold transition-colors duration-300"
            >
              Get a free audit
            </button>
          </div>
          <p className="mt-4 text-[13px] text-navy-dark/70">
            Want to see our work first?{" "}
            <Link
              to="/pilot"
              className="font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-[3px] transition-colors hover:decoration-navy-dark"
            >
              Start with one {usd(TRIAL_PRICE)} pilot link
            </Link>
          </p>
          <GuaranteeChips compact className="mt-5 justify-center" />
        </motion.div>
      </div>
      <motion.div
        className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:mt-24 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <ResultStage />
      </motion.div>
    </div>
  );
};

export default Hero;
