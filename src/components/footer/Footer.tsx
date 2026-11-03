import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#102C35] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 lg:gap-80 sm:gap-50">
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2">
              <div className="rounded-xl bg-[#1b708d] p-2.5"></div>
              <span className="text-2xl font-extrabold tracking-tight">
                Humanity Hub
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-300">
              Connecting compassionate people to create meaningful change.
              Together, we can build a kinder and better world through small
              acts of humanity.
            </p>
          </div>

          <div className="items-center justify-center">
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {[
                { name: "Home", href: "/" },
                { name: "Explore Events", href: "/events" },
                { name: "Create Event", href: "/events/create" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:pl-1 hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Get in Touch</h3>

            <ul className="space-y-5 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">admin@humanityhub.org</li>

              <li className="flex items-center gap-3">+880 1300-707411</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center text-sm text-gray-400 md:flex-row">
          <p>© 2026 HumanityHub. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>❤️</span> Made by and for humanity.
          </p>
        </div>
      </div>
    </footer>
  );
}
