import re
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter

OUT = "/home/user/sitessssscccc/docs/seo/research-kit-round-2.xlsx"
slug = lambda s: re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

INDUSTRIES = ["saas","b2b saas","software","ai","cybersecurity","fintech","crypto","finance","insurance","mortgage",
 "ecommerce","shopify","dtc","law firm","lawyer","attorney","personal injury","healthcare","medical","dental","dentist",
 "med spa","plastic surgery","telehealth","chiropractor","real estate","home services","roofing","hvac","plumbing","solar",
 "construction","education","edtech","tutoring","travel","hotel","local business","enterprise","startup","b2b","agency",
 "recruitment","staffing","manufacturing","logistics","nonprofit"]
PATTERNS = ["{i} link building","link building for {i}","{i} link building services","{i} link building agency",
 "{i} backlinks","{i} digital pr","{i} seo agency","{i} seo company","geo for {i}","ai seo for {i}"]
heads = []
for i in INDUSTRIES:
    for p in PATTERNS:
        k = p.format(i=i)
        if k not in heads: heads.append(k)

CANDIDATES = {
 "Core": ["link building services","link building agency","link building company","link building packages","link building pricing","backlink services","seo link building services","managed link building"],
 "Services": ["guest posting services","blogger outreach services","blogger outreach","niche edits","link insertion service","white label link building","outsource link building","link building reseller","link building for agencies","digital pr agency","digital pr services","brand mentions","brand mention service","haro link building","haro alternatives"],
 "AI search": ["ai seo agency","ai seo services","generative engine optimization agency","generative engine optimization services","geo agency","aeo agency","aeo services","answer engine optimization services","llm seo agency","ai search optimization services","chatgpt seo agency","ai visibility agency"],
 "Industry": ["saas link building agency","saas link building services","link building for lawyers","link building services for lawyers","ecommerce link building","local link building","enterprise link building","geo for law firms","geo for ecommerce","aeo for fintech"],
 "Lists": ["best link building services","best link building agencies","best white label link building","best guest posting services","best digital pr agencies","best geo agencies"],
}
cand = [k for v in CANDIDATES.values() for k in v]
GEO_SEEDS = ["ai seo","generative engine optimization","geo agency","geo services","answer engine optimization","aeo agency","aeo services","llm seo","llm optimization","ai search optimization","ai visibility","chatgpt seo","rank in chatgpt","get recommended by chatgpt","ai overviews seo","google ai mode seo","perplexity seo","brand mentions ai","ai brand visibility","ai citations"]
GAP_SEEDS = ["brand mention service","brand mentions service","unlinked brand mentions","blogger outreach","managed link building","link building subscription","monthly link building","press release seo","expert quotes link building","featured.com","qwoted","journalist requests"]
DEEP = ["saas","ecommerce","law firm","lawyer","attorney","healthcare","dental","real estate","local","enterprise","fintech","crypto","education","home services","b2b","startup"]
Q_SEEDS = ["white label link building","guest posting","niche edits","digital pr agency","geo agency","aeo","ai seo","brand mentions","saas link building","link building for lawyers"]

batch6 = []
for k in cand + GAP_SEEDS + GEO_SEEDS:
    if k not in batch6 and k not in heads: batch6.append(k)
batches = [heads[i:i+95] for i in range(0, len(heads), 95)] + [batch6[i:i+100] for i in range(0, len(batch6), 100)]

wb = Workbook()
H = Font(bold=True, color="FFFFFF"); HF = PatternFill("solid", fgColor="1F2937")
EX = PatternFill("solid", fgColor="FFF7D6")
def sheet(ws, headers, widths):
    ws.append(headers)
    for c in ws[1]: c.font = H; c.fill = HF; c.alignment = Alignment(wrap_text=True, vertical="top")
    for n, w in enumerate(widths, 1): ws.column_dimensions[get_column_letter(n)].width = w
    ws.freeze_panes = "A2"
def yesno(ws, rng, opts='"Yes,No"'):
    dv = DataValidation(type="list", formula1=opts, allow_blank=True); ws.add_data_validation(dv); dv.add(rng)

