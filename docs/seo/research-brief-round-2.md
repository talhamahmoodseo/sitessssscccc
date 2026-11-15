# Semrush research brief, round 2 (for Muse)

Date: 15 Nov 2026 · Owner: Talha · Analysis: Claude

Live, editable version for Muse: https://claude.ai/artifact/Gx2cuktvkFnH8CRNbEzEL2 (this file is the repo copy).

## Why we're doing this

We stopped building pages. Talha rejected the last three (guest posting, niche
edits, white label) because they had no strategy behind them. From now on the
research decides which pages exist, not the other way round.

This round answers five questions:

1. Which industries actually search for what we sell (links, PR, brand mentions, AI visibility)?
2. How big is the GEO / AEO / AI search opportunity, and who owns it today?
3. Which kinds of pages bring competitors traffic, rankings and links? Do industry pages work for anyone?
4. When people ask ChatGPT, Google AI Mode or Perplexity for a link building or GEO agency, which brands get named, and which websites do the AI tools cite as sources?
5. Where does editorialhq.com stand today, and which sites link to our competitors but not to us?

Round 1 is done. We already have your 46 exports from 15 Nov: competitor pages and positions for 7 competitors, the Keyword Magic master list, questions, and the keyword gap. **Don't redo those.** This round fills the gaps.

## Ground rules

- **Database:** United States. Also keep the "Global volume" column where Semrush shows it.
- **Low volume:** don't delete keywords with 0–50 searches. Keep them and we'll filter later. Small numbers matter for industry and AI pages.
- **Exclude:** gambling, casino, iGaming, adult, CBD. We don't serve those niches.
- **Files:** save every raw export as CSV in a new Drive folder, "SEMrush exports round 2 – <date>". Name each file `task<number>-<what>-<detail>.csv`, for example `task2-industry-saas.csv`.
- **Summary sheet:** also fill the Google Sheet "Editorial HQ research round 2". There's one tab per task, listed at the end of this brief.
- **Dates:** write the date on every tab. AI answers and rankings change week to week.
- **Notes:** if something surprises you, write it in the Notes tab. Those notes are often the most useful part.

---

## Task 1. Our baseline (about 1 hour)

We need to know where we start, so we can measure progress.

1. **Domain Overview** for `editorialhq.com`: record Authority Score, referring domains, backlinks, organic keywords (US and all countries) and organic traffic. Take a screenshot.
2. **Backlink Analytics → Referring Domains** for `editorialhq.com`: export the full list.
3. **Site Audit:** run it on `editorialhq.com` (up to 500 pages). Export the errors and warnings.
4. **Position Tracking:**
   - Create a project for `editorialhq.com`, United States, desktop and mobile.
   - Add every keyword from Appendix C, tagged by its group (core, service, AI, industry, lists).
   - Set it to update daily, or weekly if your plan doesn't allow daily.
5. Repeat step 1 (Domain Overview only) for the competitors: userp.io, editorial.link, linkbuilder.io, fatjoe.com, outreachmonks.com, siegemedia.com and pageonepower.com. One row each, same columns.

**Output:** tab "1 Baseline".

---

## Task 2. Industry demand matrix (4–6 hours)

**Goal:** find the industries where people search to buy what we sell. This decides whether we build industry pages at all, and which ones.

**Industries** (Appendix B lists the exact words to use). For each industry, run **Keyword Magic Tool**, broad match, with these seeds:

| Seed | Example for SaaS | Why |
|---|---|---|
| `<industry> link building` | saas link building | Our core service |
| `<industry> backlinks` | saas backlinks | Same buyers, different wording |
| `<industry> guest post` | saas guest post | Guest posting demand |
| `<industry> digital pr` | saas digital pr | PR demand |
| `<industry> geo` and `<industry> aeo` | saas geo, saas aeo | AI search demand |
| `<industry> ai seo` | saas ai seo | AI search demand |
| `<industry> seo agency` | saas seo agency | Context only: shows how big the full-SEO market is in that industry. We are **not** planning "[industry] SEO company" pages |

Broad match also catches reversed phrases such as "link building for saas", so you don't need separate seeds for those.

**Columns to export:** Keyword, Intent, Volume (US), Global volume, Trend, KD %, CPC, Competitive density, SERP features, Number of results.

**Summary table** (tab "2 Industry matrix"). One row per industry, with these columns:

- Total US volume, link building family (link building + backlinks + guest post)
- Total US volume, PR family
- Total US volume, AI family (geo + aeo + ai seo)
- Total US volume, SEO agency (context)
- Number of keywords with volume ≥ 50
- Median KD of those keywords
- Highest CPC
- The 3 biggest keywords, with volume and KD
- Do any of the top 3 show an AI Overview? (Yes / No)

Then sort the industries by link building family volume, highest first.

