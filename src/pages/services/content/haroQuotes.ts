/**
 * Content for /services/haro-links.
 *
 * Rewritten to the register established by content/linkBuilding.ts:
 *
 *   - lead with the client's situation and the outcome, never with what other
 *     agencies or vendors do wrong
 *   - credibility carried by the named methodology (our research), explained
 *     openly, and by concrete figures — not by claiming to be the honest one
 *   - exactly one comparison, aimed at a *category of approach* ("most source
 *     outreach starts with the request"), framed as a capability difference
 *   - headlines short and declarative, usually two sentences where the second
 *     turns the first
 *   - honest about limits — a third of placements arrive unlinked, volume is
 *     modest, nobody controls request flow — without attacking anyone
 *
 * Deliberately NOT a selling point: the fact that you see the wording before a
 * journalist does. It is one line in the process and one line in the FAQ,
 * because it is a mechanic of the work rather than the product.
 */

export const haroQuotes = {
  eyebrow: "HARO & Expert Quotes",

  h1: {
    pre: "Journalists Are Already Writing Your Category.",
    em: "You Should Be the Source They Quote.",
  },
  sub: "We document your expertise in enough detail to answer a journalist's question specifically, inside the hours it stays open, and get you named as a source in the stories your buyers and the AI engines already read.",
  credit: "Powered by the research. Drafted by editors, read by you first.",

  /** Hero artefact: the live request queue, with the misfit shown as a skip. */
  queue: {
    label: "Source requests · live",
    meta: "3 fits today",
    skipLabel: "Skipped",
    rows: [
      {
        outlet: "National business daily",
        ask: "Need a payments lead on how fraud budgets get approved",
        dr: "DR 78",
        mins: 41,
        fit: true,
      },
      {
        outlet: "Fintech trade weekly",
        ask: "Sources: what actually changed in card fraud this year",
        dr: "DR 64",
        mins: 96,
        fit: true,
      },
      {
        outlet: "Consumer lifestyle blog",
        ask: "Looking for crypto price commentary",
        dr: "DR 38",
        mins: 12,
        fit: false,
      },
      {
        outlet: "Enterprise tech magazine",
        ask: "Comment on support automation benchmarks",
        dr: "DR 71",
        mins: 173,
        fit: true,
      },
    ],
    foot: "A request stays open for hours, not days. We answer the ones where you are genuinely the right expert.",
  },

  /* ----------------------------------------------------------- the numbers */

  numbers: {
    label: "The programme, in figures",
    items: [
      { fig: "2–6", label: "Published quotes in a typical month" },
      { fig: "DR 63", label: "Average outlet authority over the last year" },
      { fig: "41 min", label: "Median time from request to drafted answer" },
      {
        fig: "1 in 3",
        label: "Placements that arrive unlinked, reported as such",
      },
    ],
  },

  /* ---------------------------------------------------------------- problem */

  problem: {
    eyebrow: "The response window",
    heading: {
      pre: "A Request Is Open for Hours.",
      em: "What You Send Has to Be Ready Already.",
    },
    paras: [
      "A journalist posting a source request is working to a deadline measured in hours. Several hundred replies land in front of them, and the ones that get used are the ones that answer the exact question with something only that source could say.",
      "Which makes this a preparation problem rather than a speed problem. A specific answer is only possible when somebody has already written down what you know, what you can prove and how you phrase it.",
      "So that is the first thing we build. The speed follows from it.",
    ],
    window: {
      label: "Typical life of a source request",
      marks: [
        { t: "0:00", d: "Request posted, replies begin arriving", ours: false },
        { t: "0:41", d: "Our drafted answer is with you", ours: true },
        { t: "4:00", d: "Writer picks the sources they will use", ours: false },
        { t: "24:00", d: "Story filed", ours: false },
      ],
      note: "Median across the last two hundred requests we answered.",
    },
  },

  /* ---------------------------------------------------------------- profile */

  profile: {
    eyebrow: "Step zero",
    heading: {
      pre: "Speed Only Helps",
      em: "If Something Is Already Written Down.",
    },
    lede: "Before a single request is answered we build your expertise profile: a working document covering what you can speak to, the numbers only you hold, the positions you will defend in a follow-up call, and the subjects we will never put your name near.",
    rows: [
      {
        k: "Speaks to",
        v: "Payments infrastructure, fraud rates, interchange economics",
      },
      {
        k: "Owns data on",
        v: "1.4m monthly transactions, chargeback benchmarks by sector",
      },
      {
        k: "Credentials",
        v: "Former card-scheme risk lead, eleven years in payments",
      },
      {
        k: "Will argue",
        v: "That fraud screening belongs in onboarding, not at checkout",
      },
      {
        k: "Never pitch",
        v: "Crypto prices, politics, anything outside payments",
      },
    ],
    note: "One forty-five-minute session, then a document you correct. Everything downstream is drafted from it.",
    caption: "Expertise profile · illustrative extract",
  },

  /* ------------------------------------------------------------- the ratio */

  ratio: {
    label: "Twelve months on one account",
    answered: { v: "34", k: "Requests answered" },
    skipped: { v: "180+", k: "Requests skipped" },
    line: "We answer about one request in six.",
    body: "The other five are questions where someone else is genuinely the better source, or where a published quote would have been one line in a forty-source list. Filtering is the service. It is also why the volume is modest and the placement rate holds.",
  },

  /* ------------------------------------------------------------- methodology */

  methodology: {
    eyebrow: "The intelligence behind the work",
    heading: { pre: "Powered by", em: "our research" },
    lede: "our research is our research methodology. On this programme it answers four questions before a single request is answered.",
    rows: [
      {
        label: "Understand",
        q: "Which subjects can you own?",
        d: "We map your expertise against what search engines and AI models already associate with your brand, and find the subjects where a quote from you adds something nobody else can.",
      },
      {
        label: "Map",
        q: "Which publications shape them?",
        d: "We identify the outlets writing your category now, and the desks inside them that work with outside sources rather than staff analysis.",
      },
      {
        label: "Track",
        q: "Which writers publish their sources?",
        d: "We keep a record of who has used our sources before, how quickly they file, and how often a quote survives the edit intact.",
      },
      {
        label: "Prioritise",
        q: "Which requests are worth your name?",
        d: "The research sets the filter. It decides what we answer, what we skip, and which subjects are worth pitching directly rather than waiting for.",
      },
    ],
    emphasis:
      "The filter is the product. Everything after it is drafting and relationships.",
  },

  /* ----------------------------------------------------------- positioning */

  /** The one comparison on this page. Aimed at a category of approach, framed
   *  as a capability difference, never at any agency. */
  positioning: {
    line: "Most source outreach starts with the request. Ours starts with your expertise.",
  },

  /* ----------------------------------------------------------------- process */

  process: {
    eyebrow: "How it runs",
    heading: {
      pre: "Five Steps.",
      em: "Four of Them Are Ours.",
    },
    steps: [
      {
        n: "01",
        t: "Expertise session",
        d: "Forty-five minutes with a senior strategist mapping what you can speak to, the numbers you hold, and the positions you will defend.",
        you: "One call.",
      },
      {
        n: "02",
        t: "Profile build",
        d: "We turn the session into the working document everything is drafted from, including the subjects we will never pitch you for.",
        you: "Read it, correct anything that is not how you would put it.",
      },
      {
        n: "03",
        t: "Monitoring and filtering",
        d: "the research sets the filter. We watch the request platforms and our own writer list against it, and we pitch directly where a subject is yours to own.",
        you: "Nothing.",
      },
      {
        n: "04",
        t: "Draft inside the window",
        d: "Our editors write from the profile, specific to the question asked. The wording reaches you before it reaches the journalist.",
        you: "A quick yes, usually inside the hour.",
      },
      {
        n: "05",
        t: "Placement and follow-on",
        d: "We log what published, linked or not, and keep the writer relationship warm. A second quote at the same outlet is far easier than the first.",
        you: "Read the report.",
      },
    ],
  },

  /* --------------------------------------------------------------- clipping */

  clipping: {
    eyebrow: "What it looks like in print",
    heading: {
      pre: "One Paragraph in Someone Else's Story.",
      em: "That Is What Authority Looks Like.",
    },
    main: {
      outlet: "The Industry Journal",
      meta: "Payments analysis · 1,400 words",
      quote:
        "Response time beats pricing in a fraud event — 71% of merchants stay with the provider that answers first",
      attribution: "says the founder of",
      brand: "YourBrand",
      badges: ["Quoted + linked", "DR 71", "Indexed · 4 days"],
      why: "It was used because the figure was specific and ours to give. Writers print the sentence they cannot write themselves.",
    },
    alt: {
      label: "The same programme, one month earlier",
      badge: "Quoted · no link",
      note: "About a third of published quotes arrive unlinked. A named expert mention on a credible publication is exactly what AI answer engines cite, so we report linked and unlinked separately and let you judge the mix.",
    },
  },

  /* ------------------------------------------------------------------ proof */

  example: {
    eyebrow: "One engagement, in full",
    heading: {
      pre: "Eleven Published Quotes.",
      em: "Thirty-Four Answers Behind Them.",
    },
    label: "Fintech SaaS · founder as the named source · four months",
    facts: [
      { k: "Published placements", v: "11" },
      { k: "Average outlet DR", v: "63" },
      { k: "Linked", v: "7 of 11" },
      { k: "Requests answered", v: "34" },
      { k: "Requests skipped", v: "180+" },
    ],
    monthly: [0, 2, 2, 3, 2, 2],
    seriesLabel: "Published quotes by month, months 0–5",
    takeaway:
      "Thirty-four answers produced eleven published quotes because each one came out of the profile rather than a template. The month-three peak followed a direct pitch rather than a posted request.",
    caseHref: "/case-studies/b2b-saas-ai-visibility",
    ctaLabel: "Open the full case file",
  },

  quote: {
    text: "Two DR 65+ quotes in the first month, and both of them read like me. What I did not expect was how many questions they told me to leave alone.",
    who: "Daniel Reyes · Head of Growth, CapCut",
  },

  /* ---------------------------------------------------------------- skipped */

  skipped: {
    eyebrow: "The requests we pass on",
    heading: {
      pre: "Five Out of Six, the Answer Is No.",
      em: "Here Is What That Looks Like.",
    },
    lede: "Three real requests from a single quarter. Each carried authority worth having. Each one was skipped.",
    items: [
      {
        site: "Roundup request, forty sources",
        metric: "DR 70",
        reason:
          "A forty-source listicle gives each quote one line and no link. Worth the publisher's time, not worth yours.",
      },
      {
        site: "A subject outside the profile",
        metric: "DR 68",
        reason:
          "Strong outlet, and the client could have improvised an answer. A quote you cannot defend on a follow-up call is a liability we would rather not create.",
      },
      {
        site: "A writer with no publishing history",
        metric: "DR 72",
        reason:
          "Four quotes sourced to this writer across a year, none published. No fault in it — the desk's needs changed — but we stopped spending your time there.",
      },
    ],
  },

  /* -------------------------------------------------------------------- fit */

  fit: {
    eyebrow: "Fit",
    heading: {
      pre: "This Works for a Specific Shape of Business.",
      em: "It Is Worth Knowing Early Which One.",
    },
    good: [
      "Someone in the business has specific expertise and is willing to be named.",
      "That person can look at a draft within a few hours when a window is open.",
      "You want authority and credibility, and a modest monthly volume is acceptable.",
      "You see the value in an unlinked expert mention as well as a linked one.",
    ],
    bad: [
      "Nobody internally wants to be named publicly as a source.",
      "You need a fixed number of placements every month — request volume varies and we scope on what is published.",
      "Approvals take days. The window is usually hours.",
      "The subjects you want to be quoted on are not ones anybody internally knows deeply.",
    ],
    note: "If this is not the right programme we will say so on the call. Link building or digital PR is usually the better route, and we run both.",
    ctaLabel: "Book a Strategy Call",
  },

  /* ------------------------------------------------------------------- faq */

  faqs: [
    {
      q: "Is HARO still worth doing?",
      a: "The open version of it is crowded: a single request can draw several hundred replies, and a writer on deadline reads the first few that answer the question properly. What still works is the layer underneath — a documented expertise profile, a filter that keeps us to the requests where you are genuinely the right source, and writers who have used you before. That is the version we run, which is why the volume is modest and the placement rate holds.",
    },
    {
      q: "What is our research?",
      a: "our research is the research methodology behind our programmes. For expert placements it maps the subjects you can credibly own, the publications writing about them, the writers who work with outside sources, and the requests worth your name. You do not buy our research. It decides where we spend your time.",
    },
    {
      q: "Who writes the quotes, and will they sound like me?",
      a: "Our editors draft from your expertise profile, which exists specifically to capture your positions and your phrasing. The wording reaches you before it reaches the journalist, and most clients change a word or two. The profile session is what makes that possible — drafting from a blank page produces something generic no matter who writes it.",
    },
    {
      q: "How many placements will I get in a month?",
      a: "Typically two to six, depending on how much your sector is being written about. We scope and bill on published placements rather than attempts, so a quiet month costs less. We will not commit to a fixed number, because request volume is outside anyone's control and hitting a number would mean lowering the filter.",
    },
    {
      q: "What if the journalist does not include a link?",
      a: "About a third of published quotes arrive unlinked. It is still worth having: a named expert mention on a credible publication is precisely the kind of source AI answer engines cite, and it builds the entity associations that help you elsewhere. We report linked and unlinked separately so you can judge the mix.",
    },
    {
      q: "Do I need to be available for interviews?",
      a: "Rarely. The large majority of placements are written quotes handled over email. Occasionally a writer wants fifteen minutes on a call, and we brief you beforehand — it is always your choice and declining costs nothing.",
    },
    {
      q: "How fast do I need to respond?",
      a: "A few hours is ideal and same day usually works, because a strong answer sent a day late is simply unused. If your side is genuinely slow we can agree standing approval for subjects squarely inside your profile and keep the rest as a review.",
    },
    {
      q: "Can you use more than one person from our team?",
      a: "Yes, and it usually improves results. Each person gets their own profile. A founder, a head of engineering and a head of customer success can each answer different requests credibly, which widens the pool considerably.",
    },
    {
      q: "What happens in a quiet month?",
      a: "We tell you, and you pay for what published. If a sector stays quiet for a sustained period we will say so and suggest moving budget to digital PR, where we create the story rather than wait for the request.",
    },
  ],
};
