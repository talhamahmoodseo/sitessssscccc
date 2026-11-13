# Profile photo guide (LinkedIn, email signature, website)

One photo, used everywhere. People meet Talha on video calls, so the photo
has to look like him on a call. Aim for about 80% the same. Better light,
better angle, sharper. Not a different person.

---

## 1. What your three favourite photos have in common

| | Photo 1 (curly hair, dark) | Photo 2 (beard, turquoise) | Photo 3 (glasses, outdoors) |
|---|---|---|---|
| Background | Plain charcoal, almost black | One bright flat colour | Real place, heavily blurred |
| Light | Soft light from one side, face half in gentle shadow | Bright and even, no harsh shadows | Natural daylight |
| Expression | Small closed-mouth smile, very calm | Soft smile, eyes happy | Big smile with teeth |
| Head | Slight tilt, looking straight at the camera | Turned a little to one side | Straight at the camera |
| Clothes | Dark, plain | White shirt | Dark jacket, colour underneath |
| Crop | Head and top of shoulders, face fills the frame | Same | Same |

So your taste is: **tight crop, eyes clearly visible, a real smile, one
simple background, soft flattering light, natural skin.** No props, no
clutter, no filters. That lines up with what the research says works (section 3).

---

## 2. Which of your photos to give the AI

| Your photo | Verdict | Why |
|---|---|---|
| 1. No glasses, no cap, looking at the camera | **Use as reference** | Clearest view of your eyes and face shape |
| 2. Cap + glasses, looking down | Skip | Cap shades the eyes, looking down reads as unsure |
| 3. Cap + glasses, brighter | Skip | Same, and the cap reads casual |
| 4. Glasses, no cap | **Use as main reference** | This is how clients see you on calls |

**Final look: glasses on, no cap.** You wear the glasses on calls, so the
photo matches what clients already know. And in Photofeeler's study of
800 profile photos, normal glasses slightly *raised* how competent and
likeable people seemed (sunglasses and anything hiding the eyes lowered it).
Also make one version without glasses, just to compare.

**Problem with the current photos:** they're webcam screenshots. They're
soft, a bit dark, and the video-call icons sit right across your eyes.
Both Google and the AI-photo guides warn that low-quality references make
the AI "reinterpret" your face, and that's how you end up looking like a
stranger. Ten minutes of better reference photos will help more than any
prompt:

### Take 3 new reference photos (phone, 10 minutes)

1. Stand facing a window in daytime. Light on your face, not behind you.
2. Someone else holds the phone **at your eye level, about 1.5 m away,
   using the 2x zoom**. Or put it on a stack of books with the timer.
   Don't use the selfie camera. Close up, it's wide-angle and makes the
   nose and face look wider than they are. That's half the reason webcam
   photos look worse than real life.
3. Glasses on, clean lenses, no cap. Plain dark shirt.
4. Take three shots: facing the camera, turned a little left, turned a
   little right. One with a real smile, one with a small smile.

Then upload those to ChatGPT/Gemini instead of the webcam screenshots. If you
can't do that today, use photos 1 and 4 as they are. The prompts below
tell the AI to remove the call icons.

---

## 3. What the research says (so we're not guessing)

**About the photo itself**
- **Face fills about 60% of the frame**, and the photo is at least 400×400 px
  (LinkedIn's own recommendation, via Kleo's guide). Export at 1024×1024 or
  bigger and let LinkedIn shrink it.
- **Smile with teeth** gave the biggest jump in likeability in Photofeeler's
  data (+1.35 on their scale). A huge laughing smile made people look less
  competent, though. Aim for a natural, relaxed smile.
- **"Squinch"**: slightly narrowed lower eyelids, like a real smile.
  Wide-open eyes look nervous. Raised competence, likeability and influence.
- **A soft shadow along the jaw** raised all three scores. That's why
  side light (your photo 1) looks so good.
- **Dark clothes** (a dark suit in their study) raised competence. You
  don't need a full suit as a freelancer-turned-agency. A dark blazer over
  a plain tee, or a plain dark shirt, does the job.
- **Too much colour saturation** lowered competence. Keep colours natural.
- **Too much editing backfires.** If the photo doesn't look like you when
  someone meets you on a call, you've lost trust in the first ten seconds.

**About prompting**
- **OpenAI's own guide** (GPT image models): write in a fixed order:
  background → subject → key details → limits. Say what the image is for
  ("LinkedIn headshot"). Say "photorealistic". Label each uploaded photo
  ("Image 1 is…"). For edits, say clearly what changes and what stays the
  same, and **repeat the "keep the same" list every time you ask for a
  change**, or the face drifts. Make one small change at a time.
- **Google's own guide** (Gemini image): describe the scene in sentences,
  not a list of keywords. Use photographer words ("85mm portrait lens",
  "soft window light", "eye level"). Say what you want, not what you don't
  ("plain mint background", not "no clutter"). If the face starts drifting
  after many edits, **start a new chat** and paste the full prompt again.
