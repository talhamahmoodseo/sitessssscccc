/**
 * Content for /services/brand-mentions.
 *
 * Register matched to src/pages/services/content/linkBuilding.ts, which the
 * client approved:
 *
 *   - an established agency describing its own work, experience and results
 *   - credibility carried by the named methodology (AuthorityOS™), explained
 *     openly, plus concrete figures — never by claiming to be the honest one
 *   - exactly ONE comparison on the page, aimed at a category of approach and
 *     framed as a capability difference (see `sources.comparison`)
 *   - honest about limits (no one can promise a model will name you) without
 *     turning that into a remark about anyone else
 *   - short declarative headlines, the second line turning the first
 *
 * Deliberately not prominent: client sign-off on the target list. It appears
 * once, as a clause in process step 03, because some clients read every line
 * and others read the summary. It is part of the process, not the product.
 */

export const brandMentions = {
  eyebrow: "Brand Mentions & AI Visibility",

  h1: {
    pre: "Buyers Ask the Assistant.",
    em: "It Answers From Sources.",
  },
  sub: "ChatGPT, Claude, Perplexity and AI Overviews build their view of your category from a narrow set of publications they trust. We get your brand described inside those sources, then re-run your buyer prompts across all four engines every month so you can watch the share move.",
  credit:
    "Powered by AuthorityOS™ research. Reported monthly across four engines.",

  /** Hero artefact: a live answer, with the brand named and the sources cited
   *  underneath it. The page's signature object. */
  answer: {
    engine: "ChatGPT",
    prompt: "Which help desk tools are best for a 20-person support team?",
    text: "Teams that size usually shortlist YourBrand, which reviewers single out for shared-inbox triage and a flat per-seat price.",
    brand: "YourBrand",
    citedLabel: "Cited",
    sources: ["supportopsweekly.com", "saasgenius.com"],
    note: "The sentence the engine repeats came from a comparison article, not from the brand's own site.",
  },

  /* ------------------------------------------------------------------ proof */

  proof: {
    figures: [
      {
        v: "4",
        label: "Answer engines re-run and screenshotted every month",
        d: "ChatGPT, Claude, Perplexity and AI Overviews, on the same cadence.",
      },
      {
        v: "30–60",
        label: "Buyer prompts in the fixed set agreed at kickoff",
        d: "Held constant for the engagement, so month-to-month movement is comparable.",
      },
      {
        v: "3 of 4",
        label: "Engines citing client brands inside two quarters",
        d: "Measured against the baseline recorded in month one.",
      },
    ],
    rows: [
      { k: "Unlinked mentions", v: "Counted in full" },
      { k: "Competitor share", v: "Reported alongside yours" },
      { k: "Sources behind each answer", v: "Listed as next targets" },
    ],
  },

  /* ------------------------------------------------------------------ shift */

  shift: {
    eyebrow: "The shift",
    heading: {
      pre: "Ten Links Became Three Names.",
      em: "Absence Costs More Now.",
    },
    paras: [
      "A growing share of buying research never reaches a results page. Someone asks an assistant which tool to use, gets three names with reasoning attached, and shortlists from those three. If you are not one of them, you were never in the running, and no analytics dashboard records that it happened.",
      "This is not a new discipline bolted onto SEO. Answer engines assemble a category from the same places Google does: independent publications, comparison articles, expert roundups, and the language used about you across the open web.",
      "What changed is the shape of the output. Ten links left room to be discovered. Three names do not, which is why the work is to be described — in the right language, on the sources those models already draw from — and then measured.",
    ],
    lanes: [
      {
        label: "Results page",
        steps: ["Query", "Ten links", "They browse and compare"],
        note: "Room to be found further down.",
      },
      {
        label: "Answer engine",
        steps: ["Question", "Three names, with reasons", "They shortlist"],
        note: "Named, or not in the conversation.",
        live: true,
      },
    ],
  },

  /* ---------------------------------------------------------------- pathway */

  pathway: {
    eyebrow: "The mechanism",
    heading: { pre: "Sources Go In.", em: "Answers Come Out." },
    lede: "There is no submission form for an answer engine. There is an input it reads, and that input is ordinary editorial coverage on publications we can identify and reach.",
    steps: [
      {
        n: "01",
        t: "You get described on a cited source",
        d: "A sentence about what you do, in your category's language, inside real editorial on a publication the engines already draw from.",
        chip: "Comparison, roundup or feature",
      },
      {
        n: "02",
        t: "The engine reads it and keeps it",
        d: "Models crawl the sources they trust continuously and absorb how those pages describe you — entity, category, and the reason to recommend you.",
        chip: "Crawled, not submitted",
      },
      {
        n: "03",
        t: "Your name enters the answer",
        d: "When a buyer asks, the engine repeats what credible sources say and cites them. Your prompt report shows which ones.",
        chip: "Named + cited",
      },
    ],
  },

  /* ---------------------------------------------------------------- tracked */

  tracked: {
    eyebrow: "What we measure",
    heading: {
      pre: "We Fix the Questions.",
      em: "So the Movement Means Something.",
    },
    rows: [
      { q: "best {category} for small teams", intent: "Comparison intent" },
      {
        q: "who should I hire for {service} in {city}",
        intent: "Local buying intent",
      },
      { q: "{competitor} alternatives", intent: "Switching intent" },
      { q: "is {your brand} any good", intent: "Brand due diligence" },
    ],
    note: "Between thirty and sixty of these are agreed at kickoff and then held constant for the engagement. A prompt set that drifts produces a trend line that cannot be read.",
    figures: [
      { k: "Named", v: "Position in the answer" },
      { k: "Described", v: "The wording used about you" },
      { k: "Cited", v: "Which sources the answer leans on" },
    ],
  },

  /* ---------------------------------------------------------------- anatomy */

  anatomy: {
    eyebrow: "The craft",
    heading: { pre: "A Name Is Not a Mention.", em: "A Sentence Is." },
    lede: "Models repeat sentences. A brand sitting in a list of twenty gives them nothing to say about you; a line of context gives them the whole recommendation.",
    sentence: {
      tie: "For a 20-person support team",
      brand: "YourBrand",
      credibility: "is the one reviewers single out for shared-inbox triage",
    },
    notes: [
      {
        n: "1",
        t: "Category tie",
        d: "Connects you to the exact problem the prompt asks about.",
      },
      {
        n: "2",
        t: "The entity",
        d: "Named plainly, spelled the same way everywhere, so the model resolves one brand.",
      },
      {
        n: "3",
        t: "Reason to recommend",
        d: "The clause an engine lifts verbatim. Without it you are a name in a list.",
      },
    ],
    aside:
      "Entity alignment is half the job: when five publications describe you five different ways, the answer comes back hedged and vague.",
  },

  /* -------------------------------------------------------------- reporting */

  reporting: {
    eyebrow: "Reporting",
    heading: {
      pre: "Answers Have No Search Console.",
      em: "So We Built the Report.",
    },
    lede: "Every month the same prompts run across the same four engines. We log whether you were named, how you were described, which sources the answer cited, and where your named competitors sit.",
    checks: [
      "A fixed prompt set, so the trend is comparable month to month",
      "Screenshots of every live answer that names you",
      "The sources feeding each answer, which become the next targets",
      "Share of answer against the competitors you named at kickoff",
    ],
    tracker: {
      label: "Citation tracker · month four",
      liveLab: "Live",
      engines: [
        { name: "AI Overviews", pct: 82 },
        { name: "ChatGPT", pct: 74 },
        { name: "Perplexity", pct: 68 },
        { name: "Claude", pct: 61 },
      ],
      unit: "Each bar is the share of the tracked prompt set in which the brand is named, on that engine, this month.",
      footnote: "Illustrative figures",
    },
    quote: {
      text: "The monthly report is the part we did not know we needed. We could finally point at a number in a board deck instead of describing a worry.",
      who: "Daniel Reyes · Head of Growth, CapCut",
    },
  },

  /* ---------------------------------------------------------------- sources */

  sources: {
    eyebrow: "Source selection",
    heading: {
      pre: "Authority Is Not Citation.",
      em: "We Go After the Second.",
    },
    /** The page's single comparison. Category of approach, capability framing. */
    comparison:
      "Most AI visibility work starts with a list of publications. Ours starts with the answers, and works backwards to the sources producing them.",
    lede: "AuthorityOS™ research tells us which publications the engines currently lean on for your category. Plenty of strong domains are not on that list, and a mention on one of them does nothing for this particular goal.",
    standards: [
      {
        label: "Currently cited",
        detail:
          "The publication shows up in answers for your category today, not in a metrics tool.",
      },
      {
        label: "Describes, not just lists",
        detail:
          "There is room for a sentence of context, because that is what a model can reuse.",
      },
      {
        label: "Comparison context",
        detail:
          "Being named next to the brands you want to displace matches the shape of the question.",
      },
      {
        label: "Fresh",
        detail:
          "Engines weight recent coverage heavily in fast-moving categories.",
      },
    ],
    rejections: [
      {
        site: "High-DR directory listing",
        metric: "DR 78",
        reason:
          "Easy to obtain and inert for this goal. Across the prompt set we could not find a single answer drawing on it.",
      },
      {
        site: "Paid “top tools” roundup",
        metric: "DR 61",
        reason:
          "Twenty-two entries, no editorial reasoning. An engine reading it learns that you exist, not why anyone would pick you.",
      },
      {
        site: "Industry blog, dormant",
        metric: "DR 67",
        reason:
          "Authority built years ago, nothing published in eighteen months, and no recent citation in the answers we track.",
      },
    ],
    rejectLabel: "Left off",
  },

  /* ----------------------------------------------------------------- result */

  result: {
    eyebrow: "One engagement, in full",
    label: "B2B SaaS · customer support software · two quarters",
    figure: "26 / 42",
    figureLabel: "prompts naming the brand at month six, from zero at baseline",
    series: [0, 2, 6, 11, 17, 22, 26],
    seriesLabel: "Prompts naming the brand, months 0–6",
    facts: [
      { k: "Engines citing", v: "3 of 4" },
      { k: "Placements", v: "14" },
      { k: "Named at baseline", v: "0 / 42" },
    ],
    takeaway:
      "The move came from shape, not volume. Nine comparison pieces — the “best support tools” and “alternatives to” articles the engines lean on hardest — did more than the other thirty placements combined.",
    quote: {
      text: "We could finally see it. The monthly prompt report turned a vague worry into something we could act on.",
      who: "Tom Whitfield · SEO Lead, Ocuco",
    },
    ctaLabel: "Open the full case file",
    caseHref: "/case-studies/b2b-saas-ai-visibility",
  },

  /* ---------------------------------------------------------------- process */

  process: {
    eyebrow: "How it runs",
    heading: { pre: "Baseline First.", em: "Then Share of the Answer." },
    steps: [
      {
        n: "01",
        t: "Baseline across four engines",
        d: "We build your prompt set and run it across ChatGPT, Claude, Perplexity and AI Overviews, recording who gets named and which sources each answer cites.",
        you: "Confirm the prompts match how your buyers actually ask.",
      },
      {
        n: "02",
        t: "Source-gap analysis",
        d: "AuthorityOS™ maps the cited sources against your current footprint. The distance between what the engines read and where you appear is the whole strategy, and it is usually narrower than people expect.",
        you: "Nothing.",
      },
      {
        n: "03",
        t: "The placement plan",
        d: "A ranked target list with the citation evidence behind each source, the order we work through them, and the language we will use. Some clients read every line, others read the summary.",
        you: "One read-through.",
      },
      {
        n: "04",
        t: "Placement and entity alignment",
        d: "We earn the mentions and align how you are described across them, so the engines see one coherent account of your category rather than five competing ones.",
        you: "Approve the positioning language once.",
      },
      {
        n: "05",
        t: "Re-run and report",
        d: "Same prompts, same engines, every month, screenshotted, with your share of the answer plotted against the competitors you named.",
        you: "Read the report.",
      },
    ],
    quote: {
      text: "They work like an extension of our team. Senior people, reporting we forward to the board without editing, and a plan we can defend.",
      who: "Hana Al-Mansouri · Content Lead, Khaleej Times",
    },
  },

  /* --------------------------------------------------------------- included */

  included: {
    eyebrow: "Scope",
    heading: { pre: "Six Deliverables.", em: "One Measured Outcome." },
    items: [
      {
        t: "Prompt-set baseline",
        d: "The 30–60 questions your buyers ask, run across four engines, with a record of who gets named today. That is your starting line.",
      },
      {
        t: "Source-gap analysis",
        d: "Which publications the engines cite for your category, and which of them have never mentioned you. That list is the campaign.",
      },
      {
        t: "Placement on cited sources",
        d: "Editorial mentions, comparison inclusions and expert commentary on the exact publications the models draw from.",
      },
      {
        t: "Entity and language work",
        d: "One set of category words and differentiators, used consistently across the web, so models have something coherent to repeat.",
      },
      {
        t: "Comparison and listicle inclusion",
        d: "Placement inside the “best X for Y” and “alternatives to Z” articles the engines lean on disproportionately.",
      },
      {
        t: "Monthly citation report",
        d: "Every prompt re-run across four engines, screenshotted, with share of answer against named competitors.",
      },
    ],
  },

  /* -------------------------------------------------------------------- fit */

  fit: {
    eyebrow: "Fit",
    heading: {
      pre: "It Suits Some Categories.",
      em: "We Will Say If Yours Isn't One.",
    },
    good: [
      "Buyers research your category before they buy, so assistants get asked about it.",
      "Competitors are already being named and you can see it happening.",
      "A two-quarter horizon works for you — citation share moves slower than rankings.",
      "You want this measured rather than asserted.",
    ],
    bad: [
      "You want a guarantee that a specific engine will name you. That is not something anyone can promise.",
      "Your category is new enough that the engines have no settled source set yet.",
      "You want this instead of SEO. It runs on the same foundations, not in place of them.",
      "Consistent public description of your brand is not something you can commit to.",
    ],
    note: "If it is not a fit, we say so on the call and tell you what we would do instead.",
  },

  /* ------------------------------------------------------------------- faqs */

  faqs: [
    {
      q: "Can you actually influence what an AI says?",
      a: "Not the model — the input. These engines answer from a set of sources they trust, and that set is identifiable, measurable and reachable through ordinary editorial work. AuthorityOS™ tells us which publications carry your category; we earn the mentions there and align how you are described across them; then we re-run the prompt set monthly and show you what moved. That is the whole mechanism, start to finish.",
    },
    {
      q: "What is AuthorityOS™?",
      a: "AuthorityOS™ is the research methodology behind our work. For this service it maps how your category is described across the open web, which publications the answer engines currently draw on for it, where competitors are being cited and you are not, and which prompts are closest to turning. You do not buy AuthorityOS™. It decides where we act.",
    },
    {
      q: "How do you measure it? Is this provable?",
      a: "A fixed set of 30–60 buyer prompts, run across ChatGPT, Claude, Perplexity and AI Overviews on the same cadence each month, screenshotted every time. We record whether you were named, in what position, with what description, and which sources the answer cited, then plot it against the competitors you named at kickoff. It is the discipline of rank tracking, applied to answers.",
    },
    {
      q: "How is this different from your link building?",
      a: "There is real overlap — both put you on independent publications, and about half the target list is the same. The rest diverges. Here the list is built from citation evidence rather than authority metrics, unlinked mentions count in full, comparison and listicle placements carry disproportionate weight, and the measurement is prompt-based rather than rank-based. Many clients run both as one engagement with one report.",
    },
    {
      q: "Do unlinked mentions really matter?",
      a: "For this goal, enormously. A model reading “Ocuco, the practice management platform used by independent opticians” extracts a clear entity and category whether or not that text is hyperlinked. For rankings the link matters more. We pursue both and report them separately so you can see the split.",
    },
    {
      q: "How long before anything changes?",
      a: "First movement usually appears between months three and four, as new placements get crawled and incorporated. Meaningful share change is a two-quarter story. The most useful thing you get early is the month-one baseline, because most clients have never seen what the engines currently say about them.",
    },
    {
      q: "What if a competitor already dominates the answers?",
      a: "That is the common starting position, and it is workable — these answers are far less sticky than page-one rankings. The route is comparison context: getting named alongside them in the articles that compare the category, so the engine has a reason to mention you both. Displacing an incumbent outright is a longer game; joining the shortlist is not.",
    },
    {
      q: "Why not wait for this to settle down?",
      a: "Because the source sets are consolidating now. The publications an engine leans on for a category are becoming established, and joining an established set is harder than joining one while it forms. The cost of waiting is not a month of lost ground; it is that the brands named today become the default answer.",
    },
    {
      q: "Does this replace our SEO?",
      a: "No. The same publications feed both, and a site that struggles to rank generally struggles to be cited. Think of it as the same authority work pointed at a second surface, with its own target list and its own measurement.",
    },
    {
      q: "Who runs the programme?",
      a: "A senior strategist who interprets the AuthorityOS™ research, sets the order of the target list, runs the outreach and decides where the next placement should point. The same person reads the monthly prompt report with you.",
    },
  ],
};
