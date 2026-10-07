import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Star } from "lucide-react";
import { openBooking } from "@/lib/booking";

/* ------------------------------------------------------------------ content */

export const SERVICES = [
  {
    slug: "link-building",
    nav: "Link Building",
    eyebrow: "Link Building",
    title: {
      pre: "Links that move rankings,",
      em: "not just reports",
      post: ".",
    },
    sub: "Editorial backlinks from DR 40+ publications with real traffic — sourced through our own publisher network, approved by you first, and tracked until Google actually counts them.",
    tint: "bg-butter",
    stats: [
      { v: 800, suffix: "+", label: "Vetted publications in our network" },
      { custom: "DR 40–75", label: "Working authority range" },
      { v: 96, suffix: "%", label: "Indexation rate, last 12 months" },
    ],
    problem: {
      eyebrow: "Editorial authority",
      pre: "Rankings follow",
      em: "credible references",
      paras: [
        "Google does not read your page in isolation. It weighs how many credible, independent publications have chosen to reference it, and how closely those publications sit to your subject.",
        "We maintain our own publisher network, earn placements through direct editorial relationships, and treat a placement as delivered once Google has indexed it and recorded it against the target page.",
      ],
    },
    deliverables: [
      {
        t: "Guest posts",
        d: "Original articles on niche-relevant publications, written to the editor’s standard, with your link placed inside the story.",
      },
      {
        t: "Niche edits",
        d: "Contextual links added to aged, already-indexed content Google has trusted for years.",
      },
      {
        t: "Authority placements",
        d: "DR 60+ editorial features for the money pages that need the strongest push.",
      },
      {
        t: "Anchor & target strategy",
        d: "A mapped plan for which page gets which anchor — no over-optimisation, no footprints.",
      },
      {
        t: "Competitor gap analysis",
        d: "The exact domains linking to competitors above you, prioritised by what is winnable.",
      },
      {
        t: "Indexation & monitoring",
        d: "Every link verified in Google’s index and watched for 90 days. Drops replaced free.",
      },
    ],
    how: [
      {
        n: "01",
        t: "A link goes live in real editorial",
        d: "Inside a genuine article on a vetted publication — contextual, natural anchor, a sentence that survives without it.",
      },
      {
        n: "02",
        t: "Google crawls, renders, indexes",
        d: "A link Google never renders is an invoice, not an asset. We verify all three states and request recrawls until it counts.",
      },
      {
        n: "03",
        t: "Your target page climbs",
        d: "Authority compounds into positions. Target keywords tracked weekly so you watch the curve, not just the link list.",
      },
    ],
    pillars: [
      {
        t: "Relevance",
        d: "Topical fit between publication, content and your page — the signal Google weighs before anything else.",
      },
      {
        t: "Authority",
        d: "Real DR backed by real organic traffic. We reject high-DR shells with no audience.",
      },
      {
        t: "Indexation",
        d: "Verification and recrawl requests are part of every placement, not an afterthought.",
      },
    ],
    steps: [
      {
        t: "Audit",
        d: "Link profile, rankings and the competitor gap quantified.",
      },
      {
        t: "Approve",
        d: "Every prospect domain with metrics — you sign off each one.",
      },
      { t: "Place", d: "Contextual placements inside real editorial content." },
      {
        t: "Verify",
        d: "Indexation checks, rank tracking, 90-day replacement.",
      },
    ],
    quote: {
      text: "First agency that showed us every domain before placing. Our category page went from page three to position four in five months.",
      who: "SEO Lead · B2B SaaS",
    },
    faqs: [
      {
        q: "Are these PBNs or marketplace links?",
        a: "No. Every site passes manual vetting — real organic traffic in Ahrefs, clean outbound profile, genuine editorial standards. We place through publisher relationships we maintain directly, which is why we can show you every domain before placement.",
      },
      {
        q: "How many links do I need?",
        a: "It depends on the gap, and we quantify it rather than guess. The audit measures the competitor link gap for your target keywords and recommends a monthly pace. Most campaigns run 5–15 placements a month.",
      },
      {
        q: "When will rankings move?",
        a: "Links typically start getting credited in 4–8 weeks and compound over 3–6 months. Target keywords are tracked weekly so you see the curve, not just the link list.",
      },
      {
        q: "What if a link gets removed?",
        a: "Any placement that drops or de-indexes within 90 days gets replaced free. It is written into every package.",
      },
      {
        q: "Do you work white-label for agencies?",
        a: "Yes — a meaningful share of our volume is white-label fulfilment. Same vetting, same reporting, your branding on the deliverables.",
      },
    ],
  },
  {
    slug: "digital-pr",
    nav: "Digital PR",
    eyebrow: "Digital PR",
    title: {
      pre: "Coverage that makes you",
      em: "the one they quote",
      post: ".",
    },
    sub: "Features, expert quotes and stories on publications your buyers — and AI engines — already read. Real editorial coverage, pitched through press relationships built over years.",
    tint: "bg-mint",
    stats: [
      { custom: "DR 74", label: "Khaleej Times — our highest regular outlet" },
      { v: 12, suffix: "+", label: "Niches with active press relationships" },
      { v: 48, suffix: "h", label: "Typical pitch-to-response time" },
    ],
    problem: {
      eyebrow: "The problem",
      pre: "Press releases are",
      em: "paid noise",
      paras: [
        "Most “digital PR” is a press release pushed through a wire service — distribution nobody reads, on pages no editor chose, with zero authority transfer. It produces a PDF of coverage and not a single buyer.",
        "Real coverage is a story an editor decides to run. That needs an angle worth running and a relationship that gets it read. We build both, including across Gulf business media.",
      ],
    },
    deliverables: [
      {
        t: "Press features",
        d: "Full editorial features about your brand, angle-led so editors actually want to run them.",
      },
      {
        t: "Expert quotes",
        d: "Your voice in journalists’ stories — the fastest route to authority by association.",
      },
      {
        t: "Product & service roundups",
        d: "Inclusion in the “best of” lists your buyers read and AI engines cite.",
      },
      {
        t: "Gulf & international media",
        d: "Khaleej Times, Arabian Business and regional outlets we place in regularly.",
      },
      {
        t: "Story angle development",
        d: "Data points, trends and contrarian takes built by our team — pitches about the reader, never about you.",
      },
      {
        t: "Coverage reporting",
        d: "Every placement with live URL, outlet metrics and where it can be reused in your sales material.",
      },
    ],
    how: [
      {
        n: "01",
        t: "We find the story worth running",
        d: "Data points, trends and sharp takes built from your business — pitches about the reader, never about you.",
      },
      {
        n: "02",
        t: "Editors we know publish it",
        d: "Features, expert quotes and roundups on publications your buyers and the AI engines already read.",
      },
      {
        n: "03",
        t: "Coverage feeds every channel",
        d: "Links for Google, mentions for AI answers, press proof for your sales deck — one placement, three returns.",
      },
    ],
    pillars: [
      {
        t: "Angle",
        d: "Editors run stories, not favours. Every pitch leads with something their readers want.",
      },
      {
        t: "Access",
        d: "Direct relationships with editors built over years of placements. The honest reason this is hard to copy.",
      },
      {
        t: "Amplification",
        d: "Coverage gets reused: sales decks, ads, “as seen in” bars, and the footprint that feeds search and AI.",
      },
    ],
    steps: [
      {
        t: "Angle",
        d: "We find the story inside your business worth covering.",
      },
      { t: "Pitch", d: "Direct to editors our team has placed with before." },
      {
        t: "Publish",
        d: "Feature, quote or roundup goes live with your approval.",
      },
      { t: "Leverage", d: "Reported, tracked and reused across channels." },
    ],
    quote: {
      text: "They got us into Gulf business press our previous agency said was impossible. The feature still sends us leads months later.",
      who: "Marketing Director · services brand",
    },
    faqs: [
      {
        q: "Is coverage guaranteed?",
        a: "Editorial coverage can never be guaranteed by anyone honest — editors decide. What we control is the strength of the angle and the relationships. Packages are scoped on delivered placements, not attempts.",
      },
      {
        q: "How is this different from press releases?",
        a: "A press release is a document you pay to distribute. Digital PR is a story an editor chooses to run. The second carries authority and gets cited; the first mostly carries an invoice.",
      },
      {
        q: "Can you get coverage in my niche?",
        a: "We run active press relationships across 12+ niches, deepest in home services, SaaS, e-commerce and Gulf business media. On the call we will tell you straight whether yours is one we serve well.",
      },
      {
        q: "Who writes the content?",
        a: "Our editorial team drafts to each publication’s standard; you review anything that quotes you before it ships to the editor.",
      },
      {
        q: "Can this run alongside link building?",
        a: "It should. PR coverage produces the highest-trust links and mentions in any profile — most clients run both as one campaign with one report.",
      },
    ],
  },
  {
    slug: "brand-mentions",
    nav: "Brand Mentions",
    eyebrow: "Brand Mentions",
    title: { pre: "The mentions AI engines", em: "actually quote", post: "." },
    sub: "Get your brand referenced in the third-party sources ChatGPT, Claude and Google’s AI Overviews rely on when they recommend providers and answer buyer questions.",
    tint: "bg-lilac",
    stats: [
      {
        v: 75,
        suffix: "K",
        label:
          "Brands in the Ahrefs study that found mentions drive AI visibility",
      },
      {
        v: 85,
        suffix: "%",
        label: "Of AI citations point to third-party sites (AirOps)",
      },
      { v: 3, label: "Answer surfaces tracked monthly in your report" },
    ],
    problem: {
      eyebrow: "The shift",
      pre: "Your buyers ask AI.",
      em: "AI asks the web about you",
      paras: [
        "When a buyer asks ChatGPT or an AI Overview who to hire, the engine does not read your homepage and take your word for it. It assembles an answer from third-party sources it trusts — trade press, roundups, comparisons, local news.",
        "If those sources do not describe you, the engine has nothing to say about you, and it recommends whoever they do describe. Brand mentions are the deliberate version of that footprint.",
      ],
    },
    deliverables: [
      {
        t: "Contextual brand mentions",
        d: "Descriptive references — not bare name-drops — connecting your brand to its category and use cases.",
      },
      {
        t: "Source targeting",
        d: "Placements on the exact domains AI engines already cite for your category queries.",
      },
      {
        t: "Citation gap analysis",
        d: "Which brands get named for your money queries today, which sources feed those answers, where the openings are.",
      },
      {
        t: "Category association building",
        d: "Repeated, consistent mentions across independent sources — the pattern models learn from.",
      },
      {
        t: "AI citation tracking",
        d: "Monthly checks across ChatGPT, Claude and AI Overviews, with screenshots when you appear.",
      },
      {
        t: "Mention + link hybrids",
        d: "Where the editorial allows it, the mention also carries a link. One placement, both machines.",
      },
    ],
    how: [
      {
        n: "01",
        t: "Credible publications mention you",
        d: "Contextual sentences about your brand go live on vetted, already-cited sources — trade press, roundups, local news.",
      },
      {
        n: "02",
        t: "AI engines learn from those sources",
        d: "The engines continuously crawl the publications they trust and absorb what those pages say about you.",
      },
      {
        n: "03",
        t: "Your brand enters the answers",
        d: "When buyers ask, engines repeat what credible sources say — and cite the sources we placed.",
      },
    ],
    pillars: [
      {
        t: "Context",
        d: "Mentions that tie your brand to the right category and buyer problems — sentences a model can learn from.",
      },
      {
        t: "Source quality",
        d: "Credible, frequently crawled publications the engines already trust and already cite.",
      },
      {
        t: "Consistency",
        d: "Repeated mentions across independent sources, strengthening the association over time.",
      },
    ],
    steps: [
      {
        t: "Map",
        d: "Citation gap: who gets named, which sources feed the answers.",
      },
      {
        t: "Target",
        d: "Prospect list of already-cited domains — approved by you.",
      },
      { t: "Place", d: "Contextual mentions inside real editorial content." },
      {
        t: "Track",
        d: "Monthly citation checks across all three answer surfaces.",
      },
    ],
    quote: {
      text: "Three months in, our brand started appearing in ChatGPT answers for our category. Our sales team noticed before we told them.",
      who: "Founder · B2B SaaS",
    },
    faqs: [
      {
        q: "Can you guarantee my brand appears in ChatGPT?",
        a: "No — and you should run from anyone who says yes. Nobody controls what an AI says. What we build is the input the engines consistently use: contextual mentions on sources they already cite. Then we track the output monthly.",
      },
      {
        q: "How is this different from link building?",
        a: "Link building targets Google’s ranking systems through authority transfer. Brand mentions target how language models describe your category. Different machine, same editorial craft.",
      },
      {
        q: "Why are contextual mentions better than directory listings?",
        a: "A directory gives the model your name. A contextual mention gives it a sentence — who you are, what you solve, why you are credible. Models repeat sentences, not listings.",
      },
      {
        q: "How long until I show up in AI answers?",
        a: "Honestly variable. Mentions on sources an engine already cites can surface within weeks; building a footprint from zero typically takes a quarter of consistent placements.",
      },
      {
        q: "Does this replace SEO?",
        a: "No — it compounds it. The same publications that influence AI answers pass authority Google counts.",
      },
    ],
  },
  {
    slug: "haro-links",
    nav: "HARO & Expert Quotes",
    eyebrow: "HARO & Expert Placements",
    title: { pre: "Your expertise,", em: "quoted everywhere", post: "." },
    sub: "Expert quotes and source placements inside journalist-written stories — the highest-trust links in SEO, secured through our own media relationships instead of the daily pitch lottery.",
    tint: "bg-blush",
    stats: [
      { custom: "DR 60+", label: "Typical placement authority" },
      { v: 48, suffix: "h", label: "Median pitch-to-quote turnaround" },
      { v: 12, suffix: "+", label: "Niches with active journalist contacts" },
    ],
    problem: {
      eyebrow: "The problem",
      pre: "HARO became",
      em: "a lottery",
      paras: [
        "Every source request now gets hundreds of replies within the hour. Agencies sell “HARO campaigns” that are really interns spraying generic quotes at every query and billing for the attempts.",
        "We run it the other way: a maintained expertise profile, monitored requests plus direct pitches to journalists we have placed with before, and quotes drafted in your voice that you approve before anything is sent.",
      ],
    },
    deliverables: [
      {
        t: "Expert quote placements",
        d: "Your voice inside journalist-written stories on DR 60+ publications — authority by association.",
      },
      {
        t: "Request monitoring",
        d: "Daily monitoring across source-request platforms and journalist networks, filtered to real fits only.",
      },
      {
        t: "Quote drafting & approval",
        d: "Our editorial team drafts in your voice; nothing is sent until you approve the wording.",
      },
      {
        t: "Direct journalist pitching",
        d: "Beyond the platforms — straight to editors and writers we have placed with before.",
      },
      {
        t: "Link & mention verification",
        d: "Every placement checked live: linked, indexed and logged in your monthly report.",
      },
      {
        t: "Unlinked-mention capture",
        d: "When a journalist quotes without linking, the mention still feeds AI answers — and we track it.",
      },
    ],
    how: [
      {
        n: "01",
        t: "A journalist needs a source",
        d: "Requests filtered daily across platforms and our own network — matched to your expertise, not sprayed.",
      },
      {
        n: "02",
        t: "Drafted in your voice, approved by you",
        d: "Specific data, real field experience, your sign-off before anything is sent. Journalists print substance.",
      },
      {
        n: "03",
        t: "You appear as the expert",
        d: "Quoted and usually linked on DR 60+ stories — authority that compounds with every citation.",
      },
    ],
    pillars: [
      {
        t: "Speed",
        d: "Source requests die in hours. Monitoring plus pre-approved angles means we respond while the window is open.",
      },
      {
        t: "Substance",
        d: "Real, specific expertise — data points, contrarian takes, field experience. Journalists print substance, not filler.",
      },
      {
        t: "Relationships",
        d: "Editors who already know our pitches get read first. The honest reason our hit rate holds.",
      },
    ],
    steps: [
      {
        t: "Profile",
        d: "We map your expertise areas, credentials and quotable angles.",
      },
      {
        t: "Monitor",
        d: "Requests filtered daily; direct pitches to matched journalists.",
      },
      {
        t: "Draft",
        d: "Quotes written in your voice — approved by you first.",
      },
      {
        t: "Verify",
        d: "Live check: link, indexation, mention — logged monthly.",
      },
    ],
    quote: {
      text: "Two DR 65+ quotes in the first month. Our previous HARO vendor managed three in a year — and none of them read like me.",
      who: "Founder · fintech SaaS",
    },
    faqs: [
      {
        q: "Is this traditional HARO?",
        a: "Not quite. We monitor source-request platforms, but the hit rate comes from direct journalist relationships and pre-built expertise angles. Traditional HARO is a lottery; this is a pipeline.",
      },
      {
        q: "Who writes the quotes?",
        a: "Our editorial team drafts in your voice from your expertise profile. You approve every word before it is sent.",
      },
      {
        q: "What if the journalist does not link?",
        a: "It still counts. An unlinked expert mention on a credible publication is exactly the signal AI engines use — and it is tracked in your report either way.",
      },
      {
        q: "How many placements per month?",
        a: "It varies with your niche’s request volume. Most clients land 2–6 quality placements monthly — we scope on delivered placements, not attempts.",
      },
      {
        q: "Do I need to be available for interviews?",
        a: "Rarely. Most placements are written quotes. When a journalist wants a call, we brief you first and it is always your choice.",
      },
    ],
  },
];

