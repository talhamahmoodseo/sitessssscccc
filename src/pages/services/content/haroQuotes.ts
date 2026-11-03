/**
 * Copy for /services/haro-links. Plan: SERVICE-PAGES-REDESIGN.md §5.
 *
 * How the service really works: we place expert quotes through our own
 * publishing connections (editors and site owners we already work with), and
 * we answer only the source requests where the client is the right expert.
 * Not the daily pitch-everything HARO routine.
 *
 * Running example: a fintech founder ("Sam Carter, YourBrand"). Requests,
 * outlets and numbers are samples for design review.
 */

export const haroQuotes = {
  seo: {
    title: "HARO Link Building & Expert Quote Placements",
    description:
      "HARO-style links without the lottery. We place your quotes through editors we already work with, and only answer requests you're the right expert for.",
  },

  hero: {
    eyebrow: "HARO & expert quotes",
    h1a: "Get quoted as the expert.",
    h1b: "Skip the HARO lottery.",
    lead: "HARO-style links, done differently. We map what you actually know, place your quotes through editors and publishers we already work with, and only answer the requests you’re the right person for. You approve every word.",
    primary: "Get me quoted",
    request: {
      label: "Journalist request",
      outlet: "Business daily · DR 66",
      ask: "Looking for founders: how are small businesses dealing with late invoices this year?",
      closes: "Closes in 3h 12m",
    },
    draft: {
      label: "Drafted in your voice",
      text: "“We looked at 18,000 invoices on our platform. The ones followed up on day 3 got paid nine days sooner than ones chased on day 14. Send the reminder before it’s late, not after.”",
      status: "Approved by Sam",
      sent: "Sent in 52 minutes",
    },
    published: {
      outlet: "Business daily",
      desk: "Small business",
      head: "Late invoices are the new normal. Here’s what founders are doing",
      who: "Sam Carter, founder of YourBrand",
      badges: ["Quoted + linked", "DR 66", "Indexed in 4 days"],
    },
  },

  problem: {
    eyebrow: "The problem with HARO",
    h2a: "HARO didn’t die.",
    h2b: "It got crowded.",
    paras: [
      "A journalist posts one request and gets hundreds of replies within hours. Most are generic. Many come from people who didn’t read the question. More and more are written by AI.",
      "So editors stopped reading the pile, and the agencies selling “HARO links” answered by sending even more. If you tried it and got nothing back, that’s why. It wasn’t you.",
    ],
    pile: {
      count: 300,
      label: "replies to one request",
      lines: [
        "As an expert with 10+ years in the industry, I believe…",
        "Great question! There are many factors to consider…",
        "Hi! I’d love to contribute. Here are 7 tips…",
        "In today’s fast-paced business world…",
        "As a seasoned professional, I can share…",
      ],
      foot: "Most get deleted unread.",
    },
    ways: {
      t: "So we work two ways instead",
      items: [
        {
          k: "Our own publishing connections",
          d: "Editors and site owners we already work with, who take expert commentary for articles they’re writing. Your quote goes to someone expecting it.",
          tag: "Most placements",
        },
        {
          k: "Hand-picked source requests",
          d: "We still watch the request platforms. We answer only the ones where you’re clearly the right expert, fast, with something specific.",
          tag: "Selected requests",
        },
      ],
    },
  },

  twoReplies: {
    eyebrow: "The craft",
    h2a: "Same request.",
    h2b: "Only one gets printed.",
    request:
      "Looking for finance experts: what’s one cash-flow mistake small businesses keep making?",
    generic: {
      label: "The usual reply",
      text: "As a seasoned financial expert with over ten years of experience, I believe cash flow is the lifeblood of any business. One common mistake is not monitoring it closely enough. Businesses should use the right tools, plan ahead and stay proactive to avoid problems down the line.",
      notes: [
        "Starts with a bio, not an answer",
        "Could be anyone, about anything",
        "Nothing worth quoting",
      ],
      verdict: "Archived",
    },
    ours: {
      label: "Our reply",
      text: "Most small businesses chase late invoices too late. On our platform, invoices followed up on day 3 got paid nine days sooner than ones chased on day 14. Set the reminder before the due date, not after.",
      who: "Sam Carter, Founder, YourBrand",
      notes: [
        "Answers in the first line",
        "A number only they have",
        "Under 60 words, ready to paste",
      ],
      verdict: "Printed · DR 66 · linked",
    },
  },

  profile: {
    eyebrow: "Step one",
    h2a: "We map what you know.",
    h2b: "Then we pitch.",
    lead: "Speed only helps if there’s something good ready to send. One 45-minute call gives us your topics, your real opinions, the numbers only you have, and the topics we’ll never pitch you for.",
    note: "More experts, more requests you can answer. Most clients start with one and add a second by month three.",
    people: [
      {
        k: "Founder",
        name: "Sam Carter",
        rows: [
          {
            k: "Speaks to",
            v: "Cash flow, late payments, running a lean finance team",
          },
          {
            k: "Numbers only they have",
            v: "18,000 invoices a month, average days-to-pay by industry",
          },
          {
            k: "Opinions they’ll defend",
            v: "Payment terms longer than 30 days are a loan you didn’t agree to",
          },
          { k: "Never pitch for", v: "Crypto, investment advice, politics" },
          {
            k: "Voice",
            v: "Short sentences. Uses “customers”, never “users”. Hates jargon.",
          },
        ],
      },
      {
        k: "Head of Product",
        name: "Priya Shah",
        rows: [
          {
            k: "Speaks to",
            v: "Automation for small finance teams, product-led growth",
          },
          {
            k: "Numbers only they have",
            v: "Which reminders get opened, and when",
          },
          {
            k: "Opinions they’ll defend",
            v: "Most finance software is built for accountants, not owners",
          },
          { k: "Never pitch for", v: "AI hype pieces, funding news" },
          {
            k: "Voice",
            v: "Practical, a bit dry. Likes one strong example over a list.",
          },
        ],
      },
      {
        k: "CFO",
        name: "Daniel Okafor",
        rows: [
          {
            k: "Speaks to",
            v: "Forecasting, fundraising readiness, unit economics",
          },
          {
            k: "Numbers only they have",
            v: "Benchmarks from 2,000 small-business customers",
          },
          {
            k: "Opinions they’ll defend",
            v: "Small firms should forecast weekly, not quarterly",
          },
          { k: "Never pitch for", v: "Personal finance, tax tips" },
          {
            k: "Voice",
            v: "Careful, precise, happy to go on record with numbers.",
          },
        ],
      },
    ],
  },

  filter: {
    eyebrow: "What we skip",
    h2a: "We say no a lot.",
    h2b: "That’s the service.",
    lead: "Every request gets checked against your profile and against the outlet. Most don’t make it. Here’s a typical week.",
    requests: [
      {
        ask: "Founders on chasing late payments",
        outlet: "Business daily · DR 66",
        ok: true,
        why: "Right expert, real data, real readers",
      },
      {
        ask: "40+ experts share their top productivity tip",
        outlet: "Lifestyle blog · DR 70",
        ok: false,
        why: "Roundup with 40 sources. One line each, no link",
      },
      {
        ask: "Best crypto to buy this year?",
        outlet: "Finance blog · DR 58",
        ok: false,
        why: "Outside your field. A quote you can’t defend",
      },
      {
        ask: "CFOs on weekly forecasting",
        outlet: "Trade title · DR 61",
        ok: true,
        why: "Exactly the CFO’s profile",
      },
      {
        ask: "Free product for a gift guide",
        outlet: "Deals site · DR 52",
        ok: false,
        why: "Wants a freebie, not an expert",
      },
      {
        ask: "Small-business tools to watch",
        outlet: "Anonymous site · DR 72",
        ok: false,
        why: "Writer has never published a source we sent",
      },
      {
        ask: "How SMEs are using automation",
        outlet: "Tech news site · DR 64",
        ok: true,
        why: "Head of Product’s topic",
      },
      {
        ask: "Quick quote on interest rates",
        outlet: "News site · DR 75",
        ok: false,
        why: "Needs an economist, not a founder",
      },
    ],
    tally: { answered: "3 answered", skipped: "17 skipped", note: "this week" },
  },

  time: {
    eyebrow: "How it runs",
    h2a: "One call to start.",
    h2b: "Then a quick yes per quote.",
    steps: [
      {
        t: "Expertise call",
        us: "We run the call and take notes",
        you: "45 min, once",
        w: 45,
      },
      {
        t: "Profile",
        us: "We write your expertise profile",
        you: "10 min to check it",
        w: 10,
      },
      {
        t: "Finding and filtering",
        us: "We watch our connections and request platforms, every day",
        you: "Nothing",
        w: 0,
      },
      {
        t: "Drafting and approval",
        us: "We draft each quote in your voice, inside the deadline",
        you: "About 2 min per quote",
        w: 2,
      },
      {
        t: "Report",
        us: "Every published quote, with link status",
        you: "5 min to read",
        w: 5,
      },
    ],
    total: "About 30 minutes a month after the first call.",
  },


  fit: {
    eyebrow: "Is this right for you?",
    h2a: "Good fit, bad fit.",
    h2b: "And what it costs.",
    good: [
      "Someone in the business has real, specific expertise and is happy to be named.",
      "They can approve a draft within a few hours when a deadline is open.",
      "You want credibility and links, and you’re fine with modest volume.",
      "You see value in expert mentions even when there’s no link.",
    ],
    bad: [
      "Nobody wants to be named publicly.",
      "You need a fixed number of links every month.",
      "Approvals take days. Deadlines are usually hours.",
    ],
    price: {
      label: "Expert quotes pricing",
      from: "$997",
      unit: "/month",
      plan: "Monthly campaign, no long contract",
      points: [
        "Expertise profile for each expert",
        "Placements through our publishing connections",
        "Hand-picked source requests, answered fast",
        "Monthly report with every published quote",
      ],
      note: "Quotes only? We scope it on delivered placements, not attempts, so a quiet month costs you less.",
    },
  },

  faqHead: {
    eyebrow: "FAQ",
    h2a: "Questions",
    h2b: "about expert quotes.",
    side: "Tell us who’d be quoted and what they know. We’ll tell you which publications cover it, and how many quotes a month is realistic.",
  },

  faqs: [
    {
      q: "Is HARO still worth it?",
      a: "The original open-inbox version mostly isn't. A single request now attracts hundreds of near-identical replies, and many journalists have stopped reading them. What still works is the layer underneath: editors and publishers who know a source will reply quickly, on topic and without needing edits. That's where most of our placements come from. Offers of twenty HARO links a month usually rely on the old approach.",
    },
    {
      q: "How is your expert quote service different from HARO?",
      a: "Standard HARO means answering as many requests as possible. We place most quotes through our own publishing connections, editors who already take expert commentary from us, and we only answer public requests where you're clearly the right expert. Fewer pitches, and a much higher share published.",
    },
    {
      q: "Who writes the quotes, and will they sound like me?",
      a: "Our editorial team drafts each quote from your expertise profile, which captures how you speak and what you think about your field. You approve every quote before it's sent. Most clients edit about one in five, usually by a few words.",
    },
    {
      q: "How many placements will I get each month?",
      a: "Usually two to six, depending on how much your field is in the news. We scope and bill on delivered placements, not attempts. We don't promise a fixed number, because hitting a quota means lowering the standard.",
    },
    {
      q: "What if the journalist doesn’t include a link?",
      a: "It happens with some quotes, and the mention still has value. A named expert quote on a trusted publication builds credibility, and it's the kind of mention AI answers pick up. We report linked and unlinked quotes separately.",
    },
    {
      q: "Do I need to do interviews?",
      a: "Rarely. Nearly all placements are written quotes sent by email. Occasionally a journalist asks for a short call. We brief you first, and you can always decline.",
    },
    {
      q: "Can you quote more than one person from our team?",
      a: "Yes, and it usually helps. We build a profile for each expert, so a founder, a head of product and a CFO can each answer different requests. More experts means more relevant opportunities.",
    },
    {
      q: "What happens in a slow month?",
      a: "We tell you, and you pay only for what was delivered. We won't pad a quiet month with weak outlets. If your field stays quiet for a while, we'll suggest moving budget to digital PR, where we create the story rather than wait for one.",
    },
  ],

  pairs: {
    h2: "Pairs well with",
    items: [
      {
        to: "/services/digital-pr",
        t: "Digital PR",
        d: "When the requests are quiet, we create the story instead.",
      },
      {
        to: "/services/brand-mentions",
        t: "Brand Mentions",
        d: "Named expert quotes are the kind of mention AI answers pick up.",
      },
      {
        to: "/services/link-building",
        t: "Link Building",
        d: "Steady links to the pages you need to rank, alongside the quotes.",
      },
    ],
  },

  close: {
    eyebrow: "Free expertise call",
    h2a: "You know your field.",
    h2b: "Let’s get you quoted for it.",
    d: "On a 15‑minute call we’ll find out what you can speak to, which publications cover it, and how many quotes a month is realistic.",
    primary: "Book the call",
    subject: "Expert quotes enquiry",
  },
};
