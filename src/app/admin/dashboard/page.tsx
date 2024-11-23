"use client";
import AdminLayout from "@/components/Admin/layout";
import Container from "@/components/Admin/Container";
import UsersChart from "@/components/Admin/UsersChart";
import withAuth from "@/common/HOC/withAuth";
import { getCurrentUser } from "@/services/store";
import { IAppUsers } from "@/common/interfaces";
import { useEffect, useState } from "react";
import { useGetUsers } from "@/hooks/useGetUsers";
import {
  NewspaperIcon,
  UserGroupIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { useGetStats } from "@/hooks/useGetStats";

const Dashboard = () => {
  const currentUser: IAppUsers = getCurrentUser();
  const { fetchAllUsers } = useGetUsers();

  const { fetchStat, loading: loadingStats, stats } = useGetStats();
  const [statsData, setStatsData] = useState();
  console.log(statsData);

  useEffect(() => {
    fetchAllUsers();
    fetchStat();
  }, []);

  useEffect(() => {
    if (stats) {
      setStatsData(stats);
    }
  }, [stats]);

  return (
    <div>
      <AdminLayout>
        <Container className="px-[2.125rem] pb-[1.8125rem]">
          <p
            className={`mt-[2.625rem] ml-[1.375rem] my-[1.5rem] text-black text-xl font-poppins`}
          >
            Hey{" "}
            <span className="capitalize font-bold">
              {currentUser.firstName}
            </span>
            , Welcome back!
          </p>
          <div className=" flex flex-col gap-y-3">
            <div className=" w-full md:flex-row flex-col h-fit flex justify-between rounded-[.7684rem] gap-[1.125rem]">
              <UsersChart
                bg_color="bg-orange-400"
                title="Recent Deliveries"
                description="This Captures All The recent Deliveries"
                data="Deliveries"
                Icon={UserGroupIcon}
                count={0}
              />
              <UsersChart
                bg_color="bg-[#2F4D30]"
                title="Couriers"
                count={0}
                data="Stat"
                description="All Couriers"
                loading={loadingStats}
                Icon={NewspaperIcon}
              />
            </div>
            <div className=" w-full md:flex-row flex-col h-fit flex justify-between rounded-[.7684rem] gap-[1.125rem]">
              <UsersChart
                bg_color="bg-[#2F4D30]"
                title="Online Couriers"
                count={0}
                data="Online Couriers"
                description="Total online couriers"
                loading={loadingStats}
                Icon={UserGroupIcon}
              />
              <UsersChart
                data="Packages"
                count={0}
                bg_color="bg-orange-400"
                title="Total Packages"
                description="Total Packages"
                loading={loadingStats}
                Icon={HomeModernIcon}
              />
            </div>
            {/* <SalesChart /> */}
          </div>
        </Container>
      </AdminLayout>
    </div>
  );
};

export default withAuth(Dashboard);
