import type { Conversation, Feature, Model, PricingPlan } from "@/types";

export const models: Model[] = [
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", mark: "O", tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  { id: "claude-3.7", name: "Claude 3.7", provider: "Anthropic", mark: "A", tone: "bg-orange-500/15 text-orange-700 dark:text-orange-300" },
  { id: "gemini-2.5", name: "Gemini 2.5", provider: "Google", mark: "G", tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300" },
  { id: "llama-3.3", name: "Llama 3.3", provider: "Meta", mark: "M", tone: "bg-blue-500/15 text-blue-700 dark:text-blue-300" },
];

export const features: Feature[] = [
  { title: "Every model, one home", description: "Move between leading AI models without losing your flow or opening another tab.", icon: "Layers3" },
  { title: "Answers with perspective", description: "Compare responses side by side and find the thinking that fits the moment.", icon: "GitCompareArrows" },
  { title: "Your context stays yours", description: "Keep useful conversations organized in a workspace that feels like yours.", icon: "ShieldCheck" },
  { title: "Useful wherever you are", description: "Bring EchoGPT to your browser with quick access from the Chrome extension.", icon: "PanelRight" },
  { title: "A clearer way to create", description: "Turn rough thoughts into polished writing, plans, and ideas with less busywork.", icon: "WandSparkles" },
  { title: "Made for momentum", description: "Shortcuts and thoughtful defaults help you get from question to next step.", icon: "Command" },
];

export const plans: PricingPlan[] = [
  { name: "Starter", price: "Free", cadence: "forever", description: "A spacious start for curious minds.", features: ["Access to 2 AI models", "30 messages per day", "Conversation history"] },
  { name: "Plus", price: "$12", cadence: "per month", description: "More room for your best work.", features: ["All leading AI models", "Unlimited conversations", "Side-by-side compare", "Browser extension"], featured: true },
  { name: "Team", price: "$24", cadence: "per seat / month", description: "A shared space for bright teams.", features: ["Everything in Plus", "Shared prompt library", "Team workspaces", "Priority support"] },
];

export const faqs = [
  { question: "What is EchoGPT?", answer: "EchoGPT is a single workspace concept for exploring multiple AI models. This frontend demo uses local mock interactions and does not connect to AI services." },
  { question: "Do I need separate subscriptions for each model?", answer: "This redesign presents a unified product experience. Real model access and billing would depend on the service configuration; this demo includes no integrations or payments." },
  { question: "Can I use EchoGPT in my browser?", answer: "Yes. The extension route demonstrates a compact browser popup concept that keeps quick prompts and recent conversations close at hand." },
  { question: "Is my data stored anywhere?", answer: "No. The prototype runs entirely in your browser with in-memory state. Refreshing the page resets any messages you send." },
];

export const starterConversations: Conversation[] = [
  {
    id: "c1",
    title: "A better morning routine",
    updatedAt: "Today",
    messages: [
      { id: "m1", role: "user", content: "Help me build a calmer morning routine that still gets me moving.", createdAt: "9:41 AM" },
      { id: "m2", role: "assistant", model: "Claude 3.7", content: "Try a **three-part start**: give yourself a quiet first ten minutes, add one small movement cue, then choose just one priority before opening your inbox. The routine should make the morning feel easier, not more optimized.", createdAt: "9:41 AM" },
    ],
  },
  {
    id: "c2",
    title: "Launch page headline ideas",
    updatedAt: "Yesterday",
    messages: [
      { id: "m3", role: "user", content: "Give me a few directions for a thoughtful product launch headline.", createdAt: "4:18 PM" },
      { id: "m4", role: "assistant", model: "GPT-4o", content: "A few starting points:\n\n- **Make room for better questions.**\n- **One workspace. More ways forward.**\n- **Good ideas deserve another perspective.**", createdAt: "4:18 PM" },
    ],
  },
];

export const suggestedPrompts = [
  { title: "Get unstuck", prompt: "I'm stuck on a project. Help me find a useful next step.", icon: "Sparkles" },
  { title: "Write with clarity", prompt: "Help me make this idea clearer and more compelling.", icon: "PenLine" },
  { title: "Learn something", prompt: "Explain a complex topic in plain language with an example.", icon: "BookOpen" },
  { title: "Think it through", prompt: "Help me weigh the options for a decision I'm considering.", icon: "Scale" },
];