import type { ComponentType } from "react";
import {
  AiOverviewMark,
  ChatGptMark,
  ClaudeMark,
  PerplexityMark,
} from "@/components/PlatformMarks";

/** Answer-engine glyphs by name, so the copy can stay plain strings. */
export const ENGINE_MARK: Record<
  string,
  ComponentType<{ className?: string }>
> = {
  ChatGPT: ChatGptMark,
  Perplexity: PerplexityMark,
  "AI Overviews": AiOverviewMark,
  Claude: ClaudeMark,
};

export const EngineMark = ({
  name,
  className = "h-4 w-4",
}: {
  name: string;
  className?: string;
}) => {
  const M = ENGINE_MARK[name];
  return M ? <M className={className} /> : null;
};
