import { Statistics } from "@/common/constants/statistics";
import React from "react";
import StatisticsCard from "./StatisticsCard";

export default function StatisticsCardGroup() {
  const cardClassName = (a: string) => {
    switch (a) {
      case "sales":
        return " px-5 pt-5 pb-[1.125rem] bg-[#F6D1FF]";
      case "total-orders":
        return " pl-[.9375rem] pr-[.875rem] py-[.9375rem] bg-[#FEE0CB]";
      case "new-customers":
        return " pt-5 pl-4 pb-[1.1719rem] pr-[.6212rem] bg-[#D0F1FF]";
      case "completed-orders":
        return " pl-4 pt-5 pr-[.5625rem] pb-[.8438rem] bg-[#D1FFC1]";
      default:
        return " px-5 pt-5 pb-[1.125rem] bg-[#F6D1FF]";
    }
  };

  return (
    <div className="mt-[.9375rem] flex flex-wrap gap-5 justify-between ml-[1.9375rem] mr-[1.875rem] ">
      {Statistics?.map((a) => {
        return (
          <StatisticsCard
            key={a?.key}
            icon={a.icon}
            title={a.title}
            amount={a.amount}
            className={cardClassName(a?.key)}
          />
        );
      })}
    </div>
  );
}
