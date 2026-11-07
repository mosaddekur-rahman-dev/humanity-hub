import { EventCard, type EventDoc } from "@/app/events/EventCard";
import Link from "next/link";
import { Suspense } from "react";

export default async function AllEventsPage() {
  let upcoming: EventDoc[] = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const res = await fetch(`${API_URL}/events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Events API failed: ${res.status}`);
    }
    const data: EventDoc[] = await res.json();
    const today = new Date().toISOString().slice(0, 10);

    upcoming = data
      .filter((e) => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  return (
    <>
      <div className="container mx-auto items-center flex justify-between px-15">
        <h2 className="text-3xl font-semibold mt-10">All Upcoming Events</h2>
        <Link href="/add-event">
          <button className="bg-[#12495c] text-white py-1 px-2 rounded-sm mt-10 cursor-pointer">
            Create Event
          </button>
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No upcoming events yet. Be the first to create one!
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
          <Suspense fallback="Loading...">
            {upcoming.map((dat) => (
              <EventCard key={dat._id} dat={dat} />
            ))}
          </Suspense>
        </div>
      )}
    </>
  );
}
