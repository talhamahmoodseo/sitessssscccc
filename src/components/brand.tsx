import type { ReactNode } from "react";
import { motion } from "motion/react";
import { asset } from "@/lib/booking";

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

/** A single result: number top, client wordmark anchored bottom-left.
 *  The pastel lives here and nowhere else. */
/** A client's logo in one ink tone, or its wordmark when there is none. */
export const ClientMark = ({
  client,
  logo,
  h = 22,
  className = "",
}: {
  client: string;
  logo?: string;
  h?: number;
  className?: string;
}) =>
  logo ? (
    <img
      src={asset(logo)}
      alt={client}
      loading="lazy"
      style={{ height: h }}
      className={`w-auto brightness-0 ${className}`}
    />
  ) : (
    <Wordmark name={client} className={`text-[19px] text-navy-dark ${className}`} />
  );

export const StatTile = ({
  value,
  label,
  client,
  logo,
  logoH,
  tile,
  delay = 0,
}: {
  value: string;
  label: string;
  client: string;
  logo?: string;
  logoH?: number;
  tile: Tile;
  delay?: number;
}) => (
  <motion.div
    className={`flex aspect-square flex-col justify-between rounded-[26px] p-6 sm:p-7 ${TILE[tile]}`}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    <div>
      <div className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark sm:text-[2.9rem]">
        {value}
      </div>
      <div className="mt-2 text-[14px] leading-snug text-navy-dark/70">
        {label}
      </div>
    </div>
    <ClientMark client={client} logo={logo} h={logoH} className="self-start" />
  </motion.div>
);

/** Testimonial card: the quote carries the weight, then a face, a name and
 *  the client wordmark on the right. Neutral surface so the pastels stay the
 *  loudest thing in the grid. */
export const QuoteTile = ({
  quote,
  name,
  role,
  client,
  logo,
  logoH,
  avatar,
  delay = 0,
}: {
  quote: string;
  name: string;
  role: string;
  client: string;
  logo?: string;
  logoH?: number;
  avatar?: string;
  delay?: number;
}) => (
  <motion.figure
    className="flex h-full flex-col justify-between rounded-[26px] bg-linen/70 p-6 sm:p-8"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    <blockquote className="text-[18px] leading-[1.42] tracking-[-0.018em] text-navy-dark sm:text-[20px]">
      “{quote}”
    </blockquote>

    <figcaption className="mt-8 flex items-center gap-3">
      {avatar && (
        <img
          src={asset(avatar)}
          alt=""
          loading="lazy"
          className="h-11 w-11 flex-none rounded-lg object-cover ring-1 ring-navy-dark/10"
        />
      )}
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[14px] font-semibold text-navy-dark">
          {name}
        </span>
        <span className="block truncate text-[13px] text-navy-dark/70">
          {role}
        </span>
      </span>
      <Wordmark
        name={client}
        className="flex-none text-[18px] text-navy-dark"
      />
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

/* ------------------------------------------------------------------ wordmark */

/** Client names set as logos rather than body text. Until real SVGs land in
 *  public/logos/, each brand gets its own typographic treatment so the grid
 *  reads as a wall of logos instead of a wall of labels. */
const WORDMARK: Record<string, string> = {
  CapCut: "font-extrabold tracking-[-0.045em]",
  Ocuco: "font-bold tracking-[0.18em] uppercase",
  "Khaleej Times": "font-semibold tracking-[-0.01em]",
  "Arabian Business": "font-bold tracking-[-0.02em]",
  "Gulf Business": "font-semibold tracking-[0.04em] uppercase",
  "Tech Daily": "font-extrabold tracking-[-0.03em] lowercase",
};

export const Wordmark = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => (
  <span
    className={`${WORDMARK[name] ?? "font-bold tracking-[-0.02em]"} ${className}`}
  >
    {name}
  </span>
);
