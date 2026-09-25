import { Quote } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/shared/reveal";

const quotes = [
  { quote: "It feels less like asking a bot and more like opening up a room full of perspectives.", name: "Maya Chen", role: "Independent designer", initials: "MC" },
  { quote: "The best part is staying in the work instead of managing a stack of tabs.", name: "Andre Lewis", role: "Product lead", initials: "AL" },
  { quote: "I use the compare view to get past the first obvious answer. It is a small shift that adds up.", name: "Sofia Patel", role: "Writer & researcher", initials: "SP" },
];

export function Testimonials() {
  return (
    <section className="border-y border-border bg-surface-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8"><SectionHeading eyebrow="In good company" title="A little more perspective goes a long way." />
        <div className="mt-10 grid gap-3 md:grid-cols-3">{quotes.map((item, index) => <Reveal key={item.name} delay={index * 0.06}><figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 sm:p-6"><Quote aria-hidden="true" className="size-5 text-primary" /><blockquote className="mt-5 flex-1 text-base leading-7">“{item.quote}”</blockquote><figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-4"><span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{item.initials}</span><span><span className="block text-sm font-semibold">{item.name}</span><span className="mt-0.5 block text-xs text-muted">{item.role}</span></span></figcaption></figure></Reveal>)}</div>
      </div>
    </section>
  );
}