import Link from "next/link";
import Image from "next/image";
import { Moon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuDropdown } from "./MenuDropdown";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-linear-to-r from-[#003d52] to-[#102C35]/90 py-2 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-2 font-bold">
          <MenuDropdown />
          <Link
            href="/"
            className="hidden items-center gap-2 no-underline sm:flex">
            <Image
              src="/images/humanityhublogo.jpg"
              alt="Humanity Hub logo"
              width={50}
              height={50}
              className="h-10 w-10"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-semibold text-white">
                Humanity Hub
              </h2>
              <p className="text-sm text-[#1b708d]">Connecting People</p>
            </div>
          </Link>
        </div>

        <Link
          href="/events"
          className={cn(
            buttonVariants(),
            "hidden rounded-sm bg-[#12495c] px-10 font-semibold text-white hover:bg-[#1b708d] md:inline-flex",
          )}>
          Upcoming Events
        </Link>

        {/* Right: theme toggle + login */}
        <div className="flex items-center gap-5">
          <Button
            size="icon"
            aria-label="Toggle theme"
            className="rounded-full bg-[#154150] text-white hover:bg-[#1b708d]">
            <Moon className="size-5" />
          </Button>
          <Link
            href="/login"
            className={cn(
              buttonVariants(),
              "rounded-sm bg-[#12495c] px-4 font-semibold text-white hover:bg-[#1b708d]",
            )}>
            Login
          </Link>
        </div>
      </header>
    </nav>
  );
}
