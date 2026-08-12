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

export type Feedback = { rating: number; comment: string; at: number };

type State = {
  live: CrowdState;
  feedback: Feedback[];
  lastUpdated: number;
};

let state: State = {
  live: CROWD_STATES[2],
  feedback: [
    { rating: 5, comment: "Food was fresh today.", at: Date.now() - 7200000 },
    { rating: 4, comment: "Queue was long around 1 PM.", at: Date.now() - 5400000 },
    { rating: 5, comment: "Curd portion is good.", at: Date.now() - 3600000 },
    { rating: 4, comment: "Needs more seating.", at: Date.now() - 1800000 },
    { rating: 5, comment: "Quick service after 2 PM.", at: Date.now() - 900000 },
  ],
  lastUpdated: Date.now(),
};

const listeners = new Set<() => void>();
function emit() {
  listeners.forEach((l) => l());
}

export function simulateCrowdChange() {
  const options = CROWD_STATES.filter((s) => s.status !== state.live.status);
  const next = options[Math.floor(Math.random() * options.length)];
  state = { ...state, live: next, lastUpdated: Date.now() };
  emit();
}

export function addFeedback(rating: number, comment: string) {
  state = { ...state, feedback: [...state.feedback, { rating, comment, at: Date.now() }] };
  emit();
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
