import { models } from "@/lib/mock-data";
import { Reveal } from "@/components/shared/reveal";
import Image from "next/image";

export function ModelsStrip() {
  return (
    <section id="models" className="bg-surface-muted/50">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-7 px-5 py-10 sm:px-8 lg:flex-row lg:justify-between">  
        <p className="max-w-xs text-center text-sm leading-6 text-muted lg:text-left">A thoughtful mix of minds, ready when you are.</p>
        <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {models.map((model) => <li key={model.id} className="flex items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2.5"><span className={`grid size-7 place-items-center rounded text-xs font-bold ${model.tone}`}><Image src={model.mark} alt={model.name} width={24} height={24} /></span><span className="text-sm font-medium">{model.name}</span></li>)}
        </ul>
      </Reveal>
    </section>
  );
}