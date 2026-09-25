import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/mock-data";
import { Reveal, SectionHeading } from "@/components/shared/reveal";

export function FAQ() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.7fr_1.3fr]">
      <Reveal><SectionHeading centered={false} eyebrow="Good to know" title="A few things you might be wondering." description="The short version: this is a frontend-only product concept, built to show how EchoGPT could feel." /></Reveal>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map((faq, index) => <Reveal key={faq.question} delay={index * 0.04}><details className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold marker:content-none sm:text-base"><span>{faq.question}</span><ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" /></summary><p className="max-w-2xl pt-3 pr-8 text-sm leading-6 text-muted">{faq.answer}</p></details></Reveal>)}
      </div>
    </section>
  );
}