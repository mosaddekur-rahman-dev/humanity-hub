import { EventCard, type EventDoc } from "@/app/events/EventCard";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "cn";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function JoinedEventsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const res = await fetch(`${API_URL}/my-joined/${encodeURIComponent(email)}`, {
    cache: "no-store",
  });
  const joined: EventDoc[] = res.ok ? await res.json() : [];

  const sorted = [...joined].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="container mx-auto my-10 px-10">
      <h2 className="mb-2 text-3xl font-semibold">Joined Events</h2>
      <p className="pb-5">Social drives you have joined</p>
      <hr />

      {sorted.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-5 py-20 ">
          <p className="text-center text-muted-foreground">
            You haven&apos;t joined any events yet.
          </p>
          <Link href={"/events"}>
            {" "}
            <button
              className={cn(
                buttonVariants(),
                "rounded-sm bg-[#12495c] px-4 font-semibold text-white hover:bg-[#1b708d] cursor-pointer",
              )}>
              See Upcoming Events
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((dat) => (
            <EventCard key={dat._id} dat={dat} />
          ))}
        </div>
      )}
    </div>
  );
}
