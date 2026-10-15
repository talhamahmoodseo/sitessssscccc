/**
 * The three sample case studies. Plan: PAGES-REDESIGN-2.md §2.
 *
 * STATUS: SAMPLES. Client descriptions, figures, domains and quotes are
 * placeholders that show the format. Replace every value with verified
 * client data (and get sign-off) before launch. The numbers here match the
 * ones quoted on the service pages and homepage, so change them together.
 */

export type Kpi = { k: string; before: string; after: string; change: string };

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  market: string;
  duration: string;
  plan: string;
  services: string[];
  tint: string;
  /** short card title for the results index */
  card: string;
  title: string;
  summary: string;
  headline: { v: string; l: string }[];

  overview: { paras: string[]; glance: [string, string][] };
  challenge: {
    paras: string[];
    points: string[];
    baseline: [string, string][];
  };
  objectives: { t: string; target: string; result: string }[];
  strategy: { lead: string; pillars: { t: string; d: string }[] };
  work: { when: string; t: string; items: string[] }[];
  links: {
    reviewed: number;
    rejected: number;
    indexed: string;
    mix: { k: string; n: number }[];
    dr: { k: string; n: number }[];
    anchors: { k: string; pct: number }[];
    samples: {
      site: string;
      dr: number;
      type: string;
      target: string;
      indexed: string;
    }[];
    turnedDown: { site: string; dr: string; why: string }[];
  };
  results: {
    kpis: Kpi[];
    main: {
      label: string;
      unit: string;
      series: number[];
      notes: { at: number; t: string }[];
    };
    second: {
      label: string;
      unit: string;
      series: number[];
      kind: "line" | "bars";
    };
    positions: { m: string; top3: number; top10: number; top20: number }[];
    keywords: { k: string; vol: string; before: string; after: string }[];
  };
  outcomes: {
    items: { v: string; l: string }[];
    takeaways: { t: string; d: string }[];
    quote: { text: string; who: string };
    next: string;
  };
};

