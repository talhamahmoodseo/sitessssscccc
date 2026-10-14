/**
 * Copy for /about. Plan: PAGES-REDESIGN-2.md §1 (content rewritten in round 3).
 *
 * Outreachr in its own voice: who we are, what we believe, how the team works
 * and what makes us different. No marketplace history, no founder framing.
 * Figures in `numbers` need confirming before launch; the hero tiles are
 * sample results (the same samples the case studies use).
 */

export const about = {
  seo: {
    title: "About Outreachr: Link Building & Digital PR Agency",
    description:
      "Outreachr is a link building and digital PR agency. We place brands on publications their buyers read, so they rank in Google and get named in AI answers.",
  },

  hero: {
    eyebrow: "About Outreachr",
    h1a: "We earn brands a place",
    h1b: "on the sites that matter.",
    lead: "Outreachr is a link building and digital PR agency. We get brands onto real publications their buyers already read. That’s what moves rankings in Google, and it’s what gets them named when someone asks AI for a recommendation.",
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
      "Outreachr started with a simple frustration. Most link building is sold by the spreadsheet.",
      "A list of domains, a DR score next to each one, and a report that counts links instead of results.",
      "We built the agency the other way round. Real relationships with editors and site owners first. Every site checked by hand. Results reported in numbers you can verify.",
      "Then search changed. People still Google, but now they also ask ChatGPT. And both lean on the same trusted publications.",
      "So our job is simple to describe and hard to do: get you onto the sites that matter, and show you what it moved.",
    ],
  },

  beliefs: {
    eyebrow: "What we believe",
    h2a: "Four things we believe.",
    h2b: "They shape every campaign.",
    items: [
      {
        n: "01",
        t: "A link is only as good as the site’s readers.",
        d: "If nobody reads a site, Google stops trusting it and AI tools never quote it. We judge a site by its audience, not by its DR.",
        tint: "bg-butter",
      },
      {
        n: "02",
        t: "Being talked about now counts as much as being linked.",
        d: "AI answers lean on which brands get mentioned in trusted places, link or no link. So we plan for both.",
        tint: "bg-mint",
      },
      {
        n: "03",
        t: "Fewer, better placements win.",
        d: "Ten links from sites with real readers will beat fifty from sites without them. We’d rather send a shorter report that moved something.",
        tint: "bg-lilac",
      },
      {
        n: "04",
        t: "You should be able to check everything.",
        d: "Every placement comes with the live URL, the site’s numbers and the reason we picked it. Nothing hides behind a dashboard login.",
        tint: "bg-blush",
      },
    ],
    rule: "One rule hasn’t changed since day one: no client link goes on a site nobody on our team has checked by hand.",
  },

  numbers: [
    { v: "1,400+", l: "links and mentions placed" },
    { v: "800+", l: "publications we work with directly" },
    { v: "40+", l: "brands and agencies served" },
    { v: "8", l: "countries" },
  ],

  apart: {
    eyebrow: "Why clients choose us",
    h2a: "What makes us",
    h2b: "different",
    items: [
      {
        icon: "network",
        t: "Our own publisher network",
        d: "We work directly with more than 800 editors and site owners. No marketplace lists, and nobody in the middle adding a markup.",
      },
      {
        icon: "check",
        t: "Checked by hand, every time",
        d: "Traffic, the keywords behind it, the trend, the audience and the outbound links. Roughly one in five sites we look at doesn’t make it.",
      },
      {
        icon: "chart",
        t: "Built for Google and AI answers",
        d: "Links that move rankings, and mentions on the sources AI tools quote. One plan, reported in one place every month.",
      },
    ],
  },

  team: {
    eyebrow: "How the team works",
    h2a: "Five specialist teams.",
    h2b: "One strategist you deal with.",
    lead: "Every account runs through the same five teams. Your strategist is your single point of contact, and keeps everything else moving.",
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
        d: "Checks every publication by hand before it reaches a shortlist, and turns down about one in five.",
        hands: "A shortlist worth using",
      },
      {
        icon: "handshake",
        t: "Publisher relations",
        d: "Looks after our editors and site owners, and opens new ones in your niche.",
        hands: "Access to the right sites",
      },
      {
        icon: "pen",
        t: "Editorial",
        d: "Writes the articles, pitches and quotes to each publication’s standard, in your voice.",
        hands: "Content editors accept",
      },
      {
        icon: "chart",
        t: "Reporting",
        d: "Confirms every link is live and indexed, tracks rankings and AI mentions, and writes the report.",
        hands: "One clear monthly report",
      },
    ],
    base: {
      t: "Where we work",
      d: "Our team is based in Faisalabad, Pakistan. Our working day overlaps with the UK, Europe and the Gulf, and US clients hear back within one working day.",
      markets: [
        "United States",
        "United Kingdom",
        "Europe",
        "UAE & Saudi Arabia",
      ],
    },
  },

  wont: {
    eyebrow: "Where we draw the line",
    h2a: "Five things",
    h2b: "we won’t do.",
    lead: "However big the budget. Now and then they cost us a deal. They’re also why clients stay.",
    items: [
      {
        t: "Resell marketplace inventory",
        d: "If we can’t reach the editor or owner directly, the site isn’t in our network.",
      },
      {
        t: "Guarantee rankings or AI citations",
        d: "Nobody controls Google or ChatGPT. We give ranges we can back up and report what actually happened.",
      },
      {
        t: "Use PBNs or link farms",
        d: "A site that exists only to sell links doesn’t get used, whatever its DR.",
      },
      {
        t: "Take gambling, adult or payday work",
        d: "Our publishers won’t touch it, and we won’t risk the network for one account.",
      },
      {
        t: "Sell you links you don’t need",
        d: "If your pages aren’t ready for links yet, the audit shows it before you spend anything.",
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
