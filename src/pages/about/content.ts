/**
 * Copy for /about. Plan: PAGES-REDESIGN-2.md §1.
 *
 * Agency voice, no founder framing. Figures in `numbers` are carried over
 * from the previous site and need confirming before launch; the hero tiles
 * are sample results (the same samples the case studies use).
 */

export const about = {
  seo: {
    title: "About Us: Link Building & Digital PR Agency",
    description:
      "We build the authority that gets brands found: editorial links, digital PR and brand mentions on publications people actually read, checked by hand and reported in plain numbers.",
  },

  hero: {
    eyebrow: "About us",
    h1a: "We build the authority",
    h1b: "that gets brands found.",
    lead: "We’re a link building and digital PR agency. We get brands onto real publications their buyers read, so they rank in Google and get named when people ask AI for a recommendation.",
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
    eyebrow: "Why we exist",
    lines: [
      "Most link building is sold by the spreadsheet. A list of domains, a DR next to each one, and a report that counts links instead of results.",
      "We know, because we started on the other side of it, placing links for agencies on Upwork and Fiverr. Too many of those sites had no real readers.",
      "So we stopped reselling and built our own network, one editor and one site owner at a time, and checked every site by hand.",
      "Then search split in two. Buyers still Google, but now they also ask ChatGPT. The same trusted publications feed both.",
      "That’s the job now: get you onto the sites that matter, and prove it moved something.",
    ],
  },

  chapters: {
    eyebrow: "How we got here",
    h2a: "Three turning points.",
    h2b: "One rule that never changed.",
    items: [
      {
        y: "2023",
        t: "Started in the marketplaces",
        d: "Link building for agencies and site owners through Upwork, Fiverr and Legiit. A fast lesson in which sites are real and which only look real.",
        tint: "bg-butter",
      },
      {
        y: "2024",
        t: "Built our own network",
        d: "Direct relationships with editors and site owners. Hand-vetting became the rule: real traffic, real keywords, clean outbound links, or no placement.",
        tint: "bg-mint",
      },
      {
        y: "2026",
        t: "Search and AI, together",
        d: "Digital PR, brand mentions and expert quotes joined link building, because the publications that rank you are the same ones AI answers quote.",
        tint: "bg-lilac",
      },
    ],
    rule: "The rule: no site gets a client link until someone has checked it by hand.",
  },

  numbers: [
    { v: "1,400+", l: "links and mentions placed" },
    { v: "800+", l: "publications in our network" },
    { v: "40+", l: "brands and agencies served" },
    { v: "8", l: "countries" },
  ],

  apart: {
    eyebrow: "What sets us apart",
    h2: "Three things we do differently",
    items: [
      {
        icon: "network",
        t: "Our own publisher network",
        d: "800+ publications we work with directly. No marketplace inventory, no resold lists, no middlemen marking up someone else’s sites.",
      },
      {
        icon: "check",
        t: "Every site checked by hand",
        d: "Real traffic, the keywords behind it, a steady graph and the right audience. About one in five sites we find doesn’t pass.",
      },
      {
        icon: "chart",
        t: "Results you can check",
        d: "Live URLs, indexation, ranking movement and AI mentions in one monthly report, clean enough to forward to your boss.",
      },
    ],
  },

  team: {
    eyebrow: "How we’re set up",
    h2a: "A specialist on every desk.",
    h2b: "No middlemen in between.",
    lead: "Every campaign moves through the same five desks. You talk to the strategist; the rest happens behind them, in the open, in your report.",
    desks: [
      {
        icon: "compass",
        t: "Strategy",
        d: "Audits your site and competitors, picks the target pages and plans each month.",
        hands: "Your plan and target pages",
      },
      {
        icon: "shield",
        t: "Site vetting",
        d: "Checks every publication by hand before it reaches a shortlist. Rejects about one in five.",
        hands: "A shortlist you can trust",
      },
      {
        icon: "handshake",
        t: "Publisher relations",
        d: "Looks after our network of editors and site owners, and opens new ones in your niche.",
        hands: "Access to the right sites",
      },
      {
        icon: "pen",
        t: "Editorial",
        d: "Writes articles, pitches and quotes to each publication’s standard, in your voice.",
        hands: "Content editors accept",
      },
      {
        icon: "chart",
        t: "Reporting & QA",
        d: "Checks every link goes live and gets indexed, tracks rankings and AI mentions, writes the report.",
        hands: "One clear monthly report",
      },
    ],
    base: {
      t: "Where we work",
      d: "Based in Faisalabad, Pakistan. Our hours overlap with the UK and the Gulf, and US clients hear back within a day.",
      markets: [
        "United States",
        "United Kingdom",
        "UAE & Saudi Arabia",
        "Europe",
      ],
      platforms: [
        "Top Rated on Upwork",
        "Top Rated on Fiverr",
        "Legiit",
        "ComeUp",
        "LinkedIn",
      ],
    },
  },

  wont: {
    eyebrow: "What we won’t do",
    h2a: "Five lines",
    h2b: "we don’t cross.",
    lead: "Whatever the budget. These are the reasons clients stay, and the reason some enquiries don’t become clients.",
    items: [
      {
        t: "Resell marketplace inventory",
        d: "If we can’t reach the editor or owner directly, the site isn’t in our network.",
      },
      {
        t: "Guarantee rankings or AI citations",
        d: "Nobody controls Google or ChatGPT. We give ranges we can defend and report what actually happened.",
      },
      {
        t: "Use PBNs or link farms",
        d: "A site that exists only to sell links doesn’t get used, whatever its DR.",
      },
      {
        t: "Take gambling, adult or payday work",
        d: "Our publishers won’t touch it, and we won’t risk the network for one client.",
      },
      {
        t: "Sell you links you don’t need",
        d: "If your pages aren’t ready for links yet, the audit says so before you spend anything.",
      },
    ],
  },

  quote: {
    text: "What made the difference was how they work, not just what they place. Every link came with a reason, and every month came with a straight answer.",
    who: "Head of SEO",
    org: "B2B SaaS company",
  },

  explore: {
    h2: "Keep exploring",
    items: [
      {
        to: "/case-studies",
        t: "See the results",
        d: "Three projects in full: the challenge, the work, every placement and what changed.",
        cta: "Read the case studies",
      },
      {
        to: "/services",
        t: "What we do",
        d: "Link building, digital PR, brand mentions for AI search, and expert quotes.",
        cta: "See our services",
      },
      {
        to: "/pricing",
        t: "What it costs",
        d: "Starting prices for every plan, and what changes the number.",
        cta: "See pricing",
      },
    ],
  },
};
