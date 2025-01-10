"use client";

import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Avatar() {
  const { status } = useSession();
  const { theme } = useTheme();

  const handleLoginIfUnauthenticated = () => {
    if (status === "unauthenticated") {
      signIn();
    }
  };
  return (
    <>
      <div
        onClick={handleLoginIfUnauthenticated}
        className="outline outline-2 outline-neutral-300 hover:outline-sky-500/60 dark:outline-neutral-700 dark:hover:outline-sky-700 w-fit h-fit rounded-full"
      >
        <Image
          src={
            status === "authenticated"
              ? "/ava/dummyAva.jpg"
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
    </>
  );
}
