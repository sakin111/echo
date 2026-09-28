"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen, GitCompareArrows, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal, SectionHeading } from "@/components/shared/reveal";

const views = [
  { id: "chat", label: "Chat", icon: MessageSquareText },
  { id: "compare", label: "Compare", icon: GitCompareArrows },
  { id: "library", label: "Prompt library", icon: BookOpen },
];

export function ProductPreview() {
  const [activeView, setActiveView] = useState("chat");
  return (
    <section id="product" className="border-y border-border bg-surface-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="" title="Your ideas have room to breathe." description="A focused workspace for exploring, comparing, and keeping the answers worth coming back to." />
        <Reveal className="mt-10 overflow-hidden rounded-xl border border-border bg-surface soft-shadow">
          <div role="tablist" aria-label="Product preview" className="flex gap-1 border-b border-border px-3 py-2.5 sm:px-5">
            {views.map(({ id, icon: Icon }) => <button key={id} role="tab" aria-selected={activeView === id} onClick={() => setActiveView(id)} className={`inline-flex items-center gap-2 rounded px-3 py-2 text-xs font-medium transition sm:text-sm ${activeView === id ? "bg-stone-500 text-primary-foreground" : "text-muted hover:bg-gray-400 hover:text-foreground"}`}><Icon aria-hidden="true" className="size-4" /></button>)}
          </div>
          <div className="grid min-h-88 lg:grid-cols-[14rem_1fr]">
            <aside className="hidden border-r border-border bg-surface-muted/50 p-4 lg:block">
              <div className="mb-5 flex items-center gap-2 text-xl font-semibold">echoGPT</div>
              <p className="mb-2 text-[10px] font-semibold uppercase text-muted">Recent</p>
              <p className="rounded bg-surface px-2.5 py-2 text-xs">Building a creative habit</p>
              <p className="mt-1 rounded px-2.5 py-2 text-xs text-muted">Notes for a new studio</p>
              <p className="mt-1 rounded px-2.5 py-2 text-xs text-muted">A book club for neighbors</p>
              <div className="mt-8 rounded-md border border-border p-3"><p className="text-[10px] text-muted">YOUR PLAN</p><p className="mt-1 text-xs font-semibold">Free workspace</p></div>
            </aside>
            <div className="flex flex-col justify-between p-5 sm:p-8">
              <div>
               
                <h3 className="mt-3 text-xl font-semibold">{activeView === "chat" ? "How can I make time for creative work?" : activeView === "compare" ? "Two useful angles, at once." : "Start with a prompt that gets you moving."}</h3>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-border p-4"><p className="text-xs font-semibold">{activeView === "library" ? "Find your focus" : "GPT-4o"}</p><p className="mt-2 text-sm leading-6 text-muted">Protect a small, repeatable block of time. Start with 25 minutes and define one finish line before you begin.</p></div>
                  <div className="rounded-lg border border-border p-4"><p className="text-xs font-semibold">{activeView === "library" ? "Make a plan" : "Claude 3.7"}</p><p className="mt-2 text-sm leading-6 text-muted">Make the first step almost too easy. A sketch, a sentence, a question. Showing up consistently matters more than a perfect session.</p></div>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <span className="text-xs text-muted">A good next question can change everything.</span>
                <Link className="inline-flex items-center gap-2 rounded px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10" href="/app">Explore the workspace <ArrowUpRight aria-hidden="true" className="size-3.5" /></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}