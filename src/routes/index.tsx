import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Users, Armchair, RefreshCw, Lightbulb, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { PageShell, SimBadge } from "@/components/nutri/PageShell";
import {
  addFeedback,
  FEEDBACK_CATEGORIES,
  simulateCrowdChange,
  STATUS_LABEL,
  useNutri,
  type FeedbackCategory,
} from "@/lib/nutri-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student — NutriCampus Smart Cafeteria" },
      {
        name: "description",
        content:
          "Check live cafeteria crowd levels, waiting time, seats available and today's menu before heading to the mess.",
      },
      { property: "og:title", content: "Student — NutriCampus Smart Cafeteria" },
      {
        property: "og:description",
        content: "Live crowd levels, waiting time and today's menu for your campus cafeteria.",
      },
    ],
  }),
  component: StudentPage,
});

const MENU = [
  { name: "Rice & Dal", nutrition: "Carbohydrates • Protein", kcal: 320 },
  { name: "Vegetable Curry", nutrition: "Fiber • Vitamins", kcal: 140 },
  { name: "Curd", nutrition: "Protein • Calcium", kcal: 90 },
];

const statusTone: Record<string, string> = {
  QUIET: "bg-success/15 text-success",
  MODERATE: "bg-warning/20 text-warning",
  BUSY: "bg-warning/25 text-warning",
  "VERY BUSY": "bg-danger/15 text-danger",
};

function StudentPage() {
  const { live } = useNutri();
  const [showRec, setShowRec] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [category, setCategory] = useState<FeedbackCategory>("Food");
  const [submitted, setSubmitted] = useState(false);

  const pct = Math.round((live.crowd / live.capacity) * 100);

  return (
    <PageShell
      title="Eat smarter. Wait less."
      subtitle="Check crowd levels, waiting time and today's menu before heading to the cafeteria."
    >
      <div className="grid gap-5 lg:grid-cols-5">
        <section className="card-soft p-5 sm:p-6 lg:col-span-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-foreground">Live Cafeteria Status</h2>
              <p className="text-sm text-muted-foreground">HOSTEL MESS</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
              <span className="size-2 animate-pulse rounded-full bg-success" />
              LIVE
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Metric icon={Users} label="Crowd" value={`${live.crowd} / ${live.capacity}`} />
            <Metric icon={Clock} label="Waiting time" value={`${live.waiting} min`} />
            <Metric icon={Armchair} label="Seats available" value={`${live.seats}`} />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Occupancy</span>
              <span className="text-muted-foreground">{pct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Current status:</span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-bold tracking-wide",
                  statusTone[live.status],
                )}
              >
                {live.status}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button onClick={() => setShowRec(true)}>
              <Lightbulb className="size-4" /> Check Recommendation
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                simulateCrowdChange();
                setShowRec(false);
              }}
            >
              <RefreshCw className="size-4" /> Simulate Crowd Change
            </Button>
          </div>

          {showRec && (
            <p className="mt-4 rounded-xl border border-accent bg-accent/50 p-4 text-sm text-accent-foreground">
              {STATUS_LABEL[live.status]}
            </p>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <SimBadge />
            <p className="mt-2 text-xs text-muted-foreground">
              Prototype simulation — in the final system, occupancy and queue sensors connected to
              an ESP32 would provide this data.
            </p>
          </div>
        </section>

        <div className="grid gap-5 lg:col-span-2">
          <section className="card-soft p-5 sm:p-6">
            <h2 className="text-lg font-bold text-foreground">Today's Menu</h2>
            <ul className="mt-4 space-y-3">
              {MENU.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start justify-between gap-3 rounded-xl bg-muted/70 p-3.5"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Nutrition: {item.nutrition}</p>
                  </div>
                  <span className="rounded-full bg-card px-2.5 py-1 text-xs font-semibold text-primary">
                    {item.kcal} kcal
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-soft p-5 sm:p-6">
            <h2 className="text-lg font-bold text-foreground">Student Feedback</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your rating helps the college improve cafeteria service.
            </p>
            <Button
              className="mt-4 w-full"
              variant="outline"
              onClick={() => {
                setOpen(true);
                setSubmitted(false);
                setRating(0);
                setComment("");
                setCategory("Food");
              }}
            >
              <MessageSquare className="size-4" /> Give Feedback
            </Button>
          </section>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How was your cafeteria experience?</DialogTitle>
            <DialogDescription>
              Ratings and comments go straight to the college dashboard.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <p className="rounded-xl bg-accent/60 p-4 text-sm font-medium text-accent-foreground">
              Thank you! Your feedback has been added to the college dashboard.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={cn(
                      "size-11 rounded-xl border border-border text-sm font-semibold transition-colors",
                      rating === n
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-muted",
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {FEEDBACK_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors",
                      category === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-muted",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Optional comment (e.g. queue was long at 1 PM)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          )}

          <DialogFooter>
            {submitted ? (
              <Button onClick={() => setOpen(false)}>Close</Button>
            ) : (
              <Button
                disabled={rating === 0}
                onClick={() => {
                  addFeedback(rating, comment, category);
                  setSubmitted(true);
                }}
              >
                Submit Feedback
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/70 p-3.5">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}
