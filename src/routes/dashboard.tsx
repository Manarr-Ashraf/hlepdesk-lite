import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, PageHeader, StatCard } from "@/components/ui-bits";
import { progressItems } from "@/lib/tickets-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — HelpDesk Lite Analytics" },
      {
        name: "description",
        content: "Weekly ticket volume, channel mix and team workload analytics for your support desk.",
      },
      { property: "og:title", content: "Dashboard — HelpDesk Lite Analytics" },
      {
        property: "og:description",
        content: "Visualise ticket trends, channels and workload across your support teams.",
      },
    ],
  }),
  component: DashboardPage,
});

const week = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 74 },
  { day: "Sat", value: 31 },
  { day: "Sun", value: 22 },
];

const channels = [
  { name: "Email", share: 46, className: "bg-brand" },
  { name: "Live chat", share: 28, className: "bg-violet" },
  { name: "Phone", share: 16, className: "bg-teal" },
  { name: "Portal", share: 10, className: "bg-warning" },
];

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader title="Dashboard" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Tickets this week" value="382" index={0} />
        <StatCard label="Avg. First Response" value="12" unit="min" index={1} />
        <StatCard label="Satisfaction" value="94%" index={2} />
        <StatCard label="Backlog" value="27" index={3} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card className="animate-rise stagger-2 p-6">
          <h2 className="text-lg font-bold">Tickets per day</h2>
          <div className="mt-8 flex h-56 items-end gap-4">
            {week.map((d, i) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="animate-rise w-full rounded-t-lg bg-brand/85 transition-all duration-300 hover:bg-brand"
                    style={{ height: `${d.value}%`, animationDelay: `${i * 70}ms` }}
                    title={`${d.value} tickets`}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="animate-rise stagger-3 p-6">
          <h2 className="text-lg font-bold">Channels</h2>
          <div className="mt-5 space-y-5">
            {channels.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{c.name}</span>
                  <span className="text-muted-foreground">{c.share}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-[width] duration-700 ${c.className}`}
                    style={{ width: `${c.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="animate-rise stagger-4 p-6">
        <h2 className="text-lg font-bold">Team workload</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {progressItems.map((item) => (
            <div
              key={item.name}
              className={`rounded-xl p-5 text-brand-foreground transition-transform duration-200 hover:-translate-y-1 ${item.className}`}
            >
              <p className="text-3xl font-bold">{item.percent}%</p>
              <p className="mt-1 font-semibold">{item.name}</p>
              <p className="text-xs opacity-90">Status: {item.status}</p>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}