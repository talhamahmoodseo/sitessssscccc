/**
 * Copy for /services/brand-mentions. Plan: SERVICE-PAGES-REDESIGN.md §4.
 *
 * Running example: a B2B SaaS help desk tool ("YourBrand"), the same client
 * as the "b2b-saas-ai-visibility" case study. Competitor names, domains and
 * numbers are samples. The Ahrefs figures are real and linked.
 */

export const brandMentions = {
  seo: {
    title: "Brand Mention Building for AI Search (ChatGPT, AI Overviews)",
    description:
      "Get your brand named when buyers ask ChatGPT, Perplexity and Google's AI Overviews. We place contextual brand mentions on the sources AI answers already cite, then track your share of the answer every month.",
  },

  hero: {
    eyebrow: "Brand mentions · AI visibility",
    h1a: "When buyers ask AI,",
    h1b: "your name should come up.",
    lead: "ChatGPT, Perplexity and Google’s AI Overviews build their answers from what other sites say about you. We get your brand described on the sources they already trust, then check every month whether it’s working.",
    primary: "See what AI says about us",
    question:
      "What’s the best help desk software for a 10-person support team?",
    engines: ["ChatGPT", "Perplexity", "AI Overviews"],
    answer: [
      {
        t: "For a team that size, three tools come up again and again: Replyhub, ",
      },
      { t: "YourBrand", brand: true },
      { t: " and Deskline. " },
      { t: "YourBrand", brand: true },
      {
        t: " is often picked by small teams for its shared inbox and quick setup",
      },
      { t: "[2]", cite: true },
      { t: ", while Replyhub suits teams that need heavy automation" },
      { t: "[1]", cite: true },
      { t: "." },
    ],
    sources: [
      { n: 1, d: "supporttoolsreview.com/best-help-desk", ours: false },
      { n: 2, d: "saasweekly.io/help-desk-small-teams", ours: true },
      { n: 3, d: "cx-trade.com/2026-buyers-guide", ours: true },
    ],
  },

  how: {
    eyebrow: "How AI decides who to name",
    h2a: "AI doesn’t take your word for it.",
    h2b: "It checks what others say.",
    lead: "Your website says you’re great. Every website says that. So AI tools lean on third-party sources: comparison articles, reviews, trade press and buyer guides. If those don’t mention you, you don’t exist in the answer.",
    sources: [
      {
        k: "Your website",
        d: "“The best help desk for growing teams”",
        w: 1,
        own: true,
      },
      {
        k: "Comparison articles",
        d: "“Replyhub vs YourBrand vs Deskline”",
        w: 4,
      },
      { k: "Buyer guides", d: "“Best help desk tools for small teams”", w: 4 },
      {
        k: "Trade press",
        d: "“How support teams are cutting response times”",
        w: 3,
      },
      {
        k: "Reviews & communities",
        d: "“We switched to YourBrand last year…”",
        w: 3,
      },
    ],
    data: {
      eyebrow: "What the data says",
      t: "Ahrefs looked at 75,000 brands to see what lines up with being named in Google’s AI Overviews.",
      rows: [
        { k: "Branded web mentions", v: 0.664 },
        { k: "Branded anchors", v: 0.527 },
        { k: "Branded search volume", v: 0.392 },
        { k: "Domain Rating", v: 0.326 },
        { k: "Number of backlinks", v: 0.218 },
      ],
      unit: "Correlation with AI Overview visibility",
      caveat:
        "Correlation, not a promise. But mentions came out on top by a distance, and backlinks near the bottom.",
      source: "Ahrefs, AI Overview brand visibility study",
      href: "https://ahrefs.com/blog/ai-overview-brand-correlation/",
    },
  },

  beforeAfter: {
    eyebrow: "What changes",
    h2a: "Same question.",
    h2b: "Six months apart.",
    question: "Best help desk software for small teams?",
    states: [
      {
        k: "Month 0",
        answer:
          "Popular options for small teams include Replyhub, Deskline and Tidewell. Replyhub is known for automation, Deskline for its price, and Tidewell for its simple setup.",
        named: ["Replyhub", "Deskline", "Tidewell"],
        sources: [
          { d: "supporttoolsreview.com", you: false },
          { d: "techbuyersguide.net", you: false },
          { d: "cx-trade.com", you: false },
        ],
        share: 0,
        engines: 0,
        verdict: "YourBrand isn’t mentioned",
      },
      {
        k: "Month 6",
        answer:
          "For small teams, Replyhub and YourBrand are the most common picks. YourBrand is often recommended for its shared inbox and quick setup, and Deskline is a cheaper option.",
        named: ["Replyhub", "YourBrand", "Deskline"],
        sources: [
          { d: "supporttoolsreview.com", you: false },
          { d: "saasweekly.io", you: true, note: "placed month 2" },
          { d: "cx-trade.com", you: true, note: "placed month 4" },
        ],
        share: 26,
        engines: 3,
        verdict: "Named, with a reason",
      },
    ],
    total: 42,
    note: "In your report, every answer is a screenshot of the live result.",
  },

  anatomy: {
    eyebrow: "What a useful mention looks like",
    h2a: "Not a name-drop.",
    h2b: "A sentence AI can repeat.",
    parts: [
      {
        t: "For small support teams that want a shared inbox without a long setup, ",
        tag: 1,
      },
      { t: "YourBrand", tag: 2 },
      { t: " is one of the easiest tools to start with", tag: 3 },
      { t: "." },
    ],
    notes: [
      {
        n: 1,
        t: "Who it’s for",
        d: "Matches the way buyers phrase the question.",
      },
      {
        n: 2,
        t: "The brand, named clearly",
        d: "Same name, same spelling, every time.",
      },
      {
        n: 3,
        t: "The reason",
        d: "The part AI quotes back when it recommends you.",
      },
    ],
    skip: {
      t: "What doesn’t count",
      items: [
        {
          k: "Directory listings",
          m: "DR 78",
          d: "Your name in a list of 4,000. Easy to get, and AI tools barely look at them.",
        },
        {
          k: "Pay-to-enter “top tools” lists",
          m: "DR 61",
          d: "Twenty-two entries and no reasons. Nothing for an AI to repeat.",
        },
        {
          k: "Dormant blogs",
          m: "DR 67",
          d: "Strong on paper, nothing new in 18 months. AI answers prefer fresh sources.",
        },
      ],
    },
  },

  report: {
    eyebrow: "How we measure it",
    h2a: "AI has no Search Console.",
    h2b: "So we built the report.",
    lead: "Every month we run the same set of real buyer questions through the main AI tools and record who gets named, how, and which sources the answer used.",
    points: [
      "30–60 buyer questions, agreed with you and kept fixed",
      "Same engines, same week, every month",
      "Screenshots of every answer that names you",
      "The sources behind each answer: your next targets",
    ],
    engines: ["ChatGPT", "Perplexity", "AI Overviews", "Claude"],
    questions: [
      { q: "best help desk for small teams", r: [2, 2, 1, 0] },
      { q: "replyhub alternatives", r: [2, 1, 2, 2] },
      { q: "shared inbox tool for support", r: [2, 2, 2, 1] },
      { q: "cheapest help desk software", r: [0, 1, 0, 0] },
      { q: "help desk with fast setup", r: [2, 2, 2, 2] },
      { q: "is yourbrand any good", r: [2, 2, 1, 2] },
    ],
    share: [
      { k: "Replyhub", v: 71 },
      { k: "YourBrand", v: 62, you: true },
      { k: "Deskline", v: 48 },
      { k: "Tidewell", v: 29 },
    ],
    legend: ["Named and recommended", "Mentioned", "Not named"],
  },

  loop: {
    eyebrow: "How it runs",
    h2a: "A monthly loop.",
    h2b: "Not a one-off campaign.",
    steps: [
      {
        k: "Ask",
        t: "Run the questions",
        d: "We put your buyer questions to each AI tool and record who gets named and which sources they cite. Month one, this is your baseline.",
        you: "Check the questions sound like your buyers.",
      },
      {
        k: "Find",
        t: "Find the gaps",
        d: "We list the sources AI keeps citing for your category, and which of them never mention you. That list is the campaign.",
        you: "Nothing.",
      },
      {
        k: "Place",
        t: "Get mentioned",
        d: "Editorial mentions, comparison inclusions and expert comments on those exact sources. Every site checked by hand first.",
        you: "One look at the target list.",
      },
      {
        k: "Align",
        t: "Say it the same way",
        d: "We make sure you’re described consistently everywhere: same category, same strengths. Mixed messages get you vague answers.",
        you: "Approve the positioning words once.",
      },
      {
        k: "Re-check",
        t: "Run it again",
        d: "Same questions, same tools, next month. You see what moved, and the next round of targets.",
        you: "Read the report.",
      },
    ],
  },


  fit: {
    eyebrow: "Is this right for you?",
    h2a: "Good fit, bad fit.",
    h2b: "And what it costs.",
    good: [
      "Buyers research your category before they buy, so they ask AI about it.",
      "Competitors are already being named and you can see it happening.",
      "You can give it two quarters. AI answers move slower than rankings.",
      "You want it measured, not just promised.",
    ],
    bad: [
      "You want a guarantee that ChatGPT will name you. Nobody can honestly give one.",
      "Your category is so new that AI tools have nothing to go on yet.",
      "You want this instead of SEO. It works on the same foundations.",
    ],
    price: {
      label: "Brand mentions pricing",
      from: "$2,497",
      unit: "/month",
      plan: "Monthly campaign, links included",
      points: [
        "Buyer-question baseline across the main AI tools",
        "Mentions on the sources AI already cites",
        "Editorial links in the same plan",
        "Monthly AI visibility report",
      ],
      note: "Need mentions only, or screenshots of every answer and competitor tracking? We’ll scope it on a call.",
    },
  },

  faqHead: {
    eyebrow: "FAQ",
    h2a: "Questions",
    h2b: "about AI visibility.",
    side: "Send us your brand and category. We’ll tell you on the call what AI says about you today, and whether this is worth doing yet.",
  },

  faqs: [
    {
      q: "Can you actually change what AI says about us?",
      a: "Not directly. There’s no dashboard or submission form, and anyone claiming a direct line is selling something. What you can change is what AI reads. These tools answer from sources they trust, and those sources can be found and reached through normal editorial work. We change the inputs and measure the answers every month.",
    },
    {
      q: "How do you measure it?",
      a: "A fixed set of 30–60 real buyer questions, run through ChatGPT, Perplexity, Google’s AI Overviews and other tools on the same schedule each month. We record whether you’re named, how you’re described and which sources the answer used, and track it against named competitors. Same idea as rank tracking, applied to answers.",
    },
    {
      q: "Isn’t this just link building with a new name?",
      a: "There’s overlap: both put you on independent publications. But the target list is different. We go after the sources AI cites, not the ones that pass the most authority. Unlinked mentions count fully here. Comparison and “best of” articles matter much more. And we measure answers, not rankings.",
    },
    {
      q: "Do unlinked mentions really matter?",
      a: "For AI answers, yes. A sentence like “YourBrand, the help desk built for small teams” tells an AI tool what you are and who you’re for, link or no link. For Google rankings the link matters more. We go after both and report them separately.",
    },
    {
      q: "How long until something changes?",
      a: "First movement usually shows up in months three to four, once new mentions get picked up. A real change in your share of answers is a two-quarter job. The month-one baseline is useful straight away, because most teams have never seen what AI says about them.",
    },
    {
      q: "What if a competitor already dominates the answers?",
      a: "That’s the usual starting point, and it’s workable. AI answers are less sticky than page-one rankings. The way in is comparison content: getting named next to them in the articles that compare your category, so the AI has a reason to mention you both.",
    },
    {
      q: "Does this replace our SEO?",
      a: "No. The same publications feed both, and a site that can’t rank usually struggles to get cited too. Think of it as the same authority work aimed at a second place buyers look, with its own targets and its own report.",
    },
  ],

  pairs: {
    h2: "Pairs well with",
    items: [
      {
        to: "/services/digital-pr",
        t: "Digital PR",
        d: "Coverage on bigger publications, which AI tools trust more than anything.",
      },
      {
        to: "/services/link-building",
        t: "Link Building",
        d: "Rankings and AI answers draw on the same sites. Do both, report once.",
      },
      {
        to: "/services/haro-links",
        t: "HARO & Expert Quotes",
        d: "Expert quotes add named, credible mentions on news sites.",
      },
    ],
  },

  close: {
    eyebrow: "Free AI visibility check",
    h2a: "Find out what AI",
    h2b: "says about you.",
    d: "Send us your brand and your category. We’ll run 10 real buyer questions through ChatGPT, Perplexity and Google’s AI Overviews, and send you what comes back: who gets named, how you’re described, and which sources they use.",
    primary: "Send me my AI check",
    subject: "Free AI visibility check",
  },
};
