import { useState } from "react";
import PopupWrapper from "@/components/wrappers/popup";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Avatar() {
  const [isOption, setIsOption] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const handleClickAvatar = () => {
    if (status === "unauthenticated") {
      router.push("/auth/signup");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch("/api/auth/delete", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete account");
      }

      // await signOut(); // ✅ Logs the user out after account deletion
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  return (
    <div
      onMouseOver={() => status === "authenticated" && setIsOption(true)}
      className="relative w-fit"
    >
      <div
        onClick={handleClickAvatar}
        className="outline outline-2 outline-neutral-300 hover:outline-sky-500/60 dark:outline-neutral-700 dark:hover:outline-sky-700 w-fit h-fit rounded-full cursor-pointer"
      >
        <Image
          src={
            status === "authenticated" ? "/avatar/dummyAva.jpeg" : "/avatar/default-avatar-dark.svg"
          }
          alt="Avatar"
          width={100}
          height={100}
          className="object-cover rounded-full h-9 w-9"
        />
      </div>

      {isOption && (
        <PopupWrapper variant="left" isVisible={isOption} onClose={() => setIsOption(false)}>
          <div onMouseOut={() => setIsOption(false)} className="h-28 w-64 p-1 text-sm">
            <div className="flex gap-2">
              <div className="bg-black/5 dark:bg-white/5 p-2 rounded-xl hover:dark:bg-neutral-100/10 hover:bg-neutral-900/10 transition-colors  w-fit h-fit  ">
                <Image
                  src={
                    status === "authenticated"
                      ? "/avatar/dummyAva.jpeg"
                      : "/avatar/default-avatar-dark.svg"
                  }
                  alt="Avatar"
                  width={100}
                  height={100}
                  className="object-cover rounded-md h-9 w-9"
                />
              </div>
              <div className="grid">
                <span className="font-medium flex items-end">{data?.user.name}</span>
                <span className="md:text-xs text-neutral-600 dark:text-neutral-200">
                  {data?.user.email}
                </span>
              </div>
            </div>

            {/* signOut */}
            <div className="flex gap-2 mt-3">
              <div
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                className=" bg-fuchsia-300/50 transition-colors hover:bg-pink-500/40 w-full dark:hover:bg-pink-600/60 py-2 px-2 rounded-lg grid gap-1 "
              >
                <button
                  onClick={handleDeleteAccount}
                  className="font-semibold text-left text-sm font-mono text-neutral-600 dark:text-neutral-100"
                >
                  Delete Acc
                </button>
              </div>
              <div
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                className="bg-red-400/50 transition-colors hover:bg-red-500/60 w-full dark:hover:bg-red-500/60 py-1.5 px-2 rounded-lg grid gap-1 "
              >
                <button className="font-semibold text-left text-sm font-mono text-neutral-600 dark:text-neutral-100">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </PopupWrapper>
      )}
    </div>
  );
}
