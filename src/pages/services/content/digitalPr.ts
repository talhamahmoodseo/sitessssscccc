/**
 * Copy for /services/digital-pr. Plan: SERVICE-PAGES-REDESIGN.md §3.
 *
 * Running example: a UK + Gulf home & lifestyle e-commerce brand, the same
 * client as the "ecommerce-gulf-authority" case study. Outlet headlines,
 * names and numbers are samples for design review until real coverage is in.
 */

export const digitalPr = {
  seo: {
    title: "Digital PR Agency: Coverage Buyers Read",
    description:
      "Story-led digital PR. We find the story in your business, pitch editors we work with, and land features, quotes and roundups that bring links and trust.",
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
      t: "Press in every market you sell in",
      d: "We pitch business and trade publications wherever your buyers read, from the US and UK to Europe, the Middle East and Asia. One story, adapted for each market’s editors, so a launch abroad gets coverage from day one.",
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
      plan: "Full PR programme, run monthly",
      points: [
        "Story audit and angle development",
        "Data studies, surveys and opinion pieces",
        "Named-journalist pitching, in the markets you sell in",
        "Monthly coverage report",
      ],
      note: "Want to test it first? We can scope one campaign around one story. Smaller PR work can run alongside a link building order.",
    },
  },

  faqHead: {
    eyebrow: "FAQ",
    h2a: "Questions",
    h2b: "about digital PR.",
    side: "Tell us about your business. On the call, we’ll tell you whether there’s a story worth pitching, and if there isn’t, which service suits you better.",
  },

  faqs: [
    {
      q: "How is digital PR different from link building?",
      a: "Link building secures placements on publications directly. Digital PR creates a newsworthy story and earns coverage, with links as a result. PR reaches publications that would never accept a paid placement, and it builds editor relationships that make the next story easier to place. It's slower and less predictable month to month, so most clients run both: link building for steady authority on key pages, and PR for the publications links can't reach.",
    },
    {
      q: "Can you guarantee press coverage?",
      a: "No. Editors decide what runs, and a guaranteed placement is a paid one, which is what digital PR is meant to avoid. We commit to the work: researched story angles, a media list you approve, and an individual pitch to every target, with follow-ups. All of it is in your report.",
    },
    {
      q: "What if we don’t have a story?",
      a: "Most businesses have several without realising it: their order data, a customer survey, or a view their competitors disagree with. Finding them is what the story audit is for. If we can't find a strong angle, we'll tell you and recommend link building instead.",
    },
    {
      q: "Who writes the press content and quotes?",
      a: "Our editorial team drafts everything in your voice, based on the story audit. Nothing with your name on it goes to a journalist until you've approved the wording.",
    },
    {
      q: "Does every piece of coverage include a backlink?",
      a: "No. Some coverage is an unlinked brand mention. It still has value: mentions on trusted publications are what AI answers draw on, and Google uses them too. We report linked and unlinked coverage separately.",
    },
    {
      q: "How long does digital PR take to get coverage?",
      a: "First placements usually land between weeks four and eight. Coverage builds from month three, as editors come back for more and earlier stories are picked up elsewhere.",
    },
    {
      q: "Can you get coverage outside the US and UK?",
      a: "Yes. We pitch business and trade publications in the markets you sell in, and adapt each story for local editors. The story still has to suit their readers, and we'll tell you on the call whether yours does.",
    },
    {
      q: "Do you offer white label digital PR for agencies?",
      a: "Yes. Angle documents, media lists and coverage reports are delivered under your branding, and we only join client calls if you ask us to.",
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
    h2a: "Every business has a story",
    h2b: "worth covering.",
    d: "It’s often in data or expertise you already have. On a 15‑minute call, we’ll tell you whether there’s coverage in it, and which publications could run it.",
    primary: "Book a story call",
    subject: "Digital PR enquiry",
  },
};
