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
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
      {children}
    </p>
  );
}

export function SectionTitle({ children, as = "h2" }: { children: ReactNode; as?: "h1" | "h2" }) {
  const Tag = as;
  return (
    <Tag className="max-w-2xl text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
      {children}
    </Tag>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
      {children}
    </p>
  );
}

/** Top band for inner pages: label, h1, lead on a soft blue wash. */
export function PageHero({ label, title, lead, children }: { label?: ReactNode; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-blue-50/70 to-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        {label ? <SectionLabel>{label}</SectionLabel> : null}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">{lead}</p> : null}
        {children}
      </div>
    </div>
  );
}
