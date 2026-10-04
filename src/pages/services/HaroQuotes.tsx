import ServiceTemplate from "./ServiceTemplate";
import { haroQuotes } from "./content/haroQuotes";

const HaroQuotes = () => (
  <ServiceTemplate
    c={haroQuotes}
    slug="haro-links"
    seoTitle="HARO & Expert Quote Placements"
    serviceType="HARO and Expert Quote Placements"
    annotation="Credibility compounds differently to links: a journalist who publishes you once will come back, and that is the whole asset."
  />
);

export default HaroQuotes;
