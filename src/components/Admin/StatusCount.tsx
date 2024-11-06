import React from "react";

type Props = {
  className: string;
  status: string;
  count: number;
};

export default function StatusCount({ className, status, count }: Props) {
  return (
    <div className="flex justify-between items-center gap-x-[1.875rem]">
      <div className=" text-xs flex gap-x-2 items-center">
        <div
          className={` h-5 w-[.25rem] rounded-full ${className}`}
        ></div>
        {status}
      </div>
      {count}
    </div>
  );
}
