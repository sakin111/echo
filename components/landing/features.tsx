import { Command, GitCompareArrows, Layers3, PanelRight, ShieldCheck, WandSparkles } from "lucide-react";
import { features } from "@/lib/mock-data";
import { Reveal, SectionHeading } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

const icons = { Layers3, GitCompareArrows, ShieldCheck, PanelRight, WandSparkles, Command };

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow="A better way to think" title="Less tab-hopping. More clarity." description="Everything you need to move from the first question to the idea that sticks." />
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = icons[feature.icon as keyof typeof icons];
          return <Reveal key={feature.title} delay={index * 0.06}><Card className="group h-full p-5 transition-colors hover:bg-surface-muted/60 sm:p-6"><span className="mb-8 grid size-10 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon aria-hidden="true" className="size-5" /></span><h3 className="text-base font-semibold">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p></Card></Reveal>;
        })}
      </div>
    </section>
  );
}