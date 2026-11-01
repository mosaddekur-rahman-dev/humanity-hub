import Features from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Banner } from "@/components/header/Banner";
import { Newsletter } from "@/components/Newsletter";
import { UpcomingEvents } from "@/components/UpcomingEvents";

export default function Home() {
  return (
    <div>
      <Banner />
      <Features />
      <UpcomingEvents />
      <Gallery />
      <Newsletter />
    </div>
  );
}
