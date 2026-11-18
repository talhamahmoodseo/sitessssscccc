import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { asset } from "@/lib/booking";

const BLOG_POSTS = [
  {
    slug: "why-ai-engines-cite-some-brands",
    cover: "Why AI cites some brands",
    title: "Why AI Engines Cite Some Brands and Ignore Others",
    excerpt:
      "We tracked citations across ChatGPT, Claude, and AI Overviews for six months. The pattern is uncomfortable for most SEO playbooks — and great news for anyone doing real digital PR.",
    category: "AI Search",
    date: "Jun 4, 2026",
    read: "8 min",
    glyph: "✦",
    grad: "bg-lilac",
    featured: true,
    body: [
      {
        t: "p",
        c: "Ask ChatGPT who the best provider is in almost any niche and it answers with names. Specific brands, stated with confidence, often with sources attached. Ask it again next week and you mostly get the same names. The interesting question is not whether AI recommends brands — it clearly does — but why it keeps recommending the same ones.",
      },
      {
        t: "p",
        c: "For six months we tracked the answers four engines gave for roughly 40 commercial queries across home services, SaaS, and e-commerce. We logged which brands got named, which sources got cited, and how those changed as the brands ran campaigns. Three patterns showed up over and over.",
      },
      { t: "h2", c: "1. Engines quote sources, not websites" },
      {
        t: "p",
        c: "The brands that appeared in AI answers were almost never the ones with the prettiest sites or even the most backlinks. They were the ones that third-party publications kept talking about. When an engine assembles an answer, it leans on coverage: roundups, comparisons, trade press, local news. If credible sites describe you as a leading option, the engine repeats that framing. If nobody describes you at all, there is nothing to repeat.",
      },
      {
        t: "quote",
        c: "You cannot be the answer if nobody quotable has ever said your name.",
      },
      { t: "h2", c: "2. Context beats volume" },
      {
        t: "p",
        c: 'A single mention that clearly connects your brand to a category — "one of the fastest emergency HVAC responders in Fresno" — did more in our tracking than a dozen bare name-drops in link lists. The engines are language models; they learn associations from sentences, not from anchor text. A mention that explains who you are and what problem you solve gives the model something to say about you.',
      },
      { t: "h2", c: "3. Repetition across independent sources compounds" },
      {
        t: "p",
        c: "One good mention gets you into the conversation. Three consistent mentions on unrelated, trusted sites make you the default. We watched a mid-size SaaS go from absent to named-first in Perplexity answers over four months — the visible change in their footprint was five contextual mentions on industry publications the engine already cited for other queries.",
      },
      { t: "h2", c: "What this means for your strategy" },
      {
        t: "ul",
        c: [
          "Audit where engines already pull answers from in your category — those domains are your target list.",
          "Pitch mentions that describe, not just name. The sentence around your brand is the asset.",
          "Spread placements across independent sources; three sites beat ten pages on one site.",
          "Keep your Google link building running — rankings still feed the machine — but stop treating unlinked mentions as failures. For AI visibility, they are the product.",
        ],
      },
      {
        t: "p",
        c: "Nobody controls what an AI says, and anyone promising guaranteed citations is selling vapor. But the inputs are buildable, and the brands building them now are the ones the engines will keep naming when your buyers ask.",
      },
    ],
  },
  {
    slug: "linked-vs-unlinked-mentions",
    cover: "Unlinked brand mentions",
    title: "Unlinked Brand Mentions: How to Find Them and Turn Them Into Links",
    excerpt:
      "An unlinked mention is your brand named on another site without a link. What they're worth for Google and for AI answers, how to find them, and how to turn the right ones into links.",
    category: "AI Search",
    date: "May 27, 2026",
    updated: "Nov 19, 2026",
    read: "8 min",
    glyph: "\u00b6",
    grad: "bg-butter",
    body: [
      {
        t: "p",
        c: "An unlinked brand mention is any page that names your brand without linking to your site. A trade blog writes \u201ctools like YourBrand\u201d, a podcast recap names your founder, a news story quotes your CEO. The mention is there. The link isn\u2019t.",
      },
      {
        t: "p",
        c: "Every month a client asks some version of the same question: the mention went live but there\u2019s no link, so did we waste it? A few years ago the honest answer was \u201cmostly, yes.\u201d Today it depends on what you want to move: Google\u2019s rankings, or the answers AI tools give about your brand.",
      },
      { t: "h2", c: "Do unlinked mentions help SEO?" },
      {
        t: "p",
        c: "For Google rankings, a little, and not in a way you can count on. Google\u2019s ranking systems still lean on links. A contextual link from a real publication passes authority to one specific page and helps that page rank for specific searches. If your goal is moving a service page from position nine to position three, you need links. No pile of unlinked mentions replaces that.",
      },
      {
        t: "p",
        c: "Mentions still help Google understand who you are. A brand that\u2019s named often, in the right context, is easier to connect to a topic. But you can\u2019t point a mention at a page, and you can\u2019t measure its effect the way you measure a link.",
      },
      { t: "h2", c: "Where unlinked mentions matter more: AI answers" },
      {
        t: "p",
        c: "AI tools don\u2019t count links the way Google does. They learn what to say about a brand from how it\u2019s described across the sources they trust. A sentence on a credible trade site, \u201cYourBrand is known for 24/7 dispatch\u201d, teaches the model an association it can repeat in its answers.",
      },
      {
        t: "p",
        c: "Ahrefs studied 75,000 brands and found that mentions of a brand across the web lined up with AI Overview visibility far more closely than backlinks did: a correlation of 0.664 for mentions, against 0.218 for backlinks. It\u2019s a correlation, not proof, but it matches what we see in client work.",
      },
      {
        t: "p",
        c: "We saw the other side of it on our own brand. In November 2026 we asked ChatGPT, Google AI Mode, Google\u2019s AI Overview and Perplexity 30 questions buyers ask about link building agencies: 120 answers in total. Editorial HQ wasn\u2019t recommended once. When we asked about us directly, one answer described a different company with a similar name and gave us its prices and its reviews. That\u2019s what a thin mention footprint looks like from the inside, and it\u2019s the first thing we\u2019re fixing for ourselves.",
      },
      {
        t: "quote",
        c: "Links are votes for a page. Mentions are sentences about a brand. Google and AI tools count different things.",
      },
      { t: "h2", c: "How to find unlinked mentions of your brand" },
      {
        t: "ul",
        c: [
          "Search Google for your brand, minus your own site: \u201cYourBrand\u201d -site:yourbrand.com. Then add the words buyers use, like \u201cYourBrand review\u201d or \u201cYourBrand alternatives\u201d, to find the mentions people actually read.",
          "Set up a mention tool. Ahrefs Content Explorer, Semrush Brand Monitoring, Brand24 or Mention will alert you when your brand is named. Filter out pages that already link to you.",
          "Search your founder\u2019s name and your product names. Writers often name the person or the product, not the company.",
          "Search the versions people get wrong. Search Console shows what people type to find you. For us it\u2019s searches like \u201chq links\u201d and \u201chq pr\u201d.",
          "Go back through your own press. Every interview, podcast, guest appearance and quote from the last two years. Many of them named you and never linked.",
        ],
      },
      { t: "h2", c: "Which mentions are worth turning into links" },
      {
        t: "p",
        c: "Not every mention deserves an email. We run the same checks we run before placing a link, and three of them decide most cases:",
      },
      {
        t: "ul",
        c: [
          "Does the site get real search traffic, and is the trend steady? A mention on a site nobody visits isn\u2019t worth the ask.",
          "Is it relevant? A trade publication in your industry is worth chasing. A scraper or \u201cwebsite worth\u201d page is not.",
          "Is the page indexed and still live? A link on a page Google doesn\u2019t index passes nothing.",
        ],
      },
      {
        t: "p",
        c: "What\u2019s left is usually a short list: trade publications, reviews, roundups and interviews. Those are the ones to chase.",
      },
      { t: "h2", c: "How to turn a mention into a link" },
      {
        t: "ul",
        c: [
          "Write to the person who wrote it, not the general contact form. Their name is usually on the page.",
          "Keep it short. Thank them for the mention, say which page would help their readers, and give the exact URL. Three or four sentences.",
          "Link to the page that matches what they wrote about. Use your homepage only if they named the brand in general.",
          "Follow up once, a week later. Then leave it.",
          "Keep one sheet: the page, the ask, the date and the answer. After twenty asks you\u2019ll know your real hit rate.",
        ],
      },
      {
        t: "p",
        c: "Many editors won\u2019t reply. The ones who do give you a link on a page that already chose to talk about you, which is about as natural as a link gets. And if a publication\u2019s policy is no links in that kind of article, thank them and move on. The mention still works for AI answers.",
      },
      { t: "h2", c: "How we split a real budget" },
      {
        t: "ul",
        c: [
          "Money pages that need rankings: editorial links with contextual anchors.",
          "Category authority and AI answers: descriptive mentions on the sources AI tools already cite.",
          "Both at once when possible. A feature that links and describes the brand is the best unit of work in this business.",
        ],
      },
      {
        t: "p",
        c: "The report we send clients has two columns where it used to have one: placements that pass authority, and placements that build the mention footprint. Judging the second column by the standards of the first is how good campaigns get cancelled early.",
      },
    ],
  },
  {
    slug: "site-vetting-checklist",
    cover: "The site-vetting checklist",
    title: "The Site-Vetting Checklist That Saves Our Clients Thousands",
    excerpt:
      "DR and traffic numbers lie more often than you think. Here is the exact checklist every domain passes before we place a single link on it.",
    category: "Link Building",
    date: "May 19, 2026",
    read: "7 min",
    glyph: "✓",
    grad: "bg-mint",
    body: [
      {
        t: "p",
        c: "The most expensive links in this industry are the cheap ones. A $60 placement on a site that exists only to sell placements does not just fail to help — it sits in your profile as a flag, and cleaning it up later costs more than doing it right would have. After watching new clients arrive with profiles full of those flags, we made one rule non-negotiable: no site gets a link until someone has checked it by hand.",
      },
      { t: "h2", c: "The checks every prospect passes first" },
      {
        t: "ul",
        c: [
          "Relevance: the site covers your industry, and the article is about the same subject as the page it links to.",
          "What it ranks for: topic-matched searches, not spam, adult, casino or 'net worth' terms.",
          "A healthy trend: 12–24 months of steady or growing visibility, no spikes or collapse after a core update.",
          "The right market: it ranks in the countries you sell in.",
          "Authority that holds up: DR backed by real rankings and editorial referring domains.",
          "Indexing: its recent articles are actually in Google's index.",
          "A real publication: named authors, edited content, no public link price list.",
        ],
      },
      { t: "h2", c: "Then we open the keywords" },
      {
        t: "p",
        c: "This is where most sites fail. A traffic number in an SEO tool is only an estimate, and it tells you nothing until you see what the site ranks for. We have rejected trendifymagazine.com, a high-traffic site whose rankings were mostly spam keywords; metapress.com, a DR 80 site with almost no traffic and an unstable graph; and entrepreneursbreak.com, a DR 57 site with high traffic that ranks for spam keywords, has an unstable graph and works as a link farm. Roughly one in five sites we find gets dropped at this step.",
      },
      {
        t: "quote",
        c: "A link you would be embarrassed to show your client is a link you should not build.",
      },
      { t: "h2", c: "What this costs us — and saves you" },
      {
        t: "p",
        c: "Checking every site by hand is slower. It adds days to every campaign and kills placements we could have billed for. It also means our clients never have to defend a link in their report. In a business running on trust, that trade is not close.",
      },
    ],
  },
  {
    slug: "anatomy-of-a-dr70-placement",
    cover: "Anatomy of a DR 70 placement",
    title: "Anatomy of a DR 70 Placement: From Pitch to Indexed",
    excerpt:
      "A real placement timeline, stripped of client details: 19 days, one rewrite, two indexation checks, and the small moves that make a high-authority link actually count.",
    category: "Link Building",
    date: "May 8, 2026",
    read: "9 min",
    glyph: "↗",
    grad: "bg-sky",
    body: [
      {
        t: "p",
        c: "High-DR placements get talked about like trophies, but the value is in the boring details: where the link sits, what surrounds it, and whether Google ever actually credits it. Here is one placement from a recent campaign, day by day, with the client anonymized.",
      },
      { t: "h2", c: "Days 1–4: the pitch that is not about us" },
      {
        t: "p",
        c: "The target was a DR 70 business publication we had worked with twice before. The pitch was a genuinely useful angle for their readers — a data point from the client’s niche tied to a trend the editor was already covering. The client appears nowhere in the subject line. Editors publish stories, not favors.",
      },
      { t: "h2", c: "Days 5–11: the draft and the rewrite" },
      {
        t: "p",
        c: "First draft placed the link in paragraph two with a commercial anchor. The editor pushed back — correctly. The rewrite moved it to paragraph four, inside a sentence that would survive with the link removed, on a natural anchor. That is the test we use: if deleting the link breaks the sentence, the link was decoration, and decoration gets stripped in edits.",
      },
      {
        t: "quote",
        c: "The best contextual link reads like the article would be worse without it.",
      },
      { t: "h2", c: "Days 12–19: live, then actually live" },
      {
        t: "p",
        c: "Published on day 12. Most reports stop here; this is where ours starts. Day 13: URL inspection showed the page crawled but the section lazy-loaded — the link was invisible to the first crawl. The publisher’s template was the issue; their dev shipped a fix two days later. Day 17: recrawl requested. Day 19: indexed, link visible in the rendered HTML, logged in the client report with a green dot.",
      },
      { t: "h2", c: "What to take from this" },
      {
        t: "ul",
        c: [
          "Pitch the editor’s readers, never your client.",
          "Anchor and position are negotiations — lose them gracefully, the placement survives.",
          "Indexation is the deliverable. A link Google never renders is a PDF invoice, not a link.",
        ],
      },
    ],
  },
  {
    slug: "tracking-citations-across-ai-engines",
    cover: "Tracking AI citations",
    title: "How We Track Citations Across ChatGPT, Claude & Perplexity",
    excerpt:
      "There is no Search Console for AI answers — so we built a monthly tracking routine instead. The exact queries, cadence, and what counts as a win.",
    category: "AI Search",
    date: "Apr 29, 2026",
    read: "7 min",
    glyph: "◎",
    grad: "bg-lilac",
    body: [
      {
        t: "p",
        c: "Clients can watch their Google rankings move in a dashboard any morning they like. AI visibility has no such dashboard, which is why most agencies either ignore it or hand-wave it. We track it manually, on a fixed routine, and report it monthly next to the ranking data. Here is the routine.",
      },
      { t: "h2", c: "Build the query set once" },
      {
        t: "p",
        c: 'For each client we maintain 10–20 buyer-intent questions — the things a real customer would ask an assistant. "Best X in city." "X vs Y for small teams." "Who should I call for Z." The set stays fixed month to month; consistency is what makes the trend line honest.',
      },
      { t: "h2", c: "Run, log, screenshot" },
      {
        t: "p",
        c: "On the first of the month we run the full set across ChatGPT, Claude, and Google’s AI Overviews. For every answer we log three things: was the brand named, was it cited as a source, and which third-party domains the engine leaned on. Screenshots go in the client folder — when your brand shows up in a ChatGPT answer for a money query, the screenshot is worth more than any chart.",
      },
      {
        t: "quote",
        c: "The domains an engine cites for your category are not trivia. They are next month’s target list.",
      },
      { t: "h2", c: "What counts as a win" },
      {
        t: "ul",
        c: [
          "Named in the answer: the model knows you exist in this category.",
          "Cited as a source: the engine treats your footprint as evidence.",
          "Your placements appearing in its source list: the flywheel is connected.",
        ],
      },
      {
        t: "p",
        c: "Movement is slow, lumpy, and impossible to guarantee — we say that in writing. But after a quarter of consistent placements, the trend line usually starts answering for itself.",
      },
    ],
  },
  {
    slug: "gulf-media-placements",
    cover: "Gulf media placements",
    title: "Gulf Media Placements: The Untapped Authority Channel",
    excerpt:
      "Khaleej Times, Arabian Business, and the regional press most agencies cannot reach — why Gulf media is quietly one of the best authority plays for international brands.",
    category: "Digital PR",
    date: "Apr 17, 2026",
    read: "6 min",
    glyph: "◈",
    grad: "bg-butter",
    body: [
      {
        t: "p",
        c: "Most link builders fish in the same pond: the US/UK publication circuit, where every editor receives two hundred pitches a day and prices climb every quarter. Meanwhile, the Gulf has a set of genuinely authoritative, internationally read publications — Khaleej Times at DR 74, Arabian Business at DR 72, and a tier of strong regional outlets — that most Western agencies simply have no path into.",
      },
      { t: "h2", c: "Why these placements punch above their weight" },
      {
        t: "ul",
        c: [
          "Real newsroom authority — these are decades-old publications with editorial staff, not content farms.",
          "Less pitch saturation — editors actually read well-targeted outreach.",
          "Category breadth — business, real estate, tech, and lifestyle desks that fit most niches.",
          "AI-trusted sources — regional press appears consistently in engine citations for MENA and international queries.",
        ],
      },
      { t: "h2", c: "Who this works for" },
      {
        t: "p",
        c: "Brands expanding into the Gulf get the obvious win: coverage where their customers are. But the quieter case is purely authority-driven — a SaaS or e-commerce brand with no MENA ambitions still benefits from a DR 70+ editorial feature, because authority does not check your shipping zones. We have placed clients in Gulf business press whose only goal was a stronger, more international link profile.",
      },
      {
        t: "quote",
        c: "Everyone is bidding on the same hundred US sites. The arbitrage is in the rooms they cannot get into.",
      },
      { t: "h2", c: "How the process differs" },
      {
        t: "p",
        c: "Relationships matter more, timelines run a little longer, and angles need regional awareness — a straight product plug dies fast. We pitch through editors we have worked with directly for years, which is the honest reason this channel is hard to replicate: it is not a directory you can buy, it is a contact list you earn.",
      },
    ],
  },
];

