import { EventCard, type EventDoc } from "@/app/events/EventCard";
import Link from "next/link";

export default async function AllEventsPage() {
  const res = await fetch("http://localhost:8000/events");
  const data: EventDoc[] = await res.json();

  console.log(data);
  return (
    <>
      <div className="max-w-7xl">
        <div className="max-w-6xl mx-auto items-center flex justify-between mr-10">
          <h2 className="text-3xl font-semibold mt-10">All Events</h2>
          <Link href="/add-event">
            <button className="bg-[#12495c] text-white py-1 px-2 rounded-sm mt-10 cursor-pointer">
              Create Event
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
        {data.map((dat: EventDoc) => (
          <EventCard key={dat._id} dat={dat} />
        ))}
      </div>
    </>
  );
}
