import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Check, Minus, RefreshCw, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { asset } from "@/lib/booking";
import { DarkGlow, Eyebrow, H2, Soft, rise } from "@/pages/services/kit";

/**
 * The two promises behind every order: your money back if we can't deliver
 * what you ordered, and a free replacement if a link is ever removed.
 *
 * One source of truth for the wording. The short lines show up on the
 * homepage, the link building page and the pricing page; the full terms
 * live on /pricing#guarantee-terms. Terms are the owner's policy: confirm
 * any change with them before editing.
 */

type Guarantee = {
  id: string;
  Icon: LucideIcon;
  title: string;
  chip: string;
  line: string;
  covered: string[];
  notCovered: string[];
  claim: string;
};

export const GUARANTEES: Guarantee[] = [
  {
    id: "money-back",
    Icon: RotateCcw,
    title: "100% money-back guarantee",
    chip: "100% money-back",
    line: "If we can't deliver what you ordered, you get every cent back.",
    covered: [
      "We can't find a relevant site for your niche. You get a full refund before any work is billed.",
      "A placement doesn't match your order: the DR tier, a dofollow link in the body of the article, indexed by Google within 30 days. We replace it, or refund that placement in full if you'd rather.",
      "You cancel before your links go live. We refund everything not yet delivered.",
    ],
    notCovered: [
      "Rankings or traffic. Nobody controls Google, so no honest agency guarantees positions.",
      "DR moving after publication. Ahrefs updates DR all the time, so we record it on the day your link goes live.",
      "A change of mind once a link that matches your order is live.",
    ],
    claim:
      "Email us within 30 days of delivery with the link in question. Refunds go back to your original payment method.",
  },
  {
    id: "replacement",
    Icon: RefreshCw,
    title: "Link replacement guarantee",
    chip: "Free link replacement",
    line: "If a publisher ever removes your link or changes it to nofollow, we replace it free.",
    covered: [
      "The publisher removes your link, deletes the article or changes the link to nofollow.",
      "The site goes offline or drops out of Google's index.",
      "Any time after it goes live. There's no 12-month cut-off.",
      "The replacement goes on a relevant site of the same or higher DR, with new content, at no cost to you.",
    ],
    notCovered: [
      "You change, redirect or delete the page your link points to.",
      "You ask for the article to be edited after it's published.",
      "Your own site moves into a niche publishers won't link to, or is penalised by Google.",
    ],
    claim:
      "Send us the link and what happened. We check it within two business days and replace it within 30 days.",
  },
];

/* ----------------------------------- seal ---------------------------------- */

/** A round "100% money back" seal: ring text around a big number. */
export const Seal = ({ className = "h-40 w-40" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} role="img">
    <title>100% money-back guarantee</title>
    <defs>
      <path
        id="seal-ring"
        d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
      />
    </defs>
    <circle cx="100" cy="100" r="98" fill="rgb(var(--mark))" />
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="none"
      stroke="rgb(var(--ink))"
      strokeOpacity="0.25"
      strokeDasharray="2 4"
    />
    <text
      fontSize="13"
      fontWeight="700"
      letterSpacing="3.2"
      fill="rgb(var(--ink))"
    >
      <textPath href="#seal-ring" startOffset="0">
        MONEY-BACK GUARANTEE · RISK-FREE ORDER ·
      </textPath>
    </text>
    <circle cx="100" cy="100" r="58" fill="rgb(var(--ink))" />
    <text
      x="100"
      y="104"
      textAnchor="middle"
      fontSize="38"
      fontWeight="700"
      letterSpacing="-1.5"
      fill="#fff"
    >
      100%
    </text>
    <text
      x="100"
      y="126"
      textAnchor="middle"
      fontSize="11"
      fontWeight="600"
      letterSpacing="1.6"
      fill="rgb(var(--mark))"
    >
      MONEY BACK
    </text>
  </svg>
);

/* ----------------------------------- chips --------------------------------- */

