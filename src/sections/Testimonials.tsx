import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/booking";
import { COLOURS, GrainBlob } from "@/components/Grain";

/**
 * Client reviews, used twice on the homepage with different jobs:
 *  - FeaturedReview: one voice, set large, backing a specific claim early on.
 *  - ReviewWall: many voices, late on, showing breadth.
 * No quote appears in both.
 *
 * STATUS: sample reviews for design review. Replace with real ones (with
 * permission) before launch.
 */

const FEATURED = {
  text: "They rejected a site we would have happily paid for. That's when we knew the vetting was real, not a sales line.",
  name: "Amira Khan",
  role: "Marketing Director",
  company: "Ocuco",
  avatar: "/images/avatar-3.jpg",
};

const WALL = [
  {
    name: "Sarah Mitchell",
    role: "Agency owner, UK",
    via: "White-label links",
    text: "We've used them for white-label links for over a year. Our clients never see them, and that's exactly how we want it.",
  },
  {
    name: "Omar Haddad",
    role: "Marketing Manager, e-commerce",
    via: "Digital PR",
    text: "Getting into international business press always felt impossible for us. They got us three features in two months.",
  },
  {
    name: "Jessica Lane",
    role: "SEO Consultant",
    via: "Link building",
    text: "What I like most is that they say no. They told me two of my target pages weren't ready for links yet. They were right.",
  },
  {
    name: "Marcus Webb",
    role: "Founder, B2B SaaS",
    via: "Link building",
    text: "Our category page sat on page two for a year. Five months with them and it's at position four.",
  },
  {
    name: "Priya Nair",
    role: "Content Lead, E-commerce",
    via: "Link building",
    text: "The articles are actually good. Proper pieces the sites' readers would want to read, not keyword-stuffed filler.",
  },
  {
    name: "Ahmed Raza",
    role: "Digital agency owner",
    via: "White-label links",
    text: "Fast replies, clear reports, and every link indexed. That's rarer than it should be in this industry.",
  },
  {
    name: "Hannah Brooks",
    role: "Head of Marketing, Fintech",
    via: "Brand mentions",
    text: "About three months in, ChatGPT started naming us when people asked for tools in our space. Our sales team noticed first.",
  },
  {
    name: "Lucas Moreau",
    role: "SEO Lead, Agency",
    via: "Link building",
    text: "I've bought links from a lot of vendors. This is the first one where I didn't have to re-check every site myself.",
  },
  {
    name: "Bilal Ahmed",
    role: "Founder, Shopify store",
    via: "Link building",
    text: "Honest from day one. They told us our product pages weren't ready, fixed the plan around it, and the results came anyway.",
  },
];

/* ------------------------------ featured review ------------------------------ */

export const FeaturedReview = () => (
  <div className="bg-white py-24 lg:py-32">
    <motion.figure
      className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <blockquote className="text-[1.75rem] font-medium leading-[1.25] tracking-[-0.03em] text-navy-dark sm:text-[2.3rem] lg:text-[2.6rem]">
        &ldquo;{FEATURED.text}&rdquo;
      </blockquote>
      <div
        className="mt-9 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--ink) / 0.35), rgb(var(--ink) / 0.04))",
        }}
        aria-hidden="true"
      />
      <figcaption className="mt-6 flex items-center justify-between gap-6">
        <span className="flex items-center gap-3.5">
          <img
            src={asset(FEATURED.avatar)}
            alt=""
            className="h-12 w-12 rounded-full object-cover"
            loading="lazy"
          />
          <span>
            <span className="block text-[15px] font-semibold text-navy-dark">
              {FEATURED.name}
            </span>
            <span className="block text-[13.5px] text-navy-dark/70">
              {FEATURED.role}
            </span>
          </span>
        </span>
        <span className="text-[22px] font-semibold tracking-[-0.04em] text-navy-dark">
          {FEATURED.company}
        </span>
      </figcaption>
    </motion.figure>
  </div>
);

/* -------------------------------- review wall -------------------------------- */

type Review = (typeof WALL)[number];

const ReviewCard = ({ r }: { r: Review }) => (
  <figure className="rounded-[20px] bg-white/[0.05] p-6 ring-1 ring-white/10">
    <figcaption className="flex items-center justify-between gap-3">
      <span>
        <span className="block text-[14px] font-semibold text-white">
          {r.name}
        </span>
        <span className="block text-[12.5px] text-white/70">{r.role}</span>
      </span>
      <span className="flex-none rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
        {r.via}
      </span>
    </figcaption>
    <blockquote className="mt-4 text-[15.5px] leading-[1.6] text-white/85">
      {r.text}
    </blockquote>
  </figure>
);

/** A column that drifts slowly; content is doubled so the loop is seamless. */
const Column = ({
  items,
  duration,
  reverse,
}: {
  items: Review[];
  duration: number;
  reverse?: boolean;
}) => {
  const reduced = useReducedMotion();
  return (
    <div className="overflow-hidden">
      <motion.div
        className="space-y-4"
        animate={
          reduced ? undefined : { y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((r, n) => (
          <div key={n} aria-hidden={n >= items.length}>
            <ReviewCard r={r} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const ReviewWall = () => {
  const cols = [0, 1, 2].map((c) => WALL.filter((_, n) => n % 3 === c));
  return (
    <div className="relative overflow-hidden bg-navy-dark py-24 lg:py-32">
      <GrainBlob
        color={COLOURS.violet}
        className="-left-[320px] top-0 h-[560px] w-[640px] opacity-30"
        duration={30}
      />
      <GrainBlob
        color={COLOURS.orange}
        className="-right-[360px] bottom-[-200px] h-[520px] w-[620px] opacity-20"
        duration={34}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Testimonials
          </p>
          <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.6rem]">
            {"Trusted by teams who "}
            <span className="text-white/65">answer for the numbers</span>
          </h2>
        </motion.div>
        <div
          className="relative mt-14 grid h-[620px] gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            WebkitMaskImage:
              "linear-gradient(transparent, #000 14%, #000 84%, transparent)",
            maskImage:
              "linear-gradient(transparent, #000 14%, #000 84%, transparent)",
          }}
        >
          <div className="sm:hidden">
            <Column items={WALL} duration={90} />
          </div>
          <div className="hidden sm:block">
            <Column items={cols[0]} duration={46} />
          </div>
          <div className="hidden sm:block">
            <Column items={cols[1]} duration={54} reverse />
          </div>
          <div className="hidden lg:block">
            <Column items={cols[2]} duration={50} />
          </div>
        </div>
      </div>
    </div>
  );
};
