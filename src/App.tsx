import { MotionConfig } from "motion/react";
import { Navigate, Routes, Route } from "react-router-dom";

import { ScrollProgress, ScrollToTop } from "./components/MotionKit";
import BookingModal from "./components/BookingModal";
import {
  About,
  Blog,
  BlogPost,
  CaseStudies,
  CaseStudy,
  Contact,
  Home,
  NotFound,
  Pricing,
  ServicePage,
} from "./routes";

/**
 * Pages are code-split (see routes.tsx): each URL downloads only its own page.
 * The intro curtain was removed in the SEO round because it held back the
 * first paint by ~1.3s.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* the old services index now lives on the homepage */}
        <Route
          path="/services"
          element={<Navigate to="/#services" replace />}
        />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BookingModal />
    </MotionConfig>
  );
}