/** Look up a service page by its URL slug. */
export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug)!;

/* --------------------------------------------------------------- primitives */

/** Soft out-of-focus colour wash used behind service hero sections. */
export const Glow = ({
  tint,
  className = "",
}: {
  tint: string;
  className?: string;
}) => (
  <div
    className={`pointer-events-none absolute rounded-full blur-[80px] ${tint} ${className}`}
  />
);

export const SectionLabel = ({ children }: { children: ReactNode }) => (
  <motion.p
    className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.p>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <motion.h1
    className="text-balance text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-semibold text-navy-dark leading-[1.03] tracking-[-0.035em] mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.65, delay: 0.05 }}
  >
    {children}
  </motion.h1>
);

export const SectionLead = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.p
    className={`text-[17px] text-navy-dark/70 leading-relaxed mb-9 ${className}`}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.12 }}
  >
    {children}
  </motion.p>
);

export const HeroActions = ({
  label = "Book a strategy call",
}: {
  label?: string;
}) => (
  <motion.div
    className="flex flex-wrap items-center gap-3"
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    <button
      onClick={openBooking}
      className="inline-flex items-center gap-2 bg-navy-dark hover:bg-black text-white rounded-xl px-7 py-3.5 text-[14px] font-semibold transition-colors duration-300"
    >
      {label} <ArrowRight className="w-4 h-4" />
    </button>
    <Link
      to="/pricing"
      className="inline-flex items-center rounded-xl px-7 py-3.5 text-[14px] font-semibold text-navy-dark border border-navy-dark/20 hover:border-navy-dark transition-colors duration-300"
    >
      See pricing
    </Link>
  </motion.div>
);

