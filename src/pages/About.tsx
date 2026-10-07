import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import { Wordmark } from "@/components/brand";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { CLIENTS } from "@/lib/clients";
import { asset, openBooking } from "@/lib/booking";
import { Network } from "./about-depth";

/**
 * /about — the agency page.
 *
 * Structure follows amplemarket.com/about: a short confident statement with
 * the people behind it, a recognition band, the founding thesis in the
 * founder's voice, a hard stats band, what we do, the team, how we got here,
 * client proof, and a three-up closing CTA.
 *
 * Register follows dofollow: we describe our own experience, approach and
 * results. There is no section about what other agencies get wrong — the
 * previous version opened with a refusal list and a founder letter about bad
 * link reports, which read as a small agency defining itself against the
 * industry rather than an established one describing its work.
 *
 * Surface rhythm: m w D w l w D l m — no two adjacent sections share a tone.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const STATS = [
  { v: 814, label: "Publications in our network" },
  { v: 1400, suffix: "+", label: "Placements delivered" },
  { v: 96, suffix: "%", label: "Indexation rate, 12 months" },
  { v: 40, suffix: "+", label: "Brands served" },
];

const PILLARS = [
  {
    t: "Research-led",
    d: "Every engagement opens with AuthorityOS™ research: how your category is read, which publications carry weight inside it, and which of your pages will respond first. The plan comes from the research, not from a catalogue.",
  },
  {
    t: "Editorial, not inventory",
    d: "Placements are earned through direct relationships with publications and editors we work with repeatedly. Our team writes to each publication's standard and takes the piece through their process.",
  },
  {
    t: "Senior delivery",
    d: "The strategist who scopes your programme is the one who runs it. Four people, twelve engagements, and no layer between you and the person making the decisions.",
  },
];

const SERVICES = [
  {
    to: "/services/link-building",
    t: "Link Building",
    d: "Editorial links that carry your commercial pages into positions that generate revenue.",
  },
  {
    to: "/services/digital-pr",
    t: "Digital PR",
    d: "Coverage, features and data stories in publications your buyers already read.",
  },
  {
    to: "/services/brand-mentions",
    t: "Brand Mentions",
    d: "References on the sources AI assistants cite when buyers ask about your category.",
  },
  {
    to: "/services/haro-links",
    t: "Expert Quotes",
    d: "Your specialists quoted as sources in journalism, with the attribution that follows.",
  },
];

const TEAM = [
  {
    name: "Talha Mahmood",
    role: "Founder & Strategy",
    d: "Sets the research approach and reviews every programme before it ships.",
    photo: asset("/images/talha-avatar.jpg"),
    tint: "bg-butter",
  },
  {
    role: "Outreach & Partnerships",
    d: "Owns the publisher network and the relationships every placement depends on.",
    photo: asset("/images/avatar-4.jpg"),
    tint: "bg-mint",
  },
  {
    role: "Editorial",
    d: "Writes to each publication's standard, and takes the piece through their process.",
    photo: asset("/images/hero-person.jpg"),
    tint: "bg-blush",
  },
  {
    role: "Research & Reporting",
    d: "Runs the AuthorityOS™ analysis, tracks indexation, and builds the monthly reporting.",
    photo: asset("/images/avatar-2.jpg"),
    tint: "bg-sky",
  },
];

const TIMELINE = [
  {
    year: "2023",
    t: "Founded",
    d: "Started as a specialist outreach practice serving three B2B clients, built on direct relationships with editors rather than bought inventory.",
  },
  {
    year: "2024",
    t: "The network",
    d: "Spent the year building the publisher network to scale — direct relationships, one editor at a time, across US, UK and Gulf markets.",
  },
  {
    year: "2025",
    t: "AuthorityOS™",
    d: "Formalised our research into a repeatable methodology, so the decision about where to place authority is made from category data rather than instinct.",
  },
  {
    year: "2026",
    t: "Answer engines",
    d: "Extended the same approach to AI search. The publications that shape Google's results are largely the ones shaping ChatGPT's answers.",
  },
];

const PROOF = [
  {
    text: "They came back with a ranked list of our pages and the authority gap on each one. Six months later, four of those pages are on the first page of results.",
    who: "Daniel Reyes",
    role: "Head of Growth, CapCut",
  },
  {
    text: "Our category pages had been stuck between positions 11 and 15 for two years. The programme moved three of them into the top five inside a quarter.",
    who: "Amira Khan",
    role: "Marketing Director, Ocuco",
  },
  {
    text: "They work like an extension of our in-house team. Senior people, reporting we can forward to the board, and a plan we can defend.",
    who: "Hana Al-Mansouri",
    role: "Content Lead, Khaleej Times",
  },
];

const CLOSERS = [
  {
    to: "/case-studies",
    t: "See the work",
    d: "Three engagements published in full, with the growth charts and the placements behind them.",
    cta: "Open the archive",
  },
  {
    to: "/pricing",
    t: "See what it costs",
    d: "Retainer ranges, what moves the number, and why we scope on delivered placements.",
    cta: "View pricing",
  },
  {
    to: "/contact",
    t: "Start a conversation",
    d: "Tell us where you want to rank. You get a senior reply within 24 hours and an audit inside 48.",
    cta: "Get in touch",
  },
];

/* ================================== page ================================== */

