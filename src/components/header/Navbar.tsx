"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiAddCircleLine } from "react-icons/ri";
import {
  IoSettingsOutline,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { MdLogout } from "react-icons/md";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuDropdown } from "./MenuDropdown";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const handleToggleTheme = () => {};

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-linear-to-r from-[#003d52] to-[#102C35]/90 py-2 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 text-white">
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

        <div className="flex items-center gap-5">
          <Button
            onClick={handleToggleTheme}
            size="icon"
            aria-label="Toggle theme"
            className="rounded-full bg-[#154150] text-white hover:bg-[#1b708d]">
            <Moon className="size-5" />
          </Button>

          {user ? (
            <>
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image ?? undefined}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div>
                    <h2 className="text-xl">{user.name}</h2>
                    <p>{user.email}</p>
                  </div>
                  <hr />
                  <div className="mb-4 mt-4 flex flex-col gap-3">
                    <Link
                      href="/add-event"
                      className="flex items-center gap-2 text-[#003d52]">
                      <RiAddCircleLine />
                      Create Event
                    </Link>
                    <Link
                      href="/events/manage"
                      className="flex items-center gap-2 text-[#003d52]">
                      <IoSettingsOutline />
                      Manage Event
                    </Link>
                    <Link
                      href="/events/joined"
                      className="flex items-center gap-2 text-[#003d52]">
                      <IoCheckmarkDoneCircleOutline />
                      Joined Event
                    </Link>
                  </div>
                  <hr />
                  <button
                    onClick={handleSignout}
                    className="flex cursor-pointer items-center gap-2 pt-2 text-red-700">
                    <MdLogout /> Logout
                  </button>
                </HoverCardContent>
              </HoverCard>

              <button
                onClick={handleSignout}
                className={cn(
                  buttonVariants(),
                  "rounded-sm bg-[#12495c] px-4 font-semibold text-white hover:bg-[#1b708d]",
                )}>
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants(),
                "rounded-sm bg-[#12495c] px-4 font-semibold text-white hover:bg-[#1b708d]",
              )}>
              Login
            </Link>
          )}
        </div>
      </header>
    </nav>
  );
}
