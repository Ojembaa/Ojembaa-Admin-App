import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React, {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
} from "react";
import { Spinner } from "../Common/Spinner";

export interface DashboardCard {
  bg_color: string;
  count?: number;
  title: string;
  description: string;
  data: string;
  textColor?: string;
  loading?: boolean;
  Icon?: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
}

export default function UsersChart(dashboardCardProps: DashboardCard) {
  const {
    bg_color = "bg-blue-500",
    count = 500,
    title = "Current Total User",
    description,
    data,
    textColor = "text-white",
    loading = false,
    Icon = InformationCircleIcon,
  } = dashboardCardProps;
  return (
    <div
      className={`shadow-2xl ${[
        bg_color,
      ]} w-full md:w-1/2 rounded-xl p-8 pb-[.9375rem] font-poppins h-[10.8125rem] ${textColor}`}
    >
      <p className="font-medium text-2xl">{title}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2 ">
          <Icon width={40} height={40} />
          {loading ? (
            <Spinner width={20} height={20} />
          ) : (
            <p className="font-semibold text-2xl">
              {count} {data}
              {count > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
      <p className="pt-2">{description}</p>
    </div>
  );
}
