import { Seo } from "@/components/MotionKit";
import { GuaranteeBand } from "@/components/Guarantees";
import PageLayout from "@/components/PageLayout";
import { linkBuilding as LB } from "./content/linkBuilding";
import Hero from "./link-building/Hero";
import ReportVsReality from "./link-building/ReportVsReality";
import FakeMetrics from "./link-building/FakeMetrics";
import SiteCheck from "./link-building/SiteCheck";
import LinkTypes from "./link-building/LinkTypes";
import Timeline from "./link-building/Timeline";
import Results from "./link-building/Results";
import ReportMock from "./link-building/ReportMock";
import {
  Faq,
  FinalCta,
  Fit,
  PricingStrip,
  Related,
} from "./link-building/Closing";

/** Declared once so the Seo effect does not re-run on every render. */
const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Link Building Services",
  serviceType: "Link building",
  description: LB.seo.description,
  provider: { "@type": "Organization", name: "Editorial HQ" },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "129",
    priceCurrency: "USD",
    description: "Trial placement: one DR 40+ link. Packs from 5 links for $695.",
  },
};

/**
 * /services/link-building — the flagship service page.
 *
 * Story, in order: the promise → the report that lied → why (DR is easy to
 * fake) → the method (7-Point Site Check) → what you get → how a month runs →
 * proof → the report → fit, the guarantees, price, objections → send us your URL.
 * Full reasoning in LINK-BUILDING-PAGE-PLAN.md.
 */
const LinkBuilding = () => (
  <PageLayout cta={false}>
    <Seo
      title={LB.seo.title}
      description={LB.seo.description}
      schema={SERVICE_SCHEMA}
    />
    <Hero />
    <ReportVsReality />
    <FakeMetrics />
    <SiteCheck />
    <LinkTypes />
    <Timeline />
    <Results />
    <ReportMock />
    <Fit />
    <GuaranteeBand />
    <PricingStrip />
    <Faq />
    <Related />
    <FinalCta />
  </PageLayout>
);

export default LinkBuilding;