**What we're looking for:** industries where the link building or AI family adds up to roughly 1,000+ searches a month at KD under 35, or where CPC is high (a high CPC means buyers in that industry pay well).

---

## Task 3. GEO / AEO / AI search cluster (3–4 hours)

**Goal:** size the AI search opportunity properly. Round 1 only touched it.

Run **Keyword Magic Tool**, broad match, for each seed:

```
ai seo
generative engine optimization
geo agency
geo services
answer engine optimization
aeo agency
aeo services
llm seo
llm optimization
ai search optimization
ai visibility
chatgpt seo
rank in chatgpt
get recommended by chatgpt
ai overviews seo
google ai mode seo
perplexity seo
brand mentions ai
ai brand visibility
ai citations
```

Tag every keyword you keep with one of these:

- **Hire:** someone looking for an agency or service. Contains agency, services, company, consultant, firm, expert, hire, or "best ... agency".
- **Learn:** what is, how to, guide, examples, vs.
- **Tool:** software, tool, tracker, checker, platform.
- **Other:** news, jobs, courses, anything else.

**Output:** tab "3 GEO cluster". Sort by volume, with a small summary at the top giving the total volume, keyword count and median KD for each tag.

---

## Task 4. Fill the service gaps (1–2 hours)

Round 1 covered most service keywords. Run Keyword Magic, broad match, only for these:

```
brand mention service
brand mentions service
unlinked brand mentions
blogger outreach
managed link building
link building subscription
monthly link building
press release seo
expert quotes link building
featured.com
qwoted
journalist requests
```

