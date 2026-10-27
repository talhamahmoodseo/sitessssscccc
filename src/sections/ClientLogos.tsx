import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { asset } from "@/lib/booking";
import { CLIENTS } from "@/lib/clients";

/** The clients' own logos in one tone, each linking to its case study. */
export const LogoStrip = ({ className = "" }: { className?: string }) => (
  <ul
    className={`flex flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16 ${className}`}
  >
    {CLIENTS.map((c) => (
      <li key={c.name}>
        <Link
          to={`/case-studies/${c.slug}`}
          className="block opacity-55 transition-opacity duration-300 hover:opacity-90"
          aria-label={`${c.name} case study`}
        >
          <img
            src={asset(c.logo)}
            alt={c.name}
            style={{ height: c.h }}
            className="w-auto brightness-0"
            loading="lazy"
          />
        </Link>
      </li>
    ))}
  </ul>
);

const ClientLogos = () => (
  <div className="bg-mist pb-16 pt-2">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.p
        className="mb-8 text-center text-[13px] font-medium text-navy-dark/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Brands we've built authority for
      </motion.p>
      <LogoStrip />
    </div>
  </div>
);

export default ClientLogos;
