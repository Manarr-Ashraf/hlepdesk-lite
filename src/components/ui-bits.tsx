import type { ReactNode } from "react";

export function PageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 animate-rise">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-card shadow-card ${className}`}>{children}</section>
  );
}

export function StatCard({
  label,
  value,
  unit,
  index = 0,
}: {
  label: string;
  value: string;
  unit?: string;
  index?: number;
}) {
  return (
    <div
      className={`animate-rise stagger-${index} rounded-2xl bg-card p-6 shadow-card transition-transform duration-200 hover:-translate-y-1`}
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-4 text-3xl font-bold text-violet">
        {value}
        {unit && <span className="ml-1 text-base font-semibold">{unit}</span>}
      </p>
    </div>
  );
}

const toneMap = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  muted: "bg-muted text-muted-foreground",
} as const;

export type Tone = keyof typeof toneMap;

export function Pill({
  children,
  tone = "muted",
  upper = false,
}: {
  children: ReactNode;
  tone?: Tone;
  upper?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneMap[tone]} ${
        upper ? "uppercase tracking-wide" : ""
      }`}
    >
      {children}
    </span>
  );
}