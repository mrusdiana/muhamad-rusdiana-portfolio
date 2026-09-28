"use client";

import { UsersRound } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

const VISITOR_STORAGE_KEY = "portfolio-visit-counted-v1";
const COUNT_STORAGE_KEY = "portfolio-visit-count-v1";
const COUNT_EVENT = "portfolio-visit-count-update";

function readStoredCount() {
  try {
    const stored = Number(localStorage.getItem(COUNT_STORAGE_KEY));
    return Number.isFinite(stored) && stored >= 0 ? stored : null;
  } catch {
    return null;
  }
}

function publishCount(count: number) {
  try {
    localStorage.setItem(COUNT_STORAGE_KEY, String(count));
  } catch {
    // The live count can still be shown when browser storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent(COUNT_EVENT, { detail: count }));
}

function subscribeCount(onChange: () => void) {
  window.addEventListener(COUNT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(COUNT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

async function fetchCount(method: "GET" | "POST", signal: AbortSignal) {
  const response = await fetch("/api/visits", {
    method,
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Visit counter unavailable");

  const data = (await response.json()) as { count?: unknown };
  const count = Number(data.count);
  if (!Number.isFinite(count) || count < 0) {
    throw new Error("Invalid visit count");
  }
  return count;
}

export function VisitorTracker() {
  useEffect(() => {
    const hasVisited = (() => {
      try {
        return localStorage.getItem(VISITOR_STORAGE_KEY) === "true";
      } catch {
        return false;
      }
    })();

    const controller = new AbortController();

    const track = async () => {
      try {
        const count = await fetchCount(hasVisited ? "GET" : "POST", controller.signal);
        publishCount(count);
      } catch {
        try {
          const count = await fetchCount("GET", controller.signal);
          publishCount(count);
        } catch {
          return;
        }
      }

      if (!hasVisited) {
        try {
          localStorage.setItem(VISITOR_STORAGE_KEY, "true");
        } catch {
          // A visit can still be counted when browser storage is unavailable.
        }
      }
    };

    void track();
    return () => controller.abort();
  }, []);

  return null;
}

export default function VisitorCount() {
  const count = useSyncExternalStore(subscribeCount, readStoredCount, () => null);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[0.68rem] text-current opacity-70"
      aria-label={
        count === null
          ? "Loading portfolio visitor count"
          : `${count.toLocaleString("en-US")} portfolio visitors`
      }
      aria-live="polite"
      title="Portfolio visitors"
    >
      <UsersRound aria-hidden="true" size={13} strokeWidth={1.8} />
      <span>{count === null ? "— visitors" : `${count.toLocaleString("en-US")} visitors`}</span>
    </span>
  );
}
