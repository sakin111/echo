import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { plans } from "@/lib/mock-data";
import { Reveal, SectionHeading } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-border bg-surface-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Room to grow" title="Start with what you need." description="A simple place to begin, with more room whenever your work calls for it." />
        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {plans.map((plan, index) => <Reveal key={plan.name} delay={index * 0.07}><article className={`relative flex h-full flex-col rounded-lg border p-6 ${plan.featured ? "border-primary bg-surface soft-shadow" : "border-border bg-surface"}`}>
            {plan.featured && <Badge className="absolute right-5 top-5 bg-primary/10 text-primary">Most popular</Badge>}
            <h3 className="font-semibold">{plan.name}</h3><p className="mt-2 text-sm text-muted">{plan.description}</p>
            <p className="mt-6"><span className="text-4xl font-semibold">{plan.price}</span><span className="ml-2 text-xs text-muted">{plan.cadence}</span></p>
            <Link href="/app" className={`mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-semibold transition ${plan.featured ? "bg-primary text-primary-foreground hover:brightness-95" : "border border-border hover:bg-surface-muted"}`}>Choose {plan.name}<ArrowRight aria-hidden="true" className="size-4" /></Link>
            <ul className="mt-7 space-y-3 border-t border-border pt-6">{plan.features.map((item) => <li key={item} className="flex items-center gap-2.5 text-sm"><Check aria-hidden="true" className="size-4 shrink-0 text-primary" />{item}</li>)}</ul>
          </article></Reveal>)}
        </div>
        <p className="mt-6 text-center text-xs text-muted">Pricing cards are illustrative for this frontend concept.</p>
      </div>
    </section>
  );
}