export { BLOG_POSTS };

/** Search titles and descriptions for the posts, short enough that Google
 *  shows them whole. The post page itself uses `title` and `excerpt`. */
export const POST_SEO: Record<string, { title: string; description?: string }> = {
  "anatomy-of-a-dr70-placement": {
    title: "Anatomy of a DR 70 Placement",
    description:
      "A real placement timeline with client details removed: 19 days, one rewrite, two indexing checks, and the small moves that make a high-authority link count.",
  },
  "gulf-media-placements": {
    title: "Gulf Media Placements: An Untapped Channel",
    description:
      "Khaleej Times, Arabian Business and the regional press most agencies can't reach, and why Gulf media is a strong authority play for international brands.",
  },
  "linked-vs-unlinked-mentions": {
    title: "Unlinked Brand Mentions: How to Convert Them",
    description:
      "What unlinked brand mentions are, what they do for Google and AI answers, and the steps we use to find them and turn the right ones into links.",
  },
  "site-vetting-checklist": {
    title: "Our Site-Vetting Checklist for Every Link",
  },
  "tracking-citations-across-ai-engines": {
    title: "Tracking Citations in ChatGPT & Perplexity",
  },
  "why-ai-engines-cite-some-brands": {
    title: "Why AI Engines Cite Some Brands, Not Others",
    description:
      "We tracked citations across ChatGPT, Claude and AI Overviews for six months. The pattern is bad news for most SEO playbooks, and good news for real digital PR.",
  },
};
