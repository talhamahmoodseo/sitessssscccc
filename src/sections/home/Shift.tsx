import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { home } from "./content";
import { Accent, COLOURS, Eyebrow, GrainBlob, Title, ease, rise, sparkPath } from "./kit";

const S = home.shift;

/** Why act now. Two numbers, read editorially, then the source in full. */
const Shift = () => (
  <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-36">
    <GrainBlob color={COLOURS.violet} className="-right-[300px] -top-[180px] h-[620px] w-[700px] opacity-40" duration={30} />
    <GrainBlob color={COLOURS.orange} className="-left-[340px] bottom-[-260px] h-[560px] w-[640px] opacity-30" duration={34} />

    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div className="max-w-3xl" {...rise()}>
        <Eyebrow dark className="mb-5">
          {S.eyebrow}
        </Eyebrow>
        <Title dark>
          {S.h2a}
          <br />
          <span className="text-white/60">
            <Accent parts={S.h2b} />
          </span>
        </Title>
        <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-white/70 sm:text-[18.5px]">
          {S.lead}
        </p>
      </motion.div>

      {/* the two numbers */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-2">
        {S.stats.map((s, n) => (
          <motion.div
            key={s.k}
            className="bg-navy-dark p-7 sm:p-10"
            {...rise(n * 0.1)}
          >
            <div className="flex items-end justify-between gap-6">
              <span
                className={`text-[4rem] font-medium leading-none tracking-[-0.06em] tabular-nums sm:text-[5.2rem] ${
                  s.down ? "text-white" : "text-mark"
                }`}
              >
                {s.v}
              </span>
              <svg viewBox="0 0 140 56" className="mb-2 h-14 w-32 flex-none" fill="none" aria-hidden="true">
                <motion.path
                  d={sparkPath(s.trend, 140, 56, 4)}
                  stroke={s.down ? "rgba(255,255,255,0.75)" : "rgb(var(--mark))"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.3, delay: 0.3 + n * 0.2, ease }}
                />
              </svg>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-snug text-white/75">{s.k}</p>
          </motion.div>
        ))}
      </div>

      {/* the source, in full */}
      <motion.figure
        className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[auto_1fr] lg:gap-14"
        {...rise()}
      >
        <span
          className="font-serif text-[6rem] leading-[0.6] text-mark lg:text-[8rem]"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <div>
          <blockquote cite={S.source}>
            <p className="text-[1.25rem] leading-[1.55] tracking-[-0.015em] text-white/85 sm:text-[1.45rem]">
              {S.quote}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <span className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full ring-1 ring-white/25 text-[13px] font-bold text-white"
                aria-hidden="true"
              >
                NP
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-white">{S.who}</span>
                <span className="block text-[13px] text-white/70">{S.role}</span>
              </span>
            </span>
            <a
              href={S.source}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/70 transition-colors hover:text-white sm:border-l sm:border-white/15 sm:pl-8"
            >
              Source: {S.sourceLabel}
              <ArrowUpRight className="h-4 w-4 flex-none transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </figcaption>

          <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <p className="max-w-md">
              <span className="block font-hand text-[26px] leading-tight text-white/90">
                &ldquo;{S.aside}&rdquo;
              </span>
              <span className="mt-1 block text-[12.5px] text-white/60">{S.asideLabel}</span>
            </p>
            <p className="max-w-md text-[17px] font-medium leading-relaxed text-white">
              {S.close}
            </p>
          </div>
        </div>
      </motion.figure>
    </div>
  </section>
);

export default Shift;
