export type Model = {
  id: string;
  name: string;
  provider: string;
  mark: string;
  tone: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  updatedAt: string;
  messages: Message[];
};