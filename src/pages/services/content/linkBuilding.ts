/** Content for /services/link-building.
 *  Structure follows SERVICE-PAGES-PLAN.md §4.1. */

export const linkBuilding = {
  eyebrow: "Link Building",
  h1: {
    pre: "Link building that",
    em: "survives an audit",
    post: ".",
  },
  sub: "Editorial backlinks from DR 40+ publications with real organic traffic. We find the sites, check every one by hand, write the content and get it placed. You get the links and a report you can actually read.",

  proof: [
    { v: 800, suffix: "+", label: "Vetted publications in our own network" },
    { custom: "DR 40–75", label: "Working authority range" },
    { v: 96, suffix: "%", label: "Indexation rate over the last 12 months" },
  ],

  problem: {
    heading: {
      pre: "Most link building is built to",
      em: "invoice you, not rank you",
    },
    paras: [
      "The industry runs on volume. Marketplace inventory gets resold at markup, placements land on content farms Google stopped crawling years ago, and the monthly report counts links instead of outcomes. Almost nobody checks what sits behind the DR number.",
      "That model survives because the buyer has no way to check the work. A link exists, a number goes up, and nobody asks whether the page was ever indexed or whether the site had a single real visitor.",
      "We built the opposite. A publisher network we maintain ourselves, every site checked by hand before we use it, and a definition of done that includes Google indexing the link and the target page responding.",
    ],
  },

  deliverables: [
    {
      t: "Guest posts",
      d: "Original articles on niche-relevant publications, written to the editor's standard, with your link placed inside the body of the story rather than an author bio.",
    },
    {
      t: "Niche edits",
      d: "Contextual links added to aged, already-indexed articles Google has trusted for years. Faster to index because the page already has history.",
    },
    {
      t: "Authority placements",
      d: "DR 60+ editorial features reserved for the money pages that need the strongest push — typically two to four per quarter.",
    },
    {
      t: "Anchor & target mapping",
      d: "A written plan for which page receives which anchor, with ratios that stay inside natural ranges. No exact-match stacking, no footprints.",
    },
    {
      t: "Indexation follow-through",
      d: "We track every placement until Google indexes it. If it does not index within 60 days we chase the publisher or replace it at no cost.",
    },
    {
      t: "Monthly reporting",
      d: "Live sheet with every domain, its metrics, the anchor used, the target URL, indexation status, and the sites we rejected on your behalf.",
    },
  ],

  ledger: {
    standards: [
      {
        label: "Real organic traffic, verified in Ahrefs",
        detail:
          "Minimum 1,000 monthly organic visits from a market that matters to you. Traffic that is bought, bot-driven or concentrated on one fluke keyword does not count.",
      },
      {
        label: "Clean outbound profile",
        detail:
          "We read the last 30 outbound links. If the site links to casinos, loans or CBD alongside your industry, it is out regardless of DR.",
      },
      {
        label: "Editorial standards that exist",
        detail:
          "A named editor, a real publishing cadence, and articles that were written for readers rather than for a link marketplace.",
      },
      {
        label: "Topical relevance to your pages",
        detail:
          "The publication has to plausibly cover your subject. A general news site with a thin 'business' category is not relevance.",
      },
      {
        label: "No paid-link footprints",
        detail:
          "Sites with a visible 'write for us' pricing page, sponsored-post sprawl or sudden outbound spikes get dropped.",
      },
    ],
    rejections: [
      {
        site: "Tech & business news site",
        metric: "High traffic",
        reason:
          "Big traffic numbers in every SEO tool. Then we opened the keywords: mostly irrelevant or spammy terms, a lot of it from markets the client does not sell in. The graph kept jumping up and down. Big number, wrong visitors.",
      },
      {
        site: "UK news site",
        metric: "DR 70",
        reason:
          "DR around 70, but only 1–2K organic visits a month. Weak keywords and an unstable traffic graph. A high DR on its own does not make a site worth a link.",
      },
      {
        site: "Business & finance blog",
        metric: "Good traffic",
        reason:
          "Traffic and graph looked healthy at first. The keywords told a different story: a finance site ranking for adult and spammy terms. It also openly sells guest posts and links. Easy no.",
      },
    ],
  },

  process: [
    {
      n: "01",
      t: "Audit and target mapping",
      d: "We pull your current link profile, find which pages are closest to moving, and agree the target URLs and anchor ratios before any outreach starts.",
      you: "30 minutes on a call, plus access to Search Console.",
    },
    {
      n: "02",
      t: "Sourcing from the network",
      d: "We shortlist publications from our own network and fresh prospecting, then run each one through the vetting standard above.",
      you: "Nothing.",
    },
    {
      n: "03",
      t: "Every site checked by hand",
      d: "Each candidate gets the full check: real organic traffic, the keywords behind it, the traffic trend, outbound links and editorial quality. Roughly one in five fails and gets dropped.",
      you: "Nothing. If you want to see the shortlist first, just ask.",
    },
    {
      n: "04",
      t: "Placement and publication",
      d: "Our editorial team writes to the publication's standard and works the piece through their process. You see drafts for anything carrying your name.",
      you: "Approve the draft if you want to; many clients skip this.",
    },
    {
      n: "05",
      t: "Indexation and reporting",
      d: "We confirm Google has indexed each link, record it against the target page, and report movement on the keywords we agreed in step one.",
      you: "Read the monthly sheet.",
    },
  ],

  example: {
    label: "B2B SaaS · customer support software · 7 months",
    headline: "DR 35 to 65, and the category pages finally moved",
    facts: [
      { k: "Placements", v: "14" },
      { k: "Average DR", v: "61" },
      { k: "Domain Rating", v: "35 → 65" },
      { k: "Organic clicks", v: "+212%" },
      { k: "Indexation", v: "14 / 14" },
    ],
    series: [1200, 1380, 1610, 2050, 2400, 2980, 3450, 3744],
    seriesLabel: "Monthly organic clicks, months 0–7",
    takeaway:
      "Twelve of the fourteen placements pointed at two category pages rather than the homepage. Concentrating authority on the pages that were already ranking 8–15 is what moved them onto page one.",
    caseHref: "/case-studies/b2b-saas-ai-visibility",
  },

  fit: {
    good: [
      "You have pages that already rank between positions 5 and 20 and need authority to push them up.",
      "Your site is technically sound — crawlable, indexed, reasonable Core Web Vitals.",
      "You can commit to at least three months. Link building does not show its hand in four weeks.",
      "You want someone to handle site selection properly, so you are not checking metrics yourself.",
    ],
    bad: [
      "You need results this month. Indexation alone takes two to six weeks.",
      "Your pages have no content depth yet — links to a thin page waste the link.",
      "You want the cheapest possible cost per link. We are not the cheapest and do not try to be.",
      "You are in a sector our publishers will not touch, such as gambling or adult.",
    ],
  },

  pricing: {
    from: "$997",
    unit: "/ month, starting price",
    note: "We scope on delivered placements, not attempts or hours. Plans start at $997 a month; where you land depends on the authority range they need and how fast they want to move. There is no setup fee and no lock-in beyond the agreed term.",
    drivers: [
      {
        k: "Authority range",
        v: "A DR 70+ placement costs several times a DR 45 one, because the editorial bar is higher.",
      },
      {
        k: "Volume per month",
        v: "Four placements a month is a different pipeline to twelve. Rate per placement improves with volume.",
      },
      {
        k: "Market and language",
        v: "Gulf and non-English placements need different relationships and carry different costs.",
      },
      {
        k: "Content ownership",
        v: "We write by default. If your team supplies drafts to our spec, the rate drops.",
      },
    ],
  },

  quote: {
    text: "They handled everything — finding sites, writing, placing. The monthly report was clean enough to forward to our CEO without editing.",
    who: "Daniel Reyes · Head of Growth, CapCut",
  },

  faqs: [
    {
      q: "Are these PBNs or paid links?",
      a: "No. Private blog networks are sites built to sell links, and they are the thing our vetting is designed to catch. Every placement is on an independent publication with its own audience and editorial process. We do pay for editorial time on some publications, which is standard across the industry, but we will not work with a site that advertises a public price list for links because that footprint is exactly what Google looks for.",
    },
    {
      q: "Will this get my site penalised?",
      a: "Manual actions come from obvious paid-link footprints, irrelevant placements at scale, and over-optimised anchors. Our vetting rejects the first two and the anchor mapping in step one handles the third. We have not had a client receive a manual action. That said, nobody can give you an absolute guarantee about Google's behaviour, and anyone who does is selling you something.",
    },
    {
      q: "How long until I see movement?",
      a: "Indexation takes two to six weeks per placement. Ranking movement on pages already sitting in positions 5–20 typically shows between months two and four. Pages starting beyond position 30 usually need content work alongside links and take longer. We report on the keywords agreed in the audit so you can see the trend rather than guess at it.",
    },
    {
      q: "What happens if a link gets removed?",
      a: "We monitor every placement for 12 months. If a publisher removes or nofollows a link inside that window we replace it on an equivalent domain at no charge. If a site's quality degrades badly after placement we will flag it to you proactively rather than wait for you to notice.",
    },
    {
      q: "Can I see the sites before you place anything?",
      a: "If you want to, yes. Most clients leave site selection to us, which is a big part of why they hire us. If you prefer to review the shortlist first, tell us at kickoff and you get every site with its metrics before anything goes live. Either way, every placed domain is in your report.",
    },
    {
      q: "Do I get to choose the anchor text?",
      a: "Yes, if you have a preference. We propose an anchor mix in the audit — typically branded, partial-match and natural-phrase anchors in ratios that stay inside normal ranges for your niche. If you want a specific anchor on a specific page we will accommodate it unless it pushes the profile into over-optimisation, in which case we will show you the numbers and say so.",
    },
    {
      q: "How does pricing work, and is there a contract?",
      a: "Monthly retainer scoped on delivered placements. Plans start at $997 a month and scale with authority tier and volume — see the pricing page. No setup fee. We ask for a three-month minimum because anything shorter cannot show a result, after which it runs month to month.",
    },
    {
      q: "Do you offer white label for agencies?",
      a: "Yes. Roughly a third of our work is fulfilment for other agencies. You get the same reporting under your own branding, reports you can forward to your client without editing, and we stay invisible on calls. Pricing is structured so you have margin to resell.",
    },
  ],
};
