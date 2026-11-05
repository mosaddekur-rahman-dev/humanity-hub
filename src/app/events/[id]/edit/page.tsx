import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import EditEventForm from "./EditEventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const res = await fetch(`http://localhost:8000/events/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) notFound();
  const event = await res.json();

  if (event.email !== email) redirect("/events");

  return <EditEventForm event={event} />;
}