# 0 Start here
ws = wb.active; ws.title = "Start here"
lines = [
 "Editorial HQ research kit, round 2 (for Muse)",
 "",
 "The step-by-step guide is the doc 'Semrush research brief, round 2'. This file holds everything you fill in or copy from.",
 "",
 "Your job: collect the data exactly as listed. You don't need to judge anything. Claude does the analysis.",
 "",
 "Tabs:",
 "1 Checklist: every Semrush export, with its ID, the exact input, the settings and the file name. Tick 'Done' and write the row count.",
 "2 Bulk batches: the keyword lists to paste into Keyword Overview > Bulk Analysis (Recipe 1).",
 "3 AI prompts log: 30 prompts x 4 AI tools, already filled in. You add what each answer says (Recipe 4, Option B).",
 "4 Lists log: 15 Google searches x top 10 results, already numbered (Recipe 5).",
 "5 Directories: 8 domains x 8 review sites (Recipe 6).",
 "6 Reddit log: threads where people recommend agencies (Recipe 7).",
 "7 Notes: anything odd or surprising.",
 "",
 "Rules:",
 "- Database: always United States (US).",
 "- Don't add filters in Semrush unless the recipe says so. We filter later.",
 "- Never click 'Update metrics' (it uses up a monthly limit). 'n/a' is fine.",
 "- Save every export as CSV. Rename it to the 'File name' in the Checklist, then put it in the Drive folder 'SEMrush exports round 2'.",
 "- A result with 0 keywords is still a result: tick Done and write 0.",
 "- Yellow rows are examples. Leave them, or delete them when you're done.",
]
for l in lines: ws.append([l])
ws["A1"].font = Font(bold=True, size=14); ws.column_dimensions["A"].width = 120

# 1 Checklist
ws = wb.create_sheet("1 Checklist")
sheet(ws, ["ID","Phase","Recipe","Tool","Input (type exactly this)","Settings","File name","Done","Rows / keywords shown","Notes"], [7,7,8,26,40,40,44,8,12,30])
rows = []
for n, b in enumerate(batches, 1):
    rows.append([f"B{n}",1,"1","Keyword Overview > Bulk Analysis",f"Tab '2 Bulk batches', column Batch {n} ({len(b)} keywords)","US","B%d-bulk.csv" % n])
for n, k in enumerate(GEO_SEEDS, 1):
    rows.append([f"K{n:02d}",2,"2","Keyword Magic Tool",k,"US · Broad Match · no filters",f"K{n:02d}-{slug(k)}.csv"])
o = len(GEO_SEEDS)
for n, k in enumerate(GAP_SEEDS, o+1):
    rows.append([f"K{n:02d}",2,"2","Keyword Magic Tool",k,"US · Broad Match · no filters",f"K{n:02d}-{slug(k)}.csv"])
o += len(GAP_SEEDS)
n = o
for i in DEEP:
    for p in ["{i} link building","{i} backlinks"]:
        n += 1; k = p.format(i=i)
        rows.append([f"K{n:02d}",2,"2","Keyword Magic Tool",k,"US · Broad Match · no filters",f"K{n:02d}-{slug(k)}.csv"])
for m, k in enumerate(Q_SEEDS, 1):
    rows.append([f"Q{m:02d}",2,"2","Keyword Magic Tool (Questions)",k,"US · Broad Match · click 'Questions'",f"Q{m:02d}-{slug(k)}.csv"])
for m, k in enumerate(cand, 1):
    rows.append([f"S{m:02d}",2,"3","Keyword Overview > SERP Analysis",k,"US · export the SERP Analysis table",f"S{m:02d}-{slug(k)}.csv"])
rows.append(["G1",2,"8","Backlink Gap","editorialhq.com, userp.io, editorial.link, linkbuilder.io, fatjoe.com","US · tab 'All' · Prospects for: editorialhq.com","G1-backlink-gap.csv"])
rows.append(["G2",2,"8","Backlink Gap","editorialhq.com, outreachmonks.com, siegemedia.com, pageonepower.com","US · tab 'All' · Prospects for: editorialhq.com","G2-backlink-gap.csv"])
for m in range(1, 9):
    rows.append([f"P{m}",3,"9","Organic Research > Pages","(Claude sends the domain after phase 2)","US · Pages tab · export all",f"P{m}-<domain>-pages.csv"])
for r in rows: ws.append(r + ["", "", ""])
yesno(ws, f"H2:H{len(rows)+1}")

# 2 Bulk batches
ws = wb.create_sheet("2 Bulk batches")
for n, b in enumerate(batches, 1):
    ws.cell(row=1, column=n, value=f"Batch {n}").font = H
    ws.cell(row=1, column=n).fill = HF
    ws.column_dimensions[get_column_letter(n)].width = 38
    for r, k in enumerate(b, 2): ws.cell(row=r, column=n, value=k)
ws.freeze_panes = "A2"

