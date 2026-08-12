import type { ReactNode } from "react";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
      </header>
      {children}
    </main>
  );
}

export function SimBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold tracking-wide text-accent-foreground uppercase">
      <span className="size-1.5 rounded-full bg-primary" />
      Simulated IoT data
    </span>
  );
}
