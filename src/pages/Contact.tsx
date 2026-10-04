import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Mail } from "lucide-react";
import { FigFounder } from "@/components/LineArt";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

const CONTACT_EMAIL = "contact@talhamahmood.com";

const Contact = () => {
  const [e, s] = useState({
      name: "",
      email: "",
      website: "",
      service: "Link Building",
      budget: "Not sure yet",
      message: "",
    }),
    a = (d) => (h) => s({ ...e, [d]: h.target.value }),
    r = () => {
      const d = encodeURIComponent(
          `Inquiry — ${e.service} (${e.website || e.name})`,
        ),
        h = encodeURIComponent(`Name: ${e.name}
Email: ${e.email}
Website: ${e.website}
Service: ${e.service}
Budget: ${e.budget}

${e.message}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${d}&body=${h}`;
    },
    c =
      "w-full bg-transparent border-0 border-b border-line px-0 py-3 text-[15px] text-navy-dark placeholder:text-navy-dark/70 focus:outline-none focus:border-navy-dark transition-colors duration-300",
    u =
      "block text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase mb-1";
  return (
    <PageLayout>
      <Seo
        title="Contact"
        description="Tell us where you want to rank and get cited. A senior strategist replies within 24 hours, with a free visibility audit inside 48."
      />
      <div className="bg-white pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-24">
          <div>
            <motion.p
              className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-navy-dark leading-[1.05] tracking-[-0.02em] mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Let's talk about
              <br />
              <span className="text-navy-dark/70">your visibility.</span>
            </motion.h1>
            <motion.p
              className="text-[17px] text-navy-dark/70 leading-relaxed mb-12 max-w-sm"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              Tell us where you want to rank and get cited. A senior strategist
              replies within 24 hours — with a free audit inside 48.
            </motion.p>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              {[
                {
                  icon: Clock,
                  t: "Reply within 24 hours",
                  d: "From a strategist, not an auto-responder.",
                },
                {
                  icon: Check,
                  t: "Free visibility audit",
                  d: "Rankings, citations, and the gap to close.",
                },
                {
                  icon: Mail,
                  t: CONTACT_EMAIL,
                  d: "Or email us directly, any time.",
                },
              ].map((d) => (
                <div
                  key={d.t}
                  className="flex gap-4 pb-6 border-b border-line last:border-0"
                >
                  <d.icon className="w-4 h-4 text-blue-accent flex-none mt-1" />
                  <div>
                    <p className="text-[14.5px] font-semibold text-navy-dark leading-none mb-1.5">
                      {d.t}
                    </p>
                    <p className="text-[13px] text-navy-dark/70">{d.d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <div className="hidden lg:block text-navy-dark/70 mt-12">
              <FigFounder className="w-24 h-auto" />
            </div>
            <motion.button
              onClick={openBooking}
              className="mt-10 inline-flex items-center gap-2 min-h-[44px] text-[14px] font-semibold text-navy-dark hover:text-blue-accent transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              Prefer a 15-minute call?
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              <label className="block">
                <span className={u}>Your name</span>
                <input
                  className={c}
                  placeholder="Jane Smith"
                  value={e.name}
                  onChange={a("name")}
                />
              </label>
              <label className="block">
                <span className={u}>Email</span>
                <input
                  className={c}
                  placeholder="jane@company.com"
                  type="email"
                  value={e.email}
                  onChange={a("email")}
                />
              </label>
              <label className="block">
                <span className={u}>Website</span>
                <input
                  className={c}
                  placeholder="yourbrand.com"
                  value={e.website}
                  onChange={a("website")}
                />
              </label>
              <label className="block">
                <span className={u}>Service</span>
                <select className={c} value={e.service} onChange={a("service")}>
                  <option>Link Building</option>
                  <option>Digital PR</option>
                  <option>Brand Mentions / AI Visibility</option>
                  <option>HARO / Expert placements</option>
                  <option>White-label for agency</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className={u}>Monthly budget (optional)</span>
                <select className={c} value={e.budget} onChange={a("budget")}>
                  <option>Not sure yet</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $2,500</option>
                  <option>$2,500 – $5,000</option>
                  <option>$5,000+</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className={u}>What are you trying to achieve?</span>
                <textarea
                  className={`${c} min-h-[110px] resize-y`}
                  placeholder="Keywords you want to rank for, queries you want to be cited in…"
                  value={e.message}
                  onChange={a("message")}
                />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-12">
              <button
                onClick={r}
                className="group inline-flex items-center gap-2 bg-navy-dark hover:bg-navy text-white rounded-xl px-9 py-4 text-[14px] font-semibold transition-colors duration-300"
              >
                Send inquiry
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <span className="text-[12px] text-navy-dark/70">
                Opens your email app — nothing is stored on this site.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
