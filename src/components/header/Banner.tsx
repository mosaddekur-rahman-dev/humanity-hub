import { ArrowRight, HandHeart, Heart, Users } from "lucide-react";
import Link from "next/link";
import { ImpactStats, Stats } from "./Stats";

export function Banner() {
  return (
    <section className="overflow-hidden bg-[#F0FDF4]">
      <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:py-10">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-[#102C35]">
            <Heart size={16} className="fill-[#1b708d]" />
            Together, We Can Make a Difference
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-5xl lg:text-6xl">
            Small Acts of
            <span className="block text-[#12495c]">Kindness,</span>
            Big Changes.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Join a community of compassionate people. Create events, volunteer
            your time, and help make a positive impact in someone&apos;s life.
            Because together, we can build a better world.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-xl from-[#102C35]  to bg-[#003d52] px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-[#1b708d]">
              Explore Events
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 rounded-xl border border-[#12495c] bg-white px-6 py-3.5 font-semibold text-[#102C35] transition hover:bg-green-50">
              <HandHeart size={19} />
              Create an Event
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-green-200 pt-7">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Users className="text-[#1b708d]" size={22} />
                Community
              </div>
              <p className="mt-1 text-sm text-gray-500">
                People helping people
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Heart className="text-[#1b708d]" size={22} />
                Humanity
              </div>
              <p className="mt-1 text-sm text-gray-500">Every act matters</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-green-200/50 rotate-3" />
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&q=85"
            alt="Volunteers working together for their community"
            className="relative h-[380px] w-full rounded-[2rem] object-cover shadow-xl sm:h-[480px]"
          />
          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 shadow-xl sm:-left-8">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-3 text-green-700">
                <Heart size={24} className="fill-[#1b708d]" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Spread Kindness</p>
                <p className="text-sm text-gray-500">
                  Be someone&apos;s hope today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
}
