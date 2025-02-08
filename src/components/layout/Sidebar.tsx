"use client";

import { useCallback, useEffect } from "react";
import Button from "../ui/button";
import { cn } from "@/lib/utils";
import ThemeButton from "../features/theme/ThemeButton";
import SessionHistoryWrapper from "../wrappers/SessionHistory";
import useSidebarStore from "@/store/useSidebarStore";
import Searchbar from "../features/search/Searchbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Avatar from "../features/profile/Avatar";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2 px-3">
      <Image
        src="/icon.svg"
        alt="icon"
        width={30}
        height={30}
        style={{ width: "30px", height: "30px" }}
      />
      <span className="font-bold">VitalsGPT</span>
    </Link>
  );
};

const ToggleSidebarButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
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
  );
};

const NewChatButton: React.FC<{ handleNewChat: () => void }> = ({ handleNewChat }) => {
  return (
    <Button isDefault onClick={handleNewChat} className="flex justify-center items-center ">
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
  );
};

const ReportButton: React.FC = () => {
  return (
    <Button className="flex justify-center items-center w-fit h-fit  p-0">
      <Link href="/reports" className="group">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          className="stroke-neutral-400 "
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-neutral-400 dark:stroke-neutral-500 group-hover:stroke-red-400"
            d="M12 8V12M12 16H12.01M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </Button>
  );
};

const ExamplesButton: React.FC = () => {
  return (
    <Button className="border bg-violet-400/40 hover:bg-violet-400/80 dark:hover:bg-violet-400/55 transition-colors py-0.5 dark:text-neutral-300 text-neutral-700 w-full rounded-xl">
      <Link href="/examples/general-health">Examples</Link>
    </Button>
  );
};

const DocsButton: React.FC = () => {
  return (
    <Button className="flex justify-center items-center w-fit h-fit  p-0">
      <Link
        href="https://github.com/Riciolus/VitalsGPT"
        className="flex gap-1 items-center group cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="22"
          height="22"
          viewBox="0 0 48 48"
          className=" fill-neutral-400 dark:fill-neutral-500 group-hover:fill-yellow-500"
        >
          <path d="M 12.5 4 C 10.019 4 8 6.019 8 8.5 L 8 39.5 C 8 41.981 10.019 44 12.5 44 L 35.5 44 C 37.981 44 40 41.981 40 39.5 L 40 20 L 28.5 20 C 26.019 20 24 17.981 24 15.5 L 24 4 L 12.5 4 z M 27 4.8789062 L 27 15.5 C 27 16.327 27.673 17 28.5 17 L 39.121094 17 L 27 4.8789062 z M 17.5 25 L 30.5 25 C 31.328 25 32 25.672 32 26.5 C 32 27.328 31.328 28 30.5 28 L 17.5 28 C 16.672 28 16 27.328 16 26.5 C 16 25.672 16.672 25 17.5 25 z M 17.490234 32 L 26.486328 32 C 27.314328 32 27.986328 32.671 27.986328 33.5 C 27.987328 34.259 27.423406 34.887328 26.691406 34.986328 L 26.488281 35 L 17.492188 35 C 16.664188 35 15.992188 34.328 15.992188 33.5 C 15.992188 32.741 16.555109 32.112672 17.287109 32.013672 L 17.490234 32 z"></path>
        </svg>
      </Link>
    </Button>
  );
};

const Sidebar: React.FC = () => {
  const setToggleSidebar = useSidebarStore((state) => state.setToggleSidebar);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const router = useRouter();

  useEffect(() => {
    setToggleSidebar(window.innerWidth > 762);
  }, [setToggleSidebar]);

  const handleNewChat = useCallback(() => {
    setToggleSidebar(window.innerWidth > 762);
    router.push("/");
  }, [setToggleSidebar, router]);

  return (
    <aside
      className={cn(
        "w-[295px]  z-50 fixed md:static  h-full overflow-hidden bg-primary shrink-0 flex transition-all duration-[50ms] ease-in-out",
        !toggleSidebar && " w-[42px] h-fit bg-transparent dark:bg-transparent"
      )}
    >
      <div
        className={cn(
          "scrollbar border-r flex flex-col  border-neutral-200   w-fit dark:border-neutral-700",
          !toggleSidebar && "border-none"
        )}
      >
        <div className="h-full flex flex-col gap-5 pt-3 ">
          <Logo />

          <div className="flex items-center gap-3 px-3  justify-between w-full">
            <ToggleSidebarButton onClick={() => setToggleSidebar()} />
            {toggleSidebar && <Searchbar />}
            {toggleSidebar && <NewChatButton handleNewChat={handleNewChat} />}
          </div>

          <div className={cn("flex flex-col h-[85%] overflow-auto", !toggleSidebar && "hidden")}>
            <SessionHistoryWrapper />
          </div>

          <div className={!toggleSidebar ? "hidden " : "h-full max-h-24 "}>
            <div className="flex items-center gap-3 w-full px-3  rounded-t-lg pb-2">
              <ThemeButton />
              <ReportButton />
              <ExamplesButton />
              <DocsButton />
            </div>
            <div className="px-5 h-full pt-3 border-t border-inherit border-neutral-200 dark:border-neutral-700 ">
              <Avatar />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
