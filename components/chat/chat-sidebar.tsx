"use client";

import Link from "next/link";
import { useState } from "react";
import { AudioLines, MessageSquarePlus, Search, X } from "lucide-react";
import type { Conversation } from "@/types";
import { Brand } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Props = {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  open: boolean;
  onClose: () => void;
};

export function ChatSidebar({ conversations, activeId, onSelect, onNew, open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const filtered = conversations.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      {open && <button aria-label="Close navigation" className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px] md:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(19rem,88vw)] flex-col border-r border-border bg-surface transition-transform duration-200 md:static md:z-auto md:w-[17rem] md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`} aria-label="Conversation sidebar">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" aria-label="EchoGPT home"><Brand /></Link>
          <Button className="md:hidden" size="icon" variant="ghost" aria-label="Close menu" onClick={onClose}><X className="size-4" /></Button>
        </div>
        <div className="px-3 pb-3">
          <Button className="w-full justify-start bg-gray-100 text-gray-800" onClick={() => { onNew(); onClose(); }}><MessageSquarePlus aria-hidden="true" className="size-4" />New chat</Button>
        </div>
        <div className="px-3 pb-3">
          <label className="relative block"><Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" /><Input aria-label="Search conversations" placeholder="Search conversations" value={query} onChange={(event) => setQuery(event.target.value)} className="h-9 pl-9 text-xs" /></label>
        </div>
        <Separator />
        <div className="px-4 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">Recent</div>
        <ScrollArea className="flex-1 px-2 pb-3">
          {filtered.length ? filtered.map((conversation) => <button key={conversation.id} onClick={() => { onSelect(conversation.id); onClose(); }} aria-current={activeId === conversation.id ? "page" : undefined} className={`mb-1 flex w-full items-start gap-2.5 rounded-md px-2.5 py-2.5 text-left transition ${activeId === conversation.id ? "bg-surface-muted text-foreground" : "text-muted hover:bg-surface-muted/70 hover:text-foreground"}`}><span className="min-w-0"><span className="block truncate text-xs font-medium">{conversation.title}</span><span className="mt-1 block text-[10px] text-muted">{conversation.updatedAt}</span></span></button>) : <p className="px-3 py-6 text-center text-xs text-muted">No conversations found.</p>}
        </ScrollArea>
        <Separator />
        <div className="p-3"><Link href="/" className="flex items-center justify-between rounded-md px-2 py-2 text-xs text-muted transition hover:bg-surface-muted hover:text-foreground"><span>EchoGPT home</span><span aria-hidden="true">↗</span></Link><p className="px-2 pt-2 text-[10px] text-muted">Frontend preview · local demo</p></div>
      </aside>
    </>
  );
}