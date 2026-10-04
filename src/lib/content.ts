import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { asset } from "@/lib/booking";

const CASE_STUDIES = [
  {
    slug: "b2b-saas-ai-visibility",
    client: "B2B SaaS platform",
    industry: "Customer support software",
    duration: "7 months",
    bg: "bg-butter",
    headline: "+212%",
    metric: "organic clicks",
    title: "From invisible to cited everywhere",
    line: "Twelve editorial placements turned a DR 35 site into a source AI engines quote for its category.",
    stats: [
      ["DR 35 → 65", "authority"],
      ["14", "placements"],
      ["3/3", "AI surfaces"],
    ],
    situation: [
      "A support-automation platform with strong product reviews and almost no off-page footprint. Their content team published weekly, but nothing outside their own domain described what they did.",
      "They ranked page two for their category term and appeared in zero AI answers. Buyers researching alternatives were being shown three competitors by name.",
    ],
    blockers: [
      "A link profile built almost entirely from directories and their own press releases.",
      "Two previous vendors had placed links on sites with no organic traffic — a cleanup risk, not an asset.",
      "No third-party source described the product in language a model could repeat.",
    ],
    strategy: [
      {
        t: "Fix the foundation first",
        d: "We audited the existing profile and quietly stopped chasing the terms their thin pages could never hold. Budget moved to two money pages instead of eight.",
      },
      {
        t: "Earn links that read naturally",
        d: "Guest posts and niche edits on support and ops publications, each link inside a sentence that survives without it.",
      },
      {
        t: "Feed the machines that quote",
        d: "Contextual brand mentions on the exact publications ChatGPT and AI Overviews were already citing for their category queries.",
      },
    ],
    work: [
      ["Editorial guest posts", "6"],
      ["Niche edits on aged content", "5"],
      ["Contextual brand mentions", "9"],
      ["HARO expert quotes", "3"],
      ["Domains reviewed and rejected", "31"],
    ],
    outcome: [
      ["+212%", "organic clicks"],
      ["DR 65", "from DR 35"],
      ["#3", "category keyword"],
      ["3/3", "AI surfaces citing them"],
    ],
    placements: [
      ["the•••journal.com", "DR 71", "GUEST POST"],
      ["saas•••weekly.com", "DR 61", "NICHE EDIT"],
      ["tech•••digest.com", "DR 64", "MENTION + LINK"],
      ["b2b•••review.com", "DR 57", "EXPERT QUOTE"],
    ],
    quote: {
      text: "First vendor that showed us every domain before placing. Three months in, ChatGPT started naming us for our category — sales noticed before we told them.",
      who: "Founder · B2B SaaS",
    },
    timeline: [
      {
        m: "Month 1",
        t: "Audit & approval",
        d: "Profile audit, competitor gap, first prospect list signed off.",
      },
      {
        m: "Month 2–4",
        t: "Authority build",
        d: "Guest posts and niche edits on the two money pages.",
      },
      {
        m: "Month 4–6",
        t: "Mention layer",
        d: "Contextual mentions on already-cited sources; citation tracking begins.",
      },
      {
        m: "Month 7",
        t: "Compounding",
        d: "Category keyword hits top three; brand named in AI answers.",
      },
    ],
  },
  {
    slug: "home-services-local-pack",
    client: "Emergency HVAC company",
    industry: "Home services · Fresno, CA",
    duration: "5 months",
    bg: "bg-mint",
    headline: "Top 3",
    metric: "for money keywords",
    title: "Page two to the local pack",
    line: "Local press and niche edits moved the emergency-repair pages past two national directories.",
    stats: [
      ["9", "placements"],
      ["+164%", "calls"],
      ["100%", "indexed"],
    ],
    situation: [
      "A licensed HVAC firm with excellent reviews, beaten on every emergency search by national lead-gen directories that had never fixed a furnace.",
      "The owner measured one thing: the phone. Rankings only mattered as far as they produced calls.",
    ],
    blockers: [
      "Directories with enormous domain authority occupying the top three positions.",
      "A service-area page structure that split relevance across a dozen thin pages.",
      "No local press coverage of any kind.",
    ],
    strategy: [
      {
        t: "Consolidate before building",
        d: "We flagged the thin service-area pages so their developer could merge them — no point pushing authority into pages that split it.",
      },
      {
        t: "Local relevance over raw DR",
        d: "Regional news and community publications beat generic DR 70 blogs for local intent, so that is where we placed.",
      },
      {
        t: "Own the emergency angle",
        d: "Every placement tied the brand to response time — the one thing directories cannot claim.",
      },
    ],
    work: [
      ["Local press features", "3"],
      ["Regional niche edits", "4"],
      ["Trade publication mentions", "2"],
      ["Domains reviewed and rejected", "18"],
    ],
    outcome: [
      ["Top 3", "emergency keywords"],
      ["+164%", "tracked calls"],
      ["100%", "links indexed"],
      ["5 mo", "to local pack"],
    ],
    placements: [
      ["fresno•••daily.com", "DR 58", "FEATURE"],
      ["valley•••biz.org", "DR 52", "MENTION + LINK"],
      ["home•••digest.com", "DR 64", "NICHE EDIT"],
    ],
    quote: {
      text: "I do not read dashboards. I read the phone ringing more than last month. It rings, so we renewed.",
      who: "Owner · HVAC company",
    },
    timeline: [
      {
        m: "Month 1",
        t: "Audit & cleanup plan",
        d: "Page consolidation flagged, local prospect list approved.",
      },
      {
        m: "Month 2–3",
        t: "Local press",
        d: "Regional features and community coverage go live.",
      },
      {
        m: "Month 4",
        t: "Trade layer",
        d: "Industry publications reinforce the response-time angle.",
      },
      {
        m: "Month 5",
        t: "Local pack",
        d: "Emergency terms reach the top three; call volume follows.",
      },
    ],
  },
  {
    slug: "ecommerce-gulf-authority",
    client: "Home & lifestyle e-commerce",
    industry: "E-commerce · UK + GCC",
    duration: "6 months",
    bg: "bg-lilac",
    headline: "4×",
    metric: "referring domains",
    title: "Category pages that finally rank",
    line: "Gulf and trade press coverage rebuilt a thin profile into something Google trusts.",
    stats: [
      ["DR 74", "top outlet"],
      ["21", "placements"],
      ["+88%", "revenue"],
    ],
    situation: [
      "A homeware brand expanding from the UK into the Gulf, with category pages that converted well but never ranked.",
      "Their previous agency had bought volume: 400 links, almost none from sites with a real audience.",
    ],
    blockers: [
      "A bloated profile that needed quality, not quantity, to dilute it.",
      "No presence at all in the region they were expanding into.",
      "Seasonal buying windows that made timing critical.",
    ],
    strategy: [
      {
        t: "Quality to outweigh volume",
        d: "Rather than disavow aggressively, we built a counterweight of genuinely editorial links so the profile average moved up.",
      },
      {
        t: "Enter the region properly",
        d: "Gulf business and lifestyle press gave them authority and actual regional buyers at the same time.",
      },
      {
        t: "Pace against the season",
        d: "Placements front-loaded so authority landed before the peak buying window, not during it.",
      },
    ],
    work: [
      ["Gulf press features", "4"],
      ["UK trade placements", "7"],
      ["Product roundup inclusions", "6"],
      ["Contextual mentions", "4"],
      ["Domains reviewed and rejected", "44"],
    ],
    outcome: [
      ["4×", "referring domains"],
      ["+88%", "organic revenue"],
      ["DR 74", "highest placement"],
      ["Top 5", "core categories"],
    ],
    placements: [
      ["khaleejtimes.com", "DR 74", "FEATURE"],
      ["arabianbusiness.com", "DR 72", "FEATURE"],
      ["retail•••review.com", "DR 60", "ROUNDUP"],
      ["style•••editorials.com", "DR 55", "MENTION"],
    ],
    quote: {
      text: "They got us into Gulf business press our previous agency called impossible. The feature still sends us traffic months later.",
      who: "Head of Growth · E-commerce",
    },
    timeline: [
      {
        m: "Month 1",
        t: "Profile triage",
        d: "Existing links assessed; quality counterweight plan approved.",
      },
      {
        m: "Month 2–3",
        t: "Gulf entry",
        d: "Regional business press secured ahead of the season.",
      },
      {
        m: "Month 4–5",
        t: "Category push",
        d: "Trade placements and roundups aimed at core categories.",
      },
      {
        m: "Month 6",
        t: "Peak season",
        d: "Categories in the top five as demand peaks.",
      },
    ],
  },
];

