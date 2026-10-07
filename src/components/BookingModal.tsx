import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ExternalLink, X } from "lucide-react";

import { asset, CALENDLY_EMBED, CALENDLY_URL } from "@/lib/booking";

/** Global booking dialog. Opens on the `open-booking` window event so any CTA
 *  on any page can summon it without prop drilling. */
const BookingModal = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setLoaded(false);
      setOpen(true);
    };
    window.addEventListener("open-booking", onOpen);
    return () => window.removeEventListener("open-booking", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const promises = [
    "We audit your current visibility, live on the call",
    "You see real sample placements and straight pricing",
    "You decide after — no follow-up pressure, ever",
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-navy-dark/85 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden bg-white border border-line shadow-deep grid lg:grid-cols-[0.85fr_1.15fr]"
            initial={{ opacity: 0, y: 44, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close booking window"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-navy-dark/60 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-navy-dark transition-all duration-300"
            >
              <X className="w-[18px] h-[18px]" />
            </button>

            <div className="hidden lg:flex flex-col justify-center p-10 xl:p-12 relative overflow-hidden bg-linen">
              <motion.div
                className="absolute -left-24 -top-24 w-72 h-72 bg-transparent rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <p className="relative text-[11px] font-bold tracking-[0.22em] text-blue-accent uppercase mb-4">
                Book a call
              </p>

              <h3 className="relative text-3xl xl:text-[2.1rem] font-bold text-navy-dark leading-tight mb-4">
                15 minutes.
                <span className="font-medium text-navy-dark/85">
                  Zero pitch.
                </span>
              </h3>

              <p className="relative text-[14.5px] text-navy-dark/70 leading-relaxed mb-8">
                Bring your site. Leave with a visibility plan from our team —
                whether you work with us or not.
              </p>

              <div className="relative space-y-4 mb-9">
                {promises.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.45 }}
                  >
                    <span className="flex-none w-5 h-5 rounded-full bg-verified/12 border border-verified/30 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-verified" />
                    </span>
                    <span className="text-[13.5px] text-navy-dark/70 leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <a
                href="/contact"
                className="relative inline-flex items-center gap-1.5 text-[12px] font-bold text-white/60 hover:text-white transition-colors duration-300 mb-6"
              >
                Prefer email? Send a message instead →
              </a>

              <motion.div
                className="relative flex items-center gap-3.5 bg-white/75 border border-white rounded-2xl px-4 py-3.5 shadow-sm"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.5 }}
              >
                <img
                  src={asset("/images/talha-avatar.jpg")}
                  alt="Talha Mahmood"
                  className="flex-none w-11 h-11 rounded-full object-cover ring-2 ring-blue-accent/40"
                />
                <p className="text-[12.5px] text-navy-dark/75 leading-snug">
                  Founder-led agency — you'll talk to a{" "}
                  <span className="text-navy-dark font-semibold">
                    senior strategist
                  </span>
                  , not a sales rep.
                </p>
              </motion.div>
            </div>

            <div className="relative bg-white min-h-[540px] max-h-[92vh]">
              {!loaded && (
                <div className="absolute inset-0 z-10 bg-white p-8 space-y-4">
                  <div className="h-7 w-2/3 bg-linen rounded-lg animate-pulse" />
                  <div className="h-4 w-1/2 bg-linen rounded animate-pulse" />
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="h-12 bg-linen rounded-xl animate-pulse"
                        style={{ animationDelay: `${i * 80}ms` }}
                      />
                    ))}
                  </div>
                  <p className="absolute bottom-5 left-8 text-[11px] font-semibold text-navy-dark/70">
                    Loading available times…
                  </p>
                </div>
              )}

              <iframe
                title="Book a call"
                src={CALENDLY_EMBED}
                className="w-full h-full min-h-[540px]"
                onLoad={() => setLoaded(true)}
              />

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-4 z-10 inline-flex items-center gap-1.5 text-[10.5px] font-bold text-navy-dark/70 hover:text-navy-dark transition-colors duration-300 bg-white/80 backdrop-blur rounded-full px-3 py-1.5"
              >
                Open in new tab
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
