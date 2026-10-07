import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Mail } from "lucide-react";
import { FigFounder } from "@/components/LineArt";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";

const CONTACT_EMAIL = "contact@talhamahmood.com";

/**
 * Everything below the form.
 *
 * Shapes chosen to stay distinct from the rest of the site: a horizontal
 * numbered rail (nothing else on the site runs left-to-right), a dark
 * two-column pre-call FAQ, and a three-way off-ramp for people who are not
 * ready to talk yet.
 */

const AFTER = [
  {
    n: "01",
    t: "A reply, within 24 hours",
    d: "From whoever will actually run your account. If we are not the right fit we say so in that first reply rather than booking a call to tell you.",
  },
  {
    n: "02",
    t: "A free visibility audit",
    d: "Inside 48 hours: your current link profile, the pages closest to moving, and which competitors AI engines name instead of you.",
  },
  {
    n: "03",
    t: "A 30-minute call",
    d: "We walk the audit together. No deck. You will know by the end whether there is a case for doing anything at all.",
  },
  {
    n: "04",
    t: "A scoped proposal",
    d: "Target pages, authority range, monthly volume and the figure. One page, no lock-in beyond the agreed term.",
  },
];

const AfterRail = () => (
  <div className="bg-linen py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          What happens next
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Four steps, and you can
          <br />
          <span className="text-navy-dark/65">stop at any of them</span>
        </h2>
      </motion.div>

      <div className="relative">
        <div
          className="absolute left-0 right-0 top-[21px] hidden h-px bg-line lg:block"
          aria-hidden="true"
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {AFTER.map((s, i) => (
            <motion.li
              key={s.n}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              <span className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-navy-dark text-[13px] font-bold text-white tabular-nums">
                {s.n}
              </span>
              <h3 className="mb-2 text-[16.5px] font-semibold leading-snug text-navy-dark">
                {s.t}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
                {s.d}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

const PRECALL = [
  {
    q: "Will I be talking to a salesperson?",
    a: "No. There are four of us. The person who replies to your form is the person who would run the account, and they will tell you when something is outside what we do well.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Three months, because indexation alone takes two to six weeks and anything shorter cannot show a result. After that it runs month to month.",
  },
  {
    q: "Can you work under NDA, or white-label?",
    a: "Both. Roughly a third of our work is delivered white-label for other agencies: the same research and placements under your branding, reporting you can forward without editing, and we stay invisible on client calls.",
  },
  {
    q: "What if my site is not ready for links yet?",
    a: "We will say so in the audit. Pointing authority at a thin page wastes the link, and we would rather tell you that before you pay us than four months in.",
  },
];

const PreCall = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-14 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Before you send it
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          The four things people
          <br />
          <span className="text-white/70">ask us first</span>
        </h2>
      </motion.div>

      <dl className="grid gap-x-16 gap-y-10 sm:grid-cols-2">
        {PRECALL.map((f, i) => (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
          >
            <dt className="mb-3 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white">
              {f.q}
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-white/70">
              {f.a}
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </div>
);

const OFFRAMPS = [
  {
    to: "/case-studies",
    t: "Read a case file first",
    d: "Three engagements published in full — growth charts, every placement, and the domains we rejected.",
    cta: "Open the archive",
  },
  {
    to: "/pricing",
    t: "See what it costs",
    d: "Retainer ranges, what moves the number up or down, and why we scope on placements rather than hours.",
    cta: "See pricing",
  },
  {
    to: "/blog",
    t: "Judge the thinking",
    d: "How AI engines pick sources, linked versus unlinked mentions, and what a DR 70 placement actually involves.",
    cta: "Read the writing",
  },
];

const OffRamps = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="mb-12 max-w-xl text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] text-navy-dark sm:text-[2rem]"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {"Not ready to talk? "}
        <span className="text-navy-dark/65">
          Three ways to check us out quietly.
        </span>
      </motion.h2>

      <div className="grid gap-5 md:grid-cols-3">
        {OFFRAMPS.map((o, i) => (
          <motion.div
            key={o.to}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09 }}
          >
            <Link
              to={o.to}
              className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-lift"
            >
              <h3 className="mb-2.5 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                {o.t}
              </h3>
              <p className="mb-6 text-[14px] leading-relaxed text-navy-dark/75">
                {o.d}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-navy-dark">
                {o.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

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
      <AfterRail />
      <PreCall />
      <OffRamps />
    </PageLayout>
  );
};

export default Contact;
