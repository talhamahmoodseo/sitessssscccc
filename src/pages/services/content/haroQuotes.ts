/** Content for /services/haro-links. Plan §4.4. */

export const haroQuotes = {
  eyebrow: "HARO & Expert Quotes",
  h1: { pre: "Expert quotes that sound", em: "like you said them", post: "." },
  sub: "A managed pipeline of source placements built on journalist relationships and a documented profile of your expertise — not a volunteer pitching every query that lands in an inbox.",

  proof: [
    {
      custom: "DR 65+",
      label: "Two placements in month one on a typical start",
    },
    {
      v: 2,
      prefix: "",
      suffix: "–6",
      label: "Quality placements per month, scoped on delivered",
    },
    {
      v: 100,
      suffix: "%",
      label: "Quotes approved by you before they are sent",
    },
  ],

  problem: {
    heading: { pre: "HARO became a", em: "volume game nobody wins" },
    paras: [
      "When the platforms got popular, response volume exploded. A journalist posting a query now receives several hundred replies within hours, most of them generic, most of them clearly written by someone who did not read the question. Editors started ignoring the inbox entirely.",
      "The agencies servicing it responded by sending more. More replies, faster, with less care — which is exactly what broke the channel. If you have tried HARO and got nothing, this is why, and it was not your fault.",
      "The channel still works, but only through the back door: journalists who know the source is reliable, an expertise profile that lets us answer within minutes with something specific, and the discipline to skip the eighty percent of queries where you are not genuinely the right expert.",
    ],
  },

  deliverables: [
    {
      t: "Expertise profile",
      d: "A documented map of what you can speak to credibly, with your actual positions and phrasing — the thing that makes a fast reply sound like you rather than like anyone.",
    },
    {
      t: "Query monitoring",
      d: "Source platforms plus direct journalist requests, filtered against your profile. We skip the ones where you are not genuinely the right voice.",
    },
    {
      t: "Drafted responses, in your voice",
      d: "Written from the profile, specific to the question asked, and sent inside the window that matters. You approve every one.",
    },
    {
      t: "Direct journalist relationships",
      d: "The placements that actually land come from writers who have used you before and know you reply well. We build that list deliberately.",
    },
    {
      t: "Speed where it counts",
      d: "Most source queries are answered in the first hour. Our profile approach is what makes a considered reply possible that fast.",
    },
    {
      t: "Placement reporting",
      d: "Every published quote with the outlet, DR, link status and the question that earned it.",
    },
  ],

  ledger: {
    standards: [
      {
        label: "You are genuinely the right expert",
        detail:
          "If the question needs an expertise you do not have, we skip it. Stretching produces quotes that embarrass you and burn the journalist relationship.",
      },
      {
        label: "The outlet has real readers",
        detail:
          "Same traffic and editorial bar as every other placement. A quote in a dead publication is a quote nobody reads.",
      },
      {
        label: "Attribution that identifies you",
        detail:
          "Named, with your title and company. 'An industry expert said' does nothing for you.",
      },
      {
        label: "A question you can answer specifically",
        detail:
          "Generic questions produce generic quotes that get cut. We prioritise queries where a specific answer is possible.",
      },
      {
        label: "Journalist history",
        detail:
          "We track which writers actually publish their sources. Some collect quotes and never use them.",
      },
    ],
    rejections: [
      {
        site: "Roundup query, 40+ sources",
        metric: "DR 70",
        reason:
          "High authority, but a listicle collecting forty quotes gives each one a single line and no link. Volume play for the publisher, nothing for the source.",
      },
      {
        site: "Query outside the client's field",
        metric: "DR 68",
        reason:
          "Tempting authority on a topic the client could have bluffed. We skipped it. A quote you cannot defend in a follow-up call is a liability.",
      },
      {
        site: "Journalist with no publish history",
        metric: "DR 72",
        reason:
          "We had sourced four previous quotes to this writer and none were ever published. The relationship was not reciprocal, so we stopped spending the client's time on it.",
      },
    ],
  },

  process: [
    {
      n: "01",
      t: "Expertise session",
      d: "Forty-five minutes mapping what you can speak to, your real positions, and the phrases you naturally use. Everything downstream depends on this being honest rather than aspirational.",
      you: "One 45-minute call.",
    },
    {
      n: "02",
      t: "Profile build",
      d: "We turn the session into a working document — topics, positions, proof points, voice notes — that lets us draft a credible answer in minutes instead of days.",
      you: "Read it and correct anything that is not how you would put it.",
    },
    {
      n: "03",
      t: "Monitoring and filtering",
      d: "We watch the platforms and our direct journalist list, and filter hard. Most weeks we skip far more than we answer.",
      you: "Nothing.",
    },
    {
      n: "04",
      t: "Draft and approve",
      d: "We draft inside the response window and send it to you. Most clients approve in a line. Nothing goes out with your name on it unapproved.",
      you: "A quick yes, usually within the hour.",
    },
    {
      n: "05",
      t: "Placement and follow-on",
      d: "We report what published and keep the writer relationship warm — the second quote at the same outlet is far easier than the first.",
      you: "Read the report.",
    },
  ],

  example: {
    label: "Fintech SaaS · founder as source · 4 months",
    headline: "Two DR 65+ quotes in month one, after a year of nothing",
    facts: [
      { k: "Placements", v: "11" },
      { k: "Average DR", v: "63" },
      { k: "Month-one placements", v: "2" },
      { k: "Queries answered", v: "34" },
      { k: "Queries skipped", v: "180+" },
    ],
    series: [0, 2, 4, 7, 9, 11],
    seriesLabel: "Cumulative published quotes, months 0–5",
    takeaway:
      "The ratio is the point: 34 answered against 180+ skipped. The previous vendor had answered everything and landed three placements in a year. Filtering harder produced nearly four times the result from a fifth of the sends.",
    caseHref: "/case-studies/b2b-saas-ai-visibility",
  },

  fit: {
    good: [
      "Someone in the business has genuine, specific expertise and is happy to be named.",
      "That person can approve a draft within a few hours when a window is open.",
      "You want authority and credibility, and you accept the volume is modest.",
      "You see value in unlinked expert mentions as well as linked ones.",
    ],
    bad: [
      "Nobody internally wants to be publicly named as a source.",
      "You need a fixed number of placements per month — request volume varies and we scope on delivered, not promised.",
      "Approvals take days. The window is usually hours.",
      "You want quotes written about topics nobody internally actually knows well.",
    ],
  },

  faqs: [
    {
      q: "Isn't HARO dead?",
      a: "The free-for-all version is, and deservedly. A query now gets hundreds of near-identical replies and most journalists have stopped reading the inbox. What still works is the relationship layer underneath: writers who know a source replies fast, on topic and without needing edits. We run that layer, which is why our volume is low and our placement rate is not. If an agency is promising you twenty HARO links a month, they are running the dead version.",
    },
    {
      q: "Who actually writes the quotes — will they sound like me?",
      a: "Our editorial team drafts from your expertise profile, which is built specifically to capture how you phrase things and what you actually believe. You approve every quote before it leaves, and most clients edit perhaps one in five by a few words. The profile session in step one is the whole reason this works; without it you get generic copy with your name attached, which is the failure mode everyone has experienced.",
    },
    {
      q: "How many placements will I get per month?",
      a: "Typically two to six, depending on how much your sector is being written about. We scope and bill on delivered placements rather than attempts, so a quiet month costs you less. We will not quote a fixed number because request volume is outside anyone's control and a promise would mean lowering the bar to hit it.",
    },
    {
      q: "What if the journalist does not include a link?",
      a: "Roughly a third of published quotes are unlinked. That is still a win worth having: a named expert mention on a credible publication is precisely the signal AI answer engines use to decide who to cite, and it builds the entity associations that help you elsewhere. We report linked and unlinked separately so you can judge the mix.",
    },
    {
      q: "Do I need to be available for interviews?",
      a: "Rarely. The large majority of placements are written quotes handled over email. Occasionally a journalist wants a short call, and we brief you beforehand — it is always your choice and declining costs nothing.",
    },
    {
      q: "How fast do I need to approve?",
      a: "Within a few hours is ideal; same day usually works. Source queries close fast and a brilliant quote sent a day late is simply unused. If approvals are genuinely slow on your side, we can agree a standing approval for topics squarely inside your profile.",
    },
    {
      q: "Can you use multiple people from our team?",
      a: "Yes, and it usually improves results. We build a separate profile for each person — a founder, a head of engineering and a head of customer success can each answer different queries credibly, which widens the pool considerably.",
    },
    {
      q: "What happens in a slow month?",
      a: "We tell you, and you pay for what was delivered. We would rather report a quiet month than pad it with placements on weak outlets to hit a number. If a sector stays quiet for a sustained period we will say so and suggest moving budget to digital PR, where we create the story instead of waiting for the query.",
    },
  ],
};
