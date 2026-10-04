import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Branded primitives. These are the only places colour, handwriting and tile
 * fills are allowed to appear — see BRAND.md. If a section needs decoration,
 * it uses one of these rather than inventing a wash or a tint.
 */

/* ---------------------------------------------------------------- annotation */

/** Handwritten margin note with a drawn arrow. Used sparingly — one per
 *  section at most — to add craft without adding colour. */
export const Annotation = ({
  children,
  className = "",
  flip = false,
}: {
  children: ReactNode;
  className?: string;
  flip?: boolean;
}) => (
  <motion.span
    className={`pointer-events-none absolute select-none ${className}`}
    initial={{ opacity: 0, y: 6 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: 0.15 }}
    aria-hidden="true"
  >
    <span className="block font-hand text-[22px] leading-[1.1] text-navy-dark/75">
      {children}
    </span>
    <svg
      width="74"
      height="46"
      viewBox="0 0 74 46"
      fill="none"
      className={`mt-0.5 ${flip ? "-scale-x-100" : ""}`}
    >
      <motion.path
        d="M4 2c2 14 10 24 24 29 10 3 20 4 30 2"
        stroke="rgb(var(--ink) / 0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
      />
      <motion.path
        d="M52 28l6 5-7 4"
        stroke="rgb(var(--ink) / 0.5)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1 }}
      />
    </svg>
  </motion.span>
);

/* --------------------------------------------------------------- stat tiles */

export type Tile = "butter" | "mint" | "lilac" | "blush" | "sky";

const TILE: Record<Tile, string> = {
  butter: "bg-butter",
  mint: "bg-mint",
  lilac: "bg-lilac",
  blush: "bg-blush",
  sky: "bg-sky",
};

/** A single result, told as a number and a client. The pastel lives here and
 *  nowhere else. */
export const StatTile = ({
  value,
  label,
  client,
  tile,
  delay = 0,
}: {
  value: string;
  label: string;
  client: string;
  tile: Tile;
  delay?: number;
}) => (
  <motion.div
    className={`flex min-h-[200px] flex-col justify-between rounded-3xl p-6 ${TILE[tile]}`}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    <div>
      <div className="text-[2.6rem] font-semibold leading-none tracking-[-0.035em] text-navy-dark">
        {value}
      </div>
      <div className="mt-1.5 text-[13.5px] text-navy-dark/65">{label}</div>
    </div>
    <div className="text-[17px] font-bold tracking-[-0.02em] text-navy-dark">
      {client}
    </div>
  </motion.div>
);

/** Testimonial tile, sized to sit in the same grid as the stats. */
export const QuoteTile = ({
  quote,
  name,
  role,
  client,
  delay = 0,
}: {
  quote: string;
  name: string;
  role: string;
  client: string;
  delay?: number;
}) => (
  <motion.figure
    className="flex min-h-[200px] flex-col justify-between rounded-3xl bg-white p-6 ring-1 ring-navy-dark/[0.07]"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    <blockquote className="text-[16.5px] leading-[1.5] tracking-[-0.011em] text-navy-dark">
      “{quote}”
    </blockquote>
    <figcaption className="mt-6 flex items-end justify-between gap-4">
      <span>
        <span className="block text-[13.5px] font-semibold text-navy-dark">
          {name}
        </span>
        <span className="block text-[12.5px] text-navy-dark/70">{role}</span>
      </span>
      <span className="text-[15px] font-bold tracking-[-0.02em] text-navy-dark/80">
        {client}
      </span>
    </figcaption>
  </motion.figure>
);

/* ------------------------------------------------------------ section header */

/** The one heading treatment used across the site. */
export const SectionTitle = ({
  eyebrow,
  children,
  align = "left",
  sub,
}: {
  eyebrow?: string;
  children: ReactNode;
  align?: "left" | "center";
  sub?: ReactNode;
}) => (
  <motion.div
    className={`mb-12 ${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
  >
    {eyebrow && (
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
        {eyebrow}
      </p>
    )}
    <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
      {children}
    </h2>
    {sub && (
      <p className="mt-4 text-[16.5px] leading-relaxed text-navy-dark/70">
        {sub}
      </p>
    )}
  </motion.div>
);
