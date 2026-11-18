# Semrush research round 2

The step-by-step guide for Muse lives in the doc **"Semrush research brief,
round 2"**: https://claude.ai/artifact/Gx2cuktvkFnH8CRNbEzEL2 (private until
Talha shares it). This file is only a pointer and a summary.

## Files

- `research-kit-round-2.xlsx`: everything Muse fills in or copies from.
  - Start here
  - 1 Checklist: 141 exports, each with an ID, the input, the settings and the file name
  - 2 Bulk batches: 541 ready-made keywords in 6 batches
  - 3 AI prompts log: 30 prompts × 4 AI tools, pre-filled
  - 4 Lists log: 15 searches × top 10
  - 5 Directories: 8 domains × 8 review sites
  - 6 Reddit log
  - 7 Notes
- `build_research_kit.py`: the script that builds the kit. Edit its lists and
  rerun it to rebuild the kit (git history of this file has the full v1 brief).

## Principle

Muse collects; Claude analyses. Muse makes no judgment calls: intent, page
type, which competitors matter and what to build are all decided by Claude
from the raw exports.

## Recipes

| Recipe | Phase | What | Checklist IDs |
| --- | --- | --- | --- |
| 1 | 1 | Keyword Overview bulk analysis: industry × service and candidate keywords | B1–B6 |
| 4 | 1 | AI visibility: Semrush AI Visibility Toolkit (Option A) or 120 manual prompt checks (Option B) | tab 3 |
| 2 | 2 | Keyword Magic Tool: AI search seeds, service gaps, 16 industries, questions | K01–K64, Q01–Q10 |
| 3 | 2 | SERP Analysis for 51 candidate main keywords | S01–S51 |
| 5 | 2 | "Best of" list articles | tab 4 |
| 6 | 2 | Review directories | tab 5 |
| 7 | 2 | Reddit | tab 6 |
| 8 | 2 | Backlink Gap (tab "All") | G1–G2 |
| 9 | 3 | Organic Research Pages for up to 8 new competitors Claude names | P1–P8 |

## Talha's part

The editorialhq.com and business data come from Talha, not Muse:

| ID | File |
| --- | --- |
| T1 | Semrush Domain Overview PDF |
| T2 | Semrush Referring Domains CSV |
| T3 | Search Console Performance export (last 3 months) |
| T4 | Search Console Indexing export |
| T5 | Search Console Links export |
| T6 | Client history: industry, country, service, spend, repeat, source, can results be shown. No names |

## What comes out

A page-by-page decision (build / merge / drop / later). Each page to build
gets a one-page brief (who, why, keywords, unique proof) for Talha's approval.
