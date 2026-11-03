import Features from "@/components/features/Features";
import { Gallery } from "@/components/gallery/Gallery";
import { Banner } from "@/components/header/Banner";
import { Newsletter } from "@/components/newsletter/Newsletter";
import { UpcomingEvents } from "@/components/upcomingEvents/UpcomingEvents";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div>
      <Banner />
      <Features />
      <UpcomingEvents />
      <Gallery />
      <Newsletter />
      <ToastContainer />
    </div>
  );
}
