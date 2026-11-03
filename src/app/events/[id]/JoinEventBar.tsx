"use client";

import { useSyncExternalStore } from "react";
import { Heart, Share2, Users } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "humanity-hub:joined-events";

const listeners = new Set<() => void>();

function readJoinedIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function writeJoinedIds(ids: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    listeners.forEach((listener) => listener());
  } catch {
    // Storage unavailable (private mode / quota); ignore
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function JoinEventBar({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  // Server snapshot is always false so the SSR markup (0 joined) matches;
  // the client snapshot reads through to localStorage after hydration.
  const joined = useSyncExternalStore(
    subscribe,
    () => readJoinedIds().includes(eventId),
    () => false,
  );

  function toggleJoined() {
    const ids = readJoinedIds();
    const isJoined = ids.includes(eventId);
    writeJoinedIds(
      isJoined ? ids.filter((x) => x !== eventId) : [...ids, eventId],
    );
    toast.success(
      isJoined ? "You left this event" : "You joined this event 🎉",
    );
  }

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: eventTitle, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Event link copied to clipboard");
    } catch {
      // Share dialog dismissed; nothing to do
    }
  }

  const count = joined ? 1 : 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-3.5">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#12495c] text-white">
          <Users className="size-5" />
        </span>
        <div>
          <p className="font-semibold text-foreground">
            {count} {count === 1 ? "Volunteer" : "Volunteers"} Joined
          </p>
          <p className="text-sm text-muted-foreground">
            Sign up to join hands for this drive
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-xl"
          aria-label="Share this event"
          onClick={handleShare}>
          <Share2 />
        </Button>
        <Button
          onClick={toggleJoined}
          className={
            joined
              ? "h-10 rounded-xl bg-[#12495c] px-5 font-semibold text-white ring-1 ring-teal-200 hover:bg-[#1b708d]"
              : "h-10 rounded-xl bg-[#12495c] px-5 font-semibold text-white hover:bg-[#1b708d]"
          }>
          <Heart className={joined ? "fill-current" : undefined} />
          {joined ? "Joined" : "Join Event"}
        </Button>
      </div>
    </div>
  );
}
