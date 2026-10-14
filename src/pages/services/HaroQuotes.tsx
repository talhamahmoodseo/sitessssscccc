import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { haroQuotes as C } from "./content/haroQuotes";
import { FitPrice, PairsWith, ServiceClose, ServiceFaq } from "./common";
import Hero from "./expert-quotes/Hero";
import Problem from "./expert-quotes/Problem";
import TwoReplies from "./expert-quotes/TwoReplies";
import Profile from "./expert-quotes/Profile";
import Filter from "./expert-quotes/Filter";
import Time from "./expert-quotes/Time";
import Proof from "./expert-quotes/Proof";

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "HARO Link Building & Expert Quotes",
  serviceType: "Expert quote placements",
  description: C.seo.description,
  provider: { "@type": "Organization", name: "Outreachr" },
  areaServed: ["US", "GB", "AE"],
  offers: {
    "@type": "Offer",
    price: "2497",
    priceCurrency: "USD",
    description: "Starting monthly price (Growth plan)",
  },
};

/**
 * /services/haro-links
 *
 * Story: get quoted, skip the lottery → what broke HARO and how we work
 * instead → same request, two replies → the expertise profile → what we skip
 * → your time → one engagement in numbers → fit and price → questions → call.
 * Plan: SERVICE-PAGES-REDESIGN.md §5.
 */
const HaroQuotes = () => (
  <PageLayout cta={false}>
    <Seo
      title={C.seo.title}
      description={C.seo.description}
      schema={SERVICE_SCHEMA}
    />
    <Hero />
    <Problem />
    <TwoReplies />
    <Profile />
    <Filter />
    <Time />
    <Proof />
    <FitPrice c={C.fit} tint="bg-blush" bg="bg-white" />
    <ServiceFaq
      eyebrow={C.faqHead.eyebrow}
      h2a={C.faqHead.h2a}
      h2b={C.faqHead.h2b}
      side={C.faqHead.side}
      faqs={C.faqs}
      bg="bg-mist"
    />
    <PairsWith h2={C.pairs.h2} items={C.pairs.items} bg="bg-white" />
    <ServiceClose {...C.close} />
  </PageLayout>
);

export default HaroQuotes;
