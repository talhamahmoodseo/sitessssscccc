import { motion } from "motion/react";
import { LogoMark } from "./Logo";

/** Opening curtain: white card scales in behind the mark, then an ink panel
 *  wipes up and back down to hand the page over. */
const LogoReveal = () => (
  <motion.div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-dark"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
  >
    <div className="relative">
      <motion.div
        className="absolute inset-0 bg-white rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: "center" }}
      />

      <motion.div
        className="relative z-10 px-12 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.35 }}
      >
        <span className="flex items-center gap-3">
          <LogoMark className="h-12 w-12 md:h-16 md:w-16" />
          <span className="text-4xl md:text-6xl font-bold text-navy-dark tracking-[-0.04em]">
            Outreachr
          </span>
        </span>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-navy-dark"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1, 0] }}
        transition={{
          delay: 0.8,
          duration: 0.8,
          times: [0, 0.3, 0.7, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ transformOrigin: "bottom" }}
      />
    </div>
  </motion.div>
);

export default LogoReveal;
