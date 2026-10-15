/** Copy for /services/link-building.
 *  Story and section purposes are in LINK-BUILDING-PAGE-PLAN.md.
 *
 *  STATUS: client names, figures, quotes and the case study are realistic
 *  samples for design review. The three rejected sites are real (anonymised). */

export const linkBuilding = {
  seo: {
    title: "Link Building Services That Move Rankings",
    description:
      "Done-for-you link building services: guest posts, niche edits and authority placements on hand-vetted sites with real organic traffic. Plans from $997/month.",
  },

  hero: {
    eyebrow: "Link building services",
    h1a: "Links that move rankings.",
    h1b: "From sites that still have readers.",
    lead: "We find the sites, check what's really behind their traffic, write the content and get your link placed. Then we track it until Google counts it. You get rankings, not a spreadsheet full of DR.",
    primary: "Book a strategy call",
    secondary: "See starting prices",
    rating: "1,400+ placements live for 40+ brands",
  },

  /** The hero card cycles through these. Domains are masked on purpose. */
  heroChecks: [
    {
      domain: "saas•••insider.com",
      dr: 62,
      traffic: "41.3K",
      trend: [22, 24, 23, 27, 29, 31, 34, 36, 39, 41],
      keywords: [
        { k: "best crm for startups", geo: "US", ok: true },
        { k: "sales pipeline template", geo: "US", ok: true },
        { k: "cold email software", geo: "UK", ok: true },
      ],
      pass: true,
      verdict: "Passed all five checks",
    },
    {
      domain: "uk•••news.co.uk",
      dr: 70,
      traffic: "1.4K",
      trend: [9, 4, 11, 3, 8, 2, 7, 3, 6, 2],
      keywords: [
        { k: "free movie download hd", geo: "IN", ok: false },
        { k: "weather tomorrow", geo: "UK", ok: false },
        { k: "instant loan apply", geo: "IN", ok: false },
      ],
      pass: false,
      verdict: "Rejected · DR 70, almost no real readers",
    },
    {
      domain: "growth•••weekly.com",
      dr: 57,
      traffic: "18.6K",
      trend: [12, 13, 13, 14, 15, 15, 16, 17, 18, 19],
      keywords: [
        { k: "b2b lead scoring", geo: "US", ok: true },
        { k: "saas pricing pages", geo: "US", ok: true },
        { k: "churn rate formula", geo: "CA", ok: true },
      ],
      pass: true,
      verdict: "Passed all five checks",
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
        real: "312 visits",
        note: "Traffic from one viral post",
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
        real: "9.1K visits",
        note: "Real readers, right topic",
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
        real: "11.8K visits",
        note: "Page one for 40 keywords",
        ok: true,
      },
    ],
    reportSummary: "6 links delivered · Avg DR 56 · 100% live",
    realitySummary: "2 of 6 links doing any real work",
  },

  gap: {
    eyebrow: "What we check that others skip",
    h2: "DR is the easiest number in SEO to fake.",
    lead: "Most sellers stop at DR and a traffic number. We open the keywords, the traffic graph and the outbound links. These three sites came from our own checks. Each one looked like a good buy. Tap a card to see what we found.",
    footer:
      "Roughly one in five sites we find fails at this stage. They never get near your link.",
    cards: [
      {
        site: "Tech & business news site",
        looks: ["Big traffic in every SEO tool", "Thousands of ranking pages"],
        found: [
          "Most of its keywords were irrelevant or spammy",
          "A big share of traffic came from markets the client doesn't sell in",
          "The traffic graph jumped up and down every month",
        ],
        verdict: "Big number. Wrong visitors.",
      },
      {
        site: "UK news site",
        looks: ["DR 70", "Established, older domain"],
        found: [
          "Only 1–2K organic visits a month",
          "Weak keywords, nothing a buyer would search",
          "An unstable traffic graph",
        ],
        verdict: "High DR. Almost no readers.",
      },
      {
        site: "Business & finance blog",
        looks: ["Healthy traffic", "A graph that looked steady"],
        found: [
          "A finance site ranking for adult and spam terms",
          "Openly sells guest posts and links",
          "Outbound links to anything that pays",
        ],
        verdict: "Looks like a blog. Works like a link shop.",
      },
    ],
  },

  method: {
    eyebrow: "How we vet every site",
    badge: "The 5-Point Site Check",
    h2: "Every site passes five checks. By hand. Every time.",
    lead: "Before any site gets your link, a person on our team opens the data and looks. No tool makes this call for us.",
    steps: [
      {
        n: "01",
        t: "Is the traffic real?",
        d: "We pull organic traffic from Ahrefs and Semrush ourselves, not the number on a seller's sheet. We want at least 1,000 real search visits a month, and the two tools need to roughly agree.",
        flag: "Traffic that only exists on the seller's price list.",
      },
      {
        n: "02",
        t: "What does it rank for?",
        d: "Traffic means nothing until you see what it ranks for. We read the top keywords one by one. A finance blog ranking for adult terms, or a tech site full of random spam keywords, is out.",
        flag: "Top keywords have nothing to do with the site's topic.",
      },
      {
        n: "03",
        t: "Is the graph stable?",
        d: "We want a line that's steady or slowly climbing. Sharp spikes, a cliff after a Google update, or a graph that jumps around every month tell you the traffic won't last.",
        flag: "Lost 60% of its traffic in the last core update.",
      },
      {
        n: "04",
        t: "Are the readers in your market?",
        d: "A US software brand needs US readers. If most of a site's traffic comes from countries you don't sell in, the link brings authority on paper and very little else.",
        flag: "80% of traffic from markets the client doesn't sell in.",
      },
      {
        n: "05",
        t: "Is it a link farm?",
        d: "We look at who else the site links to and how it makes money. A public guest post price list, casino and CBD links next to every topic, sponsored posts on every page: that site is out, whatever the DR.",
        flag: "“Write for us — $80 per post” on the homepage.",
      },
    ],
    pass: "Passes all five. Now it's allowed near your link.",
    cta: {
      t: "Curious how your current backlinks would do?",
      d: "Send us your site. We'll run your existing links through the same five checks and show you which ones are pulling their weight. Free.",
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
      "12-month link monitoring",
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
        d: "We shortlist sites from our own network and fresh outreach, then run every one through the 5-Point Site Check.",
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
        d: "We make sure every link gets indexed, track your target pages and send one clear report. If a link drops in the first 12 months, we replace it.",
        you: "Read the report. About 10 minutes",
      },
    ],
    total: "Your time, all in: about 30 minutes a month.",
  },

  proof: {
    eyebrow: "Link building results",
    h2: "Seven months. Fourteen links. Two category pages on page one.",
    label: "B2B SaaS · customer support software",
    stats: [
      {
        v: "+212%",
        k: "Organic clicks",
        sub: "1,200 → 3,744 a month",
        dot: "bg-butter",
      },
      {
        v: "35 → 65",
        k: "Domain Rating",
        sub: "In seven months",
        dot: "bg-mint",
      },
      {
        v: "14 / 14",
        k: "Links indexed",
        sub: "Median: 19 days",
        dot: "bg-lilac",
      },
      {
        v: "#4",
        k: "Main category keyword",
        sub: "Up from #31",
        dot: "bg-sky",
      },
    ],
    milestones: [
      { at: 1, t: "First links indexed" },
      { at: 4, t: "Category page enters the top 10" },
      { at: 7, t: "Two category pages on page one" },
    ],
    series: [1200, 1380, 1610, 2050, 2400, 2980, 3450, 3744],
    seriesLabel: "Monthly organic clicks, months 0–7",
    takeaway:
      "Twelve of the fourteen links pointed at two category pages, not the homepage. Those pages were already sitting between positions 8 and 15. That's where links move the needle fastest.",
    caseHref: "/case-studies/b2b-saas-ai-visibility",
    quote: {
      text: "They handled everything: finding sites, writing, placing. The monthly report was clean enough to forward to our CEO without editing.",
      name: "Daniel Reyes",
      role: "Head of Growth, CapCut",
      avatar: "/images/avatar-1.jpg",
    },
    more: [
      {
        k: "Gulf e-commerce brand",
        v: "4× referring domains",
        to: "/case-studies/ecommerce-gulf-authority",
      },
      {
        k: "Home services company",
        v: "Top 3 in the local pack",
        to: "/case-studies/home-services-local-pack",
      },
    ],
  },

  report: {
    eyebrow: "Reporting",
    h2a: "One clear report.",
    h2b: "Nothing to log into.",
    lead: "Every link we build goes into one live sheet. Clean enough to forward to your boss or your client exactly as it is.",
    points: [
      "Every link with its DR, traffic, anchor and target page",
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
      d: "About a third of our work is white label. Same site check, your logo on the reports, and we stay invisible on client calls.",
    },
  },

  pricing: {
    eyebrow: "Link building pricing",
    h2: "Plans start at $997 a month.",
    d: "Every plan includes content, the 5-Point Site Check, indexation tracking and a monthly report. The final number depends on the sites, the volume and your niche.",
    plans: [
      { name: "Starter", price: "$997", note: "4–6 links a month" },
      { name: "Growth", price: "$2,497", note: "10–14 links a month" },
      { name: "Authority", price: "$4,997", note: "20+ links a month" },
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
      a: "No. Private blog networks are sites built only to sell links, and catching them is exactly what our site check is for. Every placement is on a real publication with its own readers. Some publishers charge an editorial fee, which is normal across the industry, but we skip any site that openly sells links on a price list. That footprint is what Google looks for.",
    },
    {
      q: "Do you pick the sites, or do I?",
      a: "We do. That's a big part of what you're paying for. Every site goes through the 5-Point Site Check before it gets near your link. If you'd like to see the shortlist before anything goes live, tell us at kickoff and we'll send it. Most clients don't bother.",
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
      a: "We monitor every link for 12 months. If a publisher removes it or turns it nofollow in that time, we replace it on a similar site for free.",
    },
    {
      q: "Do I get to choose the anchor text?",
      a: "Yes, if you have a preference. We propose an anchor mix in the audit: mostly branded, partial-match and natural phrases. If you want a specific anchor on a specific page, we'll do it, unless it pushes your profile into over-optimisation. Then we'll show you the numbers and explain why.",
    },
    {
      q: "How much does link building cost?",
      a: "Plans start at $997 a month. The price depends on the authority of the sites, how many links you need and your niche. We recommend at least three months, because links take time to show results. Full plans are on the pricing page.",
    },
    {
      q: "Do you work white label for agencies?",
      a: "Yes. About a third of our work is for agencies. Same site check, same quality, reports with your branding, and we stay invisible on client calls.",
    },
  ],

  related: {
    h2: "Keep reading",
    links: [
      {
        to: "/case-studies/b2b-saas-ai-visibility",
        k: "Case study",
        t: "DR 35 to 65 for a B2B SaaS brand",
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
    email: "contact@talhamahmood.com",
  },
};
