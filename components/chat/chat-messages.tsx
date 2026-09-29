"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy, Sparkles } from "lucide-react";
import type { Conversation, Message } from "@/types";
import { models, suggestedPrompts } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = { conversation: Conversation | null; isTyping: boolean; onPrompt: (prompt: string) => void; modelId: string };

function MessageRow({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const model = models.find((item) => item.name === message.model) ?? models[0];
  return (
    <article className={`group flex gap-3 py-5 sm:gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className={`size-8 rounded-md ${model.tone}`}>
          <Image src={model.mark} alt={model.name} width={16} height={16} className="size-4 object-contain" />
        </Avatar>
      )}
      <div className={`max-w-[min(90%,46rem)] ${isUser ? "rounded-xl bg-surface-muted px-4 py-3" : "min-w-0 flex-1 pt-1"}`}>
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold">{isUser ? "You" : message.model || "EchoGPT"}<span className="font-normal text-muted">{message.createdAt}</span></div>
        {isUser ? <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p> : <div className="markdown-content text-sm leading-7"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{message.content}</ReactMarkdown></div>}
        {!isUser && <div className="mt-3 flex items-center gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100"><DropdownMenu label="Assistant response options"><button onClick={() => void navigator.clipboard?.writeText(message.content)}><Copy className="mr-2 inline size-3.5" />Copy response</button><button onClick={() => void navigator.clipboard?.writeText(message.content)}><Sparkles className="mr-2 inline size-3.5" />Save as prompt</button></DropdownMenu><span className="text-[10px] text-muted">Helpful?</span><Button size="icon" variant="ghost" className="size-7" aria-label="Mark response helpful"><Check className="size-3.5" /></Button></div>}
      </div>
      {isUser && <Avatar className="size-8 rounded-md bg-foreground text-background">Y</Avatar>}
    </article>
  );
}

export function ChatMessages({ conversation, isTyping, onPrompt, modelId }: Props) {
  const typingModel = models.find((item) => item.id === modelId) ?? models[0];

  if (!conversation || conversation.messages.length === 0) {
    return <div className="flex flex-1 flex-col justify-center px-4 py-8 sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm font-medium text-gray-500 dark:text-white">A little more perspective</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">What&apos;s on your mind?</h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted">Choose a starting point, or bring your own question. You can switch models whenever your thinking takes a new turn.</p>
        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {suggestedPrompts.map((item) => <button key={item.title} onClick={() => onPrompt(item.prompt)} className="rounded-lg border border-border bg-surface p-4 text-left transition hover:border-primary/40 hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"><span className="block text-sm font-semibold">{item.title}</span><span className="mt-1.5 block text-xs leading-5 text-muted">{item.prompt}</span></button>)}
        </div>
      </div>
    </div>;
  }

  return <ScrollArea className="flex-1 px-4 sm:px-8"><div className="mx-auto max-w-3xl py-4"><h1 className="mb-2 truncate text-center text-sm font-semibold text-muted">{conversation.title}</h1>{conversation.messages.map((message) => <MessageRow key={message.id} message={message} />)}{isTyping && <div role="status" aria-label="EchoGPT is responding" className="flex items-center gap-3 py-5"><Avatar className={`size-8 rounded-md ${typingModel.tone}`}><Image src={typingModel.mark} alt={typingModel.name} width={16} height={16} className="size-4 object-contain" /></Avatar><span className="flex gap-1"><span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" /><span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" /><span className="size-1.5 animate-bounce rounded-full bg-primary" /></span><span className="text-xs text-muted">Thinking through it...</span></div>}</div></ScrollArea>;
}