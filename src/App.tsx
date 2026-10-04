import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

import { Seo, ScrollProgress, ScrollToTop } from "./components/MotionKit";
import LogoReveal from "./components/LogoReveal";
import BookingModal from "./components/BookingModal";
import Navigation from "./components/Navigation";

import Hero from "./sections/Hero";
import ClientLogos from "./sections/ClientLogos";
import TheShift from "./sections/TheShift";
import ServicesSection from "./sections/Services";
import Results from "./sections/Results";
import Personas from "./sections/Personas";
import Process from "./sections/Process";
import VideoStories from "./sections/VideoStories";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import HomeContact from "./sections/HomeContact";
import Footer from "./sections/Footer";
import CTABand from "./components/CTABand";

import About from "./pages/About";
import Services from "./pages/Services";
import ServicePage from "./pages/ServicePage";
import CaseStudies from "./pages/CaseStudies";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";

const Home = () => (
  <>
    <Seo
      title="Link Building & AI Visibility Agency"
      description="Editorial backlinks, digital PR, and brand mentions that move Google rankings and get you cited by ChatGPT, Claude, and AI Overviews."
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

      <section id="stories">
        <VideoStories />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="contact">
        <HomeContact />
      </section>

      <CTABand />
      <section id="footer">
        <Footer />
      </section>
    </main>
  </>
);

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {loading && <LogoReveal key="loader" />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollToTop />
        <ScrollProgress />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <BookingModal />
      </motion.div>
    </MotionConfig>
  );
}
