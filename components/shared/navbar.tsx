import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/shared/brand";
import { ThemeToggle } from "@/components/shared/theme-toggle";

const links = [
  { label: "Product", href: "#product" },
  { label: "Models", href: "#models" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <nav aria-label="Main navigation" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link aria-label="EchoGPT home" href="/"><Brand /></Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => <a key={link.href} className="text-sm text-muted transition-colors hover:text-foreground" href={link.href}>{link.label}</a>)}
          <Link className="text-sm text-muted transition-colors hover:text-foreground" href="/extension">Extension</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link className="hidden h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-95 sm:inline-flex" href="/app">
            Open workspace <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <Link className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground sm:hidden" href="/app">Try EchoGPT</Link>
        </div>
      </nav>
    </header>
  );
}