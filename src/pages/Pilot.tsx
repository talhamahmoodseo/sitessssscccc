import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, CircleCheck, Lock, UserRound, X } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { Avatar, ResultCard } from "@/components/proof";
import { firstVisit, track } from "@/lib/analytics";
import { caseBySlug } from "@/lib/cases";
import { PILOT } from "@/lib/pilot";
import { PER_LINK, TRIAL_PRICE, usd } from "@/lib/pricing";
import { LogoStrip } from "@/sections/ClientLogos";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pilot, round 14: the free three-link pilot, by application, after the
 * structure of uSERP's /pilot (the owner's brief, 31 Oct 2026). The bar on
 * every page (components/PilotBar.tsx) links here.
 *
 * Numbers live in lib/pilot.ts (links, spots a month, thresholds, value).
 * The application posts to the same endpoint as the contact form, so it
 * lands in the owner's inbox and under Enquiries in wp-admin, marked
 * "Free pilot application". Like uSERP's, the page is noindex: it converts
 * visitors who are already on the site and stays out of Google.
 */

const { links: N, spots: SPOTS, value: VALUE, revenue: REV, employees: EMP, days: DAYS } = PILOT;
const EMAIL = "team@editorialhq.com";

/* ------------------------------------------------------------ application */

const REVENUE = ["Under $1M", "$1M to $5M", "$5M to $20M", "$20M to $100M", "$100M+"];
const PEOPLE = ["1 to 9", "10 to 24", "25 to 99", "100 to 499", "500+"];

const contactApi = () =>
  (typeof window !== "undefined" && (window as unknown as { __TM_CONTACT_API__?: string }).__TM_CONTACT_API__) || "";

