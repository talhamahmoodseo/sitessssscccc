/**
 * Editorial HQ logo. The mark is a ring with one line reaching out of it
 * to an amber dot: a brand, and the placement it earns somewhere else.
 */

export const LogoMark = ({
  className = "h-10 w-10",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) => {
  const tile = invert ? "#FFFFFF" : "rgb(var(--ink))";
  const line = invert ? "rgb(var(--ink))" : "#FFFFFF";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill={tile} />
      <circle
        cx="17"
        cy="23"
        r="7.5"
        fill="none"
        stroke={line}
        strokeWidth="3.6"
      />
      <path
        d="M22.6 17.4 L28.6 11.4"
        stroke={line}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <circle cx="29.6" cy="10.4" r="3.6" fill="rgb(var(--mark))" />
    </svg>
  );
};

const Logo = ({
  invert = false,
  className = "",
  hideWordOnMobile = false,
}: {
  invert?: boolean;
  className?: string;
  hideWordOnMobile?: boolean;
}) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <LogoMark invert={invert} className="h-9 w-9 flex-none" />
    <span
      className={`text-[1.3rem] font-bold tracking-[-0.04em] ${
        invert ? "text-white" : "text-navy-dark"
      } ${hideWordOnMobile ? "hidden sm:block" : ""}`}
    >
      Editorial HQ
    </span>
  </span>
);

export default Logo;