# 3 AI prompts log
PROMPTS = [
 "What are the best link building agencies right now?","Recommend a link building agency that doesn't use PBNs.","Best link building services for a SaaS company.",
 "I run an SEO agency. Which white label link building provider should I use?","Best guest posting services on real sites with real traffic.","Best niche edit or link insertion services.",
 "Which agencies are best for digital PR for startups?","Best agencies to get my brand mentioned in ChatGPT answers.","What are the best GEO (generative engine optimization) agencies?",
 "What are the best AEO agencies?","How do I get my brand recommended by ChatGPT?","Best HARO alternatives for getting quoted in the press.",
 "What are good alternatives to FATJOE?","What are good alternatives to uSERP?","What are good alternatives to Editorial.Link?",
 "Affordable link building agency with good quality.","Best link building agency for law firms.","Best link building agency for ecommerce stores.",
 "Best link building agency for B2B or enterprise companies.","Best link building agency for fintech or crypto companies.","Best link building agency for education or edtech companies.",
 "How much does link building cost per link?","Which link building companies can I trust?","Top link building companies in the United States.",
 "Best agency for AI search visibility for a SaaS brand.","How do I get my company into \"best of\" list articles?","Best brand mention service for AI visibility.",
 "Is guest posting still worth it?","What is Editorial HQ?","Is Editorial HQ a good link building agency?"]
PLATFORMS = ["ChatGPT (search on)","Google AI Mode","Google AI Overview","Perplexity"]
ws = wb.create_sheet("3 AI prompts log")
sheet(ws, ["#","Platform","Prompt (copy exactly)","Date","Location (US VPN or your country)","Brands named, in order (comma separated)","Source URLs cited (one per line)","Editorial HQ named?","Screenshot file name","Notes"], [5,20,52,11,16,48,60,10,22,26])
ws.append(["ex","ChatGPT (search on)","Best link building services for a SaaS company.","2026-11-18","US (VPN)","uSERP, Siege Media, FATJOE","https://example.com/best-saas-link-building\nhttps://www.reddit.com/r/SaaS/...","No","ex-chatgpt.png","Example row"])
for c in ws[2]: c.fill = EX
for n, p in enumerate(PROMPTS, 1):
    for pl in PLATFORMS: ws.append([n, pl, p, "", "", "", "", "", "", ""])
for row in ws.iter_rows(min_row=2):
    for c in row: c.alignment = Alignment(wrap_text=True, vertical="top")
yesno(ws, f"H2:H{ws.max_row}", '"Yes,No"')

# 4 Lists log
SEARCHES = ["best link building agencies","best link building services","best link building companies","best white label link building","best guest posting services","best niche edit services","best digital pr agencies","best geo agencies","best aeo agencies","best ai seo agencies","best link building agency for saas","fatjoe alternatives","editorial.link alternatives","outreach monks alternatives","userp alternatives"]
ws = wb.create_sheet("4 Lists log")
sheet(ws, ["Google search","Rank","Result URL","Website name","Date shown on page (updated / published)","Agencies named in the article, in order","Notes"], [34,6,60,22,18,70,24])
ws.append(["best link building agencies",1,"https://example.com/best-link-building-agencies","Example Blog","Updated Oct 2026","uSERP, Siege Media, Editorial.Link, FATJOE","Example row"])
for c in ws[2]: c.fill = EX
for s in SEARCHES:
    for r in range(1, 11): ws.append([s, r, "", "", "", "", ""])

# 5 Directories
DOMAINS = ["editorialhq.com","userp.io","editorial.link","linkbuilder.io","fatjoe.com","outreachmonks.com","siegemedia.com","pageonepower.com"]
DIRS = ["Clutch","G2","GoodFirms","DesignRush","Sortlist","UpCity","TechBehemoths","Trustpilot"]
ws = wb.create_sheet("5 Directories")
sheet(ws, ["Company domain","Directory","Profile found?","Profile URL","Number of reviews","Rating","Notes"], [22,16,12,60,12,10,30])
for d in DOMAINS:
    for x in DIRS: ws.append([d, x, "", "", "", "", ""])
yesno(ws, f"C2:C{ws.max_row}")

# 6 Reddit
ws = wb.create_sheet("6 Reddit log")
sheet(ws, ["Google search used","Thread URL","Subreddit","Thread date","Upvotes","Agencies recommended","Agencies warned against","Notes"], [46,60,16,12,9,40,40,24])
for q in ["site:reddit.com link building agency recommendation","site:reddit.com white label link building","site:reddit.com guest post service recommendation","site:reddit.com GEO agency OR AEO agency recommendation"]:
    for _ in range(10): ws.append([q, "", "", "", "", "", "", ""])

# 7 Notes
ws = wb.create_sheet("7 Notes")
sheet(ws, ["Date","Recipe / ID","What you noticed"], [12,14,120])

wb.save(OUT)
print("batches", [len(b) for b in batches], "heads", len(heads), "checklist rows", len(rows), "cand", len(cand))
