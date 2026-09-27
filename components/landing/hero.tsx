"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Plus, Sparkles } from "lucide-react";
import { models } from "@/lib/mock-data";
import Image from "next/image";
import { TypingAnimation } from "../ui/typing-animation";


export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden  border-border">
      <div aria-hidden="true" className="mesh-grid absolute inset-0 -z-10 opacity-55" />
      <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 size-[30rem] rounded-full blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:py-24">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-normal sm:text-6xl lg:text-[4.35rem]">
            One question.<br /><span className="text-white text-shadow-2xs text-shadow-gray-300">More ways</span> forward.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Think across the world&apos;s leading AI models in one calm, connected workspace. Keep your flow. Find your angle.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/app"
              className="inline-flex h-12 button-grid items-center gap-2 rounded-md bg-white px-5 text-sm shadow-2xs border-2 border-primary transition hover:brightness-95"
            >
              <span className="font-semibold text-transparent [-webkit-text-stroke:1px_black]">
                Try EchoGPT
              </span>

              <ArrowRight aria-hidden="true" className="size-4 text-black" />
            </Link>
            <Link className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-surface px-5 text-sm font-semibold transition hover:bg-surface-muted" href="/extension">
              Add to Chrome <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-4 text-xs text-muted">
            <span className="flex -space-x-2" aria-hidden="true">
              {models.slice(0, 3).map((model) => <span key={model.id} className={`grid size-7 place-items-center rounded-full border-2 border-background text-[10px] font-semibold ${model.tone}`}><Image src={model.mark} alt={model.name} width={24} height={24} /></span>)}
            </span>
            <span>One workspace for all your favorite models</span>
          </div>
        </motion.div>

        <motion.div className="relative mx-auto w-full max-w-[37rem]" initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 1.2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />
          <div className="overflow-hidden rounded-xl border border-border bg-surface soft-shadow">
            <div className="flex h-12 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2"><span className="text-xs font-semibold p-2 border-2 border-l-0 border-r-0 rounded-xl">New conversation</span></div>
            </div>
            <div className="space-y-5 p-4 sm:p-6">
              <div className="ml-auto max-w-[88%] rounded-lg bg-surface-muted p-3.5 text-xs leading-5 sm:text-sm">How might a small neighborhood bookstore bring more people together?</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {models.slice(0, 2).map((model, index) => (
                  <div key={model.id} className="rounded-lg border border-border bg-background p-3.5">
                    <div className="flex items-center gap-2"><span className={`grid size-6 place-items-center rounded text-[10px] font-bold ${model.tone}`}><Image src={model.mark} alt={model.name} width={24} height={24} /></span><span className="text-[11px] font-semibold">{model.name}</span><span className="ml-auto text-[10px] text-muted">just now</span></div>
                    <p className="mt-3 text-xs leading-5 text-muted">{index === 0 ? "Make the store a small-town living room: host low-key book swaps, invite local writers to share work, and give regulars a reason to linger." : "Create rituals that turn browsing into belonging: a community shelf, a monthly reading table, and a simple 'bring a friend' evening."}</p>
                    <div className="mt-3 flex gap-2 text-[10px] text-muted"><span className="rounded border border-border px-2 py-1">Copy</span><span className="rounded border border-border px-2 py-1">Continue</span></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-3">
                <TypingAnimation startOnView loop typeSpeed={80}
                  deleteSpeed={50}
                  pauseDelay={2000} className="flex-1 text-xs text-muted">Ask a follow-up or compare another angle...</TypingAnimation>

                <span className="grid size-8 place-items-center rounded-md bg-white border-2 border-t-0 text-Black"><ArrowRight className="size-4" /></span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5">{models.map((model) => <span key={model.id} title={model.name} className={`grid size-7 place-items-center rounded-full text-[10px] font-semibold ${model.tone}`}><Image src={model.mark} alt={model.name} width={24} height={24} /></span>)}<span className="grid size-7 place-items-center rounded-full border border-dashed border-border text-muted"><Plus className="size-3" /></span></div>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500"> 4 perspectives ready</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}