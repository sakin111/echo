import Link from "next/link";
import { ArrowLeft, ExternalLink, Puzzle } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ExtensionPopup } from "@/components/extension/extension-popup";

export function ExtensionFrame() {
  return (
    <main className="min-h-dvh bg-surface-muted/40">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"><Link href="/" aria-label="Back to EchoGPT home"><Brand /></Link><div className="flex items-center gap-2"><ThemeToggle /><Link href="/app" className="hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium transition hover:bg-surface-muted sm:inline-flex">Open web app <ExternalLink aria-hidden="true" className="size-3.5" /></Link></div></header>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-8 sm:px-8 sm:pb-16 lg:grid-cols-[1fr_420px] lg:gap-16 lg:pt-12">
        <section className="max-w-lg">
          <Link className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-muted transition hover:text-foreground" href="/"><ArrowLeft aria-hidden="true" className="size-3.5" /> Back to EchoGPT</Link>
         
          <h1 className="text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl text-shadow-2xs text-shadow-gray-300">A little help, right where you are.</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-gray-400 sm:text-sm">A compact EchoGPT popup concept for quick questions, useful shortcuts, and recent conversations, without leaving your current tab.</p>
          <div className="mt-8 flex items-center gap-3 text-xs text-muted"><span className="grid size-8 place-items-center rounded-md bg-white text-stone-400"><Puzzle className="size-4" /></span><span>EchoGPT for Chrome<br /><span className="text-[10px]">Interactive frontend preview</span></span></div>
        </section>
        <div className="mx-auto w-full max-w-100">
          <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-medium uppercase tracking-widest text-muted"><span>Popup preview</span><span>400 × 600</span></div>
          <div className="rounded-xl border border-border bg-white p-1.5 shadow-2xl">
            <div className="mb-1.5 flex h-7 items-center gap-1.5 px-1.5" aria-hidden="true"><span className="size-2 rounded-full bg-danger/70" /><span className="size-2 rounded-full bg-accent" /><span className="size-2 rounded-full bg-primary/60" /><span className="ml-2 flex h-5 flex-1 items-center rounded bg-surface-muted px-2 text-[9px] text-muted">extension://echogpt</span></div>
            <div className="h-150 max-h-[calc(100dvh-10rem)] min-h-128 w-full"><ExtensionPopup /></div>
          </div>
        </div>
      </div>
    </main>
  );
}