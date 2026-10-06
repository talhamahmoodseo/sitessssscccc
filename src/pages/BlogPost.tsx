import { motion } from "motion/react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Search } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { asset } from "@/lib/booking";
import { BLOG_POSTS } from "@/lib/content";
import { BlogCover } from "@/pages/Blog";

const BlogPost = () => {
  const { slug: e } = useParams(),
    s = BLOG_POSTS.find((d) => d.slug === e);
  if (!s) return <Navigate to="/blog" replace={true} />;
  const a = BLOG_POSTS.filter(
      (d) => d.category === s.category && d.slug !== s.slug,
    ).slice(0, 2),
    c = {
      "Link Building": { slug: "link-building", label: "Link Building" },
      "Digital PR": { slug: "digital-pr", label: "Digital PR" },
      "AI Search": { slug: "brand-mentions", label: "Brand Mentions" },
    }[s.category],
    u = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: s.title,
      description: s.excerpt,
      datePublished: s.date,
      author: { "@type": "Person", name: "Talha Mahmood" },
    };
  return (
    <PageLayout>
      <Seo title={s.title} description={s.excerpt} schema={u} />
      <div className="relative bg-navy-dark overflow-hidden pt-32 pb-16">
        <div
          className={`absolute inset-0 ${s.grad} opacity-25`}
        />
        <span
          className="absolute -bottom-16 -right-4 font-medium text-white/[0.08] text-[16rem] leading-none select-none"
          aria-hidden="true"
        >
          {s.glyph}
        </span>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[12px] font-bold text-white/70 hover:text-white transition-colors duration-300 mb-7"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All articles
            </Link>
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-brand-soft uppercase mb-4">
              {s.category}
              {" \u00b7 "}
              {s.date}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-extrabold text-white leading-[1.12] tracking-tight mb-6">
              {s.title}
            </h1>
            <div className="flex items-center gap-4">
              <img
                src={asset("/images/talha-avatar.jpg")}
                alt="Talha Mahmood"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-accent/40"
              />
              <div>
                <p className="text-white text-[13px] font-bold leading-none">
                  Talha Mahmood
                </p>
                <p className="text-white/75 text-[11px] font-medium mt-1 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {s.read}
                  {" read"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-white py-16 lg:py-20">
        <motion.article
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {s.body.map((d, h) =>
            d.t === "h2" ? (
              <h2
                key={h}
                className="text-2xl font-bold text-navy-dark mt-11 mb-4"
              >
                {d.c}
              </h2>
            ) : d.t === "quote" ? (
              <blockquote key={h} className="border-l-2 border-gold pl-5 my-9">
                <p className="font-medium text-xl text-navy-dark/80 leading-relaxed">
                  {d.c}
                </p>
              </blockquote>
            ) : d.t === "ul" ? (
              <ul key={h} className="space-y-3 my-6">
                {(d.c as string[]).map((x, m) => (
                  <li
                    key={m}
                    className="flex gap-3 text-[16px] text-navy-dark/70 leading-relaxed"
                  >
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-blue-accent mt-2.5" />
                    {x}
                  </li>
                ))}
              </ul>
            ) : (
              <p
                key={h}
                className="text-[16.5px] text-navy-dark/70 leading-[1.8] mb-6"
              >
                {d.c}
              </p>
            ),
          )}
          <div className="mt-14 flex items-center gap-4 bg-linen rounded-2xl p-6">
            <img
              src={asset("/images/talha-avatar.jpg")}
              alt="Talha Mahmood"
              className="flex-none w-14 h-14 rounded-full object-cover ring-2 ring-blue-accent/40"
            />
            <div>
              <p className="text-navy-dark font-bold text-[15px]">
                Talha Mahmood
              </p>
              <p className="text-navy-dark/70 text-[13px] leading-snug mt-1">
                Founder. Our team places the links — then writes about what
                worked.
              </p>
            </div>
          </div>
          {c && (
            <Link
              to={`/services/${c.slug}`}
              className="mt-5 flex items-center justify-between gap-4 bg-navy-dark rounded-2xl p-6 group hover:bg-[#1c2436] transition-colors duration-300"
            >
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.16em] text-brand-soft uppercase mb-1.5">
                  Related service
                </p>
                <p className="text-white font-bold text-[16px]">
                  {"See how our "}
                  {c.label}
                  {" service works"}
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white flex-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          )}
        </motion.article>
      </div>
      {a.length > 0 && (
        <div className="bg-linen py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-navy-dark mb-8">
              {"More on "}
              <span className="text-navy-dark/65">{s.category}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {a.map((d) => (
                <Link
                  key={d.slug}
                  to={`/blog/${d.slug}`}
                  className="group flex gap-5 bg-white rounded-2xl overflow-hidden border border-line hover:shadow-lift transition-shadow duration-500"
                >
                  <BlogCover post={d} className="w-32 flex-none" />
                  <div className="py-5 pr-5">
                    <p className="text-[10px] font-bold tracking-wider text-navy-dark/70 uppercase mb-1.5">
                      {d.date}
                    </p>
                    <h3 className="text-[15.5px] font-bold text-navy-dark leading-snug group-hover:text-brand-soft transition-colors duration-300 mb-2">
                      {d.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[12px] font-bold text-blue-accent">
                      {"Read "}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default BlogPost;
