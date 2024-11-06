import { ReactElement } from "react";

type Props = {
  className: string;
  icon: ReactElement;
  title: string;
  amount: string | number;
};

export default function StatisticsCard({
  className,
  icon,
  title,
  amount,
}: Props) {
  return (
    <div
      className={`w-full sm:w-[40%] md:w-[30%] lg:w-1/5 xl:w-1/5 h-[4.6875rem] rounded-lg flex items-center font-poppins justify-between ${className}`}
    >
      {icon}
      <div className=" text-center">
        <p className=" font-bold">{amount}</p>
        <p className=" text-[.625rem]">{title}</p>
      </div>
    </div>
  );
}
