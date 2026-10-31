import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Check, Lock, ShieldCheck, X } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { Avatar, ResultCard, SiteShot } from "@/components/proof";
import { contactLink, openBooking } from "@/lib/booking";
import { caseBySlug } from "@/lib/cases";
import { PER_LINK, TRIAL_PRICE, usd } from "@/lib/pricing";
import { LogoStrip } from "@/sections/ClientLogos";
import { DarkGlow, Eyebrow, H2, Soft, ease, rise } from "./services/kit";
import { ServiceFaq } from "./services/common";

/**
 * /pilot, round 13: the pilot offer on its own page, after the structure of
 * uSERP's /pilot (the owner's brief, 31 Oct 2026).
 *
 * The offer is the one we already sell, nothing new: one trial placement at
 * TRIAL_PRICE, once per company, the same placement as a package link, with
 * the money-back guarantee and free replacement that cover every order.
 * Every promise below comes from the terms, the guarantee terms, the pricing
 * FAQ or the contact page (reply within 24 hours). Prices from lib/pricing.
 */

const PRICE = usd(TRIAL_PRICE);

/* ------------------------------------------------------------ start form */

const StartPilot = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState("");
  const go = (e: FormEvent) => {
    e.preventDefault();
    navigate(
      contactLink({
        package: "trial",
        website: site,
        email,
        message: page ? `Pilot link for this page: ${page}` : "I'd like to start a pilot link.",
      }),
    );
  };
  const field =
    "mt-1.5 w-full rounded-xl bg-mist px-3.5 py-3 text-[14.5px] text-navy-dark ring-1 ring-line placeholder:text-navy-dark/45 focus:outline-none focus:ring-2 focus:ring-navy-dark/30";
  return (
    <form
      onSubmit={go}
      className="rounded-[26px] bg-white p-6 text-left shadow-[0_40px_90px_-40px_rgb(0_0_0/0.7)] sm:p-7"
      aria-labelledby={`${id}-title`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
        One link · {PRICE}
      </p>
      <h2 id={`${id}-title`} className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-navy-dark">
        Start your pilot
      </h2>
      <p className="mt-1 text-[13.5px] text-navy-dark/70">
        Takes a minute. We reply within 24 hours.
      </p>
      <div className="mt-5 space-y-3.5">
        <label className="block text-[13px] font-semibold text-navy-dark">
          Your website
          <input
            required
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="yourbrand.com"
            className={field}
            inputMode="url"
            autoComplete="url"
          />
        </label>
        <label className="block text-[13px] font-semibold text-navy-dark">
          Work email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbrand.com"
            className={field}
            autoComplete="email"
          />
        </label>
        <label className="block text-[13px] font-semibold text-navy-dark">
          The page you want to rank{" "}
          <span className="font-normal text-navy-dark/55">(optional)</span>
          <input
            value={page}
            onChange={(e) => setPage(e.target.value)}
            placeholder="yourbrand.com/your-best-page"
            className={field}
          />
        </label>
      </div>
      <button
        type="submit"
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-dark px-5 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
      >
        Start my pilot
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[12px] text-navy-dark/65">
        <span className="inline-flex items-center gap-1.5">
          <Lock className="h-3 w-3" aria-hidden="true" />
          You pay once we've confirmed your site fits
        </span>
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          100% money-back
        </span>
      </p>
    </form>
  );
};

/* ------------------------------------------------------------------- copy */

const WHY = [
  {
    t: "A sample is someone else's link. This one is yours.",
    d: "Every agency shows screenshots from other clients' campaigns. A placement pointing at your own page is something you can open, check and keep.",
  },
  {
    t: "One link shows you how we work.",
    d: "The site we pick and why, the article, the anchor and the report. You see the whole process before you decide on a package.",
  },
  {
    t: "If it's wrong, it's on us.",
    d: "The pilot carries the same 100% money-back guarantee and free link replacement as every order.",
  },
];

const VERSUS: [string, string][] = [
  ["Sample links from other clients' campaigns", "A link pointing at a page on your own site"],
  ["A 5 or 10-link package before you see one", `One link, ${PRICE}, no minimum`],
  ["Case studies you have to take on trust", "The live URL, the site and the anchor in your report"],
  ["Refund terms buried in small print", "A money-back guarantee written in plain English"],
  ["Months before you can judge the quality", "Live in two to four weeks"],
];

