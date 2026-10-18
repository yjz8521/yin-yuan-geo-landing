import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
      {children}
    </p>
  );
}

export function SectionTitle({ children, as = "h2" }: { children: ReactNode; as?: "h1" | "h2" }) {
  const Tag = as;
  return (
    <Tag className="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
      {children}
    </Tag>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
      {children}
    </p>
  );
}
