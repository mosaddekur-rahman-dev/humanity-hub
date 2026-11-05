"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function DeleteEventButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(`http://localhost:8000/manage/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed with status ${res.status}`);

      toast.success("Event deleted");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete the event");
    } finally {
      router.refresh();
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
