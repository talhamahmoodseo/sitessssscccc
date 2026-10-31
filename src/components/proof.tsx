import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { asset } from "@/lib/booking";
import type { CaseStudy } from "@/lib/cases";
import type { Chip } from "@/lib/stories";
import { ClientMark } from "./brand";
import { AiOverviewMark, GoogleMark } from "./PlatformMarks";

/**
 * Proof kit (round 13), shared by the homepage hero, the case studies page,
 * pricing and the pilot page so client proof looks the same everywhere:
 * - SiteShot: the client's own homepage in a slim browser frame;
 * - Avatar: the person behind a quote (photo, else the client's logo);
 * - ProofChip: one small piece of evidence (a Google result, an AI Overview,
 *   a press clipping, a list from the case file);
 * - ResultCard: a case study as a card, homepage on top, three figures below.
 */

/* --------------------------------------------------------------- site shot */

export const SiteShot = ({
  src,
  domain,
  alt,
  pos = "50% 0%",
  ratio = "aspect-[11/5]",
  eager = false,
  className = "",
  children,
}: {
  src: string;
  domain: string;
  alt: string;
  /** object-position, so the part that matters stays in view */
  pos?: string;
  ratio?: string;
  eager?: boolean;
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-white ring-1 ring-navy-dark/10 ${className}`}
  >
    <div className="flex items-center gap-3 border-b border-navy-dark/[0.07] bg-[#F3F2EF] px-3.5 py-2">
      <span className="flex flex-none gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-navy-dark/15" />
        <span className="h-2 w-2 rounded-full bg-navy-dark/15" />
        <span className="h-2 w-2 rounded-full bg-navy-dark/15" />
      </span>
      <span className="flex min-w-0 flex-1 justify-center">
        <span className="flex min-w-0 items-center gap-1.5 rounded-md bg-white px-3 py-[3px] text-[11px] font-medium text-navy-dark/70 ring-1 ring-navy-dark/[0.06]">
          <Lock className="h-2.5 w-2.5 flex-none" aria-hidden="true" />
          <span className="truncate">{domain}</span>
        </span>
      </span>
      <span className="w-[34px] flex-none" aria-hidden="true" />
    </div>
    <div className={`relative overflow-hidden ${ratio}`}>
      <img
        src={asset(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: pos }}
      />
      {children}
    </div>
  </div>
);

/* ------------------------------------------------------------------ avatar */

export const Avatar = ({
  name,
  photo,
  logo,
  size = 40,
}: {
  name: string;
  photo?: string;
  logo?: string;
  size?: number;
}) =>
  photo ? (
    <img
      src={asset(photo)}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      className="flex-none rounded-full object-cover ring-2 ring-white"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className="flex flex-none items-center justify-center rounded-full bg-white ring-1 ring-navy-dark/10"
      style={{ width: size, height: size }}
    >
      {logo ? (
        <img
          src={asset(logo)}
          alt={name}
          loading="lazy"
          className="max-h-[42%] max-w-[72%] brightness-0"
        />
      ) : (
        <span className="text-[13px] font-semibold text-navy-dark">
          {name.slice(0, 1)}
        </span>
      )}
    </span>
  );

/* ------------------------------------------------------------- proof chips */

const CHIP =
  "rounded-[18px] bg-white p-4 text-left ring-1 ring-navy-dark/[0.08] shadow-[0_22px_44px_-24px_rgb(var(--ink)/0.4)]";

const Label = ({ children }: { children: ReactNode }) => (
  <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy-dark/55">
    {children}
  </p>
);

export const ProofChip = ({ chip, className = "" }: { chip: Chip; className?: string }) => {
  switch (chip.kind) {
    case "serp":
      return (
        <div className={`${CHIP} ${className}`}>
          <div className="flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-[12px] text-navy-dark/80">
            <GoogleMark className="h-3.5 w-3.5 flex-none" />
            <span className="truncate">{chip.query}</span>
          </div>
          <div className="mt-3 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-navy-dark text-[11px] font-bold text-white">
              1
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] text-navy-dark/65">
                {chip.name} · {chip.url}
              </p>
              <p className="mt-0.5 text-[13.5px] font-medium leading-snug text-[#1a0dab]">
                {chip.title}
              </p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-navy-dark/60">{chip.note}</p>
        </div>
      );
    case "ai":
      return (
        <div className={`${CHIP} ${className}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold text-navy-dark">
              <AiOverviewMark className="h-3.5 w-3.5" />
              AI Overview
            </span>
            <span className="truncate rounded-full bg-mist px-2.5 py-1 text-[11px] text-navy-dark/70">
              {chip.query}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-[1.5] text-navy-dark/80">
            {chip.before}
            <span className="font-semibold text-navy-dark underline decoration-[#7C5CF6] decoration-2 underline-offset-[3px]">
              {chip.hl}
            </span>
            {chip.after}
          </p>
          <p className="mt-3 text-[11px] text-navy-dark/60">{chip.note}</p>
        </div>
      );
    case "list":
      return (
        <div className={`${CHIP} ${className}`}>
          <Label>{chip.title}</Label>
          <ul className="mt-3 space-y-2">
            {chip.items.map((i) => (
              <li key={i.t} className="flex items-start gap-2">
                <Check className="mt-[3px] h-3.5 w-3.5 flex-none text-verified" aria-hidden="true" />
                <span className="min-w-0 text-[12.5px] leading-snug text-navy-dark">
                  {i.t}
                  {i.d && <span className="block text-[11px] text-navy-dark/60">{i.d}</span>}
                </span>
              </li>
            ))}
          </ul>
          {chip.more && chip.more !== "+0 more" && (
            <p className="mt-2.5 pl-[22px] text-[11.5px] text-navy-dark/60">{chip.more}</p>
          )}
        </div>
      );
    case "press":
      return (
        <div className={`${CHIP} ${className}`}>
          <Label>{chip.outlet}</Label>
          <p className="mt-2 font-news text-[17px] font-medium leading-[1.25] text-navy-dark">
            {chip.title}
          </p>
          <p className="mt-3 text-[11px] text-navy-dark/60">{chip.note}</p>
        </div>
      );
    case "excerpt":
      return (
        <div className={`${CHIP} ${className}`}>
          <Label>{chip.site}</Label>
          <p className="mt-2 font-news text-[15px] leading-[1.45] text-navy-dark/85">
            {chip.before}
            <span className="bg-mark/70 px-0.5 text-navy-dark underline decoration-navy-dark/40 underline-offset-2">
              {chip.hl}
            </span>
            {chip.after}
          </p>
        </div>
      );
    case "flow":
      return (
        <div className={`${CHIP} ${className}`}>
          <Label>{chip.title}</Label>
          <ol className="mt-3 flex flex-wrap items-center gap-1.5">
            {chip.steps.map((st, i) => (
              <li key={st} className="flex items-center gap-1.5">
                <span className="rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium text-navy-dark">
                  {st}
                </span>
                {i < chip.steps.length - 1 && (
                  <ArrowRight className="h-3 w-3 text-navy-dark/40" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      );
    case "mix": {
      const max = Math.max(...chip.items.map((i) => i.n), 1);
      return (
        <div className={`${CHIP} ${className}`}>
          <Label>{chip.title}</Label>
          <ul className="mt-3 space-y-2.5">
            {chip.items.map((i) => (
              <li key={i.k}>
                <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                  <span className="text-navy-dark">{i.k}</span>
                  <span className="font-semibold tabular-nums text-navy-dark">{i.n}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-navy-dark/[0.07]">
                  <div
                    className="h-full rounded-full bg-navy-dark/80"
                    style={{ width: `${(i.n / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
};

/* ------------------------------------------------------------- result card */

/** where each client's screenshot should sit inside a frame */
const SHOT: Record<string, { src: string; domain: string; pos: string }> = {
  smiletutor: { src: "/images/cases/smiletutor-site.webp", domain: "smiletutor.sg", pos: "50% 0%" },
  cryptodesk: {
    src: "/images/cases/cryptodesk-serp-exchange.webp",
    domain: "google.com",
    pos: "50% 100%",
  },
  ocuco: { src: "/images/cases/ocuco-site.webp", domain: "ocuco.com", pos: "0% 50%" },
  capcut: { src: "/images/cases/capcut-site.webp", domain: "capcut.com", pos: "50% 30%" },
  defender: { src: "/images/cases/defender-site.webp", domain: "defendercameras.com", pos: "0% 50%" },
};

export const caseShot = (c: CaseStudy) => SHOT[c.slug];

/** the screenshot panel at the top of a result card */
const CardMedia = ({ c }: { c: CaseStudy }) => {
  const shot = caseShot(c);
  if (shot) {
    return (
      <SiteShot
        src={shot.src}
        domain={shot.domain}
        pos={shot.pos}
        alt={c.slug === "cryptodesk" ? `Google results with ${c.client} first` : `${c.client}'s homepage`}
        ratio="aspect-[16/10]"
        className="shadow-[0_18px_40px_-22px_rgb(var(--ink)/0.45)] transition-transform duration-700 group-hover:-translate-y-1.5"
      />
    );
  }
  // no public site (the agency partner): show the partner's own words instead
  const t = c.testimonial;
  return (
    <div className="rounded-2xl bg-white/80 p-5 shadow-[0_18px_40px_-22px_rgb(var(--ink)/0.35)] backdrop-blur transition-transform duration-700 group-hover:-translate-y-1.5">
      <p className="text-[14px] leading-relaxed text-navy-dark/85">
        &ldquo;{t?.text.split(". ")[0]}.&rdquo;
      </p>
      {t && (
        <div className="mt-4 flex items-center gap-2.5">
          <Avatar name={t.who} photo={t.photo} size={32} />
          <span className="text-[12.5px] font-semibold text-navy-dark">
            {t.who}
            <span className="block text-[11.5px] font-normal text-navy-dark/65">{t.role}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export const ResultCard = ({
  c,
  delay = 0,
}: {
  c: CaseStudy;
  delay?: number;
}) => (
  <motion.div
    className="h-full"
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link
      to={`/case-studies/${c.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgb(var(--ink)/0.4)]"
    >
      <div className={`relative h-[208px] overflow-hidden px-6 pt-6 ${c.tint}`}>
        <CardMedia c={c} />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <ClientMark client={c.client} logo={c.logo} h={16} className="max-w-[110px]" />
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-navy-dark/55">
            {c.sector.split(" · ")[0]}
          </span>
        </div>
        <h3 className="mt-4 text-[1.28rem] font-semibold leading-[1.2] tracking-[-0.025em] text-navy-dark">
          {c.card}
        </h3>
        <dl className="mt-5 grid grid-cols-3 gap-2">
          {c.headline.slice(0, 3).map((h) => (
            <div key={h.l} className="rounded-xl bg-mist px-3 py-3">
              <dt className="sr-only">{h.l}</dt>
              <dd className="text-[1.12rem] font-semibold leading-none tracking-[-0.03em] text-navy-dark">
                {h.v}
              </dd>
              <dd className="mt-1.5 line-clamp-3 text-[11px] leading-snug text-navy-dark/70">
                {h.l}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 line-clamp-3 text-[14px] leading-relaxed text-navy-dark/75">
          {c.summary}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-navy-dark">
          Read the case study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  </motion.div>
);
