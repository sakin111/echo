"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp, ChevronDown, Paperclip, Sparkles } from "lucide-react";
import { models } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";

type Props = {
  onSend: (text: string) => void;
  disabled: boolean;
  modelId: string;
  onModelChange: (modelId: string) => void;
};

export function ChatComposer({ onSend, disabled, modelId, onModelChange }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const selected = models.find((model) => model.id === modelId) ?? models[0];

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-3 pb-4 pt-2 sm:px-6 sm:pb-6">
      <div className="rounded-xl border border-borde p-2 shadow-sm focus-within:border-primary/50">
        <Textarea
          ref={textareaRef}
          aria-label="Message EchoGPT"
          placeholder="Ask a question..."
          value={value}
          disabled={disabled}
          rows={1}
          onChange={(event) => {
            setValue(event.target.value);
            event.currentTarget.style.height = "auto";
            event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 180)}px`;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          className="max-h-44 min-h-12 resize-none border-0 bg-transparent px-3 py-3 text-sm shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-1">
          <div className="flex items-center gap-1">
            <label className="relative inline-flex h-8 items-center gap-1.5 rounded px-2 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-foreground">
              <span className={`grid size-5 place-items-center overflow-hidden rounded ${selected.tone}`}>
                <Image src={selected.mark} alt={selected.name} width={20} height={20} />
              </span>
              {selected.name}
              <ChevronDown aria-hidden="true" className="size-3" />
              <select
                aria-label="Select AI model"
                value={modelId}
                onChange={(event) => onModelChange(event.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </label>
            <Tooltip label="Attachments are visual-only in this demo">
              <Button type="button" variant="ghost" size="icon" className="size-8" aria-label="Attach a file">
                <Paperclip className="size-4" />
              </Button>
            </Tooltip>
        
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] text-muted sm:inline">
              Enter to send · Shift+Enter for newline
            </span>
            <Button
              type="button"
              onClick={submit}
              disabled={!value.trim() || disabled}
              size="icon"
              aria-label="Send message"
              className="size-9  bg-white text-black border-2"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-muted">
        EchoGPT can make mistakes. Check important information.
      </p>
    </div>
  );
}