/** One line of the four promises, for heroes and next to order buttons. */
export const GuaranteeChips = ({
  dark = false,
  compact = false,
  className = "",
}: {
  dark?: boolean;
  /** tighter chips, so all four fit on one line in narrow columns */
  compact?: boolean;
  className?: string;
}) => (
  <ul className={`flex flex-wrap ${compact ? "gap-1.5" : "gap-2"} ${className}`}>
    {GUARANTEES.map(({ id, Icon, chip }) => (
      <li
        key={id}
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
          compact ? "px-2.5 py-1 text-[11.5px]" : "px-3 py-1.5 text-[12.5px]"
        } ${
          dark
            ? "bg-white/[0.08] text-white ring-1 ring-white/15"
            : "bg-white text-navy-dark ring-1 ring-line"
        }`}
      >
        <Icon
          className={`h-3.5 w-3.5 ${dark ? "text-mark" : "text-verified"}`}
        />
        {chip}
      </li>
    ))}
  </ul>
);

/* ----------------------------------- band ---------------------------------- */

/** The full promise: seal, headline and the four guarantees on a dark stage. */
export const GuaranteeBand = ({ terms = true }: { terms?: boolean }) => (
  <section className="relative overflow-hidden bg-navy-dark py-24 lg:py-28">
    <DarkGlow className="-left-48 -top-20 h-[520px] w-[760px] opacity-50" />
    <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16 lg:px-8">
      <motion.div {...rise()}>
        <Eyebrow dark className="mb-5">
          Our guarantees
        </Eyebrow>
        <H2 dark>
          Order with zero risk.
          <br />
          <Soft dark>If it's wrong, it's on us.</Soft>
        </H2>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/75">
          Every order, from a single trial link to a full campaign, comes with
          the same two promises, with the terms written out in full.
        </p>
        <div className="mt-9 flex items-center gap-6">
          <Seal className="h-32 w-32 flex-none sm:h-36 sm:w-36" />
          {/* the founder's own word on it, the way the best agencies sign theirs */}
          <figure>
            <blockquote className="text-[15px] font-medium leading-snug text-white">
              “If a link isn't what you paid for, you don't pay for it. Simple
              as that.”
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-2.5">
              <img
                src={asset("/images/talha-avatar.jpg")}
                alt="Talha Mahmood"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-mark/50"
                loading="lazy"
              />
              <span className="text-[13px] text-white/75">
                <span className="font-semibold text-white">Talha Mahmood</span>
                , Founder
              </span>
            </figcaption>
          </figure>
        </div>
        {terms && (
          <Link
            to="/pricing#guarantee-terms"
            className="group mt-7 inline-flex items-center gap-2 text-[14.5px] font-semibold text-white"
          >
            Read the full terms
            <ArrowRight className="h-4 w-4 text-mark transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </motion.div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {GUARANTEES.map(({ id, Icon, title, line }, i) => (
          <motion.li
            key={id}
            className={`rounded-3xl p-6 sm:p-7 ${
              i === 0
                ? "bg-mark text-navy-dark"
                : "bg-white/[0.06] text-white ring-1 ring-white/[0.12]"
            }`}
            {...rise(0.05 + i * 0.06)}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                i === 0 ? "bg-navy-dark text-mark" : "bg-white/10 text-mark"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em]">
              {title}
            </h3>
            <p
              className={`mt-2 text-[14.5px] leading-relaxed ${
                i === 0 ? "text-navy-dark/80" : "text-white/75"
              }`}
            >
              {line}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

/* ----------------------------------- terms --------------------------------- */

/** The plain-English terms behind each guarantee. Lives on /pricing. */
export const GuaranteeTerms = () => (
  <section id="guarantee-terms" className="scroll-mt-24 bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16"
        {...rise()}
      >
        <div>
          <Eyebrow className="mb-4">Guarantee terms</Eyebrow>
          <H2>
            What's covered,
            <br />
            <Soft>in plain English.</Soft>
          </H2>
        </div>
        <p className="text-[17px] leading-relaxed text-navy-dark/75">
          No small print. This is exactly what each guarantee covers, what it
          doesn't, and how to use it.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {GUARANTEES.map(({ id, Icon, title, covered, notCovered, claim }, i) => (
          <motion.article
            key={id}
            id={id}
            className="flex flex-col rounded-3xl bg-mist p-6 ring-1 ring-line sm:p-8"
            {...rise(i * 0.05)}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy-dark text-mark">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-navy-dark">
                {title}
              </h3>
            </div>

            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-verified">
              {notCovered.length ? "Covered" : "What this means"}
            </p>
            <ul className="mt-3 space-y-2.5">
              {covered.map((c) => (
                <li
                  key={c}
                  className="flex gap-2.5 text-[14.5px] leading-relaxed text-navy-dark/85"
                >
                  <Check className="mt-1 h-4 w-4 flex-none text-verified" />
                  {c}
                </li>
              ))}
            </ul>

            {notCovered.length > 0 && (
              <>
                <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-navy-dark/70">
                  Not covered
                </p>
                <ul className="mt-3 space-y-2.5">
                  {notCovered.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2.5 text-[14.5px] leading-relaxed text-navy-dark/75"
                    >
                      <Minus className="mt-1 h-4 w-4 flex-none text-navy-dark/40" />
                      {c}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-auto pt-6 text-[14px] leading-relaxed text-navy-dark/80">
              <span className="font-semibold text-navy-dark">
                How to use it:{" "}
              </span>
              {claim}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
