/** Content for /services/brand-mentions. Plan §4.3. */

export const brandMentions = {
  eyebrow: "Brand Mentions & AI Visibility",
  h1: { pre: "Get named when buyers", em: "ask the AI", post: "." },
  sub: "ChatGPT, Claude, Perplexity and AI Overviews answer from a small set of sources they trust. We get your brand into those sources, then track every engine monthly so you can see the share move.",

  proof: [
    {
      custom: "3 / 4",
      label: "Answer engines citing clients within two quarters",
    },
    {
      v: 4,
      suffix: "",
      label: "Engines tracked and screenshotted every month",
    },
    {
      v: 60,
      suffix: "%",
      label: "Of tracked prompts naming clients after six months",
    },
  ],

  problem: {
    heading: { pre: "Your buyers stopped scrolling and", em: "started asking" },
    paras: [
      "A growing share of buying research never reaches a results page. Someone asks an assistant which tool to use, gets three names with reasoning, and shortlists from that. If you are not one of the three, you were never in the running — and no analytics dashboard will tell you it happened.",
      "This is not a new discipline bolted onto SEO. Answer engines build their view of a category from the same places Google does: independent publications, comparison articles, expert roundups and the language used about you across the open web. What has changed is that the output is three names instead of ten links, so the cost of absence is far higher.",
      "The work is to be described, in the right language, on the sources those models already draw from — and then to measure it, because a strategy you cannot see the results of is a story rather than a service.",
    ],
  },

  deliverables: [
    {
      t: "Prompt-set baseline",
      d: "We build the 30–60 questions your buyers actually ask, run them across four engines, and record who gets named today. That is your starting line.",
    },
    {
      t: "Source-gap analysis",
      d: "We identify which publications the engines are citing for your category and which of those never mention you. That list is the campaign.",
    },
    {
      t: "Placement on cited sources",
      d: "Editorial mentions, comparison inclusions and expert commentary on the exact publications the models are drawing from.",
    },
    {
      t: "Entity and language work",
      d: "Making sure you are described consistently across the web — the same category words, the same differentiators — so models have something coherent to repeat.",
    },
    {
      t: "Listicle and comparison inclusion",
      d: "Getting you into the 'best X for Y' and 'alternatives to Z' articles that answer engines lean on disproportionately.",
    },
    {
      t: "Monthly citation report",
      d: "Every prompt re-run across four engines, screenshotted, with the share-of-voice trend against named competitors.",
    },
  ],

  ledger: {
    standards: [
      {
        label: "The source is actually cited",
        detail:
          "We check whether engines currently reference the publication for your category. If it is not in the citation set, a mention there does nothing for this goal.",
      },
      {
        label: "Described, not just linked",
        detail:
          "The mention has to say what you do in language a model can reuse. A bare brand name in a list is far weaker than a sentence of context.",
      },
      {
        label: "Comparison context",
        detail:
          "Being named alongside the competitors you want to displace is worth more than a standalone feature, because that is the shape of the question being asked.",
      },
      {
        label: "Freshness",
        detail:
          "Engines weight recent sources heavily in fast-moving categories. Coverage from four years ago is not doing the work you think it is.",
      },
      {
        label: "Consistent entity data",
        detail:
          "Conflicting descriptions across the web produce hedged, vague answers. Alignment is part of the job.",
      },
    ],
    rejections: [
      {
        site: "High-DR directory listing",
        metric: "DR 78",
        reason:
          "Easy to obtain and completely inert — engines treat bulk directories as low-trust and we could not find a single citation drawn from it in our prompt set.",
      },
      {
        site: "Sponsored 'top tools' roundup",
        metric: "DR 61",
        reason:
          "Pay-to-enter listicle with twenty-two entries and no editorial reasoning. Models that cite it get no signal about why anyone is on the list, including you.",
      },
      {
        site: "Industry blog, dormant",
        metric: "DR 67",
        reason:
          "Authority built years ago, nothing published in eighteen months. Strong historical DR, no freshness, and no evidence of recent citation.",
      },
    ],
  },

  process: [
    {
      n: "01",
      t: "Baseline across four engines",
      d: "We build your prompt set and run it across ChatGPT, Claude, Perplexity and AI Overviews, recording who is named and which sources each answer cites.",
      you: "Confirm the prompt list reflects how your buyers actually ask.",
    },
    {
      n: "02",
      t: "Gap analysis",
      d: "We map the cited sources against your current footprint. The gap between what engines read and where you appear is the entire strategy, and it is usually smaller than people fear.",
      you: "Nothing.",
    },
    {
      n: "03",
      t: "Placement plan, approved",
      d: "You see the target publications with metrics and the reason each one matters for citation, before any outreach.",
      you: "One pass through the sheet.",
    },
    {
      n: "04",
      t: "Placement and entity alignment",
      d: "We earn the mentions and align how you are described across them, so the models see one coherent story instead of five conflicting ones.",
      you: "Approve the positioning language once.",
    },
    {
      n: "05",
      t: "Re-run and report",
      d: "The same prompt set, same engines, every month, screenshotted. You watch your share of the answer move.",
      you: "Read the report.",
    },
  ],

  example: {
    label: "B2B SaaS · customer support software · 2 quarters",
    headline: "From invisible to cited on three of four engines",
    facts: [
      { k: "Prompts tracked", v: "42" },
      { k: "Named at start", v: "0 / 42" },
      { k: "Named at month 6", v: "26 / 42" },
      { k: "Engines citing", v: "3 / 4" },
      { k: "Placements", v: "14" },
    ],
    series: [0, 2, 6, 11, 17, 22, 26],
    seriesLabel: "Prompts naming the brand, months 0–6",
    takeaway:
      "The breakthrough was not volume. Nine comparison articles — the 'best support tools' and 'alternatives to' pieces the engines lean on hardest — did more than the other thirty placements combined.",
    caseHref: "/case-studies/b2b-saas-ai-visibility",
  },

  fit: {
    good: [
      "Your category is one buyers research before purchase, so assistants get asked about it.",
      "You have competitors already being named and you can see it happening.",
      "You can accept a two-quarter horizon — citation share moves slower than rankings.",
      "You want this measured properly rather than claimed.",
    ],
    bad: [
      "You expect a guarantee that a specific model will name you. Nobody can offer that honestly.",
      "Your category is so new that engines have no established source set yet.",
      "You want this instead of SEO. It works alongside the same foundations, not in place of them.",
      "You are not willing to be described consistently across the web.",
    ],
  },

  faqs: [
    {
      q: "Can you actually influence what an AI says?",
      a: "Not directly — there is no dashboard, no submission form and anyone claiming a direct line is selling something. What is influenceable is the input. These models answer from sources they trust, and those sources are identifiable, measurable and reachable through ordinary editorial work. We change the inputs and measure the output monthly. When the sources describing your category start including you, the answers change. That is the whole mechanism, and we would rather state it plainly than dress it up.",
    },
    {
      q: "How do you measure it? Is this provable?",
      a: "A fixed prompt set of 30–60 buyer questions, run across ChatGPT, Claude, Perplexity and AI Overviews on the same cadence each month, screenshotted every time. We record whether you are named, in what position, with what description, and which sources the answer cites. You get the trend against named competitors. It is the same discipline as rank tracking, applied to answers.",
    },
    {
      q: "Is this just link building with new branding?",
      a: "There is overlap and we will not pretend otherwise — both place you on independent publications. The differences are real though. We target the sources engines cite rather than the sources that pass the most authority, which is a different list. Unlinked mentions count fully here and barely count for rankings. Comparison and listicle placements matter far more. And the measurement is prompt-based, not rank-based. Roughly half the target list differs from a pure link campaign.",
    },
    {
      q: "Why not just wait for this to settle down?",
      a: "Because the source sets are consolidating now. The publications engines lean on for a category are becoming established, and getting into an established set is harder than getting in while it forms. The cost of waiting is not that you fall behind by a month — it is that the competitors named today become the default answer.",
    },
    {
      q: "Do unlinked mentions really matter?",
      a: "For this goal they matter enormously. A model reading 'Ocuco, the practice management platform used by independent opticians' extracts a clear entity and category whether or not that text is hyperlinked. For rankings the link matters more. We pursue both and report them separately so you can see the split.",
    },
    {
      q: "How long before anything changes?",
      a: "First movement typically appears between months three and four, as new placements get crawled and incorporated. Meaningful share change is a two-quarter story. The baseline in month one is the most useful thing you get early, because most clients have never seen what the engines currently say about them.",
    },
    {
      q: "What if a competitor is already dominant in the answers?",
      a: "That is the common starting position and it is workable — these answers are far less sticky than page-one rankings. The route is comparison context: getting named alongside them in the articles that compare the category, so the model has a reason to mention you both. Displacing an incumbent entirely is a longer game; being added to the shortlist is not.",
    },
    {
      q: "Does this replace our SEO?",
      a: "No. The same publications feed both, and a site that cannot rank generally struggles to be cited too. Think of it as the same authority work pointed at a second surface, with its own target list and its own measurement.",
    },
  ],
};
