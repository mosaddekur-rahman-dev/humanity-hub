"use client";

import { useState } from "react";

import { Heart, Share2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export function JoinEventBar() {
  const [isJoined, setIsJoined] = useState(false);

  const toggleJoined = () => {
    setIsJoined(!isJoined);
  };
  const count = isJoined ? 1 : 0;

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
            Sign up to join hands for this cause
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-xl"
          aria-label="Share this event">
          <Share2 />
        </Button>
        <Button
          onClick={toggleJoined}
          className={
            isJoined
              ? "h-10 rounded-xl bg-[#12495c] px-5 font-semibold text-white ring-1 ring-teal-200 hover:bg-[#1b708d]"
              : "h-10 rounded-xl bg-[#12495c] px-5 font-semibold text-white hover:bg-[#1b708d]"
          }>
          <Heart className={isJoined ? "fill-current" : undefined} />
          {isJoined ? "Joined" : "Join Event"}
        </Button>
      </div>
    </div>
  );
}
