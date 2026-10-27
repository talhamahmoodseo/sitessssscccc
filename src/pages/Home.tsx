import type { CSSProperties } from "react";
import { Seo } from "@/components/MotionKit";
import Navigation from "@/components/Navigation";
import { GuaranteeBand } from "@/components/Guarantees";
import Hero from "@/sections/Hero";
import ClientLogos from "@/sections/ClientLogos";
import TheShift from "@/sections/TheShift";
import ServicesSection from "@/sections/Services";
import Results from "@/sections/Results";
import Personas from "@/sections/Personas";
import Process from "@/sections/Process";
import { FeaturedReview, ReviewWall } from "@/sections/Testimonials";
import ProofGrid from "@/sections/ProofGrid";
import BlogPreview from "@/sections/BlogPreview";
import FAQ from "@/sections/FAQ";
import HomeCTA from "@/sections/HomeCTA";
import Footer from "@/sections/Footer";

/**
 * Sections below the hero skip layout and paint until they come near the
 * screen (content-visibility: auto), which cut the phone's style-and-layout
 * work at load by more than half. The two numbers are each section's measured
 * height on a phone and on desktop, so the scrollbar and links like
 * /#process land in the right place before a section has been drawn.
 * Re-measure when a section changes a lot (HANDOFF "Performance"). The
 * process section is left out: its height follows the screen height (a 340vh
 * pinned track), so no fixed estimate would be right.
 */
const cv = (phone: number, desktop: number) => ({
  className: "cv-auto",
  style: { "--cis-m": `${phone}px`, "--cis-d": `${desktop}px` } as CSSProperties,
});

const Home = () => (
  <>
    <Seo
      title="Link Building & AI Visibility Agency"
      description="A link building and digital PR agency. Editorial backlinks, PR and brand mentions that move Google rankings and get you cited in AI answers."
    />

    <Navigation />

    <main>
      <section id="hero">
        <Hero />
      </section>

      <ClientLogos />

      <section id="shift" {...cv(3806, 2044)}>
        <TheShift />
      </section>

      <section id="services" {...cv(1755, 1146)}>
        <ServicesSection />
      </section>

      <section id="guarantees" {...cv(1505, 715)}>
        <GuaranteeBand />
      </section>

      <section id="review" {...cv(853, 777)}>
        <FeaturedReview />
      </section>

      <section id="results" {...cv(2808, 1898)}>
        <Results />
      </section>

      <section id="personas" {...cv(1399, 1198)}>
        <Personas />
      </section>

      <section id="process">
        <Process />
      </section>

      <section id="proof" {...cv(1624, 1277)}>
        <ProofGrid />
      </section>

      <section id="testimonials" {...cv(968, 1053)}>
        <ReviewWall />
      </section>

      <section id="blog" {...cv(1878, 676)}>
        <BlogPreview />
      </section>

      <section id="faq" {...cv(1607, 1069)}>
        <FAQ />
      </section>

      <section id="contact" {...cv(896, 831)}>
        <HomeCTA />
      </section>

      <section id="footer" {...cv(1116, 443)}>
        <Footer />
      </section>
    </main>
  </>
);

export default Home;
