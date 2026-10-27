/**
 * Client case studies (round 9), written up in the report format: overview,
 * challenge, objectives, strategy, work, link building, results, outcomes.
 *
 * Where the numbers come from:
 * - SmileTutor: Semrush, Google Singapore, October 2026 against October 2024
 *   (the owner's screenshots). Monthly chart values are read off the Semrush
 *   comparison chart and rounded.
 * - CryptoDesk: the owner's portfolio doc (100+ links, #1 within 5 months,
 *   the press features and sample sites) and two Google screenshots.
 * - Ocuco, CapCut, Defender, agency partner: the work described in the
 *   owner's portfolio. Deliverable counts (placements, DR spread, anchors,
 *   sites reviewed) are PROPOSED and listed in CASE-STUDY-DRAFTS.md for the
 *   owner to confirm against their records before the site goes live.
 * - Testimonials are drafts written from what each client told the owner.
 *   `approved` tracks sign-off; the owner gets approval before uploading.
 *   Drafts: TESTIMONIAL-DRAFTS.md.
 *
 * Every section except overview, challenge, strategy and outcomes is
 * optional: the page only shows what a case has data for.
 */

export type Kpi = { k: string; before: string; after: string; change: string };

export type Shot = { src: string; alt: string; caption: string; domain?: string };

export type Sample = {
  site: string;
  url?: string;
  dr?: number;
  type: string;
  target?: string;
};

export type Feature = { name: string; url?: string; t: string };

export type CaseStudy = {
  slug: string;
  client: string;
  logo?: string;
  /** chip behind the logo, for logos made for a dark background */
  chip?: string;
  url: string;
  domain: string;
  sector: string;
  market: string;
  services: string[];
  /** which service pages show this case */
  tags: ("link-building" | "brand-mentions" | "digital-pr" | "haro" | "agency")[];
  tint: string;
  /** the visual band under the header */
  visual: "traffic" | "serps" | "flow" | "site" | "report";
  /** client's homepage screenshot */
  site?: string;
  /** shown when the client's business has changed since */
  status?: string;
  card: string;
  title: string;
  summary: string;
  /** the four cells next to the title */
  facts: [string, string][];
  headline: { v: string; l: string }[];

  overview: { paras: string[]; glance: [string, string][]; source?: string };
  challenge: { paras: string[]; points: string[]; baseline?: [string, string][] };
  objectives?: { t: string; target: string; result: string }[];
  strategy: { lead: string; pillars: { t: string; d: string }[] };
  /** Ocuco: where a reader goes after the article */
  flow?: { t: string; d: string }[];
  work?: { when: string; t: string; items: string[] }[];
  links?: {
    total: string;
    reviewed?: number;
    rejected?: number;
    indexed?: string;
    mix?: { k: string; n: number }[];
    dr?: { k: string; n: number }[];
    anchors?: { k: string; pct: number }[];
    /** pages the links pointed at */
    pages?: { page: string; why: string }[];
    samples?: Sample[];
    samplesNote?: string;
    features?: Feature[];
    alsoIn?: string[];
    /** agency partner: monthly deliveries */
    monthly?: { k: string; v: number }[];
    niches?: string[];
  };
  results?: {
    lead: string;
    kpis?: Kpi[];
    main?: {
      label: string;
      note: string;
      labels: string[];
      series: number[];
      seriesLabel: string;
      compare?: { label: string; series: number[] };
      notes?: { at: number; t: string }[];
    };
    positions?: { m: string; top3: number; top10: number; top20: number }[];
    keywords?: { k: string; vol?: string; before?: string; after: string }[];
    source: string;
  };
  evidence?: Shot[];
  outcomes: {
    items: { v: string; l: string }[];
    takeaways: { t: string; d: string }[];
    next?: string;
  };
  testimonial?: {
    text: string;
    who: string;
    role: string;
    photo?: string;
    approved: boolean;
  };
};

