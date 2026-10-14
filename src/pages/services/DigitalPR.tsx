import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { digitalPr as C } from "./content/digitalPr";
import { FitPrice, PairsWith, ServiceClose, ServiceFaq } from "./common";
import Hero from "./digital-pr/Hero";
import ReleaseVsStory from "./digital-pr/ReleaseVsStory";
import StoryLab from "./digital-pr/StoryLab";
import { Returns, Tiers } from "./digital-pr/Coverage";
import Proof from "./digital-pr/Proof";
import Process from "./digital-pr/Process";

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital PR",
  serviceType: "Digital PR",
  description: C.seo.description,
  provider: { "@type": "Organization", name: "Outreachr" },
  areaServed: ["US", "GB", "AE", "SA"],
  offers: {
    "@type": "Offer",
    price: "4997",
    priceCurrency: "USD",
    description: "Starting monthly price for the full PR programme",
  },
};

/**
 * /services/digital-pr
 *
 * Story: stories, not releases → why releases fail → where stories come from
 * → where they land → what one story keeps doing → one campaign in full →
 * how it runs → fit and price → questions → tell us something boring.
 * Plan: SERVICE-PAGES-REDESIGN.md §3.
 */
const DigitalPR = () => (
  <PageLayout cta={false}>
    <Seo
      title={C.seo.title}
      description={C.seo.description}
      schema={SERVICE_SCHEMA}
    />
    <Hero />
    <ReleaseVsStory />
    <StoryLab />
    <Tiers />
    <Returns />
    <Proof />
    <Process />
    <FitPrice c={C.fit} tint="bg-mint" />
    <ServiceFaq
      eyebrow={C.faqHead.eyebrow}
      h2a={C.faqHead.h2a}
      h2b={C.faqHead.h2b}
      side={C.faqHead.side}
      faqs={C.faqs}
    />
    <PairsWith h2={C.pairs.h2} items={C.pairs.items} />
    <ServiceClose {...C.close} />
  </PageLayout>
);

export default DigitalPR;
