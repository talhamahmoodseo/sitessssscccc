import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Mail, X } from "lucide-react";

import { CALENDLY_EMBED, CALENDLY_URL } from "@/lib/booking";
import { GlowPanel } from "@/pages/services/kit";
import Accent from "./Accent";
import { LogoMark } from "./Logo";

const EMAIL = "contact@talhamahmood.com";

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

  const steps = [
    {
      t: "Pick a time",
      d: "Any slot that suits you. The invite lands in your inbox straight away.",
    },
    {
      t: "We do our homework",
      d: "Before the call we look at your site, your backlinks and two or three competitors.",
    },
    {
      t: "You leave with a plan",
      d: "Where we'd start, what it would take, and a short written summary afterwards.",
    },
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
          role="dialog"
          aria-modal="true"
          aria-label="Book a call with Outreachr"
        >
          <div
            className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="relative grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-deep lg:grid-cols-[0.9fr_1.1fr]"
            initial={{ opacity: 0, y: 44, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-dark shadow-md ring-1 ring-line transition-colors duration-300 hover:bg-navy-dark hover:text-white"
            >
              <X className="h-[18px] w-[18px]" />
            </button>

            {/* left: what the call is and what happens next */}
            <GlowPanel tone="warm" className="hidden rounded-none lg:block">
              <div className="flex h-full min-h-[600px] flex-col p-10 xl:p-12">
                <span className="flex items-center gap-2">
                  <LogoMark className="h-7 w-7" />
                  <span className="text-[15px] font-bold tracking-[-0.03em] text-navy-dark">
                    Outreachr
                  </span>
                </span>

                <h3 className="mt-10 text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.04em] text-navy-dark">
                  Let's look at your
                  <br />
                  site <Accent>together</Accent>.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-navy-dark/80">
                  A 15-minute call with one of our strategists. We'll go through
                  where you rank, who links to your competitors, and whether AI
                  answers mention you yet.
                </p>

                <ol className="mt-9 space-y-5">
                  {steps.map((s, i) => (
                    <motion.li
                      key={s.t}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                    >
                      <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-[13px] font-semibold text-navy-dark shadow-sm ring-1 ring-navy-dark/10">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-navy-dark">
                          {s.t}
                        </span>
                        <span className="mt-0.5 block text-[13.5px] leading-snug text-navy-dark/75">
                          {s.d}
                        </span>
                      </span>
                    </motion.li>
                  ))}
                </ol>

                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-auto inline-flex items-center gap-2 pt-10 text-[13.5px] font-medium text-navy-dark/80 transition-colors hover:text-navy-dark"
                >
                  <Mail className="h-4 w-4" />
                  Rather email? {EMAIL}
                </a>
              </div>
            </GlowPanel>

            <div className="relative flex max-h-[92vh] min-h-[540px] flex-col bg-white">
              <div className="border-b border-line px-5 pb-4 pt-5 pr-16 lg:hidden">
                <p className="text-[18px] font-semibold tracking-[-0.02em] text-navy-dark">
                  Book a 15-minute call
                </p>
                <p className="mt-1 text-[13px] leading-snug text-navy-dark/75">
                  Pick a time. We'll look at your site before we talk.
                </p>
              </div>
              <div className="relative flex flex-1 flex-col">
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
                  title="Pick a time for your call"
                  src={CALENDLY_EMBED}
                  className="h-full min-h-[540px] w-full flex-1"
                  onLoad={() => setLoaded(true)}
                />
              </div>

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
