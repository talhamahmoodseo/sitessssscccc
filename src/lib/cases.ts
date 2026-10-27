/**
 * Real client case studies, built from the owner's portfolio (round 8).
 *
 * Rules for this file:
 * - Every number comes from a client screenshot or report the owner shared
 *   (SmileTutor: Semrush, October 2026). Client facts in `about` come from the
 *   client's own website. Nothing is estimated.
 * - `testimonial.approved` stays false until the client has signed off the
 *   wording. Unapproved testimonials are never rendered; the drafts live in
 *   TESTIMONIAL-DRAFTS.md for the owner to send.
 * - Where a project has no published figures yet, `results` is left out and
 *   the page shows the work instead. Do not fill gaps with estimates.
 */

export type Metric = {
  v: string;
  l: string;
  /** previous value, for before/after bars */
  from?: number;
  to?: number;
};

export type Ranking = { k: string; vol: string; pos: string };

export type Shot = { src: string; alt: string; caption: string };

export type Placement = {
  site: string;
  url?: string;
  kind: string;
  note: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  url: string;
  domain: string;
  sector: string;
  market: string;
  services: string[];
  /** which service pages show this case */
  tags: ("link-building" | "brand-mentions" | "digital-pr" | "haro" | "agency")[];
  tint: string;
  /** client's own homepage, as the case header visual */
  site?: string;
  /** short card title for the index */
  card: string;
  title: string;
  summary: string;
  /** big numbers for the header and cards; empty when the project has none */
  headline: Metric[];
  about: { paras: string[]; facts: [string, string][]; source: string };
  challenge: { paras: string[]; points: string[] };
  approach: { lead: string; steps: { t: string; d: string }[] };
  placements?: Placement[];
  results?: {
    lead: string;
    bars?: { label: string; unit: string; from: number; to: number; fromL: string; toL: string }[];
    rankings?: Ranking[];
    paras: string[];
    source: string;
  };
  evidence?: Shot[];
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
    url: "https://smiletutor.sg/",
    domain: "smiletutor.sg",
    sector: "Education · Home tuition",
    market: "Singapore",
    services: ["Link building", "Brand mentions"],
    tags: ["link-building", "brand-mentions"],
    tint: "bg-butter",
    site: "/images/cases/smiletutor-site.webp",
    card: "Number one on Google for “tuition” in Singapore",
    title: "How SmileTutor took the top spot for “tuition” in Singapore",
    summary:
      "SmileTutor matches Singapore families with home and online tutors. Our links and brand mentions helped it reach number one on Google for “tuition”, “tuition sg” and “online tuition”, and nearly triple its non-branded search traffic.",
    headline: [
      { v: "#1", l: "on Google for “tuition” (33,100 searches a month)" },
      { v: "+169%", l: "organic traffic, October 2024 to October 2026" },
      { v: "146", l: "keywords ranking at number one in Singapore" },
    ],

    about: {
      paras: [
        "SmileTutor is a tuition agency in Singapore. Parents tell it what their child needs, and within a day the team sends back a shortlist of tutors to choose from. It covers every level, from primary school to junior college and IB, at home or online.",
        "The business runs on search. Almost every family that needs a tutor starts on Google, and in Singapore that means competing with a long list of agencies, tutor marketplaces and directories for the same handful of terms.",
      ],
      facts: [
        ["Business", "Tutor-matching agency"],
        ["Market", "Singapore"],
        ["How it works", "Request, shortlist within 24 hours, first lesson"],
        ["Online lessons", "From S$20 an hour"],
      ],
      source: "Business details from smiletutor.sg",
    },

    challenge: {
      paras: [
        "Tuition is one of the most contested local searches in Singapore. The terms that bring in new families, “tuition”, “tuition singapore”, “home tuition”, “online tuition”, are the same ones every agency in the country is chasing.",
        "SmileTutor already had a well-built site and a recognised name. What it needed was authority from outside its own pages, from places that families and educators actually read, so Google would treat it as the clear first choice.",
      ],
      points: [
        "Hold the top position for the broad head terms, not just the brand name",
        "Lift the subject pages too, like primary school maths and O-level science",
        "Show up in Google's AI Overview, which now sits above the results for tuition searches",
      ],
    },

    approach: {
      lead: "We built authority where SmileTutor's buyers already were: education, parenting and Singapore-focused publications. Every site went through our site check first.",
      steps: [
        {
          t: "Relevant sites only",
          d: "Education, family and local Singapore sites with real readers and a real editorial standard. Sites that rank for unrelated or spammy terms were dropped, however good their DR looked.",
        },
        {
          t: "Links into the pages that earn enquiries",
          d: "The homepage for the head terms, plus the online tuition page and subject pages. Anchors stayed natural: mostly the brand name and plain descriptions, never a wall of exact-match keywords.",
        },
        {
          t: "Brand mentions as well as links",
          d: "Mentions in articles that compare tuition options. They help Google understand who SmileTutor is, and they are the kind of source AI Overviews quote.",
        },
      ],
    },

    results: {
      lead: "SmileTutor now leads the search results for the terms that matter most to a tuition agency in Singapore.",
      bars: [
        {
          label: "Non-branded organic traffic a month",
          unit: "",
          from: 12000,
          to: 36200,
          fromL: "12K",
          toL: "36.2K",
        },
        {
          label: "Organic traffic from Singapore a month",
          unit: "",
          from: 12900,
          to: 34300,
          fromL: "12.9K",
          toL: "34.3K",
        },
        {
          label: "Keywords in the top three positions",
          unit: "",
          from: 213,
          to: 617,
          fromL: "213",
          toL: "617",
        },
      ],
      rankings: [
        { k: "tuition", vol: "33,100", pos: "1" },
        { k: "tuition sg", vol: "14,800", pos: "1" },
        { k: "tuition singapore", vol: "6,600", pos: "1" },
        { k: "singapore tuition", vol: "5,400", pos: "1" },
        { k: "primary 3 math tuition", vol: "5,400", pos: "1" },
        { k: "online tuition", vol: "2,400", pos: "1" },
        { k: "tuition agency", vol: "1,600", pos: "1" },
        { k: "mathematics tutor", vol: "1,300", pos: "1" },
      ],
      paras: [
        "Non-branded traffic, the visitors who searched for tuition rather than for SmileTutor by name, went from about 12,000 to 36,200 a month. It now makes up 94% of the site's search traffic, up from 84%.",
        "Google's AI Overview for “online tuition” now opens with SmileTutor and links to it as its source.",
      ],
      source:
        "Semrush, Google Singapore, October 2026 compared with October 2024. Search volumes are Semrush's monthly estimates for Singapore.",
    },

    evidence: [
      {
        src: "/images/cases/smiletutor-serp-tuition.webp",
        alt: "Google results for 'tuition' with SmileTutor as the first organic result",
        caption: "“tuition”: SmileTutor is the first organic result, under Google's dictionary panel.",
      },
      {
        src: "/images/cases/smiletutor-ai-overview.webp",
        alt: "Google AI Overview for 'online tuition' naming SmileTutor first",
        caption: "“online tuition”: the AI Overview names SmileTutor first and cites it as the source.",
      },
      {
        src: "/images/cases/smiletutor-semrush-growth.webp",
        alt: "Semrush comparison of SmileTutor organic traffic, 2024 and 2026",
        caption: "Semrush, 2024 against 2026: organic traffic, keywords and top positions.",
      },
      {
        src: "/images/cases/smiletutor-semrush-positions.webp",
        alt: "Semrush list of keywords where SmileTutor ranks first",
        caption: "146 keywords at number one on Google Singapore, led by “tuition sg” and “tuition”.",
      },
    ],

    testimonial: {
      text: "",
      who: "Rum Tan",
      role: "Owner, SmileTutor",
      photo: "/images/cases/person-rum-tan.webp",
      approved: false,
    },
  },

  /* -------------------------------------------------------------- Defender */
  {
    slug: "defender",
    client: "Defender",
    url: "https://www.defendercameras.com/",
    domain: "defendercameras.com",
    sector: "Consumer electronics · Home security",
    market: "United States & Canada",
    services: ["Brand mentions", "Product reviews"],
    tags: ["brand-mentions", "digital-pr"],
    tint: "bg-blush",
    site: "/images/cases/defender-site.webp",
    card: "Getting a new security camera into the buyer's guides",
    title: "Putting Defender's new camera on the lists shoppers read before they buy",
    summary:
      "Defender has made DIY security cameras since 1999. For a product launch, we earned placements in “best security camera” roundups and review articles, so the new camera was in front of buyers at the moment they were comparing options.",
    headline: [],

    about: {
      paras: [
        "Defender started in 1999, after its founder's electronics store was emptied overnight by thieves and the security systems on offer cost $10,000 and needed a professional to install. He built the alternative: cameras people can set up themselves, at a price that makes sense for a home or a small business.",
        "Today Defender sells wired, wireless and 4G cameras direct to customers, mostly in North America.",
      ],
      facts: [
        ["Founded", "1999"],
        ["Products", "DIY wired, Wi-Fi and 4G security cameras"],
        ["Customers", "Homes and small businesses"],
        ["Used in", "80+ countries"],
      ],
      source: "Company details from defendercameras.com",
    },

    challenge: {
      paras: [
        "People rarely buy a security camera from a product page alone. They search “best security camera”, “best outdoor camera without Wi-Fi” or “best camera for a small business”, and they read the roundups that come back.",
        "A new camera that isn't on those lists is close to invisible, however good it is. Defender needed the launch to show up where the comparison actually happens.",
      ],
      points: [
        "Get the new camera into the buyer's guides people read before they buy",
        "Build awareness quickly, around the launch window",
        "Earn coverage on sites that review products properly, not paid directories",
      ],
    },

    approach: {
      lead: "We treated the launch like a shortlist problem: find the articles buyers trust, and give their editors a good reason to include the camera.",
      steps: [
        {
          t: "Map the roundups that matter",
          d: "We listed the “best security camera” and review articles that rank for the searches Defender's buyers make, and checked each publication's audience and editorial standard.",
        },
        {
          t: "Pitch the product, not a link",
          d: "Editors were offered what they need to review a camera fairly: specs, use cases and what sets it apart. The goal was a genuine listing with a clear description.",
        },
        {
          t: "Placements that keep working",
          d: "Roundups get updated and re-rank for years, so each placement keeps sending buyers after launch week.",
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

  /* ----------------------------------------------------------------- Ocuco */
  {
    slug: "ocuco",
    client: "Ocuco",
    url: "https://www.ocuco.com/",
    domain: "ocuco.com",
    sector: "B2B software · Eyecare",
    market: "Global",
    services: ["Editorial placements", "Brand mentions"],
    tags: ["link-building", "brand-mentions"],
    tint: "bg-mint",
    site: "/images/cases/ocuco-site.webp",
    card: "Bringing Acuitas 3 into the conversations opticians read",
    title: "Putting Acuitas 3 in front of the practices choosing their next system",
    summary:
      "Ocuco builds software used by more than 6,750 optical practices in 88 countries. We earned editorial placements and brand mentions for Acuitas 3, its platform for independent practices, inside articles about how eyecare businesses run.",
    headline: [],

    about: {
      paras: [
        "Ocuco is an eyecare technology company. Its software runs clinics, labs and optical retailers, from single independent practices to large chains, and it has grown by acquisition across Europe and North America.",
        "Acuitas 3 is its cloud platform for independent practices. It brings bookings, patient records, eye exams, stock and payments into one system, and it is certified to ISO 27001 and SOC 2.",
      ],
      facts: [
        ["Practices using Ocuco", "6,750+"],
        ["Countries", "88"],
        ["Team", "350+ staff"],
        ["Product we supported", "Acuitas 3"],
      ],
      source: "Company details from ocuco.com",
    },

    challenge: {
      paras: [
        "Practice management software is a narrow market with a long decision. An independent optician might change systems once in ten years, and before they do, they read about how other practices work.",
        "Very few publications write about eyecare operations at all. Ocuco needed Acuitas 3 named in the places practice owners research: articles about clinical workflow, retail, stock and running a modern practice.",
      ],
      points: [
        "Earn mentions of Acuitas 3 in relevant, editorial articles, not ads",
        "Point readers and search engines to Ocuco's own guide on practice software",
        "Stay credible in a niche where readers know the subject well",
      ],
    },

    approach: {
      lead: "We looked for publications whose readers overlap with independent practice owners: e-commerce, retail operations and healthcare business.",
      steps: [
        {
          t: "Find the overlap",
          d: "Opticians are also retailers. Platforms that write for small retailers and practice owners were a natural fit for a story about joining clinical and retail work.",
        },
        {
          t: "Write something worth publishing",
          d: "Articles explained how practice software is changing eyecare: cloud access, stock linked to sales, fewer separate systems. Acuitas 3 appears as an example, in context.",
        },
        {
          t: "Link to the right page",
          d: "Links point to Ocuco's guide on practice management software for independent opticians, the page that helps a practice owner compare their options.",
        },
      ],
    },

    placements: [
      {
        site: "OpenCart",
        url: "https://www.opencart.com/blog/how-practice-management-software-is-revolutionizing-eye-care-in-2025",
        kind: "Editorial article",
        note: "“How Practice Management Software Is Revolutionizing Eye Care in 2025”, with Acuitas 3 cited as an example of cloud access across clinics.",
      },
    ],

    evidence: [
      {
        src: "/images/cases/ocuco-opencart-placement.webp",
        alt: "OpenCart blog article mentioning Acuitas 3",
        caption: "OpenCart's blog: Acuitas 3 named in an article about cloud-based practice management.",
      },
    ],

    testimonial: {
      text: "",
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
    url: "https://www.capcut.com/",
    domain: "capcut.com",
    sector: "Consumer software · Video and photo editing",
    market: "Global",
    services: ["Guest posts", "Niche edits", "Brand mentions"],
    tags: ["link-building", "brand-mentions"],
    tint: "bg-sky",
    site: "/images/cases/capcut-site.webp",
    card: "Editorial links and mentions for one of the world's most-used video editors",
    title: "Building editorial authority for CapCut's editing tools",
    summary:
      "CapCut is the photo and video editor behind a huge share of the short videos on social media. We built guest posts, niche edits and brand mentions on creator, marketing and technology sites, aimed at the pages for its individual tools.",
    headline: [],

    about: {
      paras: [
        "CapCut is a free photo and video editor for creators and businesses, available on desktop, mobile and the web. Alongside the editor, it offers AI tools such as background removal, image enhancement, text to speech and video generation.",
        "Many of those tools have their own landing pages, and each one competes in search with dedicated single-purpose products.",
      ],
      facts: [
        ["Product", "Photo and video editor with AI tools"],
        ["Platforms", "Desktop, mobile and web"],
        ["Users", "Creators, marketers and businesses"],
      ],
      source: "Product details from capcut.com",
    },

    challenge: {
      paras: [
        "A famous brand doesn't rank every page automatically. A search like “background remover” or “text to speech” is a fight with tools built for exactly that one job.",
        "CapCut needed links and mentions on relevant sites, pointed at specific tool pages, without anything that looked like a link scheme for a brand that size.",
      ],
      points: [
        "Authority for individual tool pages, not just the homepage",
        "Sites that creators and marketers actually read",
        "A clean, natural link profile that suits a global brand",
      ],
    },

    approach: {
      lead: "We used three kinds of placement, each for a different job.",
      steps: [
        {
          t: "Guest posts",
          d: "New articles on creator, marketing and tech sites, written for their readers, with CapCut linked where a tool genuinely helps the reader do something.",
        },
        {
          t: "Niche edits",
          d: "Links added to existing, already-ranking articles about editing and content creation. These are indexed fast and carry the authority of a page with history.",
        },
        {
          t: "Brand mentions",
          d: "CapCut named in roundups and how-to articles, which shape how both Google and AI assistants describe the product.",
        },
      ],
    },

    testimonial: {
      text: "",
      who: "Julia Jiang",
      role: "CapCut",
      approved: false,
    },
  },

  /* ---------------------------------------------------- Agency partnership */
  {
    slug: "agency-partner",
    client: "White-label agency partner",
    url: "",
    domain: "",
    sector: "SEO agency · White label",
    market: "Agency clients",
    services: ["White-label guest posts", "Niche edits"],
    tags: ["agency", "link-building"],
    tint: "bg-lilac",
    card: "The link building team behind an SEO agency's client work",
    title: "Working as the link building team behind an SEO agency",
    summary:
      "An agency owner hands us her clients' link building: guest posts and niche edits, delivered under her brand, with reports she sends on as her own.",
    headline: [],

    about: {
      paras: [
        "Our partner runs an SEO agency with clients across different industries. Her team owns strategy, content and reporting. Link building is the part they hand to us.",
      ],
      facts: [
        ["Type", "SEO agency"],
        ["Our role", "White-label link building"],
        ["What we deliver", "Guest posts and niche edits"],
      ],
      source: "Partner details shared with permission",
    },

    challenge: {
      paras: [
        "Agencies live and die by the quality of the links they put in front of clients. One bad batch, a client spots a spammy site in a report, and the account is in trouble.",
        "Our partner needed a link supplier she could trust with her name: consistent quality across very different client niches, and nothing that ever points back to us.",
      ],
      points: [
        "Relevant sites for every client, in very different industries",
        "Reports her clients can read without explanation",
        "Complete discretion: her brand, never ours",
      ],
    },

    approach: {
      lead: "We work like an extension of her team, not a vendor she has to manage.",
      steps: [
        {
          t: "One brief per client",
          d: "Niche, target pages and anchor preferences, agreed once and reused for every order, so each new batch fits the client's existing profile.",
        },
        {
          t: "Guest posts and niche edits, matched to the client",
          d: "Every site goes through the same site check we use for direct clients, so the agency never has to defend a placement.",
        },
        {
          t: "Unbranded reporting",
          d: "Live URLs and site details in a format she can pass on as her own. Our name never appears.",
        },
      ],
    },

    testimonial: {
      text: "",
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

/** approved testimonials only: never render a draft */
export const approvedQuotes = () =>
  CASES.filter((c) => c.testimonial?.approved && c.testimonial.text).map(
    (c) => ({ ...c.testimonial!, client: c.client, slug: c.slug }),
  );
