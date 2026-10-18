import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";

/**
 * Shown for any URL we don't have. Marked noindex; on the server the same URL
 * returns a real 404 status (WordPress theme and static hosting both).
 */
const LINKS = [
  { to: "/services/link-building", t: "Link Building" },
  { to: "/services/digital-pr", t: "Digital PR" },
  { to: "/services/brand-mentions", t: "Brand Mentions" },
  { to: "/case-studies", t: "Results" },
  { to: "/blog", t: "Blog" },
];

const NotFound = () => (
  <PageLayout cta={false}>
    <Seo
      title="Page not found"
      description="This page doesn't exist. Head back to the homepage or pick one of our services."
      noindex
    />
    <section className="bg-mist pb-28 pt-36 lg:pt-44">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-dark/70">
          404
        </p>
        <h1 className="mt-4 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.045em] text-navy-dark sm:text-[3.4rem]">
          This page doesn't exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-navy-dark/75">
          The link may be old or mistyped. Here's where most people are heading:
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="inline-flex rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-navy-dark ring-1 ring-line transition-shadow hover:ring-navy-dark/40"
              >
                {l.t}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white"
        >
          Back to the homepage
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default NotFound;
