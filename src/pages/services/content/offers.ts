/** Copy for the three link building offer pages:
 *  /services/guest-posting, /services/niche-edits and
 *  /services/white-label-link-building.
 *
 *  Keywords come from docs/seo/editorialhq-keyword-map.xlsx (Semrush, US).
 *  The primary keyword sits in the title, URL and H1; the secondary keywords
 *  sit in the section headings and FAQ questions.
 *
 *  Proof used here is real: the agency partner case (cases.ts), the sites we
 *  rejected (linkBuilding.ts → gap), "about one in five sites fails" (the
 *  homepage process and pricing FAQ), and the live times on the link
 *  building page. Prices come from src/lib/pricing.ts only. */
import { PER_LINK, PLANS, TRIAL_PRICE, planPrice, usd } from "@/lib/pricing";
import type { FitPriceContent } from "../common";

export type OfferVisual =
  | {
      kind: "article";
      site: string;
      tag: string;
      title: string;
      before: string;
      link: string;
      after: string;
      note: string;
    }
  | {
      kind: "report";
      title: string;
      rows: { site: string; dr: number; anchor: string; status: string }[];
      note: string;
    };

export type Offer = {
  slug: string;
  name: string;
  seo: { title: string; description: string };
  schema: { name: string; serviceType: string; offer: string };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    lead: string;
    primary: string;
    proof: string;
    visual: OfferVisual;
  };
  included: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    lead: string;
    items: { t: string; d: string }[];
  };
  process: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    lead: string;
    steps: { t: string; d: string }[];
    note: string;
  };
  standards: { eyebrow: string; h2a: string; h2b: string };
  compare: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    lead: string;
    cols: [string, string];
    rows: { k: string; a: string; b: string }[];
    /** which column this page sells, highlighted */
    ours: 0 | 1;
  };
  cases: { tag: "link-building" | "agency"; title: string; soft: string };
  fit: FitPriceContent;
  faqHead: { eyebrow: string; h2a: string; h2b: string; side: string };
  faqs: { q: string; a: string }[];
  pairs: { h2: string; items: { to: string; t: string; d: string }[] };
  close: {
    eyebrow: string;
    h2a: string;
    h2b: string;
    d: string;
    primary: string;
    subject: string;
  };
};

/* --------------------------- shared by all three --------------------------- */

/** The 7-Point Site Check in short, plus one real site we turned down. */
export const STANDARDS = {
  lead: "DR tells you how many links point at a site. It doesn't tell you if anyone reads it. So before a site gets your link, someone on our team opens the data and checks seven things. About one in five sites fails, however good its DR looks.",
  checks: [
    "Covers your industry",
    "Ranks for real keywords in its topic",
    "Steady search visibility for 12+ months",
    "Ranks in the countries you sell in",
    "Authority that matches its rankings",
    "Pages indexed by Google",
    "A real publication, not a link shop",
  ],
  example: {
    k: "A real site we turned down",
    domain: "metapress.com",
    facts: [
      { k: "Domain Rating", v: "80", bad: false },
      { k: "Organic traffic", v: "Almost none", bad: true },
      { k: "Visibility graph", v: "Up and down every month", bad: true },
    ],
    verdict: "Rejected. DR 80 with almost no readers.",
  },
  more: "See the full 7-Point Site Check",
  moreTo: "/services/link-building#site-check",
};

/** Guest post vs niche edit, used on both of those pages. */
const GP_VS_NE: Offer["compare"]["rows"] = [
  {
    k: "What it is",
    a: "A new article, written for the site's readers, with your link in the body",
    b: "Your link added to an article that's already published and indexed",
  },
  { k: "Typical DR", a: "40–70", b: "35–65" },
  { k: "Live in", a: "2–4 weeks", b: "1–2 weeks" },
  {
    k: "Best for",
    a: "Building authority to service pages and blog content over time",
    b: "Pushing pages that sit in positions 8–20",
  },
  {
    k: "Content",
    a: "We write the whole article",
    b: "We write the sentence or short paragraph that carries the link",
  },
  { k: "Price", a: `${usd(PER_LINK)} a link`, b: `${usd(PER_LINK)} a link` },
];

const PRICE_POINTS = [
  "DR 40+ site in your niche, checked by hand",
  "Content written for you",
  "Free replacement if the link drops",
  "100% money-back guarantee",
];

