/** Homepage copy. Story, positioning and section purposes are in
 *  HOMEPAGE-PLAN.md. Each section says one new thing; nothing repeats.
 *
 *  STATUS: client names, figures, quotes and testimonials are realistic
 *  samples for design review. Replace with verified material before launch.
 *  The Neil Patel quote is verbatim from the linked source. */

export const LINKEDIN_URL = "https://www.linkedin.com/"; // TODO: Talha's profile URL

export const home = {
  seo: {
    title: "Link Building Agency for Google and AI Search",
    description:
      "A founder-led link building agency. Editorial links and brand mentions on trusted sites, so you get found on Google, mentioned by publications and recommended by AI.",
  },

  /* 1 — the promise */
  hero: {
    pill: { tag: "New", text: "Brand mentions for AI search", to: "/services/brand-mentions" },
    h1a: "Get found. Get mentioned.",
    h1b: ["Get ", "recommended", "."],
    lead: "We place your brand on the websites Google ranks and AI answers trust, with editorial links and mentions that real people read. So when buyers search, ask or compare, your name is the one that comes up.",
    primary: "Book a strategy call",
    secondary: "See our work",
    trust: ["Top Rated on Upwork & Fiverr", "40+ brands and agencies", "Since 2023"],
    note: "real sites, real readers",
    tags: {
      google: { k: "Google", v: "#3 for “crm for small teams”" },
      ai: { k: "AI answer", v: "YourBrand recommended" },
    },
    /** The clippings fanned out under the hero. Domains are masked on purpose. */
    clippings: [
      {
        pub: "The Business Review",
        serif: true,
        section: "Technology",
        title: "The quiet tools behind the fastest-growing support teams",
        before: "More often it's ",
        link: "better customer support software",
        after: " that routes the easy questions away from people.",
        dr: 74,
        type: "Authority placement",
      },
      {
        pub: "growth•••weekly",
        serif: false,
        section: "SaaS",
        title: "How small SaaS teams are rethinking their sales pipeline",
        before: "At that point, ",
        link: "a simple CRM built for small teams",
        after: " saves more time than any new hire.",
        dr: 62,
        type: "Guest post",
      },
      {
        pub: "Gulf•••Business",
        serif: true,
        section: "Retail",
        title: "Why regional brands are winning the online homeware race",
        before: "Brands like ",
        link: "YourBrand",
        after: " built trust in the UK first, then took it to the Gulf.",
        dr: 69,
        type: "Brand mention",
      },
    ],
  },

  /* 2 — who already trusts us */
  logos: {
    label: "Brands and agencies we've worked with",
    items: [
      { name: "CapCut", did: "Link building" },
      { name: "Ocuco", did: "Digital PR" },
      { name: "Khaleej Times", did: "Gulf media" },
      { name: "Arabian Business", did: "Brand mentions" },
      { name: "Gulf Business", did: "Expert quotes" },
      { name: "Tech Daily", did: "White-label links" },
    ],
    facts: [
      { v: "2023", k: "Building links since" },
      { v: "40+", k: "Brands and agencies served" },
      { v: "800+", k: "Vetted publishers in our network" },
      { v: "96%", k: "Of our links indexed by Google" },
    ],
  },

  /* 3 — why now */
  shift: {
    eyebrow: "How buyers find you now",
    h2a: "Buyers stopped clicking.",
    h2b: ["They started ", "asking", "."],
    lead: "Clicks on informational results are falling fast. More people search for a brand by name, or ask ChatGPT or Google's AI to recommend one. Ranking still matters. It's just not the whole game anymore.",
    stats: [
      { v: "−61%", k: "Click-through rate on informational content", trend: [40, 38, 36, 33, 27, 22, 18, 16], down: true },
      { v: "+18.7%", k: "Growth in branded search queries", trend: [20, 21, 22, 22, 24, 25, 27, 29], down: false },
    ],
    quote:
      "Informational content is down 61 percent on CTR. Branded queries are up 18.7 percent. That divergence is the most important signal in organic search right now. The teams that respond by shifting production toward commercial and branded content while optimizing informational content for AI citation rather than direct CTR are the ones who will navigate the AI Overview transition with the least revenue impact.",
    who: "Neil Patel",
    role: "Co-founder, Neil Patel Digital",
    source: "https://neilpatel.com/marketing-stats/ai-overview-expansion-organic-ctr-decline/",
    sourceLabel: "AI Overview expansion and organic CTR decline, neilpatel.com",
    aside: "You didn’t lose your ranking. You lost the reason it mattered.",
    asideLabel: "Neil Patel, on LinkedIn",
    close: "The good news: Google's rankings and AI's recommendations draw on the same thing.",
  },

  /* 4 — why link building sits at the centre */
  engine: {
    eyebrow: "Why links matter more now, not less",
    h2: ["One good placement. Three ways to get ", "found", "."],
    lead: "A link on a trusted site isn't just an SEO signal anymore. It's how Google decides who ranks, where AI tools look for answers, and how real readers discover you in the first place.",
    source: {
      pub: "The Business Review",
      title: "The quiet tools behind the fastest-growing support teams",
      link: "better customer support software",
    },
    outcomes: [
      {
        k: "Found",
        t: "Ranks on Google",
        d: "The link passes authority to the page it points at. The pages that were stuck on page two start to climb.",
        tag: "#14 → #4",
        mark: "google",
      },
      {
        k: "Mentioned",
        t: "Read by real people",
        d: "The publication's readers see your name in a story they chose to read. Some click through. More search for you later.",
        tag: "+ branded searches",
        mark: "reader",
      },
      {
        k: "Recommended",
        t: "Named by AI",
        d: "AI answers lean on the same trusted publications. When you're in them, you're in the answer.",
        tag: "YourBrand ✓",
        mark: "ai",
      },
    ],
    footnote: "Some people call this GEO or AEO. We call it being worth mentioning.",
  },

  /* 5 — what you can buy */
  services: {
    eyebrow: "What we do",
    h2: ["Built around ", "link building", "."],
    lead: "Links are the core of everything we do. Digital PR, brand mentions and expert quotes help them go further.",
    featured: {
      label: "Our core service",
      name: "Link Building",
      to: "/services/link-building",
      line: "Guest posts, niche edits and authority placements on hand-vetted sites with real organic traffic. Written for the site's readers, placed inside the story, tracked until Google counts it.",
      facts: [
        ["Typical authority", "DR 40–80"],
        ["First links live", "2–4 weeks"],
        ["Plans from", "$997 / month"],
      ],
      cta: "Explore link building",
    },
    more: [
      {
        name: "Digital PR",
        to: "/services/digital-pr",
        line: "Data stories and expert angles pitched to journalists. Real coverage that earns links on its own.",
        tag: "Mentioned",
      },
      {
        name: "Brand Mentions for AI",
        to: "/services/brand-mentions",
        line: "Mentions on the publications AI answers lean on, tracked month by month.",
        tag: "Recommended",
      },
      {
        name: "HARO & Expert Quotes",
        to: "/services/haro-links",
        line: "Your expertise quoted in the press, in your voice, with a link back.",
        tag: "Found + mentioned",
      },
    ],
  },

  /* 6 + 9 — one voice each, each making a different point */
  quotes: [
    {
      text: "They rejected a site we would have happily paid for. That's when we knew the vetting was real and not a sales line.",
      name: "Amira Khan",
      role: "Marketing Director",
      company: "Ocuco",
      avatar: "/images/avatar-2.jpg",
    },
    {
      text: "Three agencies before them, and this is the first time our link report and our rankings told the same story.",
      name: "Tom Whitfield",
      role: "SEO Lead",
      company: "Tech Daily",
      avatar: "/images/avatar-3.jpg",
    },
  ],

  /* 7 — craft */
  approach: {
    eyebrow: "How we work",
    h2: ["The boring parts, ", "done properly", "."],
    lead: "Good link building isn't clever. It's careful. Here's what that looks like day to day.",
    items: [
      {
        t: "We check every site by hand",
        d: "Real organic traffic, the keywords behind it, a steady graph, the right audience and no link-selling footprint. Roughly one in five sites fails.",
        fig: "audit",
      },
      {
        t: "We write for the site's readers",
        d: "Every article is written for the publication's audience, not stuffed with keywords. Your link sits in the story, where it belongs.",
        fig: "write",
      },
      {
        t: "We make sure it counts",
        d: "Every link is tracked until Google indexes it. If one drops in the first 12 months, we replace it free.",
        fig: "report",
      },
      {
        t: "We track more than rankings",
        d: "Each month you see where you rank, where you were mentioned and whether AI answers name you. One clear report.",
        fig: "people",
      },
    ],
  },

  /* 8 — proof */
  results: {
    note: "see the numbers!",
    h2: ["Real results from real ", "clients"],
    cta: "See all case studies",
    /** Rows read stat, stat, quote / quote, stat, stat / stat, stat, quote.
     *  Every quote here is used nowhere else on the page. */
    tiles: [
      { kind: "stat", value: "+212%", label: "organic clicks in 7 months", client: "CapCut", tile: "butter" },
      { kind: "stat", value: "35 → 65", label: "Domain Rating", client: "CapCut", tile: "mint" },
      { kind: "quote", quote: "They handled everything: finding sites, writing, placing. The monthly report was clean enough to forward to our CEO without editing.", name: "Daniel Reyes", role: "Head of Growth", client: "CapCut", avatar: "/images/avatar-1.jpg" },
      { kind: "quote", quote: "Rankings moved, but the bigger change was being named in AI answers when buyers asked for a recommendation.", name: "Leila Farah", role: "Head of SEO", client: "Ocuco", avatar: "/images/avatar-4.jpg" },
      { kind: "stat", value: "14 / 14", label: "placements indexed", client: "Ocuco", tile: "lilac" },
      { kind: "stat", value: "3 of 4", label: "AI tools now name the brand", client: "Ocuco", tile: "blush" },
      { kind: "stat", value: "DR 74", label: "top placement secured", client: "Khaleej Times", tile: "sky" },
      { kind: "stat", value: "4×", label: "referring domains in 6 months", client: "Gulf Business", tile: "butter" },
      { kind: "quote", quote: "We'd tried guest posting before and got nothing from it. The difference this time was the sites. Every one had real readers.", name: "Sophie Laurent", role: "Growth Lead", client: "Gulf Business", avatar: "" },
    ] as const,
  },

  /* 10 — is it for me? */
  personas: {
    eyebrow: "Who we work with",
    h2: ["Built for the people who ", "need", " authority"],
    items: [
      {
        id: "agencies",
        tab: "Agencies",
        fig: "whitelabel",
        title: "White-label links your clients will thank you for",
        cta: { label: "Talk white label", to: "/contact" },
        points: [
          ["Fulfilment you can resell", "Hand-vetted placements under your logo, with reports your client can read without you translating them."],
          ["No links you have to defend", "You never have to explain a bad placement on a client call."],
        ],
      },
      {
        id: "saas",
        tab: "SaaS founders",
        fig: "climb",
        title: "Show up when buyers compare tools",
        cta: { label: "Explore link building", to: "/services/link-building" },
        points: [
          ["Category pages on page one", "Links pointed at the pages already close to ranking, not just your homepage."],
          ["In the comparison answers", "Mentions on the sites AI tools quote when someone asks for the best tool in your category."],
        ],
      },
      {
        id: "seo",
        tab: "SEO leads",
        fig: "seo",
        title: "A link partner you don't have to babysit",
        cta: { label: "See how we report", to: "/services/link-building" },
        points: [
          ["Reports you can forward", "Every link, metric, anchor and indexation status in one sheet. No dashboard logins."],
          ["Anchors that stay safe", "Natural anchor ratios, mapped to your target pages before outreach starts."],
        ],
      },
      {
        id: "ecom",
        tab: "E-commerce",
        fig: "trend",
        title: "Rank the category pages that actually sell",
        cta: { label: "Explore digital PR", to: "/services/digital-pr" },
        points: [
          ["Links to collections", "Authority aimed at category and collection pages, not only blog posts."],
          ["Press across markets", "UK, US and Gulf coverage for brands selling in more than one country."],
        ],
      },
      {
        id: "local",
        tab: "Local businesses",
        fig: "local",
        title: "Beat the directories on the searches that make the phone ring",
        cta: { label: "Explore link building", to: "/services/link-building" },
        points: [
          ["Local press and niche edits", "Placements that push your money pages past national directories."],
          ["Measured on calls", "We track rankings, but we care about leads. So should you."],
        ],
      },
    ],
  },

  /* 11 — who you'll deal with */
  founder: {
    eyebrow: "The person behind it",
    h2: ["Hi, I'm ", "Talha", "."],
    paras: [
      "I started in link building as a freelancer, buying links from marketplaces like everyone else. Too many of them sat on sites with no real readers. The reports looked fine. The rankings didn't move.",
      "So I stopped buying and started checking, one site at a time. Today a small team and I do that for brands and agencies in the US, UK and the Gulf. We also build tools with AI to do the boring checks faster, so more of our time goes into the work that matters.",
      "When you book a call, you talk to me. Not a sales rep.",
    ],
    sign: "Talha",
    role: "Founder",
    primary: "Book a call with me",
    secondary: "Follow on LinkedIn",
    photo: "/images/talha.jpg",
  },

  /* 12 — low-commitment next step */
  audit: {
    eyebrow: "Free visibility audit",
    h2: ["See where you stand, on Google ", "and", " in AI answers."],
    lead: "Send us your site. We'll check your backlinks, your competitors' links and whether AI tools mention you for your main category. Then we'll tell you straight what we'd do. No sales pitch.",
    includes: [
      "Which of your current links are pulling their weight",
      "The links and mentions your competitors have and you don't",
      "Whether ChatGPT and Google's AI name you for your main search",
    ],
    button: "Get my free audit",
    small: "Usually back to you within 48 hours.",
  },

  /* 13 — depth */
  articles: {
    eyebrow: "From the blog",
    h2: ["Learn how search ", "really", " works now"],
    cta: "View all articles",
  },

  /* 14 — last doubts */
  faqHead: {
    eyebrow: "FAQ",
    h2: ["Questions we get ", "a lot"],
  },
  faqs: [
    {
      q: "Are these PBNs or paid link farms?",
      a: "No. Every site goes through a hand check for real organic traffic, the keywords behind it, a stable graph, the right audience and link-selling footprints. If a site exists to sell links, we don't use it, whatever the DR.",
    },
    {
      q: "Is this what people call GEO or AEO?",
      a: "Partly. GEO and AEO are new names for getting your brand into AI answers. The work behind it isn't new: get mentioned and linked on publications that people and machines trust. That's what we've always done. We just measure it in more places now.",
    },
    {
      q: "Can you guarantee we'll be recommended by ChatGPT?",
      a: "No, and be careful with anyone who says they can. Nobody controls an AI answer. What we can do is get you onto the publications those answers lean on, then track where you show up month by month. It's measurable, and it moves.",
    },
    {
      q: "How long until we see results?",
      a: "Links usually get indexed within two to six weeks. Pages already sitting on page two tend to move between months two and four. AI mentions often follow a little later. We'll tell you on the first call what's realistic for your site.",
    },
    {
      q: "Do you work with agencies?",
      a: "Yes, a lot. About a third of our work is white label: your branding on the reports, volume pricing, and we stay invisible on client calls.",
    },
    {
      q: "How much does it cost?",
      a: "Link building plans start at $997 a month. The final price depends on the sites, the volume and your niche. You'll get a clear number on the first call, before you pay anything.",
    },
  ],

  /* 15 — volume of proof */
  wall: {
    h2: ["Some kind words from our ", "clients"],
    items: [
      { name: "Bilal Ahmed", role: "Founder, Shopify store", via: "Fiverr", text: "Honest from day one. They said our product pages weren't ready, fixed the plan around it, and the results came anyway." },
      { name: "Sarah Mitchell", role: "Agency owner, UK", via: "Upwork", text: "We've used Talha's team for white-label links for over a year. Our clients never see them, and that's exactly how we want it." },
      { name: "Omar Haddad", role: "Marketing Manager, Dubai", via: "Direct client", text: "Getting into Gulf business press always felt impossible for us. They got us three features in two months." },
      { name: "Jessica Lane", role: "SEO Consultant", via: "Fiverr", text: "What I like most is that they say no. They told me two of my target pages weren't ready for links yet. They were right." },
      { name: "Marcus Webb", role: "Founder, B2B SaaS", via: "Upwork", text: "Our category page sat on page two for a year. Five months with them and it's at position four." },
      { name: "Priya Nair", role: "Content Lead, E-commerce", via: "Legiit", text: "The articles are actually good. Proper pieces that the sites' readers would want to read, not keyword-stuffed filler." },
      { name: "Ahmed Raza", role: "Digital Agency, Lahore", via: "LinkedIn", text: "Fast replies, clear reports, and every link indexed. That's rarer than it should be in this industry." },
      { name: "Hannah Brooks", role: "Head of Marketing, Fintech", via: "Direct client", text: "In the first call they picked three pages to focus on. All three are on page one now. No fluff, just the plan they said they'd run." },
      { name: "Lucas Moreau", role: "SEO Lead, Agency", via: "ComeUp", text: "I've bought links from a lot of vendors. This is the first one where I didn't have to re-check every site myself afterwards." },
    ],
  },

  /* 16 — talk to us */
  final: {
    eyebrow: "Let's talk",
    h2: ["Let's make you the brand that ", "comes up", "."],
    lead: "A 15-minute call. We'll look at your site and your competitors, and tell you honestly whether links are what you need right now.",
    primary: "Book a strategy call",
    secondary: "Email us",
    email: "contact@talhamahmood.com",
    ticks: ["Reply within 24 hours", "No obligation", "Talk to the founder"],
  },
};