- Gemini tends to slim and "beautify" faces by default, and AI tools often
  lighten South Asian skin. Ask for your real skin tone and face shape
  every time.

---

## 4. The angle and pose to ask for

This is where "handsome" actually comes from, without changing your face:

- **Camera slightly above eye level**, never below. From below you get a
  double chin and nostrils. Slightly above looks friendly and confident.
- **Shoulders turned about 30° away from the camera, face turned back to
  it.** It looks slimmer and more natural than standing square on.
- **Chin slightly forward and down** (photographer Peter Hurley's trick).
  It defines the jawline.
- **85mm portrait lens look**: no wide-angle stretching, background soft.
- **Soft light from one side (45°)** plus a faint light behind for
  separation. You get a gentle jaw shadow and light in the eyes.
- **Eyes on the camera**, small squinch, relaxed real smile.

---

## 5. Three styles to try (one per favourite photo)

| | Style | Best for | Background |
|---|---|---|---|
| A | **Brand colour**, like your turquoise photo | LinkedIn (stands out in the feed) | Your site's soft mint `#B6E7CB` or lilac `#D1CCF8` |
| B | **Dark studio**, like your curly-hair photo | Website About page, speaker bios | Charcoal `#1A1A1A` with a soft glow behind |
| C | **Natural blur**, like your glasses photo | Friendly, approachable version | Blurred bright modern office |

**My pick: A in mint.** It's the same mint as your website's case-study
tiles, so the photo, the site and your posts feel like one brand. Plus a bright
plain colour pops at thumbnail size, where LinkedIn photos are actually
seen. Make A, B and C, then use whichever looks most like you.

---

## 6. The prompts

Upload your reference photos first (2–3 of them), then paste the prompt.
Every prompt has the same "keep" block. Don't remove it.

### Prompt A: brand colour (ChatGPT)

```
Image 1 and Image 2 are photos of me, Talha, taken on a video call. Use them
only to learn my face. Image 2 shows me with my glasses, which is how I look
on client calls.

Create a photorealistic professional headshot of me for my LinkedIn profile,
email signature and agency website. I run a link building and digital PR
agency, so it should feel confident, warm and trustworthy, not corporate or
stiff.

Background: a smooth, plain soft mint colour (#B6E7CB), evenly lit, with a
very slight natural falloff around the edges.

Subject: me, from the top of the head to just below the shoulders, face
filling about 60% of a square frame, centred with a little space above the
hair. Shoulders turned about 30 degrees to my left, face turned back to the
camera, chin slightly forward and down. Looking straight into the lens with
relaxed eyes and a slight squinch, and a natural, friendly smile showing a
little of my teeth.

Details: wearing my clear-frame glasses with clean anti-glare lenses, eyes
fully visible with no reflections. Hair neatly styled and side-swept like in
Image 1. Moustache and light beard neatly trimmed with clean edges. Wearing a
plain dark navy crew-neck tee under a charcoal blazer.

Lighting and camera: soft key light from the front-left at about 45 degrees,
gentle fill, faint rim light separating my hair from the background, soft
natural shadow along the jawline, catchlights in the eyes. Camera slightly
above eye level. Looks like an 85mm portrait lens on a professional camera,
sharp focus on the eyes, natural colours with moderate saturation.

Keep the same: my exact face shape, eye shape, nose, lips, eyebrows,
hairline, ears and natural brown skin tone. Keep my real skin texture,
gently cleaned up (even tone, no shine), not airbrushed or plastic. Do not
lighten my skin, slim my face or change my age. It must look like me on
a good day, so people recognise me instantly on a video call.

Remove the video-call icons from the photos. No text, no logos, no
watermark. Square 1:1 image.
```

### Prompt A: same thing for Gemini (written as a scene, as Google advises)

```
Using the photos I uploaded of myself, create a photorealistic square
LinkedIn headshot of me. Keep my exact face: the same face shape, eyes,
nose, lips, eyebrows, hairline and natural brown skin tone, with my real
skin texture, just cleaned up and evenly lit. It should look like me on my
best day, so that clients recognise me instantly on a video call. Keep my
face shape as it is, with the same width and age.

I'm the founder of a link building and digital PR agency. In the photo I'm
standing against a smooth, plain soft mint background (#B6E7CB). My
shoulders are turned slightly to the side and my face is turned back to the
camera, chin a little forward. I'm looking straight into the lens with a
relaxed, confident expression and a warm, natural smile showing a little of
my teeth. I'm wearing my clear-frame glasses with clean anti-glare lenses,
so my eyes are fully visible. My hair is neatly side-swept, my light beard
and moustache are neatly trimmed, and I'm wearing a charcoal blazer over a
plain dark navy tee.

The light is soft and flattering: a large soft light from the front-left,
a gentle fill, and a faint rim light behind me, giving a soft shadow along
my jawline and light in my eyes. The camera is just above eye level, shot
with an 85mm portrait lens, sharp on the eyes, natural colours. The frame is
tight: head and top of the shoulders, my face filling most of the image.
The image is clean, with only me and the mint background.
```

### Prompt B: dark studio

Use prompt A and swap these two parts:

```
Background: a plain deep charcoal studio backdrop (#1A1A1A) with a very
soft, subtle lighter glow behind my head.

Lighting: low-key studio lighting. One large soft light from my left at 45
degrees, so the left side of my face is bright and the right side falls
into gentle shadow, plus a soft rim light on my hair and shoulders. Calm,
premium, editorial mood. Small closed-mouth smile, very calm and confident.
Plain black or dark navy shirt.
```

### Prompt C: natural blur

Use prompt A and swap these two parts:

```
Background: a bright, modern office with large windows, heavily blurred
(shallow depth of field), in soft neutral and warm tones. Nothing readable,
no other people.

Lighting: soft natural daylight from a window on my left, warm and
friendly. A genuine, relaxed smile showing my teeth. Dark jacket over a
plain crew-neck tee.
```

### Prompt D: no-glasses version (to compare)

Add this to any prompt above, and use Image 1 as the main reference:

```
This version without glasses. Keep everything else exactly the same.
```

---

## 7. Fix-it follow-ups (one change at a time)

Paste one of these after the first result. Each one repeats the "keep"
rule, because that's what stops the face drifting.

| Problem | Say this |
|---|---|
| Doesn't look like me | "The face has drifted. Match my face shape, eyes, nose and hairline to Image 1 and Image 2 exactly. Change nothing else." |
| Skin got lighter | "Return my skin to the natural brown tone in the reference photos. Change nothing else." |
| Looks plastic or airbrushed | "Bring back natural skin texture and pores, like a real photo from a professional camera. Change nothing else." |
| Glasses have glare | "Remove the reflections from the glasses so my eyes are fully clear. Change nothing else." |
| Smile is fake or too big | "Make the smile smaller and more natural, eyes slightly squinched, like I'm about to say hello. Change nothing else." |
| Too serious | "Add a warm, friendly smile showing a little of my teeth. Change nothing else." |
| Background colour is off | "Make the background exactly #B6E7CB, plain and evenly lit. Keep me exactly the same." |
| Crop is wrong | "Recrop so my face fills about 60% of a square frame, with a little space above my hair. Keep me exactly the same." |

If it still drifts after 3–4 fixes, **start a new chat** with the full
prompt and the original reference photos. Don't keep editing the edited
image. Both OpenAI and Google say drift builds up that way.

---

## 8. Choosing the final one

1. **Make the shortlist.** Run each style 2–3 times in ChatGPT and in
   Gemini. Keep your best 3.
2. **The circle test.** LinkedIn and Gmail show the photo in a small
   circle. Crop each one to a circle at 100 px. Is it still clearly you,
   eyes visible, smiling?
3. **The "is this me?" test.** Show the 3 to your team member and two
   people who know you from calls. Ask which one looks most like you, not
   which one looks best. Pick the one that wins both.
4. **Check the details.** Look for melted glasses frames, odd ears, extra
   buttons, a strange hairline or blurry teeth. AI makes small mistakes
   at the edges.
5. **Use the same photo everywhere**: LinkedIn, email signature, website
   About page, Clutch, Google Business. One face across every platform is
   what builds recognition.
6. **Sizes:** keep the original (1024×1024 or larger). LinkedIn: upload
   as is. Email signature: 200×200 px. Website: use the original.

**Honesty note:** an AI-enhanced photo of yourself is fine and very common
now. What breaks trust is a photo that looks like someone else. Your 80%
rule is exactly right. If in doubt, pick the more realistic one.

---

## Sources

- [Kleo, 23 proven LinkedIn profile picture examples](https://www.kleo.so/blog/linkedin-profile-picture-examples): 60% face, 400×400 px, plain or blurred background, no hats or sunglasses hiding the eyes
- [OpenAI cookbook, GPT image models prompting guide](https://cookbook.openai.com/examples/multimodal/image-gen-models-prompting-guide): prompt order, "photorealistic", label each image, change-vs-keep, repeat the keep list, small edits
- [Google Developers Blog, how to prompt Gemini 2.5 Flash Image](https://developers.googleblog.com/en/how-to-prompt-gemini-2-5-flash-image-generation-for-the-best-results/): describe the scene, photographer terms, positive phrasing, restart when the face drifts
- [Photofeeler, the science behind your best LinkedIn profile picture](https://blog.photofeeler.com/linkedin-profile-picture/): squinch, jaw shadow, smile with teeth, dark clothes, don't over-edit
- [MarketingProfs, the keys to an effective profile photo](https://marketingprofs.com/charts/2015/27361/the-keys-to-an-effective-profile-photo): Photofeeler numbers on glasses, smile, saturation (60,000+ ratings of 800 photos; company-reported, so treat as a guide)
- [Nano Banana headshot prompts (third-party)](https://blog.laozhang.ai/en/posts/nano-banana-headshot-portrait-prompts) and [fixing face changes in Gemini edits (third-party)](https://www.media.io/ai-image-generator/fix-gemini-face-change.html): low-quality references cause face changes; Gemini slims and beautifies faces by default
