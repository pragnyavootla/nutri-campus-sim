import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Cpu, BarChart3, ArrowDown } from "lucide-react";
import { PageShell } from "@/components/nutri/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the System — NutriCampus" },
      {
        name: "description",
        content:
          "How NutriCampus works: student platform, IoT sensing layer with ESP32, and the college dashboard for operational decisions.",
      },
      { property: "og:title", content: "About the System — NutriCampus" },
      {
        property: "og:description",
        content: "Architecture of the NutriCampus smart cafeteria management prototype.",
      },
    ],
  }),
  component: AboutPage,
});

const LAYERS = [
  {
    icon: GraduationCap,
    title: "Student Platform",
    items: [
      "View live crowd",
      "View waiting time",
      "View menu and nutrition information",
      "Give feedback",
    ],
  },
  {
    icon: Cpu,
    title: "IoT Layer",
    items: ["Occupancy sensing", "Queue monitoring", "ESP32 data collection", "Wi-Fi transmission"],
  },
  {
    icon: BarChart3,
    title: "College Dashboard",
    items: ["Crowd insights", "Peak-hour analysis", "Feedback", "Operational decisions"],
  },
];

function AboutPage() {
  return (
    <PageShell
      title="About the System"
      subtitle="NutriCampus connects students, cafeteria sensing and college operations in one loop."
    >
      <div className="card-soft mb-5 border-accent bg-accent/30 p-5 sm:p-6">
        <span className="inline-flex rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
          Prototype Mode
        </span>
        <p className="mt-3 text-sm text-accent-foreground">
          Sensor readings are simulated for demonstration. The proposed final implementation uses
          occupancy/queue sensors connected to an ESP32 and sends the readings to the NutriCampus
          platform through Wi-Fi.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {LAYERS.map((layer) => (
          <section key={layer.title} className="card-soft p-5 sm:p-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <layer.icon className="size-5" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-foreground">{layer.title}</h2>
            <ul className="mt-3 space-y-2">
              {layer.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="card-soft mt-5 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-foreground">Proposed Data Flow</h2>
        <div className="mt-5 flex flex-col items-center gap-2 md:flex-row md:justify-between">
          {[
            "Occupancy / queue sensors",
            "ESP32 controller",
            "Wi-Fi transmission",
            "NutriCampus platform",
            "Students & college",
          ].map((step, idx, arr) => (
            <div key={step} className="flex w-full flex-col items-center gap-2 md:flex-row">
              <div className="w-full rounded-xl border border-border bg-muted/60 px-4 py-3 text-center text-sm font-semibold text-foreground">
                {step}
              </div>
              {idx < arr.length - 1 && (
                <ArrowDown className="size-4 shrink-0 text-primary md:mx-2 md:-rotate-90" />
              )}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
