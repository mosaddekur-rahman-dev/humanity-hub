"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, ImageIcon, MapPin, Tag, Type } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const API_URL = "http://localhost:8000";
const MANAGE_PATH = "/events/manage";

const EVENT_TYPES = [
  "Food Drive",
  "Winter Clothes",
  "Blanket Relief",
  "Cleanup",
  "Tree Plantation",
  "Blood Donation",
  "Medical Camp",
  "Other",
] as const;

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  type: z.string().min(1, "Please select an event type"),
  date: z.string().min(1, "Event date is required"),
  location: z.string().min(3, "Location is required"),
  thumbnail: z.string().url("Enter a valid image URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
});

type EventFormValues = z.infer<typeof formSchema>;

type EventDoc = EventFormValues & { _id: string; email: string };

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
const inputClass = "h-11 bg-slate-50 pl-9";
const Required = () => <span className="text-red-500">*</span>;

export default function EditEventForm({ event }: { event: EventDoc }) {
  const router = useRouter();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title,
      type: event.type,
      date: event.date,
      location: event.location,
      thumbnail: event.thumbnail,
      description: event.description,
    },
  });

  const token = await getTokenFromClient();

  async function onSubmit(values: EventFormValues) {
    try {
      const res = await fetch(`${API_URL}/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      toast.success("Event updated");
      router.push(MANAGE_PATH);
      router.refresh();
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Could not update the event. Please try again.");
    }
  }

  return (
    <div className="mx-auto my-10 w-full max-w-2xl rounded-3xl border border-[#102C35] bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-[#102C35]">
        Edit Event
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Update the details of your community event.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="title">
                  Event Title <Required />
                </FieldLabel>
                <div className="relative">
                  <Type className={iconClass} />
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="type">
                    Event Type <Required />
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger
                      id="type"
                      aria-invalid={fieldState.invalid}
                      className="h-11 w-full bg-slate-50">
                      <div className="flex items-center gap-2">
                        <Tag className="size-4 text-muted-foreground" />
                        <SelectValue placeholder="Select type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {EVENT_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="date">
                    Event Date <Required />
                  </FieldLabel>
                  <div className="relative">
                    <Calendar className={iconClass} />
                    <Input
                      {...field}
                      id="date"
                      type="date"
                      aria-invalid={fieldState.invalid}
                      className={inputClass}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="location"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="location">
                  Location / Venue <Required />
                </FieldLabel>
                <div className="relative">
                  <MapPin className={iconClass} />
                  <Input
                    {...field}
                    id="location"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="thumbnail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="thumbnail">
                  Thumbnail Image URL <Required />
                </FieldLabel>
                <div className="relative">
                  <ImageIcon className={iconClass} />
                  <Input
                    {...field}
                    id="thumbnail"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">
                  Event Description <Required />
                </FieldLabel>
                <Textarea
                  {...field}
                  id="description"
                  aria-invalid={fieldState.invalid}
                  className="min-h-32 resize-none bg-slate-50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-11 flex-1"
              onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-11 flex-1 bg-[#12495c] font-semibold hover:bg-[#1b708d]">
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
