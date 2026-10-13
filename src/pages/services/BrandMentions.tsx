import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { brandMentions as C } from "./content/brandMentions";
import { EMAIL, FitPrice, PairsWith, ServiceClose, ServiceFaq } from "./common";
import Hero from "./brand-mentions/Hero";
import HowAiDecides from "./brand-mentions/HowAiDecides";
import BeforeAfter from "./brand-mentions/BeforeAfter";
import Anatomy from "./brand-mentions/Anatomy";
import Report from "./brand-mentions/Report";
import Loop from "./brand-mentions/Loop";
import Proof from "./brand-mentions/Proof";

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand Mention Building for AI Search",
  serviceType: "Brand mentions and AI visibility",
  description: C.seo.description,
  provider: { "@type": "Organization", name: "Talha Mahmood" },
  areaServed: ["US", "GB", "AE"],
  offers: {
    "@type": "Offer",
    price: "2497",
    priceCurrency: "USD",
    description: "Starting monthly price (Growth plan)",
  },
};

/** The close asks for a brand and a category instead of a call: the free
 *  check is the most useful thing we can offer someone on this page. */
const CheckForm = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const send = () => {
    const subject = encodeURIComponent(C.close.subject);
    const body = encodeURIComponent(
      `Brand: ${brand}\nCategory: ${category}\n\nPlease run the free AI visibility check.`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      className="mx-auto flex max-w-2xl flex-col gap-2 rounded-2xl bg-white/[0.07] p-2 ring-1 ring-white/15 backdrop-blur sm:flex-row"
    >
      <label htmlFor="bm-brand" className="sr-only">
        Your brand
      </label>
      <input
        id="bm-brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Your brand"
        className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/70 focus:bg-white/[0.06] focus:outline-none"
      />
      <label htmlFor="bm-category" className="sr-only">
        Your category
      </label>
      <input
        id="bm-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Your category"
        className="min-w-0 flex-[1.4] rounded-xl bg-transparent px-4 py-3 text-[15px] text-white placeholder:text-white/70 focus:bg-white/[0.06] focus:outline-none sm:border-l sm:border-white/10"
      />
      <button
        type="submit"
        className="group inline-flex flex-none items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[14.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
      >
        {C.close.primary}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
};

/**
 * /services/brand-mentions
 *
 * Story: the promise → how AI picks who to name (with data) → same question,
 * six months apart → what a useful mention reads like → how we measure →
 * the monthly loop → one campaign in numbers → fit and price → questions →
 * free AI check. Plan: SERVICE-PAGES-REDESIGN.md §4.
 */
const BrandMentions = () => (
  <PageLayout cta={false}>
    <Seo
      title={C.seo.title}
      description={C.seo.description}
      schema={SERVICE_SCHEMA}
    />
    <Hero />
    <HowAiDecides />
    <BeforeAfter />
    <Anatomy />
    <Report />
    <Loop />
    <Proof />
    <FitPrice c={C.fit} tint="bg-lilac" bg="bg-white" />
    <ServiceFaq
      eyebrow={C.faqHead.eyebrow}
      h2a={C.faqHead.h2a}
      h2b={C.faqHead.h2b}
      side={C.faqHead.side}
      faqs={C.faqs}
      bg="bg-mist"
    />
    <PairsWith h2={C.pairs.h2} items={C.pairs.items} bg="bg-white" />
    <ServiceClose {...C.close}>
      <CheckForm />
    </ServiceClose>
  </PageLayout>
);

export default BrandMentions;
