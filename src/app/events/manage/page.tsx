import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";
import { DeleteEventButton } from "./DeleteEventButton";

type EventData = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

export default async function ManageEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  if (!email) redirect("/login");

  const res = await fetch(
    `http://localhost:8000/manage/${encodeURIComponent(email)}`,
    { cache: "no-store" },
  );

  const manage: EventData[] = res.ok ? await res.json() : [];

  return (
    <div className="container mx-auto my-10 px-10">
      <div>
        <h2 className="text-3xl font-semibold mb-2">Manage My Events</h2>
        <div className="flex justify-between pb-5">
          <p>View, edit and manage the social drives you have created</p>
          <Link
            href="/add-event"
            className={cn(
              buttonVariants(),
              "rounded-sm bg-[#12495c] px-4 font-semibold text-white hover:bg-[#1b708d]",
            )}>
            Create new Event
          </Link>
        </div>
      </div>
      <hr />

      {manage.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          You haven&apos;t created any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {manage.map((dat) => (
            <Card key={dat._id} className="w-full pt-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dat.thumbnail}
                alt={dat.title}
                className="aspect-video w-full rounded-t-xl object-cover"
              />
              <CardHeader>
                <CardAction className="flex flex-col gap-1">
                  <Badge variant="outline">{dat.date}</Badge>
                  <Badge variant="default">{dat.type}</Badge>
                </CardAction>
                <CardTitle>{dat.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {dat.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex items-center justify-between gap-2">
                <Link
                  href={`/events/${dat._id}`}
                  className={buttonVariants({ variant: "outline" })}>
                  View
                </Link>
                <div className="flex gap-2">
                  <Link
                    href={`/events/${dat._id}/edit`}
                    className={buttonVariants({ variant: "secondary" })}>
                    Edit
                  </Link>
                  <DeleteEventButton id={dat._id} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
