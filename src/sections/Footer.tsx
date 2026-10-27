import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { openBooking } from "@/lib/booking";

const EMAIL = "contact@editorialhq.com";

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { name: "Link Building", to: "/services/link-building" },
      { name: "Digital PR", to: "/services/digital-pr" },
      { name: "Brand Mentions", to: "/services/brand-mentions" },
      { name: "HARO & Expert Quotes", to: "/services/haro-links" },
      { name: "Home Services", to: "/industries/home-services" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", to: "/about" },
      { name: "Results", to: "/case-studies" },
      { name: "Pricing", to: "/pricing" },
      { name: "Blog", to: "/blog" },
      { name: "Contact", to: "/contact" },
    ],
  },
];

/** Site footer: who we are in one line, where to go, how to reach us. */
const Footer = () => (
  <footer className="bg-navy-dark text-white">
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-20">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div className="max-w-sm">
          <Link to="/" aria-label="Editorial HQ home">
            <Logo invert />
          </Link>
          <p className="mt-5 text-[14.5px] leading-relaxed text-white/65">
            Editorial HQ builds the authority that decides who gets found:
            editorial links, digital PR and brand mentions that move Google
            rankings and AI recommendations.
          </p>
        </div>

        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-mark">
              {c.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-[14.5px] text-white/75 transition-colors hover:text-white"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-mark">
            Talk to us
          </h3>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-5 block break-all text-[14.5px] text-white/75 transition-colors hover:text-white"
          >
            {EMAIL}
          </a>
          <p className="mt-3 text-[14.5px] text-white/75">
            Faisalabad, Pakistan · UTC+5
          </p>
          <button
            onClick={openBooking}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-navy-dark transition-colors hover:bg-mark"
          >
            Book a call
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>© 2026 Editorial HQ. All rights reserved.</span>
          <Link to="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
        </p>
        <p>Link building · Digital PR · AI visibility</p>
      </div>
    </div>
  </footer>
);

export default Footer;
