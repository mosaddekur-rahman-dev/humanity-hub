"use client";
import { Button, Dropdown } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function MenuDropdown() {
  return (
    <div className="flex sm:hidden">
      <Dropdown>
        <Button variant="secondary">
          <Image
            src="/images/humanityhublogo.jpg"
            alt="Humanity Hub logo"
            width={50}
            height={50}
            className="w-6 h-6 cursor-pointer"></Image>
        </Button>

        <Dropdown.Popover className="bg-[#102C35] p-3 rounded-sm ">
          <Dropdown.Menu>
            <Dropdown.Item id="new-file" textValue="Upcoming Events">
              <Link href={"/"}>
                <button className="cursor-pointer text-black font-semibold">
                  Upcoming Events
                </button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item id="copy-link" textValue="Login">
              <Link href={"/"}>
                <button className="cursor-pointer text-black font-semibold">
                  Login
                </button>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
