import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Homepage building blocks. The homepage sets type lighter than the inner
 *  pages (medium weight, very tight tracking, an italic accent word), which
 *  is the editorial register the owner asked for. */

export const ease = [0.22, 1, 0.36, 1] as const;

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease },
});

/** [before, accent, after] — the accent is set in italic. */
export type Accented = string[];

export const Accent = ({ parts }: { parts: Accented }) => (
  <>
    {parts[0]}
    {parts[1] && <em className="font-medium italic">{parts[1]}</em>}
    {parts[2]}
  </>
);

export const Eyebrow = ({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <p
    className={`text-[11.5px] font-semibold uppercase tracking-[0.18em] ${
      dark ? "text-white/70" : "text-navy-dark/70"
    } ${className}`}
  >
    {children}
  </p>
);

export const Title = ({
  children,
  dark = false,
  center = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) => (
  <h2
    className={`text-[2.3rem] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[2.9rem] lg:text-[3.4rem] ${
      dark ? "text-white" : "text-navy-dark"
    } ${center ? "mx-auto text-center" : ""} ${className}`}
  >
    {children}
  </h2>
);

/** Section heading block: eyebrow, title, optional lead. */
export const Head = ({
  eyebrow,
  title,
  lead,
  dark = false,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  title: Accented;
  lead?: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) => (
  <motion.div
    className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    {...rise()}
  >
    {eyebrow && (
      <Eyebrow dark={dark} className="mb-5">
        {eyebrow}
      </Eyebrow>
    )}
    <Title dark={dark} center={center}>
      <Accent parts={title} />
    </Title>
    {lead && (
      <p
        className={`mt-6 text-[17px] leading-relaxed sm:text-[18.5px] ${
          dark ? "text-white/70" : "text-navy-dark/75"
        } ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
      >
        {lead}
      </p>
    )}
  </motion.div>
);

/* --------------------------- grainy colour --------------------------- */

/** Alpha noise. Used as a mask so colour dissolves into grain at its edges,
 *  the way risograph ink does, instead of fading smoothly. */
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.6 -0.3'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export const COLOURS = {
  orange: "#E8572A",
  peach: "#F59E6B",
  lavender: "#B9A4F7",
  violet: "#9C82F2",
  butter: "#F6D776",
};

/** A soft colour cloud whose edges break up into grain. */
export const GrainBlob = ({
  color,
  className = "",
  drift = 18,
  duration = 22,
}: {
  color: string;
  className?: string;
  drift?: number;
  duration?: number;
}) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        background: `radial-gradient(closest-side, ${color} 0%, ${color} 38%, transparent 100%)`,
        WebkitMaskImage: `${NOISE}, radial-gradient(closest-side, #000 55%, transparent 100%)`,
        maskImage: `${NOISE}, radial-gradient(closest-side, #000 55%, transparent 100%)`,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
        WebkitMaskSize: "220px 220px, 100% 100%",
        maskSize: "220px 220px, 100% 100%",
      }}
      animate={
        reduced
          ? undefined
          : { x: [0, drift, -drift * 0.6, 0], y: [0, -drift * 0.7, drift * 0.5, 0] }
      }
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
};

/* ---------------------------- handwriting ---------------------------- */

/** A handwritten note with a drawn arrow. One per section at most. */
export const Note = ({
  children,
  className = "",
  arrow = "down-right",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  arrow?: "down-right" | "down-left" | "left";
  dark?: boolean;
}) => {
  const paths = {
    "down-right": "M6 6 C 10 30, 30 46, 58 50 M50 42 L58 50 L48 56",
    "down-left": "M58 6 C 54 30, 34 46, 6 50 M14 42 L6 50 L16 56",
    left: "M60 30 C 44 20, 24 22, 6 32 M14 24 L6 32 L15 38",
  };
  return (
    <motion.div
      className={`pointer-events-none absolute font-hand text-[24px] leading-[1.05] ${
        dark ? "text-white/80" : "text-navy-dark/80"
      } ${className}`}
      initial={{ opacity: 0, rotate: -4 }}
      whileInView={{ opacity: 1, rotate: -6 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      aria-hidden="true"
    >
      <span className="block">{children}</span>
      <svg width="64" height="60" viewBox="0 0 64 60" fill="none" className="mt-1">
        <motion.path
          d={paths[arrow]}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
        />
      </svg>
    </motion.div>
  );
};

export const CARD =
  "bg-white rounded-2xl ring-1 ring-navy-dark/[0.07] shadow-[0_1px_0_rgba(14,14,14,0.03),0_30px_60px_-32px_rgba(14,14,14,0.35)]";

export const sparkPath = (data: number[], w: number, h: number, pad = 3) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};