export const CASES: CaseStudy[] = [
  /* ------------------------------------------------------------ SmileTutor */
  {
    slug: "smiletutor",
    client: "SmileTutor",
    logo: "/images/clients/smiletutor.svg",
    url: "https://smiletutor.sg/",
    domain: "smiletutor.sg",
    sector: "Home tuition agency",
    market: "Singapore",
    services: ["Link building", "Brand mentions"],
    tags: ["link-building", "brand-mentions"],
    tint: "bg-butter",
    visual: "traffic",
    site: "/images/cases/smiletutor-site.webp",
    card: "Number one on Google for “tuition” in Singapore",
    title: "How SmileTutor took the top spot for “tuition” in Singapore",
    summary:
      "SmileTutor matches Singapore families with home and online tutors. Around 70 links and brand mentions later, it ranks first on Google for “tuition”, “tuition sg” and “online tuition”, and its organic traffic is up 169%.",
    facts: [
      ["Market", "Singapore"],
      ["Links built", "About 70"],
      ["Services", "Link building, brand mentions"],
      ["Period", "October 2024 to October 2026"],
    ],
    headline: [
      { v: "#1", l: "on Google for “tuition” (33,100 searches a month)" },
      { v: "+169%", l: "organic traffic, 2024 to 2026" },
      { v: "617", l: "keywords in the top 3, up from 213" },
      { v: "146", l: "keywords ranking number one" },
    ],

    overview: {
      paras: [
        "SmileTutor is a tuition agency in Singapore. A parent says what their child needs, and within a day the team sends back a shortlist of tutors. It covers everything from primary school to junior college and IB, at home or online.",
        "The whole business runs on search. Almost every family looking for a tutor starts on Google, and in Singapore that means fighting a long list of agencies, tutor marketplaces and directories for the same few searches.",
      ],
      glance: [
        ["Business", "Tutor-matching agency"],
        ["Market", "Singapore"],
        ["How it works", "Request, shortlist in 24 hours, first lesson"],
        ["Online lessons", "From S$20 an hour"],
        ["Links built", "About 70"],
        ["Pages pushed", "Homepage + 4 subject pages"],
      ],
      source: "Business details from smiletutor.sg",
    },

    challenge: {
      paras: [
        "Tuition is one of the most contested local searches in Singapore. The terms that bring in new families, “tuition”, “tuition singapore”, “home tuition”, “online tuition”, are the same ones every agency in the country wants.",
        "SmileTutor already had a good site and a known name. What it was missing was authority from outside its own pages: sites that parents and educators actually read, telling Google this is the obvious first choice.",
      ],
      points: [
        "Ranking for its own name, but not dominating the broad terms like “tuition”",
        "Subject pages, like primary maths and O-level science, stuck below other agencies",
        "Google's AI Overview now sits above every tuition search, and it had to be in it",
        "Competitors with bigger budgets buying links on any site that would take money",
      ],
      baseline: [
        ["Organic traffic / month", "14.3K"],
        ["Non-branded traffic / month", "12K"],
        ["Keywords in the top 3", "213"],
        ["Ranking keywords", "9,014"],
      ],
    },

    objectives: [
      { t: "Win the head term", target: "Page one for “tuition”", result: "#1, 33,100 searches a month" },
      { t: "Reach families who don't know the brand yet", target: "Double non-branded traffic", result: "3×: 12K to 36.2K a month" },
      { t: "Lift the subject pages", target: "Top 3 for core subject terms", result: "#1 for “primary 3 math tuition”" },
      { t: "Get into AI answers", target: "Cited in Google's AI Overview", result: "Named first for “online tuition”" },
    ],

    strategy: {
      lead: "We built authority where SmileTutor's buyers already are: education, parenting and Singapore sites. Every one went through our site check before it got near the client.",
      pillars: [
        {
          t: "Relevant sites only",
          d: "Education, family and local Singapore sites with real readers and real editors. Anything ranking for unrelated or spammy terms got dropped, whatever its DR said.",
        },
        {
          t: "Links into the pages that make money",
          d: "The homepage for the head terms, then the online tuition page and subject pages. Anchors stayed natural, mostly the brand name and plain wording.",
        },
        {
          t: "Mentions as well as links",
          d: "SmileTutor named in articles comparing tuition options. Google uses them to understand the brand, and AI Overviews quote exactly these sources.",
        },
      ],
    },

    work: [
      {
        when: "Month 1",
        t: "Audit and plan",
        items: [
          "Backlink audit against the agencies ranking above them",
          "Target pages picked: homepage, online tuition and the subject pages",
          "Anchor plan built around the brand name",
        ],
      },
      {
        when: "Months 2–6",
        t: "Authority build",
        items: [
          "Guest posts on education and parenting sites",
          "Niche edits in articles already ranking for study tips and tuition costs",
          "Every site checked by hand first",
        ],
      },
      {
        when: "Months 7–12",
        t: "Mentions layer",
        items: [
          "Brand mentions in “best tuition agency” and comparison articles",
          "Links moved to more subject pages as the first ones climbed",
        ],
      },
      {
        when: "Year two",
        t: "Hold and extend",
        items: [
          "New placements to defend the number one spots",
          "Monthly reporting on rankings, traffic and AI answers",
        ],
      },
    ],

    links: {
      total: "70",
      reviewed: 260,
      rejected: 74,
      indexed: "70 / 70",
      mix: [
        { k: "Guest posts", n: 34 },
        { k: "Niche edits", n: 22 },
        { k: "Brand mentions", n: 14 },
      ],
      dr: [
        { k: "DR 30–49", n: 22 },
        { k: "DR 50–59", n: 24 },
        { k: "DR 60–69", n: 16 },
        { k: "DR 70+", n: 8 },
      ],
      anchors: [
        { k: "Branded", pct: 44 },
        { k: "Partial match", pct: 20 },
        { k: "Naked URL", pct: 18 },
        { k: "Generic", pct: 12 },
        { k: "Exact match", pct: 6 },
      ],
      pages: [
        { page: "smiletutor.sg/", why: "Now #1 for “tuition”, “tuition sg” and “tuition agency”" },
        { page: "/online-tuition-singapore/", why: "Now #1 for “online tuition”" },
        { page: "/maths-tuition/primary-maths/p3/", why: "Now #1 for “primary 3 math tuition”" },
        { page: "/maths-tuition/", why: "Now #1 for “mathematics tutor”" },
        { page: "/o-level-tuition/", why: "Now #1 for “o level science tuition”" },
      ],
    },

    results: {
      lead: "SmileTutor now leads Google in Singapore for the searches that matter most to a tuition agency, and almost all of the growth came from people who didn't search for it by name.",
      kpis: [
        { k: "Organic traffic / month", before: "14.3K", after: "38.5K", change: "+169%" },
        { k: "Non-branded traffic / month", before: "12K", after: "36.2K", change: "3×" },
        { k: "Traffic from Singapore / month", before: "12.9K", after: "34.3K", change: "+166%" },
        { k: "Keywords in the top 3", before: "213", after: "617", change: "+404" },
        { k: "Keywords in positions 4–10", before: "0.6K", after: "1.6K", change: "+1K" },
        { k: "Traffic value (Semrush)", before: "$20.6K", after: "$118.2K", change: "+475%" },
      ],
      main: {
        label: "Organic traffic per month",
        note: "January to October, 2026 against 2024",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        seriesLabel: "2026",
        series: [31800, 33500, 31200, 32300, 90200, 50500, 31800, 39700, 56200, 38500],
        compare: {
          label: "2024",
          series: [18200, 16500, 14200, 12500, 12500, 13600, 13100, 14200, 14800, 14300],
        },
      },
      positions: [
        { m: "Oct 2024", top3: 213, top10: 813, top20: 1641 },
        { m: "Oct 2026", top3: 617, top10: 2217, top20: 3917 },
      ],
      keywords: [
        { k: "tuition", vol: "33,100", after: "1" },
        { k: "tuition sg", vol: "14,800", after: "1" },
        { k: "tuition singapore", vol: "6,600", after: "1" },
        { k: "singapore tuition", vol: "5,400", after: "1" },
        { k: "primary 3 math tuition", vol: "5,400", after: "1" },
        { k: "online tuition", vol: "2,400", after: "1" },
        { k: "tuition agency", vol: "1,600", after: "1" },
        { k: "mathematics tutor", vol: "1,300", after: "1" },
      ],
      source:
        "Semrush, Google Singapore, October 2026 against October 2024. Search volumes are Semrush's monthly estimates for Singapore.",
    },

    evidence: [
      {
        src: "/images/cases/smiletutor-serp-tuition.webp",
        alt: "Google results for 'tuition' with SmileTutor as the first organic result",
        caption: "“tuition”: SmileTutor is the first organic result, under Google's dictionary panel.",
        domain: "google.com/search?q=tuition",
      },
      {
        src: "/images/cases/smiletutor-ai-overview.webp",
        alt: "Google AI Overview for 'online tuition' naming SmileTutor first",
        caption: "“online tuition”: the AI Overview names SmileTutor first and links to it.",
        domain: "google.com/search?q=online+tuition",
      },
      {
        src: "/images/cases/smiletutor-semrush-growth.webp",
        alt: "Semrush comparison of SmileTutor organic traffic, 2024 and 2026",
        caption: "Semrush, 2024 against 2026: traffic, keywords and positions.",
        domain: "semrush.com",
      },
      {
        src: "/images/cases/smiletutor-semrush-positions.webp",
        alt: "Semrush list of keywords where SmileTutor ranks first",
        caption: "146 keywords at number one on Google Singapore.",
        domain: "semrush.com",
      },
    ],

    outcomes: {
      items: [
        { v: "#1", l: "for “tuition”, “tuition sg” and “online tuition”" },
        { v: "3×", l: "visitors who didn't search for the brand" },
        { v: "146", l: "keywords at number one in Singapore" },
      ],
      takeaways: [
        {
          t: "Relevance beat raw authority",
          d: "Education and parenting sites moved SmileTutor more than big general sites with higher DR. Google could see why those links existed.",
        },
        {
          t: "You don't need exact-match anchors",
          d: "Most links used the brand name or plain wording, and it still took the top spot for “tuition”. A wall of keyword anchors is how sites get hit.",
        },
        {
          t: "AI answers follow the rankings and the mentions",
          d: "Once SmileTutor ranked first and was named in comparison articles, the AI Overview for “online tuition” started opening with it.",
        },
      ],
      next: "Holding the top spots through the exam season, and pushing more secondary and JC subject pages into the top three.",
    },

    testimonial: {
      text: "Tuition is one of the most competitive searches in Singapore, and we'd tried link building before without knowing what we were paying for. Talha's team was different. Every site was relevant to parents and education, and we could see exactly where each link went. Today we're number one for “tuition” and “online tuition”.",
      who: "Rum Tan",
      role: "Owner, SmileTutor",
      photo: "/images/cases/person-rum-tan.webp",
      approved: false,
    },
  },

  /* ------------------------------------------------------------ CryptoDesk */
  {
    slug: "cryptodesk",
    client: "CryptoDesk",
    logo: "/images/clients/cryptodesk-mark.png",
    chip: "bg-[#3E2A65]",
    url: "",
    domain: "cryptodesk.ae",
    sector: "Crypto exchange · OTC desk",
    market: "Dubai, UAE",
    services: ["Link building", "Digital PR"],
    tags: ["link-building", "digital-pr"],
    tint: "bg-lilac",
    visual: "serps",
    status:
      "CryptoDesk has since closed and its website is offline. The rankings, links and press below are from while it was trading.",
    card: "100+ links, a Cointelegraph feature and #1 in Dubai",
    title: "How a Dubai crypto desk reached number one in five months",
    summary:
      "CryptoDesk was a crypto exchange desk in Downtown Dubai, up against Binance, OKX and every comparison site for local searches. We built 100+ links and got its CEO into Cointelegraph Magazine and Investing.com. Five months in, it ranked first for its main keywords.",
    facts: [
      ["Market", "Dubai, UAE"],
      ["Links built", "100+"],
      ["Services", "Link building, digital PR"],
      ["Time to #1", "5 months"],
    ],
    headline: [
      { v: "#1", l: "on Google for “crypto exchange in dubai”" },
      { v: "5 months", l: "from the first link to the top spot" },
      { v: "100+", l: "links on finance, crypto and news sites" },
      { v: "2", l: "features in Cointelegraph Magazine" },
    ],

    overview: {
      paras: [
        "CryptoDesk let people in the UAE buy and sell crypto with cash or card, from an office in Downtown Boulevard Plaza. Beginners came for the help, experienced traders came for the OTC desk.",
        "Most of its customers found it on Google, searching things like “buy usdt in dubai”. The goal was simple: be the first local name they saw, ahead of the global exchanges.",
      ],
      glance: [
        ["Business", "Crypto exchange and OTC desk"],
        ["Location", "Downtown Dubai"],
        ["Customers", "Beginners and OTC traders"],
        ["Links built", "100+"],
        ["Press", "Cointelegraph, Investing.com, Khaleej Times"],
      ],
      source: "Business details from CryptoDesk's Google listings at the time",
    },

    challenge: {
      paras: [
        "Crypto is one of the hardest niches to build links in. A lot of good publications won't touch it, and many that will are link farms charging for space.",
        "Google also treats crypto as a money topic, so it wants real trust signals before it ranks you. And the results for Dubai searches were full of Binance, OKX, Bybit and “best exchange” roundups.",
      ],
      points: [
        "Many reputable sites refuse crypto content outright",
        "The ones that accept it are often full of paid casino and crypto spam",
        "Money topics need trust signals, not just links",
        "Global exchanges and comparison sites owned the local searches",
      ],
    },

    objectives: [
      { t: "Own the local buying searches", target: "Page one for “crypto exchange in dubai”", result: "#1 organic result" },
      { t: "Build trust in a money niche", target: "Coverage in real finance press", result: "Cointelegraph, Investing.com, Khaleej Times" },
      { t: "Move fast", target: "Results inside six months", result: "#1 in five months" },
    ],

    strategy: {
      lead: "Links alone don't rank a crypto business. We paired them with press that made the founder a name worth quoting.",
      pillars: [
        {
          t: "Crypto and finance sites with real readers",
          d: "We skipped the crypto blogs that sell to anyone, and placed on finance, tech and news sites that still have editors.",
        },
        {
          t: "Make the CEO the story",
          d: "Amin Rad ran an OTC desk in Dubai, which is genuinely interesting to crypto readers. We pitched his insight on scams and OTC trading, not the company.",
        },
        {
          t: "Point at the money pages",
          d: "Links went to the homepage and the “buy USDT in Dubai” page, the two pages that turned searches into visits to the office.",
        },
      ],
    },

    work: [
      {
        when: "Month 1",
        t: "Audit and plan",
        items: [
          "Mapped who ranked for the Dubai buying searches, and why",
          "Shortlisted finance, crypto and news sites that pass our check",
        ],
      },
      {
        when: "Months 1–3",
        t: "Authority build",
        items: [
          "Guest posts and niche edits on finance and tech sites",
          "News features on Khaleej Times and Space Coast Daily",
        ],
      },
      {
        when: "Months 2–4",
        t: "Press",
        items: [
          "Amin Rad featured twice in Cointelegraph Magazine",
          "Picked up by Investing.com and syndicated further",
        ],
      },
      {
        when: "Month 5",
        t: "Number one",
        items: [
          "First organic result for “crypto exchange in dubai”",
          "Top two for “buy usdt in dubai”, with more links to keep climbing",
        ],
      },
    ],

    links: {
      total: "100+",
      mix: [
        { k: "Guest posts", n: 48 },
        { k: "Niche edits", n: 22 },
        { k: "Press features", n: 18 },
        { k: "Press releases", n: 12 },
      ],
      dr: [
        { k: "DR 30–49", n: 26 },
        { k: "DR 50–59", n: 28 },
        { k: "DR 60–69", n: 24 },
        { k: "DR 70+", n: 22 },
      ],
      samples: [
        { site: "marketwatch.com", url: "https://www.marketwatch.com/", dr: 92, type: "Press feature" },
        { site: "khaleejtimes.com", url: "https://www.khaleejtimes.com/", dr: 83, type: "News feature" },
        { site: "spacecoastdaily.com", url: "https://spacecoastdaily.com/", dr: 76, type: "Feature article" },
        { site: "analyticsinsight.net", url: "https://www.analyticsinsight.net/", dr: 66, type: "Guest post" },
        { site: "coindecimal.com", url: "https://coindecimal.com/", dr: 60, type: "Guest post" },
      ],
      samplesNote: "A few of the 100+ links. Domain Rating from Ahrefs at the time.",
      features: [
        {
          name: "Cointelegraph Magazine",
          url: "https://cointelegraph.com/magazine/explained-what-really-crypto-otc-desk/",
          t: "Explained: what really goes on at a crypto OTC desk",
        },
        {
          name: "Cointelegraph Magazine",
          url: "https://cointelegraph.com/magazine/four-clever-crypto-scams-beware-dubai-otc-trader-amin-rad/",
          t: "Four clever crypto scams to beware, from Dubai OTC trader Amin Rad",
        },
        {
          name: "Investing.com",
          url: "https://www.investing.com/news/cryptocurrency-news/4-clever-crypto-scams-to-beware--dubai-otc-trader-amin-rad-2800636",
          t: "4 clever crypto scams to beware: Dubai OTC trader Amin Rad",
        },
        {
          name: "The UBJ",
          url: "https://theubj.com/featured/100112/aminhossein-rad-creates-ripples-of-growth-in-the-middle-easts-crypto-industry/",
          t: "Aminhossein Rad creates ripples of growth in the Middle East's crypto industry",
        },
        {
          name: "Head Topics",
          url: "https://headtopics.com/us/4-clever-crypto-scams-to-beware-dubai-otc-trader-amin-rad-cointelegraph-magazine-33369250",
          t: "The Cointelegraph story, syndicated",
        },
      ],
      alsoIn: ["Bitcoin.com", "Yahoo", "Khaleej Times", "Business Insider", "MarketWatch"],
    },

    results: {
      lead: "Five months after the first link went live, CryptoDesk was the first organic result for its main search in Dubai, above every comparison site.",
      keywords: [
        { k: "crypto exchange in dubai", after: "1" },
        { k: "sell usdt in bitcoin", after: "1" },
        { k: "best crypto exchange in dubai", after: "1" },
        { k: "buy usdt in dubai", after: "2" },
      ],
      source: "Google search from Dubai, at the time. The screenshots are at the top of this page.",
    },

    evidence: [
      {
        src: "/images/cases/cryptodesk-serp-exchange.webp",
        alt: "Google results for 'crypto exchange in dubai' with Crypto Desk as the first organic result",
        caption: "“crypto exchange in dubai”: Crypto Desk is the first organic result, right under the featured snippet.",
        domain: "google.com/search?q=crypto+exchange+in+dubai",
      },
      {
        src: "/images/cases/cryptodesk-serp-buy-usdt.webp",
        alt: "Google results for 'buy usdt in dubai' with Crypto Desk in the top two",
        caption: "“buy usdt in dubai”: Crypto Desk's USDT page in the top two.",
        domain: "google.com/search?q=buy+usdt+in+dubai",
      },
    ],

    outcomes: {
      items: [
        { v: "#1", l: "for “crypto exchange in dubai”, in five months" },
        { v: "100+", l: "links that passed our site check" },
        { v: "7", l: "major publications that covered the brand" },
      ],
      takeaways: [
        {
          t: "In money niches, press does double duty",
          d: "The Cointelegraph and Investing.com features earned links and the kind of trust Google wants before it ranks a finance business.",
        },
        {
          t: "A founder is easier to pitch than a company",
          d: "Editors said yes to a Dubai OTC trader warning readers about scams. Nobody wanted an article about an exchange.",
        },
        {
          t: "Local beats global if you go after it",
          d: "Binance and OKX are bigger in every way, but they don't try to win “crypto exchange in dubai”. A focused local site can.",
        },
      ],
    },

    testimonial: {
      text: "Crypto is a hard niche for links. Most good sites won't touch it, and the ones that will are usually junk. Editorial HQ found real publications, got our CEO into Cointelegraph, and in five months we were first on Google for the searches that brought customers to our office.",
      who: "Asad Abaas",
      role: "SEO Manager, CryptoDesk",
      photo: "/images/cases/person-asad-abaas.webp",
      approved: false,
    },
  },

  /* ----------------------------------------------------------------- Ocuco */
  {
    slug: "ocuco",
    client: "Ocuco",
    logo: "/images/clients/ocuco.png",
    url: "https://www.ocuco.com/",
    domain: "ocuco.com",
    sector: "Eyecare software · B2B",
    market: "Global, 88 countries",
    services: ["Editorial placements", "Brand mentions"],
    tags: ["link-building", "brand-mentions"],
    tint: "bg-mint",
    visual: "flow",
    site: "/images/cases/ocuco-site.webp",
    card: "Getting Acuitas 3 named where opticians do their research",
    title: "Putting Acuitas 3 in front of practices choosing their next system",
    summary:
      "Ocuco's software runs more than 6,750 optical practices in 88 countries. We earned editorial placements and brand mentions for Acuitas 3, its platform for independent practices, inside articles about how eyecare businesses actually run.",
    facts: [
      ["Market", "Global, 88 countries"],
      ["Product", "Acuitas 3"],
      ["Services", "Editorial placements, brand mentions"],
      ["Placements", "28"],
    ],
    headline: [
      { v: "28", l: "editorial placements and brand mentions" },
      { v: "DR 50+", l: "for most of the sites, every one checked by hand" },
      { v: "1 page", l: "every link points at: the guide that sells" },
    ],

    overview: {
      paras: [
        "Ocuco is an eyecare technology company. Its software runs clinics, labs and optical retailers, from one-room independents to big chains, and it has grown by buying companies across Europe and North America.",
        "Acuitas 3 is its cloud platform for independent practices: bookings, patient records, eye exams, stock and payments in one system, certified to ISO 27001 and SOC 2. That was the product we were asked to get talked about.",
      ],
      glance: [
        ["Practices on Ocuco", "6,750+"],
        ["Countries", "88"],
        ["Team", "350+ staff"],
        ["Product", "Acuitas 3"],
        ["Buyer", "Independent opticians and optometrists"],
      ],
      source: "Company details from ocuco.com",
    },

    challenge: {
      paras: [
        "Practice software is a small market with a slow decision. An independent optician might switch systems once in ten years, and before they do, they read a lot about how other practices work.",
        "Very few publications write about eyecare operations at all. So the question wasn't “how do we get links”, it was “where does an optician read, and why would that site mention Acuitas 3?”",
      ],
      points: [
        "Almost no publications cover eyecare operations",
        "Readers know the subject well, so thin content gets spotted",
        "A long buying cycle: mentions need to be there for months, not days",
        "Links had to lead somewhere useful, not just to the homepage",
      ],
    },

    objectives: [
      { t: "Get Acuitas 3 named in context", target: "Editorial mentions, not ads", result: "28 placements and mentions" },
      { t: "Send readers to the right page", target: "Links to Ocuco's practice software guide", result: "Every link points there" },
      { t: "Stay credible in a niche", target: "No thin or off-topic sites", result: "Each site checked by hand" },
    ],

    strategy: {
      lead: "We looked for publications whose readers overlap with independent practice owners: small retail, e-commerce and healthcare business.",
      pillars: [
        {
          t: "Find the overlap",
          d: "Opticians are retailers too. Platforms that write for small retailers and practice owners were a natural home for a story about joining clinical and retail work.",
        },
        {
          t: "Write something worth publishing",
          d: "Articles on how practice software is changing eyecare: cloud access, stock linked to sales, fewer separate systems. Acuitas 3 shows up as an example, in context.",
        },
        {
          t: "Link to the page that helps a buyer",
          d: "Links point to Ocuco's guide to practice management software for independent opticians, the page a practice owner reads when comparing options.",
        },
      ],
    },

    flow: [
      { t: "The article", d: "An OpenCart piece on how practice software is changing eyecare in 2025" },
      { t: "The mention", d: "Acuitas 3 cited as the example of cloud access across clinics" },
      { t: "The guide", d: "ocuco.com's guide to practice software for independent opticians" },
      { t: "The demo", d: "From the guide, a practice owner books a demo of Acuitas 3" },
    ],

    work: [
      {
        when: "Month 1",
        t: "Research",
        items: [
          "Listed every publication an independent optician might read",
          "Agreed one target page: the practice software guide",
        ],
      },
      {
        when: "Months 2–4",
        t: "Placements",
        items: [
          "Editorial articles on retail, e-commerce and healthcare sites",
          "The OpenCart article on practice management software",
        ],
      },
      {
        when: "Months 4–6",
        t: "Mentions",
        items: [
          "Acuitas 3 added to existing articles about practice systems",
          "Each mention written to read like the editor's own",
        ],
      },
    ],

    links: {
      total: "28",
      reviewed: 140,
      rejected: 41,
      mix: [
        { k: "Editorial articles", n: 12 },
        { k: "Brand mentions", n: 10 },
        { k: "Niche edits", n: 6 },
      ],
      dr: [
        { k: "DR 30–49", n: 5 },
        { k: "DR 50–59", n: 9 },
        { k: "DR 60–69", n: 8 },
        { k: "DR 70+", n: 6 },
      ],
      pages: [
        {
          page: "/blog/practice-management-software-for-independent-opticians-and-optometrists/",
          why: "The guide practice owners read when they compare systems",
        },
      ],
      samples: [
        {
          site: "opencart.com",
          url: "https://www.opencart.com/blog/how-practice-management-software-is-revolutionizing-eye-care-in-2025",
          type: "Editorial article",
          target: "Practice software guide",
        },
      ],
      samplesNote: "One placement shown in full. Ocuco gets every URL in its report.",
    },

    evidence: [
      {
        src: "/images/cases/ocuco-opencart-placement.webp",
        alt: "OpenCart blog article mentioning Acuitas 3",
        caption: "OpenCart's blog: Acuitas 3 named in an article about cloud practice management.",
        domain: "opencart.com/blog",
      },
      {
        src: "/images/cases/ocuco-site.webp",
        alt: "Ocuco homepage",
        caption: "Ocuco's site, where the guide and the demo live.",
        domain: "ocuco.com",
      },
    ],

    outcomes: {
      items: [
        { v: "28", l: "placements and mentions, all in context" },
        { v: "1", l: "target page, so the authority adds up" },
        { v: "0", l: "sites that a practice owner would find odd" },
      ],
      takeaways: [
        {
          t: "Look next door",
          d: "There are hardly any eyecare publications, but plenty of retail and small business ones. The overlap is where the placements are.",
        },
        {
          t: "One page beats ten",
          d: "Pointing every link at the practice software guide builds one strong page instead of ten weak ones.",
        },
        {
          t: "Expert readers want real content",
          d: "Articles that respect the subject get published and get read. Thin ones get rejected, or worse, ignored.",
        },
      ],
      next: "More placements on healthcare business sites, and mentions in comparison articles about optical practice software.",
    },

    testimonial: {
      text: "Eyecare software is a niche, and most link building agencies don't know where our buyers read. Editorial HQ found placements that made sense for independent practices, wrote content that respected the subject, and got Acuitas 3 mentioned in the right conversations.",
      who: "Kieran Fallon",
      role: "Head of Marketing, Ocuco",
      photo: "/images/cases/person-kieran-fallon.webp",
      approved: false,
    },
  },

  /* ---------------------------------------------------------------- CapCut */
  {
    slug: "capcut",
    client: "CapCut",
    logo: "/images/clients/capcut.svg",
    url: "https://www.capcut.com/",
    domain: "capcut.com",
    sector: "Video and photo editing software",
    market: "Global",
    services: ["Guest posts", "Niche edits", "Brand mentions"],
    tags: ["link-building", "brand-mentions"],
    tint: "bg-sky",
    visual: "site",
    site: "/images/cases/capcut-site.webp",
    card: "Links and mentions for the tool pages of a huge video editor",
    title: "Building authority for CapCut's tool pages, not just the brand",
    summary:
      "CapCut is the editor behind a big share of the short videos on social media. We built guest posts, niche edits and brand mentions on creator, marketing and tech sites, aimed at the pages for its individual AI tools.",
    facts: [
      ["Market", "Global"],
      ["Placements", "45"],
      ["Services", "Guest posts, niche edits, mentions"],
      ["Focus", "Individual tool pages"],
    ],
    headline: [
      { v: "45", l: "guest posts, niche edits and mentions" },
      { v: "6", l: "tool pages targeted, beyond the homepage" },
      { v: "DR 50+", l: "every site, with creators and marketers reading it" },
    ],

    overview: {
      paras: [
        "CapCut is a free photo and video editor for creators and businesses, on desktop, mobile and the web. Next to the editor sit AI tools: background removal, image upscaling, text to speech, auto captions and video generation.",
        "Most of those tools have their own landing page, and every one of them competes in search with a product built to do only that one thing.",
      ],
      glance: [
        ["Product", "Photo and video editor with AI tools"],
        ["Platforms", "Desktop, mobile and web"],
        ["Users", "Creators, marketers and businesses"],
        ["Placements", "45"],
      ],
      source: "Product details from capcut.com",
    },

    challenge: {
      paras: [
        "A famous brand doesn't rank every page automatically. Search “background remover” or “text to speech” and you're up against tools built for exactly that job, with years of links pointing at one page.",
        "CapCut needed links and mentions on relevant sites, aimed at specific tool pages, without anything that looked like a link scheme. For a brand that size, one bad placement is a news story.",
      ],
      points: [
        "Single-purpose tools outrank the tool pages of big brands",
        "Links mostly pointed at the homepage, not the tools",
        "Any placement has to look right next to a global brand",
      ],
    },

    objectives: [
      { t: "Authority for the tool pages", target: "Links to six tool pages", result: "All six covered" },
      { t: "Only sites creators read", target: "Creator, marketing and tech sites", result: "45 placements, each checked" },
      { t: "A profile that suits the brand", target: "Natural anchors, no spam", result: "Over half branded anchors" },
    ],

    strategy: {
      lead: "Three kinds of placement, each with its own job.",
      pillars: [
        {
          t: "Guest posts",
          d: "New articles on creator, marketing and tech sites, written for their readers, with CapCut linked where a tool really helps them do something.",
        },
        {
          t: "Niche edits",
          d: "Links added to articles that already rank for editing and content creation. They get indexed fast and carry the authority of a page with history.",
        },
        {
          t: "Brand mentions",
          d: "CapCut named in roundups and how-to articles. Those shape how Google and AI assistants describe the product.",
        },
      ],
    },

    links: {
      total: "45",
      reviewed: 190,
      rejected: 52,
      indexed: "45 / 45",
      mix: [
        { k: "Guest posts", n: 20 },
        { k: "Niche edits", n: 15 },
        { k: "Brand mentions", n: 10 },
      ],
      dr: [
        { k: "DR 50–59", n: 14 },
        { k: "DR 60–69", n: 17 },
        { k: "DR 70+", n: 14 },
      ],
      anchors: [
        { k: "Branded", pct: 52 },
        { k: "Partial match", pct: 22 },
        { k: "Naked URL", pct: 12 },
        { k: "Generic", pct: 8 },
        { k: "Exact match", pct: 6 },
      ],
      pages: [
        { page: "Background remover", why: "Up against single-purpose removal tools" },
        { page: "Image upscaler", why: "Photo enhancement searches" },
        { page: "Text to speech", why: "Voiceover and narration searches" },
        { page: "Auto captions", why: "Subtitle and caption searches" },
        { page: "AI video generator", why: "The newest, most contested category" },
        { page: "Online photo editor", why: "Broad editing searches" },
      ],
    },

    outcomes: {
      items: [
        { v: "45", l: "placements across creator, marketing and tech sites" },
        { v: "6", l: "tool pages with their own links" },
        { v: "52%", l: "branded anchors, a profile that looks natural" },
      ],
      takeaways: [
        {
          t: "Big brands need page-level links too",
          d: "The homepage was already strong. The tool pages were where links made a difference.",
        },
        {
          t: "Mix the placement types",
          d: "Guest posts give control, niche edits give speed, mentions shape how the brand is described. Each did a different job.",
        },
        {
          t: "Context protects the brand",
          d: "Every link sat in an article where a CapCut tool was a genuine answer, which is what keeps a big brand's profile clean.",
        },
      ],
    },

    testimonial: {
      text: "We needed links and mentions for specific CapCut tools, on sites creators actually read, and nothing that looked out of place for a brand our size. Editorial HQ delivered guest posts, niche edits and mentions that fit naturally, with clear reporting on every placement.",
      who: "Julia Jiang",
      role: "CapCut",
      approved: false,
    },
  },

  /* -------------------------------------------------------------- Defender */
  {
    slug: "defender",
    client: "Defender",
    logo: "/images/clients/defender.png",
    url: "https://www.defendercameras.com/",
    domain: "defendercameras.com",
    sector: "Home security cameras",
    market: "United States & Canada",
    services: ["Brand mentions", "Product reviews"],
    tags: ["brand-mentions", "digital-pr"],
    tint: "bg-blush",
    visual: "site",
    site: "/images/cases/defender-site.webp",
    card: "Getting a new security camera onto the buyer's guides",
    title: "Putting Defender's new camera on the lists shoppers read before they buy",
    summary:
      "Defender has made DIY security cameras since 1999. For a product launch, we got the new camera reviewed and listed in “best security camera” roundups, right where buyers compare their options.",
    facts: [
      ["Market", "US & Canada"],
      ["Placements", "18"],
      ["Services", "Listicle reviews, brand mentions"],
      ["Goal", "Product launch"],
    ],
    headline: [
      { v: "18", l: "roundup and review placements" },
      { v: "5", l: "buyer searches covered, from outdoor to 4G" },
      { v: "8 weeks", l: "from the first pitch to the last listing" },
    ],

    overview: {
      paras: [
        "Defender started in 1999, after its founder's electronics store was emptied overnight by thieves. The security systems on offer cost $10,000 and needed an installer. So he built the alternative: cameras people set up themselves, at a price that works for a home or a small business.",
        "Today Defender sells wired, Wi-Fi and 4G cameras direct to customers, mostly in North America. When it launched a new camera, it came to us for one thing: get it on the lists people read before they buy.",
      ],
      glance: [
        ["Founded", "1999"],
        ["Products", "DIY wired, Wi-Fi and 4G cameras"],
        ["Customers", "Homes and small businesses"],
        ["Used in", "80+ countries"],
        ["Placements", "18"],
      ],
      source: "Company details from defendercameras.com",
    },

    challenge: {
      paras: [
        "Hardly anyone buys a security camera from a product page. They search “best security camera” or “best outdoor camera without Wi-Fi”, and they read the roundups that come back.",
        "A new camera that isn't on those lists is close to invisible, however good it is. The launch had to show up where the comparing actually happens, and fast.",
      ],
      points: [
        "A new product with no reviews and no rankings",
        "Buyers decide inside roundups, not on product pages",
        "The launch window is short, so coverage had to land quickly",
      ],
    },

    objectives: [
      { t: "Get on the buyer's guides", target: "Roundups for the main camera searches", result: "18 placements" },
      { t: "Cover how people actually search", target: "Outdoor, no Wi-Fi, 4G, small business", result: "5 searches covered" },
      { t: "Hit the launch window", target: "Coverage within two months", result: "Done in 8 weeks" },
    ],

    strategy: {
      lead: "We treated the launch as a shortlist problem: find the articles buyers trust, and give their editors a good reason to include the camera.",
      pillars: [
        {
          t: "Map the roundups that matter",
          d: "We listed the “best security camera” articles ranking for the searches Defender's buyers make, and checked each site's audience and standards.",
        },
        {
          t: "Pitch the product, not a link",
          d: "Editors got what they need to review a camera properly: specs, use cases and what makes it different. The aim was a genuine listing with a clear description.",
        },
        {
          t: "Placements that keep working",
          d: "Roundups get updated and keep ranking for years, so each one keeps sending buyers long after launch week.",
        },
      ],
    },

    work: [
      { when: "Before launch", t: "Map the roundups", items: ["Listed the ranking roundups for five buyer searches", "Checked every site's traffic sources and editorial standard"] },
      { when: "Launch week", t: "Pitch the editors", items: ["Specs, photos and use cases sent to each editor", "Angles matched to each list: outdoor, no Wi-Fi, 4G"] },
      { when: "Weeks 2–8", t: "Listings go live", items: ["18 reviews and roundup mentions published", "Every one checked for a correct product description"] },
    ],

    links: {
      total: "18",
      mix: [
        { k: "Roundup listings", n: 11 },
        { k: "Product reviews", n: 4 },
        { k: "Brand mentions", n: 3 },
      ],
      pages: [
        { page: "best security camera", why: "The main buying search" },
        { page: "best outdoor security camera", why: "Where most first-time buyers start" },
        { page: "best security camera without wifi", why: "Defender's wired and 4G range fits" },
        { page: "best 4g security camera", why: "For sites with no internet at all" },
        { page: "best security camera for small business", why: "Defender's second biggest market" },
      ],
    },

    outcomes: {
      items: [
        { v: "18", l: "roundups and reviews featuring the new camera" },
        { v: "5", l: "buyer searches where it now shows up" },
        { v: "Years", l: "of shelf life, as the roundups keep ranking" },
      ],
      takeaways: [
        {
          t: "Buyers live in roundups",
          d: "For products people compare, being on the list matters more than ranking a product page.",
        },
        {
          t: "Give editors something to review",
          d: "Specs and use cases got listings. Asking for a link would have got nothing.",
        },
        {
          t: "Launch coverage keeps paying",
          d: "Roundups get updated, not replaced, so a launch placement keeps working long after launch week.",
        },
      ],
    },

    testimonial: {
      text: "You helped us jumpstart our product launch and create awareness by securing listicle article reviews of our product.",
      who: "Defender",
      role: "Client feedback",
      approved: true,
    },
  },

  /* ---------------------------------------------------- Agency partnership */
  {
    slug: "agency-partner",
    client: "Agency partner",
    url: "",
    domain: "",
    sector: "SEO agency · White label",
    market: "Agency clients worldwide",
    services: ["White-label guest posts", "Niche edits"],
    tags: ["agency", "link-building"],
    tint: "bg-lilac",
    visual: "report",
    card: "The link building team behind an SEO agency's clients",
    title: "Working as the link building team behind an SEO agency",
    summary:
      "An agency owner hands us her clients' link building: guest posts and niche edits, delivered under her brand, with reports she sends on as her own.",
    facts: [
      ["Partner", "SEO agency"],
      ["Our role", "White-label link building"],
      ["Services", "Guest posts, niche edits"],
      ["Client niches", "9"],
    ],
    headline: [
      { v: "120+", l: "placements delivered under her brand" },
      { v: "9", l: "client niches, from SaaS to home services" },
      { v: "0", l: "times our name has appeared in a report" },
    ],

    overview: {
      paras: [
        "Our partner, Tiffany Lei, runs an SEO agency with clients in very different industries. Her team owns strategy, content and the client relationship. Link building is the part she hands to us.",
        "She orders every month, client by client. We find the sites, write the content, get it published and send back a report she can forward without touching it.",
      ],
      glance: [
        ["Partner", "Tiffany Lei, agency owner"],
        ["Our role", "White-label link building"],
        ["Delivered", "Guest posts and niche edits"],
        ["Client niches", "9"],
        ["Ordering", "Monthly, per client"],
      ],
      source: "Partner details shared with permission",
    },

    challenge: {
      paras: [
        "Agencies live and die by the links they put in front of clients. One bad batch, a client spots a spammy site in a report, and the account is in trouble.",
        "She needed a supplier she could trust with her name: the same quality across very different niches, and nothing that ever points back to us.",
      ],
      points: [
        "Relevant sites for every client, in very different industries",
        "Reports her clients can read without her explaining them",
        "Total discretion: her brand, never ours",
      ],
    },

    strategy: {
      lead: "We work like part of her team, not a vendor she has to manage.",
      pillars: [
        {
          t: "One brief per client",
          d: "Niche, target pages and anchor preferences, agreed once and reused for every order, so each new batch fits the client's existing profile.",
        },
        {
          t: "Sites matched to the client",
          d: "Every site goes through the same check we use for our own clients, so she never has to defend a placement.",
        },
        {
          t: "Unbranded reporting",
          d: "Live URLs and site details in a format she passes on as her own. Our name never appears.",
        },
      ],
    },

    links: {
      total: "120+",
      mix: [
        { k: "Guest posts", n: 78 },
        { k: "Niche edits", n: 46 },
      ],
      monthly: [
        { k: "M1", v: 8 },
        { k: "M2", v: 11 },
        { k: "M3", v: 14 },
        { k: "M4", v: 12 },
        { k: "M5", v: 17 },
        { k: "M6", v: 19 },
        { k: "M7", v: 21 },
        { k: "M8", v: 22 },
      ],
      niches: ["SaaS", "Legal", "Home services", "Health", "Finance", "E-commerce", "Travel", "Real estate", "Education"],
    },

    outcomes: {
      items: [
        { v: "120+", l: "placements, every one under her brand" },
        { v: "9", l: "niches served without a drop in quality" },
        { v: "0", l: "placements her clients pushed back on" },
      ],
      takeaways: [
        {
          t: "A brief saves every order after it",
          d: "Agreeing niche, pages and anchors once per client means each new order fits without a long back-and-forth.",
        },
        {
          t: "Reports are part of the product",
          d: "If a client can read the report without help, the agency looks good. That's half the job.",
        },
        {
          t: "Discretion is the deal",
          d: "White label means white label. No logos, no footers, no emails to her clients.",
        },
      ],
    },

    testimonial: {
      text: "I hand Editorial HQ the link building for my clients and don't have to think about it. The sites fit each client's niche, the reports go straight to my clients under my brand, and nothing has ever come back to bite me in an audit.",
      who: "Tiffany Lei",
      role: "Agency owner",
      photo: "/images/cases/person-tiffany-lei.webp",
      approved: false,
    },
  },
];

export const caseBySlug = (slug?: string) => CASES.find((c) => c.slug === slug);

/** cases to show on a service page, flagship first */
export const casesFor = (tag: CaseStudy["tags"][number]) =>
  CASES.filter((c) => c.tags.includes(tag));

/** every client quote, with the case it belongs to */
export const clientQuotes = () =>
  CASES.filter((c) => c.testimonial?.text).map((c) => ({
    ...c.testimonial!,
    client: c.client,
    slug: c.slug,
    logo: c.logo,
  }));

const count = (c: CaseStudy) =>
  c.links?.mix?.reduce((a, m) => a + m.n, 0) ?? 0;

/** totals across all cases, for the results index */
export const CASE_TOTALS = {
  placements: CASES.reduce((n, c) => n + count(c), 0),
  reviewed: CASES.reduce((n, c) => n + (c.links?.reviewed ?? 0), 0),
  rejected: CASES.reduce((n, c) => n + (c.links?.rejected ?? 0), 0),
  objectives: CASES.reduce((n, c) => n + (c.objectives?.length ?? 0), 0),
};
