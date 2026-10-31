import { Link } from "react-router-dom";
import { GUARANTEES } from "@/components/Guarantees";
import { PER_LINK, TRIAL_PRICE, usd } from "@/lib/pricing";
import { A, H, L, LegalPage, P } from "./LegalPage";

const EMAIL = "team@editorialhq.com";

const linkCls = "font-semibold text-navy-dark underline underline-offset-2";

/**
 * /terms. Prices come from lib/pricing and the guarantees from
 * components/Guarantees, so this page can't drift from what we sell.
 */
const Terms = () => (
  <LegalPage
    title="Terms of service"
    seoTitle="Terms of Service"
    description="How ordering, delivery, refunds and link replacement work at Editorial HQ, in plain English."
    updated="27 October 2026"
    intro={
      <p>
        These are the terms for every order you place with Editorial HQ.
        We've kept them short and plain. If anything here is unclear, ask
        us before you order.
      </p>
    }
  >
    <H>What we do</H>
    <P>
      We place editorial links and mentions for you: guest posts, niche
      edits, digital PR, brand mentions and expert quotes, on real sites
      that pass our checks. What each service includes is described on its
      page and on the <Link to="/pricing" className={linkCls}>pricing page</Link>.
    </P>

    <H>Orders and prices</H>
    <L
      items={[
        `Prices are in US dollars. A standard placement is ${usd(PER_LINK)}. The trial placement is ${usd(TRIAL_PRICE)}, one per company.`,
        "Every order is confirmed in writing (an email or invoice) with the package, the pages we'll link to and the price. Work starts once the order is confirmed and paid as the invoice says.",
        "Custom packages are quoted in writing before you pay anything.",
        "We can turn down an order, for example when your niche is one our publishers won't accept. If we do, you pay nothing for it.",
      ]}
    />

    <H>Delivery</H>
    <L
      items={[
        "Most links go live within two to four weeks of your order. We'll tell you if yours will take longer.",
        "You get a report with every live URL, the site and the anchor, so you can check each placement yourself.",
        "If you'd like to approve each site before your link goes live, ask when you order.",
      ]}
    />

    <H>Our guarantees</H>
    <P>Every order comes with these:</P>
    <L
      items={GUARANTEES.map((g) => (
        <>
          <strong className="text-navy-dark">{g.title}.</strong> {g.line}
        </>
      ))}
    />
    <P>
      What each one covers, what it doesn't and how to claim are set out in
      the{" "}
      <Link to="/pricing#guarantee-terms" className={linkCls}>
        guarantee terms
      </Link>
      , which are part of these terms.
    </P>

    <H>What we can't promise</H>
    <L
      items={[
        "Rankings or traffic. Nobody controls Google or AI answers, so no honest agency guarantees positions.",
        "Third-party metrics such as DR or Authority Score. Tools update them all the time, so we record them on the day your link goes live.",
      ]}
    />

    <H>Your part</H>
    <L
      items={[
        "The pages we link to are yours, and they're legal and accurate.",
        "If you send us content or facts to use, you have the right to share them.",
        "Tell us about anything that limits the work, such as markets, competitors or words you can't use.",
      ]}
    />

    <H>Confidentiality and white label</H>
    <L
      items={[
        "We keep your strategy, target pages and results confidential.",
        "For white-label orders, our name never appears and we never contact your clients. We'll sign an NDA on request.",
      ]}
    />

    <H>Limits</H>
    <P>
      If something goes wrong on our side, the most we owe you is what you
      paid for the order in question, and the guarantees above say how that
      works. We're not responsible for losses from things outside our
      control, such as a Google update or a publisher's own decisions,
      beyond what the guarantees cover.
    </P>

    <H>Changes and contact</H>
    <P>
      We may update these terms. The version on this page when you place an
      order is the one that applies to it. Questions:{" "}
      <A href={`mailto:${EMAIL}`}>{EMAIL}</A>. How we handle your data is in
      our <Link to="/privacy" className={linkCls}>privacy policy</Link>.
    </P>
  </LegalPage>
);

export default Terms;
