import { EventCard, type EventDoc } from "@/app/events/EventCard";
import Link from "next/link";

export async function UpcomingEvents() {
  let data: EventDoc[] = [];
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      throw new Error("NEXT_PUBLIC_API_URL is missing");
    }

    const res = await fetch(`${API_URL}/events`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    data = await res.json();
  } catch (error) {
    console.error("Upcoming events API error:", error);
  }

  return (
    <div className="bg-[#F0FDF4] py-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h2 className="text-3xl text-center justify-center font-semibold ">
          Upcoming Events
        </h2>
        <Link href="/events">
          <button className="btn py-2 px-2 cursor-pointer bg-[#12495c] text-white hover:bg-[#1b708d] rounded-sm">
            View all events
          </button>
        </Link>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 gap-8 pb-20">
        {data.slice(0, 6).map((dat: EventDoc) => (
          <EventCard key={dat._id} dat={dat} />
        ))}
      </div>
      <hr />
    </div>
  );
}
