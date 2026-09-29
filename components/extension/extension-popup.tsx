"use client";

import { useEffect, useRef, useState } from "react";
import { AudioLines, BookOpen, Check, ChevronDown, Clock3, Command, History, MessageCircle, Search, Send, Settings2, Shield, Workflow, WandSparkles, X } from "lucide-react";
import { models } from "@/lib/mock-data";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";

type View = "chat" | "history" | "actions" | "settings";

const quickActions = [
  { label: "Summarize", prompt: "Summarize the key ideas on this page in a few clear bullets.", icon: BookOpen },
  { label: "Translate", prompt: "Translate this into natural, fluent English.", icon: WandSparkles },
  { label: "Explain", prompt: "Explain this in plain language, with one useful example.", icon: Workflow  },
  { label: "Improve writing", prompt: "Make this writing clearer while keeping its original voice.", icon: Command },
];

const historyItems = [
  { title: "Notes from this article", date: "Today", model: "Claude 3.7" },
  { title: "Translate a product brief", date: "Today", model: "GPT-4o" },
  { title: "Explain this chart", date: "Yesterday", model: "Gemini 2.5" },
  { title: "Weekend reading list", date: "Yesterday", model: "GPT-4o" },
];

type Model = (typeof models)[number];

// Shows the model's logo, tinted with the badge's text color so it stays visible in
// light and dark mode (a black logo on a dark badge would otherwise disappear).
// Falls back to the model's first letter if the file can't be loaded.
function ModelMark({ model, className = "size-4" }: { model: Model; className?: string }) {
  const [failed, setFailed] = useState(false);
  const mark: unknown = model.mark;
  const src = typeof mark === "string" ? mark : (mark as { src?: string } | null)?.src;
  const isImage = !!src && /^(\/|https?:\/\/|data:)/.test(src);

  // Probe the file so we know when to fall back (masked elements can't report errors)
  useEffect(() => {
    if (!isImage || !src) return;
    let cancelled = false;
    const probe = new window.Image();
    probe.onerror = () => {
      console.warn(`ModelMark: could not load ${src}`);
      if (!cancelled) setFailed(true);
    };
    probe.src = src;
    return () => { cancelled = true; };
  }, [isImage, src]);

  if (isImage && !failed) {
    return (
      <span
        aria-hidden="true"
        className={`${className} inline-block bg-current`}
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }
  return <span aria-hidden="true">{isImage ? model.name.charAt(0) : String(mark ?? model.name.charAt(0))}</span>;
}

const greeting = { role: "assistant" as const, text: "Hi there. What are you working on?" };

export function ExtensionPopup() {
  const [view, setView] = useState<View>("chat");
  const [modelId, setModelId] = useState(models[0].id);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([greeting]);
  const [responding, setResponding] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const selectedModel = models.find((model) => model.id === modelId) ?? models[0];

  const timer = useRef<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view
  useEffect(() => {
    if (view === "chat") endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, responding, view]);

  // Cancel a pending demo reply if the popup unmounts
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const submit = (text = draft) => {
    const prompt = text.trim();
    if (!prompt || responding) return;
    setMessages((items) => [...items, { role: "user", text: prompt }]);
    setDraft("");
    setView("chat");
    setResponding(true);
    timer.current = window.setTimeout(() => {
      setMessages((items) => [...items, { role: "assistant", text: `Here is a useful first pass: focus on the main idea, then choose one small next step.\n\nThis local demo response is shown as ${selectedModel.name}.` }]);
      setResponding(false);
      timer.current = null;
    }, 800);
  };

  // Clearing also cancels any reply still on its way, so it can't appear afterwards
  const clearChat = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setResponding(false);
    setMessages([greeting]);
  };

  const tabs: { id: View; label: string; icon: typeof MessageCircle }[] = [
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "history", label: "History", icon: History },
    { id: "actions", label: "Quick actions", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings2 },
  ];

  return (
    <section aria-label="EchoGPT browser extension popup" className="grid h-full min-h-0 grid-rows-[3.5rem_3.25rem_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-white text-foreground shadow-2xl dark:bg-neutral-900 dark:shadow-black/50">
      <header className="flex items-center justify-between border-b border-border px-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-white text-gray-800 dark:bg-neutral-800 dark:text-neutral-100"><AudioLines aria-hidden="true" className="size-4 " /></span>
          <span className="text-sm font-semibold">Echo<span className="text-primary">GPT</span></span>
          <span className="mx-1 h-5 border-l border-border" />
          <label className="relative flex min-w-0 items-center gap-1.5 rounded px-1.5 py-1 text-xs text-muted hover:bg-surface-muted"><span className={`grid size-5 shrink-0 place-items-center rounded text-[9px] font-bold ${selectedModel.tone}`}><ModelMark key={selectedModel.id} model={selectedModel} /></span><span className="max-w-24 truncate">{selectedModel.name}</span><ChevronDown aria-hidden="true" className="size-3 shrink-0" /><select aria-label="Choose default model" value={modelId} onChange={(event) => setModelId(event.target.value)} className="absolute inset-0 cursor-pointer opacity-0">{models.map((model) => <option key={model.id} value={model.id}>{model.name}</option>)}</select></label>
        </div>
        <Tooltip label="Settings"><Button aria-label="Open settings" variant="ghost" size="icon" className="size-8" onClick={() => setView("settings")}><Settings2 className="size-4" /></Button></Tooltip>
      </header>

      <nav aria-label="Extension views" className="grid grid-cols-4 border-b border-border px-2">
        {tabs.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-current={view === id ? "page" : undefined} onClick={() => setView(id)} className={`relative flex flex-col items-center justify-center gap-1 text-[10px] transition hover:text-foreground ${view === id ? "font-semibold text-stone-500 dark:text-stone-300" : "text-muted"}`}><Icon aria-hidden="true" className="size-4" /><span>{label}</span>{view === id && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-stone-500 dark:bg-stone-300" />}</button>)}
      </nav>

      {view === "chat" && <div className="flex min-h-0 flex-col">
        <ScrollArea aria-live="polite" className="min-h-0 flex-1 px-3 py-3">
          <div className="space-y-3">
            {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex items-start gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>{message.role === "assistant" && <Avatar className={`grid size-6 shrink-0 place-items-center rounded ${selectedModel.tone}`}><ModelMark key={selectedModel.id} model={selectedModel} /></Avatar>}<p className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-xs leading-5 ${message.role === "user" ? "bg-stone-400 text-primary-foreground dark:bg-stone-600 dark:text-white" : "bg-gray-100 dark:bg-neutral-800 dark:text-neutral-100"}`}>{message.text}</p></div>)}
            {responding && <p className="pl-8 text-[10px] text-muted" role="status">Thinking...</p>}
          </div>
          {messages.length === 1 && <div className="mt-6"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">Try a quick action</p><div className="flex flex-wrap gap-1.5">{quickActions.slice(0, 3).map(({ label, prompt, icon: Icon }) => <button key={label} type="button" onClick={() => submit(prompt)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1.5 text-[10px] font-medium transition hover:border-primary/50 hover:bg-primary/5"><Icon aria-hidden="true" className="size-3 text-stone-500 dark:text-stone-300" /></button>)}</div></div>}
          <div ref={endRef} />
        </ScrollArea>
        <div className="border-t border-border p-2.5">
          <form onSubmit={(event) => { event.preventDefault(); submit(); }} className="flex items-end gap-2 rounded-lg border border-border bg-white p-1.5 focus-within:border-primary/50 dark:bg-neutral-900">
            <Textarea aria-label="Ask EchoGPT" placeholder="Ask anything..." rows={1} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(); } }} className="max-h-20 min-h-9 resize-none border-0 bg-white px-2 py-2 text-xs focus-visible:ring-0 dark:bg-neutral-900" />
            <Tooltip label="Send prompt"><Button type="submit" size="icon" className="size-8 shrink-0 bg-white text-gray-800 border-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700" aria-label="Send prompt" disabled={!draft.trim() || responding}><Send className="size-3.5" /></Button></Tooltip>
          </form>
          <div className="mt-2 flex items-center justify-between"><span className="text-[9px] text-muted">Responses are simulated</span><button type="button" onClick={clearChat} className="inline-flex items-center gap-1 text-[9px] text-muted hover:text-foreground"><X className="size-3" /> Clear</button></div>
        </div>
      </div>}

      {view === "history" && <div className="flex min-h-0 flex-col px-3 py-3">
        <label className="relative mb-4 block"><Search aria-hidden="true" className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted" /><Input aria-label="Search history" placeholder="Search conversations" value={query} onChange={(event) => setQuery(event.target.value)} className="h-9 pl-8 text-xs" /></label>
        <ScrollArea className="min-h-0 flex-1">
          {["Today", "Yesterday"].map((date) => {
            const items = historyItems.filter((item) => item.date === date && item.title.toLowerCase().includes(query.toLowerCase()));
            if (!items.length) return null;
            return <div key={date} className="mb-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">{date}</p>{items.map((item) => <button key={item.title} type="button" onClick={() => { setView("chat"); setMessages((existing) => [...existing, { role: "assistant", text: `You opened “${item.title}”. This is a saved local preview.` }]); }} className="mb-1.5 flex w-full items-center gap-2.5 rounded-md px-2.5 py-2.5 text-left transition hover:bg-surface-muted"><span className="grid size-7 shrink-0 place-items-center rounded bg-white border-2 text-gray-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"><MessageCircle className="size-3.5" /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium">{item.title}</span><span className="mt-1 block text-[10px] text-muted">{item.model}</span></span><Clock3 className="size-3.5 text-muted" /></button>)}</div>;
          })}
          {historyItems.every((item) => !item.title.toLowerCase().includes(query.toLowerCase())) && <p className="py-8 text-center text-xs text-muted">No matching conversations.</p>}
        </ScrollArea>
      </div>}

      {view === "actions" && <ScrollArea className="min-h-0 px-3 py-3"><p className="mb-3 text-xs text-muted">A useful first move, wherever you are on the web.</p><div className="space-y-2">{quickActions.map(({ label, prompt, icon: Icon }) => <button key={label} type="button" onClick={() => { setDraft(prompt); setView("chat"); }} className="flex w-full items-center gap-3 rounded-lg border border-border bg-white p-3 text-left transition hover:border-primary/40 hover:bg-surface-muted dark:bg-neutral-900"><span className="grid size-8 place-items-center rounded-md bg-gray-200 text-black dark:bg-neutral-700 dark:text-neutral-100"><Icon aria-hidden="true" className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{label}</span><span className="mt-1 block text-[10px] leading-4 text-muted">{prompt}</span></span><ChevronDown aria-hidden="true" className="size-3 -rotate-90 text-muted" /></button>)}</div><div className="mt-5 rounded-lg bg-stone-300 p-3 dark:bg-neutral-800"><p className="text-[10px] font-semibold">Selected model</p><div className="mt-2 flex flex-wrap gap-1.5">{models.map((model) => <button key={model.id} type="button" onClick={() => setModelId(model.id)} aria-pressed={modelId === model.id} className={`rounded-full px-2.5 py-1.5 text-[10px] font-medium transition ${modelId === model.id ? `${model.tone} ring-1 ring-current` : "bg-gray-200 text-muted hover:text-foreground dark:bg-neutral-700"}`}>{model.name}</button>)}</div></div></ScrollArea>}

      {view === "settings" && <ScrollArea className="min-h-0 px-4 py-4">
        <div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold">Settings</h2><p className="mt-1 text-[10px] text-muted">Personalize your popup.</p></div><ThemeToggle /></div>
        <div className="mt-5 space-y-5">
          <label className="block"><span className="text-xs font-medium">Default model</span><span className="relative mt-2 block"><select aria-label="Default AI model" value={modelId} onChange={(event) => setModelId(event.target.value)} className="h-9 w-full appearance-none rounded-md border border-border bg-background px-3 pr-8 text-xs focus-visible:ring-2 focus-visible:ring-ring">{models.map((model) => <option key={model.id} value={model.id}>{model.name} · {model.provider}</option>)}</select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" /></span></label>
          <label className="block"><span className="text-xs font-medium">API key</span><Input type="password" autoComplete="off" placeholder="Optional · visual only" className="mt-2 h-9 text-xs" /><span className="mt-1.5 block text-[10px] leading-4 text-muted">This demo never saves or sends a key.</span></label>
          <Button size="sm" variant="outline" className="w-full" onClick={() => setApiKeySaved(true)}>{apiKeySaved ? <><Check className="size-3.5" /> Settings applied</> : "Save settings"}</Button>
          <div><p className="mb-2 text-xs font-medium">Keyboard shortcuts</p><div className="space-y-2 rounded-md border border-border p-3">{[["Open extension", "Alt + E"], ["New chat", "Ctrl + Shift + O"], ["Send prompt", "Enter"]].map(([label, shortcut]) => <div key={label} className="flex items-center justify-between text-[10px]"><span className="text-muted">{label}</span><kbd className="rounded border border-border px-1.5 py-1 font-mono">{shortcut}</kbd></div>)}</div></div>
          <div className="flex gap-2 rounded-md  p-3"><Shield className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-[10px] leading-4 text-muted">Your settings stay in this page session. No service is connected.</p></div>
        </div>
      </ScrollArea>}
    </section>
  );
}