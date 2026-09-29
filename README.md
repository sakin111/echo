# EchoGPT Redesign

Live demo: https://echo-chi-mocha-49.vercel.app/

A frontend-only product concept for EchoGPT, built with Next.js App Router, TypeScript, Tailwind CSS, and reusable shadcn-style UI primitives. It contains a marketing site, a multi-model chat workspace, and a simulated Chrome extension popup. No backend or model API is connected.

## Getting Started

This repository pins pnpm through Corepack. Install dependencies and start the development server:

```bash
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). To make a production build, run:

```bash
corepack pnpm build
corepack pnpm start
```

## Routes

- `/` is the responsive EchoGPT marketing page, with product preview tabs, model roster, feature grid, comparison, illustrative pricing, testimonials, FAQ, and newsletter interaction.
- `/app` is the web workspace with searchable conversation history, mobile sidebar, model selection, suggested prompts, Markdown/code rendering, and simulated assistant replies.
- `/extension` is an interactive browser-extension concept displayed in a fixed 400 × 600 popup frame. It includes Chat, History, Quick Actions, and Settings views.

## Technologies

- Next.js 16 App Router and React 19
- TypeScript strict mode
- Tailwind CSS 4 with CSS-variable design tokens
- shadcn/ui conventions and local composable components in `components/ui`
- `next-themes` for light, dark, and system themes
- Framer Motion for reduced-motion-aware entrance animations
- Lucide icons
- `react-markdown`, `remark-gfm`, and `rehype-highlight` for chat content

## Project Layout

```text
app/
	(routes)/
		app/page.tsx
		extension/page.tsx
		page.tsx
	globals.css
	layout.tsx
components/
	chat/
	extension/
	landing/
	shared/
	ui/
lib/
	mock-data.ts
	utils.ts

	index.ts
```

## Assumptions

- All sample models, feature descriptions, testimonials, pricing, and conversations are illustrative mock content.
- Chat replies are generated locally after a short delay. No request is sent to an AI provider.
- The extension is a responsive webpage demo, not an installable browser extension.
- The API-key field and newsletter form are visual/local interactions only. Neither value is transmitted or persisted.
- Conversations live in React state and reset on refresh.
- Tailwind tokens and local UI primitives follow shadcn conventions without requiring generated framework-specific components; `components.json` records the component aliases and style configuration.

## Additional Details

- Theme selection supports light, dark, and system modes.
- Motion respects the reduced-motion accessibility preference.
- The chat composer supports Enter to send and Shift+Enter for a newline, with auto-resizing text input.
- The extension concept includes searchable, date-grouped mock history and selectable model badges.
- No database, authentication, API route, analytics, or external service is used.
