import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { contactLink } from "@/lib/booking";
import { COLOURS, GrainBlob } from "./Grain";

const FACTS = ["Delivered within 48 hours", "No sales call needed", "Free, with no obligation"];

/**
 * The closing call to action (round 15), on the homepage and every inner
 * page that doesn't end on its own. One action only: send your website, get
 * the free audit. The old version repeated the hero headline and offered a
 * call and an email next to the audit; the owner asked for one clear CTA.
 * `grain` adds the moving grain blobs the homepage uses; inner pages get the
 * same band with a still glow.
 */
const AuditCTA = ({ grain = false }: { grain?: boolean }) => {
  const navigate = useNavigate();
  const id = useId();
  const [site, setSite] = useState("");

  const requestAudit = () =>
    navigate(
      contactLink({
        website: site,
        message: "Please send me a free visibility audit.",
      }),
    );

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-navy-dark py-24 lg:py-32">
      {grain ? (
        <>
          <GrainBlob
            color={COLOURS.orange}
            className="-left-[280px] top-[8%] h-[560px] w-[560px] opacity-50"
            duration={24}
          />
          <GrainBlob
            color={COLOURS.lavender}
            className="-right-[260px] bottom-[-140px] h-[560px] w-[620px] opacity-40"
            duration={28}
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute -left-32 top-1/2 h-[420px] w-[720px] -translate-y-1/2 opacity-35 blur-[90px]"
          style={{
            background:
              "radial-gradient(60% 60% at 60% 50%, rgba(248,146,84,0.55), rgba(167,139,250,0.35) 45%, transparent 72%)",
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Free visibility audit
          </p>
          <h2 className="text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3.4rem] lg:text-[3.9rem]">
            Find out what it takes
            <br />
            {"to "}
            <span className="accent-ink-dark pr-[0.12em] font-medium italic">rank first</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/75 sm:text-[18px]">
            Send us your website. Within 48 hours you'll receive a short audit of
            your backlink profile, the link gap to your top competitors, and
            whether AI answers mention your brand.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-9 max-w-lg"
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
            <label htmlFor={id} className="sr-only">
              Your website
            </label>
            <input
              id={id}
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

        <ul className="mt-6 flex flex-col items-center justify-center gap-x-7 gap-y-2 sm:flex-row">
          {FACTS.map((f) => (
            <li key={f} className="flex items-center gap-2 whitespace-nowrap text-[13px] text-white/70">
              <Check className="h-3.5 w-3.5 flex-none text-white/60" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AuditCTA;
