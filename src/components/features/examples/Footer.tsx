import Link from "next/link";

const Footer = ({
  pageIndex,
}: {
  pageIndex: { title: string; url: string; previous: string; next: string };
}) => {
  return (
    <footer className="w-full h-10 font-mono flex justify-between">
      <Link
        href={"/examples/" + pageIndex.previous}
        className=" text-base hover:underline hover:underline-offset-2"
      >
        {"<-- " + pageIndex.previous}
      </Link>
      <Link
        href={"/examples/" + pageIndex.next}
        className=" text-base hover:underline hover:underline-offset-2"
      >
        {pageIndex.next + " -->"}
      </Link>
    </footer>
  );
};

export default Footer;
