import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, Search } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageHero from "@/components/PageHero";
import PageLayout from "@/components/PageLayout";
import { BLOG_POSTS } from "@/lib/content";

const EL = ["All", "Link Building", "Digital PR", "AI Search"];

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
      className="block group"
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
        className="bg-white rounded-2xl overflow-hidden border border-line shadow-sm group-hover:shadow-[0_30px_65px_-25px_rgba(15,17,23,0.3)] transition-shadow duration-500"
      >
        <BlogCover post={post} className="h-44" />
        <div className="p-6">
          <p className="text-[10px] font-bold tracking-[0.14em] text-navy-dark/70 uppercase mb-2.5">
            {post.date}
          </p>
          <h3 className="text-[19px] font-bold text-navy-dark leading-snug mb-2.5 group-hover:text-blue-accent transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-[13.5px] text-navy-dark/70 leading-relaxed line-clamp-2 mb-5">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-line">
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

const Blog = () => {
  const [e, s] = useState("All"),
    a = BLOG_POSTS.find((u) => u.featured) ?? BLOG_POSTS[0],
    r = BLOG_POSTS.filter((u) => u.slug !== a.slug),
    c = e === "All" ? r : r.filter((u) => u.category === e);
  return (
    <PageLayout>
      <Seo
        title="Blog"
        description="Link building, digital PR, and AI search — written by people who place links for a living."
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
        sub="Link building, digital PR, and AI search — written by people who place links for a living, not content marketers."
      />
      <div className="bg-linen pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link
              to={`/blog/${a.slug}`}
              className="group grid lg:grid-cols-[0.95fr_1.05fr] bg-white rounded-3xl overflow-hidden border border-line shadow-lift hover:shadow-[0_40px_90px_-30px_rgba(15,17,23,0.4)] transition-shadow duration-500 -mt-6"
            >
              <BlogCover post={a} className="h-64 lg:h-auto lg:min-h-[360px]" />
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-[10px] font-extrabold tracking-[0.2em] text-blue-accent uppercase mb-4">
                  {"Featured \u00b7 "}
                  {a.date}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-navy-dark leading-tight mb-4 group-hover:text-blue-accent transition-colors duration-300">
                  {a.title}
                </h2>
                <p className="text-[15px] text-navy-dark/70 leading-relaxed mb-7">
                  {a.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-accent">
                  Read the breakdown
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-navy-dark/70">
                    <Clock className="w-3.5 h-3.5" />
                    {a.read}
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-2.5 mt-16 mb-9"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            {EL.map((u) => (
              <button
                key={u}
                onClick={() => s(u)}
                className={`rounded-full px-5 py-3 min-h-[42px] text-[12.5px] font-semibold transition-all duration-300 ${e === u ? "bg-navy-dark text-white shadow-lg" : "bg-white text-navy-dark/70 border border-line hover:text-navy-dark hover:border-navy-dark/25"}`}
              >
                {u}
              </button>
            ))}
          </motion.div>
          <motion.div
            key={e}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
                  },
                }}
              >
                <RL post={u} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="bg-navy-dark py-20">
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/60 uppercase mb-4">
            The Field Notes
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-white mb-4">
            {"One tactical email "}
            <span className="font-medium text-white/80">a month</span>.
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed mb-8 max-w-md mx-auto">
            What moved rankings and AI citations this month, from live
            campaigns. No fluff, no funnels.
          </p>
          <a
            href="mailto:contact@talhamahmood.com?subject=Subscribe%20me%20to%20The%20Field%20Notes"
            className="inline-flex items-center gap-2 bg-white text-navy-dark hover:bg-white/90 rounded-xl px-8 py-3.5 text-sm font-semibold transition-colors duration-300"
          >
            Get the next issue
          </a>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export { BlogCover };
export default Blog;
