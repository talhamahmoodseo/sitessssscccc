import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { PaperPlaneFigure } from "./LineArt";

/**
 * The paper plane flies a real curve, driven by scroll.
 *
 * A hidden path defines the flight. On mount we sample it into a table of
 * points and tangent angles; scroll progress indexes that table, so the plane
 * follows the curve and banks into it the way a drawn flight path should. A
 * dashed contrail draws in behind it.
 *
 * Scroll progress is spring-smoothed, which is what separates this from the
 * usual jittery scroll-scrub — the plane keeps flying for a beat after the
 * wheel stops, then settles.
 *
 * The SVG uses preserveAspectRatio="none" so its viewBox maps linearly onto the
 * measured container, letting the same arithmetic place both the trail and the
 * plane. Without that the two drift apart at different viewport widths.
 */

const VB_W = 1200;
const VB_H = 470;
const SAMPLES = 240;
const FLIGHT = "M -40 330 C 230 285 370 140 620 170 C 830 196 950 100 1260 18";

type Frame = { x: number; y: number; angle: number };

const PlaneFlight = () => {
  const reduced = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const sizeRef = useRef({ w: 1200, h: 470 });
  const [frames, setFrames] = useState<Frame[] | null>(null);

  /* sample the curve once, in viewBox units */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const out: Frame[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const d = (i / SAMPLES) * total;
      const p = path.getPointAtLength(d);
      const q = path.getPointAtLength(Math.min(d + 2, total));
      out.push({
        x: p.x,
        y: p.y,
        angle: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI,
      });
    }
    setFrames(out);
  }, []);

  /* keep the viewBox→pixel scale current */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      sizeRef.current = { w: r.width, h: r.height };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const frame = (p: number): Frame => {
    if (!frames) return { x: 0, y: 0, angle: 0 };
    const i = Math.min(
      frames.length - 1,
      Math.max(0, Math.round(p * (frames.length - 1))),
    );
    return frames[i];
  };

  const x = useTransform(
    progress,
    (p) => (frame(p).x / VB_W) * sizeRef.current.w,
  );
  const y = useTransform(
    progress,
    (p) => (frame(p).y / VB_H) * sizeRef.current.h,
  );
  const rotate = useTransform(progress, (p) => frame(p).angle);
  const scale = useTransform(progress, [0, 1], [1, 0.74]);
  const opacity = useTransform(progress, [0, 0.84, 1], [1, 1, 0]);

  const still = reduced || frames === null;

  /**
   * The contrail length is always a motion value, never a bare number.
   *
   * It used to be `still ? { pathLength: 1 } : { pathLength: trail }`, and
   * swapping a static number for a MotionValue between renders left the
   * attribute stuck at its first value — the trail rendered fully drawn before
   * a single pixel of scroll. Driving one motion value in both states, and
   * setting it to 1 only when the flight is disabled, keeps the binding stable.
   */
  const trail = useMotionValue(0);
  useMotionValueEvent(progress, "change", (v) => {
    if (!still) trail.set(v);
  });
  useEffect(() => {
    if (still) trail.set(1);
  }, [still, trail]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-x-0 top-[11rem] z-0 h-[470px] overflow-hidden lg:top-[12rem]"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <motion.path
          ref={pathRef}
          d={FLIGHT}
          stroke="rgb(var(--ink) / 0.16)"
          strokeWidth={1.5}
          strokeDasharray="2 11"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: trail }}
        />
      </svg>

      <motion.div
        className="absolute left-0 top-0 w-[112px] -translate-x-1/2 -translate-y-1/2 text-navy-dark xl:w-[132px]"
        style={
          still
            ? { left: "76%", top: "26%", rotate: -12 }
            : { x, y, rotate, scale, opacity }
        }
      >
        <motion.div
          animate={still ? {} : { y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PaperPlaneFigure className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PlaneFlight;
