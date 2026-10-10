/**
 * Content for /services/link-building.
 *
 * Rewritten to match the register of dofollow.com/visibility-plus:
 *
 *   - lead with the client's situation and the outcome, never with what other
 *     agencies do wrong
 *   - a named, openly explained methodology (theirs: AnswerOS™; ours:
 *     our research) that carries the credibility instead of a process detail
 *   - "For years, we've helped..." — position as established, not as the
 *     honest exception to a bad industry
 *   - exactly one comparison, aimed at a *category* of approach rather than at
 *     agencies, framed as a capability difference
 *   - honest about limits (nobody can guarantee a ranking) without turning
 *     that into an attack on anyone who does
 *
 * Deliberately NOT central any more: domain approval. It is one line in the
 * FAQ, because some clients review every domain and others leave it to us. It
 * is part of the process, not the product.
 */

export const linkBuilding = {
  eyebrow: "Link Building",

  h1: {
    pre: "Your best pages are close.",
    em: "They need other sites to back them up.",
  },
  sub: "Our link building programme finds the pages closest to moving, maps the publications shaping your category, and earns the editorial links that carry those pages into the positions that generate revenue.",
  credit:
    "Research first, then outreach. Run by senior strategists, not account managers.",

  /** Hero artefact: the authority gap, the way dofollow's hero shows the
   *  visibility gap. About the client's opportunity, not anyone's failings. */
  gapCard: {
    label: "Category",
    category: "Customer support software",
    rows: [
      {
        name: "Competitor A",
        meta: "412 referring domains",
        status: "Ranking #1",
      },
      {
        name: "Competitor B",
        meta: "318 referring domains",
        status: "Ranking #3",
      },
      {
        name: "Your brand",
        meta: "142 referring domains",
        status: "Position 14",
        you: true,
      },
    ],
    calloutLabel: "our research opportunity",
    callout:
      "Find which publications are putting them there, then earn your place among them.",
  },

  logosLabel:
    "Helping ambitious B2B and e-commerce brands earn the authority that ranks",

  /* ---------------------------------------------------------------- problem */

  problem: {
    eyebrow: "Editorial authority",
    heading: {
      pre: "A strong page still needs",
      em: "other sites to back it up.",
    },
    paras: [
      "You can publish the strongest page in your category. Match search intent exactly. Build a brand people trust. And still sit on page two while a thinner page holds the position you want.",
      "Google does not read your page in isolation. It weighs how many credible, independent publications have chosen to reference it, and how closely those publications sit to your subject.",
      "If the sites shaping your category keep pointing at your competitors instead of you, the ranking follows them. Our programme changes which way those references point.",
    ],
    flow: {
      inputs: [
        "Your pages",
        "Industry publications",
        "Editorial coverage",
        "Competitor profiles",
      ],
      mid: "Authority signals",
      out: "Where you rank",
    },
  },

  /* ------------------------------------------------- distributed client proof */

  quotes: {
    afterProblem: {
      text: "They came back with a ranked list of our pages and the authority gap on each one. Six months later, four of those pages are on the first page of results.",
      who: "Daniel Reyes · Head of Growth, CapCut",
    },
    afterComparison: {
      text: "Our category pages had been stuck between positions 11 and 15 for two years. The programme moved three of them into the top five inside a quarter.",
      who: "Amira Khan · Marketing Director, Ocuco",
    },
    beforeClose: {
      text: "They work like an extension of our in-house team. Senior people, reporting we can forward to the board without editing, and a plan we can defend.",
      who: "Hana Al-Mansouri · Content Lead, Khaleej Times",
    },
  },

  /* ----------------------------------------------------------------- process */

  framework: {
    eyebrow: "How the programme runs",
    heading: { pre: "How the work runs,", em: "month by month." },
    lede: "Knowing you need more authority is not particularly useful if nobody tells you which pages need it or where it should come from. The programme does both.",
    items: [
      {
        n: "01",
        label: "Research",
        t: "Map the authority gap",
        d: "Referring domains, topical overlap, and the publications feeding your competitors' positions.",
        chip: "You 142 · Competitor 318",
      },
      {
        n: "02",
        label: "Strategize",
        t: "Prioritise the pages worth moving",
        d: "Which pages receive authority first, which anchors they take, and at what pace.",
        chip: "6 priority pages",
      },
      {
        n: "03",
        label: "Execute",
        t: "Earn the placements",
        d: "Editorial outreach to relevant publications, written to each one's standard.",
        chip: "No preset quota",
      },
      {
        n: "04",
        label: "Measure",
        t: "Track movement, then adapt",
        d: "Indexation, position change, and where the next placement should point.",
        chip: "DR 35 → 52 → 65",
      },
    ],
    emphasis:
      "You don't get a list of links to interpret. You get a team that knows which page needs the next one.",
  },

  /* ---------------------------------------------------------------- movement */

  movement: {
    eyebrow: "Real movement",
    heading: { pre: "What this looked like", em: "for one client." },
    context: "B2B SaaS · Customer support software",
    tiles: [
      { label: "Domain Rating", value: "35 → 65" },
      { label: "Organic clicks", value: "+212%" },
    ],
    note: "Twelve of the fourteen placements pointed at two category pages rather than the homepage. Concentrating authority where the pages were already close is what moved them.",
    ctaLabel: "See the Results",
    ctaHref: "/case-studies/b2b-saas-ai-visibility",
  },

  /* ------------------------------------------------------------- methodology */

  methodology: {
    eyebrow: "The intelligence behind the work",
    heading: { pre: "How we decide", em: "where to place." },
    lede: "How do we know where to focus? our research. It is our research methodology for understanding how Google reads your category, which publications carry weight inside it, and where your authority gap actually sits.",
    columns: [
      {
        label: "Understand",
        q: "What does Google think you are?",
        d: "We map how your site is categorised topically and which of your pages carry the authority you already have.",
      },
      {
        label: "Map",
        q: "Which publications shape your category?",
        d: "We identify the sites Google already trusts on your subject, and the ones consistently cited across it.",
      },
      {
        label: "Find",
        q: "Where are competitors earning links you aren't?",
        d: "We analyse their referring domains to find the overlaps worth closing and the gaps worth owning.",
      },
      {
        label: "Prioritise",
        q: "Which pages move first?",
        d: "We turn that research into a ranked plan: the target pages, the authority each needs, and the order to build it in.",
      },
    ],
    flowFrom: { t: "our research", d: "Finds the opportunity" },
    flowTo: { t: "The programme", d: "Goes after it" },
  },

  /* ------------------------------------------------------------- positioning */

  positioning: {
    eyebrow: "How we work together",
    heading: {
      pre: "You decide how involved you want to be.",
      em: "We work either way.",
    },
    lede: "Some clients want to see every domain before we approach it. Others hand us the target pages and a budget and would rather read the monthly report. Both work, and you can change your mind partway through.",
    them: {
      label: "If you want to be hands-on",
      items: [
        "Every candidate domain reaches you with its metrics first",
        "You strike anything, for any reason",
        "Anchors and target pages agreed before outreach starts",
        "Common with agencies reselling to their own clients",
      ],
    },
    us: {
      label: "If you want it handled",
      items: [
        "Give us the pages that matter and the budget",
        "We source, vet, write and place against the agreed plan",
        "You see the full list in the monthly report",
        "We flag anything unusual rather than waiting to be asked",
      ],
    },
    line: "Tell us which of those sounds like you on the first call.",
    ctaLabel: "See what the programme includes",
  },

  /* ------------------------------------------------------------------ moves */

  moves: {
    eyebrow: "The right move > more moves",
    heading: {
      pre: "Sometimes links are not",
      em: "what the page needs.",
    },
    paras: [
      "Sometimes it does. Sometimes the page needs depth before it can hold a position. Sometimes the authority is already there and the internal linking is burying it.",
      "The programme starts with the problem, not a placement.",
    ],
    map: [
      { gap: "Authority gap", move: "Editorial links" },
      { gap: "Relevance gap", move: "Niche edits" },
      { gap: "Credibility gap", move: "Digital PR and expert quotes" },
      { gap: "Content gap", move: "Page work before links" },
    ],
    defs: [
      {
        t: "Editorial Links",
        d: "Original articles on relevant publications, written to the editor's standard, with your link inside the body of the story.",
      },
      {
        t: "Niche Edits",
        d: "Contextual links added to aged, already-indexed articles that Google has trusted on your subject for years.",
      },
      {
        t: "Authority Placements",
        d: "DR 60+ editorial features, reserved for the pages where the strongest signal makes the biggest difference.",
      },
      {
        t: "Anchor Strategy",
        d: "Which page receives which anchor, in ratios that stay inside natural ranges for your category.",
      },
    ],
    closing: "The goal isn't more links. It's the right links.",
  },

  /* ---------------------------------------------------------------- context */

  context: {
    eyebrow: "Built on what lasts",
    heading: { pre: "Search keeps changing.", em: "What earns trust has not." },
    paras: [
      "For years we have helped B2B and e-commerce brands build authority beyond their own websites. Algorithm updates changed how results are assembled. They did not erase the value of being referenced in the right places.",
      "We built better research around what we have always understood: where your brand is cited matters.",
    ],
    flow: {
      top: "Editorial links + mentions",
      mid: "Authority",
      out: ["Google rankings", "AI citations"],
    },
  },

  /* ----------------------------------------------------------------- close */

  close: {
    heading: {
      pre: "Find out where you stand",
      em: "against your competitors.",
    },
    lede: "See where your profile stands, which publications are carrying your competitors, and where there is an opportunity to change it.",
    ctaLabel: "Request Pricing",
    snapshot: {
      label: "Illustrative authority snapshot",
      bars: [
        { k: "Your referring domains", v: 142, max: 318 },
        { k: "Top competitor", v: 318, max: 318 },
      ],
      facts: [
        { k: "Pages in positions 5–20", v: "11" },
        { k: "Priority opportunities", v: "6" },
      ],
    },
  },

  /* ------------------------------------------------------------------- faq */

  faqs: [
    {
      q: "What exactly is the link building programme?",
      a: "It is our managed editorial link building service. We use the research to identify which of your pages are closest to moving and where their authority gap sits, then our strategists plan and execute the placements that close it. You get the research, the strategy and the delivery as one engagement.",
    },
    {
      q: "What is our research?",
      a: "our research is the research methodology behind the work. It maps how Google categorises your site, which publications carry weight in your category, where competitors are earning references you are not, and which of your pages will respond fastest. You do not buy our research. It powers how we decide where to act.",
    },
    {
      q: "Is this a link marketplace?",
      a: "No, and we would like to keep it that way. Placements are earned through editorial outreach to publications we have direct relationships with. Our team writes to each publication's standard and works the piece through their process, which is why we scope on delivered placements rather than a catalogue of available inventory.",
    },
    {
      q: "How is this different from Digital PR?",
      a: "If you know your pages need authority, link building is likely what you need. Digital PR starts from a different question: what story would earn coverage in the first place? The answer often includes links, but it can also mean features, expert commentary or data studies. Many clients run both, with link building carrying the commercial pages and digital PR carrying the brand.",
    },
    {
      q: "Can you guarantee a ranking?",
      a: "No one can. What we can do is identify the pages where authority will make the most difference, build that authority from publications relevant to your subject, and report the position movement against the keyword set agreed at the start. Over the last twelve months 96% of our placements were indexed by Google, and we replace the ones that are not.",
    },
    {
      q: "How long before we see movement?",
      a: "Indexation takes two to six weeks per placement. Movement on pages already sitting in positions 5–20 typically shows between months two and four. Pages starting beyond position 30 usually need content work alongside links and take longer. We report against the agreed keyword set so you can see the trend rather than guess at it.",
    },
    {
      q: "Do I see the publications before they go live?",
      a: "Whenever you want to. Some clients review every candidate domain with its metrics before we proceed; others prefer to leave sourcing to us and read the monthly report. Either way the full list, with metrics and target pages, is in your reporting.",
    },
    {
      q: "Who manages the programme?",
      a: "People. You work with a senior strategist who interprets the the research, sets the priority order, coordinates the outreach and decides where the next placement should point. Roughly a third of our work is delivered white-label for other agencies on the same basis.",
    },
  ],
};
