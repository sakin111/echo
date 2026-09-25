import Link from "next/link";
import { ArrowRight, AudioLines } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

export function ClosingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="relative overflow-hidden rounded-xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16">
        <div aria-hidden="true" className="mesh-grid absolute inset-0 opacity-20" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl"><span className="mb-5 grid size-10 place-items-center rounded-md bg-primary-foreground/15"><AudioLines aria-hidden="true" className="size-5" /></span><p className="text-xs font-semibold uppercase tracking-widest opacity-75">Your next good idea starts here</p><h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">Bring a little more perspective to the question.</h2></div>
          <Link href="/app" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-primary-foreground px-5 text-sm font-semibold text-primary transition hover:brightness-95">Open EchoGPT <ArrowRight aria-hidden="true" className="size-4" /></Link>
        </div>
      </Reveal>
    </section>
  );
}