import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import EditEventForm from "./EditEventForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;
  if (!email) redirect("/login");

  const res = await fetch(`${API_URL}/events/${id}`, { cache: "no-store" });
  if (!res.ok) notFound();

  const event = await res.json();
  if (!event) notFound();

  // only the creator can edit
  if (event.email !== email) redirect("/events");

  return <EditEventForm event={event} />;
}
