import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { asset } from "@/lib/booking";

const VIDEO_STORIES = [
  {
    id: "s1",
    name: "Daniel Reyes",
    role: "Founder · B2B SaaS",
    quoteShort: "They told us which pages to back, then backed them.",
    result: "+212% clicks",
    poster: asset("/images/vid-test-1.jpg"),
    tint: "bg-butter",
  },
  {
    id: "s2",
    name: "Amira Khan",
    role: "Head of Growth · E-commerce",
    quoteShort: "Gulf coverage we assumed was out of reach for us.",
    result: "4× domains",
    poster: asset("/images/vid-test-2.jpg"),
    tint: "bg-lilac",
  },
  {
    id: "s3",
    name: "Tom Whitfield",
    role: "Owner · Home services",
    quoteShort: "I measure this in phone calls. They went up.",
    result: "Top 3 local",
    poster: asset("/images/vid-test-3.jpg"),
    tint: "bg-mint",
  },
];

const VideoStories = () => {
  const [e, s] = useState<any>(null);
  return (
    useEffect(() => {
      if (!e) return;
      const a = (r) => r.key === "Escape" && s(null);
      return (
        window.addEventListener("keydown", a),
        (document.body.style.overflow = "hidden"),
        () => {
          (window.removeEventListener("keydown", a),
            (document.body.style.overflow = ""));
        }
      );
    }, [e]),
    (
      <div className="bg-navy-dark py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap items-end justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-balance text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white">
              {"Hear it from the people "}
              <span className="text-white/70">whose pages moved</span>
            </h2>
            <p className="text-[14px] text-white/70 max-w-xs">
              Ninety seconds each. Unscripted, and specific about what the
              programme changed for the business.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {VIDEO_STORIES.map((a, r) => (
              <motion.button
                key={a.id}
                onClick={() => s(a)}
                className="group text-left"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: r * 0.09 }}
              >
                <div
                  className={`relative ${a.tint} rounded-3xl overflow-hidden aspect-[4/5] shadow-deep`}
                >
                  <img
                    src={a.poster}
                    alt={a.name}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/35 to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lift"
                      whileHover={{ scale: 1.08 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 20,
                      }}
                    >
                      <Play className="w-5 h-5 text-navy-dark fill-navy-dark ml-0.5" />
                    </motion.span>
                  </span>
                  <span className="absolute top-4 left-4 bg-white rounded-full px-3 py-1.5 text-[11px] font-bold text-navy-dark">
                    {a.result}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-5">
                    <span className="block text-white font-semibold text-[15px] leading-none">
                      {a.name}
                    </span>
                    <span className="block text-white/80 text-[12px] mt-1.5">
                      {a.role}
                    </span>
                  </span>
                </div>
                <p className="mt-4 text-[14.5px] text-white/75 leading-relaxed">
                  “{a.quoteShort}”
                </p>
              </motion.button>
            ))}
          </div>
          <p className="mt-8 text-center text-[11px] font-semibold tracking-[0.14em] text-white/65 uppercase">
            Placeholder stories · swap in real client videos before launch
          </p>
        </div>
        <AnimatePresence>
          {e && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-navy-dark/90 backdrop-blur-sm"
                onClick={() => s(null)}
              />
              <motion.div
                className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-deep"
                initial={{ y: 30, scale: 0.96 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <button
                  onClick={() => s(null)}
                  aria-label="Close video"
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-line flex items-center justify-center hover:bg-navy-dark hover:text-white transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
                <div
                  className={`${e.tint} aspect-video flex flex-col items-center justify-center text-center px-8`}
                >
                  <Play className="w-10 h-10 text-navy-dark/65 mb-4" />
                  <p className="text-[15px] font-semibold text-navy-dark">
                    Video placeholder
                  </p>
                  <p className="text-[13px] text-navy-dark/70 mt-1.5 max-w-sm">
                    {"Add the client's video URL to "}
                    <code className="font-mono text-[12px]">VIDEO_STORIES</code>
                    {" in VideoStories.tsx and this frame becomes the player."}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-[16px] text-navy-dark leading-relaxed mb-4">
                    “{e.quoteShort}”
                  </p>
                  <p className="text-[13px] font-semibold text-navy-dark">
                    {e.name}
                  </p>
                  <p className="text-[12.5px] text-navy-dark/70 mt-0.5">
                    {e.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  );
};

export default VideoStories;
