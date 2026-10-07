import type { ReactNode } from "react";
import { motion } from "motion/react";

type PageHeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

/** Centred page header: eyebrow, headline, optional lead and action row,
 *  over a slowly breathing wash. */
const PageHero = ({
  eyebrow,
  title,
  sub,
  children,
  compact = false,
}: PageHeroProps) => (
  <div className="relative bg-mist overflow-hidden">
    <motion.div
      className="absolute -right-40 -top-20 w-[520px] h-[520px] bg-transparent rounded-full blur-3xl"
      animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.4, 0.25] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />

    <div
      className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${
        compact ? "pt-32 pb-16" : "pt-36 pb-20 lg:pt-40 lg:pb-24"
      }`}
    >
      <motion.p
        className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        {eyebrow}
      </motion.p>

      <motion.h1
        className="text-balance text-4xl sm:text-5xl lg:text-[3.7rem] font-semibold text-navy-dark leading-[1.05] tracking-[-0.02em]"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
      >
        {title}
      </motion.h1>

      {sub && (
        <motion.p
          className="mt-6 text-lg text-navy-dark/75 leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
        >
          {sub}
        </motion.p>
      )}

      {children && (
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38 }}
        >
          {children}
        </motion.div>
      )}
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy-dark to-transparent pointer-events-none" />
  </div>
);

export default PageHero;
