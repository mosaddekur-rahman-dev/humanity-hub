"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LINKS = [
  { label: "Upcoming Events", href: "/" },
  { label: "Login", href: "/login" },
];

export function MenuDropdown() {
  return (
    <div className="flex sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="secondary" size="icon" aria-label="Open menu" />
          }>
          <Image
            src="/images/humanityhublogo.jpg"
            alt="Humanity Hub logo"
            width={50}
            height={50}
            className="h-6 w-6 cursor-pointer"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="min-w-44 rounded-sm border-none bg-[#102C35] p-2">
          {LINKS.map(({ label, href }) => (
            <DropdownMenuItem
              key={label}
              render={<Link href={href} />}
              className="cursor-pointer font-semibold text-white focus:bg-[#16A34A] focus:text-white">
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
