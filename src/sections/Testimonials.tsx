import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";
import { asset } from "@/lib/booking";
import { approvedQuotes } from "@/lib/cases";
import { liveProfiles } from "@/lib/reviews";
import { Eyebrow, H2, rise } from "@/pages/services/kit";

/**
 * What clients say. Two sources only, both real:
 *  - testimonials a client has approved (cases.ts, `approved: true`);
 *  - public review profiles (reviews.ts), shown once their links are filled.
 * When neither exists the section renders nothing.
 */

/** Clutch / Trustpilot ratings as small linked badges. */
export const ReviewBadges = ({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) => {
  const profiles = liveProfiles();
  if (!profiles.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {profiles.map((p) => (
        <li key={p.platform}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener"
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors ${
              dark
                ? "bg-white/[0.08] text-white ring-1 ring-white/15 hover:bg-white/15"
                : "bg-white text-navy-dark ring-1 ring-line hover:ring-navy-dark/30"
            }`}
          >
            <Star className="h-3.5 w-3.5 fill-mark text-mark" />
            {p.rating} on {p.platform}
            <span className={dark ? "text-white/60" : "text-navy-dark/60"}>
              · {p.count} reviews
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </li>
      ))}
    </ul>
  );
};

const ClientVoices = () => {
  const quotes = approvedQuotes();
  const profiles = liveProfiles();
  if (!quotes.length && !profiles.length) return null;

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">In our clients' words</Eyebrow>
          <H2>
            What working
            <br />
            <span className="accent-ink">with us is like.</span>
          </H2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-navy-dark/75">
            Every quote here is published with the client's approval. For
            more, read the reviews on the platforms below.
          </p>
          <ReviewBadges className="mt-7" />
        </motion.div>

        <div className="space-y-4">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.slug}
              className="rounded-[28px] bg-navy-dark p-8 text-white sm:p-10"
              {...rise(0.06 * i)}
            >
              <Quote className="h-7 w-7 text-mark" />
              <blockquote className="mt-5 text-[1.45rem] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[1.75rem]">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  {q.photo && (
                    <img
                      src={asset(q.photo)}
                      alt={q.who}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-mark/50"
                      loading="lazy"
                    />
                  )}
                  <span className="text-[14px] text-white/75">
                    <span className="block font-semibold text-white">
                      {q.who}
                    </span>
                    {q.role}
                  </span>
                </span>
                <Link
                  to={`/case-studies/${q.slug}`}
                  className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-white"
                >
                  Read the {q.client} case study
                  <ArrowRight className="h-4 w-4 text-mark transition-transform group-hover:translate-x-0.5" />
                </Link>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientVoices;
