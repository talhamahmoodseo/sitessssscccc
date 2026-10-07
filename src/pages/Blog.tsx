import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageHero from "@/components/PageHero";
import { ReadingPaths } from "./blog-depth";
import PageLayout from "@/components/PageLayout";
import { BLOG_POSTS } from "@/lib/content";

/**
 * /blog — the index.
 *
 * Identity: an editorial index, not a card wall. The featured piece is a single
 * oversized object that interlocks the hero; the beats are a navigational map
 * that drives the filter; the archive is the grid; the reading paths sort by
 * why you turned up; the subscribe moment is the page's one amber band.
 *
 * Surface rhythm: stone (hero) → navy-dark → mist → stone → espresso → mark,
 * then the shared navy CTA band. Five distinct surfaces, two of them dark, one
 * amber, longest light run is two.
 */

const EL = ["All", "Link Building", "Digital PR", "AI Search"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const pad = (n: number) => String(n).padStart(2, "0");

const MINUTES = BLOG_POSTS.reduce(
  (n, p) => n + (parseInt(String(p.read), 10) || 0),
  0,
);

/** The three subjects, each framed as the question it answers. */
const BEATS = [
  {
    cat: "Link Building",
    q: "Which pages need authority, and where should it come from?",
    d: "Target-page and anchor decisions, what happens between a pitch and an indexed link, and how the domains behind a placement get chosen.",
  },
  {
    cat: "Digital PR",
    q: "What story earns the coverage in the first place?",
    d: "Editorial angles, the regional press that takes years of relationships to reach, and the difference between a link that moves a page and a mention that moves a brand.",
  },
  {
    cat: "AI Search",
    q: "Why does an engine name one brand and skip another?",
    d: "Citation tracking across engines, what we count as a win, and how the answer layer reads a footprint it was never shown directly.",
  },
];

const ORIGIN = [
  { n: "01", t: "A campaign that ran" },
  { n: "02", t: "AuthorityOS™ research" },
  { n: "03", t: "Written up here" },
];

const ISSUE = [
  "One placement, with the page it pointed at and the position before and after.",
  "What the AI engines started citing in a category that month.",
  "One thing we changed in how we work, and the reason we changed it.",
];

/* =============================== card parts =============================== */

const BlogCover = ({ post, className = "" }) => (
  <div className={`relative overflow-hidden bg-mist ${className}`}>
    <div className={`absolute inset-0 ${post.grad}`} />
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.13]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`grid-${post.slug}`}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 28 0 L 0 0 0 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${post.slug})`} />
    </svg>
    <span
      className="absolute -bottom-7 -right-2 font-medium text-navy-dark/15 text-[9rem] leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
      aria-hidden="true"
    >
      {post.glyph}
    </span>
    <span className="absolute top-4 left-4 text-[9px] font-extrabold tracking-[0.16em] text-navy-dark bg-white/70 border border-navy-dark/10 rounded-full px-3 py-1.5 uppercase">
      {post.category}
    </span>
  </div>
);

/** Archive card: white, lifted, with the slight tilt that belongs to this page. */
const RL = ({ post }) => {
  const s = useRef<any>(null),
    [a, r] = useState({ x: 0, y: 0 }),
    c = (u) => {
      const d = s.current?.getBoundingClientRect();
      if (!d) return;
      const h = (u.clientX - d.left) / d.width - 0.5,
        x = (u.clientY - d.top) / d.height - 0.5;
      r({ x: -x * 6, y: h * 6 });
    };
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block group h-full"
      aria-label={post.title}
    >
      <div
        ref={s}
        onMouseMove={c}
        onMouseLeave={() => r({ x: 0, y: 0 })}
        style={{
          transform: `perspective(900px) rotateX(${a.x}deg) rotateY(${a.y}deg)`,
          transition: "transform 0.18s ease-out",
        }}
        className="flex h-full flex-col bg-white rounded-2xl overflow-hidden border border-line shadow-lift group-hover:shadow-deep transition-shadow duration-500"
      >
        <BlogCover post={post} className="h-44" />
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[10px] font-bold tracking-[0.14em] text-navy-dark/70 uppercase mb-2.5">
            {post.date}
          </p>
          <h3 className="text-[19px] font-bold text-navy-dark leading-snug mb-2.5 group-hover:text-blue-accent transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-[13.5px] text-navy-dark/70 leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-line">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-navy-dark/70">
              <Clock className="w-3.5 h-3.5" />
              {post.read}
              {" read"}
            </span>
            <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-blue-accent">
              Read
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

/* ============================= featured band ============================= */

/** The featured piece, pulled up over the hero so the two surfaces interlock,
 *  with the shape of the index stated as display figures underneath. */
const Featured = ({ post }) => (
  <section className="bg-navy-dark pb-20 lg:pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="-mt-12 lg:-mt-14"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        <Link
          to={`/blog/${post.slug}`}
          className="group grid lg:grid-cols-[0.95fr_1.05fr] bg-white rounded-3xl overflow-hidden shadow-deep transition-transform duration-500 hover:-translate-y-1"
        >
          <BlogCover post={post} className="h-64 lg:h-auto lg:min-h-[360px]" />
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-blue-accent uppercase mb-4">
              {"Featured · "}
              {post.date}
            </p>
            <h2 className="text-balance text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-navy-dark leading-tight mb-4 group-hover:text-blue-accent transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-[15px] text-navy-dark/70 leading-relaxed mb-7">
              {post.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-accent">
              Read the breakdown
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-navy-dark/70">
                <Clock className="w-3.5 h-3.5" />
                {post.read}
              </span>
            </span>
          </div>
        </Link>
      </motion.div>

      <dl className="mt-14 grid gap-x-10 gap-y-9 border-t border-white/15 pt-10 sm:grid-cols-3">
        {[
          { v: pad(BLOG_POSTS.length), k: "Field notes published" },
          { v: String(MINUTES), k: "Minutes of reading, end to end" },
          { v: pad(BEATS.length), k: "Beats we write about" },
        ].map((f, i) => (
          <motion.div
            key={f.k}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <dd className="text-[3rem] font-semibold leading-none tracking-[-0.04em] text-white tabular-nums sm:text-[3.6rem]">
              {f.v}
            </dd>
            <dt className="mt-3 text-[12.5px] leading-snug text-white/70">
              {f.k}
            </dt>
          </motion.div>
        ))}
      </dl>
    </div>
  </section>
);

/* ================================ beats ================================= */

/** The navigational map: three subjects, each the question it answers, each
 *  wired to the archive filter below. */
const Beats = ({ counts, onPick }) => (
  <section className="bg-mist py-24 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.82fr] lg:gap-16">
        <div>
          <motion.p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70"
            {...rise()}
          >
            The beats
          </motion.p>
          <motion.h2
            className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]"
            {...rise(0.05)}
          >
            Three subjects.
            <span className="text-navy-dark/65">
              One question underneath them.
            </span>
          </motion.h2>
          <motion.p
            className="mt-6 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.1)}
          >
            Everything on this index came out of a campaign that ran. A
            placement that took three rewrites before the editor kept it. A
            tracking routine we had to build because no dashboard existed. A
            market where the lead times are twice as long and the relationships
            take years.
          </motion.p>
          <motion.p
            className="mt-5 text-[15.5px] leading-[1.65] text-navy-dark/75"
            {...rise(0.15)}
          >
            The subjects differ. The question underneath them does not: where
            does your brand get referenced, and what does that reference do once
            it is live? Most posts here begin as an AuthorityOS&trade; research
            finding and end as something we changed in how we work.
          </motion.p>
        </div>

        <motion.figure
          className="rounded-3xl border border-line bg-white p-7 shadow-lift lg:p-8"
          {...rise(0.1)}
        >
          <figcaption className="mb-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
            Where a post comes from
          </figcaption>
          <ol className="space-y-3">
            {ORIGIN.map((o, i) => (
              <li key={o.n}>
                <div className="flex items-center gap-3.5 rounded-xl bg-white px-5 py-4 shadow-soft">
                  <span className="text-[12px] font-bold tabular-nums text-navy-dark/70">
                    {o.n}
                  </span>
                  <span className="text-[14px] font-semibold text-navy-dark">
                    {o.t}
                  </span>
                </div>
                {i < ORIGIN.length - 1 && (
                  <ArrowRight
                    className="mx-auto my-2 h-4 w-4 rotate-90 text-navy-dark/50"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-navy-dark/12 pt-5 text-[12.5px] leading-relaxed text-navy-dark/75">
            Roughly one finding in three survives to publication. The rest stay
            in client reporting, where they are more use.
          </p>
        </motion.figure>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {BEATS.map((b, i) => (
          <motion.button
            key={b.cat}
            type="button"
            onClick={() => onPick(b.cat)}
            className="group flex h-full flex-col rounded-2xl border border-line p-6 text-left transition-all duration-300 hover:border-navy-dark/30 hover:bg-white hover:shadow-lift lg:p-7"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
          >
            <span className="mb-5 flex items-baseline justify-between gap-4">
              <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-navy-dark tabular-nums">
                {pad(counts[b.cat] ?? 0)}
              </span>
              <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/70">
                {b.cat}
              </span>
            </span>
            <span className="mb-2.5 block text-[15.5px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
              {b.q}
            </span>
            <span className="block text-[13.5px] leading-relaxed text-navy-dark/75">
              {b.d}
            </span>
            <span className="mt-6 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-navy-dark">
              Filter the archive
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

/* =============================== newsletter =============================== */

/** The page's one amber band: the single moment worth remembering here is the
 *  subscribe. Ink on amber is 12.7:1. */
const FieldNotes = () => (
  <section className="bg-white py-20 lg:py-24">
    <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
      <div>
        <motion.p
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/75"
          {...rise()}
        >
          The Field Notes
        </motion.p>
        <motion.h2
          className="text-balance text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.5rem]"
          {...rise(0.05)}
        >
          One tactical email a month.
          <span className="text-navy-dark/70">
            Written the week it goes out.
          </span>
        </motion.h2>
        <motion.p
          className="mt-5 max-w-md text-[15px] leading-relaxed text-navy-dark/80"
          {...rise(0.1)}
        >
          What moved rankings and AI citations this month, taken from live
          campaigns: the placement, the page it pointed at, and what happened
          after it indexed.
        </motion.p>
        <motion.div className="mt-8" {...rise(0.15)}>
          <a
            href="mailto:contact@talhamahmood.com?subject=Subscribe%20me%20to%20The%20Field%20Notes"
            className="group inline-flex items-center gap-2 rounded-xl bg-navy-dark px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black"
          >
            Get the next issue
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="rounded-2xl border border-navy-dark/15 bg-white/45 p-7"
        {...rise(0.1)}
      >
        <p className="mb-5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-navy-dark/75">
          What is in an issue
        </p>
        <ul className="space-y-4">
          {ISSUE.map((t, i) => (
            <li key={t} className="flex gap-3.5">
              <span className="pt-0.5 text-[12px] font-bold tabular-nums text-navy-dark/70">
                {pad(i + 1)}
              </span>
              <span className="text-[13.5px] leading-relaxed text-navy-dark/85">
                {t}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-navy-dark/15 pt-5 text-[12px] leading-relaxed text-navy-dark/75">
          Twelve issues a year, and the one-click unsubscribe sits at the top of
          every one.
        </p>
      </motion.div>
    </div>
  </section>
);

/* ================================= page ================================= */

const Blog = () => {
  const [e, s] = useState("All"),
    a = BLOG_POSTS.find((u) => u.featured) ?? BLOG_POSTS[0],
    r = BLOG_POSTS.filter((u) => u.slug !== a.slug),
    /* "All" leaves the featured piece to the band above rather than repeating
       it; a filtered view is a straight archive query, so the beat numerals
       below always match what the grid returns. */
    c = e === "All" ? r : BLOG_POSTS.filter((u) => u.category === e),
    shown = e === "All" ? BLOG_POSTS.length : c.length;

  const counts: Record<string, number> = {};
  BLOG_POSTS.forEach((p) => {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  });

  const pick = (cat: string) => {
    s(cat);
    document.getElementById("archive")?.scrollIntoView();
  };

  return (
    <PageLayout>
      <Seo
        title="Blog"
        description="Link building, digital PR and AI search, written from live campaigns by the strategists running them."
      />
      <PageHero
        compact={true}
        eyebrow="The Blog"
        title={
          <>
            {"Notes from "}
            <span className="text-navy-dark/65">the field</span>.
          </>
        }
        sub="Link building, digital PR and AI search — written from live campaigns by the strategists running them."
      />

      <Featured post={a} />

      <Beats counts={counts} onPick={pick} />

      <section id="archive" className="bg-stone py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="max-w-2xl" {...rise()}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              The archive
            </p>
            <h2 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark sm:text-[2.5rem]">
              Everything, newest first.
              <span className="text-navy-dark/65">Or narrow it down.</span>
            </h2>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-navy-dark/15 pt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {EL.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => s(u)}
                aria-pressed={e === u}
                className={`rounded-full px-5 py-3 min-h-[42px] text-[12.5px] font-semibold transition-all duration-300 ${
                  e === u
                    ? "bg-navy-dark text-white shadow-lift"
                    : "bg-white text-navy-dark/75 border border-line shadow-soft hover:text-navy-dark hover:border-navy-dark/25"
                }`}
              >
                {u}
              </button>
            ))}
            <span className="ml-auto text-[12px] font-semibold tabular-nums text-navy-dark/70">
              {shown}
              {shown === 1 ? " post" : " posts"}
            </span>
          </motion.div>

          <motion.div
            key={e}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-9"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.09 } },
            }}
          >
            {c.map((u) => (
              <motion.div
                key={u.slug}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.55, ease: EASE },
                  },
                }}
              >
                <RL post={u} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ReadingPaths />

      <FieldNotes />
    </PageLayout>
  );
};

export { BlogCover };
export default Blog;
