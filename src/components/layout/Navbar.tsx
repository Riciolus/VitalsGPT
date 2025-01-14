"use client";

import Image from "next/image";
import Avatar from "../features/profile/Avatar";
import Link from "next/link";
import ThemeButton from "../features/theme/ThemeButton";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 w-full px-7 border-b dark:border-neutral-700">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icon.svg"
          alt="icon"
          width={30}
          height={30}
          style={{ width: "30px", height: "30px" }}
        />
        <span className="font-bold">VitalsGPT</span>
      </Link>

      <div className="flex items-center gap-5">
        <div className="info md:flex items-center gap-5 hidden">
          <a
            href="https://github.com/Riciolus/VitalsGPT"
            className="flex gap-1 items-center group cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="17"
              height="17"
              viewBox="0 0 48 48"
              className="fill-neutral-400 dark:fill-neutral-500 group-hover:fill-yellow-500"
            >
              <path d="M 12.5 4 C 10.019 4 8 6.019 8 8.5 L 8 39.5 C 8 41.981 10.019 44 12.5 44 L 35.5 44 C 37.981 44 40 41.981 40 39.5 L 40 20 L 28.5 20 C 26.019 20 24 17.981 24 15.5 L 24 4 L 12.5 4 z M 27 4.8789062 L 27 15.5 C 27 16.327 27.673 17 28.5 17 L 39.121094 17 L 27 4.8789062 z M 17.5 25 L 30.5 25 C 31.328 25 32 25.672 32 26.5 C 32 27.328 31.328 28 30.5 28 L 17.5 28 C 16.672 28 16 27.328 16 26.5 C 16 25.672 16.672 25 17.5 25 z M 17.490234 32 L 26.486328 32 C 27.314328 32 27.986328 32.671 27.986328 33.5 C 27.987328 34.259 27.423406 34.887328 26.691406 34.986328 L 26.488281 35 L 17.492188 35 C 16.664188 35 15.992188 34.328 15.992188 33.5 C 15.992188 32.741 16.555109 32.112672 17.287109 32.013672 L 17.490234 32 z"></path>
            </svg>
            <span className="text-sm font-medium group-hover:text-yellow-600">Docs</span>
          </a>
          <div>
            <hr className="h-5 w-0.5 border-none bg-gray-200 dark:bg-neutral-700/30" />
          </div>
        </div>

        {/* Temporary for development */}
        <span onClick={() => signOut()} className="text-sm font-medium group-hover:text-yellow-600">
          Temporary Logout
        </span>

        <div className="flex justify-center items-center">
          {/* toggle theme button */}
          <div className="flex md:hidden">
            <ThemeButton />
          </div>
          <Avatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
