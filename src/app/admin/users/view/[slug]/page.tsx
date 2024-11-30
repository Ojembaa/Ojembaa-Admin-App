"use client";
import { ICourierDetails } from "@/common/interfaces";
import BackButton from "@/components/Admin/backButton";
import Container from "@/components/Admin/Container";
import CourierBankInformation from "@/components/Admin/CourierBankInformation";
import Guarantor from "@/components/Admin/Guarantor";
import AdminLayout from "@/components/Admin/layout";
import Tool from "@/components/Admin/Tool";
import { Spinner } from "@/components/Common/Spinner";
import { useGetCourierDetailById } from "@/hooks/useGetCourierDetails";
import { useEffect, useState } from "react";

const UserViewPage = ({ params }: { params: { slug: string } }) => {
  const userID = params.slug;
  const [userDetail, setUserDetail] = useState<ICourierDetails>();
  const {
    courier,
    fetchCourierDetailById,
    isLoading: loading,
  } = useGetCourierDetailById();

  useEffect(() => {
    fetchCourierDetailById(userID);
    setUserDetail(courier);
  }, [userID]);

  useEffect(() => {
    setUserDetail(courier);
  }, [courier]);

  return (
    <AdminLayout>
      <Container className="md:pl-[3.75rem] md:pr-[4.625rem] pl-[2.5rem] pt-10 pb-7">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            {" "}
            <Spinner color="orange" />
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-5 justify-between ml-[.125rem] mr-[.625rem]">
              <BackButton text="Bulletin List Page" />
            </div>
            <div className="py-2">
              <hr />
            </div>

            <div className="flex gap-20">
              <div className="flex gap-4">
                <div>
                  <img
                    className="inline-block h-44 w-44 rounded-full"
                    src={userDetail?.profilePhoto}
                    alt="profile-image"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold flex ">
                  <div className="pr-5">
                    <p>First Name:</p>
                  </div>
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.firstName || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex ">
                  <div className="pr-5">
                    <p>Last Name:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.lastName || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex">
                  <div className="pr-5">
                    <p>Address:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.address || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex">
                  <div className="pr-5">
                    <p>Phone Number:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.phone || "Null"}{" "}
                  </span>
                </div>
                <div className="font-bold flex">
                  <div className="pr-5">
                    <p>Email:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.email || "Null"}
                  </span>
                </div>
                <div className="font-bold flex ">
                  <div className="pr-5">
                    <p>Deliveries:</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.deliveries || "Null"}
                  </span>
                </div>
                <div className="font-bold flex ">
                  <div className="pr-5">
                    <p>ID Number</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.idNumber || "Null"}
                  </span>
                </div>
                <div className="font-bold flex ">
                  <div className="pr-5">
                    <p>rating</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.totalRating || "Null"}
                  </span>
                </div>

                <div className="font-bold flex">
                  <div className="pr-5">
                    <p>Username</p>
                  </div>{" "}
                  <span className="capitalize font-normal">
                    {" "}
                    {userDetail?.username || "Null"}
                  </span>
                </div>

                {userDetail?.isActivated ? (
                  <div className="font-bold flex  items-center">
                    <div className="pr-5">
                      <p>Status:</p>
                    </div>{" "}
                    <span className="capitalize font-bold  py-1 px-5 rounded-2xl text-white text-center bg-green-400">
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="font-bold flex  items-center">
                    <div className="pr-5">
                      <p>Status:</p>
                    </div>{" "}
                    <span className="capitalize font-bold  py-1 px-5 rounded-2xl text-white text-center bg-red-500">
                      Inactive
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-10">
              <hr />
            </div>
            <div>
              <div className="mt-5 font-bold">
                <h2 className="text-lg">ID Card </h2>
              </div>
              <div className="flex justify-between my-5 space-x-8 max-h-52">
                <div className="border border-slate-300 rounded-md w-full p-7 h-52  overflow-auto">
                  <img src={userDetail?.idImageFront} />
                </div>

                <div className="border border-slate-300 rounded-md w-full p-7 h-52 overflow-auto">
                  <img src={userDetail?.idImageBack} />
                </div>
              </div>
            </div>
            <div className="my-10">
              <hr />
            </div>
            {/* tool */}
            <Tool userDetail={userDetail!} />
            <div className="my-10">
              <hr />
            </div>
            {/* bank Information */}
            <CourierBankInformation userDetail={userDetail!} />
            <div className="my-10">
              <hr />
            </div>
            {/* Guarantor */}
            <Guarantor userDetail={userDetail!} />
          </div>
        )}
      </Container>
    </AdminLayout>
  );
};

export default UserViewPage;
