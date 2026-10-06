/**
 * Content for /services/link-building.
 *
 * Rewritten story-first, modelled on how dofollow.com/visibility-plus is
 * *built* rather than what it says:
 *
 *   - headlines are two short declarative sentences, the second one turning
 *     the first ("Google Changed. What Counts as a Vote Didn't.")
 *   - every prose block is paired with a data artefact, never left alone
 *   - the hero carries a single concrete artefact that embodies the whole
 *     pitch — theirs is a buyer prompt showing the brand missing, ours is the
 *     approval sheet, because that is the thing nobody else will show you
 *   - one section exists purely to say what we are not ("Most Vendors Stop at
 *     Placed.")
 *   - one section argues against our own product ("Not Every Ranking Problem
 *     Needs Another Link."), which is what makes the rest credible
 *   - proof is distributed — logos under the hero, a quote after the problem,
 *     numbers in the movement band, a quote after the comparison — rather
 *     than pooled in one testimonial wall
 *
 * Client names are real. Figures and quotes are indicative placeholders.
 */

export const linkBuilding = {
  eyebrow: "Link Building",

  h1: {
    pre: "Everyone sells you links.",
    em: "Almost nobody shows you the sites.",
  },
  sub: "We send you every publication before anything is placed — real organic traffic, the outbound profile, and the reason it passed. You strike whatever you do not want. We only count a placement once Google indexes it.",
  credit:
    "DR 40–75 editorial placements · 96% indexed over 12 months · run by the people who do the outreach",

  /** The hero artefact. Mirrors the role of dofollow's buyer-prompt card:
   *  one specific object that makes the whole proposition concrete. */
  approvalSheet: {
    label: "Approval sheet",
    period: "March",
    rows: [
      {
        domain: "thehvac•••journal.com",
        meta: "DR 61 · 18,400 organic / mo",
        status: "approved" as const,
      },
      {
        domain: "saas•••weekly.io",
        meta: "DR 58 · 9,400 organic / mo",
        status: "approved" as const,
      },
      {
        domain: "business•••mag.net",
        meta: "DR 71 · 240 organic / mo",
        status: "rejected" as const,
      },
    ],
    calloutLabel: "Approval-first",
    callout:
      "You approved 12 of 18 domains this month. The six you struck were never placed, and never invoiced.",
  },

  logosLabel: "Trusted by teams who had to defend the spend internally",

  /* ---------------------------------------------------------------- problem */

  problem: {
    eyebrow: "The DR trap",
    heading: { pre: "A DR 71 link can still be", em: "worth nothing." },
    paras: [
      "Domain Rating scores a site's own backlinks. It does not tell you whether anyone reads the site, whether Google still trusts it, or whether it has the faintest connection to what you sell.",
      "We get offered DR 70+ placements every week from domains whose organic traffic fell off a cliff two core updates ago. The score has not caught up yet. The link is worth nothing, and you would never learn that from the invoice.",
    ],
    bold: "The number on the invoice is not the number that moves you.",
    chart: {
      domain: "business•••mag.net",
      badge: "DR 71",
      series: [41000, 39500, 37000, 12000, 6400, 3100, 1400, 240],
      axis: "Monthly organic traffic, 8 months",
      verdict: "94% of its traffic gone after one core update — still sold at DR 71, still rejected by the gate.",
    },
  },

  /* ------------------------------------------------------------ distributed
     proof: one quote after the problem, one after the comparison, one at fit */

  quotes: {
    afterProblem: {
      text: "We had been buying DR 60+ for a year. When their team audited what we already had, a third of it sat on sites with no readers at all. That audit was worth the retainer on its own.",
      who: "Daniel Reyes · Head of Growth, CapCut",
    },
    afterComparison: {
      text: "First vendor that showed us every domain before placing anything. The approval sheet alone made internal sign-off trivial.",
      who: "Amira Khan · Marketing Director, Ocuco",
    },
    atFit: {
      text: "They told us in the audit that two of our target pages were too thin to rank, and to fix those before paying for links. Nobody selling links had ever talked us out of buying them.",
      who: "Hana Al-Mansouri · Content Lead, Khaleej Times",
    },
  },

  /* ----------------------------------------------------------------- process */

  steps: {
    eyebrow: "How it runs",
    heading: { pre: "See the site.", em: "Then decide." },
    lede: "Four steps. You hold the pen at step three, and nothing is placed until you do.",
    items: [
      {
        n: "01",
        label: "Audit",
        t: "Find what is closest to moving",
        d: "We pull your profile and your competitors', then agree the target pages and anchor ratios before a single email goes out.",
        chip: "Targets agreed before outreach",
      },
      {
        n: "02",
        label: "Source",
        t: "Shortlist, then run the gate",
        d: "Candidates come from our own publisher network and fresh prospecting. Every one is checked against the four standards before you see it.",
        chip: "~5 reviewed per 1 placed",
      },
      {
        n: "03",
        label: "Approve",
        t: "You strike anything you want",
        d: "Each candidate reaches you with its metrics, traffic chart and relevance note. No reason required to reject one.",
        chip: "You approve, or it does not happen",
      },
      {
        n: "04",
        label: "Prove",
        t: "Chase it until Google indexes it",
        d: "A placement is not done when it publishes. It is done when it is indexed and recorded against the target page.",
        chip: "96% indexed · replaced free if not",
      },
    ],
    emphasis:
      "You don't get a link report to decode. You get a list you signed off on.",
  },

  /* ---------------------------------------------------------------- movement */

  movement: {
    eyebrow: "Real movement",
    heading: { pre: "From page two to", em: "the money pages." },
    context: "B2B SaaS · customer support software · 7 months",
    tiles: [
      { label: "Domain Rating", value: "35 → 65" },
      { label: "Organic clicks", value: "+212%" },
    ],
    note: "Twelve of the fourteen placements pointed at two category pages rather than the homepage. Concentrating authority on pages already sitting in positions 8–15 is what moved them.",
    ctaLabel: "Open the case file",
    ctaHref: "/case-studies/b2b-saas-ai-visibility",
  },

  /* -------------------------------------------------------------- the gate */

  gate: {
    eyebrow: "The intelligence behind the work",
    heading: { pre: "Powered by", em: "the gate." },
    lede: "How do we know which sites are worth your money? The gate — the vetting standard every candidate clears before it ever reaches your approval sheet. Roughly one in five makes it.",
    columns: [
      {
        label: "Traffic",
        q: "Does anyone actually read it?",
        d: "Minimum 1,000 monthly organic visits from a market that matters to you, verified in Ahrefs. Bought spikes and single-keyword flukes do not count.",
      },
      {
        label: "Outbound",
        q: "Who else does it link to?",
        d: "We read the last 30 outbound links. Casinos, loans or CBD sitting alongside your industry and it is out, whatever the DR says.",
      },
      {
        label: "Editorial",
        q: "Is there a real publication here?",
        d: "A named editor, a genuine publishing cadence, and articles written for readers rather than for a link marketplace.",
      },
      {
        label: "Relevance",
        q: "Would your buyer believe it?",
        d: "The publication has to plausibly cover your subject. A general news site with a thin 'business' tag is not relevance.",
      },
    ],
    flowFrom: { t: "The gate", d: "Finds what is real" },
    flowTo: { t: "Your approval", d: "Decides what is yours" },
  },

  /* ------------------------------------------------------------- comparison */

  comparison: {
    eyebrow: "Placed vs indexed",
    heading: { pre: "Most vendors stop at placed.", em: "We start at indexed." },
    lede: "A link that exists is not the same as a link that counts. Only one of those is easy to invoice for.",
    them: {
      label: "Most link vendors",
      items: [
        "Send the list after placement",
        "Count links delivered",
        "Leave indexation to you",
        "Quietly resell marketplace inventory",
      ],
    },
    us: {
      label: "How we work",
      items: [
        "Show every domain before",
        "Count links Google indexed",
        "Replace what drops, free, for 12 months",
        "Place only on publishers we deal with directly",
      ],
    },
    line: "A link Google never indexed is an invoice, not an asset.",
  },

  /* -------------------------------------------------------------- diagnosis */

  diagnosis: {
    eyebrow: "The right move > more links",
    heading: { pre: "Not every ranking problem", em: "needs another link." },
    paras: [
      "Sometimes it does. Sometimes the page is too thin to hold any amount of authority. Sometimes you already have the links and the anchor profile is so over-optimised it is working against you.",
      "Roughly one enquiry in five gets an audit back saying the links are not the problem yet. We lose that sale and keep the reputation, which has turned out to be the better trade.",
    ],
    bold: "We start with the diagnosis, not the placement.",
    map: [
      { gap: "Authority gap", move: "Editorial placements" },
      { gap: "Relevance gap", move: "Niche edits on aged pages" },
      { gap: "Trust gap", move: "Digital PR and expert quotes" },
      { gap: "Thin target page", move: "Fix the page first" },
    ],
    defs: [
      {
        t: "Editorial placements",
        d: "Original articles on niche-relevant publications, written to the editor's standard, with your link inside the body of the story rather than an author bio.",
      },
      {
        t: "Niche edits",
        d: "Contextual links added to aged, already-indexed articles Google has trusted for years. Faster to index, because the page already has history.",
      },
      {
        t: "Authority placements",
        d: "DR 60+ editorial features, reserved for the money pages that need the strongest push — typically two to four a quarter.",
      },
      {
        t: "Anchor mapping",
        d: "Which page receives which anchor, in ratios that stay inside natural ranges. No exact-match stacking, no footprints.",
      },
    ],
  },

  /* ----------------------------------------------------------- fundamentals */

  fundamentals: {
    eyebrow: "Built on what does not change",
    heading: { pre: "Google changed.", em: "What counts as a vote didn't." },
    paras: [
      "Core updates, helpful content, AI Overviews. Each one changed how results get assembled, and each one sent the industry hunting for a new trick.",
      "None of them changed the underlying signal: a real publication, with real readers, choosing to point at you.",
    ],
    bold: "That has survived every update we have worked through, and it is the only thing we sell.",
    flow: {
      top: "Editorial links + mentions",
      mid: "Authority",
      out: ["Google rankings", "AI citations"],
    },
  },

  /* ------------------------------------------------------------------- fit */

  fit: {
    eyebrow: "Fit",
    heading: { pre: "Worth doing,", em: "and worth skipping." },
    good: [
      "You have pages already ranking between positions 5 and 20 that need authority to push them up.",
      "Your site is technically sound — crawlable, indexed, reasonable Core Web Vitals.",
      "You can commit to three months. Indexation alone takes two to six weeks per placement.",
      "You want to see and approve every domain rather than receive a list after the fact.",
    ],
    bad: [
      "You need movement this month. Nothing we do shows up that fast.",
      "Your target pages have no content depth yet — authority pointed at a thin page is wasted.",
      "You want the lowest possible cost per link. We are not the cheapest and do not try to be.",
      "You are in gambling, adult or payday. Our publishers will not touch them.",
    ],
  },

  /* ----------------------------------------------------------------- close */

  close: {
    heading: { pre: "Find out which sites", em: "would actually move you." },
    lede: "Send us your domain. You get back the pages closest to moving, the authority gap to your nearest competitor, and the five publications we would go after first. No call required to receive it.",
    ctaLabel: "Request pricing",
    snapshot: {
      label: "Illustrative profile snapshot",
      bars: [
        { k: "Your referring domains", v: 142, max: 318 },
        { k: "Top competitor", v: 318, max: 318 },
      ],
      facts: [
        { k: "Pages in positions 5–20", v: "11" },
        { k: "No-traffic links found", v: "23" },
      ],
    },
  },

  /* ------------------------------------------------------------------- faq */

  faqs: [
    {
      q: "Can I see the list of sites before you place anything?",
      a: "Yes, and it is the whole point of how we work. Every candidate domain reaches you with its Ahrefs metrics, organic traffic chart and a relevance note before outreach turns into a placement. You strike anything you do not want, without giving a reason. Most agencies answer this question defensively because they are reselling marketplace inventory they would rather you did not inspect.",
    },
    {
      q: "Are these PBNs or paid links?",
      a: "No. Private blog networks are sites built to sell links, and catching them is exactly what the gate is for. Every placement is on an independent publication with its own audience and editorial process. We do pay for editorial time on some publications, which is standard across the industry, but we will not work with a site that advertises a public price list, because that footprint is precisely what Google looks for.",
    },
    {
      q: "Will this get my site penalised?",
      a: "Manual actions come from obvious paid-link footprints, irrelevant placements at scale, and over-optimised anchors. The gate rejects the first two and the anchor mapping in step one handles the third. No client of ours has had a manual action. That said, nobody can give you an absolute guarantee about Google's behaviour, and anyone who does is selling you something.",
    },
    {
      q: "How long until I see movement?",
      a: "Indexation takes two to six weeks per placement. Ranking movement on pages already sitting in positions 5–20 typically shows between months two and four. Pages starting beyond position 30 usually need content work alongside links and take longer. We report against the keyword set agreed in the audit, so you can see the trend rather than guess at it.",
    },
    {
      q: "What happens if a link gets removed?",
      a: "We monitor every placement for 12 months. If a publisher removes or nofollows a link inside that window we replace it on an equivalent domain at no charge. If a site's quality degrades badly after placement we flag it to you rather than wait for you to notice.",
    },
    {
      q: "Do I get to choose the anchor text?",
      a: "You get to approve it. We propose a mix in the audit — branded, partial-match and natural-phrase anchors in ratios that stay inside normal ranges for your niche. If you want a specific anchor on a specific page we will accommodate it, unless it pushes the profile into over-optimisation, in which case we will show you the numbers and say so.",
    },
    {
      q: "What does it cost, and is there a contract?",
      a: "A monthly retainer scoped on delivered placements rather than attempts or hours. What moves the number is the authority range, the monthly volume, the market and who writes the content — the pricing page breaks all four down. No setup fee. Three-month minimum because anything shorter cannot show a result, then month to month.",
    },
    {
      q: "Do you offer white label for agencies?",
      a: "Yes. Roughly a third of our work is fulfilment for other agencies. You get the same approval sheet under your own branding, reports you can forward to your client without editing, and we stay invisible on calls. Pricing is structured so you have margin to resell.",
    },
  ],
};
