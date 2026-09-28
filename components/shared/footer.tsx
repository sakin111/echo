"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Send } from "lucide-react";
import { useState } from "react";
import { Brand } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:py-16">
        <div>
          <Link href="/" aria-label="EchoGPT home"><Brand /></Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">A little more perspective for every big idea. All your favorite models, finally in one place.</p>
          <div className="mt-6 flex gap-5 text-sm text-muted">
            <Link className="hover:text-foreground" href="/app">Web app <ArrowUpRight aria-hidden="true" className="ml-1 inline size-3" /></Link>
            <Link className="hover:text-foreground" href="/extension">Chrome extension <ArrowUpRight aria-hidden="true" className="ml-1 inline size-3" /></Link>
          </div>
        </div>
        <form className="lg:justify-self-end lg:w-full lg:max-w-md" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}>
          <label className="text-sm font-semibold" htmlFor="newsletter-email">The occasional good idea</label>
          <p className="mt-1 text-sm text-muted">Product notes and ways to think better. No noise.</p>
          <div className="mt-4 flex gap-2">
            <Input id="newsletter-email" type="email" placeholder="you@example.com" required aria-label="Email address for newsletter" />
            <Button aria-label={subscribed ? "Subscribed" : "Subscribe to newsletter"} type="submit" size="icon" className="bg-stone-500">
              {subscribed ? <Check aria-hidden="true" className="size-4" /> : <Send aria-hidden="true" className="size-4" />}
            </Button>
          </div>
          {subscribed && <p className="mt-2 text-xs text-primary" role="status">You are on the list.</p>}
        </form>
      </div>
      <div className="border-t border-border px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-xs text-muted sm:flex-row">
          <span>© 2025 EchoGPT. Made for curious minds.</span>
          <span>Frontend concept · No data leaves this demo</span>
        </div>
      </div>
    </footer>
  );
}