export const CASES: CaseStudy[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "b2b-saas-ai-visibility",
    client: "B2B SaaS platform",
    sector: "Customer support software",
    market: "United States & United Kingdom",
    duration: "7 months",
    plan: "Growth",
    services: ["Link building", "Brand mentions", "Expert quotes"],
    tint: "bg-lilac",
    card: "How a help desk platform got from page two to the shortlist",
    title: "From page two to the shortlist, in Google and in ChatGPT",
    summary:
      "A help desk platform with great reviews and almost no authority beyond its own site. Seven months of editorial links and brand mentions took its category pages into the top five and got it named in AI answers.",
    headline: [
      { v: "+212%", l: "organic clicks" },
      { v: "DR 35 → 65", l: "Domain Rating" },
      { v: "26 / 42", l: "AI answers naming them" },
      { v: "5 of 6", l: "main terms in the top 5" },
    ],

    overview: {
      paras: [
        "The client sells help desk software to small and mid-size support teams in the US and UK. The product was strong, customers were loyal and the blog went out every week. But almost nothing outside their own site described what they did.",
        "They came to us with two goals: get the two main category pages onto page one, and stop losing shortlists to three competitors who kept getting named when buyers asked AI tools for a recommendation.",
      ],
      glance: [
        ["Sector", "Customer support software"],
        ["Market", "US & UK"],
        ["Duration", "7 months"],
        ["Services", "Link building, brand mentions, expert quotes"],
        ["Plan", "Growth"],
        ["Pages targeted", "2 category pages + homepage"],
      ],
    },

    challenge: {
      paras: [
        "Their link profile looked fine in a tool and did very little in practice. Most referring domains were directories, their own press releases, and a batch of guest posts a previous vendor had placed on sites with no real traffic.",
      ],
      points: [
        "Category pages stuck between positions 11 and 18 for their main terms.",
        "About half of the 140 referring domains were low-quality directories.",
        "Named in 0 of 42 tracked AI answers, while three competitors were named in most of them.",
        "No independent article described the product in a way an AI tool could repeat.",
      ],
      baseline: [
        ["Domain Rating", "35"],
        ["Referring domains", "140"],
        ["Organic clicks / month", "1,200"],
        ["Keywords in the top 10", "38"],
        ["AI answers naming the brand", "0 of 42"],
      ],
    },

    objectives: [
      {
        t: "Get the category pages onto page one",
        target: "Top 10 for 6 main terms",
        result: "5 of 6 in the top 5",
      },
      {
        t: "Grow organic traffic",
        target: "+100% in 6 months",
        result: "+212% by month 7",
      },
      {
        t: "Get named in AI answers",
        target: "10 of 42 tracked answers",
        result: "26 of 42",
      },
      {
        t: "Remove the risky links",
        target: "Disavow the old vendor’s links",
        result: "37 domains disavowed",
      },
    ],

    strategy: {
      lead: "Two pages, three kinds of placement, and one way of measuring all of it.",
      pillars: [
        {
          t: "Focus the authority",
          d: "Instead of spreading links across eight pages, we pointed most of them at the two category pages closest to page one.",
        },
        {
          t: "Earn links that read naturally",
          d: "Guest posts and niche edits on support, CX and SaaS publications, each link inside a sentence that makes sense without it.",
        },
        {
          t: "Get described where AI looks",
          d: "Brand mentions in the comparison and “best tools” articles that ChatGPT and AI Overviews were already citing for this category.",
        },
      ],
    },

    work: [
      {
        when: "Month 1",
        t: "Audit and plan",
        items: [
          "Backlink audit and a disavow file for 37 risky domains",
          "Competitor gap: 212 domains linking to competitors, 64 winnable",
          "Target pages, anchor plan and a 42-question AI baseline",
        ],
      },
      {
        when: "Months 2–4",
        t: "Authority build",
        items: [
          "8 guest posts on SaaS and customer-experience publications",
          "6 niche edits on aged articles that already ranked",
          "3 expert quotes from the founder in business press",
        ],
      },
      {
        when: "Months 4–6",
        t: "Mention layer",
        items: [
          "9 inclusions in comparison and “best tools” articles",
          "5 mentions in trade press and review roundups",
          "One consistent product description across the profiles that matter",
        ],
      },
      {
        when: "Month 7",
        t: "Compound and report",
        items: [
          "Internal links from new blog posts to the category pages",
          "Final report and a plan for the next quarter",
        ],
      },
    ],

    links: {
      reviewed: 156,
      rejected: 31,
      indexed: "14 / 14 links",
      mix: [
        { k: "Guest posts", n: 8 },
        { k: "Niche edits", n: 6 },
        { k: "Comparison mentions", n: 9 },
        { k: "Trade & review mentions", n: 5 },
        { k: "Expert quotes", n: 3 },
      ],
      dr: [
        { k: "DR 30–49", n: 7 },
        { k: "DR 50–59", n: 11 },
        { k: "DR 60–69", n: 9 },
        { k: "DR 70+", n: 4 },
      ],
      anchors: [
        { k: "Branded", pct: 43 },
        { k: "Partial match", pct: 29 },
        { k: "Naked URL", pct: 14 },
        { k: "Exact match", pct: 7 },
        { k: "Generic", pct: 7 },
      ],
      samples: [
        {
          site: "saas•••weekly.com",
          dr: 61,
          type: "Guest post",
          target: "/help-desk-software",
          indexed: "6 days",
        },
        {
          site: "cx•••today.com",
          dr: 66,
          type: "Niche edit",
          target: "/shared-inbox",
          indexed: "3 days",
        },
        {
          site: "the•••journal.com",
          dr: 71,
          type: "Expert quote",
          target: "Homepage",
          indexed: "9 days",
        },
        {
          site: "b2b•••digest.com",
          dr: 64,
          type: "Guest post",
          target: "/help-desk-software",
          indexed: "12 days",
        },
        {
          site: "support•••review.com",
          dr: 58,
          type: "Comparison mention",
          target: "Brand mention",
          indexed: "—",
        },
      ],
      turnedDown: [
        {
          site: "Business magazine",
          dr: "DR 71",
          why: "Organic traffic had dropped 94% after a core update, and what was left came from one unrelated keyword.",
        },
        {
          site: "Regional tech news site",
          dr: "DR 64",
          why: "40% of recent outbound links pointed to offshore gambling sites.",
        },
        {
          site: "Support-industry blog",
          dr: "DR 52",
          why: "A real editor and real traffic, but a public price list for sponsored posts.",
        },
      ],
    },

    results: {
      kpis: [
        {
          k: "Organic clicks / month",
          before: "1,200",
          after: "3,744",
          change: "+212%",
        },
        { k: "Domain Rating", before: "35", after: "65", change: "+30" },
        { k: "Referring domains", before: "140", after: "212", change: "+51%" },
        {
          k: "Keywords in the top 10",
          before: "38",
          after: "117",
          change: "3×",
        },
        {
          k: "AI answers naming the brand",
          before: "0 of 42",
          after: "26 of 42",
          change: "+26",
        },
        {
          k: "Demo requests from organic / month",
          before: "41",
          after: "96",
          change: "+134%",
        },
      ],
      main: {
        label: "Organic clicks per month",
        unit: "clicks",
        series: [1200, 1380, 1610, 2050, 2400, 2980, 3450, 3744],
        notes: [
          { at: 2, t: "First guest posts live" },
          { at: 4, t: "Comparison mentions start" },
          { at: 7, t: "5 of 6 terms in the top 5" },
        ],
      },
      second: {
        label: "AI answers naming the brand (of 42)",
        unit: "answers",
        series: [0, 2, 6, 11, 17, 22, 26],
        kind: "bars",
      },
      positions: [
        { m: "Start", top3: 4, top10: 38, top20: 91 },
        { m: "M2", top3: 6, top10: 49, top20: 104 },
        { m: "M4", top3: 11, top10: 72, top20: 128 },
        { m: "M7", top3: 19, top10: 117, top20: 164 },
      ],
      keywords: [
        {
          k: "help desk software for small teams",
          vol: "1.9K",
          before: "14",
          after: "3",
        },
        {
          k: "shared inbox for customer support",
          vol: "1.3K",
          before: "18",
          after: "4",
        },
        { k: "best help desk software", vol: "8.1K", before: "22", after: "9" },
        {
          k: "customer support ticketing system",
          vol: "2.4K",
          before: "16",
          after: "5",
        },
        { k: "help desk with live chat", vol: "880", before: "31", after: "2" },
      ],
    },

    outcomes: {
      items: [
        { v: "+212%", l: "organic clicks in 7 months" },
        { v: "+134%", l: "demo requests from organic" },
        { v: "26 / 42", l: "AI answers now name them" },
      ],
      takeaways: [
        {
          t: "Focus beats spread",
          d: "Two pages getting most of the links moved faster than eight pages getting a few each.",
        },
        {
          t: "Comparison articles carry AI answers",
          d: "Nine comparison placements did more for AI visibility than everything else combined.",
        },
        {
          t: "Clean up before you build",
          d: "Disavowing the old vendor’s links in month one removed the risk before new authority arrived.",
        },
      ],
      quote: {
        text: "We’d never seen what ChatGPT said about us. The first report was uncomfortable. The sixth one was fun to forward.",
        who: "VP Marketing, B2B SaaS",
      },
      next: "Quarter three moves to two new feature pages and a second round of comparison placements in UK publications.",
    },
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "home-services-local-pack",
    client: "Family-run HVAC company",
    sector: "Home services (heating & cooling)",
    market: "Fresno & Clovis, California",
    duration: "5 months",
    plan: "Starter",
    services: ["Local link building", "Local digital PR"],
    tint: "bg-mint",
    card: "How a Fresno HVAC company got into the map pack",
    title: "From page two to the local map pack in five months",
    summary:
      "A family-run HVAC company was invisible for its most valuable searches while national directories took the calls. Local links and two local press features put it in the map pack and more than doubled calls from search.",
    headline: [
      { v: "7 of 10", l: "terms in the map pack" },
      { v: "+164%", l: "calls from search" },
      { v: "9 / 9", l: "placements indexed" },
      { v: "DR 12 → 31", l: "Domain Rating" },
    ],

    overview: {
      paras: [
        "A 14-truck heating and cooling company serving Fresno and Clovis. Good reviews, a decent website and a Google Business Profile set up years ago.",
        "The first page for their money searches belonged to national directories and two bigger competitors. Every call those directories sent cost them a fee.",
      ],
      glance: [
        ["Sector", "Home services (HVAC)"],
        ["Market", "Fresno & Clovis, CA"],
        ["Duration", "5 months"],
        ["Services", "Local link building, local digital PR"],
        ["Plan", "Starter"],
        ["Pages targeted", "3 service pages + Google Business Profile"],
      ],
    },

    challenge: {
      paras: [
        "Local rankings come from relevance, distance and prominence. They couldn’t change the first two. Prominence, how much the local web talks about you, was where they were losing.",
      ],
      points: [
        "Positions 14–22 for “emergency AC repair Fresno” and similar searches.",
        "Outside the map pack for 9 of 10 tracked terms.",
        "23 referring domains, none of them from local sites.",
        "Name, address and phone listed three different ways across the web.",
      ],
      baseline: [
        ["Domain Rating", "12"],
        ["Referring domains", "23"],
        ["Map pack (top 3) terms", "1 of 10"],
        ["Calls from search / month", "62"],
        ["Organic clicks / month", "640"],
      ],
    },

    objectives: [
      {
        t: "Get into the map pack",
        target: "Top 3 for 5 of 10 terms",
        result: "7 of 10",
      },
      {
        t: "Rank the emergency pages",
        target: "Page one for emergency terms",
        result: "Positions 2–6",
      },
      {
        t: "More calls from search",
        target: "+50% in 5 months",
        result: "+164%",
      },
      {
        t: "Build local trust signals",
        target: "5 local placements",
        result: "9 local and trade placements",
      },
    ],

    strategy: {
      lead: "Win the local web first, then add just enough trade authority.",
      pillars: [
        {
          t: "Fix the basics first",
          d: "Name, address and phone made consistent across 34 listings before any links went live.",
        },
        {
          t: "Local before big",
          d: "Links from Fresno news, business and community sites tell Google this company belongs in local results.",
        },
        {
          t: "A little trade relevance",
          d: "A few placements on home-services publications for topical authority on the service pages.",
        },
      ],
    },

    work: [
      {
        when: "Month 1",
        t: "Local audit",
        items: [
          "Citation cleanup across 34 listings",
          "Map pack analysis of the top three competitors",
          "26 local and trade sites found, 17 passed vetting",
        ],
      },
      {
        when: "Months 2–3",
        t: "Local placements",
        items: [
          "2 local news features from a heat-wave safety story",
          "3 guest posts on home-services publications",
          "2 Fresno business and community links",
        ],
      },
      {
        when: "Months 4–5",
        t: "Strengthen",
        items: [
          "2 niche edits on ranking home-improvement articles",
          "Service-page and internal-link updates with their team",
        ],
      },
    ],

    links: {
      reviewed: 26,
      rejected: 9,
      indexed: "9 / 9 links",
      mix: [
        { k: "Local news features", n: 2 },
        { k: "Home-services guest posts", n: 3 },
        { k: "Local business & community", n: 2 },
        { k: "Niche edits", n: 2 },
      ],
      dr: [
        { k: "DR 20–39", n: 3 },
        { k: "DR 40–49", n: 3 },
        { k: "DR 50–59", n: 2 },
        { k: "DR 60+", n: 1 },
      ],
      anchors: [
        { k: "Branded", pct: 45 },
        { k: "Service + location", pct: 22 },
        { k: "Naked URL", pct: 22 },
        { k: "Generic", pct: 11 },
      ],
      samples: [
        {
          site: "fresno•••news.com",
          dr: 58,
          type: "Local feature",
          target: "/emergency-ac-repair",
          indexed: "5 days",
        },
        {
          site: "home•••digest.com",
          dr: 64,
          type: "Guest post",
          target: "/ac-repair",
          indexed: "8 days",
        },
        {
          site: "hvac•••insider.com",
          dr: 49,
          type: "Niche edit",
          target: "/furnace-repair",
          indexed: "4 days",
        },
        {
          site: "valley•••business.com",
          dr: 41,
          type: "Business profile",
          target: "Homepage",
          indexed: "11 days",
        },
        {
          site: "clovis•••community.org",
          dr: 33,
          type: "Community link",
          target: "Homepage",
          indexed: "14 days",
        },
      ],
      turnedDown: [
        {
          site: "Regional “news” site",
          dr: "DR 52",
          why: "Published anything for $50 and had almost no local readers.",
        },
        {
          site: "Home-improvement blog",
          dr: "DR 47",
          why: "80% of its traffic came from outside the US. None of it was local.",
        },
        {
          site: "Directory network",
          dr: "DR 38",
          why: "200 near-identical city pages built to sell listings.",
        },
      ],
    },

    results: {
      kpis: [
        {
          k: "Map pack (top 3) terms",
          before: "1 of 10",
          after: "7 of 10",
          change: "+6",
        },
        {
          k: "Calls from search / month",
          before: "62",
          after: "164",
          change: "+164%",
        },
        {
          k: "Organic clicks / month",
          before: "640",
          after: "1,480",
          change: "+131%",
        },
        { k: "Domain Rating", before: "12", after: "31", change: "+19" },
        { k: "Referring domains", before: "23", after: "41", change: "+78%" },
      ],
      main: {
        label: "Calls from search per month",
        unit: "calls",
        series: [62, 70, 88, 112, 141, 164],
        notes: [
          { at: 1, t: "Listings cleaned up" },
          { at: 3, t: "Local features live" },
          { at: 5, t: "7 of 10 in the map pack" },
        ],
      },
      second: {
        label: "Terms in the map pack (of 10)",
        unit: "terms",
        series: [1, 1, 3, 4, 6, 7],
        kind: "bars",
      },
      positions: [
        { m: "Start", top3: 1, top10: 4, top20: 9 },
        { m: "M2", top3: 2, top10: 6, top20: 11 },
        { m: "M3", top3: 4, top10: 9, top20: 14 },
        { m: "M5", top3: 7, top10: 13, top20: 17 },
      ],
      keywords: [
        {
          k: "emergency ac repair fresno",
          vol: "390",
          before: "17",
          after: "2",
        },
        { k: "ac repair fresno", vol: "880", before: "14", after: "3" },
        { k: "furnace repair fresno", vol: "320", before: "22", after: "5" },
        { k: "hvac company clovis", vol: "170", before: "19", after: "1" },
        { k: "heating and air fresno", vol: "260", before: "12", after: "4" },
      ],
    },

    outcomes: {
      items: [
        { v: "+164%", l: "calls from search" },
        { v: "7 of 10", l: "money terms in the map pack" },
        { v: "Month 3", l: "when it paid for itself" },
      ],
      takeaways: [
        {
          t: "Local beats big",
          d: "A DR 33 community site did more for map rankings than a big national blog would have.",
        },
        {
          t: "Fix listings before links",
          d: "Consistent name, address and phone made every later link count for more.",
        },
        {
          t: "A seasonal story travels",
          d: "The heat-wave safety piece was picked up by two more local outlets without any extra pitching.",
        },
      ],
      quote: {
        text: "We used to pay a directory for every lead. Now people find us first.",
        who: "Owner, HVAC company, Fresno",
      },
      next: "Next: the same playbook for the Clovis and Madera service areas, plus a winter furnace-safety story.",
    },
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "ecommerce-gulf-authority",
    client: "Home & lifestyle online store",
    sector: "E-commerce (home & lifestyle)",
    market: "United Kingdom + UAE & Saudi Arabia",
    duration: "6 months",
    plan: "Authority",
    services: ["Digital PR", "Link building"],
    tint: "bg-butter",
    card: "How one data study built authority in two markets",
    title: "One data study, 21 placements and category pages that finally rank",
    summary:
      "A UK homeware brand expanding into the Gulf had great products and a thin link profile. A delivery-data study, Gulf business press and links to the pages that sell built authority in both markets.",
    headline: [
      { v: "21", l: "editorial placements" },
      { v: "DR 74", l: "top outlet" },
      { v: "4×", l: "referring domains" },
      { v: "+88%", l: "organic revenue" },
    ],

    overview: {
      paras: [
        "A UK home and lifestyle store that had just opened a Dubai warehouse. Its UK category pages sat on page two, and in the UAE and Saudi Arabia it had no visibility at all.",
        "Buyers in the Gulf check a brand before ordering from it. Without coverage in the publications they read, the new warehouse was a cost, not a channel.",
      ],
      glance: [
        ["Sector", "Home & lifestyle e-commerce"],
        ["Market", "UK + UAE & Saudi Arabia"],
        ["Duration", "6 months"],
        ["Services", "Digital PR, link building"],
        ["Plan", "Authority"],
        ["Pages targeted", "6 category pages (3 UK, 3 UAE)"],
      ],
    },

    challenge: {
      paras: [
        "Competitors with bigger PR budgets owned the “best of” lists in both markets. The brand had good stories to tell, it just hadn’t noticed them.",
      ],
      points: [
        "40 referring domains, mostly supplier and directory links.",
        "UK category pages on page two; UAE pages not ranking at all.",
        "No coverage in Gulf media, where buyers check a brand before ordering.",
        "Paid ads carrying almost all Gulf traffic at a rising cost.",
      ],
      baseline: [
        ["Domain Rating", "29"],
        ["Referring domains", "40"],
        ["Organic clicks / month", "2,100"],
        ["UK category pages on page one", "0 of 3"],
        ["UAE category pages on page one", "0 of 3"],
      ],
    },

    objectives: [
      {
        t: "Coverage in Gulf business press",
        target: "3 tier-one features",
        result: "4 features, top outlet DR 74",
      },
      {
        t: "Grow referring domains",
        target: "2× in 6 months",
        result: "4× (40 → 158)",
      },
      { t: "Category pages on page one", target: "4 of 6", result: "5 of 6" },
      { t: "Grow organic revenue", target: "+40%", result: "+88%" },
    ],

    strategy: {
      lead: "One story worth covering, the right press in each market, and links pointed at the pages that sell.",
      pillars: [
        {
          t: "One story worth covering",
          d: "Their own delivery data from 40,000 orders became a study on how fast Gulf shoppers now expect delivery.",
        },
        {
          t: "Gulf press first, then UK trade",
          d: "Business media in the UAE for trust, then UK retail and home publications for relevance.",
        },
        {
          t: "Links to the pages that sell",
          d: "Guest posts and niche edits pointed at the six category pages, so the PR authority reached revenue.",
        },
      ],
    },

    work: [
      {
        when: "Month 1",
        t: "Story audit and data study",
        items: [
          "Story audit with the founders and ops team",
          "Delivery-time study built from 40,000 orders",
          "Media list of 64 named journalists, approved by the client",
        ],
      },
      {
        when: "Months 2–3",
        t: "Launch and pitching",
        items: [
          "Study pitched to Gulf business desks and UK retail trade",
          "4 features and 7 data-study pieces in the first wave",
          "Founder quotes supplied for follow-up stories",
        ],
      },
      {
        when: "Months 3–5",
        t: "Follow-on coverage and links",
        items: [
          "5 expert quotes and 4 buying-guide inclusions",
          "Category-page links through guest posts and niche edits",
          "Arabic-market product pages internally linked from coverage",
        ],
      },
      {
        when: "Month 6",
        t: "Report and next story",
        items: [
          "Coverage report with every placement and the pitch that earned it",
          "Angle for the next study: returns behaviour by market",
        ],
      },
    ],

    links: {
      reviewed: 72,
      rejected: 18,
      indexed: "21 / 21 placements",
      mix: [
        { k: "Features", n: 4 },
        { k: "Data-study coverage", n: 7 },
        { k: "Expert quotes", n: 5 },
        { k: "Buying guides & roundups", n: 4 },
        { k: "Opinion piece", n: 1 },
      ],
      dr: [
        { k: "DR 40–49", n: 4 },
        { k: "DR 50–59", n: 7 },
        { k: "DR 60–69", n: 6 },
        { k: "DR 70+", n: 4 },
      ],
      anchors: [
        { k: "Branded", pct: 52 },
        { k: "Naked URL", pct: 24 },
        { k: "Partial match", pct: 14 },
        { k: "Generic", pct: 10 },
      ],
      samples: [
        {
          site: "UAE national daily",
          dr: 74,
          type: "Feature",
          target: "Homepage",
          indexed: "2 days",
        },
        {
          site: "Gulf business magazine",
          dr: 72,
          type: "Expert quote",
          target: "/uae/outdoor-furniture",
          indexed: "4 days",
        },
        {
          site: "UK retail trade title",
          dr: 61,
          type: "Data study",
          target: "/delivery-study",
          indexed: "3 days",
        },
        {
          site: "Dubai business daily",
          dr: 70,
          type: "Feature",
          target: "/uae",
          indexed: "5 days",
        },
        {
          site: "UK home & interiors blog",
          dr: 48,
          type: "Buying guide",
          target: "/garden-furniture",
          indexed: "9 days",
        },
      ],
      turnedDown: [
        {
          site: "Regional lifestyle magazine",
          dr: "DR 67",
          why: "The English edition was machine-translated and read as thin content.",
        },
        {
          site: "Gulf business news site",
          dr: "DR 61",
          why: "Required a “brand voices” label, which marks the piece as sponsored.",
        },
        {
          site: "Home-decor aggregator",
          dr: "DR 55",
          why: "Pure syndication: every article already lived on three other domains.",
        },
      ],
    },

    results: {
      kpis: [
        { k: "Referring domains", before: "40", after: "158", change: "4×" },
        { k: "Domain Rating", before: "29", after: "52", change: "+23" },
        {
          k: "Organic clicks / month",
          before: "2,100",
          after: "5,130",
          change: "+144%",
        },
        {
          k: "UK category pages on page one",
          before: "0 of 3",
          after: "3 of 3",
          change: "+3",
        },
        {
          k: "UAE category pages on page one",
          before: "0 of 3",
          after: "2 of 3",
          change: "+2",
        },
        {
          k: "Organic revenue",
          before: "Baseline",
          after: "+88%",
          change: "+88%",
        },
      ],
      main: {
        label: "Referring domains",
        unit: "domains",
        series: [40, 48, 61, 83, 104, 132, 158],
        notes: [
          { at: 2, t: "Study launches" },
          { at: 3, t: "First Gulf features" },
          { at: 6, t: "Editors start pitching back" },
        ],
      },
      second: {
        label: "Organic clicks per month",
        unit: "clicks",
        series: [2100, 2240, 2610, 3180, 3790, 4420, 5130],
        kind: "line",
      },
      positions: [
        { m: "Start", top3: 2, top10: 21, top20: 58 },
        { m: "M2", top3: 3, top10: 26, top20: 66 },
        { m: "M4", top3: 8, top10: 44, top20: 89 },
        { m: "M6", top3: 14, top10: 63, top20: 112 },
      ],
      keywords: [
        { k: "outdoor furniture dubai", vol: "2.9K", before: "—", after: "6" },
        {
          k: "rattan garden furniture uk",
          vol: "6.6K",
          before: "15",
          after: "7",
        },
        { k: "homeware online uae", vol: "1.6K", before: "—", after: "9" },
        { k: "linen bedding uk", vol: "4.4K", before: "12", after: "5" },
        { k: "garden furniture sale", vol: "12K", before: "19", after: "10" },
      ],
    },

    outcomes: {
      items: [
        { v: "+88%", l: "organic revenue" },
        { v: "4×", l: "referring domains" },
        { v: "5 of 6", l: "category pages on page one" },
      ],
      takeaways: [
        {
          t: "One study, many stories",
          d: "The delivery study produced 11 of the 21 placements. The rest came from editors who covered it and came back.",
        },
        {
          t: "Gulf media opens doors",
          d: "Coverage in Gulf business press made the new market trust the brand faster than ads alone.",
        },
        {
          t: "Point PR at the pages that sell",
          d: "Links to the category pages are what turned coverage into revenue.",
        },
      ],
      quote: {
        text: "The delivery study ran in places we’d never have got into on our own. By month four, editors were emailing us.",
        who: "Head of E-commerce, UK home & lifestyle brand",
      },
      next: "Next: a returns-behaviour study across both markets, and the Saudi category pages.",
    },
  },
];

export const caseBySlug = (slug?: string) => CASES.find((c) => c.slug === slug);

/** Totals across all three, for the results index. */
export const CASE_TOTALS = {
  placements: CASES.reduce(
    (n, c) => n + c.links.mix.reduce((a, m) => a + m.n, 0),
    0,
  ),
  reviewed: CASES.reduce((n, c) => n + c.links.reviewed, 0),
  rejected: CASES.reduce((n, c) => n + c.links.rejected, 0),
  objectives: CASES.reduce((n, c) => n + c.objectives.length, 0),
};
