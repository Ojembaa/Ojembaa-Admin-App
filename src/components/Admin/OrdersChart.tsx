import Image from "next/image";
import React from "react";

export default function OrdersChart() {
  return (
    <div className=" bg-white w-full md:w-1/2 rounded-[.7684rem] px-[1.75rem] pt-5 pb-[.375rem] font-poppins h-[14.8125rem]">
      Orders
      <div className=" flex justify-end gap-x-[1.5625rem]">
        <UsersOrderTag clasName=" bg-[#165BAA]" text="Existing users" />
        <UsersOrderTag clasName=" bg-[#A155B9]" text="New users" />
      </div>
      <Image
        src={"/assets/svgs/bar-chart.svg"}
        className=""
        alt="icon"
        width={422}
        height={173}
      />
    </div>
  );
}

const UsersOrderTag = ({
  clasName,
  text,
}: {
  clasName: string;
  text: string;
}) => {
  return (
    <div className=" flex items-center gap-x-[.5625rem]">
      <div className={`${clasName} bg-black w-[1.3125rem] h-2`}></div>
      <p className=" font-inter text-[.75rem] capitalize"> {text}</p>
    </div>
  );
};
