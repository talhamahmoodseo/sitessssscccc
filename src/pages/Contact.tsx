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
 * /contact
 *
 * Shapes kept deliberately distinct from the rest of the site:
 *   - the form is a floating white card on a clay ground, not a white slab
 *   - a credentials strip interlocks the clay hero with the amber band below
 *   - the amber band is the page's one saturated moment: the two clocks
 *   - a horizontal numbered rail (nothing else on the site runs left-to-right)
 *   - a dark two-column pre-call FAQ
 *   - a three-way off-ramp for people who are not ready to talk yet
 *
 * Surface rhythm: clay → mark → mist → navy-dark → stone (CTABand closes dark).
 * Five distinct surfaces, no two adjacent alike, no run of light sections
 * longer than one.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ============================= hero + form ============================= */

const REASSURANCE = [
  {
    icon: Clock,
    t: "Reply within 24 hours",
    d: "From the senior strategist who would run your account.",
  },
  {
    icon: Check,
    t: "Free visibility audit",
    d: "Your link profile, the pages closest to moving, and the citation gap.",
  },
  {
    icon: Mail,
    t: CONTACT_EMAIL,
    d: "Or email us directly, any time.",
  },
];

const FORM_SERVICES = [
  "Link Building",
  "Digital PR",
  "Brand Mentions / AI Visibility",
  "HARO / Expert placements",
  "White-label for agency",
  "Something else",
];

const FORM_BUDGETS = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
];

