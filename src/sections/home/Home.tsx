import { Seo } from "@/components/MotionKit";
import Navigation from "@/components/Navigation";
import Footer from "@/sections/Footer";
import { home } from "./content";
import Hero from "./Hero";
import { Logos } from "./Intro";
import Shift from "./Shift";
import Engine from "./Engine";
import Services from "./Services";
import { BigQuote, ResultsBento, Wall } from "./Proof";
import { Approach, Founder, Personas } from "./People";
import { Articles, AuditOffer, FinalCta, HomeFaq } from "./Closing";

/**
 * The homepage. One idea per section, in order: the promise → who trusts us →
 * how buyers find brands now → why links feed Google, readers and AI at once →
 * what we sell (link building first) → how we work → proof → who it's for →
 * the founder → a free audit → reading → questions → voices → talk to us.
 * Full reasoning in HOMEPAGE-PLAN.md.
 */
const Home = () => (
  <>
    <Seo title={home.seo.title} description={home.seo.description} />
    <Navigation />
    <main>
      <Hero />
      <Logos />
      <Shift />
      <Engine />
      <Services />
      <BigQuote index={0} bg="bg-white" />
      <Approach />
      <ResultsBento />
      <BigQuote index={1} />
      <Personas />
      <Founder />
      <AuditOffer />
      <Articles />
      <HomeFaq />
      <Wall />
      <FinalCta />
    </main>
    <section id="footer">
      <Footer />
    </section>
  </>
);

export default Home;