For each keyword with volume 100+, open the Google results (Semrush's SERP section, or a US Google search) and record one thing: **are the top results service pages (people buying) or tools and guides (people learning)?**

This matters most for **"brand mentions"** (1,600 searches). We need to know whether those people want a service like ours or a monitoring tool like Mention or Brand24.

**Output:** tab "4 Service gaps".

---

## Task 5. SERP check for candidate main keywords (4–5 hours)

**Goal:** for each keyword we might build a page around, find out who ranks, what kind of page wins, and whether a new site like ours can get in.

For **every keyword in Appendix C**:

1. Open **Keyword Overview → SERP Analysis** (United States).
2. For each of the top 10 results, record:
   - URL and domain
   - the domain's Authority Score
   - the page's referring domains, from Backlink Analytics (the "Indexed pages" view shows referring domains per URL)
   - page type: service page / list of agencies ("best X") / blog guide / directory (Clutch etc.) / tool / forum (Reddit, Quora) / other
3. Record the SERP features: AI Overview yes/no, Reddit or "Discussions and forums" yes/no, local pack yes/no, ads yes/no.

**Summary row per keyword** (tab "5 SERP checks"):

- **Winning page type:** the type that holds most of the top 10.
- **Weakest top 10 result:** the lowest Authority Score in the top 10.
- **Weak results:** how many top 10 results have Authority Score under 30.
- **Page referring domains:** the median for top 10 pages.
- **AI Overview:** yes/no.
- **Reddit:** yes/no.

**Why:** if the top 10 for "white label link building" is all service pages with AS 60+ and 100+ referring domains to the page, we can't win it this year. If it's lists and forums with weak domains, we can.

---

## Task 6. Competitor page audit (3–4 hours)

**Goal:** see which kinds of pages actually work for agencies like us, especially industry pages and GEO pages.

1. **Add competitors.** Look at the top 10 for each of these keywords:
   - ai seo agency
   - generative engine optimization agency
   - geo agency
   - aeo agency
   - white label link building
   - saas link building agency
   - link building for lawyers

   Note every **agency** domain (skip directories, lists, tools and forums) that isn't already in our list. Keep the 8 that appear most often.
2. **For each new competitor:** Organic Research → Pages (US), full export, same as round 1.
3. **Count every industry page and GEO / AI page** for all competitors, old and new, including pages with zero traffic. Use the site's menu, its sitemap (`domain.com/sitemap.xml` or `/sitemap_index.xml`), or a Google search like `site:userp.io agency`. For each page record:
   - URL
   - industry, if any
   - service (link building / SEO / PR / GEO / other)
   - Semrush traffic
   - number of keywords
   - top keyword
   - referring domains to that URL
4. **Mark the year each page appeared,** if Semrush or the sitemap shows it. New pages naturally have little traffic.

**Output:** tab "6 Competitor pages".

**The question this answers:** do industry pages and GEO pages earn traffic, rankings or links for anyone in our space? From round 1, the early answer is "very little" (for example, LinkBuilder.io's SaaS page gets about 80 visits a month, and uSERP's AI SEO page about 12). We need the full picture before deciding.

---

## Task 7. AI visibility: who AI recommends, and which sites it trusts (4–6 hours, most important)

**Goal:** when a buyer asks an AI tool for an agency, find out which names come up and which websites the AI uses as sources. Those sources become our target list for getting Editorial HQ mentioned.

### Option A: your Semrush plan includes the AI Visibility Toolkit (Semrush One, or the AI Visibility add-on)

1. **Visibility Overview:** run it for `editorialhq.com` and for userp.io, editorial.link, fatjoe.com, linkbuilder.io and outreachmonks.com. Export each.
2. **Prompt Research:** enter each topic from Appendix D (the "topics" list). Export the prompts, the brands mentioned and the cited sources.
3. **Competitor Research:** compare `editorialhq.com` with the five competitors. Export the prompts where they're mentioned and we aren't.
4. **Brand Performance:** export it for `editorialhq.com`, even if it's empty. That's our starting point.

### Option B: no AI Visibility Toolkit

Do it by hand. It's slower but works.

1. Use the **30 prompts in Appendix D**.
2. Run each prompt in four places:
   - ChatGPT (new chat, web search on)
   - Google AI Mode
   - Google search (record the AI Overview, if one shows)
   - Perplexity
3. Use a US location if you can (a VPN set to the US). If you can't, write down the location you used.
4. For every prompt and platform, record one row:
   - date
   - platform
   - prompt
   - brands named, in the order they appear
   - every source URL cited
   - whether Editorial HQ appears (yes/no)

That's about 120 rows.

### For both options, build two summary tables

- **Brands named most:** brand, number of times named, platforms.
- **Sources cited most:** domain, URL, number of times cited, and type (list article / directory / Reddit / review site / competitor's own site / news / other).

**Output:** tab "7 AI visibility".

**Why this is the most important task:** research on 75,000 brands (Ahrefs, May 2025) found that being mentioned on other websites lines up with AI Overview visibility far more than backlinks do. So the cited-sources list tells us exactly where Editorial HQ needs to be mentioned.

---

## Task 8. Lists, directories and Reddit (3–4 hours)

**Goal:** find the places buyers and AI tools look when choosing an agency.

1. **"Best X" lists.** Search Google (US) for each phrase below and record the top 20 results:

   ```
   best link building agencies
   best link building services
   best link building companies
   best white label link building
   best guest posting services
   best niche edit services
   best digital pr agencies
   best geo agencies
   best aeo agencies
   best ai seo agencies
   best link building agency for saas
   fatjoe alternatives
   editorial.link alternatives
   outreach monks alternatives
   userp alternatives
   ```

   For each list article, record:
   - URL and publisher
   - date last updated
   - every agency named, in order
   - whether it's written by an agency (self-promotion) or an independent site
   - whether there's a way to be included (a contact page, a submission form, "sponsored" or paid inclusion)

2. **Directories.** For our 5 main competitors, check whether each has a profile on these directories, and record the number of reviews and the rating:
   - Clutch
   - G2
   - GoodFirms
   - DesignRush
   - Sortlist
   - UpCity
   - TechBehemoths
   - Trustpilot

3. **Reddit.** Search Reddit for "link building agency", "white label link building", "guest post service" and "GEO agency" in r/SEO, r/bigseo, r/juststart, r/SaaS, r/Entrepreneur and r/marketing. Record:
   - thread URL
   - date
   - upvotes
   - which agencies people recommend or warn against

**Output:** tab "8 Lists and directories".

---

## Task 9. Backlink gap (1–2 hours)

1. **Backlink Gap:** compare `editorialhq.com` with userp.io, editorial.link, linkbuilder.io, fatjoe.com and outreachmonks.com.
2. **Export** the referring domains that link to **2 or more** competitors but not to us.
3. **Tag each domain** with its type: guest post site / directory / podcast / list article / tool / news / other.

**Output:** tab "9 Backlink gap".

---

## Task 10. Questions buyers ask (1–2 hours)

1. **Keyword Magic Tool → Questions filter** for these seeds:
   - white label link building
   - guest posting
   - niche edits
   - digital pr agency
   - geo agency
   - aeo
   - ai seo
   - brand mentions
   - saas link building
   - link building for lawyers
2. **Keep** every question with volume 20+. Lower volumes are fine for the AI-related seeds.

These become FAQ sections, and FAQs are what AI tools quote.

**Output:** tab "10 Questions".

---

## Order and time

Do the tasks in this order: 1 → 2 → 3 → 7 → 8 → 5 → 6 → 4 → 9 → 10. Tasks 7 and 8 come early because they shape everything else.

That's about **25–35 hours** of work. Please send the sheet after tasks 1, 2, 3 and 7 so Claude can start the analysis while you do the rest.

## What happens after

Claude reads the sheet and writes a page-by-page decision for Talha, with each page marked **build / merge / drop / later**. Every page we decide to build gets a one-page brief first:

- who it's for
- why it exists
- its keywords
- the proof only that page has

Talha approves the brief before anything is designed.

## Sheet tabs

1 Baseline · 2 Industry matrix · 3 GEO cluster · 4 Service gaps · 5 SERP checks · 6 Competitor pages · 7 AI visibility · 8 Lists and directories · 9 Backlink gap · 10 Questions · 11 Notes

---

## Appendix A. Our current pages (for reference)

| Page | URL |
|---|---|
| Home | / |
| Link building | /services/link-building |
| Digital PR | /services/digital-pr |
| Brand mentions | /services/brand-mentions |
| HARO | /services/haro-links |
| Rejected in round 18, under review | /services/guest-posting, /services/niche-edits, /services/white-label-link-building |
| Pricing | /pricing |
| Case studies | /case-studies, plus 6 case studies |
| Blog | about 8 posts |
| Other | About, Contact, Free pilot |

## Appendix B. Industries (use these exact words as `<industry>`)

**Software and tech:**
- saas
- b2b saas
- software
- ai
- cybersecurity

**Money:**
- fintech
- crypto
- finance
- insurance
- mortgage

**Commerce:**
- ecommerce
- shopify
- dtc

**Legal:**
- law firm
- lawyer
- attorney
- personal injury

**Health:**
- healthcare
- medical
- dental
- dentist
- med spa
- plastic surgery
- telehealth
- chiropractor

**Property and home:**
- real estate
- home services
- roofing
- hvac
- plumbing
- solar
- construction

**Education:**
- education
- edtech
- tutoring

**Travel:**
- travel
- hotel

**Business type:**
- local business
- enterprise
- startup
- b2b
- agency
- recruitment
- staffing
- manufacturing
- logistics
- nonprofit

Excluded (we don't serve them): gambling, casino, iGaming, adult, CBD.

## Appendix C. Candidate main keywords (for Task 1 tracking and Task 5 SERP checks)

**Core:**
- link building services
- link building agency
- link building company
- link building packages
- link building pricing
- backlink services
- seo link building services
- managed link building

**Services:**
- guest posting services
- blogger outreach services
- blogger outreach
- niche edits
- link insertion service
- white label link building
- outsource link building
- link building reseller
- link building for agencies
- digital pr agency
- digital pr services
- brand mentions
- brand mention service
- haro link building
- haro alternatives

**AI search:**
- ai seo agency
- ai seo services
- generative engine optimization agency
- generative engine optimization services
- geo agency
- aeo agency
- aeo services
- answer engine optimization services
- llm seo agency
- ai search optimization services
- chatgpt seo agency
- ai visibility agency

**Industry:**
- saas link building agency
- saas link building services
- link building for lawyers
- link building services for lawyers
- ecommerce link building
- local link building
- enterprise link building
- geo for law firms
- geo for ecommerce
- aeo for fintech

**Lists:**
- best link building services
- best link building agencies
- best white label link building
- best guest posting services
- best digital pr agencies
- best geo agencies

Add any keyword from Tasks 2 and 3 that has 500+ searches a month and KD under 40.

## Appendix D. AI visibility

**Topics** (Semrush Prompt Research, Option A):
- link building agency
- white label link building
- guest posting service
- digital PR agency
- GEO agency
- AEO agency
- AI search visibility
- brand mentions
- HARO alternatives
- SaaS link building
- link building for law firms
- ecommerce link building

**Prompts** (manual, Option B). Use the exact wording:

1. What are the best link building agencies right now?
2. Recommend a link building agency that doesn't use PBNs.
3. Best link building services for a SaaS company.
4. I run an SEO agency. Which white label link building provider should I use?
5. Best guest posting services on real sites with real traffic.
6. Best niche edit or link insertion services.
7. Which agencies are best for digital PR for startups?
8. Best agencies to get my brand mentioned in ChatGPT answers.
9. What are the best GEO (generative engine optimization) agencies?
10. What are the best AEO agencies?
11. How do I get my brand recommended by ChatGPT?
12. Best HARO alternatives for getting quoted in the press.
13. What are good alternatives to FATJOE?
14. What are good alternatives to uSERP?
15. What are good alternatives to Editorial.Link?
16. Affordable link building agency with good quality.
17. Best link building agency for law firms.
18. Best link building agency for ecommerce stores.
19. Best link building agency for B2B or enterprise companies.
20. Best link building agency for fintech or crypto companies.
21. Best link building agency for education or edtech companies.
22. How much does link building cost per link?
23. Which link building companies can I trust?
24. Top link building companies in the United States.
25. Best agency for AI search visibility for a SaaS brand.
26. How do I get my company into "best of" list articles?
27. Best brand mention service for AI visibility.
28. Is guest posting still worth it?
29. What is Editorial HQ? (checks what AI already knows about us)
30. Is Editorial HQ a good link building agency? (same)
