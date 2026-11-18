import type { ReactNode } from "react";

/**
 * One or two words of a heading in the hero smoke's orange-to-violet. The
 * site's only heading accent: use it once per heading at most, and not in
 * every section.
 */
const Accent = ({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <span
    className={`${dark ? "accent-ink-dark" : "accent-ink"} pr-[0.04em] ${className}`}
  >
    {children}
  </span>
);

export default Accent;
