import { CASES } from "@/lib/cases";
import { ClientWork } from "@/pages/results/CaseParts";

/** Homepage: real client work, flagship first. */
const Results = () => (
  <ClientWork
    cases={CASES}
    eyebrow="Case studies"
    title="The work, and"
    soft="what it changed."
  />
);

export default Results;
