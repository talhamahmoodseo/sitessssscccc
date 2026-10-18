/**
 * Copy for /services/digital-pr. Plan: SERVICE-PAGES-REDESIGN.md §3.
 *
 * Running example: a UK + Gulf home & lifestyle e-commerce brand, the same
 * client as the "ecommerce-gulf-authority" case study. Outlet headlines,
 * names and numbers are samples for design review until real coverage is in.
 */

export const digitalPr = {
  seo: {
    title: "Digital PR Agency: Coverage Your Buyers Actually Read",
    description:
      "Story-led digital PR. We find the story in your business, pitch it to editors we work with, and land features, expert quotes and roundups that bring links, mentions and trust.",
  },

  hero: {
    eyebrow: "Digital PR",
    h1a: "Stories editors want to run.",
    h1b: "Coverage your buyers actually read.",
    lead: "We find the story inside your business, pitch it to editors we already work with, and land features, quotes and roundups on real publications. You get the links, the mentions and the “as seen in” that comes with them.",
    primary: "Pitch us your story",
    clippings: [
      {
        outlet: "Khaleej Times",
        desk: "Business",
        kind: "Feature",
        dr: "DR 74",
        head: "Why UAE shoppers won’t wait past tomorrow",
        stand:
          "New data from 40,000 orders shows next-day delivery is now the minimum, not the perk.",
        mention:
          "Orders to Dubai now arrive in 1.8 days on average, says YourBrand",
        status: "Linked",
      },
      {
        outlet: "Arabian Business",
        desk: "Retail",
        kind: "Expert quote",
        dr: "DR 72",
        head: "Retailers rethink returns as costs bite",
        stand:
          "“Free returns mostly win you serial returners,” one founder told us.",
        mention: "Sara Hughes, COO at YourBrand",
        status: "Linked",
      },
      {
        outlet: "Retail Tech Weekly",
        desk: "Roundup",
        kind: "Roundup",
        dr: "DR 61",
        head: "12 online stores getting delivery right in 2026",
        stand:
          "Fast, honest and trackable: the brands buyers keep coming back to.",
        mention: "#4 YourBrand",
        status: "Mention",
      },
    ],
  },

  release: {
    eyebrow: "Why most PR doesn’t work",
    h2a: "Most PR buys pickups.",
    h2b: "What moves you is coverage.",
    lead: "The usual approach is a press release sent through a wire service. It gets copied word for word onto hundreds of automated “news” sites. The report says 200 pickups. But nobody reads those sites, Google treats the copies as duplicates, and the links don’t count. Here is the difference, step by step.",
    release: {
      label: "What most PR agencies do",
      path: [
        {
          t: "Write a release about you",
          d: "Your news, in your words. Nothing a reader or editor asked for.",
        },
        {
          t: "Pay a wire service to send it",
          d: "One distribution fee pushes it to hundreds of sites at once.",
        },
        {
          t: "Count the copies",
          d: "Automated sites repost it unchanged. That list becomes the report.",
        },
      ],
      stats: [
        { k: "Pickups", v: "200+" },
        { k: "Real readers", v: "Almost none" },
        { k: "Links Google counts", v: "0" },
        { k: "Still live in 3 months", v: "A few" },
      ],
      tag: "Impressive in a PDF. Does little for rankings or sales.",
    },
    story: {
      label: "What we do instead",
      path: [
        {
          t: "Find a story readers want",
          d: "Your data or expertise turned into an angle the publication’s audience cares about.",
        },
        {
          t: "Pitch the right editor",
          d: "One named journalist who covers your field, not a mailing list.",
        },
        {
          t: "Earn a real article",
          d: "Written and published by the outlet, linking to you, and often picked up by others.",
        },
      ],
      stats: [
        { k: "Features", v: "1" },
        { k: "Read by", v: "Your buyers" },
        { k: "Links Google counts", v: "1 editorial" },
        { k: "Picked up by", v: "3 more outlets" },
      ],
      tag: "Read by your buyers, counted by Google, quoted by AI.",
    },
    matters: {
      h: "Why it matters to you",
      items: [
        {
          t: "Links that count",
          d: "Google weighs one editorial link above hundreds of duplicate copies.",
        },
        {
          t: "Buyers who see it",
          d: "Real publications have real readers, including the people you sell to.",
        },
        {
          t: "Sources AI trusts",
          d: "AI answers cite established publications, not syndicated reposts.",
        },
      ],
    },
  },

  lab: {
    eyebrow: "Where stories come from",
    h2a: "Every business has a story.",
    h2b: "Most never notice theirs.",
    lead: "Finding it is the first thing we do. Here’s what that looks like with three kinds of raw material.",
    steps: ["What you told us", "The angle we found", "What ran"],
    tabs: [
      {
        t: "Data you already have",
        note: "Delivery time to the UAE went from 4.1 days to 1.8 after we moved stock to a Dubai warehouse. Repeat orders went up 23%.",
        angle:
          "Next-day isn’t a perk in the UAE any more. It’s the minimum shoppers accept.",
        why: "Their own numbers, a trend editors were already watching, and a clear reader takeaway.",
        ran: {
          outlet: "Khaleej Times",
          desk: "Business",
          head: "Why UAE shoppers won’t wait past tomorrow",
          kind: "Feature · linked",
          mention: "Delivery data from YourBrand",
        },
      },
      {
        t: "A view your market disagrees with",
        note: "Everyone in our space says free returns build loyalty. Our numbers say they mostly attract people who return half of what they buy.",
        angle: "Free returns are quietly eating small online stores’ margins.",
        why: "A defensible disagreement with the rest of the industry, backed by data only they have.",
        ran: {
          outlet: "Retail Tech Weekly",
          desk: "Opinion",
          head: "The free-returns trap, in numbers",
          kind: "Opinion piece · linked",
          mention: "By Sara Hughes, COO at YourBrand",
        },
      },
      {
        t: "News you didn’t think was news",
        note: "We hired an Arabic-speaking support team in Dubai before opening any shop there.",
        angle:
          "UK brands are building local service teams in the Gulf before they open a single store.",
        why: "Small company news, framed as a bigger shift that business readers care about.",
        ran: {
          outlet: "Gulf Business",
          desk: "Retail",
          head: "UK retailers bet on local service before local stores",
          kind: "Expert quote · mention",
          mention: "“We hired the team first,” says YourBrand",
        },
      },
    ],
  },

  tiers: {
    eyebrow: "Where your coverage lands",
    h2a: "Three kinds of publication.",
    h2b: "Each one does a different job.",
    items: [
      {
        k: "Business & national press",
        outlets: ["Khaleej Times", "Arabian Business", "Gulf Business"],
        job: "Trust",
        d: "The “as seen in” that makes a buyer stop doubting you. Hardest to get, worth the most.",
        dr: "DR 70–80",
        tint: "bg-mint",
      },
      {
        k: "Trade publications",
        outlets: [
          "Retail Tech Weekly",
          "Home & Living Trade",
          "E-commerce Insider",
        ],
        job: "Relevance",
        d: "The titles your buyers read for work. Smaller audiences, the right people.",
        dr: "DR 55–70",
        tint: "bg-butter",
      },
      {
        k: "Roundups & niche sites",
        outlets: [
          "Best-of guides",
          "Comparison articles",
          "Gift and buying guides",
        ],
        job: "Comparison",
        d: "The “best X for Y” pages people read before buying, and the ones AI answers quote.",
        dr: "DR 40–55",
        tint: "bg-sky",
      },
    ],
    gulf: {
      t: "Gulf business media",
      d: "We’ve placed stories in Gulf business press for years. Most agencies can’t get a reply there. For brands selling into the UAE and Saudi Arabia, it’s often the quickest way to be taken seriously there.",
    },
    skip: {
      t: "What we skip",
      items: [
        "Wire syndication sites",
        "Pay-to-publish “news” sites",
        "Outlets that strip links after 90 days",
        "Big titles nobody in your market reads",
      ],
    },
  },

  returns: {
    eyebrow: "What one story gives you",
    h2a: "One placement.",
    h2b: "Three things it keeps doing.",
    items: [
      {
        k: "Google",
        t: "A link you can’t buy",
        d: "An editorial link from a publication Google already trusts. Stronger than anything on a price list.",
      },
      {
        k: "AI answers",
        t: "A source AI quotes",
        d: "Your name on the kind of site ChatGPT and Google’s AI Overviews lean on when buyers ask for recommendations.",
      },
      {
        k: "Sales",
        t: "Proof for your buyers",
        d: "“As seen in” for your site, your deck and your ads. People trust what they’ve read about you somewhere else.",
      },
    ],
    note: "And it compounds. A good story gets picked up by other outlets for weeks, and the second pitch to the same editor is much easier than the first.",
  },

  proof: {
    eyebrow: "One campaign, start to finish",
    h2a: "One data study.",
    h2b: "21 placements in six months.",
    client: "Home & lifestyle e-commerce · UK + GCC",
    facts: [
      { k: "Placements", v: "21" },
      { k: "Top outlet", v: "DR 74" },
      { k: "Referring domains", v: "4×" },
      { k: "Campaign", v: "6 months" },
    ],
    // month, outlet, kind, dr
    placements: [
      [1, "Retail Tech Weekly", "Data study", 61],
      [1, "E-commerce Insider", "Data study", 58],
      [2, "Khaleej Times", "Feature", 74],
      [2, "Gulf Business", "Expert quote", 69],
      [2, "Home & Living Trade", "Data study", 55],
      [3, "Arabian Business", "Expert quote", 72],
      [3, "UAE retail news site", "Pickup", 57],
      [3, "Gulf logistics title", "Pickup", 60],
      [3, "E-commerce platform blog", "Roundup", 52],
      [4, "UAE national daily", "Pickup", 71],
      [4, "Retail Tech Weekly", "Opinion", 61],
      [4, "Gift guide (UK)", "Roundup", 48],
      [4, "Delivery & Ops Weekly", "Expert quote", 54],
      [5, "Dubai business daily", "Feature", 70],
      [5, "Home & Living Trade", "Expert quote", 55],
      [5, "Best-of guide", "Roundup", 46],
      [5, "UK retail blog", "Pickup", 49],
      [6, "Arabian Business", "Feature", 72],
      [6, "E-commerce Insider", "Expert quote", 58],
      [6, "Buying guide", "Roundup", 45],
      [6, "UAE retail news site", "Expert quote", 57],
    ] as [number, string, string, number][],
    series: [40, 48, 61, 83, 104, 132, 158],
    seriesLabel: "Referring domains",
    takeaway:
      "The delivery study landed 11 of the 21 placements by itself. The other 10 came from editors who’d covered it and came back for more. That’s the part paid links never give you.",
    quote: {
      text: "The delivery study ran in places we’d never have got into on our own. By month four, editors were emailing us.",
      who: "Head of E-commerce · UK home & lifestyle brand",
    },
    caseHref: "/case-studies/ecommerce-gulf-authority",
  },

  process: {
    eyebrow: "How a campaign runs",
    h2a: "We run the campaign.",
    h2b: "You stay in the loop.",
    steps: [
      {
        when: "Week 1",
        t: "Story audit",
        us: "We go through your data, customers and opinions to find what’s actually newsworthy.",
        you: "One 45-minute call with someone who knows the business.",
      },
      {
        when: "Weeks 2–3",
        t: "Angle and asset",
        us: "We shape the best angle into something publishable: a data study, a survey or a sharp opinion piece.",
        you: "Approve the angle. Share the data if it’s yours.",
      },
      {
        when: "Week 3",
        t: "Media list",
        us: "We pick the named journalists and outlets to pitch, and show you the list first.",
        you: "One look. Strike anyone you don’t want approached.",
      },
      {
        when: "Weeks 4–8",
        t: "Pitching",
        us: "One pitch per journalist, written for them. We follow up, answer questions and send quotes and images.",
        you: "Be reachable within a day if a journalist wants a quote.",
      },
      {
        when: "Every month",
        t: "Coverage report",
        us: "Every placement with its link, outlet metrics and the pitch that earned it. Then the next story.",
        you: "Read it. Use the coverage in your sales material.",
      },
    ],
  },

  fit: {
    eyebrow: "Is PR right for you?",
    h2a: "Good fit, bad fit.",
    h2b: "And what it costs.",
    good: [
      "You have data, customers or opinions a journalist would find interesting.",
      "You can give it six months. The first two are mostly groundwork.",
      "Someone senior can give a quote within a day when an editor asks.",
      "You want authority your competitors can’t just buy a copy of.",
    ],
    bad: [
      "You need a fixed number of links every month. PR doesn’t work on quotas.",
      "You need results inside eight weeks.",
      "Nobody can sign off a public opinion quickly.",
      "There’s nothing distinctive about the business yet, and no appetite to create it.",
    ],
    price: {
      label: "Digital PR pricing",
      from: "$2,497",
      unit: "/month",
      plan: "Full PR programme, in our Authority plan",
      points: [
        "Story audit and angle development",
        "Data studies, surveys and opinion pieces",
        "Named-journalist pitching, Gulf press included",
        "Monthly coverage report",
      ],
      note: "Want to test it first? We can scope one campaign around one story. Smaller PR work also runs inside the Growth plan on request.",
    },
  },

  faqHead: {
    eyebrow: "FAQ",
    h2a: "Questions",
    h2b: "about digital PR.",
    side: "Tell us what you’ve got. We’ll tell you on the call if there’s a story in it, and if there isn’t, which service makes more sense.",
  },

  faqs: [
    {
      q: "How is digital PR different from link building?",
      a: "Link building goes to a publication and arranges a placement. Digital PR creates a story and earns the coverage, with the link as a result. PR reaches publications that would never sell a link at any price, and it builds relationships that make the next story easier. It’s slower and less predictable month to month. Most clients run both: links for steady authority on key pages, PR for the publications links can’t reach.",
    },
    {
      q: "Can you guarantee coverage?",
      a: "No. Editors decide what runs, and a “guaranteed” placement is a paid one, which is exactly what we’re avoiding. What we do commit to is the work: developed angles, a media list you approve, and an individual pitch to every target with follow-up. You’ll see all of it in the report.",
    },
    {
      q: "What if we don’t have a story?",
      a: "Almost every business has one and has stopped noticing it. Your order data, a customer survey, the thing you believe that your competitors disagree with: those are stories. That’s what the story audit is for. If we genuinely can’t find an angle, we’ll tell you and suggest link building instead.",
    },
    {
      q: "Who writes the content and the quotes?",
      a: "Our editorial team drafts everything in your voice, from the story audit. Nothing with your name on it goes to a journalist until you’ve approved the wording.",
    },
    {
      q: "Does every placement include a link?",
      a: "No. Some coverage is an unlinked mention of your brand. That still counts: mentions on trusted publications are what AI answers draw on, and Google uses them too. We report linked and unlinked coverage separately so you can see both.",
    },
    {
      q: "How long before we see coverage?",
      a: "First placements usually land between weeks four and eight. It builds from month three as editors come back and earlier coverage gets picked up elsewhere. Anyone promising coverage in week one is sending a press release to a wire service.",
    },
    {
      q: "Can you get us into Gulf media?",
      a: "Often, yes. We’ve worked with Gulf business publications for years, and it’s one of the places we’re strongest. The story still has to be right for their readers, so we’ll tell you on the call if yours is.",
    },
    {
      q: "Do you work white label for agencies?",
      a: "Yes. Angle documents, media lists and coverage reports go out under your branding, and we stay off client calls unless you want us there.",
    },
  ],

  pairs: {
    h2: "Pairs well with",
    items: [
      {
        to: "/services/link-building",
        t: "Link Building",
        d: "Steady authority for the pages you need to rank, while PR goes after the bigger titles.",
      },
      {
        to: "/services/brand-mentions",
        t: "Brand Mentions",
        d: "Turn coverage into the sources AI answers quote, and track whether it’s working.",
      },
      {
        to: "/services/haro-links",
        t: "HARO & Expert Quotes",
        d: "Quick wins between campaigns: your experts quoted in stories already being written.",
      },
    ],
  },

  close: {
    eyebrow: "Free story call",
    h2a: "Tell us one boring thing",
    h2b: "about your business.",
    d: "The thing you think nobody cares about is often the story. On a 15‑minute call we’ll tell you if there’s coverage in it, and where it could run.",
    primary: "Book a story call",
    subject: "Digital PR enquiry",
  },
};
