/**
 * Copy for /services/ai-seo-agency (was /services/brand-mentions, which now
 * 301s here). Round 20: retargeted to "ai seo agency" / GEO / AEO, off-site
 * only (owner's decision). Brand mentions stay the core method.
 * Plan: SERVICE-PAGES-REDESIGN.md §4, docs/seo/growth-plan-90-days.md.
 *
 * Running example: a B2B SaaS help desk tool ("YourBrand"), the same client
 * as the "b2b-saas-ai-visibility" case study. Competitor names, domains and
 * numbers are samples. The Ahrefs figures are real and linked.
 */

export const brandMentions = {
  seo: {
    title: "AI SEO Agency for ChatGPT and Google AI",
    description:
      "AI SEO agency for brands that want to be named in ChatGPT, Perplexity and Google AI. Off-site GEO: mentions, PR and list placements, tracked monthly.",
  },

  hero: {
    eyebrow: "AI SEO agency · GEO · AEO",
    h1a: "When buyers ask AI,",
    h1b: "your name should come up.",
    lead: "ChatGPT, Perplexity and Google’s AI Overviews build their answers from what other sites say about you. So we work off-site: we get your brand described on the sources they already trust, then check every month whether it’s working.",
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
      "You want a guarantee that ChatGPT will name you. No one can give one.",
      "Your category is so new that AI tools have nothing to go on yet.",
      "You want this instead of SEO. It works on the same foundations.",
    ],
    price: {
      label: "AI SEO pricing",
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
    eyebrow: "AI SEO FAQ",
    h2a: "Questions about",
    h2b: "AI SEO and GEO.",
    side: "Send us your brand and category. On the call, we’ll show you what AI tools say about you today, and whether this work makes sense for you yet.",
  },

  faqs: [
    {
      q: "What does an AI SEO agency do?",
      a: "It works on how your brand shows up in answers from ChatGPT, Perplexity, Gemini and Google's AI Overviews and AI Mode. Some agencies focus on rewriting your website. We work off-site: we find the sources AI tools cite for your category and get your brand described there, through editorial mentions, comparison and \u201cbest of\u201d inclusions, digital PR and expert quotes. Then we measure the answers every month.",
    },
    {
      q: "What is GEO (generative engine optimization), and how is it different from AEO?",
      a: "GEO is the work of getting a brand cited or recommended in AI-generated answers. AEO, answer engine optimization, is an older name for much the same thing, from the days of featured snippets and voice search. Most agencies use the two interchangeably. What matters more is the method: on-site (making your own pages easy for AI to read) or off-site (being described on the sources AI trusts). We do the off-site part.",
    },
    {
      q: "Do you change our website content or schema?",
      a: "No. We're an off-site team: we don't rewrite your pages or touch your code. If your team or SEO agency handles on-site work, we share what our checks find, like the questions AI can't answer about you and the facts it gets wrong, so they can fix them on your site.",
    },
    {
      q: "Can you guarantee that ChatGPT will recommend us?",
      a: "No, and be careful with anyone who does. AI answers change by question, by tool and by week. We guarantee the work: the mentions we agree, placed on sites we've checked by hand, and an honest monthly report of what the answers say.",
    },
    {
      q: "Can you change what AI tools say about our brand?",
      a: "Not directly. There's no submission form or direct line to ChatGPT or Google's AI. What you can influence is what those tools read. AI answers draw on sources they trust, and those sources can be reached through editorial work. We improve the inputs and measure the answers every month.",
    },
    {
      q: "How do you measure AI visibility?",
      a: "We run a fixed set of 30–60 real buyer questions through ChatGPT, Perplexity, Google's AI Overviews and other tools on the same schedule each month. We record whether you're named, how you're described and which sources each answer used, and compare that with named competitors. It's rank tracking, applied to AI answers.",
    },
    {
      q: "Isn’t this just link building with a new name?",
      a: "There's overlap, since both put your brand on independent publications. The target list is different: we prioritise the sources AI tools cite, not the ones that pass the most authority. Unlinked mentions count fully, comparison and “best of” articles matter far more, and we measure answers rather than rankings.",
    },
    {
      q: "Do unlinked brand mentions matter?",
      a: "For AI answers, yes. A sentence like “YourBrand, the help desk built for small teams” tells an AI tool what you do and who you serve, with or without a link. For Google rankings, the link carries more weight. We pursue both and report them separately.",
    },
    {
      q: "How long does it take to improve AI visibility?",
      a: "First changes usually appear in months three to four, once new mentions are picked up. A meaningful shift in your share of answers typically takes two quarters. The month-one baseline is useful straight away, because most teams have never seen what AI tools say about them.",
    },
    {
      q: "What if a competitor already dominates AI answers?",
      a: "That's the usual starting point, and it can change. AI answers shift more easily than page-one rankings. The most effective route is comparison content: getting your brand named alongside theirs in the articles that compare your category, so AI tools have a reason to mention both.",
    },
    {
      q: "Does AI visibility work replace SEO?",
      a: "No. The same publications feed both, and a site that struggles to rank usually struggles to be cited as well. It's the same authority work aimed at a second place buyers look, with its own targets and its own report.",
    },
  ],

  /* our own baseline: Muse's AI check, 17–18 Nov 2026 (kit tab "3 AI
     prompts log"). 30 questions per tool; prompts 29–30 ask about Editorial
     HQ by name, so the 28 recommendation questions per tool are counted. */
  own: {
    eyebrow: "We checked ourselves first",
    h2a: "Our own score:",
    h2b: "0 out of 112.",
    lead: "In November we asked ChatGPT, Google AI Mode, Google’s AI Overview and Perplexity the questions buyers ask about agencies like ours. 28 questions per tool, 112 answers. Editorial HQ wasn’t recommended once.",
    tools: [
      { k: "ChatGPT", v: 0, of: 28 },
      { k: "Google AI Mode", v: 0, of: 28 },
      { k: "Google AI Overview", v: 0, of: 28 },
      { k: "Perplexity", v: 0, of: 28 },
    ],
    points: [
      "The same handful of agencies came up again and again. Not because of their websites, but because comparison articles, review sites and Reddit threads keep naming them.",
      "When we asked about Editorial HQ by name, one answer described a different company with a similar name, and gave us its prices and reviews.",
      "So we’re running the same programme on ourselves that we run for clients, and we re-check every month.",
    ],
    note: "Checked 17–18 November 2026. The two questions that ask about Editorial HQ by name are left out of the count.",
  },

  /* real proof: SmileTutor case (lib/cases.ts → evidence) */
  proof: {
    eyebrow: "A real result",
    h2a: "Named first",
    h2b: "in Google’s AI Overview.",
    lead: "SmileTutor is a tuition agency in Singapore. After it ranked first and was named in the comparison articles parents read, Google’s AI Overview for “online tuition” started opening with it.",
    image: "/images/cases/smiletutor-ai-overview.webp",
    alt: "Google AI Overview for 'online tuition' naming SmileTutor first",
    caption: "“online tuition”: the AI Overview names SmileTutor first and links to it.",
    domain: "google.com/search?q=online+tuition",
    link: "/case-studies/smiletutor",
    linkText: "Read the SmileTutor case study",
  },

  scope: {
    eyebrow: "Off-site only",
    h2a: "What we do,",
    h2b: "and what we don’t.",
    lead: "We’re an off-site team. That’s where AI tools look for proof, and it’s the work we do every day.",
    do: [
      "Find the sources AI tools cite for your category, and which of them never mention you",
      "Get you described there: editorial mentions, comparison and “best of” inclusions",
      "Digital PR and expert quotes on news and trade sites",
      "One consistent description of your brand across the web",
      "A monthly report of what AI answers say, with screenshots",
    ],
    dont: [
      "Rewrite your website content",
      "Change your code, schema or site structure",
      "Fake reviews, planted Reddit posts or prompt tricks",
      "Promise that any AI tool will name you",
    ],
    note: "Your website still matters. If your team or SEO agency handles on-site work, we hand them what our checks find.",
  },

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
