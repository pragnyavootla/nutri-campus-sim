import { useSyncExternalStore } from "react";

export type CrowdState = {
  crowd: number;
  capacity: number;
  waiting: number;
  seats: number;
  status: "QUIET" | "MODERATE" | "BUSY" | "VERY BUSY";
  peakFactor: number;
};

export const CROWD_STATES: CrowdState[] = [
  { crowd: 42, capacity: 100, waiting: 7, seats: 18, status: "QUIET", peakFactor: 0.55 },
  { crowd: 63, capacity: 100, waiting: 10, seats: 11, status: "MODERATE", peakFactor: 0.78 },
  { crowd: 86, capacity: 100, waiting: 15, seats: 4, status: "BUSY", peakFactor: 1 },
  { crowd: 94, capacity: 100, waiting: 19, seats: 2, status: "VERY BUSY", peakFactor: 1.08 },
];

export const BASE_PATTERN = [
  { time: "11 AM", value: 28 },
  { time: "12 PM", value: 42 },
  { time: "1 PM", value: 88 },
  { time: "2 PM", value: 64 },
  { time: "3 PM", value: 36 },
  { time: "4 PM", value: 24 },
];

export const FEEDBACK_CATEGORIES = ["Food", "Queue", "Seating", "Service", "Other"] as const;
export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export type Feedback = {
  id: string;
  rating: number;
  comment: string;
  category: FeedbackCategory;
  at: number;
};

type State = {
  live: CrowdState;
  feedback: Feedback[];
  lastUpdated: number;
};

let state: State = {
  live: CROWD_STATES[2]!,
  feedback: [
    { id: "f1", rating: 5, comment: "Food was fresh today.", category: "Food", at: Date.now() - 7200000 },
    { id: "f2", rating: 3, comment: "Queue was long around 1 PM.", category: "Queue", at: Date.now() - 5400000 },
    { id: "f3", rating: 5, comment: "Curd portion is good.", category: "Food", at: Date.now() - 3600000 },
    { id: "f4", rating: 2, comment: "Needs more seating during peak hours.", category: "Seating", at: Date.now() - 1800000 },
    { id: "f5", rating: 4, comment: "Quick service after 2 PM.", category: "Service", at: Date.now() - 900000 },
  ],
 lastUpdated: Date.now(),
};

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export function simulateCrowdChange() {
  const options = CROWD_STATES.filter((s) => s.status !== state.live.status);
  const next = options[Math.floor(Math.random() * options.length)]!;
  state = { ...state, live: next, lastUpdated: Date.now() };
  emit();
}

export function addFeedback(
  rating: number,
  comment: string,
  category: FeedbackCategory = "Other",
) {
  const entry: Feedback = {
    id: `f${Date.now()}${Math.floor(Math.random() * 1000)}`,
    rating,
    comment: comment.trim(),
    category,
    at: Date.now(),
  };
  state = { ...state, feedback: [...state.feedback, entry] };
  emit();
}

export function ratingDistribution(feedback: Feedback[]) {
  return [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: feedback.filter((f) => f.rating === stars).length,
  }));
}

export function timeAgo(at: number) {
  const mins = Math.max(0, Math.round((Date.now() - at) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs} hr ago`;
}

export function useNutri() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => state,
  );
}

export function avgRating(feedback: Feedback[]) {
  if (!feedback.length) return 0;
  return feedback.reduce((a, f) => a + f.rating, 0) / feedback.length;
}

export function patternFor(live: CrowdState) {
  return BASE_PATTERN.map((p) => ({
    ...p,
    value: Math.min(99, Math.round(p.value * live.peakFactor)),
  }));
}

export const STATUS_LABEL: Record<CrowdState["status"], string> = {
  QUIET: "Great time to visit — almost no queue.",
  MODERATE: "Manageable queue. A short wait is expected.",
  BUSY: "The cafeteria is currently busy. Consider waiting a few minutes or choosing an alternate food location.",
  "VERY BUSY":
    "Very heavy rush right now. Waiting around 15–20 minutes is likely — visiting after 2 PM is recommended.",
};
