import { AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <AudioLines aria-hidden="true" className="size-5" />
      </span>
      {!compact && <span className="text-base font-semibold tracking-normal">echo<span className="text-primary">GPT</span></span>}
    </span>
  );
}