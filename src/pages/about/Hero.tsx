import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { openBooking } from "@/lib/booking";
import { ease } from "../services/kit";
import { about as A } from "./content";

type Tile = (typeof A.hero.tiles)[number];

/* depth 0 sits sharp and close; 1 and 2 sit further back, smaller and soft */
const DEPTH = [
  { scale: 1, blur: 0, opacity: 1 },
  { scale: 0.88, blur: 1.5, opacity: 0.85 },
  { scale: 0.76, blur: 3.5, opacity: 0.6 },
];

const ResultTile = ({ t, i }: { t: Tile; i: number }) => {
  const reduced = useReducedMotion();
  const d = DEPTH[t.depth];
  return (
    <motion.div
      className={`absolute hidden lg:block ${t.pos}`}
      style={{ filter: d.blur ? `blur(${d.blur}px)` : undefined }}
      initial={{ opacity: 0, scale: d.scale * 0.9 }}
      animate={{
        opacity: d.opacity,
        scale: d.scale,
        y: reduced ? 0 : [0, i % 2 ? -12 : 12, 0],
      }}
      transition={{
        opacity: { duration: 0.9, delay: 0.4 + i * 0.12 },
        scale: { duration: 0.9, delay: 0.4 + i * 0.12, ease },
        y: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
      }}
      aria-hidden={t.depth > 0}
    >
      <TileCard t={t} />
    </motion.div>
  );
};

const TileCard = ({ t }: { t: Tile }) => (
  <div
    className={`${t.tint} flex h-[172px] w-[184px] flex-col justify-between rounded-[22px] p-5 shadow-[0_30px_60px_-40px_rgba(14,14,14,0.45)]`}
  >
    <span>
      <span className="block text-[2rem] font-semibold leading-none tracking-[-0.045em] text-navy-dark">
        {t.v}
      </span>
      <span className="mt-1.5 block text-[13px] leading-snug text-navy-dark/75">
        {t.l}
      </span>
    </span>
    <span className="text-[12.5px] font-bold tracking-[-0.01em] text-navy-dark">
      {t.s}
    </span>
  </div>
);

/**
 * Centred statement inside a slowly drifting field of result tiles. The
 * nearer tiles are sharp, the further ones smaller and softer, so the
 * heading reads first and the proof sits around it.
 */
const Hero = () => {
  const H = A.hero;
  return (
    <section className="relative overflow-hidden bg-mist pb-20 pt-32 lg:pb-0 lg:pt-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:min-h-[700px] lg:px-8">
        {H.tiles.map((t, i) => (
          <ResultTile key={t.v + t.l} t={t} i={i} />
        ))}

        <div className="relative z-10 mx-auto max-w-3xl text-center lg:pt-40">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {H.eyebrow}
          </motion.p>
          <h1 className="mt-6">
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.8rem] lg:text-[4.6rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
            >
              {H.h1a}
            </motion.span>
            <motion.span
              className="mt-1 block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark/60 sm:text-[3.8rem] lg:text-[4.6rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.14, ease }}
            >
              {H.h1b}
            </motion.span>
          </h1>
          <motion.p
            className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-navy-dark/75 sm:text-[18px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            {H.lead}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            <button
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              {H.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <Link
              to="/case-studies"
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-dark ring-1 ring-navy-dark/15 transition-shadow duration-300 hover:ring-navy-dark/40"
            >
              {H.secondary}
            </Link>
          </motion.div>
          <motion.p
            className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/70 lg:mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Tiles show sample results
          </motion.p>
        </div>

        {/* phones and tablets: the sharp tiles in a row instead of floating */}
        <div className="-mx-4 mt-12 flex gap-3 overflow-x-auto px-4 pb-2 lg:hidden">
          {H.tiles.map((t) => (
            <div key={t.v + t.l} className="flex-none">
              <TileCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
