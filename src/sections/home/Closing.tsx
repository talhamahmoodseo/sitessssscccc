import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { BLOG_POSTS } from "@/lib/content";
import { ObjectionFaq } from "@/pages/services/sections";
import { home } from "./content";
import { Accent, COLOURS, Eyebrow, GrainBlob, Head, Title, ease, rise } from "./kit";

/* ------------------------------ free audit offer ------------------------------ */

export const AuditOffer = () => {
  const A = home.audit;
  return (
    <section className="bg-mist py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-[32px] bg-navy-dark px-7 py-14 sm:px-12 lg:px-16 lg:py-20"
          {...rise()}
        >
          <GrainBlob color={COLOURS.orange} className="-right-40 -top-40 h-[480px] w-[520px] opacity-70" duration={22} />
          <GrainBlob color={COLOURS.violet} className="-bottom-48 right-[18%] h-[420px] w-[520px] opacity-60" duration={26} />
          <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow dark className="mb-5">
                {A.eyebrow}
              </Eyebrow>
              <Title dark>
                <Accent parts={A.h2} />
              </Title>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">{A.lead}</p>
            </div>
            <div className="rounded-[24px] bg-white/[0.07] p-6 ring-1 ring-white/15 backdrop-blur sm:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70">
                What you get
              </p>
              <ul className="mt-5 space-y-4">
                {A.includes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white">
                      <Check className="h-3 w-3 text-navy-dark" />
                    </span>
                    <span className="text-[15px] leading-snug text-white/90">{x}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openBooking}
                className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-[15px] font-semibold text-navy-dark transition-colors hover:bg-mark"
              >
                {A.button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-[12.5px] text-white/70">{A.small}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* -------------------------------- articles -------------------------------- */

export const Articles = () => {
  const A = home.articles;
  const posts = BLOG_POSTS.slice(0, 4);
  return (
    <section className="bg-mist pb-24 pt-8 lg:pb-36 lg:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Head eyebrow={A.eyebrow} title={A.h2} />
          <motion.div {...rise(0.1)}>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-semibold text-navy-dark ring-1 ring-navy-dark/20 transition-shadow hover:ring-navy-dark/50"
            >
              {A.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, n) => (
            <motion.li key={p.slug} {...rise(n * 0.06)}>
              <Link to={`/blog/${p.slug}`} className="group block">
                <div
                  className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[20px] p-5 ${p.grad}`}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
                    {p.category}
                  </span>
                  <span className="text-[1.45rem] font-medium leading-[1.08] tracking-[-0.04em] text-navy-dark">
                    {p.title}
                  </span>
                  <span
                    className="absolute -right-2 -top-6 text-[6rem] leading-none text-navy-dark/10 transition-transform duration-500 group-hover:-rotate-6"
                    aria-hidden="true"
                  >
                    {p.glyph}
                  </span>
                </div>
                <p className="mt-4 text-[12.5px] text-navy-dark/70">
                  {p.date} · {p.read}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-snug text-navy-dark/80 group-hover:text-navy-dark">
                  {p.excerpt}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ---------------------------------- faq ---------------------------------- */

export const HomeFaq = () => {
  const F = home.faqHead;
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-8">
        <div>
          <div className="lg:sticky lg:top-28">
            <Head eyebrow={F.eyebrow} title={F.h2} />
            <motion.p className="mt-6 text-[15.5px] leading-relaxed text-navy-dark/75" {...rise(0.05)}>
              Something else on your mind?{" "}
              <button
                onClick={openBooking}
                className="font-semibold text-navy-dark underline decoration-navy-dark/30 underline-offset-4 hover:decoration-navy-dark"
              >
                Ask us on a call
              </button>
              .
            </motion.p>
          </div>
        </div>
        <motion.div {...rise(0.08)}>
          <ObjectionFaq faqs={home.faqs} />
        </motion.div>
      </div>
    </section>
  );
};

/* -------------------------------- final cta -------------------------------- */

export const FinalCta = () => {
  const F = home.final;
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-navy-dark py-28 lg:py-40">
      <GrainBlob color={COLOURS.orange} className="-left-[260px] top-[10%] h-[560px] w-[560px] opacity-60" duration={24} />
      <GrainBlob color={COLOURS.lavender} className="-right-[240px] bottom-[-120px] h-[560px] w-[620px] opacity-50" duration={28} />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow dark className="mb-6">
            {F.eyebrow}
          </Eyebrow>
          <h2 className="text-[3.2rem] font-medium leading-[0.98] tracking-[-0.05em] text-white sm:text-[4.6rem] lg:text-[5.6rem]">
            <Accent parts={F.h2} />
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-[18.5px]">
            {F.lead}
          </p>
        </motion.div>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <button
            onClick={openBooking}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-navy-dark transition-colors hover:bg-mark"
          >
            {F.primary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href={`mailto:${F.email}`}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-shadow hover:ring-white/60"
          >
            <Mail className="h-4 w-4" />
            {F.secondary}
          </a>
        </motion.div>
        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
          {F.ticks.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5 text-[13px] text-white/75">
              <Check className="h-3.5 w-3.5 text-white/80" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

