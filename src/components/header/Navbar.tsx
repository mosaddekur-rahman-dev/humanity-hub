import { Link } from "@heroui/react";
import Image from "next/image";
import { MenuDropdown } from "./MenuDropdown";

export function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-linear-to-b from-[#102C35]  to bg-[#003d52] backdrop-blur-lg py-2">
        <header className="flex max-w-7xl mx-auto h-16 items-center justify-between px-6 text-white">
          <div className="font-bold flex items-center gap-2">
            <MenuDropdown />
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/" className="font-semibold no-underline">
                <div className="flex gap-2 items-center">
                  <div>
                    <Image
                      src="/images/humanityhublogo.jpg"
                      alt="Humanity Hub logo"
                      width={50}
                      height={50}
                      className="w-10 h-10"></Image>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-2xl">Humanity Hub</h2>
                    <p className="text-sm text-[#1b708d]">Connecting People</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <Link href="/" className="no-underline">
              <button className="hidden md:inline-block font-semibold bg-[#12495c] hover:bg-[#1b708d] py-2 px-10 rounded-sm cursor-pointer no-underline">
                Upcoming Events
              </button>
            </Link>
          </div>
          <div>
            <Link href="/login" className="no-underline">
              <button className="bg-[#12495c] cursor-pointer py-2 px-4 rounded-sm font-semibold ml-20 hover:bg-[#1b708d] ">
                Login
              </button>
            </Link>
          </div>
        </header>
      </nav>
    </>
  );
}