const PLAN_LINE = `One trial link, or packages of 3, 5 or 10 (${planPrice(PLANS[0])}, ${planPrice(PLANS[1])}, ${planPrice(PLANS[2])})`;

const REPLACE_FAQ = {
  q: "What if the publisher removes my link later?",
  a: "Every link is covered by our replacement guarantee. If a publisher removes it or turns it nofollow, we replace it on a site of the same or higher DR, free. The full terms are on the pricing page.",
};

/* ------------------------------- guest posting ------------------------------ */

const guestPosting: Offer = {
  slug: "guest-posting",
  name: "Guest Posting",
  seo: {
    title: "Guest Posting Services on Real, Vetted Sites",
    description: `Guest posting services with real outreach: sites in your niche checked by hand, articles written for you, your link in the body. ${usd(PER_LINK)} a post.`,
  },
  schema: {
    name: "Guest Posting Services",
    serviceType: "Guest posting",
    offer: "Per guest post, written and published, or in packages of 3, 5 or 10 links.",
  },
  hero: {
    eyebrow: "Guest posting services",
    h1a: "Guest posts on sites",
    h1b: "people actually read.",
    lead: "We find sites in your niche that still get real traffic from Google, pitch the editor, write the article and get it published with your link in the body. Then we track it until Google indexes it.",
    primary: "Book a strategy call",
    proof: "Trusted by CapCut, SmileTutor, Ocuco and Defender",
    visual: {
      kind: "article",
      site: "growth•••weekly.com",
      tag: "New article",
      title: "How small SaaS teams are rethinking their sales pipeline",
      before:
        "Most early-stage teams start with a spreadsheet, and that works until the third salesperson joins. At that point, ",
      link: "a simple CRM built for small teams",
      after:
        " saves more time than any new hire. The trick is picking one your team will actually open every morning.",
      note: "your link, in the body of the article",
    },
  },
  included: {
    eyebrow: "What's included",
    h2a: "Our guest post service,",
    h2b: "start to finish.",
    lead: "You tell us which pages you want to rank. Everything after that is our job.",
    items: [
      {
        t: "Sites picked for your niche",
        d: "Each site has to cover your industry and rank for real searches in it. A relevant DR 40 beats an unrelated DR 80.",
      },
      {
        t: "Outreach done for you",
        d: "We contact the editors, agree the topic and handle every follow-up. You never write a pitch email.",
      },
      {
        t: "The article, written for you",
        d: "Our writers write to the site's own standards, around your target page. You can read the draft before it goes live.",
      },
      {
        t: "Your link in the body",
        d: "Not in a footer, sidebar or author bio. One link, inside a paragraph about the same thing as your page.",
      },
      {
        t: "Anchor text planned",
        d: "Mostly branded and natural phrases, so your link profile looks like links people earn.",
      },
      {
        t: "Tracked until indexed",
        d: "We check that Google indexes the page. You get the live URL, the site's numbers and the indexing status.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    h2a: "Guest post outreach,",
    h2b: "one site at a time.",
    lead: "No mass emails and no sites picked off a price list because they're cheap. This is how a guest post goes from brief to live.",
    steps: [
      {
        t: "Brief",
        d: "You tell us the pages you want to rank and the market you sell in. Not sure which pages? We'll look at your site and suggest them.",
      },
      {
        t: "Shortlist",
        d: "We find sites in your niche and run each one through the site check. If you want to approve the list first, say so at the start.",
      },
      {
        t: "Pitch",
        d: "We pitch each editor a topic that fits their readers and gives your page a natural place in the article.",
      },
      {
        t: "Write",
        d: "Our writers draft the article. You can review it before we send it to the editor.",
      },
      {
        t: "Live and tracked",
        d: "The post goes live and you get the URL. We keep checking until Google has indexed it.",
      },
    ],
    note: "Most guest posts go live in 2–4 weeks.",
  },
  standards: {
    eyebrow: "Where your guest posts go",
    h2a: "Every site is checked by hand.",
    h2b: "DR is checked last.",
  },
  compare: {
    eyebrow: "Guest posts or niche edits?",
    h2a: "Two ways to get a link.",
    h2b: "Pick by the page.",
    lead: "Both put your link inside real content. The difference is speed and how much of the article you control. Most clients use both.",
    cols: ["Guest post", "Niche edit"],
    rows: GP_VS_NE,
    ours: 0,
  },
  cases: {
    tag: "link-building",
    title: "Guest posts behind",
    soft: "real rankings.",
  },
  fit: {
    eyebrow: "Guest post pricing",
    h2a: "Who it's for,",
    h2b: "and what it costs.",
    good: [
      "You have service or product pages that need authority to reach page one.",
      "Your content is solid and your site is in decent technical shape.",
      "You can give it three months. Links take time to count.",
      "You want to see every site with its real numbers, not a list of DRs.",
    ],
    bad: [
      "You want bulk posts on general 'write for us' sites.",
      "You need rankings this month.",
      "Your target pages are thin. Links to a weak page are wasted.",
      "You're in gambling, adult or similar niches.",
    ],
    price: {
      label: "Guest posts",
      from: usd(PER_LINK),
      unit: "a post",
      plan: PLAN_LINE,
      note: "Guest posts and niche edits cost the same. DR 70+ sites and bigger monthly volumes are quoted as a custom package.",
      points: PRICE_POINTS,
    },
  },
  faqHead: {
    eyebrow: "Guest posting FAQ",
    h2a: "Questions about",
    h2b: "guest posting services.",
    side: "Tell us the page you want to rank. On the call we'll show you the kind of sites we'd go after for it.",
  },
  faqs: [
    {
      q: "What are guest posting services?",
      a: "You pay a team to get articles with your link published on other sites in your niche. A good guest posting service does the whole job: finds the sites, checks them, pitches the editor, writes the article and makes sure the link gets indexed. A bad one sells you a spot on a list of sites that publish anything for money.",
    },
    {
      q: "Is guest posting still worth it?",
      a: "Yes, on the right sites. A guest post on a site with real readers in your niche still helps a page rank. What stopped working is the bulk version: dozens of posts on general sites that publish for anyone who pays. Google is good at ignoring those links, so they cost money and do nothing.",
    },
    {
      q: "What's the difference between guest post outreach and buying a guest post?",
      a: "Buying a guest post usually means picking a site from a list and paying its price. Guest post outreach means contacting editors in your niche, pitching a topic that fits their readers and earning the spot. We use our own publisher relationships and fresh outreach, and every site passes the same check either way.",
    },
    {
      q: "Do you pay publishers for guest posts?",
      a: "Some publishers charge an editorial fee, which is common across the industry. We avoid any site that advertises link prices publicly, because that's exactly the pattern Google looks for.",
    },
    {
      q: "How long does a guest post take to go live?",
      a: "Usually 2–4 weeks from the order. Google normally indexes the page within a few weeks after that. Pages already ranking in positions 5–20 tend to move between months two and four.",
    },
    {
      q: "Can I choose the sites?",
      a: "We choose them, because the site check is the core of the service. But you can approve the shortlist before anything is pitched. Tell us at the start and we'll send it.",
    },
    {
      q: "Do you offer guest posting outreach for agencies?",
      a: "Yes. Agencies get the same sites and the same check, with reports under their own brand, and we never contact their clients. See our white label link building page for how it works.",
    },
    {
      q: "How much do guest posting services cost?",
      a: `Each guest post is ${usd(PER_LINK)}, written and published. Packages are 3, 5 or 10 links (${planPrice(PLANS[0])}, ${planPrice(PLANS[1])} or ${planPrice(PLANS[2])}), and you can start with a single trial post for ${usd(TRIAL_PRICE)}. Every order is covered by our money-back guarantee.`,
    },
    REPLACE_FAQ,
  ],
  pairs: {
    h2: "More from link building",
    items: [
      {
        to: "/services/link-building",
        t: "Link Building Services",
        d: "The full service: guest posts, niche edits and authority placements, planned around your pages.",
      },
      {
        to: "/services/niche-edits",
        t: "Niche Edits",
        d: "Your link added to articles that are already indexed and ranking. Live in 1–2 weeks.",
      },
      {
        to: "/services/white-label-link-building",
        t: "White Label Link Building",
        d: "For agencies: the same guest posts, under your brand, with no contact with your clients.",
      },
    ],
  },
  close: {
    eyebrow: "Free link audit",
    h2a: "Tell us the page",
    h2b: "you want to rank.",
    d: "On a 30-minute call we look at that page, the sites linking to your competitors and what it would take to move it. Then you decide.",
    primary: "Book a strategy call",
    subject: "Guest posting enquiry",
  },
};

/* -------------------------------- niche edits ------------------------------- */

const nicheEdits: Offer = {
  slug: "niche-edits",
  name: "Niche Edits",
  seo: {
    title: "Niche Edits: Links in Articles Google Trusts",
    description: `Niche edits service: your link added to aged, indexed articles on sites in your niche, checked by hand. Live in 1–2 weeks. ${usd(PER_LINK)} a link.`,
  },
  schema: {
    name: "Niche Edits Service",
    serviceType: "Niche edits / link insertion",
    offer: "Per niche edit link, or in packages of 3, 5 or 10 links.",
  },
  hero: {
    eyebrow: "Niche edits service",
    h1a: "Niche edits in articles",
    h1b: "Google already trusts.",
    lead: "We find articles in your niche that are already indexed, already ranking and already getting read. Then we get your link added to a sentence that belongs there. The page has history, so Google usually picks the link up faster than one in a new post.",
    primary: "Book a strategy call",
    proof: "Trusted by CapCut, SmileTutor, Ocuco and Defender",
    visual: {
      kind: "article",
      site: "marketing•••lab.com",
      tag: "Updated article · first published 2022",
      title: "The 12 best email outreach tools, tested",
      before:
        "We tested every tool on the same 500-contact campaign. Deliverability was the biggest difference between them. For teams that also need pipeline tracking, ",
      link: "this all-in-one sales platform",
      after:
        " keeps outreach and follow-ups in one place, which is why it made our shortlist.",
      note: "the sentence we added",
    },
  },
  included: {
    eyebrow: "What's included",
    h2a: "Every niche edit link",
    h2b: "is checked twice.",
    lead: "Once for the site, once for the page. A good site with a dead page is still a dead page.",
    items: [
      {
        t: "A site that passes the check",
        d: "The site covers your industry, ranks for real searches and has steady visibility. Same seven checks as every link we build.",
      },
      {
        t: "A page that already ranks",
        d: "We look at the article itself: indexed, getting search traffic and ranking for keywords close to your topic.",
      },
      {
        t: "A sentence that belongs there",
        d: "We write the line or short paragraph that carries your link, so it reads like part of the article. The editor approves it.",
      },
      {
        t: "No crowded pages",
        d: "We skip articles already full of commercial links. Your link shouldn't be the tenth one in a list of sponsors.",
      },
      {
        t: "Anchor text planned",
        d: "Mostly branded and natural phrases, matched to the sentence, so the link reads the way an editor would write it.",
      },
      {
        t: "Free replacement",
        d: "If the link is removed or turned nofollow, we replace it on a site of the same or higher DR. Free.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    h2a: "Link insertion,",
    h2b: "step by step.",
    lead: "Niche edits are fast, but the checking isn't. This is what happens between your brief and a live link.",
    steps: [
      {
        t: "Brief",
        d: "You tell us the pages you want to push and the market you sell in. Pages sitting in positions 8–20 are the best fit.",
      },
      {
        t: "Find the articles",
        d: "We look for published articles in your niche that rank for terms close to your page.",
      },
      {
        t: "Check site and page",
        d: "The site goes through the 7-point check. The page has to be indexed, getting traffic and not crowded with other links.",
      },
      {
        t: "Agree the edit",
        d: "We write the sentence with your link and agree it with the editor, so it fits the article.",
      },
      {
        t: "Live and tracked",
        d: "You get the URL and the page's numbers. We check that Google picks up the change.",
      },
    ],
    note: "Most niche edits go live in 1–2 weeks.",
  },
  standards: {
    eyebrow: "Where your niche edits go",
    h2a: "Real sites, real articles.",
    h2b: "Checked before you pay.",
  },
  compare: {
    eyebrow: "Niche edits vs guest posts",
    h2a: "Which one does",
    h2b: "your page need?",
    lead: "Both put your link inside real content. Niche edits are faster and land on pages with history. Guest posts give you more control over the article. Most clients use both.",
    cols: ["Guest post", "Niche edit"],
    rows: GP_VS_NE,
    ours: 1,
  },
  cases: {
    tag: "link-building",
    title: "Links that helped pages",
    soft: "climb to the top.",
  },
  fit: {
    eyebrow: "Niche edit pricing",
    h2a: "Who it's for,",
    h2b: "and what it costs.",
    good: [
      "You have pages in positions 8–20 that need a push.",
      "You want links on pages with history, not brand-new posts.",
      "Your target pages have real content worth linking to.",
      "You'd rather see every page and its numbers before it goes live.",
    ],
    bad: [
      "You want hundreds of cheap link insertions.",
      "You need rankings this month.",
      "Your target pages are thin. Links to a weak page are wasted.",
      "You're in gambling, adult or similar niches.",
    ],
    price: {
      label: "Niche edits",
      from: usd(PER_LINK),
      unit: "a link",
      plan: PLAN_LINE,
      note: "Niche edits and guest posts cost the same. DR 70+ sites and bigger monthly volumes are quoted as a custom package.",
      points: PRICE_POINTS,
    },
  },
  faqHead: {
    eyebrow: "Niche edits FAQ",
    h2a: "Questions about",
    h2b: "niche edits.",
    side: "Send us the page you want to push. On the call we'll tell you whether niche edits or guest posts make more sense for it.",
  },
  faqs: [
    {
      q: "What are niche edits?",
      a: "A niche edit is a link added to an article that's already published, instead of a new article written for the link. People also call it a link insertion or a curated link. The article is in your niche, it's indexed, and the link goes into a sentence where it makes sense.",
    },
    {
      q: "Niche edits vs guest posts: which is better?",
      a: "Neither is better on its own. Niche edits are faster and land on pages with history, so they suit pages in positions 8–20 that need a push. Guest posts give you more control over the content around the link, so they suit building authority over time. Most of our clients use both.",
    },
    {
      q: "Is it safe to buy niche edits?",
      a: "It depends on where they go. A niche edit on a real, relevant article is one of the most natural links you can get, because it sits in content that already earned its place. The risk is in link farms, hacked sites and pages stuffed with paid links. That's what our site check filters out. No one can promise how Google will act, but we don't place links on those sites.",
    },
    {
      q: "How fast do niche edit links work?",
      a: "Most go live in 1–2 weeks. Because the page is already indexed, Google usually picks up the link faster than one in a new post. Ranking movement still takes weeks to months, like any link.",
    },
    {
      q: "Do you sell niche edits from a fixed list?",
      a: "No. We have publisher relationships, but we don't sell from a menu. Each order starts from your pages: we look for articles that fit them, then check each one. A list that sells to everyone ends up linking to everyone.",
    },
    {
      q: "Do you offer contextual link building services?",
      a: "Yes. It's all we build. Every link, niche edit or guest post, sits inside the body of an article about the same subject as your page. No footers, sidebars, author bios or link pages.",
    },
    {
      q: "How much do niche edits cost?",
      a: `Each niche edit is ${usd(PER_LINK)}, the same as a guest post. Packages are 3, 5 or 10 links (${planPrice(PLANS[0])}, ${planPrice(PLANS[1])} or ${planPrice(PLANS[2])}), and you can start with a single trial link for ${usd(TRIAL_PRICE)}. Every order is covered by our money-back guarantee.`,
    },
    REPLACE_FAQ,
  ],
  pairs: {
    h2: "More from link building",
    items: [
      {
        to: "/services/link-building",
        t: "Link Building Services",
        d: "The full service: guest posts, niche edits and authority placements, planned around your pages.",
      },
      {
        to: "/services/guest-posting",
        t: "Guest Posting",
        d: "New articles on sites in your niche, written for their readers, with your link in the body.",
      },
      {
        to: "/services/white-label-link-building",
        t: "White Label Link Building",
        d: "For agencies: the same niche edits, under your brand, with no contact with your clients.",
      },
    ],
  },
  close: {
    eyebrow: "Free link audit",
    h2a: "Got a page stuck",
    h2b: "on page two?",
    d: "Send it to us. On a 30-minute call we'll look at what's holding it back and whether a few niche edits would move it.",
    primary: "Book a strategy call",
    subject: "Niche edits enquiry",
  },
};

/* ---------------------------- white label link building --------------------- */

const whiteLabel: Offer = {
  slug: "white-label-link-building",
  name: "White Label Link Building",
  seo: {
    title: "White Label Link Building for SEO Agencies",
    description: `White label link building for agencies: guest posts and niche edits on sites checked by hand, unbranded reports, and we never contact your clients. ${usd(PER_LINK)} a link.`,
  },
  schema: {
    name: "White Label Link Building",
    serviceType: "White label link building",
    offer: "Per link, the same price as our direct clients. Bigger monthly volumes are quoted as a custom package.",
  },
  hero: {
    eyebrow: "White label link building",
    h1a: "Your clients get the links.",
    h1b: "You keep the credit.",
    lead: "We work as the link building team behind your agency. The same site check we use for our own clients, reports with no trace of us, and no contact with your clients. Ever.",
    primary: "Book an agency call",
    proof: "120+ placements delivered under one agency partner's brand, across 9 niches",
    visual: {
      kind: "report",
      title: "Link report · Your agency",
      rows: [
        { site: "saas•••insider.com", dr: 62, anchor: "crm for startups", status: "Live · indexed" },
        { site: "growth•••weekly.com", dr: 57, anchor: "Client brand", status: "Live · indexed" },
        { site: "marketing•••lab.com", dr: 54, anchor: "sales pipeline tool", status: "Live" },
        { site: "b2b•••review.io", dr: 66, anchor: "this guide", status: "In review" },
      ],
      note: "your logo, not ours",
    },
  },
  included: {
    eyebrow: "What's included",
    h2a: "White label link building services,",
    h2b: "built for agencies.",
    lead: "You keep the strategy and the client. We do the part that eats your team's week.",
    items: [
      {
        t: "Your brand on everything",
        d: "Reports carry your logo, or no logo at all. Our name doesn't appear in reports, emails or files.",
      },
      {
        t: "No contact with your clients",
        d: "You own the relationship. We talk to you and only you.",
      },
      {
        t: "One brief per client",
        d: "Niche, target pages and anchor rules agreed once, then reused for every order, so each batch fits the client's profile.",
      },
      {
        t: "The same site check",
        d: "Every site passes the 7-point check, so you never have to defend a placement on a client call.",
      },
      {
        t: "Content written for you",
        d: "Articles written to each publisher's standards and in your client's voice. Guest posts and niche edits.",
      },
      {
        t: "Guarantees that pass through",
        d: "Free replacement if a link drops, and the same money-back guarantee our direct clients get.",
      },
    ],
  },
  process: {
    eyebrow: "How it works",
    h2a: "How to outsource link building",
    h2b: "without the risk.",
    lead: "One spammy site in a client's report can cost you the account. This is how we make sure that never comes from us.",
    steps: [
      {
        t: "Send the brief",
        d: "Your client's site, target pages, market and any anchor rules. One brief per client, reused for every order.",
      },
      {
        t: "Shortlist and check",
        d: "We find sites in the client's niche and run each one through the site check. You can approve the list before we start.",
      },
      {
        t: "Write and place",
        d: "We write the content and get it published. Guest posts, niche edits or a mix.",
      },
      {
        t: "You get the report",
        d: "Live URLs, DR, anchors, target pages and indexing status, in a sheet you can forward without editing.",
      },
      {
        t: "Order again",
        d: "Monthly, per client, or whenever a client needs it. The brief carries over.",
      },
    ],
    note: "First links usually go live about three weeks after the first call.",
  },
  standards: {
    eyebrow: "Quality you can put your name on",
    h2a: "Every site is checked by hand,",
    h2b: "for every client.",
  },
  compare: {
    eyebrow: "In-house or outsourced",
    h2a: "Build a link team,",
    h2b: "or borrow ours.",
    lead: "If you need links every week for dozens of clients, hiring can make sense. Below that, outsourcing link building services gets you a trained team without the salary.",
    cols: ["Building it in-house", "Outsourcing to us"],
    rows: [
      {
        k: "Getting started",
        a: "Hire, train and pay for tools. Usually months",
        b: "Send a brief. First links in about three weeks",
      },
      {
        k: "Site quality",
        a: "Depends on who you hire",
        b: "Every site passes the same 7-point check",
      },
      {
        k: "Publisher contacts",
        a: "Built from scratch",
        b: "Existing publisher relationships, plus fresh outreach",
      },
      {
        k: "When a client leaves",
        a: "The salary stays",
        b: "You order less that month",
      },
      {
        k: "Your brand",
        a: "Yours",
        b: "Yours. Ours never shows",
      },
    ],
    ours: 1,
  },
  cases: {
    tag: "agency",
    title: "120+ placements.",
    soft: "Zero mentions of us.",
  },
  fit: {
    eyebrow: "White label pricing",
    h2a: "Who it's for,",
    h2b: "and what it costs.",
    good: [
      "You run an SEO or marketing agency and link building is the part that slows you down.",
      "You want one supplier for clients in very different niches.",
      "You need reports you can send on without editing them.",
      "Your clients' sites have real content worth linking to.",
    ],
    bad: [
      "You're looking for the lowest price per link to resell.",
      "Your clients expect rankings within a month.",
      "You need links on sites that sell to anyone.",
      "Your clients are in gambling, adult or similar niches.",
    ],
    price: {
      label: "White label links",
      from: usd(PER_LINK),
      unit: "a link",
      plan: "The same per-link price our direct clients pay",
      note: "Ordering for several clients every month? Tell us the volume and we'll quote it as a custom package.",
      points: [
        "DR 40+ sites, checked by hand for each client",
        "Unbranded reports, ready to forward",
        "No contact with your clients",
        "Free replacement and money-back guarantee",
      ],
    },
  },
  faqHead: {
    eyebrow: "White label FAQ",
    h2a: "Questions about",
    h2b: "white label link building.",
    side: "Tell us about your clients and how you order today. On the call we'll show you a sample report and how the briefs work.",
  },
  faqs: [
    {
      q: "What is white label link building?",
      a: "You sell link building to your clients under your agency's name, and we do the work behind the scenes: find and check the sites, write the content, get the links placed and report back. Your client only ever sees your brand.",
    },
    {
      q: "Will my clients ever find out you did the work?",
      a: "Not from us. Our name isn't in the reports, the files or the emails, and we never contact your clients. One agency partner has had 120+ placements from us, and our name has appeared in her reports zero times.",
    },
    {
      q: "Why outsource link building instead of hiring?",
      a: "A good link builder needs tools, publisher contacts and months of practice before they're reliable. Outsourcing gets you all three from the first order, and you only pay for the links you order. Our agency partners keep the strategy and the client, and we do the placements.",
    },
    {
      q: "Can you handle clients in different niches?",
      a: "Yes. Our agency partner's clients cover 9 niches, from SaaS and legal to travel and education. Each client gets its own brief and its own sites.",
    },
    {
      q: "What's in the white label report?",
      a: "Every link with its live URL, DR, anchor text and target page, plus indexing status, checked every week. It comes as one sheet with your logo or no logo, ready to forward.",
    },
    {
      q: "Do you have a link building reseller program?",
      a: "We don't run a tiered reseller program. Agencies order per client at our standard price, and bigger monthly volumes are quoted as a custom package on a call.",
    },
    {
      q: "Can I try it with one client first?",
      a: `Yes. Order a single trial link for ${usd(TRIAL_PRICE)}, with no minimum order. You get the same check and the same unbranded report, and it's covered by the money-back guarantee.`,
    },
    REPLACE_FAQ,
  ],
  pairs: {
    h2: "What you can resell",
    items: [
      {
        to: "/services/guest-posting",
        t: "Guest Posting",
        d: "New articles on sites in each client's niche, with the link in the body.",
      },
      {
        to: "/services/niche-edits",
        t: "Niche Edits",
        d: "Links added to articles that already rank. The fast option for pages on page two.",
      },
      {
        to: "/services/link-building",
        t: "Link Building Services",
        d: "The full service, including DR 70+ authority placements for the hardest keywords.",
      },
    ],
  },
  close: {
    eyebrow: "For agencies",
    h2a: "Send us one client.",
    h2b: "See how we work.",
    d: "Start with a single trial link. Same check, same report, under your brand. If it's not right, the money-back guarantee covers it.",
    primary: "Book an agency call",
    subject: "White label link building enquiry",
  },
};

export const OFFERS = {
  "guest-posting": guestPosting,
  "niche-edits": nicheEdits,
  "white-label-link-building": whiteLabel,
} satisfies Record<string, Offer>;

export type OfferSlug = keyof typeof OFFERS;
