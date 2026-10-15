import type { ReactNode } from "react";
import Navigation from "./Navigation";
import CTABand from "./CTABand";
import Footer from "../sections/Footer";

/** Chrome shared by every inner page: nav, the page body, closing CTA, footer.
 *  Pages that end on their own call to action pass `cta={false}`. */
const PageLayout = ({
  children,
  cta = true,
}: {
  children: ReactNode;
  cta?: boolean;
}) => (
  <>
    <Navigation />
    <main>{children}</main>
    {cta && <CTABand />}
    <section id="footer">
      <Footer />
    </section>
  </>
);

export default PageLayout;
