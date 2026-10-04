import ServiceTemplate from "./ServiceTemplate";
import { brandMentions } from "./content/brandMentions";

const BrandMentions = () => (
  <ServiceTemplate
    c={brandMentions}
    slug="brand-mentions"
    seoTitle="Brand Mentions & AI Visibility"
    serviceType="Brand Mentions and AI Visibility"
    annotation="The same publications feed Google and the answer engines. Build the footprint once and both surfaces respond."
  />
);

export default BrandMentions;
