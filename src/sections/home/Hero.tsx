import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Star } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { PaperPlaneFigure } from "@/components/LineArt";
import { AiOverviewMark, GoogleMark } from "@/components/PlatformMarks";
import { home } from "./content";
import { COLOURS, GrainBlob, Note, ease } from "./kit";

const H = home.hero;
type Clip = (typeof H.clippings)[number];

/** A published article, cut out like a press clipping. The client's link is
 *  highlighted inside the story, which is the whole point of the work. */
const Clipping = ({ c, delay }: { c: Clip; delay: number }) => (
  <article className="w-full overflow-hidden rounded-[18px] bg-white text-left ring-1 ring-navy-dark/[0.07] shadow-[0_2px_0_rgba(14,14,14,0.03),0_40px_80px_-40px_rgba(14,14,14,0.45)]">
    <header className="flex items-center justify-between border-b border-line px-6 py-3.5">
      <span
        className={`text-[17px] leading-none text-navy-dark ${
          c.serif ? "font-serif font-semibold tracking-[-0.01em]" : "font-bold tracking-[-0.03em]"
        }`}
      >
        {c.pub}
      </span>
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70">
        {c.section}
      </span>
    </header>
    <div className="px-6 pb-5 pt-5">
      <h3
        className={`text-navy-dark ${
          c.serif
            ? "font-serif text-[21px] leading-[1.18]"
            : "text-[19px] font-semibold leading-snug tracking-[-0.02em]"
        }`}
      >
        {c.title}
      </h3>
      <div className="mt-4 space-y-1.5" aria-hidden="true">
        <span className="block h-[7px] w-full rounded-full bg-navy-dark/[0.06]" />
        <span className="block h-[7px] w-[86%] rounded-full bg-navy-dark/[0.06]" />
      </div>
      <p className="mt-4 text-[14px] leading-[1.7] text-navy-dark/80">
        {c.before}
        <motion.span
          className="font-semibold text-navy-dark underline decoration-navy-dark/40 decoration-2 underline-offset-[3px]"
          initial={{ backgroundSize: "0% 100%" }}
          animate={{ backgroundSize: "100% 100%" }}
          transition={{ duration: 0.8, delay: delay + 0.9, ease }}
          style={{
            backgroundImage:
              "linear-gradient(rgb(var(--mark) / 0.7), rgb(var(--mark) / 0.7))",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 88%",
          }}
        >
          {c.link}
        </motion.span>
        {c.after}
      </p>
    </div>
    <footer className="flex items-center gap-2 border-t border-line bg-mist/60 px-6 py-3">
      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy-dark ring-1 ring-line">
        {c.type}
      </span>
      <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold tabular-nums text-navy-dark ring-1 ring-line">
        DR {c.dr}
      </span>
      <span className="ml-auto inline-flex items-center gap-1 text-[11.5px] font-semibold text-verified">
        <Check className="h-3.5 w-3.5" />
        Indexed
      </span>
    </footer>
  </article>
);

