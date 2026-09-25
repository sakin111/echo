import { ArrowRight, Check, X } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/shared/reveal";

const comparisons = [
  ["One place for your favorite models", false, true],
  ["Compare perspectives without copy-paste", false, true],
  ["A conversation history that stays organized", false, true],
  ["A focused interface built around your thinking", false, true],
];

export function WhyEcho() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal><SectionHeading centered={false} eyebrow="A little less juggling" title="Good thinking deserves a better setup." description="Your ideas are already doing enough work. EchoGPT brings the tools together so you can stay with the question." /></Reveal>
        <Reveal className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-[1fr_1fr_1fr] items-center border-b border-border bg-surface-muted/60 px-4 py-3 text-[10px] font-semibold uppercase text-muted sm:px-6"><span>Everyday workflow</span><span className="text-center">Scattered tabs</span><span className="text-center text-primary">EchoGPT</span></div>
          {comparisons.map(([label], index) => <div key={String(label)} className={`grid grid-cols-[1fr_1fr_1fr] items-center gap-2 px-4 py-4 text-xs sm:px-6 sm:text-sm ${index ? "border-t border-border" : ""}`}><span className="leading-5">{label}</span><span className="flex justify-center text-muted"><X aria-label="Not included" className="size-4" /></span><span className="flex justify-center text-primary"><Check aria-label="Included" className="size-4" /></span></div>)}
          <div className="flex items-center justify-between border-t border-border bg-surface-muted/50 px-4 py-3 text-xs text-muted sm:px-6"><span>Same curiosity. Better flow.</span><ArrowRight aria-hidden="true" className="size-4 text-primary" /></div>
        </Reveal>
      </div>
    </section>
  );
}