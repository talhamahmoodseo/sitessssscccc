/** Content for /services/digital-pr. Plan §4.2. */

export const digitalPr = {
  eyebrow: "Digital PR",
  h1: { pre: "Coverage that", em: "earns the link", post: "." },
  sub: "Story-led campaigns that put you in publications your buyers already read. Journalists link because the piece is worth linking to — not because we paid for a slot.",

  proof: [
    { custom: "DR 74", label: "Highest-authority placement secured to date" },
    { v: 21, suffix: "", label: "Placements in a single six-month campaign" },
    {
      v: 38,
      suffix: "%",
      label: "Pitch-to-placement rate on scoped campaigns",
    },
  ],

  problem: {
    heading: {
      pre: "Most agencies sell you",
      em: "press releases nobody reads",
    },
    paras: [
      "The default digital PR motion is to write a release, blast it to a purchased media list, and report the syndication count. Those pickups land on aggregator sites with no readership, pass no authority, and are gone from the index within weeks.",
      "Journalists do not ignore these because they are hostile. They ignore them because the pitch leads with your company instead of their readers. An editor opens forty pitches a morning and answers the two that hand them a story.",
      "We work the other way round. We find the angle a specific desk is already covering, build the data or expertise that makes it publishable, and pitch named journalists individually. Slower to start, and it is the only version that produces links worth having.",
    ],
  },

  deliverables: [
    {
      t: "Angle development",
      d: "We find the story inside your business — proprietary data, a contrarian position, a trend you can evidence — and shape it into something a desk wants.",
    },
    {
      t: "Named-journalist outreach",
      d: "Individual pitches to writers who cover your subject, not a blast to a bought list. We show you the list before we send.",
    },
    {
      t: "Asset production",
      d: "Surveys, data studies, commentary and expert quotes, written to publication standard so the editor has nothing left to fix.",
    },
    {
      t: "Reactive newsjacking",
      d: "When a story breaks in your sector we move the same day with a quotable position while the window is open.",
    },
    {
      t: "Relationship building",
      d: "The second placement at a publication is far easier than the first. We invest in the relationship rather than burning it on one send.",
    },
    {
      t: "Coverage reporting",
      d: "Every placement with its DR, estimated reach, link type and the pitch that earned it — so you can see what angle worked.",
    },
  ],

  ledger: {
    standards: [
      {
        label: "A real newsroom",
        detail:
          "A masthead with named editors and working journalists, not a syndication endpoint that republishes wire copy automatically.",
      },
      {
        label: "Readers, verified",
        detail:
          "Organic traffic and genuine social engagement. A DR 70 title that nobody reads is a vanity placement.",
      },
      {
        label: "Editorial independence",
        detail:
          "If the outlet will publish anything for a fee, the link carries a paid footprint no matter how the piece reads.",
      },
      {
        label: "Relevance to your buyer",
        detail:
          "Coverage in a title your customers actually read beats a bigger title they have never opened.",
      },
      {
        label: "Links that stay",
        detail:
          "We track placements for twelve months. Outlets that strip links post-publication come off the list.",
      },
    ],
    rejections: [
      {
        site: "National news aggregator",
        metric: "DR 82",
        reason:
          "Enormous authority, but it republishes press releases automatically with no editorial pass. Every competitor is already there, which is precisely why it is worthless.",
      },
      {
        site: "Industry newsletter site",
        metric: "DR 59",
        reason:
          "Genuine readership, but the editor confirmed all outbound links are nofollowed site-wide and could not be changed. We placed the story elsewhere.",
      },
      {
        site: "Regional business title",
        metric: "DR 66",
        reason:
          "Strong on paper. Their archive showed links stripped from articles after roughly ninety days — a pattern you only catch by checking old pieces.",
      },
    ],
  },

  process: [
    {
      n: "01",
      t: "Story audit",
      d: "We go through your data, customers and point of view to find what is genuinely newsworthy. Most businesses have two or three stories they have never recognised as stories.",
      you: "One 45-minute session with someone who knows the business.",
    },
    {
      n: "02",
      t: "Angle and asset build",
      d: "We develop the strongest angle into a publishable asset — a data study, a survey, a position piece — and agree it with you before anyone is pitched.",
      you: "Approve the angle. Supply data if it is yours.",
    },
    {
      n: "03",
      t: "Media list, shown to you",
      d: "We build the target list of named journalists and the outlets they write for. You see it, and you can strike anyone you do not want approached.",
      you: "One pass through the list.",
    },
    {
      n: "04",
      t: "Pitching and follow-through",
      d: "Individual pitches, tracked and followed up. We handle journalist questions, supply quotes and images, and keep the thread warm.",
      you: "Be reachable within a day if a journalist wants a quote.",
    },
    {
      n: "05",
      t: "Coverage and compounding",
      d: "We report each placement and keep the relationships open. Campaign two at the same outlets costs far less effort than campaign one.",
      you: "Read the coverage report.",
    },
  ],

  example: {
    label: "E-commerce · UK + GCC · 6 months",
    headline:
      "Gulf trade coverage rebuilt a thin profile into something Google trusts",
    facts: [
      { k: "Placements", v: "21" },
      { k: "Top outlet", v: "DR 74" },
      { k: "Referring domains", v: "4×" },
      { k: "Revenue", v: "+88%" },
      { k: "Campaign length", v: "6 months" },
    ],
    series: [40, 48, 61, 83, 104, 132, 158],
    seriesLabel: "Referring domains, months 0–6",
    takeaway:
      "One data study on regional delivery expectations produced eleven of the twenty-one placements. The remaining ten came from relationships that study opened — which is the compounding effect PR has and paid links do not.",
    caseHref: "/case-studies/ecommerce-gulf-authority",
  },

  fit: {
    good: [
      "You have data, a customer base or a point of view that is genuinely interesting to a journalist.",
      "You can commit to six months. PR compounds and the first two months are investment.",
      "Someone senior can be reached for a quote within a day when a journalist asks.",
      "You want authority that competitors cannot simply buy a copy of.",
    ],
    bad: [
      "You need a guaranteed number of links per month. PR does not work on fixed quotas and we will not pretend otherwise.",
      "There is nothing distinctive about the business yet and no appetite to create it.",
      "You need results inside eight weeks.",
      "Nobody internally can approve a public position quickly.",
    ],
  },

  faqs: [
    {
      q: "How is this different from link building?",
      a: "Link building goes to publications and arranges a placement. Digital PR creates a story and earns coverage, with the link as a consequence. PR reaches titles that will never sell a placement at any price, and it compounds through relationships. It is slower and less predictable per month. Most clients run both: links for steady authority on money pages, PR for the tier of outlet links cannot reach. If you only run one, start with links.",
    },
    {
      q: "Can you guarantee a number of placements?",
      a: "No, and treat any agency that does with suspicion — a guaranteed placement is a bought placement, which is what we are avoiding. What we do commit to is the work: an agreed number of developed angles, a named media list you approve, and individual pitches to every target with follow-up. Our scoped campaigns run around a 38% pitch-to-placement rate, but that is a track record, not a promise.",
    },
    {
      q: "What if we have no newsworthy story?",
      a: "Almost every business has one and has stopped noticing it. Your transaction data, your customer survey, the thing you believe that your competitors publicly disagree with — these are stories. The story audit in step one exists precisely to find them. If we genuinely cannot find an angle we will tell you on the call and recommend link building instead.",
    },
    {
      q: "Who writes the content and quotes?",
      a: "Our editorial team drafts everything, in your voice, from the expertise session. Nothing with your name on it is sent anywhere before you have approved the wording. If your team prefers to write and have us edit and place, that works too and reduces the cost.",
    },
    {
      q: "Do all placements include a link?",
      a: "No. Roughly a quarter of coverage is an unlinked brand mention. That is not a failure — unlinked mentions on credible publications are exactly the signal AI answer engines use when deciding who to cite, and Google uses them as corroboration. We report linked and unlinked separately so you can see both.",
    },
    {
      q: "What happens if a journalist asks for something we cannot share?",
      a: "We tell them so directly and offer an alternative. We never commit you to data or a position you have not agreed to. If a thread stops because of that, it stops — the relationship is worth more than one placement.",
    },
    {
      q: "How long before we see anything?",
      a: "First placements typically land in weeks four to eight. The compounding shows from month three onwards as relationships open and earlier coverage gets picked up elsewhere. Anyone promising coverage in week one is sending a press release to an aggregator.",
    },
    {
      q: "Do you work with agencies on a white-label basis?",
      a: "Yes. You get the angle documents, media lists and coverage reports under your branding, and we stay off client calls unless you want us on them.",
    },
  ],
};
