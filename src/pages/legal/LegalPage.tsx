import type { ReactNode } from "react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";

/** Shared frame for /privacy and /terms: plain text, easy to read. */
export const LegalPage = ({
  title,
  seoTitle,
  description,
  updated,
  intro,
  children,
}: {
  title: string;
  seoTitle: string;
  description: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) => (
  <PageLayout cta={false}>
    <Seo title={seoTitle} description={description} />
    <section className="bg-mist pb-14 pt-32 lg:pb-16 lg:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70">
          Last updated {updated}
        </p>
        <h1 className="mt-4 text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-navy-dark sm:text-[3.2rem]">
          {title}
        </h1>
        <div className="mt-5 text-[17px] leading-relaxed text-navy-dark/75">{intro}</div>
      </div>
    </section>
    <section className="bg-white py-14 lg:py-20">
      <div className="legal mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
    </section>
  </PageLayout>
);

export const H = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-12 text-[1.35rem] font-semibold tracking-[-0.025em] text-navy-dark first:mt-0">
    {children}
  </h2>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 text-[16px] leading-relaxed text-navy-dark/80">{children}</p>
);

export const L = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-3 space-y-2 pl-5 text-[16px] leading-relaxed text-navy-dark/80 [list-style:disc]">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener" : undefined}
    className="font-semibold text-navy-dark underline underline-offset-2"
  >
    {children}
  </a>
);
