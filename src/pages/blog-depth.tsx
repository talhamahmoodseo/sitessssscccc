import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

/**
 * Blog reading paths.
 *
 * The index already sorts by date and by category. This sorts by *why you
 * turned up* — three curated routes through the same posts, each framed as a
 * situation rather than a topic. Shape is a numbered path with the posts
 * stacked under it, which appears nowhere else on the site.
 */

const PATHS = [
  {
    n: "01",
    who: "You are buying links for the first time",
    why: "Start with how the work is supposed to be controlled, then see what one good placement actually takes end to end.",
    slugs: ["site-approval-workflow", "anatomy-of-a-dr70-placement"],
  },
  {
    n: "02",
    who: "Your buyers have started asking AI instead",
    why: "Why engines quote some brands and skip others, what counts as a citation, and how to measure any of it without a Search Console for AI.",
    slugs: [
      "why-ai-engines-cite-some-brands",
      "linked-vs-unlinked-mentions",
      "tracking-citations-across-ai-engines",
    ],
  },
  {
    n: "03",
    who: "You are expanding into a new market",
    why: "What changes when the publications are not US or UK — relationships, lead times, and the authority nobody is competing for yet.",
    slugs: ["gulf-media-placements"],
  },
];

const bySlug = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);

export const ReadingPaths = () => (
  <div className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mb-14 max-w-2xl"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          Start here
        </p>
        <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-navy-dark">
          Three routes through it,
          <br />
          <span className="text-navy-dark/65">depending on why you came</span>
        </h2>
      </motion.div>

      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-3">
        {PATHS.map((path, i) => (
          <motion.div
            key={path.n}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <div className="mb-5 flex items-baseline gap-3 border-b border-navy-dark pb-4">
              <span className="text-[13px] font-bold tabular-nums text-navy-dark/40">
                {path.n}
              </span>
              <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.02em] text-navy-dark">
                {path.who}
              </h3>
            </div>
            <p className="mb-7 text-[14px] leading-relaxed text-navy-dark/75">
              {path.why}
            </p>
            <ol className="space-y-4">
              {path.slugs.map((slug, j) => {
                const post = bySlug(slug);
                if (!post) return null;
                return (
                  <li key={slug}>
                    <Link
                      to={`/blog/${slug}`}
                      className="group flex gap-3.5 border-t border-line pt-4"
                    >
                      <span className="pt-0.5 text-[12px] font-bold tabular-nums text-navy-dark/40">
                        {j + 1}
                      </span>
                      <span>
                        <span className="block text-[14.5px] font-semibold leading-snug text-navy-dark">
                          {post.title}
                        </span>
                        <span className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-navy-dark/70">
                          {post.read}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);
