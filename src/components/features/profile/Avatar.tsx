import Image from "next/image";

export default function Avatar() {
  return (
    <>
      <div className="outline outline-2 outline-neutral-300 hover:outline-sky-500/60 dark:outline-neutral-700 dark:hover:outline-sky-700  rounded-full">
        <Image
          src="/dummyAva.jpg"
          alt="@avatar"
          width={100}
          height={100}
          className="object-cover rounded-full h-7 w-7"
        />
      </div>
    </>
  );
}
