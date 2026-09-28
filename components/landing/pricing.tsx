"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "@/lib/mock-data";
import { Reveal, SectionHeading } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";

// Labels for the usage picker, matched to plans by position
const usage = ["A few times a week", "Most days", "All day, every day"];

export function Pricing() {
  const featuredIndex = Math.max(0, plans.findIndex((plan) => plan.featured));
  const [active, setActive] = useState(featuredIndex);
  const current = plans[active];

  return (
    <section id="pricing" className="border-y border-border bg-surface-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow=""
          title="Start with what you need."
          description="A simple place to begin, with more room whenever your work calls for it."
        />

        {/* Usage picker: choosing an option opens the plan that usually fits */}
        <Reveal>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p id="usage-label" className="text-sm font-semibold">
              How often will you use it?
            </p>
            <div
              role="radiogroup"
              aria-labelledby="usage-label"
              className="inline-flex flex-wrap gap-1 rounded-md border border-border bg-surface p-1"
            >
              {plans.map((plan, i) => (
                <button
                  key={plan.name}
                  type="button"
                  role="radio"
                  aria-checked={active === i}
                  onClick={() => setActive(i)}
                  className={`rounded px-3.5 py-1.5 text-sm transition-colors ${
                    active === i
                      ? "bg-stone-500 text-white hover:brightness-95"
                      : "text-muted hover:bg-surface-muted"
                  }`}
                >
                  {usage[i] ?? plan.name}
                </button>
              ))}
            </div>
          </div>
          <p aria-live="polite" className="mt-3 text-sm text-muted">
            That usually fits <span className="font-semibold">{current.name}</span>. {current.description}
          </p>
        </Reveal>

        {/* Plans as a ledger: one row each, the selected row opens to show what's included */}
        <Reveal delay={0.05}>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {plans.map((plan, i) => {
              const open = i === active;
              return (
                <li key={plan.name} className={`relative transition-colors ${open ? "bg-surface" : ""}`}>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-0.5 bg-primary transition-opacity ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div className="grid items-center gap-4 px-5 py-5 sm:grid-cols-[1.4fr_1fr_auto] sm:px-6">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`plan-features-${i}`}
                      onClick={() => setActive(i)}
                      className="text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg font-semibold">{plan.name}</span>
                        {plan.featured && (
                          <Badge className="bg-stone-600 text-white">Most popular</Badge>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{plan.description}</span>
                    </button>

                    <p>
                      <span className="text-3xl font-semibold">{plan.price}</span>
                      <span className="ml-2 text-xs text-muted">{plan.cadence}</span>
                    </p>

                    <Link
                      href="/app"
                      className={`inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-semibold transition ${
                        open
                          ? "bg-stone-500 text-white hover:brightness-95"
                          : "border border-border hover:bg-surface-muted"
                      }`}
                    >
                      Choose {plan.name}
                    </Link>
                  </div>

                  <div
                    id={`plan-features-${i}`}
                    aria-hidden={!open}
                    className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid gap-x-8 gap-y-3 px-5 pb-6 pt-1 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
                        {plan.features.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-sm">
                            <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}