import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, FileText } from "lucide-react";
import { openBooking } from "@/lib/booking";

const QB = "contact@talhamahmood.com";

const HomeContact = () => {
  const [e, s] = useState({ name: "", email: "", website: "", message: "" }),
    a = (u) => (d) => s({ ...e, [u]: d.target.value }),
    r = () => {
      const u = encodeURIComponent(
          `Inquiry from ${e.website || e.name || "your website"}`,
        ),
        d = encodeURIComponent(`Name: ${e.name}
Email: ${e.email}
Website: ${e.website}

${e.message}`);
      window.location.href = `mailto:${QB}?subject=${u}&body=${d}`;
    },
    c =
      "w-full rounded-xl border border-line bg-mist px-4 py-3 text-[14px] text-navy-dark placeholder:text-navy-dark/70 focus:outline-none focus:border-navy-dark focus:ring-2 focus:ring-navy-dark/15 transition-all duration-300";
  return (
    <div className="bg-clay py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-4">
            Get in touch
          </p>
          <h2 className="text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark mb-6">
            Not ready for a call?{" "}
            <span className="text-navy-dark/65">Write to us.</span>
          </h2>
          <p className="text-[16px] text-navy-dark/75 leading-relaxed max-w-md mb-8">
            A few lines about your site and the pages you want moving is enough.
            A senior strategist replies with first questions, and the visibility
            audit follows.
          </p>
          <dl className="mb-8 grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-dark/15 bg-navy-dark/15">
            {[
              [Clock, "24h", "to a reply from a strategist"],
              [FileText, "48h", "to your visibility audit"],
            ].map(([Icon, v, k]: any) => (
              <div key={v} className="bg-clay px-5 py-5">
                <Icon
                  className="mb-3 h-4 w-4 text-navy-dark/70"
                  aria-hidden="true"
                />
                <dt className="text-[1.9rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
                  {v}
                </dt>
                <dd className="mt-2 text-[12.5px] leading-snug text-navy-dark/75">
                  {k}
                </dd>
              </div>
            ))}
          </dl>
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-navy-dark/80 underline decoration-navy-dark/25 underline-offset-[5px] transition-colors duration-300 hover:text-navy-dark hover:decoration-navy-dark"
          >
            Or book a 15-minute call instead
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
        <motion.div
          className="bg-white rounded-3xl border border-line p-7 shadow-deep sm:p-9"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <input
              className={c}
              placeholder="Your name"
              value={e.name}
              onChange={a("name")}
            />
            <input
              className={c}
              placeholder="Email"
              type="email"
              value={e.email}
              onChange={a("email")}
            />
          </div>
          <input
            className={`${c} mb-4`}
            placeholder="Website (yourbrand.com)"
            value={e.website}
            onChange={a("website")}
          />
          <textarea
            className={`${c} min-h-[120px] resize-y mb-5`}
            placeholder="What are you trying to rank for — or get cited for?"
            value={e.message}
            onChange={a("message")}
          />
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={r}
              className="group inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-brand-on rounded-xl px-8 py-3.5 text-sm font-semibold transition-colors duration-300 shadow-soft"
            >
              Send inquiry
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <span className="text-[11.5px] text-navy-dark/70">
              Opens your email app — nothing stored on this site.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeContact;
