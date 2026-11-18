import { Link } from "react-router-dom";
import { resetChoice } from "@/lib/analytics";
import { A, H, L, LegalPage, P } from "./LegalPage";

const EMAIL = "team@editorialhq.com";

/**
 * /privacy. Describes what the site actually does: the contact form
 * (wordpress/functions.php), Calendly bookings, and GA4 with consent for
 * UK and EU visitors (lib/analytics.ts). Change it when any of those change.
 * The retention period is the owner's policy.
 */
const Privacy = () => (
  <LegalPage
    title="Privacy policy"
    seoTitle="Privacy Policy"
    description="What Editorial HQ collects when you contact us, book a call or visit the site, why we keep it, and how to have it deleted."
    updated="27 October 2026"
    intro={
      <p>
        The short version: we collect what you send us so we can reply, we
        measure visits to see which pages work, and we never sell anything
        about you. The details are below.
      </p>
    }
  >
    <H>Who we are</H>
    <P>
      Editorial HQ is a link building and digital PR agency based in
      Faisalabad, Pakistan. For anything about your data, email{" "}
      <A href={`mailto:${EMAIL}`}>{EMAIL}</A>.
    </P>

    <H>What we collect, and why</H>
    <L
      items={[
        <>
          <strong className="text-navy-dark">The contact form.</strong> Your
          name, work email, website, what you need, the package you picked,
          your message, how you found us, and how your visit started (the
          site that sent you, or a campaign tag in the link). We use it to
          reply and to prepare your free audit.
        </>,
        <>
          <strong className="text-navy-dark">Booking a call.</strong>{" "}
          Bookings run through Calendly. We receive your name, email and the
          answers you give when you book. Calendly's own{" "}
          <A href="https://calendly.com/legal/privacy-notice">privacy notice</A>{" "}
          covers what it does with them.
        </>,
        <>
          <strong className="text-navy-dark">Emails you send us.</strong> We
          keep them so we can follow the conversation.
        </>,
        <>
          <strong className="text-navy-dark">Site analytics.</strong> We use
          Google Analytics to see which pages people visit, roughly where they
          are, what device they use and how they arrived. We count two
          actions: sending the contact form and opening or using the booking
          calendar. See{" "}
          <A href="https://policies.google.com/technologies/partner-sites">
            how Google uses data from sites like ours
          </A>
          .
        </>,
        <>
          <strong className="text-navy-dark">Client work.</strong> When you
          hire us, we also keep what the work needs: your target pages,
          keywords, articles, reports and invoices.
        </>,
      ]}
    />
    <P>
      We don't run ads, and we don't use your data for advertising. We
      don't sell or rent it to anyone.
    </P>

    <H>Cookies</H>
    <P>
      Google Analytics sets cookies (named <code>_ga</code> and{" "}
      <code>_ga_</code> followed by an ID) to tell one visit from the next.
      If you're in the UK or Europe, they're only set after you say yes in
      the cookie box. Elsewhere, they're set when you arrive. Your browser
      also remembers your cookie choice, so we don't ask twice.
    </P>
    <p className="mt-4">
      <button
        onClick={resetChoice}
        className="rounded-full px-5 py-2.5 text-[14px] font-semibold text-navy-dark ring-1 ring-line transition-shadow hover:ring-navy-dark/30"
      >
        Change my cookie choice
      </button>
    </p>

    <H>The legal basis (for UK and EU visitors)</H>
    <L
      items={[
        "Replying to your enquiry or booking: our legitimate interest in answering people who contact us.",
        "Analytics in the UK and EU: your consent, which you can withdraw at any time with the button above.",
        "Client work and invoices: the contract between us, and our legal duty to keep financial records.",
      ]}
    />

    <H>Who else handles it</H>
    <P>
      Only the services that run the site and our work, and only for that:
    </P>
    <L
      items={[
        <>
          Hostinger hosts the site and our email (
          <A href="https://www.hostinger.com/legal/privacy-policy">their policy</A>
          ).
        </>,
        <>
          Google runs Analytics (
          <A href="https://policies.google.com/privacy">their policy</A>).
        </>,
        "Calendly runs the booking calendar.",
      ]}
    />
    <P>
      These companies store data in several countries. We're in Pakistan, so
      your enquiry is also read there.
    </P>

    <H>How long we keep it</H>
    <L
      items={[
        "Enquiries that don't turn into work: up to 2 years, so we have the context if you get in touch again. Ask and we'll delete it sooner.",
        "Client records and invoices: as long as the law requires for business records.",
        "Analytics: Google's retention setting for our account.",
      ]}
    />

    <H>Your rights</H>
    <P>
      You can ask to see what we hold about you, correct it, delete it, or
      stop us using it. Email <A href={`mailto:${EMAIL}`}>{EMAIL}</A> and
      we'll answer within 30 days. If you're in the UK and unhappy with how
      we handled it, you can{" "}
      <A href="https://ico.org.uk/make-a-complaint/">complain to the ICO</A>.
      In the EU, contact your country's data protection authority.
    </P>

    <H>Changes</H>
    <P>
      If we change what we collect, we'll update this page and the date at
      the top. Our <Link to="/terms" className="font-semibold text-navy-dark underline underline-offset-2">terms of service</Link>{" "}
      cover how we work with clients.
    </P>
  </LegalPage>
);

export default Privacy;
