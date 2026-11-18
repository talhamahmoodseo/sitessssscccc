# Round 15 plan

What the owner asked for, what we found on the site, and what changes. Anything
not listed here stays as it is.

## 1. Home Services (remove for now)

Found in: `pages/industries/HomeServices.tsx`, the route in `routes.tsx`, the
footer "Solutions" link, the "Local Services" persona CTA on the homepage, the
old-URL 301 in `functions.php`, and the screenshots.

- Delete the page and its route. `/industries/home-services` 301s to
  `/services/link-building` (in the theme, before WordPress routing). The old
  `/case-studies/home-services-local-pack` redirect also points there now, so
  there's no redirect chain.
- Footer link removed. The persona tab stays (it describes a client type, not
  the page), and its button now goes to `/services/link-building`.
- It drops out of the sitemap by itself: the prerender only lists pages it can
  reach through links.
- Kept in git history, so it can come back later as it was.

## 2. Hero animation

- Three clients, not five: SmileTutor (rankings + AI Overview), CryptoDesk
  (press + #1 in Dubai) and Ocuco (B2B software placement). They have the
  strongest evidence and cover three different sectors and services.
- The "stops after about two seconds" bug: the stage paused on mouse hover and
  on focus, and it sits right under the audit box, so the cursor was almost
  always on it. Hover and focus pausing go. It now pauses only when less than
  a third of it is on screen, or the browser tab is hidden.
- Calmer: 8 seconds per client instead of 7. The pause button stays (needed for
  accessibility, WCAG 2.2.2) but becomes quieter.

## 3. CryptoDesk

- Owner's numbers: at least 35 press releases, more than 100 placements.
- The link mix becomes 35 press releases, 35 guest posts, 15 niche edits and 15
  press features (still 100 in total, so every site-wide total stays the same).
  The split between the other three is still marked as "proposed" in
  CASE-STUDY-DRAFTS.md for the owner to confirm.
- Bitcoin.com gets its own entry, first in the press list. The article was
  checked live: "Crypto Desk Acquires Cryptodesk.com Domain in a Strategic $500K
  Deal", Bitcoin.com News, 15 July 2023.
- New optional `badge` on a case study, shown as a small label in the corner of
  its card: "Featured on Bitcoin.com". It appears on the case studies grid, the
  pilot page cards, the homepage results row and the hero card.
- Summary, card line, headline figure, homepage stat tile and search
  description updated to say 100+ placements and 35+ press releases.

## 4. FAQs (all of them)

FAQs live on: homepage, pricing, pilot, contact, link building, digital PR,
brand mentions, HARO & expert quotes. All are rewritten. Each one:

- answers the question in its first sentence;
- uses the words people actually search ("how much does link building cost",
  "are guest posts safe", "white label link building");
- states facts (prices, timelines, what's included) without filler;
- avoids the tics the owner flagged: "stay invisible", "forward to your boss",
  "be careful with anyone who…", "selling something", "honestly", "don't
  bother".

The FAQPage schema reads the same arrays, so it updates automatically.

## 5. Closing CTA

Found in two places: `HomeCTA` (homepage) and `CTABand` (every inner page).

- Remove the "Get ranked. Get cited." headline (it repeats the hero), the
  "Rather talk it through? Book a call" row and the email address.
- One clear action: a free audit. Homepage keeps the website field, since it's
  the quickest way in. Inner pages get the same field instead of two buttons.
- A new headline that says what the audit is: "Find out what's holding your
  rankings back." Short supporting line on what's in it and when it arrives,
  plus three small facts underneath (48 hours, no call needed, free).
- Same dark band, so it still closes the page the way the rest of the site
  does.

## 6. Guarantee terms (pricing page)

"What's covered, in plain English / No small print. This is exactly what each
guarantee covers…" becomes:

- H2: "Our guarantees, / in full."
- Side: "The complete terms of our money-back and link replacement guarantees:
  what qualifies, what doesn't, and how to make a claim."

The card labels ("Covered", "Not covered", "How to use it") become "What's
included", "Exclusions" and "How to claim".

## 7. Site-wide copy pass

A section-by-section read of every page, fixing only what reads as filler or
AI-written. The design, the structure and the facts stay. Main fixes:

- "honest / honestly / genuinely" used as filler (about 20 places);
- "No small print", "in plain English", "no catch";
- "stay invisible on client calls" → "we never contact your clients";
- "pulling their weight", "Most clients don't bother", "Tell us one boring
  thing about your business";
- the pilot bar: "No catch, no contract." → "No contract, no card."

Not changed: prices, guarantees, client quotes (approved verbatim), case study
numbers other than CryptoDesk's.
