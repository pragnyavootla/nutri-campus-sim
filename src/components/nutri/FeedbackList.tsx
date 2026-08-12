import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  avgRating,
  ratingDistribution,
  timeAgo,
  type Feedback,
} from "@/lib/nutri-store";

const FILTERS = ["All", "5", "4", "3", "2", "1"] as const;

export function FeedbackList({ feedback }: { feedback: Feedback[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const sorted = [...feedback].sort((a, b) => b.at - a.at);
  const visible = filter === "All" ? sorted : sorted.filter((f) => f.rating === Number(filter));
  const dist = ratingDistribution(feedback);
  const total = feedback.length || 1;

  return (
    <section className="card-soft p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Feedback Submissions</h2>
          <p className="text-sm text-muted-foreground">
            {feedback.length} responses • average {avgRating(feedback).toFixed(1)} / 5
          </p>
        </div>
        <div className="flex flex-wrap gap-1 rounded-full bg-muted p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                filter === f
                  ? "bg-card text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f === "All" ? "All" : `${f}★`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-5">
        <div className="space-y-2 lg:col-span-2">
          {dist.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="w-8 text-xs font-semibold text-foreground">{d.stars}★</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(d.count / total) * 100}%` }}
                />
              </div>
              <span className="w-6 text-right text-xs text-muted-foreground">{d.count}</span>
            </div>
          ))}
        </div>

        <ul className="max-h-80 space-y-3 overflow-y-auto pr-1 lg:col-span-3">
          {visible.length === 0 && (
            <li className="rounded-xl bg-muted/70 p-4 text-sm text-muted-foreground">
              No submissions with this rating yet.
            </li>
          )}
          {visible.map((f) => (
            <li key={f.id} className="rounded-xl border border-border bg-muted/50 p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-card px-2.5 py-1 text-xs font-bold text-primary">
                  <Star className="size-3 fill-current" /> {f.rating}
                </span>
                <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                  {f.category}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">{timeAgo(f.at)}</span>
              </div>
              <p className="mt-2 flex items-start gap-2 text-sm text-foreground">
                <MessageSquare className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                {f.comment || <span className="text-muted-foreground">No comment provided.</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
