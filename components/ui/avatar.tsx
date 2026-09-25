import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Avatar({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-primary/10 text-xs font-semibold text-primary", className)} {...props} />;
}