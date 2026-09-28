"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, description, centered = true, className = "" }: { eyebrow: string; title: string; description?: string; centered?: boolean; className?: string }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{description}</p>}
    </div>
  );
}