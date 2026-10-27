import { useParams } from "react-router-dom";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import NotFound from "./NotFound";
import { CASES, caseBySlug } from "@/lib/cases";
import {
  CaseHeader,
  CaseVisual,
  Challenge,
  Links,
  NextCase,
  Objectives,
  Outcomes,
  Overview,
  Results,
  Strategy,
  Toc,
  Work,
} from "./results/CaseSections";

/**
 * /case-studies/:slug: one project, documented like a report. Header with
 * the headline results, a visual made for that client, then numbered
 * sections with a sticky contents rail. Sections without data are skipped
 * and the numbering follows what is shown.
 */
const CaseStudy = () => {
  const { slug } = useParams();
  const c = caseBySlug(slug);
  if (!c) return <NotFound />;
  const next = CASES[(CASES.indexOf(c) + 1) % CASES.length];

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
      <CaseVisual c={c} />
      <div className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[200px_1fr] lg:gap-16 lg:px-8">
          <aside>
            <Toc c={c} />
          </aside>
          <article className="min-w-0 space-y-16">
            <Overview c={c} />
            <Challenge c={c} />
            <Objectives c={c} />
            <Strategy c={c} />
            <Work c={c} />
            <Links c={c} />
            <Results c={c} />
            <Outcomes c={c} />
          </article>
        </div>
      </div>
      <NextCase next={next} />
    </PageLayout>
  );
};

export default CaseStudy;
