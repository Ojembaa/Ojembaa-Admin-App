import Image from "next/image";
import React from "react";

export default function SalesChart() {
  return (
    <div className="h-[14.6875rem] w-full bg-white rounded-[.7684rem] pt-4 pl-[1.1875rem] pr-[.9394rem] pb-[1.125rem]">
      Sales
      <Image
        src={"/assets/svgs/line-chart.svg"}
        className=""
        alt="icon"
        width={792}
        height={175}
      />
    </div>
  );
}
