const stats = [
  {
    id: 1,
    value: "200+",
    label: "Our Volunteers",
    color: "text-green-800",
  },
  {
    id: 2,
    value: "50+",
    label: "Projects Completed",
    color: "text-teal-800",
  },
  {
    id: 3,
    value: "1000+",
    label: "Lives Changed",
    color: "text-indigo-800",
  },
  {
    id: 4,
    value: "100%",
    label: "Powered by Kindness",
    color: "text-amber-700",
  },
];

export function Stats() {
  return (
    <section className="bg-[#F0FDF4] py-2 sm:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center
              rounded-xl border border-gray-200 bg-white
              px-3 py-4 shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:shadow-md sm:py-5">
              <h3
                className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${stat.color}`}>
                {stat.value}
              </h3>

              <p className="mt-1 text-center text-xs font-medium text-slate-600 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
