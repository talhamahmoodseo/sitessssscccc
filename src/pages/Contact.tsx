import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, Check, Mail } from "lucide-react";
import { Seo } from "@/components/MotionKit";
import PageLayout from "@/components/PageLayout";
import { openBooking } from "@/lib/booking";
import { CARD, GlowPanel, ease, rise } from "./services/kit";

const EMAIL = "contact@talhamahmood.com";

const SERVICES = [
  "Link building",
  "Digital PR",
  "Brand mentions & AI visibility",
  "HARO & expert quotes",
  "White label for my agency",
  "Not sure yet",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000–2,500",
  "$2,500–5,000",
  "$5,000+",
  "Not sure yet",
];

const NEXT = [
  {
    t: "A reply within 24 hours",
    d: "From a strategist, not an auto-responder.",
  },
  {
    t: "A free audit within 48 hours",
    d: "Your links, the gaps against competitors, and whether AI answers mention you.",
  },
  {
    t: "A short call, if it makes sense",
    d: "We walk through the audit and the first placements we’d go after.",
  },
];

const ASKED = [
  {
    q: "Is there a contract?",
    a: "No long contract. Plans run month to month. We suggest giving it three months, because links take a few weeks to index and pages take time to move.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes, about a third of our work is white label. Your branding on the reports, and we stay invisible on client calls.",
  },
  {
    q: "What if my site isn’t ready for links?",
    a: "The audit will say so. Pointing links at a thin page wastes your money, and we’d rather tell you before you spend it.",
  },
];

/* chips that behave like a radio group */
const ChipGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <fieldset>
    <legend className="mb-2.5 text-[13px] font-semibold text-navy-dark">
      {label}
    </legend>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value === o;
        return (
          <label
            key={o}
            className={`cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors focus-within:ring-2 focus-within:ring-navy-dark/40 ${
              on
                ? "bg-navy-dark text-white"
                : "bg-mist text-navy-dark/85 ring-1 ring-line hover:ring-navy-dark/30"
            }`}
          >
            <input
              type="radio"
              name={label}
              value={o}
              checked={on}
              onChange={() => onChange(o)}
              className="sr-only"
            />
            {o}
          </label>
        );
      })}
    </div>
  </fieldset>
);

const FIELD =
  "mt-1.5 w-full rounded-xl bg-mist px-4 py-3 text-[15px] text-navy-dark ring-1 ring-line placeholder:text-navy-dark/60 transition-shadow focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy-dark/50";