const Apply = ({ id }: { id: string }) => {
  const [f, setF] = useState({
    name: "",
    email: "",
    role: "",
    website: "",
    revenue: "",
    people: "",
    pages: "",
    owner: false,
  });
  const [trap, setTrap] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) =>
    setF({ ...f, [k]: e.target.value });

  const message = () =>
    [
      `FREE PILOT APPLICATION (${N} links)`,
      `Job title: ${f.role}`,
      `Annual revenue: ${f.revenue}`,
      `Employees: ${f.people}`,
      `SEO budget owner joins the call: ${f.owner ? "yes" : "no"}`,
      "",
      "Pages they want to rank:",
      f.pages || "(not given)",
    ].join("\n");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const api = contactApi();
    if (!api) {
      // no WordPress endpoint (local or static hosting): fall back to email
      const s = encodeURIComponent(`Free pilot application: ${f.website}`);
      const b = encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nWebsite: ${f.website}\n\n${message()}`);
      window.location.href = `mailto:${EMAIL}?subject=${s}&body=${b}`;
      return;
    }
    setState("sending");
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          website: f.website,
          service: "Free pilot application",
          package: `Free pilot (${N} links)`,
          found: "",
          message: message(),
          source: firstVisit(),
          page: window.location.pathname + window.location.search,
          company_site: trap,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "");
      track("generate_lead", { method: "pilot", service: "Free pilot" });
      setState("sent");
    } catch (err) {
      setError((err as Error).message || "");
      setState("error");
    }
  };

  const field =
    "mt-1.5 w-full rounded-xl bg-mist px-3.5 py-2.5 text-[14.5px] text-navy-dark ring-1 ring-line placeholder:text-navy-dark/45 focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-dark/30";
  const label = "block text-[12.5px] font-semibold text-navy-dark";

  if (state === "sent") {
    return (
      <div className="rounded-[26px] bg-white p-7 text-left shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)]" role="status">
        <CircleCheck className="h-9 w-9 text-verified" aria-hidden="true" />
        <p className="mt-4 text-[22px] font-semibold tracking-[-0.02em] text-navy-dark">
          Thanks{f.name ? `, ${f.name.split(" ")[0]}` : ""}. Your application is in.
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-navy-dark/75">
          A person reads every one. We'll email {f.email} within 24 hours to
          say whether you're approved, and if you are, we'll set up the call.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[26px] bg-white p-6 text-left shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] sm:p-7"
      aria-labelledby={`${id}-title`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
        Apply for the pilot
      </p>
      <h2 id={`${id}-title`} className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-navy-dark">
        See if your business qualifies
      </h2>
      <p className="mt-1 text-[13.5px] text-navy-dark/70">
        Takes about two minutes. We reply within 24 hours.
      </p>

      <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
        <label className={label}>
          Name
          <input required value={f.name} onChange={set("name")} className={field} autoComplete="name" />
        </label>
        <label className={label}>
          Job title
          <input required value={f.role} onChange={set("role")} className={field} autoComplete="organization-title" />
        </label>
        <label className={label}>
          Work email
          <input required type="email" value={f.email} onChange={set("email")} className={field} autoComplete="email" />
        </label>
        <label className={label}>
          Company website
          <input required value={f.website} onChange={set("website")} placeholder="yourbrand.com" className={field} autoComplete="url" />
        </label>
        <label className={label}>
          Annual revenue
          <select required value={f.revenue} onChange={set("revenue")} className={field}>
            <option value="" disabled>
              Choose one
            </option>
            {REVENUE.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={label}>
          Employees
          <select required value={f.people} onChange={set("people")} className={field}>
            <option value="" disabled>
              Choose one
            </option>
            {PEOPLE.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={`${label} sm:col-span-2`}>
          The pages you'd like to rank <span className="font-normal text-navy-dark/55">(optional)</span>
          <textarea
            value={f.pages}
            onChange={set("pages")}
            rows={2}
            placeholder="yourbrand.com/product, yourbrand.com/compare"
            className={`${field} resize-none`}
          />
        </label>
      </div>
      <label className="mt-4 flex items-start gap-2.5 text-[13px] leading-snug text-navy-dark/80">
        <input
          type="checkbox"
          required
          checked={f.owner}
          onChange={(e) => setF({ ...f, owner: e.target.checked })}
          className="mt-0.5 h-4 w-4 flex-none accent-[rgb(var(--ink))]"
        />
        I own our SEO budget, or the person who does will join the 30-minute call.
      </label>
      {/* people never see this one; bots fill it in */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
        name="company_site"
      />

      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-dark px-5 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : "Send my application"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      {state === "error" && (
        <p className="mt-3 text-[13px] text-gap" role="alert">
          {error || "We couldn't send that."} You can also email{" "}
          <a href={`mailto:${EMAIL}`} className="font-semibold underline">
            {EMAIL}
          </a>
          .
        </p>
      )}
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-navy-dark/65">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3 w-3" aria-hidden="true" />
          No card, no contract
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserRound className="h-3.5 w-3.5" aria-hidden="true" />
          Read by a person, not a bot
        </span>
      </p>
    </form>
  );
};

/* ------------------------------------------------------------------- copy */

const WHY = [
  {
    t: "A pitch is a promise. A link is proof.",
    d: "Every agency shows the same logos and the same charts. A live placement on a real publication, pointing at your page, is something you can open and check yourself.",
  },
  {
    t: "It costs us less than chasing you.",
    d: "Weeks of calls, proposals and follow-ups cost more than earning three links. We'd rather put that effort into work you get to keep.",
  },
  {
    t: "The only catch is the obvious one.",
    d: "We think that once you see the placements, you'll want more. If you don't, you keep the links and that's the end of it. No invoice, nothing to cancel.",
  },
];

const VERSUS: [string, string][] = [
  ["Sample links from other clients' campaigns", `${N} links earned for your own pages`],
  ["Case studies you have to take on trust", "Placements you can open in a browser"],
  ["A contract before the first link", "No contract, no card, nothing to cancel"],
  ["You find out about quality in month three", `You see the quality in about ${DAYS} days`],
];

const STEPS = [
  {
    t: "Apply in two minutes",
    d: "Tell us about your company and the pages you care about. It's a short form, and a person reads every one.",
  },
  {
    t: "Hear back within 24 hours",
    d: "We look at your site and your niche by hand and email you to say whether you're approved. If you are, we set up the call.",
  },
  {
    t: "Pick your pages on a 30-minute call",
    d: "With whoever owns your SEO budget. We look at the pages that outrank you, agree where links will help most, and tell you honestly how big the gap is.",
  },
  {
    t: `We earn ${N} editorial links`,
    d: "Outreach to publications in or next to your niche. Same team, same site checks, same standard as paid work. They stay live whatever you decide.",
  },
];

const NUMBERS = [
  { v: "2 min", l: "to apply" },
  { v: "24 h", l: "to hear if you're approved" },
  { v: "30 min", l: "one call to choose the pages" },
  { v: `~${DAYS} days`, l: `from the call to all ${N} live` },
  { v: "$0", l: "no card, no contract" },
];

const INCLUDED = [
  {
    t: "Real publications",
    d: "Sites with their own editors, real readers and real organic traffic. No link farms, no private blog networks, no sites that exist to sell links.",
  },
  {
    t: "Editorial links",
    d: "Inside relevant articles, not in author bios, footers or sidebars.",
  },
  {
    t: "Your pages, your priorities",
    d: "Pointed at the pages you choose on the call, with anchors planned around what already ranks.",
  },
  {
    t: "A reason for every link",
    d: "Each placement comes with the site, its authority and traffic, the anchor, and why that link matters for that page.",
  },
  {
    t: "Yours to keep",
    d: "The links stay live whether or not you ever pay us a dollar.",
  },
];

const EXAMPLE = [
  { site: "Industry publication", d: "DR 70+ · in-article link to your product page", s: "Live" },
  { site: "Business news site", d: "DR 60+ · in-article link to your service page", s: "Live" },
  { site: "Niche blog with real readers", d: "DR 50+ · in-article link to a category page", s: "In editing" },
];

const FAQS = [
  {
    q: "Is this really free?",
    a: `Yes. No card, no contract, no setup fee and no invoice later. If you're approved, we earn ${N} editorial links to your pages and you keep them.`,
  },
  {
    q: "What's the catch?",
    a: "We hope you'll like the placements enough to hire us for more. If you don't, nothing else happens. You keep the links.",
  },
  {
    q: "Who qualifies?",
    a: `Established businesses with ${REV}+ in annual revenue and ${EMP}+ employees, a live site with pages worth ranking, and the person who owns the SEO budget on the call. It's ${SPOTS} businesses a month.`,
  },
  {
    q: `Why only ${SPOTS} a month?`,
    a: "Free placements never jump ahead of paying clients. When the month's spots are taken, applications roll to the next month.",
  },
  {
    q: "How fast will we hear back?",
    a: "Within 24 hours. A person reviews your site and niche and emails you either way.",
  },
  {
    q: "Will three links move our rankings?",
    a: "On a competitive page, not on their own, and we won't pretend otherwise. On the call we tell you roughly how many links stand between your page and the ones outranking it. The pilot covers the first three and shows you what the rest would look like.",
  },
  {
    q: "What kind of sites will the links be on?",
    a: "Real publications in or next to your niche, with their own editors and readers, that pass the same 7-point site check as every paid placement.",
  },
  {
    q: "We already have an agency or an in-house team. Can we apply?",
    a: "Yes. The pilot is a simple way to compare our links with what you're getting now.",
  },
  {
    q: "Can agencies apply for a client?",
    a: `Not for the free pilot. Agencies can still test us with a single paid trial link (${usd(TRIAL_PRICE)}) and order white label after that.`,
  },
  {
    q: "What happens after the three links?",
    a: `Nothing, unless you want more. If you do, packages start at 3 links at ${usd(PER_LINK)} a placement, with no contract.`,
  },
];

