import { motion } from "motion/react";

const CLIENT_LOGOS = [
  { name: "Northvale", sub: "HVAC" },
  { name: "Loopdesk", sub: "" },
  { name: "VANTAGE", sub: "& CO" },
  { name: "OrbitPay", sub: "" },
  { name: "GulfEstates", sub: "" },
  { name: "Clearpath", sub: "LEGAL" },
  { name: "Fieldstone", sub: "" },
  { name: "Brightcart", sub: "" },
];

const LogoRow = ({ name, sub }) => (
  <span className="flex items-baseline gap-1.5 whitespace-nowrap">
    <span className="text-[19px] font-bold tracking-[-0.02em] text-navy-dark">
      {name}
    </span>
    {sub && (
      <span className="text-[10px] font-semibold tracking-[0.16em] text-navy-dark/60">
        {sub}
      </span>
    )}
  </span>
);

const ClientLogos = () => (
  <div className="bg-mist pb-16 pt-2">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.p
        className="text-center text-[13px] font-medium text-navy-dark/60 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Trusted by teams at
      </motion.p>
      <div className="relative overflow-hidden marquee-wrap">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-mist to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-mist to-transparent z-10" />
        <div className="flex items-center gap-16 w-max marquee-left opacity-55">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((e, s) => (
            <LogoRow key={s} name={e.name} sub={e.sub} />
          ))}
        </div>
      </div>
      <p className="text-center text-[10px] font-semibold tracking-[0.16em] text-navy-dark/65 uppercase mt-8">
        Illustrative marks · replace with real client logos
      </p>
    </div>
  </div>
);

export default ClientLogos;
