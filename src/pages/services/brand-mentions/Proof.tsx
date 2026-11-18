import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SiteShot } from "@/components/proof";
import { brandMentions as C } from "../content/brandMentions";
import { Eyebrow, GlowPanel, H2, Soft, rise } from "../kit";

/** One real result with the real screenshot: SmileTutor named first in
 *  Google's AI Overview for "online tuition" (from the case study). */
const Proof = () => {
  const P = C.proof;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div {...rise()}>
          <Eyebrow className="mb-4">{P.eyebrow}</Eyebrow>
          <H2>
            {P.h2a}
            <br />
            <Soft>{P.h2b}</Soft>
          </H2>
          <p className="mt-6 text-[17px] leading-relaxed text-navy-dark/75">
            {P.lead}
          </p>
          <Link
            to={P.link}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-dark px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-black"
          >
            {P.linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.figure className="min-w-0" {...rise(0.1)}>
          <GlowPanel tone="cool" className="p-4 sm:p-8">
            <SiteShot
              src={P.image}
              domain={P.domain}
              alt={P.alt}
              ratio="aspect-[1400/1359]"
            />
          </GlowPanel>
          <figcaption className="mt-4 text-[13.5px] leading-relaxed text-navy-dark/70">
            {P.caption}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default Proof;
