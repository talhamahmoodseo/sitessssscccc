import { useParams } from "react-router-dom";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import NotFound from "./NotFound";
import { CASES, caseBySlug } from "@/lib/cases";
import {
  About,
  Approach,
  CaseHeader,
  Challenge,
  Evidence,
  NextCase,
  Placements,
  Results,
  Testimonial,
  Toc,
} from "./results/CaseParts";

/**
 * /case-studies/:slug: one real client project. The client's own site up
 * top, then who they are, the problem, what we did, where the work lives,
 * the results and the screenshots behind them. Sections without data are
 * skipped, and numbering follows what is shown.
 */
const CaseStudy = () => {
  const { slug } = useParams();
  const c = caseBySlug(slug);
  if (!c) return <NotFound />;
  const next = CASES[(CASES.indexOf(c) + 1) % CASES.length];
  let n = 3 + (c.placements?.length ? 1 : 0);
  const resultsN = String(c.results ? ++n : n).padStart(2, "0");
  const evidenceN = String(++n).padStart(2, "0");

  return (
    <PageLayout>
      <Seo
        title={`${c.client} case study: ${c.card}`}
        description={c.summary}
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.title,
          description: c.summary,
          about: { "@type": "Organization", name: c.client, url: c.url || undefined },
          author: { "@type": "Organization", name: "Editorial HQ" },
        }}
      />
      <CaseHeader c={c} />
      <div className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[200px_1fr] lg:gap-16 lg:px-8">
          <aside>
            <Toc c={c} />
          </aside>
          <article className="min-w-0 space-y-20">
            <About c={c} />
            <Challenge c={c} />
            <Approach c={c} />
            <Placements c={c} />
            <Results c={c} n={resultsN} />
            <Evidence c={c} n={evidenceN} />
            <Testimonial c={c} />
          </article>
        </div>
      </div>
      <NextCase next={next} />
    </PageLayout>
  );
};

export default CaseStudy;
