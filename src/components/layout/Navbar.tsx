import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-16 w-full px-7 border-b dark:border-neutral-700">
      <div className="flex items-center gap-2">
        <div>
          <Image src="icon.svg" alt="icon" width={30} height={30} />
        </div>
        <span className="font-bold">VitalsGPT</span>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
