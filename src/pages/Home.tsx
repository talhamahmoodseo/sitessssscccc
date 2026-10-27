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
import ClientVoices from "@/sections/Testimonials";
import BlogPreview from "@/sections/BlogPreview";
import FAQ from "@/sections/FAQ";
import HomeCTA from "@/sections/HomeCTA";
import Footer from "@/sections/Footer";

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

      <section id="shift">
        <TheShift />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="results">
        <Results />
      </section>

      <section id="personas">
        <Personas />
      </section>

      <section id="process">
        <Process />
      </section>

      <section id="guarantees">
        <GuaranteeBand />
      </section>

      <section id="testimonials">
        <ClientVoices />
      </section>

      <section id="blog">
        <BlogPreview />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="contact">
        <HomeCTA />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </main>
  </>
);

export default Home;
