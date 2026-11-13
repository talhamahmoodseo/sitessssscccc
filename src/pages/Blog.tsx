import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Link2,
  Newspaper,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { BLOG_POSTS } from "@/lib/content";
import { ease, rise } from "./services/kit";

type Post = (typeof BLOG_POSTS)[number];

const CATEGORIES = ["All", "Link Building", "Digital PR", "AI Search"];

const CAT_ICON: Record<string, LucideIcon> = {
  "Link Building": Link2,
  "Digital PR": Newspaper,
  "AI Search": Sparkles,
};

/**
 * Editorial cover: the article's short cover line set large on its colour,
 * with the category and a small mark. Typographic on purpose, so every cover
 * is consistent and none of them look like stock art.
 */
export const BlogCover = ({
  post,
  className = "",
  small = false,
  large = false,
}: {
  post: Post;
  className?: string;
  small?: boolean;
  large?: boolean;
}) => {
  const Icon = CAT_ICON[post.category] ?? Sparkles;
  return (
    <div className={`relative overflow-hidden ${post.grad} ${className}`}>
      <Icon
        className={`absolute text-navy-dark/[0.12] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 ${
          small
            ? "bottom-3 right-3 h-10 w-10"
            : large
              ? "-right-8 -top-8 h-56 w-56"
              : "-right-6 -top-6 h-32 w-32"
        }`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
      {!small && (
        <div
          className={`relative flex h-full flex-col justify-between ${large ? "p-7 sm:p-9" : "p-5"}`}
        >
          <span className="w-fit rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-navy-dark">
            {post.category}
          </span>
          <span
            className={`block max-w-[90%] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-navy-dark ${
              large ? "text-[2.2rem] sm:text-[3rem]" : "text-[1.55rem]"
            }`}
          >
            {post.cover}
          </span>
        </div>
      )}
    </div>
  );
};

const Meta = ({ p }: { p: Post }) => (
  <p className="text-[12.5px] text-navy-dark/70">
    {p.category} · {p.date} · {p.read} read
  </p>
);

const FeaturedCard = ({ p, delay }: { p: Post; delay: number }) => (
  <motion.article {...rise(delay)}>
    <Link to={`/blog/${p.slug}`} className="group block">
      <BlogCover
        post={p}
        large
        className="aspect-[16/10] rounded-[24px] transition-transform duration-500 group-hover:-translate-y-1"
      />
      <div className="mt-5">
        <Meta p={p} />
        <h2 className="mt-2 text-[1.45rem] font-semibold leading-snug tracking-[-0.03em] text-navy-dark group-hover:underline group-hover:decoration-navy-dark/30 group-hover:underline-offset-4 sm:text-[1.65rem]">
          {p.title}
        </h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy-dark/75">
          {p.excerpt}
        </p>
      </div>
    </Link>
  </motion.article>
);

const PostCard = ({ p }: { p: Post }) => (
  <article>
    <Link to={`/blog/${p.slug}`} className="group block">
      <BlogCover
        post={p}
        className="aspect-[4/3] rounded-[20px] transition-transform duration-500 group-hover:-translate-y-1"
      />
      <div className="mt-4">
        <Meta p={p} />
        <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark group-hover:underline group-hover:decoration-navy-dark/30 group-hover:underline-offset-4">
          {p.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[14px] leading-relaxed text-navy-dark/75">
          {p.excerpt}
        </p>
      </div>
    </Link>
  </article>
);

/**
 * /blog: header with filters and search, the two newest articles large, then
 * everything else in a clean grid. Plan: PAGES-REDESIGN-2.md §4.
 */
const Blog = () => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const browsing = cat !== "All" || q.trim() !== "";
  const featured = BLOG_POSTS.slice(0, 2);
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return BLOG_POSTS.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!term ||
          `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(term)),
    );
  }, [cat, q]);
  const grid = browsing ? list : list.slice(2);

  return (
    <PageLayout>
      <Seo
        title="Blog: Link Building, Digital PR & AI Search"
        description="Practical articles on link building, digital PR and getting named in AI answers, written by the people who do the work."
      />

      <section className="bg-mist pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* header */}
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <motion.h1
                className="text-[3rem] font-semibold leading-none tracking-[-0.05em] text-navy-dark sm:text-[4.4rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                Blog
              </motion.h1>
              <motion.p
                className="mt-4 max-w-xl text-[17px] leading-relaxed text-navy-dark/75"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                Link building, digital PR and AI search, written by the people
                who do the work.
              </motion.p>
            </div>
          </div>

          <motion.div
            className="mt-10 flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease }}
          >
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter by topic"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors ${
                    cat === c
                      ? "bg-navy-dark text-white"
                      : "bg-white text-navy-dark/80 ring-1 ring-line hover:text-navy-dark hover:ring-navy-dark/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="relative block md:w-72">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-dark/60" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles"
                className="w-full rounded-full bg-white py-2.5 pl-10 pr-4 text-[14px] text-navy-dark ring-1 ring-line placeholder:text-navy-dark/60 focus:outline-none focus:ring-2 focus:ring-navy-dark/40"
              />
            </label>
          </motion.div>

          {/* newest two, large */}
          {!browsing && (
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-6">
              {featured.map((p, i) => (
                <FeaturedCard key={p.slug} p={p} delay={0.1 + i * 0.08} />
              ))}
            </div>
          )}

          {/* everything else */}
          {!browsing && grid.length > 0 && (
            <p className="mt-16 text-[13px] font-semibold text-navy-dark/75">
              More articles
            </p>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${cat}-${q}`}
              className={`grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 ${browsing ? "mt-12" : "mt-6"}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {grid.map((p) => (
                <PostCard key={p.slug} p={p} />
              ))}
            </motion.div>
          </AnimatePresence>

          {browsing && grid.length === 0 && (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center ring-1 ring-line">
              <p className="text-[17px] font-semibold text-navy-dark">
                No articles match that yet.
              </p>
              <button
                onClick={() => {
                  setCat("All");
                  setQ("");
                }}
                className="mt-4 rounded-full bg-navy-dark px-5 py-2.5 text-[13.5px] font-semibold text-white"
              >
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