/** Hand-drawn flight path that loops in and lands the paper plane. */
const Flight = () => {
  const reduced = useReducedMotion();
  return (
    <div
      className="pointer-events-none absolute right-[3%] top-[300px] hidden w-[300px] text-navy-dark lg:block xl:right-[6%]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 300 220" fill="none" className="w-full">
        <motion.path
          d="M10 200 C 60 190, 70 120, 120 130 C 170 140, 150 200, 110 180 C 80 165, 120 90, 190 80 C 230 74, 250 50, 262 34"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="5 7"
          strokeOpacity="0.55"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        className="absolute right-[-18px] top-[-30px] w-[86px]"
        initial={{ opacity: 0, x: -40, y: 40, rotate: -18 }}
        animate={
          reduced
            ? { opacity: 1, x: 0, y: 0, rotate: -18 }
            : { opacity: 1, x: 0, y: [0, -7, 0], rotate: -18 }
        }
        transition={{
          opacity: { duration: 0.6, delay: 2.4 },
          x: { duration: 0.8, delay: 2.4, ease },
          y: { duration: 5, delay: 3.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <PaperPlaneFigure className="w-full" />
      </motion.div>
    </div>
  );
};

/** What the placement leads to, pinned beside the clippings. */
const OutcomeTag = ({
  className,
  delay,
  icon,
  k,
  v,
}: {
  className: string;
  delay: number;
  icon: ReactNode;
  k: string;
  v: string;
}) => (
  <motion.div
    className={`absolute z-10 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-navy-dark/[0.07] shadow-[0_24px_50px_-28px_rgba(14,14,14,0.4)] lg:flex ${className}`}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: [0, -6, 0] }}
    transition={{
      opacity: { duration: 0.6, delay },
      y: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" },
    }}
  >
    {icon}
    <span className="text-left">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">{k}</span>
      <span className="block text-[13.5px] font-semibold text-navy-dark">{v}</span>
    </span>
  </motion.div>
);

const FAN = [
  { rotate: -7, x: "-56%", y: 46, z: 1, cls: "hidden md:block" },
  { rotate: 0, x: "0%", y: 0, z: 3, cls: "" },
  { rotate: 6, x: "56%", y: 54, z: 2, cls: "hidden md:block" },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-mist pb-24 pt-32 lg:pb-32 lg:pt-40">
    {/* colour, kept to the edges so the type stays clean */}
    <GrainBlob color={COLOURS.orange} className="-left-[260px] top-[180px] h-[640px] w-[560px]" duration={24} />
    <GrainBlob color={COLOURS.lavender} className="-left-[120px] top-[430px] h-[520px] w-[620px] opacity-90" duration={28} drift={24} />
    <GrainBlob color={COLOURS.lavender} className="-right-[260px] top-[260px] h-[560px] w-[600px] opacity-90" duration={26} />
    <GrainBlob color={COLOURS.peach} className="-right-[140px] top-[560px] h-[380px] w-[420px] opacity-80" duration={20} drift={14} />

    <Flight />

    <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to={H.pill.to}
          className="group inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-navy-dark ring-1 ring-line transition-shadow hover:ring-navy-dark/25"
        >
          <span className="rounded-full bg-navy-dark px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
            {H.pill.tag}
          </span>
          {H.pill.text}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      <h1 className="mt-8 text-[2.55rem] font-medium leading-[1] tracking-[-0.05em] text-navy-dark sm:text-[4.2rem] sm:leading-[0.98] lg:text-[5rem]">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
        >
          {H.h1a.split(". ").map((part, n, all) => (
            <span key={part} className="block sm:inline">
              {part}
              {n < all.length - 1 ? ". " : ""}
            </span>
          ))}
        </motion.span>
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          {H.h1b[0]}
          <em className="relative font-medium italic">
            {H.h1b[1]}
            <motion.svg
              viewBox="0 0 200 16"
              className="absolute -bottom-1 left-0 h-3 w-full text-mark-deep sm:-bottom-2 sm:h-4"
              fill="none"
              aria-hidden="true"
            >
              <motion.path
                d="M3 11 C 50 4, 120 3, 197 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1, ease }}
              />
            </motion.svg>
          </em>
          {H.h1b[2]}
        </motion.span>
      </h1>

      <motion.p
        className="mx-auto mt-7 max-w-[38rem] text-[17.5px] leading-relaxed text-navy-dark/75 sm:text-[19px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.28, ease }}
      >
        {H.lead}
      </motion.p>

      <motion.div
        className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.38, ease }}
      >
        <button
          onClick={openBooking}
          className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-8 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-black"
        >
          {H.primary}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <Link
          to="/case-studies"
          className="inline-flex items-center rounded-full bg-white/80 px-8 py-4 text-[15px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 backdrop-blur transition-shadow duration-300 hover:ring-navy-dark/40"
        >
          {H.secondary}
        </Link>
      </motion.div>

      <motion.ul
        className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-navy-dark/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        <li className="flex gap-0.5" aria-label="Five stars">
          {[...Array(5)].map((_, n) => (
            <Star key={n} className="h-3.5 w-3.5 fill-navy-dark text-navy-dark" />
          ))}
        </li>
        {H.trust.map((t, n) => (
          <li key={t} className="flex items-center gap-5">
            {n > 0 && <span className="h-1 w-1 rounded-full bg-navy-dark/30" />}
            {t}
          </li>
        ))}
      </motion.ul>
    </div>

    {/* the work itself */}
    <div className="relative mx-auto mt-20 max-w-[1180px] px-4 sm:px-6 lg:mt-24">
      <Note className="-top-16 left-6 hidden md:block lg:left-2" arrow="down-right">
        {H.note}
      </Note>
      <OutcomeTag
        className="left-[1%] top-[392px] lg:left-[3%]"
        delay={2.1}
        icon={<GoogleMark className="h-5 w-5" />}
        k={H.tags.google.k}
        v={H.tags.google.v}
      />
      <OutcomeTag
        className="right-[1%] -top-[18px] lg:right-[2%]"
        delay={2.4}
        icon={<AiOverviewMark className="h-5 w-5" />}
        k={H.tags.ai.k}
        v={H.tags.ai.v}
      />
      <div className="relative mx-auto h-[400px] max-w-[420px] sm:h-[420px]">
        {H.clippings.map((c, n) => {
          const f = FAN[n];
          return (
            <motion.div
              key={c.pub}
              className={`absolute inset-x-0 top-0 ${f.cls}`}
              style={{ zIndex: f.z }}
              initial={{ opacity: 0, y: 80, rotate: 0, x: "0%" }}
              animate={{ opacity: 1, y: f.y, rotate: f.rotate, x: f.x }}
              transition={{ duration: 1.1, delay: 0.5 + n * 0.12, ease }}
              whileHover={{ y: f.y - 10, transition: { duration: 0.3 } }}
            >
              <Clipping c={c} delay={0.5 + n * 0.12} />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Hero;
