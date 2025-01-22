"use client";

import PopupWrapper from "@/components/wrappers/popup";
import { signIn, signOut, useSession } from "next-auth/react";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";

export default function Avatar() {
  const [isOption, setIsOption] = useState(false);
  const { status, data } = useSession();
  const { theme } = useTheme();

  const handleClickAvatar = () => {
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated") {
      setIsOption(true);
    } else {
      return;
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleClickAvatar}
        className="outline outline-2 outline-neutral-300 hover:outline-sky-500/60 dark:outline-neutral-700 dark:hover:outline-sky-700 w-fit h-fit rounded-full"
      >
        <Image
          src={
            status === "authenticated"
              ? `/avatar/${data.user.image}`
              : theme === "light"
              ? "/avatar/default-avatar.svg"
              : "/avatar/default-avatar-dark.svg"
          }
          alt="@avatar"
          width={100}
          height={100}
          className="object-cover rounded-full h-7 w-7"
        />
      </div>

      {isOption && (
        <PopupWrapper isVisible={isOption} onClose={() => setIsOption(false)}>
          <div
            onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            className="text-red-500 dark:text-red-400 transition-colors hover:bg-red-100 dark:hover:bg-red-800/80 py-1.5 px-2 rounded-lg grid gap-1"
          >
            <button className=" font-normal text-left w-32">Sign out</button>
          </div>
        </PopupWrapper>
      )}
    </div>
  );
}
