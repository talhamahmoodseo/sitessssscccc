/**
 * Copy for /about. Rewritten in round 5: short, credible, every section with
 * one job. Who we are → the numbers → what we specialise in → how we work →
 * why clients trust us → a client's words → where to go next.
 * Figures in `numbers` need confirming before launch.
 */

export const about = {
  seo: {
    title: "About Outreachr: Link Building & Digital PR Agency",
    description:
      "Outreachr is a link building and digital PR agency. We earn placements on publications your buyers read, so you rank on Google and get recommended in AI answers.",
  },

  hero: {
    eyebrow: "About Outreachr",
    h1a: "We build the authority",
    h1b: "that gets brands found.",
    lead: "Outreachr is a link building and digital PR agency for SaaS, e-commerce and service brands, and the agencies that serve them. We earn placements on publications your buyers read, so you rank on Google and get recommended in AI answers.",
    primary: "Book a call",
    secondary: "See our results",
    // value, label, sector, tint, position (desktop), depth (0 = sharp)
    tiles: [
      {
        v: "+212%",
        l: "organic clicks",
        s: "B2B SaaS",
        tint: "bg-butter",
        pos: "left-[6%] top-[4%]",
        depth: 0,
      },
      {
        v: "DR 74",
        l: "top PR placement",
        s: "E-commerce",
        tint: "bg-mint",
        pos: "right-[7%] top-[2%]",
        depth: 0,
      },
      {
        v: "Top 3",
        l: "in the local map pack",
        s: "Home services",
        tint: "bg-blush",
        pos: "left-[1%] top-[46%]",
        depth: 1,
      },
      {
        v: "26 / 42",
        l: "AI answers naming them",
        s: "B2B SaaS",
        tint: "bg-lilac",
        pos: "right-[1%] top-[44%]",
        depth: 1,
      },
      {
        v: "4×",
        l: "referring domains",
        s: "E-commerce",
        tint: "bg-sky",
        pos: "left-[22%] bottom-[0%]",
        depth: 2,
      },
      {
        v: "14 / 14",
        l: "links indexed",
        s: "B2B SaaS",
        tint: "bg-butter",
        pos: "right-[20%] bottom-[3%]",
        depth: 2,
      },
    ],
  },

  story: {
    eyebrow: "Who we are",
    lines: [
      "We started Outreachr because most link building is sold by the spreadsheet: a list of domains, a DR score next to each, and little proof any of it worked.",
      "We built ours the other way round. Direct relationships with editors, every site checked by hand, and reporting tied to rankings, traffic and AI visibility.",
      "Today our specialist team runs campaigns for brands and agencies across the US, UK, Europe and the Gulf.",
    ],
  },

  numbers: [
    { v: "1,400+", l: "links and mentions placed" },
    { v: "800+", l: "publications we work with directly" },
    { v: "40+", l: "brands and agencies served" },
    { v: "8", l: "countries" },
  ],

  focus: {
    eyebrow: "What we specialise in",
    h2a: "Off-page authority.",
    h2b: "Nothing else.",
    lead: "We don't do ads, web design or on-page SEO. We do the work that happens on other people's websites, and we do it well.",
    items: [
      {
        to: "/services/link-building",
        t: "Link Building",
        d: "Editorial links on relevant sites with real readers.",
      },
      {
        to: "/services/digital-pr",
        t: "Digital PR",
        d: "Stories that earn coverage on news and trade publications.",
      },
      {
        to: "/services/brand-mentions",
        t: "Brand Mentions",
        d: "Mentions on the sources AI answers quote.",
      },
      {
        to: "/services/haro-links",
        t: "HARO & Expert Quotes",
        d: "Your experts quoted by journalists.",
      },
    ],
  },

  beliefs: {
    eyebrow: "How we work",
    h2a: "Our approach.",
    h2b: "Four principles on every campaign.",
    items: [
      {
        n: "01",
        t: "Relevance before metrics.",
        d: "A link from a site in your industry, read by your buyers, beats a higher DR from anywhere else.",
        tint: "bg-butter",
      },
      {
        n: "02",
        t: "Every site checked by hand.",
        d: "Eight checks before a site gets near your link, starting with relevance. About one in five fails.",
        tint: "bg-mint",
      },
      {
        n: "03",
        t: "Built for Google and AI search.",
        d: "We plan links and mentions on the sources that rank you and the sources AI answers quote.",
        tint: "bg-lilac",
      },
      {
        n: "04",
        t: "Results you can verify.",
        d: "Live URLs, indexing, rankings and AI visibility in every monthly report.",
        tint: "bg-blush",
      },
    ],
  },

  apart: {
    eyebrow: "Why clients trust us",
    h2a: "Why brands",
    h2b: "trust us",
    items: [
      {
        icon: "network",
        t: "Our own publisher network",
        d: "We work directly with more than 800 editors and site owners. No marketplaces, no resellers, no markup on someone else's list.",
      },
      {
        icon: "check",
        t: "A protected investment",
        d: "Every link is monitored for 12 months. If a publisher removes or changes it, we replace it at no cost.",
      },
      {
        icon: "chart",
        t: "Complete transparency",
        d: "You see every site, every placement and every result. The reports and the links are yours to keep.",
      },
    ],
  },

  quote: {
    text: "Every link came with a reason, and every report showed what it moved. That’s rarer in this industry than it should be.",
    who: "Head of SEO",
    org: "B2B SaaS company",
  },

  explore: {
    h2: "Keep exploring",
    items: [
      {
        to: "/case-studies",
        t: "See the results",
        d: "Projects in full: the challenge, the work, every placement and what changed.",
        cta: "Read the case studies",
      },
      {
        to: "/#services",
        t: "Our solutions",
        d: "Link building, digital PR, brand mentions for AI search, and expert quotes.",
        cta: "See our solutions",
      },
      {
        to: "/pricing",
        t: "What it costs",
        d: "A $497 pilot, then monthly plans with exact placement counts.",
        cta: "See pricing",
      },
    ],
  },
};
