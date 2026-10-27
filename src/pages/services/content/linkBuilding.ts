/** Copy for /services/link-building.
 *  Story and section purposes are in LINK-BUILDING-PAGE-PLAN.md.
 *
 *  STATUS: client names, figures, quotes and the case study are realistic
 *  samples for design review. The three rejected sites are real (anonymised). */

export const linkBuilding = {
  seo: {
    title: "Link Building Services That Move Rankings",
    description:
      "Done-for-you link building: guest posts, niche edits and authority placements on hand-checked, relevant sites. Free link replacement and a 100% money-back guarantee. Trial placement $170.",
  },

  hero: {
    eyebrow: "Link building services",
    h1a: "Links that move rankings.",
    h1b: "From sites that still have readers.",
    lead: "We find the sites, check what they really rank for, write the content and get your link placed. Then we track it until Google counts it. You get rankings, not a spreadsheet full of DR.",
    primary: "Book a strategy call",
    secondary: "See starting prices",
    rating: "Trusted by CapCut, SmileTutor, Ocuco and Defender",
  },

  /** The hero card cycles through these. Placements we use are masked to
   *  protect our publisher network; `checks` follows SITE_CHECKS order. */
  heroChecks: [
    {
      domain: "saas•••insider.com",
      dr: 62,
      kws: "2.4K",
      trend: [22, 24, 23, 27, 29, 31, 34, 36, 39, 41],
      keywords: [
        { k: "best crm for startups", geo: "US", ok: true },
        { k: "sales pipeline template", geo: "US", ok: true },
        { k: "cold email software", geo: "UK", ok: true },
      ],
      checks: [1, 1, 1, 1, 1, 1, 1],
      pass: true,
      verdict: "Passed all 7 checks",
    },
    {
      domain: "deals•••hub.net",
      dr: 64,
      kws: "310",
      trend: [9, 4, 11, 3, 8, 2, 7, 3, 6, 2],
      keywords: [
        { k: "free movie download hd", geo: "IN", ok: false },
        { k: "celebrity net worth", geo: "US", ok: false },
        { k: "instant loan apply", geo: "IN", ok: false },
      ],
      checks: [0, 0, 0, 0, 0, 1, 0],
      pass: false,
      verdict: "Rejected · DR 64, ranks for nothing relevant",
    },
    {
      domain: "growth•••weekly.com",
      dr: 57,
      kws: "1.6K",
      trend: [12, 13, 13, 14, 15, 15, 16, 17, 18, 19],
      keywords: [
        { k: "b2b lead scoring", geo: "US", ok: true },
        { k: "saas pricing pages", geo: "US", ok: true },
        { k: "churn rate formula", geo: "CA", ok: true },
      ],
      checks: [1, 1, 1, 1, 1, 1, 1],
      pass: true,
      verdict: "Passed all 7 checks",
    },
  ],

  trust: {
    label: "Brands and agencies we've built links for",
  },

  problem: {
    eyebrow: "The problem",
    h2a: "The report looked great.",
    h2b: "Your rankings didn't move.",
    paras: [
      "You've probably been here. You order 20 backlinks. The report comes back full of DR 50+ sites and green ticks. Everything looks fine.",
      "Three months later, nothing has moved.",
      "Link building isn't broken. The sites are. Most backlinks get bought on two numbers, DR and traffic, and both are easy to fake. So half the links sit on sites with no real readers, some rank for keywords you'd never want near your brand, and a few never get indexed at all.",
    ],
    kicker:
      "The problem was never link building. It was which sites the links went on.",
    toggle: ["What the report says", "What Google sees"],
    rows: [
      {
        site: "tech•••blog.com",
        dr: 58,
        traffic: "48K",
        real: "One viral post",
        note: "Every other page ranks for nothing",
        ok: false,
      },
      {
        site: "biz•••journal.net",
        dr: 61,
        traffic: "22K",
        real: "Not indexed",
        note: "Google never picked it up",
        ok: false,
      },
      {
        site: "growth•••mag.com",
        dr: 54,
        traffic: "31K",
        real: "Casino terms",
        note: "Ranks for gambling keywords",
        ok: false,
      },
      {
        site: "startup•••wire.com",
        dr: 49,
        traffic: "9.4K",
        real: "Right topic",
        note: "Ranks for what buyers search",
        ok: true,
      },
      {
        site: "daily•••post.org",
        dr: 66,
        traffic: "27K",
        real: "Link shop",
        note: "Public price list for links",
        ok: false,
      },
      {
        site: "saas•••review.io",
        dr: 47,
        traffic: "12K",
        real: "Page one ×40",
        note: "Page one for 40 relevant keywords",
        ok: true,
      },
    ],
    reportSummary: "6 links delivered · Avg DR 56 · 100% live",
    realitySummary: "2 of 6 links doing any real work",
  },

  gap: {
    eyebrow: "Three sites we turned down",
    h2: "DR is the easiest number in SEO to fake.",
    lead: "Domain Rating (DR) is Ahrefs' score for the strength of a site's backlink profile, from 0 to 100. It says nothing about readers, relevance or whether Google still trusts the site. These three real sites looked like strong buys on paper. Tap a card to see what our checks found.",
    footer:
      "Roughly one in five sites we find fails at this stage. They never get near your link.",
    cards: [
      {
        site: "TechBullion",
        url: "https://techbullion.com/",
        domain: "techbullion.com",
        looks: ["Large traffic in SEO tools", "Thousands of ranking pages"],
        found: [
          "Most ranking keywords were irrelevant to its topic, or spam",
          "Most of its rankings were in markets our client doesn't sell in, mainly India",
          "An unstable visibility graph, rising and falling month to month",
        ],
        verdict: "Big number. Wrong visitors.",
      },
      {
        site: "DSNews",
        url: "https://dsnews.co.uk/",
        domain: "dsnews.co.uk",
        looks: ["DR around 70", "An established UK domain"],
        found: [
          "SEO tools estimated only 1,000–2,000 visits a month for a DR 70 site",
          "Weak keywords: very little a buyer would search for",
          "An unstable visibility graph",
        ],
        verdict: "High DR. Almost no readers.",
      },
      {
        site: "Entrepreneurs Break",
        url: "https://entrepreneursbreak.com/",
        domain: "entrepreneursbreak.com",
        looks: ["Healthy traffic", "A graph that looked steady"],
        found: [
          "A business and finance site ranking for adult and spam keywords",
          "Openly sells guest posts and links",
          "A link-selling footprint that puts every link on it at risk",
        ],
        verdict: "Looks like a publication. Works like a link shop.",
      },
    ],
  },

  method: {
    eyebrow: "How we vet every site",
    badge: "The 7-Point Site Check",
    h2: "Seven checks, in order. Relevance comes first.",
    lead: "A link only helps if Google sees it as a real recommendation from a site your buyers read. So before any site gets your link, someone on our team opens the data and checks these seven things. We only check what we can actually see. No tool makes the call.",
    steps: [
      {
        n: "01",
        t: "Is it relevant to you?",
        d: "The site covers your industry, or has a genuine, regularly updated section for it. The article your link sits in is about the same subject as the page it points to. A relevant DR 40 beats an unrelated DR 80.",
        flag: "A crypto and betting blog offering to publish a CRM review.",
      },
      {
        n: "02",
        t: "What does it rank for?",
        d: "We read the site's top ranking keywords one by one. They should match its topic and include searches your buyers make. Spam, adult, casino or 'net worth' keywords mean the site's visibility is padding.",
        flag: "A business site whose top keywords are adult terms.",
      },
      {
        n: "03",
        t: "Is the trend healthy?",
        d: "We look at 12–24 months of search visibility. Tools only estimate traffic, so we don't trust the number itself, but the shape tells you a lot. Steady or growing is good. Sharp spikes, a saw-tooth pattern or a collapse after a Google update are not.",
        flag: "Visibility fell off a cliff in the last core update.",
      },
      {
        n: "04",
        t: "Is it in your market?",
        d: "The keywords it ranks for are searched in the countries you sell in, and the site writes for that audience. A US brand needs a site that ranks in the US.",
        flag: "Almost all of its rankings are in countries the client doesn't sell in.",
      },
      {
        n: "05",
        t: "Does the authority hold up?",
        d: "DR on its own proves nothing. We compare it with what the site actually ranks for and look at the referring domains behind it. A high DR that ranks for almost nothing usually means bought, expired or recycled links.",
        flag: "DR 70 with weak keywords and an unstable graph.",
      },
      {
        n: "06",
        t: "Does Google index it?",
        d: "We check that the site's pages, and its recent articles, are in Google's index. A link on a page Google never indexes passes nothing.",
        flag: "Over a third of last month's posts not indexed.",
      },
      {
        n: "07",
        t: "Is it a real publication?",
        d: "Named authors, edited content and a sensible number of relevant outbound links. No public price list for links, no private blog network, and no casino, CBD or loan links next to every topic.",
        flag: "'Write for us: $80 per post' on the homepage.",
      },
    ],
    pass: "Passes all seven. Now it's allowed near your link.",
    cta: {
      t: "Curious how your current backlinks would do?",
      d: "Send us your site. We'll run your existing links through the same seven checks and show you which ones are pulling their weight. Free.",
      button: "Get a free link audit",
    },
  },

  types: {
    eyebrow: "Types of backlinks we build",
    h2a: "Three kinds of links.",
    h2b: "All inside real content.",
    lead: "No footers, no sidebars, no author bios, no link pages. Your link sits in the body of an article, where readers and Google actually pay attention.",
    tabs: [
      {
        id: "guest",
        name: "Guest posts",
        d: "A new article, written for the site's real readers, with your link inside the body where it actually makes sense.",
        best: "Building authority to service pages and blog content",
        dr: "DR 40–70",
        live: "2–4 weeks",
        article: {
          site: "growth•••weekly.com",
          tag: "New article",
          title: "How small SaaS teams are rethinking their sales pipeline",
          before:
            "Most early-stage teams start with a spreadsheet, and that works until the third salesperson joins. At that point, ",
          link: "a simple CRM built for small teams",
          after:
            " saves more time than any new hire. The trick is picking one your team will actually open every morning.",
        },
      },
      {
        id: "edit",
        name: "Niche edits",
        d: "Your link added to an existing article that Google already trusts. The page has years of history and is already indexed, so the link gets picked up faster.",
        best: "Quick wins for pages sitting in positions 8–20",
        dr: "DR 35–65",
        live: "1–2 weeks",
        article: {
          site: "marketing•••lab.com",
          tag: "Updated article · first published 2022",
          title: "The 12 best email outreach tools, tested",
          before:
            "We tested every tool on the same 500-contact campaign. Deliverability was the biggest difference between them. For teams that also need pipeline tracking, ",
          link: "this all-in-one sales platform",
          after:
            " keeps outreach and follow-ups in one place, which is why it made our shortlist.",
        },
      },
      {
        id: "authority",
        name: "Authority placements",
        d: "Features on DR 70+ publications with serious traffic. Fewer of them, harder to get, and saved for the pages that need the biggest push.",
        best: "Competitive keywords, homepage and category pages",
        dr: "DR 70+",
        live: "3–6 weeks",
        article: {
          site: "business•••review.com",
          tag: "Feature · Technology",
          title: "The quiet tools behind the fastest-growing support teams",
          before:
            "Ask the support leads at fast-growing companies what changed, and the answer is rarely headcount. More often it's ",
          link: "better customer support software",
          after:
            " that routes the easy questions away from people and leaves them the hard ones.",
        },
      },
    ],
    included: [
      "Content writing",
      "Anchor text planning",
      "Indexation tracking",
      "Free link replacement",
    ],
  },

  process: {
    eyebrow: "How our link building process works",
    h2: "From first call to first links in about three weeks.",
    steps: [
      {
        when: "Day 1–3",
        t: "Audit and plan",
        d: "We look at your site, your competitors' links and the pages closest to page one. You get a plan: which pages, which anchors, how many links a month.",
        you: "One 30-minute call",
      },
      {
        when: "Week 1–2",
        t: "Find and check sites",
        d: "We shortlist sites from our own network and fresh outreach, then run every one through the 7-Point Site Check.",
        you: "Nothing. Want the shortlist? Just ask",
      },
      {
        when: "Week 2–4",
        t: "Write and place",
        d: "Our writers create content that fits each site. Editors publish it. Your link sits inside the article, where readers actually see it.",
        you: "Nothing, unless you want to see drafts",
      },
      {
        when: "Every month",
        t: "Index, track, report",
        d: "We make sure every link gets indexed, track your target pages and send one clear report. If a link ever drops, we replace it free.",
        you: "Read the report. About 10 minutes",
      },
    ],
    total: "Your time, all in: about 30 minutes a month.",
  },


  report: {
    eyebrow: "Reporting",
    h2a: "One clear report.",
    h2b: "Nothing to log into.",
    lead: "Every link we build goes into one live sheet. Clean enough to forward to your boss or your client exactly as it is.",
    points: [
      "Every link with its DR, anchor and target page",
      "Indexation status, checked every week",
      "Ranking movement on the pages we're pushing",
      "A white-label version for agencies",
    ],
    month: "October",
    rows: [
      {
        site: "saas•••insider.com",
        dr: 62,
        anchor: "crm for startups",
        to: "/features/crm",
        done: true,
      },
      {
        site: "growth•••weekly.com",
        dr: 57,
        anchor: "YourBrand",
        to: "/",
        done: true,
      },
      {
        site: "marketing•••lab.com",
        dr: 54,
        anchor: "sales pipeline tool",
        to: "/pipeline",
        done: true,
      },
      {
        site: "b2b•••review.io",
        dr: 66,
        anchor: "this guide",
        to: "/blog/pipeline-guide",
        done: false,
      },
      {
        site: "startup•••wire.com",
        dr: 49,
        anchor: "yourbrand.com",
        to: "/",
        done: false,
      },
      {
        site: "tech•••digest.com",
        dr: 71,
        anchor: "customer support software",
        to: "/support",
        done: false,
      },
    ],
  },

  fit: {
    eyebrow: "Is this for you?",
    h2: "Who this is for, and who it isn't.",
    good: [
      "Your important pages sit on page two and need authority to move up.",
      "Your site is in decent technical shape and has real content.",
      "You can give it at least three months. Links don't show results in four weeks.",
      "You'd rather someone handled site selection properly, so you don't have to.",
    ],
    bad: [
      "You need results this month.",
      "Your pages are thin. Links to a weak page are wasted links.",
      "You want the cheapest links you can find. We're not that.",
      "You're in gambling, adult or similar niches.",
    ],
    agency: {
      t: "Running an agency?",
      d: "We work with agencies as well as brands. Same site check, your logo on the reports, and we stay invisible on client calls.",
    },
  },

  pricing: {
    eyebrow: "Link building pricing",
    h2: "Start with one trial link. Then $150 a placement.",
    d: "Every placement is DR 40+ on a relevant, hand-checked site, with content written for you, a white-label report, free link replacement and a 100% money-back guarantee.",
    plans: [
      { name: "Trial placement", price: "$170", note: "One link, once per company" },
      { name: "Standard placement", price: "$150", note: "Per link, from 3 links an order" },
      { name: "Larger campaigns", price: "Quote", note: "20+ links a month, or DR 70+ sites" },
    ],
  },

  faqHead: {
    eyebrow: "Link building FAQ",
    h2: "What clients ask before they start.",
    side: "Your question isn't here? Ask it on a 15-minute call and we'll look at your site while we're at it.",
  },

  faqs: [
    {
      q: "Are these PBNs or paid links?",
      a: "No, and we never will be. Private blog networks are sites built only to sell links, and catching them is exactly what our site check is for. Every placement is on a real publication with its own readers. Some publishers charge an editorial fee, which is normal across the industry, but we skip any site that openly sells links on a price list. That footprint is what Google looks for.",
    },
    {
      q: "Do you pick the sites, or do I?",
      a: "We do. That's a big part of what you're paying for. Every site goes through the 7-Point Site Check before it gets near your link. If you'd like to see the shortlist before anything goes live, tell us at kickoff and we'll send it. Most clients don't bother.",
    },
    {
      q: "How long until I see results?",
      a: "Links usually get indexed within two to six weeks. Pages already sitting in positions 5–20 tend to move between months two and four. Pages further back usually need content work as well as links. We track the keywords we agreed on in the audit, so you can see the trend instead of guessing.",
    },
    {
      q: "Can these links get my site penalised?",
      a: "Penalties come from obvious paid-link patterns, irrelevant links at scale and over-optimised anchor text. The site check deals with the first two and the anchor plan deals with the third. Nobody can promise you what Google will do, and anyone who does is selling something. What we can promise is that we don't build the kind of links that cause problems.",
    },
    {
      q: "Who writes the content?",
      a: "We do. Our writers create each article to the publisher's standard and in a way that fits your brand. You can review drafts if you want to. Most clients skip it.",
    },
    {
      q: "What happens if a link gets removed?",
      a: "Every link is covered by our replacement guarantee. If a publisher ever removes it or turns it nofollow, tell us and we replace it on a site of the same or higher DR, free. The full terms are on the pricing page.",
    },
    {
      q: "Do I get to choose the anchor text?",
      a: "Yes, if you have a preference. We propose an anchor mix in the audit: mostly branded, partial-match and natural phrases. If you want a specific anchor on a specific page, we'll do it, unless it pushes your profile into over-optimisation. Then we'll show you the numbers and explain why.",
    },
    {
      q: "How much does link building cost?",
      a: "A standard placement is $150, on orders of three or more. If you'd like to test us first, a single trial placement is $170, once per company. Larger monthly campaigns and DR 70+ placements are quoted. Every order is covered by our money-back guarantee.",
    },
    {
      q: "Do you work white label for agencies?",
      a: "Yes. We work with agencies as well as brands. Same site check, same quality, reports with your branding, and we stay invisible on client calls.",
    },
  ],

  related: {
    h2: "Keep reading",
    links: [
      {
        to: "/case-studies/smiletutor",
        k: "Case study",
        t: "SmileTutor: number one for “tuition” in Singapore",
      },
      {
        to: "/blog/site-vetting-checklist",
        k: "Article",
        t: "The site-vetting checklist we use on every domain",
      },
      { to: "/services/digital-pr", k: "Service", t: "Digital PR" },
      {
        to: "/services/brand-mentions",
        k: "Service",
        t: "Brand mentions for AI search",
      },
      { to: "/services/haro-links", k: "Service", t: "HARO & expert quotes" },
    ],
  },

  final: {
    eyebrow: "Free link audit",
    h2a: "Send us your URL.",
    h2b: "We'll tell you what it'll take.",
    d: "On a 15-minute call we look at your site, your competitors' backlinks and the pages closest to page one, then tell you what it would take to move them.",
    primary: "Book a strategy call",
    secondary: "Email us instead",
    email: "contact@editorialhq.com",
  },
};
