import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/booking";
import { home } from "./content";
import { Accent, COLOURS, GrainBlob, Note, Title, ease, rise } from "./kit";

/* -------------------------------- big quote -------------------------------- */

/** One client voice between sections, set large. */
export const BigQuote = ({ index, bg = "bg-mist" }: { index: number; bg?: string }) => {
  const q = home.quotes[index];
  return (
    <section className={`${bg} py-24 lg:py-32`}>
      <motion.figure className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" {...rise()}>
        <blockquote className="text-[1.75rem] font-medium leading-[1.22] tracking-[-0.035em] text-navy-dark sm:text-[2.3rem] lg:text-[2.6rem]">
          &ldquo;{q.text}&rdquo;
        </blockquote>
        <div
          className="mt-9 h-px w-full"
          style={{ background: "linear-gradient(90deg, rgb(var(--ink) / 0.35), rgb(var(--ink) / 0.05))" }}
          aria-hidden="true"
        />
        <figcaption className="mt-6 flex items-center justify-between gap-6">
          <span className="flex items-center gap-3.5">
            <img src={asset(q.avatar)} alt="" className="h-12 w-12 rounded-full object-cover" loading="lazy" />
            <span>
              <span className="block text-[15px] font-semibold text-navy-dark">{q.name}</span>
              <span className="block text-[13.5px] text-navy-dark/70">{q.role}</span>
            </span>
          </span>
          <span className="text-[22px] font-semibold tracking-[-0.04em] text-navy-dark">{q.company}</span>
        </figcaption>
      </motion.figure>
    </section>
  );
};

/* ---------------------------------- bento ---------------------------------- */

const TILE: Record<string, string> = {
  butter: "bg-butter",
  mint: "bg-mint",
  lilac: "bg-lilac",
  blush: "bg-blush",
  sky: "bg-sky",
};

/** Numbers and voices interleaved, at compact proportions. */
export const ResultsBento = () => {
  const R = home.results;
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <Note className="-top-8 left-0 hidden md:block lg:left-10" arrow="down-right">
            {R.note}
          </Note>
          <motion.div {...rise()}>
            <Title center className="max-w-2xl">
              <Accent parts={R.h2} />
            </Title>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {R.tiles.map((t, n) =>
            t.kind === "stat" ? (
              <motion.div
                key={n}
                className={`flex min-h-[200px] flex-col justify-between rounded-[20px] p-6 ${TILE[t.tile]}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (n % 3) * 0.06, ease }}
              >
                <span>
                  <span className="block text-[2.4rem] font-medium leading-none tracking-[-0.05em] text-navy-dark tabular-nums">
                    {t.value}
                  </span>
                  <span className="mt-2 block text-[14px] leading-snug text-navy-dark/75">{t.label}</span>
                </span>
                <span className="mt-6 text-[15px] font-semibold tracking-[-0.03em] text-navy-dark">{t.client}</span>
              </motion.div>
            ) : (
              <motion.figure
                key={n}
                className="col-span-2 flex min-h-[200px] flex-col justify-between rounded-[20px] bg-mist p-6 ring-1 ring-line sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (n % 3) * 0.06, ease }}
              >
                <blockquote className="text-[17px] font-medium leading-[1.45] tracking-[-0.015em] text-navy-dark sm:text-[18.5px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3">
                    {t.avatar ? (
                      <img src={asset(t.avatar)} alt="" className="h-9 w-9 rounded-full object-cover" loading="lazy" />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[12px] font-bold text-navy-dark ring-1 ring-line" aria-hidden="true">
                        {t.name.split(" ").map((w) => w[0]).join("")}
                      </span>
                    )}
                    <span>
                      <span className="block text-[13.5px] font-semibold text-navy-dark">{t.name}</span>
                      <span className="block text-[12.5px] text-navy-dark/70">{t.role}</span>
                    </span>
                  </span>
                  <span className="text-[15px] font-semibold tracking-[-0.03em] text-navy-dark">{t.client}</span>
                </figcaption>
              </motion.figure>
            ),
          )}
        </div>

        <motion.div className="mt-12 text-center" {...rise()}>
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
          >
            {R.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------ testimonial wall ------------------------------ */

type Voice = (typeof home.wall.items)[number];

const VoiceCard = ({ v }: { v: Voice }) => (
  <figure className="rounded-[20px] bg-white/[0.05] p-6 ring-1 ring-white/10">
    <figcaption className="flex items-center justify-between gap-3">
      <span>
        <span className="block text-[14px] font-semibold text-white">{v.name}</span>
        <span className="block text-[12.5px] text-white/70">{v.role}</span>
      </span>
      <span className="flex-none rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
        {v.via}
      </span>
    </figcaption>
    <blockquote className="mt-4 text-[15.5px] leading-[1.6] text-white/85">{v.text}</blockquote>
  </figure>
);

/** A column that drifts slowly; content is doubled so the loop is seamless. */
const Column = ({ items, duration, reverse }: { items: Voice[]; duration: number; reverse?: boolean }) => {
  const reduced = useReducedMotion();
  return (
    <div className="overflow-hidden">
      <motion.div
        className="space-y-4"
        animate={reduced ? undefined : { y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((v, n) => (
          <div key={n} aria-hidden={n >= items.length}>
            <VoiceCard v={v} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Wall = () => {
  const W = home.wall;
  const cols = [0, 1, 2].map((c) => W.items.filter((_, n) => n % 3 === c));
  return (
    <section className="relative overflow-hidden bg-navy-dark pt-24 lg:pt-36">
      <GrainBlob color={COLOURS.violet} className="-left-[320px] top-0 h-[560px] w-[640px] opacity-30" duration={30} />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div {...rise()}>
          <Title dark center className="max-w-2xl">
            <Accent parts={W.h2} />
          </Title>
        </motion.div>
        <div
          className="relative mt-14 grid h-[620px] gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            WebkitMaskImage: "linear-gradient(transparent, #000 14%, #000 82%, transparent)",
            maskImage: "linear-gradient(transparent, #000 14%, #000 82%, transparent)",
          }}
        >
          <div className="sm:hidden">
            <Column items={W.items} duration={90} />
          </div>
          <div className="hidden sm:block">
            <Column items={cols[0]} duration={46} />
          </div>
          <div className="hidden sm:block">
            <Column items={cols[1]} duration={54} reverse />
          </div>
          <div className="hidden lg:block">
            <Column items={cols[2]} duration={50} />
          </div>
        </div>
      </div>
    </section>
  );
};
