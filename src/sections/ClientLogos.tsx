import { motion } from "motion/react";

import { CLIENTS } from "@/lib/clients";

const CLIENT_LOGOS = CLIENTS.map((c) => ({
  name: c.name,
  sub: c.sector ?? "",
}));

const LogoRow = ({ name, sub }) => (
  <span className="flex items-baseline gap-1.5 whitespace-nowrap">
    <span className="text-[19px] font-bold tracking-[-0.02em] text-navy-dark/85">
      {name}
    </span>
    {sub && (
      <span className="text-[10px] font-semibold tracking-[0.16em] text-navy-dark/70">
        {sub}
      </span>
    )}
  </span>
);

const ClientLogos = () => (
  <div className="bg-stone py-14">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.p
        className="text-center text-[12.5px] font-semibold uppercase tracking-[0.16em] text-navy-dark/70 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Building authority for teams at
      </motion.p>
      <div className="relative overflow-hidden marquee-wrap">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone to-transparent z-10" />
        <div className="flex items-center gap-16 w-max marquee-left">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((e, s) => (
            <LogoRow key={s} name={e.name} sub={e.sub} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ClientLogos;