const BLOG_POSTS = [
  {
    slug: "why-ai-engines-cite-some-brands",
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
    title: "Linked vs Unlinked Mentions: What Actually Moves the Needle",
    excerpt:
      "Links move rankings. Mentions move AI answers. Treating them as the same deliverable is how budgets get wasted — here is how we split them in real campaigns.",
    category: "Digital PR",
    date: "May 27, 2026",
    read: "6 min",
    glyph: "¶",
    grad: "bg-butter",
    body: [
      {
        t: "p",
        c: 'Every month a client asks some version of the same question: the mention went live but there is no link — did we waste the placement? Five years ago the honest answer was "mostly, yes." Today it depends entirely on which machine you are trying to influence.',
      },
      { t: "h2", c: "What a link still does" },
      {
        t: "p",
        c: "Google’s ranking systems remain link-driven. A contextual, do-follow link from a real publication passes authority to a specific page and helps that page rank for specific keywords. If your goal is moving a category page from position nine to position three, you need links. No amount of unlinked coverage substitutes for that.",
      },
      { t: "h2", c: "What a mention does that a link cannot" },
      {
        t: "p",
        c: 'Language models do not crawl PageRank. They learn what to say about your brand from how it appears in text across the sources they trust. An unlinked sentence on a credible trade site — "YourBrand has built a reputation for 24/7 dispatch" — teaches the model an association it can repeat in answers. Industry research backs this up: a large Ahrefs analysis found brand mentions to be the strongest correlate of AI visibility, and most cited material comes from third-party sites rather than brand-owned pages.',
      },
      {
        t: "quote",
        c: "Links are votes for a page. Mentions are sentences about a brand. Different machines count different things.",
      },
      { t: "h2", c: "How we split a real budget" },
      {
        t: "ul",
        c: [
          "Money pages that need rankings: editorial links with contextual anchors.",
          "Category authority and AI answers: descriptive mentions on already-cited sources.",
          "Both at once when possible — a feature that links AND describes is the best unit of work in this business.",
        ],
      },
      {
        t: "p",
        c: "The report we send clients now has two columns where it used to have one. Placements that pass authority, and placements that build the citation footprint. Judging the second column by the standards of the first is how good campaigns get cancelled early.",
      },
    ],
  },
  {
    slug: "site-approval-workflow",
    title: "The Site-Approval Workflow That Saves Our Clients Thousands",
    excerpt:
      "Most link disasters are approved by nobody. Here is the exact checklist every domain passes before a placement happens — and why clients see it first.",
    category: "Link Building",
    date: "May 19, 2026",
    read: "7 min",
    glyph: "✓",
    grad: "bg-mint",
    body: [
      {
        t: "p",
        c: "The most expensive links in this industry are the cheap ones. A $60 placement on a site that exists only to sell placements does not just fail to help — it sits in your profile as a flag, and cleaning it up later costs more than doing it right would have. After watching new clients arrive with profiles full of those flags, we made one rule non-negotiable: nothing is placed until the client has seen the domain and said yes.",
      },
      { t: "h2", c: "The checks every prospect passes first" },
      {
        t: "ul",
        c: [
          "Real organic traffic in Ahrefs — a trend line, not a spike from one lucky post.",
          "A clean outbound profile — if every article links to casinos and CBD, we close the tab.",
          "Genuine editorial standards — a named team, a review process, content a human would read.",
          "Topical fit — a home-services link belongs in home-services context, not a crypto blog.",
          "Crawl freshness — Google has to actually visit the site for the link to ever count.",
        ],
      },
      { t: "h2", c: "Then the client sees everything" },
      {
        t: "p",
        c: "Every surviving domain goes into a sheet with its DR, traffic, niche, and a link to browse the live site. Clients approve or reject each row. Roughly one in five gets rejected — sometimes for reasons we could not have known, like a competitor relationship or an old dispute. That veto is the point. It is your link profile; you should hold the pen.",
      },
      {
        t: "quote",
        c: "A link you would be embarrassed to show your client is a link you should not build.",
      },
      { t: "h2", c: "What this costs us — and saves you" },
      {
        t: "p",
        c: "Approval-first is slower. It adds days to every campaign and kills placements we could have billed for. It also means no client of ours has ever opened a report and found a domain they had never heard of. In a business running on trust, that trade is not close.",
      },
    ],
  },
  {
    slug: "anatomy-of-a-dr70-placement",
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

export { CASE_STUDIES, BLOG_POSTS };
