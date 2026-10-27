import type React from "react";

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

/** A soft colour cloud whose edges break up into grain. Decorative only. */
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
}) => (
  // The drift is a CSS animation of transform only, so it runs on the
  // compositor with no JavaScript per frame (it used to be a motion
  // animation, which cost main-thread time on every frame, even off screen).
  // Reduced motion stops it in index.css.
  <div
    className={`ehq-drift pointer-events-none absolute rounded-full ${className}`}
    style={
      {
        "--drift": `${drift}px`,
        animation: `ehq-drift ${duration}s ease-in-out infinite`,
        background: `radial-gradient(closest-side, ${color} 0%, ${color} 38%, transparent 100%)`,
        WebkitMaskImage: `${NOISE}, radial-gradient(closest-side, #000 55%, transparent 100%)`,
        maskImage: `${NOISE}, radial-gradient(closest-side, #000 55%, transparent 100%)`,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
        WebkitMaskSize: "220px 220px, 100% 100%",
        maskSize: "220px 220px, 100% 100%",
      } as React.CSSProperties
    }
    aria-hidden="true"
  />
);
