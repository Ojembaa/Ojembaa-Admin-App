"use client";
import AdminLayout from "@/components/Admin/layout";
import Container from "@/components/Admin/Container";
import SalesChart from "@/components/Admin/SalesChart";
import UsersChart from "@/components/Admin/UsersChart";
import withAuth from "@/common/HOC/withAuth";
import { getCurrentUser } from "@/services/store";
import { IAppUsers, ICategories, IUser } from "@/common/interfaces";
import { useEffect, useState } from "react";
import { useGetUsers } from "@/hooks/useGetUsers";
import {
  NewspaperIcon,
  UserGroupIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { useGetCategories } from "@/hooks/useGetCategories";

const Dashboard = () => {
  const currentUser: IUser = getCurrentUser();
  const { fetchAllUsers, users, loading: loadingUserData } = useGetUsers();
  const {
    categories,
    fetchCategories,
    loading: loadingCatrgoryData,
  } = useGetCategories();
  const [admin, setAdmin] = useState<IAppUsers[]>([]);
  const [categoriesData, setCategoriesData] = useState<ICategories[]>([]);

  useEffect(() => {
    fetchAllUsers();
    fetchCategories();
  }, []);
  useEffect(() => {
    setAdmin(users);
    setCategoriesData(categories);
  }, [users, categories]);

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
              />
              <UsersChart
                bg_color="bg-[#2F4D30]"
                title="Total Transaction"
                count={categoriesData?.length}
                data="Bulletin"
                description="Total number of bulletin created by admin"
                loading={loadingCatrgoryData}
                Icon={NewspaperIcon}
              />
            </div>
            <div className=" w-full md:flex-row flex-col h-fit flex justify-between rounded-[.7684rem] gap-[1.125rem]">
              <UsersChart
                bg_color="bg-[#2F4D30]"
                title="Total Admins"
                count={admin.length}
                data="Admin"
                description="Total number of admin that can create bulletin"
                loading={loadingUserData}
                Icon={UserGroupIcon}
              />
              <UsersChart
                data="Church"
                count={1}
                bg_color="bg-orange-400"
                title="Total Church Branch "
                description="Churches currently using the e-bulletin"
                Icon={HomeModernIcon}
              />
            </div>
            <SalesChart />
          </div>
        </Container>
      </AdminLayout>
    </div>
  );
};

export default withAuth(Dashboard);