const STEPS = [
  {
    t: "Send us your site",
    d: "Your website and the page you'd like to rank. That's all we need to start.",
  },
  {
    t: "Hear back within 24 hours",
    d: "We look at your site and niche. If we can't find a relevant site for it, we tell you, and you pay nothing.",
  },
  {
    t: "We find, write and publish",
    d: "We shortlist relevant DR 40+ sites, check each one by hand, write the article and get it published. Want to approve the site first? Just ask.",
  },
  {
    t: "You get the report",
    d: "The live URL, the site, the anchor and its DR on the day it went live, so you can check it yourself.",
  },
];

const NUMBERS = [
  { v: "24 h", l: "to hear back" },
  { v: "2–4 wks", l: "to a live link" },
  { v: PRICE, l: "one link, no minimum" },
  { v: "100%", l: "money-back guarantee" },
  { v: "1", l: "pilot per company" },
];

const INCLUDED = [
  {
    t: "A real publication",
    d: "A relevant DR 40+ site with its own editors and readers, checked by hand against our 7-point site check.",
  },
  {
    t: "An editorial link",
    d: "A dofollow link in the body of an article, not in a footer or an author bio.",
  },
  {
    t: "Your page, your anchor",
    d: "Pointed at the page you choose, with your anchor text preferences.",
  },
  {
    t: "A report you can check",
    d: "The live URL, the site, the anchor and its DR on the day it goes live.",
  },
  {
    t: "Yours to keep",
    d: "If a publisher ever removes the link or turns it nofollow, we replace it on a similar site for free.",
  },
];

const FAQS = [
  {
    q: "Why does the pilot cost more than a standard placement?",
    a: `The pilot is one trial link for new clients who want to see our work before a bigger order. It's the same placement with no minimum, priced a little higher (${PRICE}) on purpose so it can't be used as a repeat discount. One pilot per company. After that, every placement is ${usd(PER_LINK)}.`,
  },
  {
    q: "What exactly do I get?",
    a: "One editorial placement on a relevant DR 40+ site, the article written by our team, a dofollow link in the body of the article, the 7-point site check, and a report with the live URL.",
  },
  {
    q: "How long does it take?",
    a: "Most links go live within two to four weeks of your order. We reply to your request within 24 hours.",
  },
  {
    q: "Can I approve the site first?",
    a: "Yes. Tell us when you order and we'll send the shortlist before anything is published. If you'd rather not, we choose the site for you.",
  },
  {
    q: "What if the placement isn't what you promised?",
    a: "If it doesn't match your order (a relevant DR 40+ site, a dofollow link in the body of the article, indexed by Google within 30 days), we replace it, or refund you in full if you'd rather. The full guarantee terms are on the pricing page.",
  },
  {
    q: "Will one link move my rankings?",
    a: "On its own, usually not for a competitive page, and we won't pretend otherwise. The pilot shows you the quality of our work. Rankings come from the right number of links over time, and we can tell you roughly what your page needs.",
  },
  {
    q: "What happens after the pilot?",
    a: `Nothing, unless you want more. There's no contract and nothing renews. If you'd like to carry on, packages start at 3 links at ${usd(PER_LINK)} a placement.`,
  },
  {
    q: "Can agencies use the pilot?",
    a: "Yes. It's a simple way to test us on one client before ordering more. Everything can be delivered white label, with an unbranded report.",
  },
  {
    q: "Are there niches you don't take?",
    a: "We don't take adult, gambling or similar niches. If you're unsure about yours, ask before you order.",
  },
];

/* ------------------------------------------------------------------- page */