const About = () => (
  <PageLayout>
    <Seo
      title="About"
      description="A link building and digital PR agency built on a publisher network of 814 publications, AuthorityOS™ research, and senior delivery."
    />

    {/* ---- hero: short statement, the people behind it ---- */}
    <div className="relative overflow-hidden bg-mist pb-20 pt-32 lg:pb-24 lg:pt-40">
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About us
        </motion.p>
        <motion.h1
          className="text-[2.7rem] font-semibold leading-[1.03] tracking-[-0.035em] text-navy-dark sm:text-[3.4rem] lg:text-[4rem]"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          We help brands earn
          <br />
          <span className="text-navy-dark/65">their authority.</span>
        </motion.h1>
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-[17px] leading-[1.6] text-navy-dark/75"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          We are a link building and digital PR agency. We earn the editorial
          coverage, references and citations that make a brand credible to
          search engines, to AI assistants, and to the people reading both.
        </motion.p>
        <motion.p
          className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-navy-dark/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Founded by practitioners in 2023. Every engagement is run by the
          people who do the work.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center justify-center -space-x-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
        >
          {TEAM.map((m) => (
            <img
              key={m.role}
              src={m.photo}
              alt={m.name || m.role}
              className="h-16 w-16 rounded-full object-cover ring-4 ring-mist"
            />
          ))}
        </motion.div>
      </div>
    </div>

    {/* ---- recognition band ---- */}
    <div className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-8 text-center text-[12.5px] text-navy-dark/70"
          {...rise()}
        >
          Trusted by brands and agencies in eight countries
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:gap-x-16">
          {CLIENTS.map((c, i) => (
            <motion.span
              key={c.name}
              className="text-[19px] text-navy-dark/70"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Wordmark name={c.name} />
            </motion.span>
          ))}
        </div>
      </div>
    </div>

    {/* ---- stats ---- */}
    <div className="bg-navy-dark py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-4 sm:px-6 lg:grid-cols-4 lg:divide-x lg:divide-white/10 lg:px-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.03em] text-white lg:text-[3rem]">
              <CountUp to={s.v} suffix={s.suffix} />
            </p>
            <p className="mx-auto mt-3 max-w-[11rem] text-[12.5px] leading-snug text-white/70">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* ---- the thesis, in the founder's voice ---- */}
    <div className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        <div>
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
            {...rise()}
          >
            What we believe
          </motion.p>
          <motion.h2
            className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]"
            {...rise(0.05)}
          >
            Authority is earned
            <br />
            <span className="text-navy-dark/65">in public.</span>
          </motion.h2>

          {[
            "A brand's standing is not set by what it publishes about itself. It is set by what independent publications, journalists and communities say about it — and by how consistently they say it.",
            "That has been true for as long as search has existed. It is now true twice over: the same publications that shape Google's results are largely the ones shaping the answers buyers get from AI assistants.",
            "So the work has never really changed. Find the places that carry weight in a category, earn a genuine reference there, and do it often enough that it compounds. What has changed is how precisely we can identify which places matter.",
          ].map((p, i) => (
            <motion.p
              key={i}
              className="mt-5 text-[16px] leading-[1.65] text-navy-dark/80"
              {...rise(0.1 + i * 0.05)}
            >
              {p}
            </motion.p>
          ))}

          <motion.div
            className="mt-9 flex items-center gap-4 border-t border-line pt-7"
            {...rise(0.25)}
          >
            <img
              src={asset("/images/talha-avatar.jpg")}
              alt="Talha Mahmood"
              className="h-14 w-14 rounded-full object-cover ring-4 ring-white"
            />
            <div>
              <span className="block font-hand text-[26px] leading-none text-navy-dark">
                Talha Mahmood
              </span>
              <span className="mt-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                Founder & Strategy
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div className="grid gap-4" {...rise(0.1)}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.t}
              className="rounded-2xl border border-line bg-mist p-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              <h3 className="mb-2.5 text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
                {p.t}
              </h3>
              <p className="text-[14px] leading-relaxed text-navy-dark/75">
                {p.d}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* ---- the network (data) ---- */}
    <Network />

    {/* ---- what we do ---- */}
    <div className="bg-linen py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-2xl" {...rise()}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
            What we do
          </p>
          <h2 className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]">
            Four services,
            <br />
            <span className="text-navy-dark/65">one discipline.</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to={s.to}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-lift"
              >
                <h3 className="mb-2.5 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                  {s.t}
                </h3>
                <p className="mb-6 text-[14px] leading-relaxed text-navy-dark/75">
                  {s.d}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-navy-dark">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* ---- team ---- */}
    <div className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
          {...rise()}
        >
          <h2 className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]">
            Small team,
            <br />
            <span className="text-navy-dark/65">senior hands.</span>
          </h2>
          <p className="max-w-xs text-[14px] leading-relaxed text-navy-dark/70">
            Four people, each accountable for one part of the pipeline. The
            strategist who scopes your programme is the one who runs it.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.role}
              className="overflow-hidden rounded-2xl border border-line"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={`${m.tint} aspect-[4/3] overflow-hidden`}>
                <img
                  src={m.photo}
                  alt={m.name || m.role}
                  className="h-full w-full object-cover mix-blend-luminosity opacity-90"
                />
              </div>
              <div className="p-6">
                {m.name && (
                  <p className="mb-1.5 text-[15.5px] font-semibold leading-none text-navy-dark">
                    {m.name}
                  </p>
                )}
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
                  {m.role}
                </p>
                <p className="text-[13.5px] leading-relaxed text-navy-dark/75">
                  {m.d}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* ---- how we got here ---- */}
    <div className="bg-navy-dark py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-14 max-w-2xl" {...rise()}>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            How we got here
          </p>
          <h2 className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.6rem]">
            Three years of
            <br />
            <span className="text-white/70">building the same thing.</span>
          </h2>
        </motion.div>

        <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((e, i) => (
            <motion.li
              key={e.year}
              className="border-t border-white/15 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              <p className="mb-3 text-[13px] font-bold tabular-nums text-white/70">
                {e.year}
              </p>
              <h3 className="mb-2.5 text-[17px] font-semibold tracking-[-0.02em] text-white">
                {e.t}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-white/70">
                {e.d}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>

    {/* ---- client proof ---- */}
    <div className="bg-linen py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-12 max-w-2xl text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.6rem]"
          {...rise()}
        >
          What clients say
          <br />
          <span className="text-navy-dark/65">about working with us.</span>
        </motion.h2>

        <div className="grid gap-4 lg:grid-cols-3">
          {PROOF.map((p, i) => (
            <motion.figure
              key={p.who}
              className="flex h-full flex-col rounded-2xl border border-line bg-white p-7"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
            >
              <blockquote className="mb-7 text-[15.5px] leading-[1.55] text-navy-dark">
                {"“"}
                {p.text}
                {"”"}
              </blockquote>
              <figcaption className="mt-auto border-t border-line pt-5">
                <span className="block text-[14px] font-semibold text-navy-dark">
                  {p.who}
                </span>
                <span className="mt-1 block text-[12.5px] text-navy-dark/70">
                  {p.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </div>

    {/* ---- closing, three ways in ---- */}
    <div className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-12 text-center text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.4rem]"
          {...rise()}
        >
          {"Where would you "}
          <span className="text-navy-dark/65">like to start?</span>
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-3">
          {CLOSERS.map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.09 }}
            >
              <Link
                to={c.to}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-lift"
              >
                <h3 className="mb-2.5 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                  {c.t}
                </h3>
                <p className="mb-6 text-[14px] leading-relaxed text-navy-dark/75">
                  {c.d}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-navy-dark">
                  {c.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 text-center" {...rise(0.1)}>
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-xl bg-navy-dark px-8 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
          >
            Book a 30-minute call
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </div>
  </PageLayout>
);

export default About;
