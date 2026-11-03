"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, ImageIcon, MapPin, Sparkles, Tag, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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

// Replace with your own hosted images
const PHOTO_PRESETS = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
  },
];

const todayString = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  type: z.string().min(1, "Please select an event type"),
  date: z
    .string()
    .min(1, "Event date is required")
    .refine((v) => v >= todayString(), "Date must be today or later"),
  location: z.string().min(3, "Location is required"),
  thumbnail: z.string().url("Enter a valid image URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000),
});

export type EventFormValues = z.infer<typeof formSchema>;

const iconClass =
  "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground";
const inputClass = "h-11 bg-slate-50 pl-9";

const Required = () => <span className="text-red-500">*</span>;

export default function CreateEventForm() {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      date: "",
      location: "",
      thumbnail: "",
      description: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: EventFormValues) {
    try {
      const res = await fetch("http://localhost:8000/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      toast.success("Event Added Successfully");
      form.reset();
      router.push("/events");
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border bg-white p-6 shadow-sm sm:p-8 my-10 border-[#102C35]">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-[#12495c] border border-[#102C35]">
        <Sparkles className="size-3.5" />
        Social Service Drive
      </span>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#102C35]">
        Create a Community Event
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Organize a local relief effort, environmental cleanup, or community
        support drive.
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
                    placeholder="e.g. Winter Clothes Drive"
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
                      min={todayString()}
                      aria-invalid={fieldState.invalid}
                      className={inputClass}
                    />
                  </div>
                  <FieldDescription>
                    Dates must be in the future (today or later)
                  </FieldDescription>
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
                    placeholder="e.g. Community Hall, Mirpur"
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
                    placeholder="https://example.com/photo.jpg"
                    aria-invalid={fieldState.invalid}
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span>Quick photo presets:</span>
                  {PHOTO_PRESETS.map((p, i) => (
                    <span key={p.label} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          form.setValue("thumbnail", p.url, {
                            shouldValidate: true,
                          })
                        }
                        className="font-medium text-[#065e7c] hover:underline">
                        {p.label}
                      </button>
                      {i < PHOTO_PRESETS.length - 1 && <span>•</span>}
                    </span>
                  ))}
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
                  placeholder="Tell people what the event is about and how they can help..."
                  aria-invalid={fieldState.invalid}
                  className="min-h-32 resize-none bg-slate-50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-11 w-full bg-[#12495c] text-base font-semibold hover:bg-[#1b708d]">
            {form.formState.isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