const Pilot = () => {
  const ocuco = caseBySlug("ocuco")!;
  return (
    <PageLayout navOnDark cta={false}>
      <Seo
        title={`Pilot Offer: Try One Link for ${PRICE}`}
        description={`Try us with one editorial link on your own site for ${PRICE}: a relevant DR 40+ placement, written and published for you, with a 100% money-back guarantee.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Offer",
          name: "Pilot placement (one trial link)",
          price: String(TRIAL_PRICE),
          priceCurrency: "USD",
          seller: { "@type": "Organization", name: "Editorial HQ" },
        }}
      />

      {/* 1. the offer */}
      <section className="relative overflow-hidden bg-navy-dark pb-20 pt-32 lg:pb-28 lg:pt-40">
        <DarkGlow className="-left-40 top-0 h-[560px] w-[780px] opacity-55" />
        <DarkGlow className="-right-56 bottom-[-120px] h-[480px] w-[700px] opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <motion.p
              className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The pilot · one trial link
            </motion.p>
            <h1 className="mt-5">
              <motion.span
                className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-[3.7rem] lg:text-[4.1rem]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                One link on your site.
              </motion.span>
              <motion.span
                className="block pb-[0.06em] text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.7rem] lg:text-[4.1rem]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
              >
                <span className="accent-ink-dark">Then decide.</span>
              </motion.span>
            </h1>
            <motion.p
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              Every link builder says their links are better. We'd rather show
              you. Order one editorial placement for {PRICE}, pointed at a page
              you choose. If it isn't what we promised, you get your money back.
            </motion.p>
            <motion.ul
              className="mt-7 space-y-2.5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease }}
            >
              {[
                "One editorial link on a relevant DR 40+ site",
                "Pointed at the page you choose, with the article written for you",
                "Live in two to four weeks, with a report you can check",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[15px] text-white/85">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-mark" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </motion.ul>
            <motion.p
              className="mt-7 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
            >
              {["One pilot per company", "No minimum", "No contract"].map((x) => (
                <span
                  key={x}
                  className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[12.5px] font-semibold text-white/85 ring-1 ring-white/15"
                >
                  {x}
                </span>
              ))}
            </motion.p>
          </div>
          <motion.div
            id="start"
            className="scroll-mt-28"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            <StartPilot id="pilot-top" />
          </motion.div>
        </div>
      </section>

      {/* 2. who it's from */}
      <section className="border-b border-line bg-mist py-12">
        <p className="mb-7 text-center text-[13px] font-medium text-navy-dark/70">
          The same team builds links for
        </p>
        <LogoStrip className="px-4" />
      </section>

      {/* 3. why a pilot */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl" {...rise()}>
            <Eyebrow className="mb-4">Why a pilot</Eyebrow>
            <H2>
              One live link proves more
              <br />
              <Soft>than any sales deck.</Soft>
            </H2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
              It isn't a discount and it isn't a trick. It's the simplest
              honest way we know to earn your next order.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {WHY.map((w, i) => (
              <motion.div key={w.t} className="rounded-3xl bg-mist p-7 ring-1 ring-line" {...rise(i * 0.06)}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-dark text-[14px] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
                  {w.t}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-navy-dark/75">{w.d}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-line" {...rise(0.05)}>
            <div className="grid grid-cols-2 bg-navy-dark text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[12px]">
              <p className="px-4 py-4 sm:px-6">The usual way to try a link builder</p>
              <p className="px-4 py-4 sm:px-6">The Editorial HQ pilot</p>
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
              From your site to a live link
              <br />
              <Soft>in two to four weeks.</Soft>
            </H2>
          </motion.div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.li key={s.t} className="rounded-3xl bg-white p-7 ring-1 ring-line" {...rise(i * 0.06)}>
                <span className="text-[12px] font-semibold tabular-nums text-navy-dark/55">
                  Step {i + 1}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-navy-dark/75">{s.d}</p>
              </motion.li>
            ))}
          </ol>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {NUMBERS.map((n, i) => (
              <motion.div key={n.l} className="flex flex-col-reverse rounded-2xl bg-white px-5 py-4 ring-1 ring-line" {...rise(i * 0.04)}>
                <dt className="mt-1 text-[12.5px] text-navy-dark/70">{n.l}</dt>
                <dd className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark">
                  {n.v}
                </dd>
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
              The same placement
              <br />
              <Soft>our clients pay for.</Soft>
            </H2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-navy-dark/75">
              A pilot only proves something if it's the real product. It goes
              through the same site check, the same writers and the same
              report as every package link.
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
              <div className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
                  What it costs
                </p>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-4 text-[14.5px] text-navy-dark/75">
                  <span>A placement in a package (from 3 links)</span>
                  <span className="font-semibold tabular-nums text-navy-dark">{usd(PER_LINK)}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-4">
                  <span className="text-[15px] font-semibold text-navy-dark">The pilot, one link, no minimum</span>
                  <span className="text-[2rem] font-semibold leading-none tracking-[-0.04em] tabular-nums text-navy-dark">
                    {PRICE}
                  </span>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-navy-dark/65">
                  Why a little more? So it can't be reused as a discount. One
                  pilot per company.
                </p>
              </div>

              <figure className="rounded-3xl bg-mint/60 p-4 sm:p-5">
                <SiteShot
                  src="/images/cases/ocuco-opencart-placement.webp"
                  domain="opencart.com"
                  alt="An OpenCart article naming Ocuco's Acuitas 3"
                  ratio="aspect-[16/8]"
                  pos="0% 72%"
                />
                <figcaption className="mt-3 px-1 text-[13px] leading-relaxed text-navy-dark/75">
                  <span className="font-semibold text-navy-dark">A real placement:</span>{" "}
                  {ocuco.client}'s Acuitas 3 named in an OpenCart article on
                  practice software.{" "}
                  <Link to="/case-studies/ocuco" className="font-semibold text-navy-dark underline underline-offset-2">
                    See the case
                  </Link>
                </figcaption>
              </figure>
            </motion.div>
          </div>

          {/* 6. the honest part */}
          <motion.figure
            className="mt-10 flex flex-col gap-5 rounded-3xl p-6 ring-1 ring-line sm:flex-row sm:items-start sm:p-8"
            {...rise()}
          >
            <Avatar name="Talha Mahmood" photo="/images/talha-avatar.jpg" size={52} />
            <div>
              <p className="text-[17px] font-semibold tracking-[-0.01em] text-navy-dark">
                What one link won't do
              </p>
              <blockquote className="mt-2 text-[15.5px] leading-relaxed text-navy-dark/80">
                One link won't move a competitive page on its own, and we won't
                pretend it will. What it shows you is how we work: the site we
                choose, the article and the report. If you like what you see,
                packages start at three links.
              </blockquote>
              <figcaption className="mt-3 text-[13px] text-navy-dark/65">
                <span className="font-semibold text-navy-dark">Talha Mahmood</span>, Founder
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* 7. who it's for */}
      <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
        <DarkGlow className="-right-40 top-0 h-[520px] w-[760px] opacity-45" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-3xl" {...rise()}>
            <Eyebrow dark className="mb-4">Who it's for</Eyebrow>
            <H2 dark>
              Open to most businesses.
              <br />
              <Soft dark>One per company.</Soft>
            </H2>
          </motion.div>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div className="rounded-3xl bg-white p-7 sm:p-8" {...rise()}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-dark/60">
                A good fit if
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "You have a live site with pages you want to rank",
                  "You'd like to see our work before buying a package",
                  "You're a brand, or an agency testing us on one client",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-[15.5px] text-navy-dark">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-verified" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
              <a
                href="#start"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
              >
                Start my pilot
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
            <div className="space-y-4">
              <motion.div className="rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10" {...rise(0.06)}>
                <p className="text-[15px] font-semibold text-white">Not eligible</p>
                <ul className="mt-3 space-y-2">
                  {["Adult, gambling and similar niches", "A second pilot for a company that already had one"].map((x) => (
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
                  {[
                    "You pay once we've confirmed your site fits",
                    "If we can't find a relevant site for your niche, you get a full refund",
                    "Want to approve the site first? Ask when you order",
                    `After the pilot, placements are ${usd(PER_LINK)} in packages from 3`,
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-[14.5px] text-white/75">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-white/60" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. what a full campaign did */}
      <section className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
            {...rise()}
          >
            <div>
              <Eyebrow className="mb-4">What a full campaign does</Eyebrow>
              <H2>
                One link is a sample.
                <br />
                <Soft>This is what more did.</Soft>
              </H2>
            </div>
            <p className="text-[17px] leading-relaxed text-navy-dark/75">
              Three of our clients, in their own numbers. Every card opens the
              full case file, with the screenshots.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {["smiletutor", "cryptodesk", "ocuco"].map((s, i) => (
              <ResultCard key={s} c={caseBySlug(s)!} delay={i * 0.07} />
            ))}
          </div>
          <Link
            to="/case-studies"
            className="group mt-8 inline-flex items-center gap-2 text-[14.5px] font-semibold text-navy-dark"
          >
            See all case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      {/* 9. questions */}
      <ServiceFaq
        eyebrow="Questions"
        h2a="Before you"
        h2b="start a pilot."
        side="Not sure the pilot is right for you? Ask us, and we'll tell you honestly."
        faqs={FAQS}
      />

      {/* 10. start */}
      <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
        <DarkGlow className="-left-48 -top-20 h-[520px] w-[760px] opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
          <motion.div {...rise()}>
            <H2 dark>
              One link. {PRICE}.
              <br />
              <Soft dark>Then you decide.</Soft>
            </H2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/75">
              Send us your site and the page you want to rank. We'll reply
              within 24 hours.
            </p>
            <ul className="mt-7 space-y-2.5">
              {["100% money-back guarantee", "Free link replacement", "No contract, nothing renews"].map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-[15px] text-white/85">
                  <Check className="h-4 w-4 flex-none text-mark" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
            <button
              onClick={openBooking}
              className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/10"
            >
              <CalendarDays className="h-4 w-4" />
              Rather talk first? Book a call
            </button>
          </motion.div>
          <motion.div {...rise(0.08)}>
            <StartPilot id="pilot-bottom" />
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Pilot;
