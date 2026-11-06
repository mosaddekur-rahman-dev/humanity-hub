import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BedDouble,
  CalendarDays,
  Droplets,
  Mail,
  MapPin,
  ShieldCheck,
  Shirt,
  Sparkles,
  Stethoscope,
  Trash2,
  TreePine,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JoinEventBar } from "../joined/JoinEventBar";

type EventDoc = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

const TYPE_ICONS: Record<string, typeof Utensils> = {
  "Food Drive": Utensils,
  "Winter Clothes": Shirt,
  "Blanket Relief": BedDouble,
  Cleanup: Trash2,
  "Tree Plantation": TreePine,
  "Blood Donation": Droplets,
  "Medical Camp": Stethoscope,
};

const VOLUNTEER_GUIDELINES = [
  "Please arrive 15 minutes before the scheduled time at the designated location.",
  "Wear comfortable clothing suitable for physical social work and distribution.",
  "Bring any pre-coordinated relief packages or distribution items if requested.",
];

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventDetailsPage({
  params,
}: PageProps<"/events/[id]">) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);

  if (!res.ok) {
    notFound();
  }
  const event: EventDoc = await res.json();

  const TypeIcon = TYPE_ICONS[event.type] ?? Sparkles;

  return (
    <>
      <div className="bg-[#F0FDF4]">
        <div className="bg-white max-w-6xl mx-auto rounded-2xl mb-10">
          <section className="relative isolate h-104 w-full overflow-hidden sm:h-112 my-10 rounded-t-2xl">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/35 to-black/20" />

            <div className="absolute left-4 top-5 sm:left-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <TypeIcon className="size-3.5" />
                {event.type}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-white/80" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-white/80" />
                    {formatDate(event.date)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
              <JoinEventBar event={event} />

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div>
                  <h2 className="text-xl font-bold text-[#102C35]">
                    About this Social Initiative
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>

                  <hr className="my-6 border-border" />

                  <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Volunteer Guidelines
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {VOLUNTEER_GUIDELINES.map((rule) => (
                      <li key={rule} className="flex items-start gap-2.5">
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#12495c]" />
                        <span className="text-sm text-muted-foreground">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <aside className="self-start">
                  <div className="rounded-2xl border bg-card p-5">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Initiative Organizer
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <Avatar size="lg">
                        <AvatarFallback className="bg-[#12495c] text-xs font-semibold text-white">
                          HH
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">
                          Humanity Hub Team
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Mail className="size-3.5 shrink-0" />
                          <span className="truncate">
                            admin@humanityhub.org
                          </span>
                        </p>
                      </div>
                    </div>

                    <hr className="my-4 border-border" />

                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="size-4 text-teal-600" />
                      Verified Platform Member
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
