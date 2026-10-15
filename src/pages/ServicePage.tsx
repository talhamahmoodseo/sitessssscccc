import { Navigate, useParams } from "react-router-dom";
import BrandMentions from "@/pages/services/BrandMentions";
import DigitalPR from "@/pages/services/DigitalPR";
import HaroQuotes from "@/pages/services/HaroQuotes";
import LinkBuilding from "@/pages/services/LinkBuilding";

const SERVICE_PAGES = {
  "link-building": LinkBuilding,
  "digital-pr": DigitalPR,
  "brand-mentions": BrandMentions,
  "haro-links": HaroQuotes,
};

/** Resolves /services/:slug to its page, or bounces back to the index. */
const ServicePage = () => {
  const { slug } = useParams();
  const Page = slug
    ? SERVICE_PAGES[slug as keyof typeof SERVICE_PAGES]
    : undefined;

  return Page ? <Page /> : <Navigate to="/services" replace />;
};

export default ServicePage;
