"use client";

import { useTheme } from "next-themes";
import { SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";

const themes = ["light", "dark", "system"] as const;

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const nextTheme = themes[(themes.indexOf((theme as typeof themes[number]) || "system") + 1) % themes.length];

  return (
    <Button
      aria-label={`Switch theme. Current theme: ${theme || "system"}`}
      title={`Switch to ${nextTheme} theme`}
      variant="ghost"
      size="icon"
      onClick={() => setTheme(nextTheme)}
    >
      <SunMoon aria-hidden="true" className="size-4" />
    </Button>
  );
}