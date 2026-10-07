/**
 * Content for /services/digital-pr.
 *
 * Rewritten to the register established by content/linkBuilding.ts:
 *
 *   - lead with the client's situation and the outcome of the work, never with
 *     what anyone else does badly
 *   - credibility carried by the named methodology (AuthorityOS™), explained
 *     openly, and by concrete campaign numbers
 *   - exactly ONE comparison on the page, aimed at a category of approach
 *     ("most PR starts with what the brand wants to say"), framed as a
 *     capability difference, and it lives in `problem.compare`
 *   - honest about limits — nobody can promise a number of placements — without
 *     turning that into a remark about anyone who does
 *
 * Deliberately NOT a selling point any more: media-list approval. It is one
 * passing clause in process step 03 and one FAQ answer, because some clients
 * read every name and others leave the desks to us.
 *
 * The outlet-assessment section is framed as judgement, not virtue: an outlet
 * can clear every metric and still be the wrong home for a story, and knowing
 * that is the capability.
 */

export const digitalPr = {
  eyebrow: "Digital PR",

  h1: {
    pre: "Your Buyers Read the Trade Press.",
    em: "Right Now It Quotes Someone Else.",
  },
  sub: "Our digital PR programme finds the story inside your business, builds it into something a desk wants to run, and earns the coverage that puts your name in the publications your category already reads.",
  credit: "Powered by AuthorityOS™ research. Pitched by senior editors.",

  /** Hero artefact: three clippings, fanned. The page's signature object. */
  fan: [
    {
      outlet: "Khaleej Times",
      dr: "DR 74",
      head: "How response time became the new local moat",
      kind: "FEATURE",
      rot: -7,
      tint: "bg-mint",
    },
    {
      outlet: "The Industry Journal",
      dr: "DR 71",
      head: "Founders on the systems behind 24/7 service",
      kind: "EXPERT QUOTE",
      rot: 0,
      tint: "bg-white",
    },
    {
      outlet: "Home Services Digest",
      dr: "DR 64",
      head: "2026 buyer’s guide: who the pros recommend",
      kind: "ROUNDUP",
      rot: 7,
      tint: "bg-blush",
    },
  ],

  /* ------------------------------------------------------- coverage (dark) */

  coverage: {
    label: "Coverage earned for clients",
    rows: [
      {
        outlet: "Khaleej Times",
        kind: "Feature · business desk",
        dr: "DR 74",
        tint: "bg-mint",
      },
      {
        outlet: "Arabian Business",
        kind: "Expert quote",
        dr: "DR 72",
        tint: "bg-lilac",
      },
      {
        outlet: "The Industry Journal",
        kind: "Feature",
        dr: "DR 71",
        tint: "bg-butter",
      },
      {
        outlet: "Home Services Digest",
        kind: "Buyer’s guide roundup",
        dr: "DR 64",
        tint: "bg-blush",
      },
      {
        outlet: "Gulf Business Review",
        kind: "Feature",
        dr: "DR 61",
        tint: "bg-sky",
      },
    ],
    note: "A sample of the desks we work with. The full client list is shared on the call.",
    figures: [
      { v: "DR 74", k: "Highest-authority placement to date" },
      { v: "21", k: "Placements in a single six-month campaign" },
      { v: "38%", k: "Pitch-to-placement rate on scoped campaigns" },
    ],
  },

  /* ---------------------------------------------------------------- problem */

  problem: {
    eyebrow: "How coverage is decided",
    heading: {
      pre: "Editors Don’t Publish Companies.",
      em: "They Publish Stories.",
    },
    paras: [
      "An editor on a business desk opens around forty pitches before lunch and replies to the two that hand them a story their readers will finish. The size of the company is rarely what decides it.",
      "So the work starts at the desk. We read what a publication has actually covered over the last six months, find the question it keeps returning to, and build the data or the expertise that answers it.",
      "Coverage earned that way holds its place. It stays in the archive, it keeps being cited by other writers, and it gives your sales team something worth forwarding.",
    ],
    /** The page's ONE comparison. Category of approach, capability framing. */
    compare:
      "Most PR starts with what the brand wants to say. Ours starts with what the desk is already covering.",
    desk: {
      label: "One morning on a national business desk",
      rows: [
        { k: "Pitches opened", v: "≈40" },
        { k: "Replies sent", v: "2" },
        { k: "What earned the reply", v: "A story" },
      ],
      foot: "Which is why the angle is the whole job, and why we spend the first fortnight on it.",
    },
  },

  /* ------------------------------------------------------------------ pitch */

  pitch: {
    eyebrow: "The craft",
    heading: {
      pre: "An Editor Decides in Seconds.",
      em: "Three Lines Have to Earn It.",
    },
    mailTo: "To: features desk",
    mailStatus: "OPENED · REPLIED 31H",
    subject: "Response time is the new local moat",
    evidence:
      "Dispatch data from 40 service firms shows 71% of callers book whoever answers first",
    evidenceTail: " — happy to share the full set.",
    offer: "Draft ready if useful, or a 200-word quote by Thursday",
    steps: [
      {
        n: "1",
        label: "A subject line about their readers",
        d: "Not your brand. The idea an editor could run as a headline tomorrow.",
      },
      {
        n: "2",
        label: "Evidence in the first line",
        d: "A number or a field observation that makes the story printable.",
      },
      {
        n: "3",
        label: "An easy yes",
        d: "Draft offered, quote ready, deadline respected. Nothing left for the desk to chase.",
      },
    ],
  },

  /* ----------------------------------------------------------------- angles */

  angles: {
    eyebrow: "Where the story comes from",
    heading: {
      pre: "Every Business Has a Story.",
      em: "Most Have Stopped Noticing It.",
    },
    lede: "The story audit is the first thing we run, because the angle decides everything downstream. Three places it usually comes from.",
    items: [
      {
        t: "Data you already have",
        d: "Dispatch times, order values, seasonal patterns, support volumes. Internal numbers nobody has looked at sideways become a story no competitor can reproduce.",
        example:
          "“71% of callers book whoever answers first” — eighteen months of dispatch logs, read once properly.",
        chip: "40 firms · 18 months of logs",
      },
      {
        t: "A defensible disagreement",
        d: "The thing your market repeats that your own experience says is wrong. Editors will run a clear position when the person holding it can evidence it.",
        example:
          "“Same-day is not the premium tier any more. It is the floor.” — argued from your own delivery data.",
        chip: "1 position · 3 proof points",
      },
      {
        t: "A moment worth covering",
        d: "An expansion, a senior hire, a regional first. Small news, framed for the reader rather than written as an announcement.",
        example:
          "“A Gulf operator is staffing overnight dispatch. Here is the maths behind it.”",
        chip: "Window: 5 working days",
      },
    ],
  },

  /* ------------------------------------------------------------------ tiers */

  tiers: {
    eyebrow: "Where you can land",
    heading: { pre: "Coverage Has Tiers.", em: "A Campaign Needs All Three." },
    rows: [
      {
        tier: "Tier 1",
        name: "National and regional business press",
        detail: "Khaleej Times, Arabian Business, the “as seen in” bar",
        dr: "DR 70–80",
        tint: "bg-mint",
      },
      {
        tier: "Tier 2",
        name: "Trade and industry publications",
        detail: "The sector journals your buyers open weekly",
        dr: "DR 55–70",
        tint: "bg-blush",
      },
      {
        tier: "Tier 3",
        name: "Niche blogs and roundups",
        detail: "Where comparison and “best of” searches land",
        dr: "DR 40–55",
        tint: "bg-sky",
      },
    ],
    note: "Most campaigns mix all three. Tier 1 earns the credibility a sales deck borrows; tier 3 wins the comparison searches and feeds the AI answers.",
  },

  /* ------------------------------------------------------------- methodology */

  methodology: {
    eyebrow: "The intelligence behind the work",
    heading: { pre: "Powered by", em: "AuthorityOS™" },
    lede: "How do we know which desk to approach, and what it will run? AuthorityOS™. It is our research methodology for reading a category: what it is arguing about, which publications Google and the AI answer engines already trust inside it, and where your name is missing from the conversation.",
    columns: [
      {
        label: "Listen",
        q: "What is your category arguing about?",
        d: "We read six months of output across the publications that cover your market and find the questions editors keep returning to.",
      },
      {
        label: "Map",
        q: "Which mastheads carry weight here?",
        d: "We identify the outlets already cited on your subject by Google and the answer engines, and the journalists who own the beat.",
      },
      {
        label: "Match",
        q: "What do you have that answers one?",
        d: "Your data, your field experience, your position. We match what you hold to what a named desk is short of.",
      },
      {
        label: "Time",
        q: "When does the window open?",
        d: "Some angles are evergreen and some have a two-day life. The plan says which is which, and what order to spend them in.",
      },
    ],
    flowFrom: { t: "AuthorityOS™", d: "Finds the angle and the desk" },
    flowTo: { t: "The programme", d: "Earns the coverage" },
  },

  /* ------------------------------------------------------------- judgement */

  judgement: {
    eyebrow: "Choosing the home for a story",
    heading: {
      pre: "Authority Is the Easy Filter.",
      em: "Readership Is the Real One.",
    },
    lede: "An outlet can clear every metric on paper and still be the wrong home for your story. Three that cleared the authority bar last quarter, and where the work went instead.",
    checks: [
      {
        label: "A real masthead",
        detail:
          "Named editors and working journalists, with a publishing history you can read back through.",
      },
      {
        label: "Readers we can verify",
        detail:
          "Organic traffic and genuine engagement, checked before a pitch is written.",
      },
      {
        label: "Relevance to your buyer",
        detail:
          "A title your customers open beats a larger one they have never heard of.",
      },
      {
        label: "Links that stay",
        detail:
          "We re-check every placement for twelve months and log anything that changes.",
      },
    ],
    cases: [
      {
        site: "National news aggregator",
        metric: "DR 82",
        read: "Republishes wire copy automatically with no editorial pass, so a placement there tells a reader nothing they would act on.",
        move: "Pitched a staff writer on the same group’s business desk instead.",
      },
      {
        site: "Industry newsletter site",
        metric: "DR 59",
        read: "Real readership, but the editor confirmed outbound links are nofollowed site-wide and cannot be changed for a single piece.",
        move: "Ran the story for the audience and the mention, and reported it as unlinked.",
      },
      {
        site: "Regional business title",
        metric: "DR 66",
        read: "Strong on paper. Their archive showed links stripped from articles after roughly ninety days — a pattern you only find by opening old pieces.",
        move: "Placed with a sister title that keeps its archive intact.",
      },
    ],
  },

  /* ---------------------------------------------------------------- process */

  process: {
    eyebrow: "How a campaign runs",
    heading: { pre: "Five Steps.", em: "You Are Needed in Two." },
    steps: [
      {
        n: "01",
        t: "Story audit",
        d: "We go through your data, your customers and your point of view to find what is genuinely newsworthy. Most businesses hold two or three stories they have stopped seeing.",
        you: "One 45-minute session with someone who knows the numbers.",
      },
      {
        n: "02",
        t: "Angle and asset build",
        d: "The strongest angle becomes something publishable — a data study, a survey, a position piece — written to publication standard before anyone is pitched.",
        you: "Approve the angle. Supply the data if it is yours.",
      },
      {
        n: "03",
        t: "Desk targeting",
        d: "We build the list of named journalists and the outlets they write for, matching the angle to the beat each one actually covers.",
        you: "Nothing, unless you want a pass through the names.",
      },
      {
        n: "04",
        t: "Pitching and follow-through",
        d: "Individual pitches, tracked and followed up. We field journalist questions, supply quotes and images, and keep the thread warm until it runs.",
        you: "Be reachable within a day if a journalist wants a quote.",
      },
      {
        n: "05",
        t: "Coverage and compounding",
        d: "We report every placement and keep the relationships open. The second campaign at the same desks takes a fraction of the effort of the first.",
        you: "Read the coverage report.",
      },
    ],
  },

  /* ------------------------------------------------------- amber proof band */

  example: {
    eyebrow: "One campaign, in full",
    heading: {
      pre: "One Study.",
      em: "Eleven of the Twenty-One Placements.",
    },
    label: "E-commerce · UK + GCC · 6 months",
    hero: { v: "21", k: "placements in six months" },
    facts: [
      { k: "Top outlet", v: "DR 74" },
      { k: "Referring domains", v: "4×" },
      { k: "Revenue", v: "+88%" },
      { k: "Linked vs unlinked", v: "16 / 5" },
    ],
    series: [40, 48, 61, 83, 104, 132, 158],
    seriesLabel: "Referring domains, months 0–6",
    takeaway:
      "One data study on regional delivery expectations produced eleven of the twenty-one placements. The other ten came from relationships that study opened, which is why month five cost far less effort than month one.",
    quote: {
      text: "The data study gave us something editors actually wanted. Three desks came back inside a fortnight, and two of those features still send us enquiries.",
      who: "Amira Khan · Marketing Director, Ocuco",
    },
    ctaLabel: "Open the full case file",
    caseHref: "/case-studies/ecommerce-gulf-authority",
  },

  /* ----------------------------------------------------------- deliverables */

  deliverables: {
    eyebrow: "The engagement",
    heading: { pre: "What a Programme", em: "Actually Includes." },
    items: [
      {
        t: "Angle development",
        d: "We find the story inside your business — proprietary data, a defensible position, a trend you can evidence — and shape it into something a desk wants to run.",
      },
      {
        t: "Named-journalist outreach",
        d: "Individual pitches to the writers who own your subject, written to the beat they actually cover.",
      },
      {
        t: "Asset production",
        d: "Surveys, data studies, commentary and expert quotes, written to publication standard so the editor has nothing left to fix.",
      },
      {
        t: "Reactive commentary",
        d: "When a story breaks in your sector we move the same day with a quotable position, while the window is still open.",
      },
      {
        t: "Relationship building",
        d: "The second placement at a publication is far easier than the first, so we invest in the relationship rather than spend it on one send.",
      },
      {
        t: "Coverage reporting",
        d: "Every placement with its authority, estimated reach, link type and the pitch that earned it, so you can see which angle worked.",
      },
    ],
  },

  /* -------------------------------------------------------------------- fit */

  fit: {
    eyebrow: "Fit",
    heading: { pre: "Digital PR Suits Some Brands.", em: "Not All of Them." },
    good: [
      "You hold data, a customer base or a point of view a journalist would find genuinely interesting.",
      "You can commit to six months. PR compounds, and the first two months are the investment.",
      "Someone senior can be reached for a quote within a day when a journalist asks.",
      "You want authority built on coverage, which is harder for a competitor to replicate.",
    ],
    bad: [
      "You need a guaranteed number of placements each month. Editorial coverage does not run to a quota — a programme commits to developed angles and pitched desks, and reports what landed.",
      "There is nothing distinctive about the business yet and no appetite to build it.",
      "You need measurable results inside eight weeks.",
      "Nobody internally can approve a public position quickly.",
    ],
    foot: "If it is not a fit we say so on the call and point you to link building instead, which is usually the better first move.",
  },

  /* ------------------------------------------------------------------- faq */

  faqs: [
    {
      q: "What exactly is the digital PR programme?",
      a: "It is our managed earned-coverage service. AuthorityOS™ research identifies what your category is arguing about and which desks carry weight inside it; our editorial team builds the angle into a publishable asset and pitches named journalists individually. You get the research, the assets and the outreach as one engagement.",
    },
    {
      q: "What is AuthorityOS™?",
      a: "AuthorityOS™ is the research methodology behind the work. It reads six months of output across the publications covering your market, maps which outlets Google and the AI answer engines already cite on your subject, matches what you hold against what those desks are short of, and tells us when each window opens. You do not buy AuthorityOS™. It powers how we decide where to pitch.",
    },
    {
      q: "How is this different from link building?",
      a: "Link building starts from a page that needs authority and goes to publications that will carry it. Digital PR starts from a story and earns the coverage, with the link as a consequence. PR reaches titles that do not carry placements at any price and compounds through relationships; it is also less predictable month to month. Many clients run both, with link building carrying the commercial pages and PR carrying the brand.",
    },
    {
      q: "Can you guarantee a number of placements?",
      a: "No. Editors decide what runs. What a programme commits to is the work: an agreed number of developed angles, named desks for each one, individual pitches and follow-up. Our scoped campaigns have run at roughly a 38% pitch-to-placement rate over the last twelve months, which is a track record rather than a promise.",
    },
    {
      q: "What if we have no newsworthy story?",
      a: "Almost every business has one and has stopped noticing it. Your transaction data, your customer survey, the thing you believe that your market does not — these are stories. The story audit in step one exists to find them. If we genuinely cannot find an angle we will say so on the call and recommend link building instead.",
    },
    {
      q: "Who writes the content and the quotes?",
      a: "Our editorial team drafts everything in your voice from the expertise session. Nothing carrying your name is sent anywhere before you have approved the wording. If your team prefers to write and have us edit and place, that works too and reduces the cost.",
    },
    {
      q: "Do all placements include a link?",
      a: "No. Roughly a quarter of coverage is an unlinked brand mention. That is still worth having: unlinked mentions on credible publications are exactly the signal AI answer engines use when deciding who to cite, and Google reads them as corroboration. We report linked and unlinked separately.",
    },
    {
      q: "Do we see the media list before you pitch?",
      a: "Whenever you want to. Some clients read every name and strike the ones they would rather not approach; others leave the desks to us and read the monthly report. Either way the full list, with the angle matched to each journalist, sits in your reporting.",
    },
    {
      q: "What if a journalist asks for something we cannot share?",
      a: "We tell them so directly and offer an alternative. We never commit you to data or a position you have not agreed to. If a thread stops there, it stops — the relationship is worth more than one placement.",
    },
    {
      q: "How long before we see anything?",
      a: "First placements typically land between weeks four and eight. The compounding shows from month three onwards, as relationships open and earlier coverage gets picked up elsewhere. We report monthly against the angles agreed at the start.",
    },
    {
      q: "Do you work with agencies on a white-label basis?",
      a: "Yes. You get the angle documents, media lists and coverage reports under your branding, and we stay off client calls unless you want us there. Roughly a third of our work is delivered this way.",
    },
  ],
};
