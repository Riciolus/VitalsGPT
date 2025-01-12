"use client";

import { useEffect, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import { cn } from "@/lib/utils";
import ThemeButton from "../features/theme/ThemeButton";
import { signIn } from "next-auth/react";

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

  useEffect(() => {
    console.log("render");
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
            "p-3 border-r flex flex-col  border-neutral-200  w-fit dark:border-neutral-700",
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
                <Button
                  onClick={() => signIn()}
                  className="flex justify-center items-center gap-1 outline-none rounded-md border bg-lime-600 dark:bg-lime-800 bg-opacity-25 dark:bg-opacity-55 p-1.5 text-xs transition-all duration-[50ms]"
                >
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
                  <span onClick={() => signIn()} className="text-neutral-600 dark:text-foreground ">
                    Sign in to access history
                  </span>
                </Button>
              </div>
            </div>

            {/* lower sidebar content*/}
            <div className="">
              {/* toggle theme button */}
              <div className="hidden md:flex">
                <ThemeButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
