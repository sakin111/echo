import type { ReactNode } from "react";
import { MoreHorizontal } from "lucide-react";

export function DropdownMenu({ label = "More options", children }: { label?: string; children: ReactNode }) {
  return (
    <details className="group relative">
      <summary aria-label={label} className="grid size-8 cursor-pointer list-none place-items-center rounded text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <MoreHorizontal aria-hidden="true" className="size-4" />
      </summary>
      <div className="absolute right-0 top-9 z-30 min-w-36 rounded-md border border-border bg-surface p-1.5 shadow-lg [&_button]:w-full [&_button]:rounded [&_button]:px-2.5 [&_button]:py-2 [&_button]:text-left [&_button]:text-xs [&_button]:transition [&_button]:hover:bg-surface-muted">{children}</div>
    </details>
  );
}