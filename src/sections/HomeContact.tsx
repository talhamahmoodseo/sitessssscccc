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
      "w-full rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-navy-dark placeholder:text-navy-dark/70 focus:outline-none focus:border-blue-accent focus:ring-2 focus:ring-blue-accent/20 transition-all duration-300";
  return (
    <div className="bg-linen py-24 lg:py-32">
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
          <p className="text-[16px] text-navy-dark/70 leading-relaxed max-w-md mb-8">
            A few lines about your site and goals is enough. A senior strategist
            replies within 24 hours with first questions — and a free visibility
            audit within 48.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="flex-none w-9 h-9 rounded-xl bg-blue-accent/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-accent" />
              </span>
              <span className="text-[14px] font-semibold text-navy-dark/70">
                Replies within 24 hours
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex-none w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-accent" />
              </span>
              <span className="text-[14px] font-semibold text-navy-dark/70">
                Free visibility audit within 48 hours
              </span>
            </div>
          </div>
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-blue-accent hover:text-navy-dark transition-colors duration-300"
          >
            Or book a 15-minute call instead
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
        <motion.div
          className="bg-linen rounded-3xl border border-line p-7 sm:p-9"
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
