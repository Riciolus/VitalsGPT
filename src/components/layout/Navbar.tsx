"use client";

import Image from "next/image";
import Avatar from "../features/profile/Avatar";
import Link from "next/link";
import Button from "../ui/button";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="flex justify-between items-center h-16 w-full px-7 border-b dark:border-neutral-700">
      <Link href="/" className="flex items-center gap-2">
        <div>
          <Image src="icon.svg" alt="icon" width={30} height={30} />
        </div>
        <span className="font-bold">VitalsGPT</span>
      </Link>

      <div className="flex items-center gap-5">
        <div className="info md:flex items-center gap-5 hidden">
          <a href="/docs" className="flex gap-1 items-center group cursor-pointer">
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

        <div className="flex justify-center items-center">
          {/* toggle theme button */}
          <div className="flex md:hidden">
            <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme == "light" ? (
                // moon icon
                <svg width="25px" height="25px" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M21 15.5018C18.651 14.5223 17 12.2039 17 9.5C17 6.79774 18.6534 4.48062 21 3.5C20.2304 3.17906 19.3859 3 18.5 3C15.7977 3 13.4806 4.64899 12.5 6.9956M6.9 21C4.74609 21 3 19.2889 3 17.1781C3 15.4286 4.3 13.8125 6.25 13.5C6.86168 12.0617 8.30934 11 9.9978 11C12.1607 11 13.9285 12.6589 14.05 14.75C15.1978 15.2463 16 16.4645 16 17.7835C16 19.5599 14.5449 21 12.75 21L6.9 21Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-neutral-400"
                  />
                </svg>
              ) : (
                // sun icon
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7.45508 2V3M11.3438 3.61084L10.6366 4.31795M4.27344 10.6821L3.56633 11.3892M1.95508 7.5H2.95508M3.56641 3.61084L4.27351 4.31795M6.50049 9.21251C6.38862 9.15163 6.2832 9.08038 6.18553 9.00006C5.73952 8.63325 5.45508 8.07714 5.45508 7.45459C5.45508 6.35002 6.35051 5.45459 7.45508 5.45459C8.21398 5.45459 8.87416 5.87727 9.21303 6.50006C9.29756 6.65541 9.3621 6.82321 9.40319 7M9.8 21C7.14903 21 5 18.9466 5 16.4137C5 14.3144 6.6 12.375 9 12C9.75283 10.274 11.5346 9 13.6127 9C16.2747 9 18.4504 10.9907 18.6 13.5C20.0127 14.0956 21 15.5574 21 17.1402C21 19.2719 19.2091 21 17 21L9.8 21Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-neutral-500"
                  />
                </svg>
              )}
            </Button>
          </div>
          <Avatar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