export const RatingRow = () => (
  <motion.div
    className="flex items-center gap-2.5 mt-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-navy-dark text-navy-dark" />
      ))}
    </span>
    <span className="text-[12.5px] text-navy-dark/70">
      Top Rated on Upwork &amp; Fiverr · 40+ brands served
    </span>
  </motion.div>
);

/** Eyebrow + H2 pair that opens each in-page section. */
export const SectionHead = ({
  eyebrow,
  children,
  center = false,
}: {
  eyebrow?: string;
  children: ReactNode;
  center?: boolean;
}) => (
  <motion.div
    className={`mb-12 ${center ? "text-center" : ""}`}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
  >
    {eyebrow && (
      <p className="text-[11px] font-semibold tracking-[0.18em] text-navy-dark/70 uppercase mb-3">
        {eyebrow}
      </p>
    )}
    <h2 className="text-balance text-[2rem] sm:text-[2.6rem] font-semibold leading-[1.06] tracking-[-0.035em] text-navy-dark">
      {children}
    </h2>
  </motion.div>
);

/** Cross-links to the other three service pages. */
export const OtherServices = ({ current }: { current: string }) => (
  <div className="bg-mist py-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-balance text-2xl font-semibold text-navy-dark tracking-[-0.02em] mb-7">
        Other services
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {SERVICES.filter((s) => s.slug !== current).map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className={`group rounded-[22px] p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift ${s.tint}`}
          >
            <span className="mb-10 block text-[16.5px] font-semibold text-navy-dark">
              {s.nav}
            </span>
            <span className="text-[13px] font-semibold text-navy-dark/75 transition-colors duration-300 group-hover:text-navy-dark">
              Explore →
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
