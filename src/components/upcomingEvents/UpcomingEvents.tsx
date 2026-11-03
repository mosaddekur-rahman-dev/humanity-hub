import Link from "next/link";
import { EventCard, type EventDoc } from "@/app/events/EventCard";

export async function UpcomingEvents() {
  const res = await fetch("http://localhost:8000/events");
  const data: EventDoc[] = await res.json();

  console.log(data);
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
