/* The objection-style FAQ with FAQPage schema, used by the Link Building
   page. The other service pages use ServiceFaq in ./common. */

export const ObjectionFaq = ({
  faqs,
}: {
  faqs: { q: string; a: string }[];
}) => (
  <>
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 open:bg-mist/60">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <span className="text-[15.5px] font-semibold text-navy-dark">
              {f.q}
            </span>
            <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-navy-dark/20 text-navy-dark transition-transform duration-300 group-open:rotate-45">
              <span className="text-[14px] leading-none">+</span>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-navy-dark/70">
            {f.a}
          </p>
        </details>
      ))}
    </div>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }}
    />
  </>
);
