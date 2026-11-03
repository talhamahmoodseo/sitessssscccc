# Email signature

`preview.png` shows how it looks. `signature.html` is the one you copy from.
`talha-photo-192.png` is the round photo (shown at 96 px, made at 2x so it's
sharp on phones and Retina screens).

## What changed from the old one

| Old | New | Why |
|---|---|---|
| Dark old photo | The new mint headshot, round | Same face as LinkedIn, so people recognise you |
| "Link Building & Digital PR Expert" | "Founder, Editorial HQ" + "Link building · Digital PR · Brand mentions for AI search" | Shows you run an agency, says what you do instead of calling yourself an expert, and adds the AI angle |
| Gmail address | team@editorialhq.com + editorialhq.com | Your company email and website look more established than a Gmail address |
| Blue underlined links | Plain dark text, still clickable | Looks calmer and more expensive |
| Phone opens a call | Phone opens WhatsApp | Most international clients reach Pakistan numbers on WhatsApp, not by phone |
| Sage green button with a calendar icon | Black "Book a 30-min call →" button | Matches the brand, and it's built from HTML, not an image, so it always shows |
| Round social icons | "LinkedIn \| Instagram" as text | Icons are images: Gmail often blocks them and they look blurry. Text never breaks |
| No proof | "Trusted by CapCut · SmileTutor · Ocuco · Defender · CryptoDesk" | Every email now carries your client list |

## Set it up in Gmail (10 minutes)

**Step 1: give the photo a public link.** Gmail removes photos that are
pasted in or uploaded straight into a signature, so the photo has to live at
a web address. Pick one:
- **Your WordPress site (best):** Media → Add New → upload
  `talha-photo-192.png` → click it → "Copy URL to clipboard".
- **No site yet:** upload it to [postimages.org](https://postimages.org),
  then copy the **Direct link** (it ends in `.png`).

Google Drive links do **not** work reliably in signatures.

**Step 2: add your LinkedIn and Instagram links.** Open `signature.html` in a
text editor (Notepad is fine) and replace `LINKEDIN_URL` and `INSTAGRAM_URL`
with your profile links. Or send them to Claude and it will put them in.

**Step 3: copy it.** Open `signature.html` in Chrome, paste the photo link
into the box at the top, and click **Copy signature**.

**Step 4: paste into Gmail.** Gmail → ⚙️ → See all settings → General →
Signature → Create new ("Main") → paste into the box. Under "Signature
defaults", choose it for new emails and replies. Scroll down → Save Changes.

**Step 5: test it.** Send an email to yourself and to a friend on Outlook or
an iPhone. Check that the photo shows, the button opens your Calendly, and
the WhatsApp link works.

For the Gmail phone app: it uses a separate plain-text signature
(app → Settings → your account → Mobile signature). Leave it empty and Gmail
on the phone will use this one on most accounts.

## Rules it follows

- 470 px wide, so it fits phones without shrinking.
- Arial everywhere. Brand fonts don't load in email, and Arial looks the same
  in every inbox.
- One photo, no other images, so nothing gets blocked and it stays light.
- One call to action (the booking button).
- Works in dark mode: the black button keeps white text, and the photo is a
  round PNG with no white box around it.
