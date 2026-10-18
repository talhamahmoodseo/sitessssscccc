import { Seo } from "@/components/MotionKit";
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
  provider: { "@type": "Organization", name: "Outreachr" },
  areaServed: ["US", "GB", "AE"],
  offers: {
    "@type": "Offer",
    price: "497",
    priceCurrency: "USD",
    description: "Pilot: 3 vetted placements, then plans from $597 a month",
  },
};

/**
 * /services/link-building — the flagship service page.
 *
 * Story, in order: the promise → the report that lied → why (DR is easy to
 * fake) → the method (5-Point Site Check) → what you get → how a month runs →
 * proof → the report → fit, price, objections → send us your URL.
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
    <PricingStrip />
    <Faq />
    <Related />
    <FinalCta />
  </PageLayout>
);

export default LinkBuilding;
