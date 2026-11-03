import Image from "next/image";
import { MapPin } from "lucide-react";
import { eventData } from "../../../eventData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type GalleryItem = {
  title: string;
  type: string;
  location: string;
  thumbnail: string;
};

const GALLERY_ITEMS: GalleryItem[] = eventData;

export function Gallery({ items = GALLERY_ITEMS }: { items?: GalleryItem[] }) {
  return (
    <section className="px-4 py-10 bg-[#F0FDF4]">
      <div className="mx-auto max-w-7xl pb-20">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#1b708d]">
            Our Impact
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102C35] sm:text-4xl">
            Moments of Kindness Across Bangladesh
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            A look at community drives, cleanups, and relief efforts organized
            by volunteers from Dhaka to Cox&apos;s Bazar.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mt-10 w-full">
          <CarouselContent className="-ml-5">
            {items.slice(0, 6).map((item) => (
              <CarouselItem
                key={`${item.title}-${item.location}`}
                className="pl-5 sm:basis-1/2 lg:basis-1/3">
                <figure className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-[#102C35]/10 bg-slate-100 shadow-sm">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#102C35]/90 via-[#102C35]/30 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-full bg-[#12495c] px-3 py-1 text-xs font-semibold text-white">
                    {item.type}
                  </span>

                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="line-clamp-2 text-base font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="line-clamp-1">{item.location}</span>
                    </p>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 border-0 bg-white/90 text-[#102C35] hover:bg-white" />
          <CarouselNext className="right-2 border-0 bg-white/90 text-[#102C35] hover:bg-white" />
        </Carousel>
      </div>
      <hr />
    </section>
  );
}
