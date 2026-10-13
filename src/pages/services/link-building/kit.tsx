import type { ReactNode } from "react";

/** Building blocks shared by the Link Building page sections only. The page
 *  has its own type scale and glow treatment, so these are not exported to
 *  the rest of the site. */

export const ease = [0.22, 1, 0.36, 1] as const;

/** Scroll-in rise used by most blocks on the page. */
export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

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
    className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
      dark ? "text-white/70" : "text-navy-dark/70"
    } ${className}`}
  >
    {children}
  </p>
);

export const H2 = ({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <h2
    className={`text-[2.1rem] sm:text-[2.7rem] lg:text-[3.1rem] font-semibold leading-[1.04] tracking-[-0.04em] ${
      dark ? "text-white" : "text-navy-dark"
    } ${className}`}
  >
    {children}
  </h2>
);

/** The quieter second half of a two-part heading. */
export const Soft = ({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) => (
  <span className={dark ? "text-white/60" : "text-navy-dark/60"}>
    {children}
  </span>
);

/** Film grain laid over the glow so gradients read as printed, not digital. */
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

const GLOWS = {
  warm:
    "radial-gradient(55% 65% at 12% 18%, rgba(248,146,84,0.55), transparent 62%)," +
    "radial-gradient(50% 60% at 92% 24%, rgba(167,139,250,0.5), transparent 64%)," +
    "radial-gradient(60% 55% at 55% 105%, rgba(247,214,107,0.55), transparent 66%)",
  cool:
    "radial-gradient(55% 60% at 88% 12%, rgba(147,197,253,0.6), transparent 62%)," +
    "radial-gradient(50% 60% at 8% 70%, rgba(167,139,250,0.48), transparent 64%)," +
    "radial-gradient(55% 50% at 60% 110%, rgba(134,239,172,0.4), transparent 66%)",
  dusk:
    "radial-gradient(60% 70% at 18% 30%, rgba(248,146,84,0.42), transparent 64%)," +
    "radial-gradient(55% 70% at 85% 70%, rgba(167,139,250,0.4), transparent 66%)",
};

/** Product cards sit on a soft, grainy gradient field. This is the only place
 *  the page uses gradient colour. */
export const GlowPanel = ({
  children,
  tone = "warm",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof GLOWS;
  className?: string;
}) => (
  <div className={`relative overflow-hidden rounded-[28px] ${className}`}>
    <div className="absolute inset-0 bg-[#EEEAE4]" aria-hidden="true" />
    <div
      className="absolute inset-0"
      style={{ background: GLOWS[tone] }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
      style={{ backgroundImage: GRAIN }}
      aria-hidden="true"
    />
    <div className="relative">{children}</div>
  </div>
);

/** Same glow, laid loose behind a dark section. */
export const DarkGlow = ({ className = "" }: { className?: string }) => (
  <div
    className={`pointer-events-none absolute blur-[90px] ${className}`}
    style={{ background: GLOWS.dusk }}
    aria-hidden="true"
  />
);

/** Elevation for product-style cards: a hairline ring plus one long, soft
 *  shadow. */
export const CARD =
  "bg-white rounded-2xl ring-1 ring-navy-dark/[0.07] shadow-[0_1px_0_rgba(14,14,14,0.03),0_28px_60px_-30px_rgba(14,14,14,0.38)]";

/** Small sparkline path for trend arrays. */
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
