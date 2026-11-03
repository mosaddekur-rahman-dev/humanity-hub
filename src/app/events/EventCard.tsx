import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export type EventDoc = {
  _id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

export function EventCard({ dat }: { dat: EventDoc }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video " />
      <Image
        src={dat.thumbnail}
        alt={dat.title}
        width={400}
        height={400}
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction className="flex flex-col gap-1">
          <Badge variant="outline">{dat.date}</Badge>
          <Badge variant="default">{dat.type}</Badge>
        </CardAction>
        <CardTitle>{dat.title}</CardTitle>
        <CardDescription>{dat.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/events/${dat._id}`}>
          <Button className="w-full">View Event</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
