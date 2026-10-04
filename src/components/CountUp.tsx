import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type CountUpProps = {
  /** omitted on rows that render a custom string instead of a number */
  to?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

/** Counts from 0 to `to` the first time it scrolls into view, on an ease-out
 *  cubic so the last digits settle rather than snap. */
const CountUp = ({
  to = 0,
  prefix = "",
  suffix = "",
  duration = 1.5,
}: CountUpProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export default CountUp;
