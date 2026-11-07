import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { setChoice, shouldAsk } from "@/lib/analytics";

/**
 * Cookie question for UK and EU visitors, shown only when GA4 is switched on
 * in WordPress. Nothing is measured until they say yes (see lib/analytics).
 */
const ConsentBanner = () => {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    setAsk(shouldAsk());
    const again = () => setAsk(shouldAsk());
    window.addEventListener("analytics-ask", again);
    return () => window.removeEventListener("analytics-ask", again);
  }, []);

  const answer = (granted: boolean) => {
    setChoice(granted ? "granted" : "denied");
    setAsk(false);
  };

  return (
    <AnimatePresence>
      {ask && (
        <motion.div
          role="dialog"
          aria-label="Cookie choice"
          className="fixed inset-x-3 bottom-3 z-[110] max-w-[25rem] rounded-2xl bg-white p-5 shadow-deep ring-1 ring-line sm:inset-x-auto sm:bottom-5 sm:left-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[14px] font-semibold text-navy-dark">Cookies, briefly</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-navy-dark/75">
            We'd like to use Google Analytics to see which pages bring us
            enquiries. No ads, and we don't sell anything about you.{" "}
            <Link to="/privacy" className="font-semibold text-navy-dark underline underline-offset-2">
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => answer(true)}
              className="rounded-full bg-navy-dark px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-black"
            >
              That's fine
            </button>
            <button
              onClick={() => answer(false)}
              className="rounded-full px-5 py-2.5 text-[13.5px] font-semibold text-navy-dark ring-1 ring-line transition-shadow hover:ring-navy-dark/30"
            >
              No thanks
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
