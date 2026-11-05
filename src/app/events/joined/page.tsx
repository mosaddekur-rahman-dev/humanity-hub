import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { EventCard } from "../EventCard";

export default async function JoinedEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  console.log(user);

  const res = await fetch(`http://localhost:8000/my-joined/${user?.email}`);
  const joined = await res.json();

  const today = new Date().toISOString().slice(0, 10);

  const sortedJoined = joined
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  console.log(joined);
  return (
    <>
      <div className="container mx-auto my-10 px-10">
        <div className="pb-5">
          <h2 className="text-3xl font-semibold mb-2">Joined Events</h2>
          <p>Here are all the social and community events you have joined</p>
        </div>
        <hr />

        {sortedJoined.length === 0 ? (
          <div className="container mx-auto">
            <p className="py-20 text-center justify-center flex text-muted-foreground">
              You haven&apos;t joined any events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sortedJoined.map((dat) => (
              <EventCard key={dat._id} dat={dat} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