const ContactForm = () => {
  const [f, setF] = useState({
    name: "",
    email: "",
    website: "",
    service: "Link building",
    budget: "Not sure yet",
    message: "",
  });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });

  const send = () => {
    const subject = encodeURIComponent(
      `Enquiry: ${f.service} (${f.website || f.name})`,
    );
    const body = encodeURIComponent(
      `Name: ${f.name}\nEmail: ${f.email}\nWebsite: ${f.website}\nService: ${f.service}\nBudget: ${f.budget}\n\n${f.message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      className={`${CARD} space-y-6 p-6 sm:p-8`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[13px] font-semibold text-navy-dark">
          Your name
          <input
            required
            className={FIELD}
            placeholder="Jane Smith"
            value={f.name}
            onChange={(e) => set("name")(e.target.value)}
            autoComplete="name"
          />
        </label>
        <label className="block text-[13px] font-semibold text-navy-dark">
          Work email
          <input
            required
            type="email"
            className={FIELD}
            placeholder="jane@company.com"
            value={f.email}
            onChange={(e) => set("email")(e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block text-[13px] font-semibold text-navy-dark">
        Website
        <input
          className={FIELD}
          placeholder="yourbrand.com"
          value={f.website}
          onChange={(e) => set("website")(e.target.value)}
          autoComplete="url"
        />
      </label>
      <ChipGroup
        label="What do you need?"
        options={SERVICES}
        value={f.service}
        onChange={set("service")}
      />
      <ChipGroup
        label="Monthly budget (optional)"
        options={BUDGETS}
        value={f.budget}
        onChange={set("budget")}
      />
      <label className="block text-[13px] font-semibold text-navy-dark">
        What are you trying to achieve?
        <textarea
          className={`${FIELD} min-h-[120px] resize-y`}
          placeholder="Pages you want to rank, keywords, markets, or the questions you want AI to name you for."
          value={f.message}
          onChange={(e) => set("message")(e.target.value)}
        />
      </label>
      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy-dark px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-black"
        >
          Send enquiry
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <p className="text-[12.5px] leading-snug text-navy-dark/70 sm:max-w-[16rem] sm:text-right">
          Opens your email app with everything filled in. Nothing is stored on
          this site.
        </p>
      </div>
    </form>
  );
};

/**
 * /contact: one job, so one screen. The ask on the right, everything that
 * makes it easy to say yes on the left, and three answers underneath.
 * Plan: PAGES-REDESIGN-2.md §3.
 */
const Contact = () => (
  <PageLayout cta={false}>
    <Seo
      title="Contact Us"
      description="Tell us where you want to rank and get cited. A strategist replies within 24 hours, with a free audit inside 48."
    />

    <section className="bg-mist pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        {/* left: why and how */}
        <div className="lg:pt-4">
          <motion.p
            className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-dark/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.p>
          <h1 className="mt-5">
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark sm:text-[3.6rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Let’s talk about
            </motion.span>
            <motion.span
              className="block text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy-dark/60 sm:text-[3.6rem]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              your visibility.
            </motion.span>
          </h1>
          <motion.p
            className="mt-6 max-w-md text-[17px] leading-relaxed text-navy-dark/75"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Tell us where you want to rank and get cited. You’ll hear back from
            a strategist, not a sales script.
          </motion.p>

          <motion.ol
            className="mt-10 space-y-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            {NEXT.map((n, i) => (
              <li key={n.t} className="flex gap-4">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-navy-dark text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[16px] font-semibold text-navy-dark">
                    {n.t}
                  </span>
                  <span className="mt-0.5 block text-[14.5px] leading-snug text-navy-dark/75">
                    {n.d}
                  </span>
                </span>
              </li>
            ))}
          </motion.ol>

          <motion.div
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
          >
            <button
              onClick={openBooking}
              className="group flex items-center gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-line transition-shadow hover:ring-navy-dark/30"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-butter">
                <CalendarDays className="h-5 w-5 text-navy-dark" />
              </span>
              <span>
                <span className="block text-[14.5px] font-semibold text-navy-dark">
                  Book a 15-minute call
                </span>
                <span className="block text-[12.5px] text-navy-dark/70">
                  Pick a time that suits you
                </span>
              </span>
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-line transition-shadow hover:ring-navy-dark/30"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-mint">
                <Mail className="h-5 w-5 text-navy-dark" />
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold text-navy-dark">
                  Email us
                </span>
                <span className="block break-all text-[12.5px] text-navy-dark/70">
                  {EMAIL}
                </span>
              </span>
            </a>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <span className="text-[13px] text-navy-dark/75">
              Working with brands and agencies in the US, UK, Europe and the
              Gulf
            </span>
          </motion.div>
        </div>

        {/* right: the form */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <GlowPanel tone="warm" className="p-3 sm:p-8">
            <ContactForm />
          </GlowPanel>
        </motion.div>
      </div>
    </section>

    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-[13px] font-semibold text-navy-dark/75"
          {...rise()}
        >
          Before you send it
        </motion.p>
        <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
          {ASKED.map((a, i) => (
            <motion.div
              key={a.q}
              className="border-t border-navy-dark pt-5"
              {...rise(i * 0.07)}
            >
              <h2 className="flex items-start gap-2 text-[17px] font-semibold tracking-[-0.02em] text-navy-dark">
                <Check className="mt-1 h-4 w-4 flex-none text-verified" />
                {a.q}
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-navy-dark/75">
                {a.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Contact;
