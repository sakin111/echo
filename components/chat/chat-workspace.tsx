"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Plus, Sparkles } from "lucide-react";
import type { Conversation, Message } from "@/types";
import { models, starterConversations } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChatComposer } from "@/components/chat/chat-composer";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatSidebar } from "@/components/chat/chat-sidebar";

function makeReply(prompt: string, modelName: string) {
  return `A useful place to start is to make the next step smaller and more specific.\n\nFor **${prompt.slice(0, 72)}${prompt.length > 72 ? "..." : ""}**, try this:\n\n1. Name what a helpful outcome would look like.\n2. Choose one action you can finish in 15 minutes.\n3. Notice what you learn before planning the next move.\n\nThat keeps momentum without asking you to solve the whole thing at once.\n\n_This is a simulated ${modelName} response in the local demo._`;
}

export function ChatWorkspace() {
  const [conversations, setConversations] = useState<Conversation[]>(starterConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modelId, setModelId] = useState(models[0].id);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeConversation = conversations.find((item) => item.id === activeId) ?? null;
  const selectedModel = models.find((item) => item.id === modelId) ?? models[0];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const newConversation = () => {
    setActiveId(null);
    setIsTyping(false);
  };

  const sendMessage = (content: string) => {
    let conversationId = activeId;
    if (!conversationId || !conversations.some((item) => item.id === conversationId)) {
      conversationId = `local-${Date.now()}`;
      const created: Conversation = {
        id: conversationId,
        title: content.slice(0, 38) || "New conversation",
        updatedAt: "Today",
        messages: [],
      };
      setConversations((items) => [created, ...items]);
      setActiveId(conversationId);
    }
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      createdAt: "Just now",
    };
    const chosenModel = models.find((item) => item.id === modelId) ?? models[0];
    setConversations((items) =>
      items.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              title: item.messages.length ? item.title : content.slice(0, 38),
              messages: [...item.messages, userMessage],
            }
          : item
      )
    );
    setIsTyping(true);
    window.setTimeout(() => {
      const response: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: makeReply(content, chosenModel.name),
        model: chosenModel.name,
        createdAt: "Just now",
      };
      setConversations((items) =>
        items.map((item) =>
          item.id === conversationId ? { ...item, messages: [...item.messages, response] } : item
        )
      );
      setIsTyping(false);
    }, 950);
  };

  return (
    <div className="flex h-dvh min-h-136 overflow-hidden bg-background">
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={newConversation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <label className="relative flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface-muted">
              <Avatar className={`size-7 rounded-md ${selectedModel.tone}`}>
                <Image
                  src={selectedModel.mark}
                  alt={selectedModel.name}
                  width={24}
                  height={24}
                />
              </Avatar>
              <span className="max-w-32 truncate text-sm font-semibold">{selectedModel.name}</span>
              <select
                aria-label="Select AI model"
                value={modelId}
                onChange={(event) => setModelId(event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} · {model.provider}
                  </option>
                ))}
              </select>
            </label>
            <span className="hidden text-xs text-muted sm:inline">Personal workspace</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Start a new chat" onClick={newConversation}>
              <Plus className="size-4" />
            </Button>
            <Avatar className="size-8 border border-border bg-surface-muted text-foreground">Y</Avatar>
          </div>
        </header>
        {!activeConversation && !isTyping && (
          <div className="sr-only">
            New conversation ready
          </div>
        )}
        <ChatMessages conversation={activeConversation} isTyping={isTyping} onPrompt={sendMessage} modelId={modelId} />
        <ChatComposer
          onSend={sendMessage}
          disabled={isTyping}
          modelId={modelId}
          onModelChange={setModelId}
        />
      </main>
    </div>
  );
}