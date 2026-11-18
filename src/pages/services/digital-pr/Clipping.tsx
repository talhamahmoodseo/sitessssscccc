import { Link2 } from "lucide-react";

/** A press clipping: masthead, headline in a newspaper serif, and the line
 *  that mentions the client, highlighted. The Digital PR page's signature
 *  object. Every clipping on the page is a sample until real coverage is in. */

export type ClippingData = {
  outlet: string;
  desk: string;
  head: string;
  stand?: string;
  mention?: string;
  kind?: string;
  dr?: string;
  status?: string;
};

const Lines = ({ widths }: { widths: string[] }) => (
  <span className="block space-y-1.5" aria-hidden="true">
    {widths.map((w, n) => (
      <span
        key={n}
        className={`block h-[5px] rounded-full bg-navy-dark/[0.08] ${w}`}
      />
    ))}
  </span>
);

const Clipping = ({
  c,
  compact = false,
  className = "",
}: {
  c: ClippingData;
  compact?: boolean;
  className?: string;
}) => (
  <article
    className={`rounded-[14px] bg-[#FFFEFB] ring-1 ring-navy-dark/[0.08] shadow-[0_1px_0_rgba(14,14,14,0.04),0_30px_60px_-34px_rgba(14,14,14,0.45)] ${
      compact ? "p-4" : "p-5 sm:p-6"
    } ${className}`}
  >
    <header className="flex items-baseline justify-between gap-3">
      <span
        className={`font-news font-semibold tracking-[-0.01em] text-navy-dark ${
          compact ? "text-[15px]" : "text-[18px]"
        }`}
      >
        {c.outlet}
      </span>
      <span className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-navy-dark/70">
        {c.desk}
      </span>
    </header>
    <span
      className="mt-2 block h-[4px] border-y border-navy-dark/70"
      aria-hidden="true"
    />

    <h3
      className={`mt-3 font-news font-semibold leading-[1.12] tracking-[-0.01em] text-navy-dark ${
        compact ? "text-[16px]" : "text-[21px]"
      }`}
    >
      {c.head}
    </h3>

    {c.stand && !compact && (
      <p className="mt-2 text-[12.5px] leading-snug text-navy-dark/75">
        {c.stand}
      </p>
    )}

    {!compact && (
      <div className="mt-4">
        <Lines widths={["w-full", "w-11/12"]} />
      </div>
    )}

    {c.mention && (
      <p
        className={`${compact ? "mt-2.5" : "mt-3"} text-[12.5px] leading-snug text-navy-dark`}
      >
        <span className="box-decoration-clone rounded-[3px] bg-mark/60 px-1 py-[1px] font-semibold">
          {c.mention}
        </span>
      </p>
    )}

    {!compact && (
      <div className="mt-3">
        <Lines widths={["w-10/12", "w-7/12"]} />
      </div>
    )}

    {(c.kind || c.dr || c.status) && (
      <footer
        className={`${compact ? "mt-3" : "mt-5"} flex flex-wrap items-center gap-1.5`}
      >
        {c.kind && (
          <span className="rounded-full bg-linen px-2.5 py-1 text-[10.5px] font-semibold text-navy-dark/85">
            {c.kind}
          </span>
        )}
        {c.dr && (
          <span className="rounded-full px-2.5 py-1 text-[10.5px] font-semibold text-navy-dark/80 ring-1 ring-line">
            {c.dr}
          </span>
        )}
        {c.status && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${
              c.status === "Linked"
                ? "bg-verified/[0.12] text-verified"
                : "bg-navy-dark/[0.06] text-navy-dark/80"
            }`}
          >
            {c.status === "Linked" && <Link2 className="h-3 w-3" />}
            {c.status}
          </span>
        )}
      </footer>
    )}
  </article>
);

export default Clipping;
