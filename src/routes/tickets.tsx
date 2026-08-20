import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, PageHeader, Pill } from "@/components/ui-bits";
import { tickets } from "@/lib/tickets-data";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Tickets — Filter and Triage Support Requests" },
      {
        name: "description",
        content: "Search, filter by status and triage every incoming support ticket in one queue.",
      },
      { property: "og:title", content: "Tickets — Filter and Triage Support Requests" },
      {
        property: "og:description",
        content: "A searchable ticket queue with status filters, teams and priorities.",
      },
    ],
  }),
  component: TicketsPage,
});

const filters = ["All", "Open", "Pending", "Closed", "Critical"] as const;

function TicketsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      tickets.filter(
        (t) =>
          (filter === "All" || t.status.label === filter) &&
          (t.title + t.id).toLowerCase().includes(query.toLowerCase()),
      ),
    [filter, query],
  );

  return (
    <AppShell>
      <PageHeader
        title="Tickets"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition-transform hover:-translate-y-0.5">
            <Plus className="size-4" />
            New ticket
          </button>
        }
      />

      <Card className="animate-rise stagger-1 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tickets"
              className="w-full rounded-full bg-muted py-2.5 pl-10 pr-4 text-sm outline-none ring-brand/40 focus:ring-2"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? "bg-brand text-brand-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {rows.map((t, i) => (
            <div
              key={t.id}
              className={`animate-rise stagger-${i} flex flex-wrap items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-muted/60`}
            >
              <span className="w-24 text-sm font-medium text-muted-foreground">{t.id}</span>
              <span className="min-w-[140px] flex-1 font-medium">{t.title}</span>
              <Pill tone={t.status.tone} upper>
                {t.status.label}
              </Pill>
              <Pill tone="info">{t.team}</Pill>
              <Pill tone={t.priority.tone} upper>
                {t.priority.label}
              </Pill>
            </div>
          ))}
          {rows.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">No tickets match your filters.</p>
          )}
        </div>
      </Card>
    </AppShell>
  );
}