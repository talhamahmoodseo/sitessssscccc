import type { ReactNode } from "react";
import Navigation from "./Navigation";
import CTABand from "./CTABand";
import Footer from "../sections/Footer";

/** Chrome shared by every inner page: nav, the page body, closing CTA, footer. */
const PageLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Navigation />
    <main>{children}</main>
    <CTABand />
    <section id="footer">
      <Footer />
    </section>
  </>
);

export default PageLayout;
