import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { COLOURS, GrainBlob } from "@/components/Grain";

const EMAIL = "contact@editorialhq.com";

/** The homepage's one closing call to action. Replaces the separate contact
 *  form and closing band, which asked twice in a row. Three ways in: a free
 *  audit (the main one), a call, or an email. */
const HomeCTA = () => {
  const [site, setSite] = useState("");

  const requestAudit = () => {
    const subject = encodeURIComponent("Free visibility audit request");
    const body = encodeURIComponent(
      `Website: ${site}\n\nPlease send me a free visibility audit.`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-navy-dark py-28 lg:py-36">
      <GrainBlob
        color={COLOURS.orange}
        className="-left-[280px] top-[8%] h-[560px] w-[560px] opacity-55"
        duration={24}
      />
      <GrainBlob
        color={COLOURS.lavender}
        className="-right-[260px] bottom-[-140px] h-[560px] w-[620px] opacity-45"
        duration={28}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Free visibility audit
          </p>
          <h2 className="text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.6rem]">
            Get ranked.
            <br />
            {"Get "}
            <span className="accent-ink-dark pr-[0.14em] font-medium italic">
              cited
            </span>
            .
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/75 sm:text-[18.5px]">
            Send us your site. Within 48 hours you'll get a short audit: which
            of your links are pulling their weight, the gaps against your
            competitors, and whether AI answers mention you yet.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 max-w-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestAudit();
            }}
            className="flex flex-col items-stretch gap-2 rounded-2xl bg-white/[0.07] p-2 ring-1 ring-white/15 backdrop-blur sm:flex-row sm:items-center sm:pl-5"
          >
            <label htmlFor="cta-site" className="sr-only">
              Your website
            </label>
            <input
              id="cta-site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="yourbrand.com"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] text-white placeholder:text-white/60 focus:outline-none sm:px-0"
            />
            <button
              type="submit"
              className="group inline-flex flex-none items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
            >
              Get my free audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-white/10 pt-10 sm:flex-row sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-[14px] text-white/70">
            Rather talk it through?
          </span>
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white ring-1 ring-white/25 transition-shadow hover:ring-white/60"
          >
            Book a 15-minute call
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold text-white/85 transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4" />
            {EMAIL}
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeCTA;
