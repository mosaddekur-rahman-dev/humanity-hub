import { EventCard } from "/src/app/events/EventCard.tsx";

export default async function AllEventsPage() {
  const res = await fetch("http://localhost:8000/events");
  const data = await res.json();

  console.log(data);
  return (
    <>
      <h2 className="text-3xl font-semibold text-center pt-10">All Events</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 gap-5">
        {data.map((dat) => (
          <EventCard key={dat._id} dat={dat} />
        ))}
      </div>
    </>
  );
}