const Enquiry = () => {
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
      "block text-[11px] font-semibold tracking-[0.14em] text-navy-dark/70 uppercase mb-1",
    g =
      "mb-5 flex items-baseline gap-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70";

  return (
    <div className="bg-mist pb-28 pt-36 lg:pb-32 lg:pt-44">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* ---------------------------------------------------- left rail */}
          <div>
            <motion.p
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.p>
            <motion.h1
              className="text-balance mb-7 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-navy-dark sm:text-5xl lg:text-[3.3rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            >
              {"Tell Us Where You Want to Rank. "}
              <span className="text-navy-dark/65">
                We&rsquo;ll Show You What It Takes.
              </span>
            </motion.h1>
            <motion.p
              className="mb-10 max-w-sm text-[16.5px] leading-[1.6] text-navy-dark/75"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            >
              Send the site and the pages that matter. A senior strategist
              replies within 24 hours, and an AuthorityOS&trade; visibility
              audit follows inside 48 — yours to keep whatever you decide.
            </motion.p>

            {/* bordered inset panel on the clay ground */}
            <motion.div
              className="rounded-3xl border border-line p-6 lg:p-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            >
              <div className="divide-y divide-line">
                {REASSURANCE.map((d) => (
                  <div key={d.t} className="flex gap-4 py-4 first:pt-0">
                    <d.icon className="mt-1 h-4 w-4 flex-none text-navy-dark" />
                    <div>
                      <p className="mb-1.5 text-[14.5px] font-semibold leading-none text-navy-dark">
                        {d.t}
                      </p>
                      <p className="text-[13px] leading-relaxed text-navy-dark/75">
                        {d.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* pastel feature panel behind the figure */}
            <motion.div
              className="mt-5 flex items-center gap-5 rounded-3xl border border-line bg-white px-6 py-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              <FigFounder className="h-auto w-12 flex-none text-navy-dark/70" />
              <p className="text-[13.5px] leading-relaxed text-navy-dark/80">
                Every audit is written by the strategist who would run the
                programme, and reviewed before it is sent.
              </p>
            </motion.div>

            <motion.button
              onClick={openBooking}
              className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-navy-dark transition-colors duration-300 hover:text-blue-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
            >
              Prefer a 15-minute call?
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </motion.button>
          </div>

          {/* ------------------------------- the form, floating on the clay */}
          <motion.div
            className="rounded-[1.6rem] border border-line bg-white p-7 shadow-deep sm:p-9 lg:p-10"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            <p className={g}>
              <span>Project brief</span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="font-semibold tracking-[0.1em]">Six fields</span>
            </p>

            <p className="mb-8 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70">
              {"01 / You"}
            </p>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
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
              <label className="block sm:col-span-2">
                <span className={u}>Website</span>
                <input
                  className={c}
                  placeholder="yourbrand.com"
                  value={e.website}
                  onChange={a("website")}
                />
              </label>
            </div>

            <p className="mb-8 mt-12 border-t border-line pt-8 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70">
              {"02 / The work"}
            </p>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <label className="block">
                <span className={u}>Service</span>
                <select className={c} value={e.service} onChange={a("service")}>
                  {FORM_SERVICES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className={u}>Monthly budget (optional)</span>
                <select className={c} value={e.budget} onChange={a("budget")}>
                  {FORM_BUDGETS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
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

            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-line pt-8">
              <button
                onClick={r}
                className="group inline-flex items-center gap-2 rounded-xl bg-navy-dark px-9 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-navy"
              >
                Send inquiry
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <span className="text-[12px] text-navy-dark/70">
                Opens your email app — nothing is stored on this site.
              </span>
            </div>
          </motion.div>
        </div>

        {/* credentials strip: interlocks the clay hero with the amber band */}
        <motion.div
          className="relative z-10 -mb-44 mt-16 flex flex-col gap-6 rounded-2xl border border-line bg-white px-7 py-6 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:gap-10 lg:-mb-48"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div>
            <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70">
              Recent programmes
            </p>
            <p className="text-[15.5px] font-semibold tracking-[-0.01em] text-navy-dark">
              {"CapCut · Ocuco · Khaleej Times"}
            </p>
          </div>
          <div className="flex items-center gap-5 border-t border-line pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
            <p className="text-[2.1rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark tabular-nums">
              96%
            </p>
            <p className="max-w-[16rem] text-[12.5px] leading-snug text-navy-dark/75">
              of placements earned in the last twelve months were indexed inside
              six weeks.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ============================== the clocks ============================== */

const CLOCKS = [
  {
    v: "24h",
    t: "A reply, from a strategist",
    d: "Not a confirmation screen. The reply names what we would look at first on your site, and whether any of it falls outside what we do well.",
  },
  {
    v: "48h",
    t: "An AuthorityOS™ visibility audit",
    d: "Your current link profile, the pages sitting closest to moving, and the queries where AI engines name a competitor instead of you.",
  },
];

/** The page's one saturated moment. Ink on amber is 12.7:1. */
const Clocks = () => (
  <div className="bg-white pb-20 pt-56 lg:pb-24 lg:pt-60">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/80">
          Two clocks
        </p>
        <h2 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
          You Send It Today.
          <br />
          You Hear Back Tomorrow.
        </h2>
      </motion.div>

      <dl className="mt-12 grid gap-10 border-t border-navy-dark/20 pt-10 sm:grid-cols-2 sm:gap-16">
        {CLOCKS.map((k, i) => (
          <motion.div key={k.v} {...rise(0.06 + i * 0.08)}>
            <dt className="flex items-baseline gap-4">
              <span className="text-[3.4rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums sm:text-[4rem]">
                {k.v}
              </span>
              <span className="text-[15.5px] font-bold tracking-[-0.01em] text-navy-dark">
                {k.t}
              </span>
            </dt>
            <dd className="mt-4 max-w-md text-[14.5px] leading-relaxed text-navy-dark/80">
              {k.d}
            </dd>
          </motion.div>
        ))}
      </dl>

      <motion.p className="mt-10 text-[13px] text-navy-dark/80" {...rise(0.12)}>
        Both clocks run on working days. If an audit needs longer because the
        site is larger than it looked, you hear that inside the 24 hours too.
      </motion.p>
    </div>
  </div>
);

/* ============================ numbered rail ============================ */

const AFTER = [
  {
    n: "01",
    t: "The audit lands",
    d: "Your link profile against the category, the pages closest to moving, and which competitors AI engines name instead of you.",
  },
  {
    n: "02",
    t: "A 30-minute call",
    d: "We walk the audit together and you can press on any number in it. You will know by the end whether there is a case for doing anything at all.",
  },
  {
    n: "03",
    t: "A scoped proposal",
    d: "Target pages, authority range, monthly volume and the figure — plus whether you review each domain or leave sourcing to us.",
  },
  {
    n: "04",
    t: "The first month",
    d: "Research, the priority order, and the opening placements. Indexation takes two to six weeks, so month one is groundwork you can check.",
  },
];

const AfterRail = () => (
  <div className="bg-mist py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-14 max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          What happens next
        </p>
        <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Four Steps.
          <span className="text-navy-dark/65">
            You Can Stop at Any of Them.
          </span>
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
              <span className="relative z-10 mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-navy-dark text-[13px] font-bold tabular-nums text-white shadow-soft">
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

/* ============================= pre-call FAQ ============================= */

const PRECALL = [
  {
    q: "Who will I be talking to?",
    a: "A senior strategist, and the same one throughout. The person who answers your form is the person who would plan the programme and decide where each placement points. If part of what you need sits outside what we do well, they will tell you in that first reply.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Three months. Indexation alone takes two to six weeks per placement, so a shorter term cannot show a result either way. After that it runs month to month.",
  },
  {
    q: "Can you work under NDA, or white-label?",
    a: "Both. Roughly a third of our work is delivered white-label for other agencies: the same research and placements under your branding, reporting you can forward without editing, and we stay invisible on client calls.",
  },
  {
    q: "What if my site is not ready for links yet?",
    a: "The audit will say so. Authority pointed at a thin page is authority spent for nothing, so where a page needs depth first we scope that work ahead of the placements.",
  },
];

const PreCall = () => (
  <div className="bg-navy-dark py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="mb-14 max-w-2xl" {...rise()}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Before you send it
        </p>
        <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          The Four Questions
          <span className="text-white/70">That Come Up First.</span>
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

      {/* bordered inset panel on the dark ground */}
      <motion.figure
        className="mt-16 rounded-3xl border border-white/20 px-7 py-8 sm:px-10 sm:py-9"
        {...rise(0.08)}
      >
        <blockquote className="text-[1.15rem] leading-[1.5] tracking-[-0.02em] text-white sm:text-[1.3rem]">
          {
            "“They work like an extension of our in-house team. Senior people, reporting we can forward to the board without editing, and a plan we can defend.”"
          }
        </blockquote>
        <figcaption className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/70">
          {"Hana Al-Mansouri · Content Lead, Khaleej Times"}
        </figcaption>
      </motion.figure>
    </div>
  </div>
);

/* ============================== off-ramps ============================== */

const OFFRAMPS = [
  {
    to: "/case-studies",
    t: "Read a case file first",
    d: "Three engagements published in full — the growth curves, every placement, and the pages each one was pointed at.",
    cta: "Open the archive",
  },
  {
    to: "/pricing",
    t: "See what it costs",
    d: "Retainer ranges, what moves the number up or down, and why we scope on delivered placements rather than hours.",
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
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.h2
        className="text-balance mb-12 max-w-xl text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] text-navy-dark sm:text-[2rem]"
        {...rise()}
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
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <Link
              to={o.to}
              className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-lift transition-shadow duration-500 hover:shadow-deep"
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

/* ================================= page ================================= */

const Contact = () => (
  <PageLayout>
    <Seo
      title="Contact"
      description="Tell us where you want to rank and get cited. A senior strategist replies within 24 hours, with an AuthorityOS™ visibility audit inside 48."
    />
    <Enquiry />
    <Clocks />
    <AfterRail />
    <PreCall />
    <OffRamps />
  </PageLayout>
);

export default Contact;
