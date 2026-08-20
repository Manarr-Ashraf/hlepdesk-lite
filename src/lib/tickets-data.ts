import type { Tone } from "@/components/ui-bits";

export type Ticket = {
  id: string;
  title: string;
  status: { label: string; tone: Tone };
  firstResponse: string | null;
  resolution: string | null;
  team: string;
  priority: { label: string; tone: Tone };
};

export const tickets: Ticket[] = [
  {
    id: "#TK-7281",
    title: "System login issue",
    status: { label: "Open", tone: "success" },
    firstResponse: "Responded",
    resolution: "Resolved",
    team: "CS",
    priority: { label: "High", tone: "danger" },
  },
  {
    id: "#TK-7282",
    title: "Billing query",
    status: { label: "Pending", tone: "warning" },
    firstResponse: "Responded",
    resolution: null,
    team: "Support",
    priority: { label: "Medium", tone: "warning" },
  },
  {
    id: "#TK-7283",
    title: "Password reset",
    status: { label: "Closed", tone: "success" },
    firstResponse: "Responded",
    resolution: "Resolved",
    team: "IT",
    priority: { label: "Low", tone: "success" },
  },
  {
    id: "#TK-7284",
    title: "API access error",
    status: { label: "Critical", tone: "danger" },
    firstResponse: null,
    resolution: null,
    team: "Ops",
    priority: { label: "High", tone: "danger" },
  },
];

export const progressItems = [
  {
    name: "Support",
    percent: 75,
    note: "Design is one of the most important components...",
    status: "Underway",
    className: "bg-danger",
  },
  {
    name: "IT",
    percent: 95,
    note: "We are developing a new application...",
    status: "Active",
    className: "bg-violet",
  },
  {
    name: "Customer Service",
    percent: 90,
    note: "Pay per click is the best way to earn...",
    status: "Monitoring",
    className: "bg-teal",
  },
  {
    name: "Operations",
    percent: 80,
    note: "Search Engine Optimization is vital for web...",
    status: "Ongoing",
    className: "bg-warning",
  },
];