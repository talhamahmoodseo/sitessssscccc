import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { openBooking } from "@/lib/booking";
import Logo from "./Logo";

const serviceLinks = [
  { name: "Link Building", to: "/services/link-building" },
  { name: "Digital PR", to: "/services/digital-pr" },
  { name: "Brand Mentions", to: "/services/brand-mentions" },
  { name: "HARO & Expert Quotes", to: "/services/haro-links" },
];

const industryLinks = [
  { name: "Home Services", to: "/industries/home-services" },
];

const navLinks = [
  { name: "Results", to: "/case-studies" },
  { name: "Blog", to: "/blog" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
];

/** `onDark`: the page opens on a dark hero, so the bar starts light-on-dark
 *  until it scrolls and gains its white background. */
const Navigation = ({ onDark = false }: { onDark?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const light = onDark && !scrolled && !mobileOpen;
  const ink = light ? "text-white" : "text-navy-dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/" aria-label="Editorial HQ home">
              <Logo invert={light} />
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center gap-1 text-sm font-medium ${ink} hover:opacity-80 transition-colors`}
                >
                  Solutions
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-white border border-gray-200"
                >
                  {serviceLinks.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.to} className="cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <p className="mt-1 border-t border-line px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-dark/60">
                    Industries
                  </p>
                  {industryLinks.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.to} className="cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            {navLinks.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={item.to}
                  className={`relative inline-flex items-center min-h-[44px] text-sm font-medium ${ink} hover:opacity-80 transition-colors group`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}

            <motion.a
              href="/pricing"
              className={`relative inline-flex items-center min-h-[44px] text-sm font-medium ${ink} hover:opacity-80 transition-colors group`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              onClick={openBooking}
              className={`${light ? "bg-white text-navy-dark hover:bg-white/90" : "bg-brand hover:bg-brand-deep text-brand-on"} rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 hover:scale-105`}
            >
              Book a Free Consultation
            </Button>
          </motion.div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${ink}`} />
            ) : (
              <Menu className={`w-6 h-6 ${ink}`} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-1">
              <p className="text-[10px] font-extrabold tracking-[0.2em] text-navy-dark/70 uppercase px-2 pb-1">
                Solutions
              </p>
              {[...serviceLinks, ...industryLinks].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2.5 text-[15px] font-medium text-navy-dark hover:text-blue-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              <div className="h-px bg-gray-100 my-3" />

              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2.5 text-[15px] font-medium text-navy-dark hover:text-blue-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              <a
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-[15px] font-medium text-navy-dark hover:text-blue-accent transition-colors"
              >
                Pricing
              </a>

              <div className="pt-4">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    openBooking();
                  }}
                  className="w-full bg-brand hover:bg-brand-deep text-brand-on rounded-xl py-5 text-sm font-semibold"
                >
                  Book a Free Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
