import Image from "next/image";

export default function Pagination() {
  const currentPage = 1;
  const limit = 50;
  const totalItems = 60;

  return (
    <div className=" flex gap-x-[1.625rem] items-center">
      <div>
        <span> {currentPage} </span>
        <span> - </span>
        <span> {limit} </span>
        <span> of </span>
        <span> {totalItems} </span>
      </div>
      <div className=" flex items-center gap-[.875rem]">
        <Image
          src={"/assets/svgs/less-than-icon.svg"}
          className=""
          alt="icon"
          width={26}
          height={26}
        />
        <Image
          src={"/assets/svgs/greater-than-icon.svg"}
          className=""
          alt="icon"
          width={26}
          height={26}
        />
      </div>
    </div>
  );
}