const Ok = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <li className={`flex items-start gap-2.5 text-[14.5px] ${dark ? "text-white/80" : "text-navy-dark"}`}>
    <Check className={`mt-0.5 h-4 w-4 flex-none ${dark ? "text-white/60" : "text-verified"}`} aria-hidden="true" />
    {children}
  </li>
);

/* ------------------------------------------------------------------- page */

const Pilot = () => (
  <PageLayout navOnDark cta={false}>
    <Seo
      title={`Free Link Building Pilot: ${N} Backlinks`}
      description={`Get ${N} editorial backlinks free, no catch and no contract. For established businesses that qualify, ${SPOTS} a month, by application.`}
      noindex
    />

    {/* 1. the offer, and the application */}
    <section className="relative overflow-hidden bg-navy-dark pb-20 pt-32 lg:pb-28 lg:pt-40">
      <DarkGlow className="-left-40 top-0 h-[560px] w-[780px] opacity-55" />
      <DarkGlow className="-right-56 bottom-[-120px] h-[480px] w-[700px] opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14 lg:px-8">
        <div className="lg:pt-6">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Free link building pilot · by application
          </motion.p>
          <h1 className="mt-5">
            <motion.span
              className="block text-[2.5rem] font-semibold leading-[1] tracking-[-0.045em] text-white sm:text-[3.5rem] lg:text-[3.9rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Get {N} editorial backlinks.
            </motion.span>
            <motion.span
              className="block pb-[0.06em] text-[2.5rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-[3.5rem] lg:text-[3.9rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <span className="accent-ink-dark">Free. No catch, no contract.</span>
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Every link building agency says its links are better. We'd rather
            show you. If your business qualifies, we earn {N} editorial links
            to the pages you choose, on real publications, at the same standard
            our clients pay for. You keep them no matter what.
          </motion.p>
          <motion.ul
            className="mt-7 space-y-2.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
          >
            <Ok dark>{N} editorial links, built by the team behind SmileTutor's #1 for “tuition”</Ok>
            <Ok dark>Pointed at the pages you choose on a 30-minute call</Ok>
            <Ok dark>No card, no contract, and the links are yours to keep</Ok>
          </motion.ul>
          <motion.p
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 font-semibold text-white ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
              {SPOTS} businesses a month
            </span>
            For businesses with {REV}+ in annual revenue and {EMP}+ employees.
          </motion.p>
        </div>
        <motion.div
          id="apply"
          className="scroll-mt-28"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <Apply id="apply-top" />
        </motion.div>
      </div>
    </section>

    {/* 2. who we build for */}
    <section className="border-b border-line bg-mist py-12">
      <p className="mb-7 text-center text-[13px] font-medium text-navy-dark/70">
        The same team builds authority for brands like
      </p>
      <LogoStrip className="px-4" />
    </section>

    {/* 3. why it's free */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">Why it's free</Eyebrow>
          <H2>
            Three live links prove more
            <br />
            <Soft>than any sales deck.</Soft>
          </H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
            It isn't charity and it isn't a trick. It's the most honest way we
            know to win your business.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div key={w.t} className="rounded-3xl bg-mist p-7 ring-1 ring-line" {...rise(i * 0.06)}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-dark text-[14px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">{w.t}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-navy-dark/75">{w.d}</p>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-line" {...rise(0.05)}>
          <div className="grid grid-cols-2 bg-navy-dark text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[12px]">
            <p className="px-4 py-4 sm:px-6">The usual way to pick a link building agency</p>
            <p className="px-4 py-4 sm:px-6">The {N}-link pilot</p>
          </div>
          {VERSUS.map(([a, b], i) => (
            <div key={a} className={`grid grid-cols-2 ${i % 2 ? "bg-white" : "bg-mist"}`}>
              <p className="flex items-start gap-2.5 px-4 py-4 text-[14px] leading-snug text-navy-dark/70 sm:px-6 sm:text-[14.5px]">
                <X className="mt-0.5 h-4 w-4 flex-none text-gap" aria-label="The usual way" />
                {a}
              </p>
              <p className="flex items-start gap-2.5 px-4 py-4 text-[14px] font-medium leading-snug text-navy-dark sm:px-6 sm:text-[14.5px]">
                <Check className="mt-0.5 h-4 w-4 flex-none text-verified" aria-label="The pilot" />
                {b}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* 4. how it works */}
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">How it works</Eyebrow>
          <H2>
            From application to live links
            <br />
            <Soft>in about {DAYS} days.</Soft>
          </H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
            Four steps. All we need from you is the two-minute application and
            one 30-minute call.
          </p>
        </motion.div>
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li key={s.t} className="rounded-3xl bg-white p-7 ring-1 ring-line" {...rise(i * 0.06)}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-dark text-[13px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">{s.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/75">{s.d}</p>
            </motion.li>
          ))}
        </ol>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {NUMBERS.map((n, i) => (
            <motion.div key={n.l} className="flex flex-col-reverse rounded-2xl bg-white px-5 py-4 ring-1 ring-line" {...rise(i * 0.04)}>
              <dt className="mt-1 text-[12.5px] text-navy-dark/70">{n.l}</dt>
              <dd className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">{n.v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>

    {/* 5. what you get */}
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">What you get</Eyebrow>
          <H2>
            The same links
            <br />
            <Soft>our clients pay for.</Soft>
          </H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
            A free sample only proves something if it's the real product. These
            links go through the same site checks and the same team as every
            paid placement.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <motion.ul className="divide-y divide-line overflow-hidden rounded-3xl bg-mist ring-1 ring-line" {...rise()}>
            {INCLUDED.map((x) => (
              <li key={x.t} className="grid gap-1.5 px-6 py-5 sm:grid-cols-[0.42fr_0.58fr] sm:gap-6 sm:px-7">
                <span className="flex items-start gap-2.5 text-[15.5px] font-semibold text-navy-dark">
                  <Check className="mt-1 h-4 w-4 flex-none text-verified" aria-hidden="true" />
                  {x.t}
                </span>
                <span className="text-[14.5px] leading-relaxed text-navy-dark/75">{x.d}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div className="space-y-4" {...rise(0.08)}>
            <div className="rounded-3xl bg-white p-6 ring-1 ring-line shadow-[0_30px_60px_-40px_rgb(var(--ink)/0.4)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
                  Your pilot, link by link
                </p>
                <span className="rounded-full bg-lilac px-2.5 py-0.5 text-[11px] font-semibold text-navy-dark">Example</span>
              </div>
              <ul className="mt-4 space-y-2.5">
                {EXAMPLE.map((e, i) => (
                  <li key={e.site} className="flex items-center gap-3 rounded-2xl bg-mist px-3.5 py-3 ring-1 ring-line">
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-navy-dark text-[12px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-navy-dark">{e.site}</span>
                      <span className="block text-[12px] text-navy-dark/65">{e.d}</span>
                    </span>
                    <span
                      className={`flex-none rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        e.s === "Live" ? "bg-mint text-navy-dark" : "bg-butter text-navy-dark"
                      }`}
                    >
                      {e.s}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] text-navy-dark/60">
                Illustrative. Your placements depend on your niche and the pages you choose.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 ring-2 ring-navy-dark sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
                What it would cost
              </p>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-4 text-[14.5px] text-navy-dark/75">
                <span>{N} placements at our standard rate</span>
                <span className="font-semibold tabular-nums text-navy-dark">{VALUE}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-4">
                <span className="text-[15px] font-semibold text-navy-dark">Your cost</span>
                <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">$0</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* the honest part */}
        <motion.figure className="mt-10 flex flex-col gap-5 rounded-3xl p-6 ring-1 ring-line sm:flex-row sm:items-start sm:p-8" {...rise()}>
          <Avatar name="Talha Mahmood" photo="/images/talha-avatar.jpg" size={52} />
          <div>
            <p className="text-[17px] font-semibold tracking-[-0.01em] text-navy-dark">What {N} links won't do</p>
            <blockquote className="mt-2 text-[15.5px] leading-relaxed text-navy-dark/80">
              Three links won't move a competitive page on their own, and we
              won't pretend they will. On the call we'll tell you roughly how
              many links stand between your page and the ones outranking it.
              The pilot covers the first three and shows you exactly what the
              rest would look like.
            </blockquote>
            <figcaption className="mt-3 text-[13px] text-navy-dark/65">
              <span className="font-semibold text-navy-dark">Talha Mahmood</span>, Founder
            </figcaption>
          </div>
        </motion.figure>
      </div>
    </section>

    {/* 6. who qualifies */}
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <DarkGlow className="-right-40 top-0 h-[520px] w-[760px] opacity-45" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-3xl" {...rise()}>
          <Eyebrow dark className="mb-4">Who qualifies</Eyebrow>
          <H2 dark>
            Built for established businesses.
            <br />
            <Soft dark>Limited to {SPOTS} a month.</Soft>
          </H2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Free placements never jump ahead of paying clients, so the pilot is
            limited and the criteria are published. If you clear them, apply.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div className="rounded-3xl bg-white p-7 sm:p-8" {...rise()}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">You qualify if</p>
            <p className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-navy-dark">Your business clears all four</p>
            <ul className="mt-5 space-y-3">
              <Ok><b>{REV} or more</b>&nbsp;in annual revenue</Ok>
              <Ok><b>{EMP} or more</b>&nbsp;employees</Ok>
              <Ok>A live site with pages worth ranking: product, service, category or comparison pages</Ok>
              <Ok>The person who owns the SEO budget joins the 30-minute call</Ok>
            </ul>
            <a
              href="#apply"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              See if you qualify
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
          <div className="space-y-4">
            <motion.div className="rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10" {...rise(0.06)}>
              <p className="text-[15px] font-semibold text-white">Not eligible</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Gambling, adult and other grey-area niches",
                  "Agencies, resellers, and anyone applying for a client",
                  "A second pilot for a company that has already had one",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-[14.5px] text-white/75">
                    <X className="mt-0.5 h-4 w-4 flex-none text-white/50" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10" {...rise(0.1)}>
              <p className="text-[15px] font-semibold text-white">Good to know</p>
              <ul className="mt-3 space-y-2">
                <Ok dark>{SPOTS} businesses a month. When the spots are taken, applications roll to the next month.</Ok>
                <Ok dark>Meeting the criteria gets you reviewed. Final selection depends on how well our publishers fit your niche.</Ok>
                <Ok dark>No card, no contract, no auto-renewal. There's nothing to cancel.</Ok>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

    {/* 7. what the full programme does */}
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 max-w-3xl" {...rise()}>
          <Eyebrow className="mb-4">What the full programme does</Eyebrow>
          <H2>
            Three links are a sample.
            <br />
            <Soft>This is what happens when they keep coming.</Soft>
          </H2>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {["smiletutor", "cryptodesk", "ocuco"].map((s, i) => (
            <ResultCard key={s} c={caseBySlug(s)!} delay={i * 0.07} />
          ))}
        </div>
        <Link to="/case-studies" className="group mt-8 inline-flex items-center gap-2 text-[14.5px] font-semibold text-navy-dark">
          See all case studies
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>

    {/* 8. questions */}
    <ServiceFaq
      eyebrow="Questions"
      h2a="Before"
      h2b="you apply."
      side="Not sure you qualify? Ask us, and we'll tell you honestly."
      faqs={FAQS}
    />

    {/* 9. apply */}
    <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <DarkGlow className="-left-48 -top-20 h-[520px] w-[760px] opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <motion.div {...rise()}>
          <H2 dark>
            {N} links. Zero dollars.
            <br />
            <Soft dark>Your call after that.</Soft>
          </H2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/75">
            If you're approved, the next step is a 30-minute call to pick your
            pages.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              ["We reply within 24 hours.", "A person reviews your application and tells you whether you're approved."],
              ["We choose the pages together.", "One 30-minute call with whoever owns the SEO budget."],
              [`${N} editorial links go live.`, `In about ${DAYS} days, and they're yours to keep.`],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3.5">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white/10 text-[12.5px] font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-white/75">
                  <span className="font-semibold text-white">{t}</span> {d}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
        <motion.div {...rise(0.08)}>
          <Apply id="apply-bottom" />
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default Pilot;
