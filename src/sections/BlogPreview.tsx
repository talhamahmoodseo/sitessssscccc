import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/content";

/** The four latest articles, as cover cards. */
const BlogPreview = () => {
  const posts = BLOG_POSTS.slice(0, 4);
  return (
    <div className="bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
              From the blog
            </p>
            <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark sm:text-[2.6rem]">
              {"Learn how search "}
              <span className="pr-[0.08em] font-medium italic">really</span>
              {" works now"}
            </h2>
          </motion.div>
          <Link
            to="/blog"
            className="group inline-flex flex-none items-center gap-2 self-start rounded-full px-5 py-3 text-[14px] font-semibold text-navy-dark ring-1 ring-navy-dark/20 transition-shadow hover:ring-navy-dark/50 sm:self-auto"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, n) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: n * 0.06 }}
            >
              <Link to={`/blog/${p.slug}`} className="group block">
                <div
                  className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[20px] p-5 transition-transform duration-500 group-hover:-translate-y-1 ${p.grad}`}
                >
                  <span className="relative text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/75">
                    {p.category}
                  </span>
                  <span className="relative text-[1.4rem] font-medium leading-[1.1] tracking-[-0.035em] text-navy-dark">
                    {p.title}
                  </span>
                  <span
                    className="absolute -right-2 -top-6 text-[6rem] leading-none text-navy-dark/10 transition-transform duration-500 group-hover:-rotate-6"
                    aria-hidden="true"
                  >
                    {p.glyph}
                  </span>
                </div>
                <p className="mt-4 text-[12.5px] text-navy-dark/70">
                  {p.date} · {p.read}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[14.5px] leading-snug text-navy-dark/80 group-hover:text-navy-dark">
                  {p.excerpt}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPreview;
