"use client";

import { useEffect, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const ToggleSidebarButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-center items-center">
      <Button onClick={onClick} className="p-0">
        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none">
          <path
            d="M13 5V19M16 8H18M16 11H18M16 14H18M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-neutral-400 dark:stroke-neutral-500 fill-background"
          />
        </svg>
      </Button>
    </div>
  );
};

const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure component only renders after hydration
    setToggleSidebar(window.innerWidth > 762);
  }, []);

  return (
    <>
      <div
        className={cn(
          "w-[295px] h-full max-h-[calc(100vh-4rem)] z-50  fixed  md:static  bg-background shrink-0 flex transition-all duration-[50ms] ease-in-out",
          !toggleSidebar && " w-[40px] h-fit bg-transparent"
        )}
      >
        <div
          className={cn(
            "p-3 border-r flex flex-col  border-neutral-200 bg-background w-fit dark:border-neutral-700",
            !toggleSidebar && "border-none transition-all duration-[50ms]"
          )}
        >
          <div className="upper-sidebar-wrapper flex items-center gap-3 justify-between w-full">
            {/* toggle sidebar */}
            <ToggleSidebarButton onClick={() => setToggleSidebar((prev) => !prev)} />

            {/* search */}
            <div className={cn(!toggleSidebar && "hidden")}>
              <Input placeholder="Search Chats" />
            </div>

            {/* new chat */}
            <div className={cn(!toggleSidebar && "hidden")}>
              <div className="flex justify-center items-center">
                <Button className="p-0">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10.5H16"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="stroke-neutral-400 dark:stroke-neutral-500"
                    />
                    <path
                      d="M8 14H13.5"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="stroke-neutral-400 dark:stroke-neutral-500"
                    />
                    <path
                      d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="stroke-neutral-400 dark:stroke-neutral-500"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {/* sidebar content */}
          <div className={cn("flex flex-col h-full", !toggleSidebar && "hidden")}>
            <div className="h-full">
              <div className="mt-8 flex flex-col gap-2 justify-center items-center">
                <Button className="flex justify-center items-center gap-1 outline-none rounded-md border bg-lime-600 dark:bg-lime-800 bg-opacity-25 dark:bg-opacity-55 p-1.5 text-xs transition-all duration-[50ms]">
                  <svg
                    className="w-3 h-3 fill-neutral-600 dark:fill-foreground"
                    height="28px"
                    width="800px"
                    viewBox="0 0 330 330"
                    xmlSpace="preserve"
                  >
                    <g id="XMLID_486_">
                      <path
                        id="XMLID_487_"
                        d="M165,330c63.411,0,115-51.589,115-115c0-29.771-11.373-56.936-30-77.379V85c0-46.869-38.131-85-85-85
                        S80.001,38.131,80.001,85v52.619C61.373,158.064,50,185.229,50,215C50,278.411,101.589,330,165,330z M180,219.986V240
                        c0,8.284-6.716,15-15,15s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
                        C190,208.162,186.068,215.421,180,219.986z M110.001,85c0-30.327,24.673-55,54.999-55c30.327,0,55,24.673,55,55v29.029
                        C203.652,105.088,184.91,100,165,100c-19.909,0-38.651,5.088-54.999,14.028V85z"
                      />
                    </g>
                  </svg>
                  <span className="text-neutral-600 dark:text-foreground ">
                    Sign in to access session
                  </span>
                </Button>
              </div>
            </div>

            {/* lower sidebar content*/}
            <div className="">
              {/* toggle theme button */}
              <div className="hidden md:flex">
                <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {isMounted && theme == "light" ? (
                    // moon icon
                    <svg width="28px" height="28px" fill="none" viewBox="0 0 24 24">
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
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
