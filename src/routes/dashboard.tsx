import { createFileRoute } from "@tanstack/react-router";
import { Users, Clock, Armchair, Star, RefreshCw, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, SimBadge } from "@/components/nutri/PageShell";
import { FeedbackList } from "@/components/nutri/FeedbackList";
import { avgRating, patternFor, simulateCrowdChange, useNutri } from "@/lib/nutri-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "College Dashboard — NutriCampus" },
      {
        name: "description",
        content:
          "Real-time cafeteria flow, crowd analytics, peak-hour detection and student feedback insights for college administrators.",
      },
      { property: "og:title", content: "College Dashboard — NutriCampus" },
      {
        property: "og:description",
        content: "Real-time cafeteria flow and feedback insights for college administrators.",
      },
    ],
  }),
  component: DashboardPage,
});

const INSIGHTS = [
  { label: "Peak crowd", value: "12:45–1:15 PM" },
  { label: "Common complaint", value: "Queue length" },
  { label: "Popular menu", value: "Rice • Dal • Curry" },
  { label: "Suggested action", value: "Improve counter flow" },
];

const LOOP = [
  "IoT Data",
  "NutriCampus Dashboard",
  "Student Feedback",
  "College Insight",
  "Operational Action",
];

function DashboardPage() {
  const { live, feedback } = useNutri();
  const pattern = patternFor(live);
  const occupancy = Math.round((live.crowd / live.capacity) * 100);
  const rating = avgRating(feedback);
  const peak = Math.max(...pattern.map((p) => p.value));

  return (
    <PageShell
      title="Live Cafeteria Dashboard"
      subtitle="Real-time cafeteria flow and feedback insights."
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SimBadge />
        <Button size="sm" variant="secondary" onClick={simulateCrowdChange}>
          <RefreshCw className="size-4" /> Simulate Crowd Change
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BigMetric icon={Users} label="Occupancy" value={`${occupancy}%`} />
        <BigMetric icon={Clock} label="Waiting Time" value={`${live.waiting} min`} />
        <BigMetric icon={Armchair} label="Seats Available" value={`${live.seats}`} />
        <BigMetric icon={Star} label="Student Feedback" value={`${rating.toFixed(1)} / 5`} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <section className="card-soft p-5 sm:p-6 lg:col-span-3">
          <h2 className="text-lg font-bold text-foreground">Today's Crowd Pattern</h2>
          <p className="text-sm text-muted-foreground">
            Peak period: <span className="font-semibold text-primary">12:45 PM – 1:15 PM</span>
          </p>
          <div className="mt-6 flex h-56 items-end gap-3 sm:gap-5">
            {pattern.map((p) => (
              <div key={p.time} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{p.value}%</span>
                <div className="flex h-44 w-full items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                      p.value === peak ? "bg-primary" : "bg-accent"
                    }`}
                    style={{ height: `${Math.max(6, p.value * 1.7)}px` }}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground">{p.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card-soft p-5 sm:p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-foreground">Feedback &amp; College Insights</h2>
          <ul className="mt-4 space-y-3">
            {INSIGHTS.map((i) => (
              <li
                key={i.label}
                className="flex items-center justify-between gap-3 rounded-xl bg-muted/70 p-3.5"
              >
                <span className="text-sm text-muted-foreground">{i.label}</span>
                <span className="text-sm font-semibold text-foreground">{i.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Based on {feedback.length} student responses collected today.
          </p>
        </section>
      </div>

      <div className="mt-5">
        <FeedbackList feedback={feedback} />
      </div>

      <section className="card-soft mt-5 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-foreground">Feedback Loop</h2>
        <p className="text-sm text-muted-foreground">
          NutriCampus is not just an information app — it closes the loop between data and action.
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 md:flex-row md:justify-between">
          {LOOP.map((step, idx) => (
            <div key={step} className="flex w-full flex-col items-center gap-2 md:flex-row">
              <div className="w-full rounded-xl border border-border bg-muted/60 px-4 py-3 text-center text-sm font-semibold text-foreground">
                {step}
              </div>
              {idx < LOOP.length - 1 && (
                <ArrowDown className="size-4 shrink-0 text-primary md:mx-2 md:-rotate-90" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-accent bg-accent/40 p-4 text-sm text-accent-foreground">
          Mess crowded at 1:00 PM → repeated crowd pattern detected → college adjusts service timing
          or counters.
        </p>
      </section>
    </PageShell>
  );
}

function BigMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
    </div>
  );
}
