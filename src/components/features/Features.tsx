import { Users, CalendarDays, Heart, Handshake } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Active Changemakers",
    description:
      "A growing community of volunteers who care and contribute to make a difference.",
    icon: Users,
  },
  {
    id: 2,
    title: "Community Initiatives",
    description:
      "Organized events and projects that bring positive change in our society.",
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Lives Touched",
    description:
      "Real stories of impact, from support, relief and hope across communities.",
    icon: Heart,
  },
  {
    id: 4,
    title: "Powered by Kindness",
    description:
      "A platform built on compassion, where everyone can help, support and grow together.",
    icon: Handshake,
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#F0FDF4] py-16 sm:py-20 lg:py-25">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-bold uppercase tracking-wider text-[#102C35]">
            Our Features
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#102C35] sm:text-4xl lg:text-5xl">
            Built for a <span className="text-[#12495c]">Kinder Community</span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            Humanity Hub connects compassionate people with meaningful causes,
            helping to create a more caring and supportive society.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2  hover:shadow-xl hover:shadow-green-900/5 sm:p-7 hover:border-[#102C35]">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-[#1b708d] transition-colors duration-300 group-hover:bg-[#12495c] group-hover:text-white">
                  <Icon size={32} strokeWidth={2} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#102C35]">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
