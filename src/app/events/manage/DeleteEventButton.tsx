"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function DeleteEventButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error(`Failed with status ${res.status}`);

      toast.success("Event deleted");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Could not delete the event");
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
